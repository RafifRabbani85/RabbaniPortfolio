import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-blue-500 font-medium mb-4">Hello, I'm</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Rafif</span>
              <span className="text-blue-500"> Rabbani</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
              Graphics Designer, UI/UX Designer & Front end web Developer
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I craft user-centered digital products through UI/UX Design, Front-End Web Development, and Graphics Design.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <a 
                href="#portfolio" 
                className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-md border border-gray-600 hover:border-blue-500 hover:text-blue-500 text-gray-300 font-medium transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#portfolio" className="text-gray-400 hover:text-blue-500 transition-colors">
          <ArrowDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default Hero;