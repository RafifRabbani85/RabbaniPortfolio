import React, { useState } from 'react';
import { Project } from '../data/projects';
import { ExternalLink, X } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ui':
        return 'UI/UX Design';
      case 'web':
        return 'Web Development';
      case 'graphic':
        return 'Graphic Design';
      default:
        return category;
    }
  };

  return (
    <>
      <div 
        className="group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-transform hover:-translate-y-2"
        onClick={() => setShowModal(true)}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 mb-3">
            {getCategoryLabel(project.category)}
          </span>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-400 line-clamp-2">{project.description}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-12">
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 overflow-y-auto">
          <div 
            className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={project.image || project.thumbnail} 
                alt={project.title} 
                className="w-full h-64 sm:h-80 object-cover"
              />
              <button 
                className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full text-white hover:bg-gray-800 transition-colors"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300">
                  {getCategoryLabel(project.category)}
                </span>
                <span className="text-gray-400 text-sm">{project.date}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-400 mb-6">{project.description}</p>
              
              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mt-8">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" /> View Live
                  </a>
                )}
                
                {project.codeUrl && (
                  <a 
                    href={project.codeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-600 hover:border-blue-500 hover:text-blue-500 text-gray-300 rounded-md transition-colors"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;