import { describe, expect, it } from "vitest";

import { agents } from "@/data/agents";
import { articles } from "@/data/articles";
import { discoveryItems } from "@/data/discovery";
import { propertyFilters } from "@/data/filters";
import { footerConfig } from "@/data/footer";
import { navConfig } from "@/data/nav";
import { newsArticles } from "@/data/news";
import { properties } from "@/data/properties";
import { searchSuggestions } from "@/data/suggestions";
import { buildSeedData } from "@/lib/db/seed-data";

describe("database seed data", () => {
  it("maps every static content record into the database seed", () => {
    const seed = buildSeedData();

    expect(seed.properties).toHaveLength(properties.length);
    expect(seed.propertyImages).toHaveLength(
      properties.reduce(
        (total, property) => total + 1 + (property.images?.length ?? 0),
        0,
      ),
    );
    expect(seed.agents).toHaveLength(agents.length);
    expect(seed.editorialPosts).toHaveLength(
      newsArticles.length + articles.length,
    );
    expect(seed.navItems).toHaveLength(navConfig.items.length + 1);
    expect(seed.footerColumns).toHaveLength(footerConfig.columns.length);
    expect(seed.footerLinks).toHaveLength(
      footerConfig.columns.reduce(
        (total, column) => total + column.links.length,
        0,
      ),
    );
    expect(seed.searchSuggestions).toHaveLength(searchSuggestions.length);
    expect(seed.filterChips).toHaveLength(propertyFilters.length);
    expect(seed.discoveryCards).toHaveLength(discoveryItems.length);
  });

  it("creates unique identifiers and valid media relationships", () => {
    const seed = buildSeedData();
    const mediaIds = new Set(seed.mediaAssets.map((asset) => asset.id));
    const storageKeys = new Set(
      seed.mediaAssets.map((asset) => asset.storageKey),
    );

    expect(mediaIds.size).toBe(seed.mediaAssets.length);
    expect(storageKeys.size).toBe(seed.mediaAssets.length);

    for (const image of seed.propertyImages) {
      expect(mediaIds.has(image.mediaAssetId)).toBe(true);
    }

    for (const agent of seed.agents) {
      expect(mediaIds.has(agent.avatarMediaId)).toBe(true);
    }

    for (const post of seed.editorialPosts) {
      expect(mediaIds.has(post.coverMediaId)).toBe(true);
    }
  });

  it("normalizes public property values for PostgreSQL", () => {
    const seed = buildSeedData();
    const firstProperty = seed.properties[0];

    expect(firstProperty.priceCents).toBe(BigInt(properties[0].price));
    expect(firstProperty.mode).toBe("BUY");
    expect(firstProperty.categories).toContain("NEW_TO_MARKET");
    expect(firstProperty.listedAt).toBeInstanceOf(Date);
    expect(firstProperty.status).toBe("PUBLISHED");
  });
});
