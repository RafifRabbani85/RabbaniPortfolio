import React from 'react';
import SkillBar from '../components/SkillBar';
import { Code, Palette, Layout, Monitor } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { name: 'UI/UX Design', progress: 95 },
    { name: 'Graphic Design', progress: 95 },
    { name: 'Microsoft Office', progress: 95 },
    { name: 'Web Development', progress: 90 },
  ];

  const services = [
    {
      icon: <Layout className="w-8 h-8 text-blue-500" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and engaging user experiences with a focus on usability and aesthetics.'
    },
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: 'Web Development',
      description: 'Building responsive, performant websites and applications using modern technologies.'
    },
    {
      icon: <Palette className="w-8 h-8 text-blue-500" />,
      title: 'Graphic Design',
      description: 'Crafting visually compelling brand identities, illustrations, and marketing materials.'
    },
    {
      icon: <Monitor className="w-8 h-8 text-blue-500" />,
      title: 'Microsoft Office',
      description: 'Mastering Microsoft Office Suite to streamline productivity and create impactful documents.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-900/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400">
            I’m a passionate tech enthusiast and creative mind from Kudus, 
            blending the worlds of web development, UI/UX design, and sports. 
            With a strong foundation in both logic and visuals, I love turning ideas into clean, responsive, and user-friendly digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* About content */}
          <div>
            <h3 className="text-2xl font-bold mb-6">My Story</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              My journey started in vocational school as an Audio Video Engineering student, where I built a solid understanding of technical systems. 
              Over time, I found my passion in web development and UI/UX design, which led me to pursue Information Systems at Universitas Muria Kudus.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Outside of tech, I’m also a huge fan of sports — that’s why many of my projects combine digital innovation with active lifestyles. 
              Whether I’m designing interfaces or crafting front-end code, I aim to build impactful platforms that are not only functional, but also feel intuitive and alive.
            </p>
            <div className="flex space-x-4 mt-8">
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                Hire Me
              </a>
              <a 
                href="#" 
                className="px-6 py-3 rounded-md border border-gray-600 hover:border-blue-500 hover:text-blue-500 text-gray-300 font-medium transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6">My Skills</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  progress={skill.progress} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <h3 className="text-2xl font-bold mb-10 text-center">Services I Offer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-lg p-6 transition-transform hover:-translate-y-2 border border-gray-800"
            >
              <div className="mb-4">{service.icon}</div>
              <h4 className="text-xl font-bold mb-3">{service.title}</h4>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;