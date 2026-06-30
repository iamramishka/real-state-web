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
    <section className="text-ink">
      {/* Full-viewport image — no container, no rounding */}
      <div className="relative h-screen min-h-[600px]">
        <Image
          alt={heroImage.alt}
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={heroImage.src}
        />

        {/* Light wash keeps the dark headline legible over the image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/90 via-white/55 to-transparent"
        />
        {/* Soft shade separates the search card from the image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent"
        />

        {/* Content overlay: headline pinned top, search pinned bottom */}
        <div className="absolute inset-0 flex flex-col justify-between py-6 sm:py-10 md:py-14">
          <div className="container-page">
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
          </div>

          <div className="container-page grid gap-3">
            <SearchForm />
            <SuggestionChipRow items={searchSuggestions} />
          </div>
        </div>
      </div>
    </section>
  );
}
