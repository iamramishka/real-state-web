export interface DiscoveryItem {
  description: string;
  heading: string;
  href: string;
  id: string;
  image: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  label: string;
}

export const discoveryItems: DiscoveryItem[] = [
  {
    description: "Explore lifestyle, schools, and walkability scores.",
    heading: "Search neighbourhoods",
    href: "/neighbourhoods",
    id: "neighbourhoods",
    image: {
      alt: "A walkable neighbourhood street with cafes, townhomes, trees, and a sunny sidewalk.",
      height: 750,
      src: "/images/discovery/neighbourhoods.jpg",
      width: 1200,
    },
    label: "Search neighbourhoods",
  },
  {
    description: "Discover newly completed developments before they sell out.",
    heading: "New builds near you",
    href: "/new-homes",
    id: "new-homes",
    image: {
      alt: "A row of newly built contemporary townhomes with landscaped walkways and large windows.",
      height: 750,
      src: "/images/discovery/new-homes.jpg",
      width: 1200,
    },
    label: "New homes",
  },
  {
    description: "Browse our network of local specialists by area.",
    heading: "Meet your agent",
    href: "/agents",
    id: "agents",
    image: {
      alt: "A refined real estate office desk with a neighbourhood map, listing photos, and consultation materials.",
      height: 750,
      src: "/images/discovery/agents.jpg",
      width: 1200,
    },
    label: "Agent directory",
  },
];
