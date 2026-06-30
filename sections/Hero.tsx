import Image from "next/image";

import { SearchForm } from "@/components/forms/SearchForm";
import { SuggestionChipRow } from "@/components/ui/Chip";
import { searchSuggestions } from "@/data/suggestions";

const heroImage = {
  src: "/images/hero-home.png",
  alt: "A contemporary luxury home with floor-to-ceiling windows, surrounded by mature trees at dusk.",
};

export function Hero() {
  return (
    <section className="bg-surface text-ink">
      <div className="container-page pt-6 pb-12 md:pt-8 md:pb-16">
        {/* Contained, rounded hero card — heading + search overlap the image */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative h-[600px] sm:h-[660px] md:h-[720px] lg:h-[780px]">
            <Image
              alt={heroImage.alt}
              className="object-cover object-center"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              src={heroImage.src}
            />
          </div>

          {/* Light wash at the top keeps the dark headline legible over the image */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/90 via-white/55 to-transparent"
          />
          {/* Soft shade at the bottom separates the search card from the image */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent"
          />

          {/* Overlay: headline pinned to the top, search card to the bottom */}
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-12">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-start">
              <h1 className="font-display text-display-1 text-ink font-semibold text-balance">
                <span className="block">Find the home</span>
                <span className="block">you&apos;ve been imagining.</span>
              </h1>
              <p className="text-body-lg text-ink-700 max-w-sm text-pretty lg:justify-self-end lg:pt-4">
                More than a property search — Nordhaven connects you with the
                homes, neighbourhoods, and people that make the move worth
                making.
              </p>
            </div>

            <div className="grid gap-3">
              <SearchForm />
              <SuggestionChipRow items={searchSuggestions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
