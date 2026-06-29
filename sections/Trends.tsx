import Link from "next/link";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { Button } from "@/components/ui/button";
import { featuredArticles } from "@/data/articles";

export function Trends() {
  return (
    <section aria-labelledby="trends-title" className="bg-bg-soft section-y">
      <div className="container-page grid gap-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-3 md:max-w-3xl">
            <h2
              className="font-display text-h1 text-ink font-semibold text-balance"
              id="trends-title"
            >
              Discover trends, tips, and property inspiration
            </h2>
            <p className="text-body-lg text-muted">
              Expert real estate advice, market trends, and inspiring ideas to
              help you buy, sell, and navigate today&apos;s housing market.
            </p>
          </div>

          <Button asChild variant="secondary">
            <Link aria-label="See all learning resources" href="/news">
              See all learning
            </Link>
          </Button>
        </div>

        {featuredArticles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredArticles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        ) : (
          <p className="border-line bg-surface text-body text-muted rounded-lg border p-5">
            No articles available right now. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
