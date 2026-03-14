import ProjectTemplate from "@/app/components/project-template";

export default function ArgusProject() {
  return (
    <ProjectTemplate
      title="Argus"
      description={`Argus is a reconnaissance-focused OSINT tool designed to automate structured intelligence gathering.

The project explores how data from multiple sources can be collected, normalized, and analyzed to surface patterns that would otherwise remain hidden.

It focuses on modular data collectors, automated correlation, and workflows that support both exploratory investigation and structured analysis.`}
      techStack="Python, FastAPI, React, PostgreSQL"
      image="/images/projects/project-1.webp"
      github="https://github.com/yourusername/argus"
    />
  );
}