import { Agents } from "@/sections/Agents";
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
    </main>
  );
}
