import { FeaturedHomes } from "@/sections/FeaturedHomes";
import { Hero } from "@/sections/Hero";
import { HomesForYou } from "@/sections/HomesForYou";
import { SearchBar } from "@/sections/SearchBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <FeaturedHomes />
      <HomesForYou />
    </main>
  );
}
