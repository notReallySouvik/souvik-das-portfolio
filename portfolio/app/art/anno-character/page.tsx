import ArtworkTemplate from '@/app/components/artwork-template';

export default function AnnoCharacterPage() {
  return (
    <ArtworkTemplate
      title="Anno Character Study"
      image="/images/art/anno-character.jpg"
      category="Character Design"
      description={`A character study focused on silhouette, costume balance, and restrained visual storytelling.

The piece explores a more composed, serious presentation — aiming for something that feels elegant, self-contained, and quietly intense rather than overly ornate.`}
      toolsUsed="Clip Studio Paint, Photoshop"
      creationDate="March 2026"
    />
  );
}