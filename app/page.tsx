const setupItems = [
  "Next.js 15 App Router",
  "Strict TypeScript",
  "Tailwind CSS v4",
  "ESLint, formatting, typecheck, and test scripts",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16 text-[var(--ink)] sm:px-10 lg:px-16">
      <section className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="space-y-5">
          <p className="text-sm font-medium tracking-[0.14em] text-[var(--accent)] uppercase">
            Nordhaven setup
          </p>
          <h1 className="max-w-3xl text-5xl leading-tight font-semibold sm:text-6xl">
            Premium real estate foundation is ready.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
            This scaffold gives Codex a clean Next.js base for the upcoming
            header, hero, search, property, map, editorial, agent, CTA, and
            footer sections.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {setupItems.map((item) => (
            <li
              className="rounded-lg border border-[var(--line)] bg-white px-5 py-4 text-sm font-medium shadow-sm"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
