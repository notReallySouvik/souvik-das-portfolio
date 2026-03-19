import ProjectTemplate from "@/app/components/project-template";

export default function ProjectPage() {
  return (
    <ProjectTemplate
      title="Neural Pattern Visualiser"
      description={`Neural Pattern Visualizer is an experimental visualization tool designed to explore patterns emerging from neural network training processes.`}
      techStack="Python, PyTorch, FastAPI, React, D3.js"
      image="/images/projects/neural-pattern-analyzer.jpg"
      tags={["AI/ML", "Visualization", "Data Science"]}
      status="In Development"
      category="AI Tool"
      github="https://github.com/yourusername/neural-pattern-visualiser"
      live="https://your-project.vercel.app"
    />
  );
}