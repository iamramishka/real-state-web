import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTABand() {
  return (
    <section aria-labelledby="cta-title" className="bg-ink text-on-ink">
      <div className="container-page section-y grid gap-6 text-center md:justify-items-center">
        <div className="grid max-w-3xl gap-3">
          <h2
            className="font-display text-h1 font-semibold text-balance"
            id="cta-title"
          >
            Ready to find your next home?
          </h2>
          <p className="text-body-lg text-white/75">
            Search thousands of listings with a single, natural-language search.
          </p>
        </div>

        <Button asChild className="text-ink bg-white hover:bg-white/90">
          <Link aria-label="Start searching for a home" href="/buy">
            Start your search
          </Link>
        </Button>
      </div>
    </section>
  );
}
