import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navConfig } from "@/data/nav";
import { MobileMenu } from "@/layouts/MobileMenu";
import { cn } from "@/lib/utils";

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="bg-ink text-on-ink shadow-soft flex size-9 items-center justify-center rounded-md text-sm font-semibold"
    >
      N
    </span>
  );
}

function BrandLink({ className }: { className?: string }) {
  return (
    <Link
      aria-label="Nordhaven home"
      className={cn("flex min-h-11 items-center gap-3", className)}
      href="/"
    >
      <LogoMark />
      <span className="font-display text-ink text-base font-semibold tracking-normal">
        {navConfig.brand}
      </span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="hidden md:block md:justify-self-center"
    >
      <ul className="flex items-center gap-1">
        {navConfig.items.map((item) => (
          <li className="inline-flex items-center gap-1" key={item.href}>
            <span
              aria-hidden="true"
              className="bg-muted/60 size-1 shrink-0 rounded-full"
            />
            <Link
              aria-label={item.ariaLabel}
              className="rounded-pill text-ink-700 hover:bg-bg-soft hover:text-ink focus-visible:ring-accent focus-visible:ring-offset-surface inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              href={item.href}
              prefetch={false}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header() {
  return (
    <header className="border-line/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/75 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-page grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 py-3">
        <BrandLink className="justify-self-start" />
        <DesktopNav />
        <div className="flex items-center justify-self-end gap-2">
          <Button asChild className="hidden md:inline-flex" variant="secondary">
            <Link href={navConfig.cta.href} prefetch={false}>
              {navConfig.cta.label}
            </Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
