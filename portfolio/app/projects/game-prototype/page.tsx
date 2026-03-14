import ProjectTemplate from "@/app/components/project-template";

export default function GamePrototypeProject() {
  return (
    <ProjectTemplate
      title="Game Prototype"
      description={`An experimental game project exploring small systems-driven mechanics and atmospheric storytelling.

The goal is to build worlds that feel coherent and reactive, where simple mechanics interact to produce interesting behaviors.`}
      techStack="Godot, GDScript, Blender"
      image="/images/projects/project-3.jpg"
      github="https://github.com/yourusername/game-prototype"
    />
  );
}