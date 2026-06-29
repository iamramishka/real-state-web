export interface ArticleImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: ArticleImage;
  publishedAt: string;
  tag: string;
  featured: boolean;
}

export const articles: Article[] = [
  {
    id: "article-reading-nook",
    slug: "quiet-corners-buyers-notice",
    title: "Quiet corners buyers remember after the tour",
    excerpt:
      "Small, intentional spaces can help a home feel calm, livable, and more memorable in a competitive search.",
    image: {
      src: "/images/articles/reading-nook.jpg",
      alt: "A serene reading corner with a lounge chair, books, and warm natural light.",
      width: 1200,
      height: 750,
    },
    publishedAt: "2026-06-05",
    tag: "Property inspiration",
    featured: true,
  },
  {
    id: "article-garden-patio",
    slug: "low-maintenance-outdoor-living",
    title: "Outdoor spaces that feel beautiful and easy to keep",
    excerpt:
      "Native planting, layered seating, and durable finishes can make a patio useful through more of the year.",
    image: {
      src: "/images/articles/garden-patio.jpg",
      alt: "A contemporary garden patio with native planting beside a modern home.",
      width: 1200,
      height: 750,
    },
    publishedAt: "2026-05-22",
    tag: "Renovation",
    featured: true,
  },
  {
    id: "article-home-office",
    slug: "home-office-neighborhood-view",
    title: "What remote workers now look for in a neighborhood",
    excerpt:
      "Light, quiet, local coffee, and reliable commuting options are shaping how buyers evaluate everyday comfort.",
    image: {
      src: "/images/articles/home-office.jpg",
      alt: "A calm home office nook overlooking a leafy neighborhood.",
      width: 1200,
      height: 750,
    },
    publishedAt: "2026-05-09",
    tag: "Market trends",
    featured: true,
  },
  {
    id: "article-material-palette",
    slug: "timeless-renovation-materials",
    title: "Materials that make a renovation feel timeless",
    excerpt:
      "Stone, warm wood, soft texture, and restrained metal finishes can lift a space without chasing a short trend.",
    image: {
      src: "/images/articles/material-palette.jpg",
      alt: "A refined flat lay of stone, wood, fabric, and brass renovation materials.",
      width: 1200,
      height: 750,
    },
    publishedAt: "2026-04-24",
    tag: "Design tips",
    featured: true,
  },
];

export const featuredArticles = articles.filter((article) => article.featured);
