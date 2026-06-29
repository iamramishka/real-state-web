import { NewsCard } from "@/components/cards/NewsCard";
import { featuredNews } from "@/data/news";

export function News() {
  return (
    <section aria-labelledby="news-title" className="bg-bg section-y">
      <div className="container-page grid gap-8">
        <div className="grid gap-3 md:max-w-2xl">
          <h2
            className="font-display text-h1 text-ink font-semibold text-balance"
            id="news-title"
          >
            Real estate news
          </h2>
          <p className="text-body-lg text-muted">
            Stay up to date with the latest developments, market shifts, and
            practical guides.
          </p>
        </div>

        {featuredNews.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredNews.map((article) => (
              <NewsCard article={article} key={article.id} />
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
