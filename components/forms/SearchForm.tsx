"use client";

import { Activity, ArrowUp, Mic, Plus } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SearchSuggestion } from "@/data/suggestions";
import { cn } from "@/lib/utils";

const searchModes = {
  buy: {
    label: "Buy",
    placeholder: "e.g. 3-bedroom near a good school in Austin, TX",
  },
  sell: {
    label: "Sell",
    placeholder: "e.g. What's my home on Maple Street worth?",
  },
  rent: {
    label: "Rent",
    placeholder: "e.g. Pet-friendly apartment with parking under $2,500",
  },
} as const;

const searchSchema = z.object({
  mode: z.enum(["buy", "sell", "rent"]),
  query: z
    .string()
    .trim()
    .min(3, "Please enter at least 3 characters.")
    .max(140, "Please keep this under 140 characters."),
});

type SearchFormValues = z.infer<typeof searchSchema>;
type SearchMode = SearchFormValues["mode"];

interface SearchFormProps {
  suggestions?: readonly SearchSuggestion[];
}

export function SearchForm({ suggestions }: SearchFormProps) {
  const queryId = useId();
  const errorId = useId();
  const statusId = useId();
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState<SearchMode>("buy");
  const [statusMessage, setStatusMessage] = useState("");

  const visibleSuggestions =
    suggestions?.filter(
      (s) => !s.mode || s.mode === "all" || s.mode === selectedMode,
    ) ?? [];

  function selectMode(mode: SearchMode) {
    setSelectedMode(mode);
    setErrorMessage("");
    setStatusMessage("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = searchSchema.safeParse({
      mode: selectedMode,
      query,
    } satisfies SearchFormValues);

    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0]?.message ?? "");
      setStatusMessage("");
      return;
    }

    setErrorMessage("");
    setStatusMessage(
      `${searchModes[parsed.data.mode].label} search ready for "${parsed.data.query.trim()}".`,
    );
  }

  return (
    <form
      aria-describedby={statusId}
      className="border-line bg-surface shadow-raised text-ink rounded-2xl border p-4 sm:rounded-3xl sm:p-6"
      onSubmit={onSubmit}
    >
      <input name="mode" type="hidden" value={selectedMode} />

      {/* Tab ribbon */}
      <fieldset
        aria-label="Search mode"
        className="bg-bg-soft rounded-pill mb-4 flex h-14 w-full items-center gap-1 p-1 sm:w-72"
      >
        {Object.entries(searchModes).map(([mode, config]) => {
          const isSelected = selectedMode === mode;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "rounded-pill focus-visible:ring-accent h-full flex-1 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                isSelected
                  ? "bg-surface text-ink shadow-soft"
                  : "text-ink-700 hover:text-ink",
              )}
              key={mode}
              onClick={() => selectMode(mode as SearchMode)}
              type="button"
            >
              {config.label}
            </button>
          );
        })}
      </fieldset>

      <div className="grid min-w-0 gap-2">
        <Label className="sr-only" htmlFor={queryId}>
          Search query
        </Label>

        <div className="border-line bg-surface rounded-pill focus-within:ring-accent flex min-h-14 w-full items-center gap-2 border px-3 py-2 focus-within:ring-2 sm:min-h-16 sm:px-4">
          <Button
            aria-label="Add search criteria"
            className="size-10 shrink-0 sm:size-11"
            size="icon"
            title="Add search criteria"
            type="button"
            variant="ghost"
          >
            <Plus aria-hidden="true" />
          </Button>

          <Input
            aria-describedby={errorMessage ? errorId : undefined}
            aria-invalid={Boolean(errorMessage)}
            autoComplete="off"
            className="text-ink placeholder:text-muted h-auto min-w-0 flex-1 border-0 bg-transparent p-0 text-base font-medium shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg"
            id={queryId}
            onChange={(event) => {
              setQuery(event.target.value);
              setErrorMessage("");
              setStatusMessage("");
            }}
            placeholder={searchModes[selectedMode].placeholder}
            value={query}
          />

          <div className="flex items-center gap-1">
            <Button
              aria-label="Search by voice"
              className="hidden size-10 sm:inline-flex sm:size-11"
              size="icon"
              title="Search by voice"
              type="button"
              variant="ghost"
            >
              <Mic aria-hidden="true" />
            </Button>
            <Button
              aria-label="Audio input active"
              className="hidden size-10 sm:inline-flex sm:size-11"
              size="icon"
              title="Audio input active"
              type="button"
              variant="ghost"
            >
              <Activity aria-hidden="true" />
            </Button>
            <Button
              aria-label="Run search"
              className="size-10 shrink-0 sm:size-12"
              size="icon"
              title="Run search"
              type="submit"
            >
              <ArrowUp aria-hidden="true" />
            </Button>
          </div>
        </div>

        {errorMessage ? (
          <p className="text-small text-ink px-3" id={errorId} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>

      {visibleSuggestions.length > 0 && (
        <div
          aria-label="Search suggestions"
          className="mt-3 flex gap-2 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none]"
          role="group"
        >
          {visibleSuggestions.map((suggestion) => (
            <button
              className="rounded-pill bg-bg-soft text-ink-700 focus-visible:ring-accent shrink-0 whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-colors hover:bg-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              key={suggestion.id}
              onClick={() => {
                setQuery(suggestion.query);
                setErrorMessage("");
                setStatusMessage("");
              }}
              type="button"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      )}

      <p
        aria-label="Search status"
        className="sr-only"
        id={statusId}
        role="status"
      >
        {statusMessage}
      </p>
    </form>
  );
}
