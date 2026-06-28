export type Slug = string;

export interface Image {
  alt: string;
  height: number;
  src: string;
  width: number;
}

export type PropertyMode = "buy" | "rent" | "sold";

export type PropertyCategory =
  | "new-to-market"
  | "most-viewed"
  | "open-house"
  | "price-drop"
  | "luxury"
  | "sold";

export interface PropertyMeta {
  baths: number;
  beds: number;
  sqft: number;
}

export interface Property {
  address: string;
  categories: PropertyCategory[];
  city: string;
  coordinates: { lat: number; lng: number };
  description?: string;
  featured: boolean;
  forYou: boolean;
  id: string;
  image: Image;
  images?: Image[];
  listedAt: string;
  meta: PropertyMeta;
  mode: PropertyMode;
  price: number;
  priceLabel?: string;
  slug: Slug;
  state: string;
  title: string;
}

export const properties: Property[] = [
  {
    id: "prop-001",
    slug: "laurel-canyon-glass-residence",
    title: "Laurel Canyon Glass Residence",
    address: "1824 Crestline Drive, Austin, TX",
    city: "Austin",
    state: "TX",
    price: 284000000,
    mode: "buy",
    categories: ["new-to-market", "luxury", "most-viewed"],
    meta: { beds: 4, baths: 4, sqft: 3920 },
    image: {
      src: "/images/properties/hillside-glass-home.png",
      alt: "A contemporary glass hillside home with warm interior lights and mature landscaping.",
      width: 512,
      height: 320,
    },
    coordinates: { lat: 30.3036, lng: -97.8021 },
    featured: true,
    forYou: true,
    listedAt: "2026-05-18",
    description:
      "A private hillside home with floor-to-ceiling glass, layered outdoor terraces, and sunset views.",
  },
  {
    id: "prop-002",
    slug: "willow-street-townhouse",
    title: "Willow Street Townhouse",
    address: "41 Willow Street, Brooklyn, NY",
    city: "Brooklyn",
    state: "NY",
    price: 198500000,
    mode: "buy",
    categories: ["open-house", "most-viewed"],
    meta: { beds: 3, baths: 3, sqft: 2140 },
    image: {
      src: "/images/properties/brick-townhouse.png",
      alt: "A warm brick townhouse with black-framed windows and a small landscaped entry.",
      width: 512,
      height: 320,
    },
    coordinates: { lat: 40.696, lng: -73.995 },
    featured: true,
    forYou: false,
    listedAt: "2026-05-22",
  },
  {
    id: "prop-003",
    slug: "mariner-point-villa",
    title: "Mariner Point Villa",
    address: "710 Harbor View Road, Santa Barbara, CA",
    city: "Santa Barbara",
    state: "CA",
    price: 412500000,
    mode: "buy",
    categories: ["luxury", "new-to-market"],
    meta: { beds: 5, baths: 5, sqft: 4860 },
    image: {
      src: "/images/properties/coastal-modern-villa.png",
      alt: "A coastal modern villa with pale stone walls, glass balconies, and ocean-facing landscaping.",
      width: 512,
      height: 320,
    },
    coordinates: { lat: 34.4208, lng: -119.6982 },
    featured: true,
    forYou: true,
    listedAt: "2026-05-29",
  },
  {
    id: "prop-004",
    slug: "maple-grove-craftsman",
    title: "Maple Grove Craftsman",
    address: "96 Maple Grove Lane, Portland, OR",
    city: "Portland",
    state: "OR",
    price: 124000000,
    mode: "buy",
    categories: ["price-drop", "open-house"],
    meta: { beds: 4, baths: 3, sqft: 2680 },
    image: {
      src: "/images/properties/renovated-craftsman.png",
      alt: "A renovated Craftsman home with a covered porch, deep eaves, and lush front garden.",
      width: 512,
      height: 320,
    },
    coordinates: { lat: 45.5152, lng: -122.6784 },
    featured: true,
    forYou: false,
    listedAt: "2026-04-28",
  },
  {
    id: "prop-005",
    slug: "atlas-penthouse-terrace",
    title: "Atlas Penthouse Terrace",
    address: "1208 Westline Avenue, Chicago, IL",
    city: "Chicago",
    state: "IL",
    price: 875000,
    priceLabel: "$8,750 / mo",
    mode: "rent",
    categories: ["most-viewed", "luxury"],
    meta: { beds: 2, baths: 2, sqft: 1610 },
    image: {
      src: "/images/properties/penthouse-terrace.png",
      alt: "A downtown penthouse terrace with glass railing, skyline views, and modern outdoor seating.",
      width: 512,
      height: 320,
    },
    coordinates: { lat: 41.8781, lng: -87.6298 },
    featured: true,
    forYou: true,
    listedAt: "2026-05-31",
  },
  {
    id: "prop-006",
    slug: "oak-hollow-family-home",
    title: "Oak Hollow Family Home",
    address: "28 Oak Hollow Court, Franklin, TN",
    city: "Franklin",
    state: "TN",
    price: 94500000,
    mode: "buy",
    categories: ["new-to-market"],
    meta: { beds: 4, baths: 3, sqft: 3015 },
    image: {
      src: "/images/properties/suburban-family-home.png",
      alt: "A quiet suburban family home with a wide front lawn, trees, and soft evening light.",
      width: 512,
      height: 320,
    },
    coordinates: { lat: 35.9251, lng: -86.8689 },
    featured: true,
    forYou: true,
    listedAt: "2026-06-02",
  },
];

export const featuredProperties = properties.filter(
  (property) => property.featured,
);

export const homesForYouProperties = properties.filter(
  (property) => property.forYou,
);
