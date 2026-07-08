import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  adminBackendPaths,
  adminContentModules,
  adminOperationsModules,
  adminPhase,
} from "@/lib/admin/config";
import type { AdminSession } from "@/lib/auth/session";

type AdminShellProps = Readonly<{
  children: React.ReactNode;
  session: AdminSession | null;
}>;

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  ...adminContentModules.map((module) => ({
    href: module.href,
    label: module.title,
  })),
  { href: "/admin/ai-ops", label: "AI operations" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children, session }: AdminShellProps) {
  const readyBackendPaths = adminBackendPaths.filter(
    (path) => path.status === "ready",
  );

  return (
    <div className="bg-bg-soft min-h-screen">
      <div className="container-page grid gap-6 py-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="border-line bg-surface shadow-soft rounded-lg border p-4 lg:sticky lg:top-6 lg:self-start">
          <Link className="block rounded-md p-2" href="/admin">
            <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
              Nordhaven
            </p>
            <p className="font-display text-ink text-xl font-semibold">Admin</p>
          </Link>

          <nav aria-label="Admin navigation" className="mt-6 grid gap-1">
            {adminNav.map((item) => (
              <Link
                className="text-ink-700 hover:bg-bg focus-visible:bg-bg rounded-md px-3 py-2 text-sm font-medium"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-line bg-bg mt-6 rounded-md border p-3">
            <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
              Backend
            </p>
            <ul className="text-small text-ink-700 mt-3 space-y-2">
              {readyBackendPaths.map((path) => (
                <li key={`${path.method}-${path.path}`}>
                  <Link
                    className="text-accent font-mono text-xs underline-offset-4 hover:underline"
                    href={path.path}
                  >
                    {path.path}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-line mt-6 rounded-md border p-3">
            <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
              Signed in
            </p>
            <p className="text-ink mt-2 truncate text-sm font-semibold">
              {session?.email ?? "Admin"}
            </p>
            <p className="text-small text-muted mt-1 capitalize">
              {session?.role ?? "owner"}
            </p>
            <form
              action="/api/admin/auth/logout"
              className="mt-3"
              method="post"
            >
              <button
                className="border-line text-ink hover:bg-bg h-9 rounded-full border px-4 text-sm font-semibold"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="border-line bg-surface shadow-soft mb-6 rounded-lg border p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
                  {adminPhase.id}
                </p>
                <h1 className="text-h2 text-ink mt-1 font-semibold">
                  Admin control center
                </h1>
                <p className="text-small text-muted mt-2 max-w-3xl">
                  {adminPhase.summary}
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/api/admin/manifest">View backend manifest</Link>
              </Button>
            </div>
          </header>

          {children}

          <section
            aria-labelledby="admin-ops-title"
            className="border-line bg-surface shadow-soft mt-6 rounded-lg border p-5"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
                  AI operations
                </p>
                <h2
                  className="text-h3 text-ink mt-1 font-semibold"
                  id="admin-ops-title"
                >
                  Agents, skills, rules, standards, and task plans
                </h2>
              </div>
              <Link
                className="text-accent text-sm font-semibold underline-offset-4 hover:underline"
                href="/admin/ai-ops"
              >
                Open AI operations
              </Link>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {adminOperationsModules.map((module) => (
                <Link
                  className="border-line bg-bg text-ink hover:bg-accent-soft rounded-md border p-4 text-sm font-semibold"
                  href={module.href}
                  key={module.id}
                >
                  {module.title}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
