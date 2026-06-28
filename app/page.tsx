import { FeaturedHomes } from "@/sections/FeaturedHomes";
import { FeatureBand } from "@/sections/FeatureBand";
import { Discovery } from "@/sections/Discovery";
import { Hero } from "@/sections/Hero";
import { HomesForYou } from "@/sections/HomesForYou";
import { MapListing } from "@/sections/MapListing";
import { SearchBar } from "@/sections/SearchBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <FeaturedHomes />
      <HomesForYou />
      <MapListing />
      <FeatureBand />
      <Discovery />
    </main>
  );
}
