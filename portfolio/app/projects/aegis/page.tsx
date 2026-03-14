import ProjectTemplate from "@/app/components/project-template";

export default function AegisProject() {
  return (
    <ProjectTemplate
      title="Aegis"
      description={`Aegis is an experimental defensive monitoring system focused on visibility and adaptive security workflows.

The project investigates how defensive tooling can provide meaningful insight without overwhelming the user, combining monitoring, alerting, and contextual analysis.`}
      techStack="Python, TypeScript, Docker, Redis"
      image="/images/projects/project-2.png"
      github="https://github.com/yourusername/aegis"
    />
  );
}