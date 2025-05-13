import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
  github?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  images,
  tags,
  link,
  github,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setImageError(false);
    setErrorMessage('');
  }, [title, images]);

  const nextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setImageError(false);
    setErrorMessage('');
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageError(false);
    setErrorMessage('');
  };

  const getImagePath = (imageName: string) => {
    if (!imageName) return '';
    return `/images/projects/${imageName.trim()}`;
  };

  const generatePlaceholderImage = (text: string) => {
    const colors = [
      '#4285F4', // Google Blue
      '#EA4335', // Google Red
      '#FBBC05', // Google Yellow
      '#34A853', // Google Green
      '#5E35B1', // Deep Purple
      '#00897B', // Teal
      '#C2185B', // Pink
    ];
    
    const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = colors[hash % colors.length];
    
    // Generate a clean title for SVG
    const cleanTitle = title.replace(/[<>]/g, '');
    
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="${color}" /><text x="400" y="225" font-family="Arial" font-size="32" text-anchor="middle" fill="white">${cleanTitle}</text></svg>`;
  };

  const handleImageError = () => {
    const imagePath = getImagePath(images[currentImageIndex]);
    setErrorMessage(`Image not found: ${imagePath}`);
    setImageError(true);
  };

  // Exit early if no images
  if (!images || images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-dark-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full"
      >
        <div className="p-6 h-full flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          <div 
            className="bg-dark-900 p-4 text-center text-gray-500 rounded mb-4 aspect-video flex items-center justify-center"
            style={{
              backgroundImage: `url("${generatePlaceholderImage(title)}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <span className="bg-black/50 px-3 py-1 rounded text-white">No images available</span>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {tags && tags.length > 0 && tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-dark-700 text-sm rounded-full text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {link && link !== '-' && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-450 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Site
              </a>
            )}
            {github && github !== '-' && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-450 hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Image Carousel */}
      <div className="relative aspect-video bg-dark-900 overflow-hidden group">
        {imageError ? (
          <div 
            className="w-full h-full flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url("${generatePlaceholderImage(title)}")`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="bg-black/60 px-4 py-2 rounded">
              <p className="text-white">Image preview not available</p>
              <p className="text-sm mt-1 text-gray-300">Using placeholder image</p>
              {images.length > 1 && (
                <button 
                  onClick={nextImage} 
                  className="mt-3 w-full px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  Try next image
                </button>
              )}
            </div>
          </div>
        ) : (
          <img
            src={getImagePath(images[currentImageIndex])}
            alt={`${title} screenshot ${currentImageIndex + 1}`}
            onError={handleImageError}
            className="w-full h-full object-cover object-center"
          />
        )}
        
        {/* Only show controls if we have more than one image */}
        {images.length > 1 && !imageError && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {tags && tags.length > 0 && tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-dark-700 text-sm rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {link && link !== '-' && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-450 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Site
            </a>
          )}
          {github && github !== '-' && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-450 hover:text-blue-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;