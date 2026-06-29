import { JsonLd } from "@/components/JsonLd";
import { featuredProperties } from "@/data/properties";
import {
  getBreadcrumbJsonLd,
  getListingJsonLd,
  getOrganizationJsonLd,
} from "@/lib/seo";
import { Agents } from "@/sections/Agents";
import { CTABand } from "@/sections/CTABand";
import { Discovery } from "@/sections/Discovery";
import { FeaturedHomes } from "@/sections/FeaturedHomes";
import { FeatureBand } from "@/sections/FeatureBand";
import { Hero } from "@/sections/Hero";
import { HomesForYou } from "@/sections/HomesForYou";
import { MapListing } from "@/sections/MapListing";
import { News } from "@/sections/News";
import { SearchBar } from "@/sections/SearchBar";
import { Trends } from "@/sections/Trends";

export default function Home() {
  return (
    <main>
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getBreadcrumbJsonLd()} />
      <JsonLd data={getListingJsonLd(featuredProperties)} />
      <Hero />
      <SearchBar />
      <FeaturedHomes />
      <HomesForYou />
      <MapListing />
      <FeatureBand />
      <Discovery />
      <Agents />
      <News />
      <Trends />
      <CTABand />
    </main>
  );
}
