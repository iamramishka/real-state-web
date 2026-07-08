import { PrismaClient } from "@prisma/client";

import { buildSeedData } from "../lib/db/seed-data";

const prisma = new PrismaClient();

async function resetSeededContent() {
  await prisma.$transaction([
    prisma.propertyImage.deleteMany(),
    prisma.property.deleteMany(),
    prisma.realEstateAgent.deleteMany(),
    prisma.editorialPost.deleteMany(),
    prisma.discoveryCard.deleteMany(),
    prisma.searchSuggestion.deleteMany(),
    prisma.filterChip.deleteMany(),
    prisma.socialLink.deleteMany(),
    prisma.footerLink.deleteMany(),
    prisma.footerColumn.deleteMany(),
    prisma.siteNavItem.deleteMany(),
    prisma.siteCopy.deleteMany(),
    prisma.mediaAsset.deleteMany(),
  ]);
}

async function main() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_PRODUCTION_SEED !== "true"
  ) {
    throw new Error(
      "Production seeding is disabled. Set ALLOW_PRODUCTION_SEED=true to confirm.",
    );
  }

  const seed = buildSeedData();

  await resetSeededContent();

  await prisma.mediaAsset.createMany({ data: seed.mediaAssets });
  await prisma.realEstateAgent.createMany({ data: seed.agents });
  await prisma.property.createMany({ data: seed.properties });
  await prisma.propertyImage.createMany({ data: seed.propertyImages });
  await prisma.editorialPost.createMany({ data: seed.editorialPosts });
  await prisma.siteNavItem.createMany({ data: seed.navItems });
  await prisma.footerColumn.createMany({ data: seed.footerColumns });
  await prisma.footerLink.createMany({ data: seed.footerLinks });
  await prisma.socialLink.createMany({ data: seed.socialLinks });
  await prisma.searchSuggestion.createMany({
    data: seed.searchSuggestions,
  });
  await prisma.filterChip.createMany({ data: seed.filterChips });
  await prisma.discoveryCard.createMany({ data: seed.discoveryCards });

  for (const copy of seed.siteCopy) {
    await prisma.siteCopy.create({ data: copy });
  }

  console.info(
    `Seeded ${seed.properties.length} properties, ${seed.agents.length} agents, and ${seed.editorialPosts.length} editorial posts.`,
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
