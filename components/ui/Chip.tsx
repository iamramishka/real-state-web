"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ChipVariant = "suggestion" | "filter";

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  variant?: ChipVariant;
};

export function Chip({
  active = false,
  className,
  variant = "suggestion",
  ...props
}: ChipProps) {
  return (
    <button
      className={cn(
        "rounded-pill focus-visible:ring-accent focus-visible:ring-offset-bg border px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "suggestion" &&
          "border-line bg-surface text-ink-700 hover:border-accent hover:text-ink",
        variant === "filter" &&
          (active
            ? "border-ink bg-ink text-on-ink"
            : "border-line bg-bg-soft text-ink-700 hover:bg-surface"),
        className,
      )}
      type="button"
      {...props}
    />
  );
}

export type SuggestionChipItem = {
  id: string;
  label: string;
  query: string;
};

type SuggestionChipRowProps = {
  items: SuggestionChipItem[];
};

export function SuggestionChipRow({ items }: SuggestionChipRowProps) {
  const [selectedQuery, setSelectedQuery] = React.useState("");

  return (
    <div className="grid gap-3" role="group" aria-label="Suggested searches">
      <div className="-mx-gutter px-gutter overflow-x-auto md:mx-0 md:overflow-visible md:px-0">
        <div className="flex min-w-max gap-2 pb-1 md:min-w-0 md:flex-wrap">
          {items.map((item) => (
            <Chip
              aria-label={`${item.label} — tap to search`}
              key={item.id}
              onClick={() => setSelectedQuery(item.query)}
            >
              {item.label}
            </Chip>
          ))}
        </div>
      </div>
      <p aria-label="Suggestion status" className="sr-only" role="status">
        {selectedQuery ? `Suggested search selected: ${selectedQuery}.` : ""}
      </p>
    </div>
  );
}

export type FilterChipItem = {
  defaultActive: boolean;
  id: string;
  label: string;
};

type FilterChipRowProps = {
  items: FilterChipItem[];
};

export function FilterChipRow({ items }: FilterChipRowProps) {
  const [activeIds, setActiveIds] = React.useState<Set<string>>(
    () =>
      new Set(
        items.filter((item) => item.defaultActive).map((item) => item.id),
      ),
  );

  function toggleFilter(id: string) {
    setActiveIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  return (
    <div className="grid gap-3" role="group" aria-label="Property filters">
      <p className="text-small text-muted font-medium">Explore our homes</p>
      <div className="-mx-gutter px-gutter overflow-x-auto md:mx-0 md:overflow-visible md:px-0">
        <div className="flex min-w-max gap-2 pb-1 md:min-w-0 md:flex-wrap">
          {items.map((item) => {
            const isActive = activeIds.has(item.id);

            return (
              <Chip
                active={isActive}
                aria-pressed={isActive}
                key={item.id}
                onClick={() => toggleFilter(item.id)}
                variant="filter"
              >
                {item.label}
              </Chip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
