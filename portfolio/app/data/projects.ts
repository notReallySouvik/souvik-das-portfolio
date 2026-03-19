export type ProjectStatus =
  | 'Planned'
  | 'In Development'
  | 'Paused'
  | 'Completed'
  | 'Maintained'
  | 'Archived';

export type ProjectEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  techStack: string;
  image: string;

  tags: string[];
  status: ProjectStatus;
  category?: string;

  github?: string;
  live?: string;
};

export const projects: ProjectEntry[] = [
  {
    slug: 'argus',
    title: 'Argus',
    shortDescription:
      'A reconnaissance-focused security tool built to automate structured information gathering and surface useful patterns across targets.',
    techStack: 'Python, FastAPI, React, PostgreSQL',
    image: '/images/projects/project-1.webp',
    tags: ['OSINT', 'Cybersecurity', 'Automation'],
    status: 'In Development',
    category: 'Security Tool',
    github: 'https://github.com/yourusername/argus',
  },
  {
    slug: 'aegis',
    title: 'Aegis',
    shortDescription:
      'A defensive systems concept centered around monitoring, visibility, and active protection workflows for modern environments.',
    techStack: 'Python, TypeScript, Docker, Redis',
    image: '/images/projects/project-2.png',
    tags: ['Cybersecurity', 'Defense', 'Systems'],
    status: 'Planned',
    category: 'Defense System',
    github: 'https://github.com/yourusername/aegis',
  },
  {
    slug: 'game-prototype',
    title: 'Game Prototype',
    shortDescription:
      'An experimental game project exploring interaction systems, atmosphere, and mechanics-driven worldbuilding.',
    techStack: 'Godot, GDScript, Blender',
    image: '/images/projects/project-3.jpg',
    tags: ['Game Dev', 'Prototype', 'Worldbuilding'],
    status: 'In Development',
    category: 'Game Prototype',
    github: 'https://github.com/yourusername/game-prototype',
  },
  {
    slug: 'portfolio-site',
    title: 'Portfolio Website',
    shortDescription:
      'A personal archive for software, writing, and art — designed to feel like a workspace rather than a conventional résumé site.',
    techStack: 'Next.js, TypeScript, Tailwind CSS, MDX',
    image: '/images/projects/project-4.jpeg',
    tags: ['Web Dev', 'Portfolio', 'Design'],
    status: 'In Development',
    category: 'Web Application',
    github: 'https://github.com/yourusername/portfolio',
  },
  {
    slug: 'neural-pattern-visualiser',
    title: 'Neural Pattern Visualiser',
    shortDescription:
      'An experimental visualization tool designed to explore patterns emerging from neural network training processes.',
    techStack: 'Python, PyTorch, FastAPI, React, D3.js',
    image: '/images/projects/neural-pattern-analyzer.jpg',
    tags: ['AI/ML', 'Visualization', 'Data Science'],
    status: 'In Development',
    category: 'AI Tool',
    github: 'https://github.com/yourusername/neural-pattern-visualiser',
    live: 'https://your-project.vercel.app',
  },
];