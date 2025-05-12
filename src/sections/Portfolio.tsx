import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects, ProjectCategory } from '../data/projects';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ui', label: 'UI/UX Design' },
    { id: 'web', label: 'Web Development' },
    { id: 'graphic', label: 'Graphic Design' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Portfolio</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400">
            Explore my recent projects and creative works across multiple disciplines.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ProjectCategory | 'all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;