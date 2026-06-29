export interface NewsImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: NewsImage;
  publishedAt: string;
  author?: string;
  category?: string;
  featured: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "news-market-velocity",
    slug: "market-velocity-shifts",
    title: "Inventory is rising, but turnkey homes still move first",
    excerpt:
      "Fresh supply is giving buyers more room to compare, while polished homes in walkable neighborhoods continue to command fast decisions.",
    image: {
      src: "/images/news/market-shift.jpg",
      alt: "Residential towers and new construction cranes at sunrise.",
      width: 1200,
      height: 750,
    },
    publishedAt: "2026-06-12",
    author: "Nordhaven Research",
    category: "Market update",
    featured: true,
  },
  {
    id: "news-buyer-paperwork",
    slug: "buyer-document-checklist",
    title: "The documents buyers should prepare before touring",
    excerpt:
      "A clean financing packet, clear wish list, and pre-approval timeline can turn a good tour into a confident offer.",
    image: {
      src: "/images/news/buyer-guide.jpg",
      alt: "A buyer reviews property documents beside a laptop and house keys.",
      width: 1200,
      height: 750,
    },
    publishedAt: "2026-05-28",
    author: "Elena Morris",
    category: "Buying guide",
    featured: true,
  },
  {
    id: "news-open-house",
    slug: "open-house-season",
    title: "Open house season brings renewed interest to city homes",
    excerpt:
      "Townhouse showings are drawing more prepared visitors as buyers balance location, outdoor space, and long-term value.",
    image: {
      src: "/images/news/open-house.jpg",
      alt: "An elegant townhouse street with landscaped entrances in warm light.",
      width: 1200,
      height: 750,
    },
    publishedAt: "2026-05-14",
    author: "Nordhaven Editorial",
    category: "Local news",
    featured: true,
  },
];

export const featuredNews = newsArticles.filter((article) => article.featured);
