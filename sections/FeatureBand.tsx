import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const sellerPoints = [
  "Suggested listing price within 48 hours",
  "Professional photography included",
  "Access to pre-qualified buyers",
  "Dedicated agent from listing to close",
];

const featureImage = {
  alt: "A beautifully staged open-plan living room with natural light streaming through large windows.",
  height: 750,
  src: "/images/sell-feature-living-room.jpg",
  width: 1200,
};

export function FeatureBand() {
  return (
    <section
      aria-labelledby="seller-band-title"
      className="bg-bg-soft section-y"
    >
      <div className="container-page">
        <div className="border-line bg-surface shadow-soft grid overflow-hidden rounded-xl border lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="grid content-center gap-8 p-6 sm:p-8 lg:p-12">
            <div className="grid gap-5">
              <h2
                className="font-display text-h1 text-ink font-semibold text-balance"
                id="seller-band-title"
              >
                <span className="block">The smarter way to</span>
                <span className="block">sell your home.</span>
              </h2>
              <p className="text-body-lg text-muted max-w-xl">
                We combine sharp market insight, expert staging advice, and a
                network of serious buyers to get you the best result — faster
                and with less stress than the traditional route.
              </p>
            </div>

            <ul className="text-body text-ink-700 grid gap-3 font-medium">
              {sellerPoints.map((point) => (
                <li className="flex gap-3" key={point}>
                  <span
                    aria-hidden="true"
                    className="bg-accent mt-2 size-2 shrink-0 rounded-full"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Button asChild className="w-fit">
              <Link
                aria-label="Learn more about selling with Nordhaven"
                href="/sell"
                prefetch={false}
              >
                Learn more
              </Link>
            </Button>
          </div>

          <div className="min-h-72 lg:min-h-[34rem]">
            <Image
              alt={featureImage.alt}
              className="h-full w-full object-cover"
              height={featureImage.height}
              sizes="(max-width: 1024px) calc(100vw - 2rem), 50vw"
              src={featureImage.src}
              width={featureImage.width}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
