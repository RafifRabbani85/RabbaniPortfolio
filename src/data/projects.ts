export type ProjectCategory = 'ui' | 'web' | 'graphic';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  thumbnail: string;
  image?: string;
  date: string;
  features?: string[];
  technologies?: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive dashboard for e-commerce merchants with analytics, inventory management, and order processing capabilities.',
    category: 'ui',
    thumbnail: 'https://images.pexels.com/photos/6956183/pexels-photo-6956183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/6956183/pexels-photo-6956183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'June 2023',
    features: [
      'Real-time analytics dashboard',
      'Inventory management system',
      'Order processing workflow',
      'Customer relationship management'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    id: 2,
    title: 'Financial App Interface',
    description: 'A modern, intuitive mobile banking application interface designed for seamless financial management.',
    category: 'ui',
    thumbnail: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'March 2023',
    features: [
      'Expense tracking',
      'Investment portfolio',
      'Bill payments',
      'Financial insights and reports'
    ],
    technologies: ['Figma', 'Protopie', 'Illustrator'],
    liveUrl: '#'
  },
  {
    id: 3,
    title: 'Health & Fitness Platform',
    description: 'A responsive web application for fitness enthusiasts featuring workout plans, nutrition tracking, and progress monitoring.',
    category: 'web',
    thumbnail: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'October 2023',
    features: [
      'Personalized workout plans',
      'Nutrition tracking',
      'Progress visualization',
      'Community features'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    id: 4,
    title: 'Creative Agency Branding',
    description: 'Complete brand identity design for a creative agency, including logo, color palette, typography, and marketing materials.',
    category: 'graphic',
    thumbnail: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'January 2023',
    features: [
      'Logo design',
      'Brand guidelines',
      'Marketing collateral',
      'Digital assets'
    ],
    technologies: ['Illustrator', 'Photoshop', 'InDesign'],
    liveUrl: '#'
  },
  {
    id: 5,
    title: 'Travel Booking App',
    description: 'A feature-rich travel booking platform with destination discovery, booking management, and personalized recommendations.',
    category: 'web',
    thumbnail: 'https://images.pexels.com/photos/5273063/pexels-photo-5273063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/5273063/pexels-photo-5273063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'July 2023',
    features: [
      'Destination search and filtering',
      'Booking management',
      'User reviews and ratings',
      'Personalized recommendations'
    ],
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Node.js'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    id: 6,
    title: 'Product Packaging Design',
    description: 'Elegant packaging design for a premium skincare brand, focusing on sustainability and luxury aesthetics.',
    category: 'graphic',
    thumbnail: 'https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    image: 'https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'April 2023',
    features: [
      'Sustainable packaging design',
      'Brand identity integration',
      'Product line consistency',
      'Retail display strategy'
    ],
    technologies: ['Illustrator', 'Photoshop', '3D Mockups'],
    liveUrl: '#'
  }
];