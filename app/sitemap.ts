import type { MetadataRoute } from "next";

import { articles } from "@/data/articles";
import { newsArticles } from "@/data/news";
import { properties } from "@/data/properties";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/buy",
    "/rent",
    "/sell",
    "/agents",
    "/news",
    "/contact",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date("2026-06-29"),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...properties.map((property) => ({
      url: absoluteUrl(`/property/${property.slug}`),
      lastModified: new Date(property.listedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...newsArticles.map((article) => ({
      url: absoluteUrl(`/news/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/news/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
