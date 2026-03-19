import ArtworkTemplate from '@/app/components/artwork-template';

export default function CloakedWandererPage() {
  return (
    <ArtworkTemplate
      title="Cloaked Wanderer"
      image="/images/art/cloaked-wanderer.jpg"
      category="Concept Art"
      description={`An atmospheric concept piece centered on mood, distance, and solitary presence within a larger landscape.

The work leans more toward tone than action, using the figure as an anchor inside a quieter, more spacious visual world.`}
      toolsUsed="Photoshop"
      creationDate="February 2026"
    />
  );
}