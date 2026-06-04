export const personalInfo = {
  name: 'Achintya Shende',
  firstName: 'ACHINTYA',
  lastName: 'SHENDE',
  role: 'Software Engineer',
  company: 'Deloitte USI',
  tagline: 'SOFTWARE ENGINEER @ DELOITTE',
  email: 'achintyashende@gmail.com',
  phone: '+91-7350045035',
  location: 'India',
  bio: `Analytical and driven software developer with hands-on experience in full-stack development. Currently working as a Software Engineer at Deloitte USI, building scalable full-stack Java applications. Previously trained at LTIMindtree and interned at ZasmLabs. I thrive on solving complex problems and turning ideas into elegant, performant code.`,
  social: {
    github: 'https://github.com/achintyashende',
    linkedin: 'https://linkedin.com/in/achintyashende',
  },
};

export const stats = [
  { value: 250, suffix: '+', label: 'LeetCode Problems' },
  { value: 9.06, suffix: '', label: 'CGPA', decimals: 2 },
  { value: 3, suffix: '+', label: 'Companies Worked' },
  { value: 10, suffix: '+', label: 'Technologies' },
];

export const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'JavaScript', 'C++', 'C', 'SQL'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    title: 'Backend',
    skills: ['Spring Boot', 'Node.js', 'Express.js'],
  },
  {
    title: 'Database',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Cloud & Tools',
    skills: ['AWS', 'Git', 'GitHub', 'Postman', 'VS Code'],
  },
];

export const projects = [
  {
    id: 1,
    number: '01',
    name: 'KURSEFY',
    subtitle: 'Online Learning Platform',
    description:
      'A responsive online learning platform with course enrollment, video playback, and progress tracking. Designed with a clean UI and secure backend architecture.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    link: 'https://github.com/achintyashende/kursefy',
    linkLabel: 'View on GitHub',
  },
  {
    id: 2,
    number: '02',
    name: 'REALTIME WHITEBOARD',
    subtitle: 'Collaborative Drawing Application',
    description:
      'Real-time collaborative whiteboard enabling synchronized drawing across multiple users using WebSockets for seamless communication.',
    tech: ['React.js', 'WebSockets', 'Node.js', 'Bootstrap'],
    link: 'https://realtime-whiteboard-sharing-forntend.onrender.com',
    linkLabel: 'View Live Demo',
  },
];

export const experiences = [
  {
    id: 1,
    company: 'Deloitte USI',
    role: 'Software Engineer',
    type: 'Full Stack Java Developer',
    duration: 'Feb 2026 — Present',
    description:
      'Building scalable enterprise applications with Java, Spring Boot, React, and AWS. Contributing to full-stack development of client-facing solutions.',
    isCurrent: true,
  },
  {
    id: 2,
    company: 'LTIMindtree',
    role: 'Graduate Engineer Trainee',
    type: 'SAP Domain',
    duration: 'Nov 2025 — Jan 2026',
    description:
      'Completed intensive training in SAP enterprise solutions and gained exposure to large-scale enterprise systems.',
    isCurrent: false,
  },
  {
    id: 3,
    company: 'ZasmLabs',
    role: 'Full-Stack Development Intern',
    type: 'MERN Stack Developer',
    duration: 'Dec 2024 — Jun 2025',
    description:
      'Developed full-stack applications using React and MERN stack. Worked with MongoDB, SQL, and cloud technologies to deliver scalable solutions.',
    isCurrent: false,
  },
];

export const education = {
  degree: 'B.Tech in Information Technology',
  college: 'JSPM\'s RSCOE, Pune',
  year: '2021 — 2025',
  cgpa: '9.06',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
