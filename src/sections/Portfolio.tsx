import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

interface Project {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
  github?: string;
}

interface ProjectsByCategory {
  [key: string]: Project[];
}

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<ProjectsByCategory>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [debugMessage, setDebugMessage] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('./data/Projects.txt');
        if (!response.ok) {
          throw new Error(`Failed to load projects file (HTTP ${response.status})`);
        }
        
        const text = await response.text();

        if (!text.trim()) {
          throw new Error('Projects file is empty');
        }

        // Parse categories by splitting on "=== CATEGORY ==="
        const categoryBlocks = text.split('===').filter(block => block.trim() !== '');
        
        const projectsByCategory: ProjectsByCategory = {};

        categoryBlocks.forEach(block => {
          // Extract category name from the first line
          const lines = block.trim().split('\n');
          const categoryName = lines[0].trim();
          
          // Skip empty categories
          if (!categoryName) return;
          
          // Split the rest of the content by "--- Project X ---" markers
          const projectsContent = block.substring(categoryName.length).trim();
          const projectBlocks = projectsContent.split('---').filter(p => p.trim() !== '');
          
          if (projectBlocks.length === 0) return;

          const categoryProjects: Project[] = [];
          
          projectBlocks.forEach(projectBlock => {
            try {
              const projectLines = projectBlock.trim().split('\n').filter(line => line.trim() !== '');
              
              if (projectLines.length === 0) return;
              
              // Skip the "Project X" line if present
              const startIndex = projectLines[0].includes('Project') ? 1 : 0;
              
              const project: any = {
                images: [],
                tags: []
              };
              
              let currentKey = '';
              let currentValues: string[] = [];
              
              for (let i = startIndex; i < projectLines.length; i++) {
                const line = projectLines[i].trim();
                
                if (line.includes(':')) {
                  // Process previous key-value pair if we have one
                  if (currentKey) {
                    if (currentKey === 'IMAGE' || currentKey === 'IMAGES') {
                      project.images = currentValues
                        .filter(v => v.startsWith('-'))
                        .map(v => v.replace('-', '').trim());
                    } else if (currentKey === 'TAGS') {
                      project.tags = currentValues.join(' ').split(',').map((tag: string) => tag.trim());
                    } else if (currentKey === 'DESC') {
                      project.description = currentValues.join(' ');
                    } else {
                      project[currentKey.toLowerCase()] = currentValues.join(' ').trim();
                    }
                    currentValues = [];
                  }
                  
                  // Start new key-value pair
                  const [key, ...values] = line.split(':');
                  currentKey = key.trim();
                  if (values.length) currentValues.push(values.join(':').trim());
                } else if (line.startsWith('-')) {
                  currentValues.push(line);
                } else {
                  currentValues.push(line);
                }
              }
              
              // Process the last key-value pair
              if (currentKey) {
                if (currentKey === 'IMAGE' || currentKey === 'IMAGES') {
                  project.images = currentValues
                    .filter(v => v.startsWith('-'))
                    .map(v => v.replace('-', '').trim());
                } else if (currentKey === 'TAGS') {
                  project.tags = currentValues.join(' ').split(',').map((tag: string) => tag.trim());
                } else if (currentKey === 'DESC') {
                  project.description = currentValues.join(' ');
                } else {
                  project[currentKey.toLowerCase()] = currentValues.join(' ').trim();
                }
              }
              
              // Only add projects with a title and description
              if (project.title && project.description) {
                categoryProjects.push(project as Project);
              }
            } catch (e) {
              const errorMsg = e instanceof Error ? e.message : String(e);
              setDebugMessage(`Error parsing project: ${errorMsg}`);
            }
          });
          
          if (categoryProjects.length > 0) {
            projectsByCategory[categoryName] = categoryProjects;
          }
        });
        
        setProjects(projectsByCategory);
        setIsLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load projects');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (Object.keys(projects).length > 0 && !selectedCategory) {
      setSelectedCategory(Object.keys(projects)[0]);
    }
  }, [projects, selectedCategory]);

  const categories = Object.keys(projects).filter(category => category.trim() !== '' && projects[category]?.length > 0);

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 px-4 bg-dark-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-20 px-4 bg-dark-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
          <div className="flex flex-col items-center justify-center text-red-500">
            <p>Error: {error}</p>
            {debugMessage && <p className="mt-2 text-sm text-gray-400">{debugMessage}</p>}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section id="portfolio" className="py-20 px-4 bg-dark-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
          <div className="flex items-center justify-center text-gray-500">
            No projects found. Please check the data file.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 px-4 bg-dark-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-450 text-white'
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {selectedCategory && projects[selectedCategory] && projects[selectedCategory].length > 0 ? (
              projects[selectedCategory].map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  title={project.title}
                  description={project.description}
                  images={project.images || []}
                  tags={project.tags || []}
                  link={project.link}
                  github={project.github}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">
                No projects found in this category
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {debugMessage && (
          <div className="mt-8 p-4 bg-gray-800 rounded-md text-gray-400 text-sm">
            <p>Debug: {debugMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;