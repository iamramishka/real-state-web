import type { Property } from "@/data/properties";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nordhaven.example";

export const siteConfig = {
  name: "Nordhaven",
  title: "Nordhaven | Premium Real Estate Search",
  description:
    "Search premium homes, compare neighborhoods, meet trusted agents, and read practical market guidance with Nordhaven.",
  url: siteUrl,
  ogImage: "/images/hero-home.jpg",
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.ogImage),
    sameAs: [
      "https://www.instagram.com/",
      "https://www.linkedin.com/",
      "https://www.facebook.com/",
    ],
  };
}

export function getBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  };
}

export function getListingJsonLd(properties: Property[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Nordhaven real estate listings",
    itemListElement: properties.slice(0, 6).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "RealEstateListing",
        name: property.title,
        url: absoluteUrl(`/property/${property.slug}`),
        image: absoluteUrl(property.image.src),
        datePosted: property.listedAt,
        description: property.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: property.address,
          addressLocality: property.city,
          addressRegion: property.state,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        },
        offers: {
          "@type": "Offer",
          price: Math.round(property.price / 100),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}
