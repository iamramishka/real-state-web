import { agents } from "@/data/agents";
import { articles } from "@/data/articles";
import { discoveryItems } from "@/data/discovery";
import { propertyFilters } from "@/data/filters";
import { footerConfig } from "@/data/footer";
import { navConfig } from "@/data/nav";
import { newsArticles } from "@/data/news";
import { properties } from "@/data/properties";
import { searchSuggestions } from "@/data/suggestions";

const publishedAt = new Date("2026-06-30T00:00:00.000Z");

const toDate = (value: string) => new Date(`${value}T00:00:00.000Z`);

const propertyCategoryMap = {
  "new-to-market": "NEW_TO_MARKET",
  "most-viewed": "MOST_VIEWED",
  "open-house": "OPEN_HOUSE",
  "price-drop": "PRICE_DROP",
  luxury: "LUXURY",
  sold: "SOLD",
} as const;

const propertyModeMap = {
  buy: "BUY",
  rent: "RENT",
  sold: "SOLD",
} as const;

export function buildSeedData() {
  const mediaAssets = [
    ...properties.flatMap((property) =>
      [property.image, ...(property.images ?? [])].map((image, index) => ({
        id: `media-property-${property.id}-${index}`,
        storageKey: image.src.replace(/^\//, ""),
        url: image.src,
        mimeType: "image/jpeg",
        width: image.width,
        height: image.height,
        altText: image.alt,
      })),
    ),
    ...agents.map((agent) => ({
      id: `media-agent-${agent.id}`,
      storageKey: agent.avatar.src.replace(/^\//, ""),
      url: agent.avatar.src,
      mimeType: "image/jpeg",
      width: agent.avatar.width,
      height: agent.avatar.height,
      altText: agent.avatar.alt,
    })),
    ...newsArticles.map((post) => ({
      id: `media-news-${post.id}`,
      storageKey: post.image.src.replace(/^\//, ""),
      url: post.image.src,
      mimeType: "image/jpeg",
      width: post.image.width,
      height: post.image.height,
      altText: post.image.alt,
    })),
    ...articles.map((post) => ({
      id: `media-article-${post.id}`,
      storageKey: post.image.src.replace(/^\//, ""),
      url: post.image.src,
      mimeType: "image/jpeg",
      width: post.image.width,
      height: post.image.height,
      altText: post.image.alt,
    })),
    ...discoveryItems.map((item) => ({
      id: `media-discovery-${item.id}`,
      storageKey: item.image.src.replace(/^\//, ""),
      url: item.image.src,
      mimeType: "image/jpeg",
      width: item.image.width,
      height: item.image.height,
      altText: item.image.alt,
    })),
  ];

  return {
    mediaAssets,
    properties: properties.map((property) => ({
      id: property.id,
      slug: property.slug,
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      priceCents: BigInt(property.price),
      priceLabel: property.priceLabel,
      mode: propertyModeMap[property.mode],
      categories: property.categories.map(
        (category) => propertyCategoryMap[category],
      ),
      beds: property.meta.beds,
      baths: property.meta.baths,
      squareFeet: property.meta.sqft,
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
      description: property.description,
      featured: property.featured,
      recommended: property.forYou,
      status: "PUBLISHED" as const,
      listedAt: toDate(property.listedAt),
      publishedAt,
    })),
    propertyImages: properties.flatMap((property) =>
      [property.image, ...(property.images ?? [])].map((image, index) => ({
        id: `property-image-${property.id}-${index}`,
        propertyId: property.id,
        mediaAssetId: `media-property-${property.id}-${index}`,
        sortOrder: index,
        altTextOverride: image.alt,
      })),
    ),
    agents: agents.map((agent) => ({
      id: agent.id,
      slug: agent.slug,
      name: agent.name,
      agency: agent.agency,
      title: agent.title,
      areasServed: agent.areasServed,
      bio: agent.bio,
      ratingValue: agent.rating.value,
      reviewCount: agent.rating.reviews,
      featured: agent.featured,
      status: "PUBLISHED" as const,
      avatarMediaId: `media-agent-${agent.id}`,
      publishedAt,
    })),
    editorialPosts: [
      ...newsArticles.map((post) => ({
        id: post.id,
        slug: post.slug,
        type: "NEWS" as const,
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        category: post.category,
        featured: post.featured,
        status: "PUBLISHED" as const,
        coverMediaId: `media-news-${post.id}`,
        publishedAt: toDate(post.publishedAt),
      })),
      ...articles.map((post) => ({
        id: post.id,
        slug: post.slug,
        type: "ARTICLE" as const,
        title: post.title,
        excerpt: post.excerpt,
        tag: post.tag,
        featured: post.featured,
        status: "PUBLISHED" as const,
        coverMediaId: `media-article-${post.id}`,
        publishedAt: toDate(post.publishedAt),
      })),
    ],
    navItems: [
      ...navConfig.items.map((item, index) => ({
        id: `nav-primary-${index}`,
        location: "primary",
        label: item.label,
        href: item.href,
        ariaLabel: item.ariaLabel,
        sortOrder: index,
        status: "PUBLISHED" as const,
      })),
      {
        id: "nav-primary-cta",
        location: "cta",
        label: navConfig.cta.label,
        href: navConfig.cta.href,
        ariaLabel: "Contact Nordhaven",
        sortOrder: 0,
        status: "PUBLISHED" as const,
      },
    ],
    footerColumns: footerConfig.columns.map((column, index) => ({
      id: `footer-column-${index}`,
      heading: column.heading,
      sortOrder: index,
      status: "PUBLISHED" as const,
    })),
    footerLinks: footerConfig.columns.flatMap((column, columnIndex) =>
      column.links.map((link, linkIndex) => ({
        id: `footer-link-${columnIndex}-${linkIndex}`,
        columnId: `footer-column-${columnIndex}`,
        label: link.label,
        href: link.href,
        external: link.external ?? false,
        sortOrder: linkIndex,
      })),
    ),
    socialLinks: footerConfig.social.map((link, index) => ({
      id: `social-${link.platform.toLowerCase()}`,
      platform: link.platform,
      href: link.href,
      ariaLabel: link.ariaLabel,
      sortOrder: index,
      status: "PUBLISHED" as const,
    })),
    searchSuggestions: searchSuggestions.map((suggestion, index) => ({
      id: suggestion.id,
      label: suggestion.label,
      query: suggestion.query,
      mode: suggestion.mode ?? "all",
      sortOrder: index,
      status: "PUBLISHED" as const,
    })),
    filterChips: propertyFilters.map((filter, index) => ({
      id: filter.id,
      label: filter.label,
      value: filter.value,
      defaultActive: filter.defaultActive,
      sortOrder: index,
      status: "PUBLISHED" as const,
    })),
    discoveryCards: discoveryItems.map((item, index) => ({
      id: item.id,
      label: item.label,
      heading: item.heading,
      description: item.description,
      href: item.href,
      imageMediaId: `media-discovery-${item.id}`,
      sortOrder: index,
      status: "PUBLISHED" as const,
    })),
    siteCopy: [
      {
        key: "site.brand",
        value: { text: navConfig.brand },
        description: "Primary site brand name.",
        status: "PUBLISHED" as const,
      },
      {
        key: "footer.settings",
        value: {
          brand: footerConfig.brand,
          tagline: footerConfig.tagline,
          newsletter: footerConfig.newsletter,
          legal: footerConfig.legal,
        },
        description: "Footer brand, newsletter, and legal copy.",
        status: "PUBLISHED" as const,
      },
    ],
  };
}
