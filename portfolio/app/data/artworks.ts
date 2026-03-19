export type ArtworkEntry = {
  slug: string
  title: string
  image: string
  category?: string
  description?: string
}

export const artworks: ArtworkEntry[] = [
  {
    slug: "anno-character",
    title: "Anno Character Study",
    image: "/images/art/anno-character.jpg",
    category: "Character Design",
    description: "A character study exploring costume and posture.",
  },
  {
    slug: "cloaked-wanderer",
    title: "Cloaked Wanderer",
    image: "/images/art/cloaked-wanderer.jpg",
    category: "Concept Art",
    description: "Atmospheric landscape piece featuring a lone traveler.",
  },
]