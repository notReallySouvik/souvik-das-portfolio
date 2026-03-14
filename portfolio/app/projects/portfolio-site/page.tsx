import ProjectTemplate from "@/app/components/project-template";

export default function PortfolioProject() {
  return (
    <ProjectTemplate
      title="Portfolio Website"
      description={`This website serves as a personal archive for my work across software, writing, and digital art.

Rather than a traditional portfolio, it is designed to feel like a workspace — a place where projects, ideas, and experiments are documented and explored.`}
      techStack="Next.js, TypeScript, Tailwind CSS, MDX"
      image="/images/projects/project-4.jpeg"
      github="https://github.com/yourusername/portfolio"
    />
  );
}