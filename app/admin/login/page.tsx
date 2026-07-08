import type { Metadata } from "next";

import {
  getAdminAuthConfigStatus,
  getDevelopmentAdminCredentials,
} from "@/lib/auth/session";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Admin sign in | Nordhaven",
};

type AdminLoginPageProps = Readonly<{
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}>;

const errorMessages: Record<string, string> = {
  config: "Admin authentication is not configured for this environment.",
  invalid: "Email or password is incorrect.",
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const authStatus = getAdminAuthConfigStatus();
  const developmentCredentials = getDevelopmentAdminCredentials();
  const message = params.error ? errorMessages[params.error] : null;

  return (
    <main className="bg-bg-soft flex min-h-screen items-center justify-center px-4 py-12">
      <section
        aria-labelledby="admin-login-title"
        className="border-line bg-surface shadow-soft w-full max-w-md rounded-lg border p-6"
      >
        <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
          Nordhaven admin
        </p>
        <h1
          className="text-h2 text-ink mt-2 font-semibold"
          id="admin-login-title"
        >
          Sign in
        </h1>
        <p className="text-small text-muted mt-2">
          Use an authorized admin account to manage content, leads, and AI
          operations.
        </p>

        {message ? (
          <p
            className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900"
            role="alert"
          >
            {message}
          </p>
        ) : null}

        <form
          action="/api/admin/auth/login"
          className="mt-6 grid gap-4"
          method="post"
        >
          <input
            name="redirectTo"
            type="hidden"
            value={params.next ?? "/admin"}
          />
          <div className="grid gap-2">
            <label className="text-ink text-sm font-semibold" htmlFor="email">
              Admin email
            </label>
            <input
              autoComplete="email"
              className="border-line bg-surface text-ink placeholder:text-muted focus-visible:ring-accent h-11 rounded-md border px-3 outline-none focus-visible:ring-2"
              id="email"
              name="email"
              required
              type="email"
            />
          </div>
          <div className="grid gap-2">
            <label
              className="text-ink text-sm font-semibold"
              htmlFor="password"
            >
              Admin password
            </label>
            <input
              autoComplete="current-password"
              className="border-line bg-surface text-ink placeholder:text-muted focus-visible:ring-accent h-11 rounded-md border px-3 outline-none focus-visible:ring-2"
              id="password"
              name="password"
              required
              type="password"
            />
          </div>
          <button
            className="bg-ink text-on-ink hover:bg-ink/90 h-11 rounded-full px-5 text-sm font-semibold"
            type="submit"
          >
            Sign in to admin
          </button>
        </form>

        {developmentCredentials && authStatus.usesDevelopmentFallback ? (
          <div className="border-line bg-bg text-small text-muted mt-5 rounded-md border p-3">
            <p className="text-ink font-semibold">Local fallback account</p>
            <p className="mt-1">
              {developmentCredentials.email} / {developmentCredentials.password}
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
