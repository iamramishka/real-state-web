import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Agent } from "@/data/agents";

function formatRating(value: number) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}

function RatingStars({ rating }: { rating: Agent["rating"] }) {
  const ratingLabel = `${formatRating(rating.value)} out of 5 stars — ${
    rating.reviews
  } reviews`;
  const filledStars = Math.round(rating.value);

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{ratingLabel}</span>
      <span aria-hidden="true" className="text-accent flex">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            className="size-4"
            fill={index < filledStars ? "currentColor" : "none"}
            key={index}
          />
        ))}
      </span>
      <span aria-hidden="true" className="text-small text-muted font-medium">
        {formatRating(rating.value)} ({rating.reviews})
      </span>
    </div>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="border-line bg-surface shadow-soft grid h-full content-start gap-5 rounded-xl border p-5 text-center">
      <Image
        alt={agent.avatar.alt}
        className="border-line mx-auto size-28 rounded-full border object-cover"
        height={agent.avatar.height}
        sizes="112px"
        src={agent.avatar.src}
        width={agent.avatar.width}
      />

      <div className="grid gap-3">
        <div className="grid gap-1">
          <h3 className="text-h3 text-ink font-semibold">{agent.name}</h3>
          <p className="text-small text-muted font-medium">{agent.title}</p>
          <p className="text-small text-ink-700">{agent.agency}</p>
        </div>

        <div className="mx-auto">
          <RatingStars rating={agent.rating} />
        </div>

        <p className="text-small text-muted">{agent.areasServed.join(" / ")}</p>
      </div>

      <Button asChild className="mx-auto w-fit" variant="secondary">
        <Link
          aria-label={`Contact ${agent.name}`}
          href={`/agents/${agent.slug}`}
          prefetch={false}
        >
          Contact
        </Link>
      </Button>
    </article>
  );
}
