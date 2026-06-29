import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/data/news";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="border-line bg-surface shadow-soft grid h-full overflow-hidden rounded-xl border">
      <Link
        aria-label={`Read: ${article.title}`}
        className="focus-visible:ring-accent block outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        href={`/news/${article.slug}`}
      >
        <Image
          alt={article.image.alt}
          className="aspect-[16/10] w-full object-cover"
          height={article.image.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={article.image.src}
          width={article.image.width}
        />
      </Link>

      <div className="grid gap-5 p-5">
        <div className="grid gap-3">
          <div className="text-small text-muted flex flex-wrap items-center gap-3 font-medium">
            {article.category ? <span>{article.category}</span> : null}
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-4" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </span>
          </div>

          <h3 className="text-h3 text-ink font-semibold text-balance">
            {article.title}
          </h3>
          <p className="text-body text-muted">{article.excerpt}</p>
        </div>

        <Button asChild className="w-fit" variant="secondary">
          <Link
            aria-label={`Read: ${article.title}`}
            href={`/news/${article.slug}`}
          >
            Read article
          </Link>
        </Button>
      </div>
    </article>
  );
}
