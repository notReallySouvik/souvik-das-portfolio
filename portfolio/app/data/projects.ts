export type ProjectEntry = {
  slug: string;
  title: string;
  description: string;
  techStack: string;
  image: string;
  github?: string;
  live?: string;
};

export const projects: ProjectEntry[] = [
  {
    slug: 'argus',
    title: 'Argus',
    description:
      'A reconnaissance-focused security tool built to automate structured information gathering and surface useful patterns across targets.',
    techStack: 'Python, FastAPI, React, PostgreSQL',
    image: 'portfolio/public/images/projects/project-1.webp',
    github: 'https://github.com/yourusername/argus',
  },
  {
    slug: 'aegis',
    title: 'Aegis',
    description:
      'A defensive systems concept centered around monitoring, visibility, and active protection workflows for modern environments.',
    techStack: 'Python, TypeScript, Docker, Redis',
    image: 'portfolio/public/images/projects/project-2.png',
    github: 'https://github.com/yourusername/aegis',
  },
  {
    slug: 'game-prototype',
    title: 'Game Prototype',
    description:
      'An experimental game project exploring interaction systems, atmosphere, and mechanics-driven worldbuilding.',
    techStack: 'Godot, GDScript, Blender',
    image: 'portfolio/public/images/projects/project-3.jpg',
    github: 'https://github.com/yourusername/game-prototype',
  },
  {
    slug: 'portfolio-site',
    title: 'Portfolio Website',
    description:
      'A personal archive for software, writing, and art — designed to feel like a workspace rather than a conventional résumé site.',
    techStack: 'Next.js, TypeScript, Tailwind CSS, MDX',
    image: 'portfolio/public/images/projects/project-4.jpeg',
    github: 'https://github.com/yourusername/portfolio',
  },
];