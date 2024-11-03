export interface Document {
  id: string;
  title: string;
  description: string;
  url: string;
  version: number;
  size: string;
  category: string;
  keywords: string;
}

export interface DocumentDetail1 {
  author: string;
  label: string;
  category: string;
  keyword: string;
  type: string;
  fileSize: string;
  title: string;
}

export interface DocumentDetail extends Document {}
export const docData: Document[] = [
  {
    id: '1',
    title: 'Introduction to TypeScript',
    description: "A beginner's guide to understanding and using TypeScript.",
    url: 'https://example.com/typescript-intro',
    version: 1,
    size: '1.2MB',
    category: 'Programming',
    keywords: 'typescript, beginner, programming'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    description: 'An in-depth look at advanced JavaScript patterns and techniques.',
    url: 'https://example.com/advanced-js',
    version: 2,
    size: '3.5MB',
    category: 'Programming',
    keywords: 'javascript, advanced, coding'
  },
  {
    id: '3',
    title: 'Introduction to Machine Learning',
    description: 'A guide to the basics of machine learning concepts and applications.',
    url: 'https://example.com/ml-intro',
    version: 1,
    size: '2.8MB',
    category: 'AI',
    keywords: 'machine learning, AI, data science'
  },
  {
    id: '4',
    title: 'Data Structures and Algorithms',
    description: 'Comprehensive notes on data structures and algorithmic principles.',
    url: 'https://example.com/data-structures',
    version: 3,
    size: '4.1MB',
    category: 'Computer Science',
    keywords: 'data structures, algorithms, programming'
  },
  {
    id: '5',
    title: 'React for Beginners',
    description: 'An introductory guide to building user interfaces with React.',
    url: 'https://example.com/react-beginners',
    version: 1,
    size: '2.0MB',
    category: 'Web Development',
    keywords: 'react, front-end, web development'
  },
  {
    id: '6',
    title: 'Guide to RESTful APIs',
    description: 'A complete guide to understanding and creating RESTful APIs.',
    url: 'https://example.com/restful-apis',
    version: 2,
    size: '1.7MB',
    category: 'API Development',
    keywords: 'APIs, REST, web services'
  },
  {
    id: '7',
    title: 'Cybersecurity Basics',
    description: 'An overview of cybersecurity principles and best practices.',
    url: 'https://example.com/cybersecurity-basics',
    version: 1,
    size: '2.3MB',
    category: 'Security',
    keywords: 'cybersecurity, security, information security'
  },
  {
    id: '8',
    title: 'Agile Project Management',
    description: 'A guide to understanding and implementing Agile methodologies.',
    url: 'https://example.com/agile-pm',
    version: 1,
    size: '1.5MB',
    category: 'Project Management',
    keywords: 'agile, project management, scrum'
  },
  {
    id: '9',
    title: 'Introduction to Cloud Computing',
    description: 'Basics of cloud computing and its various models and services.',
    url: 'https://example.com/cloud-computing-intro',
    version: 1,
    size: '2.9MB',
    category: 'Cloud Computing',
    keywords: 'cloud computing, AWS, Azure, Google Cloud'
  },
  {
    id: '10',
    title: 'Docker and Containerization',
    description: 'An introduction to Docker and the fundamentals of containerization.',
    url: 'https://example.com/docker-basics',
    version: 2,
    size: '3.1MB',
    category: 'DevOps',
    keywords: 'docker, containers, devops'
  }
];
