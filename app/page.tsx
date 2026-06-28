import { FeaturedHomes } from "@/sections/FeaturedHomes";
import { FeatureBand } from "@/sections/FeatureBand";
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
    </main>
  );
}
