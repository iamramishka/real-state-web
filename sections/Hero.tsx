import Image from "next/image";

import { SearchForm } from "@/components/forms/SearchForm";
import { searchSuggestions } from "@/data/suggestions";

const heroImage = {
  src: "/images/hero-home.jpg",
  alt: "A contemporary luxury home with floor-to-ceiling windows, surrounded by mature trees at dusk.",
};

export function Hero() {
  return (
    <section className="bg-surface text-ink">
      {/* Text zone — headline left, supporting copy right */}
      <div className="container-page pb-8 pt-10 md:pb-12 md:pt-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start">
          <h1 className="font-display text-display-1 font-semibold text-balance">
            <span className="block">Find the home</span>
            <span className="block">you&apos;ve been imagining.</span>
          </h1>
          <p className="text-body-lg text-muted max-w-xl text-pretty lg:pt-8">
            More than a property search — Nordhaven connects you with the homes,
            neighbourhoods, and people that make the move worth making.
          </p>
        </div>
      </div>

      {/* Full-bleed image with search card floating at the bottom */}
      <div className="relative">
        <div className="relative h-[380px] overflow-hidden sm:h-[440px] md:h-[520px] lg:h-[600px]">
          <Image
            alt={heroImage.alt}
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src={heroImage.src}
          />
        </div>

        {/* Floating search card — anchored inside the bottom of the image */}
        <div className="absolute bottom-0 left-0 right-0 pb-6 md:pb-8">
          <div className="container-page">
            <SearchForm suggestions={searchSuggestions} />
          </div>
        </div>
      </div>
    </section>
  );
}
