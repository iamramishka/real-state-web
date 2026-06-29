import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { discoveryItems, type DiscoveryItem } from "@/data/discovery";

function DiscoveryCard({ item }: { item: DiscoveryItem }) {
  return (
    <article className="border-line bg-surface shadow-soft grid h-full overflow-hidden rounded-xl border">
      <Image
        alt={item.image.alt}
        className="aspect-[16/10] h-auto w-full object-cover"
        height={item.image.height}
        sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) 50vw, 392px"
        src={item.image.src}
        width={item.image.width}
      />

      <div className="grid gap-5 p-5 sm:p-6">
        <div className="grid gap-3">
          <p className="text-small text-accent font-semibold tracking-[0.08em] uppercase">
            {item.label}
          </p>
          <h3 className="text-h3 text-ink font-semibold">{item.heading}</h3>
          <p className="text-body text-muted">{item.description}</p>
        </div>

        <Button asChild className="w-fit" variant="secondary">
          <Link aria-label={`Explore ${item.heading}`} href={item.href}>
            Explore
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function Discovery() {
  return (
    <section aria-labelledby="discovery-title" className="bg-bg section-y">
      <div className="container-page grid gap-8">
        <div className="grid gap-3 md:max-w-2xl">
          <h2
            className="font-display text-h1 text-ink font-semibold text-balance"
            id="discovery-title"
          >
            Explore your next neighbourhood
          </h2>
          <p className="text-body-lg text-muted">
            Find the area that fits your life — schools, commute, cafés, and
            everything in between.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {discoveryItems.map((item) => (
            <DiscoveryCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
