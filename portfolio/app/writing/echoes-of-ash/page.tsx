import WritingTemplate from '@/app/components/writing-template';

export default function EchoesOfAshPage() {
  return (
    <WritingTemplate
      title="Echoes of Ash"
      category="Fantasy"
      publicationStatus="Publishing"
      coverImage="/images/writing/echoes-of-ash.jpg"
      description={`Echoes of Ash is a dark fantasy work concerned with ruin, memory, and the emotional remains of things that once held shape.

It explores what survives after collapse — not only in kingdoms or cities, but in people. The work leans into atmosphere, fracture, and the lingering weight of what cannot be repaired cleanly.`}
      readLink="https://example.com/echoes-of-ash"
    />
  );
}