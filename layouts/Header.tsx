"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navConfig } from "@/data/nav";
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
    <nav aria-label="Primary navigation" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {navConfig.items.map((item) => (
          <li key={item.href}>
            <Link
              aria-label={item.ariaLabel}
              className="rounded-pill text-ink-700 hover:bg-bg-soft hover:text-ink focus-visible:ring-accent focus-visible:ring-offset-surface inline-flex min-h-11 items-center px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open navigation menu"
          className="md:hidden"
          size="icon"
          type="button"
          variant="secondary"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby="mobile-navigation-description"
        className="w-full max-w-sm"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>
            <BrandLink />
          </SheetTitle>
          <SheetDescription
            className="sr-only"
            id="mobile-navigation-description"
          >
            Nordhaven primary navigation.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="mt-6">
          <ul className="flex flex-col gap-2">
            {navConfig.items.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    aria-label={item.ariaLabel}
                    className="text-ink hover:bg-bg-soft focus-visible:ring-accent flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetClose asChild>
          <Button asChild className="mt-8 w-full">
            <Link href={navConfig.cta.href}>{navConfig.cta.label}</Link>
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  return (
    <header className="border-line/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/75 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-4 py-3">
        <BrandLink />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex" variant="default">
            <Link href={navConfig.cta.href}>{navConfig.cta.label}</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
