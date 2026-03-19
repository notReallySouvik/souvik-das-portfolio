export type PublicationStatus =
  | 'In Works'
  | 'In Hiatus'
  | 'Unreleased'
  | 'Publishing'
  | 'Published'
  | 'Published for Purchase'
  | 'Coming Soon';

export type WritingEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: string;

  category?: string;
  tags: string[];
  publicationStatus: PublicationStatus;

  fullDescription?: string;
  readLink?: string;
  buyLink?: string;
};

export const writings: WritingEntry[] = [
  {
    slug: 'echoes-of-ash',
    title: 'Echoes of Ash',
    category: 'Dark Fantasy',
    tags: ['Novel', 'Fantasy', 'Fiction'],
    publicationStatus: 'Publishing',
    coverImage: '/images/writing/echoes-of-ash.jpg',
    shortDescription:
      'A dark fantasy work exploring memory, ruin, and the fragile shape of identity.',
    fullDescription:
      'Echoes of Ash is a dark fantasy work concerned with ruin, memory, and emotional remains.',
    readLink: 'https://example.com/echoes-of-ash',
  },
  {
    slug: "winter-fragments",
    title: "Winter Fragments",
    category: "Poetry",
    tags: ["Poetry", "Collection"],
    publicationStatus: "In Hiatus",
    coverImage: "/images/writing/winter-fragments.jpg",
    shortDescription: "A poetry collection centered on grief, winter, repetition, and stillness.",
    fullDescription: "Winter Fragments is a poetry collection built around silence, weather, memory, and emotional aftermath. It gathers shorter pieces that return to loss, distance, and the slow shape of endurance.",
    readLink: "www.wattpad.com",
  },
];