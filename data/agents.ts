export interface AgentImage {
  alt: string;
  height: number;
  src: string;
  width: number;
}

export interface AgentRating {
  reviews: number;
  value: number;
}

export interface Agent {
  agency: string;
  areasServed: string[];
  avatar: AgentImage;
  bio?: string;
  featured: boolean;
  id: string;
  name: string;
  rating: AgentRating;
  slug: string;
  title: string;
}

export const agents: Agent[] = [
  {
    agency: "Nordhaven Austin",
    areasServed: ["Downtown", "Clarksville", "West Lake"],
    avatar: {
      alt: "Maya Chen, senior sales consultant at Nordhaven.",
      height: 512,
      src: "/images/agents/maya-chen.jpg",
      width: 512,
    },
    bio: "Known for pricing strategy and calm, detailed seller guidance.",
    featured: true,
    id: "maya-chen",
    name: "Maya Chen",
    rating: {
      reviews: 84,
      value: 4.9,
    },
    slug: "maya-chen",
    title: "Senior Sales Consultant",
  },
  {
    agency: "Nordhaven Estates",
    areasServed: ["Tarrytown", "Barton Creek", "Rollingwood"],
    avatar: {
      alt: "Jordan Ellis, luxury property specialist at Nordhaven.",
      height: 512,
      src: "/images/agents/jordan-ellis.jpg",
      width: 512,
    },
    bio: "A trusted advisor for premium homes and discreet off-market searches.",
    featured: true,
    id: "jordan-ellis",
    name: "Jordan Ellis",
    rating: {
      reviews: 76,
      value: 4.8,
    },
    slug: "jordan-ellis",
    title: "Luxury Property Specialist",
  },
  {
    agency: "Nordhaven Local",
    areasServed: ["Mueller", "Hyde Park", "East Austin"],
    avatar: {
      alt: "Sofia Ramirez, neighbourhood sales consultant at Nordhaven.",
      height: 512,
      src: "/images/agents/sofia-ramirez.jpg",
      width: 512,
    },
    bio: "Pairs neighbourhood-level insight with practical buying timelines.",
    featured: true,
    id: "sofia-ramirez",
    name: "Sofia Ramirez",
    rating: {
      reviews: 91,
      value: 5,
    },
    slug: "sofia-ramirez",
    title: "Neighbourhood Sales Consultant",
  },
  {
    agency: "Nordhaven Advisory",
    areasServed: ["Lake Austin", "Old West Austin", "Zilker"],
    avatar: {
      alt: "Theo Bennett, buyer advocate at Nordhaven.",
      height: 512,
      src: "/images/agents/theo-bennett.jpg",
      width: 512,
    },
    bio: "Guides buyers through competitive searches with measured negotiation.",
    featured: true,
    id: "theo-bennett",
    name: "Theo Bennett",
    rating: {
      reviews: 68,
      value: 4.9,
    },
    slug: "theo-bennett",
    title: "Buyer Advocate",
  },
];

export const featuredAgents = agents.filter((agent) => agent.featured);
