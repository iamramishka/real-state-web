"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Activity, ArrowUp, Mic, Plus } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function SearchForm() {
  const queryId = useId();
  const errorId = useId();
  const statusId = useId();
  const [statusMessage, setStatusMessage] = useState("");

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<SearchFormValues>({
    defaultValues: {
      mode: "buy",
      query: "",
    },
    resolver: zodResolver(searchSchema),
  });

  const selectedMode = watch("mode");

  function selectMode(mode: SearchMode) {
    setValue("mode", mode, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setStatusMessage("");
  }

  async function onSubmit(values: SearchFormValues) {
    setStatusMessage(
      `${searchModes[values.mode].label} search ready for "${values.query.trim()}".`,
    );
  }

  return (
    <form
      aria-describedby={statusId}
      className="border-line bg-surface shadow-raised text-ink rounded-xl border p-3 sm:p-4 lg:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" {...register("mode")} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <fieldset
          aria-label="Search mode"
          className="bg-bg-soft rounded-pill grid grid-cols-3 gap-1 p-1"
        >
          {Object.entries(searchModes).map(([mode, config]) => {
            const isSelected = selectedMode === mode;

            return (
              <button
                aria-pressed={isSelected}
                className={cn(
                  "rounded-pill focus-visible:ring-accent focus-visible:ring-offset-bg-soft h-11 px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  isSelected
                    ? "bg-ink text-on-ink shadow-soft"
                    : "text-ink-700 hover:bg-surface",
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

        <div className="grid min-w-0 flex-1 gap-2">
          <Label className="sr-only" htmlFor={queryId}>
            Search query
          </Label>
          <div className="border-line bg-surface rounded-pill focus-within:ring-accent grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border px-2 py-1.5 focus-within:ring-2">
            <Button
              aria-label="Add search criteria"
              className="size-10"
              size="icon"
              title="Add search criteria"
              type="button"
              variant="ghost"
            >
              <Plus aria-hidden="true" />
            </Button>

            <Input
              aria-describedby={errors.query ? errorId : undefined}
              aria-invalid={Boolean(errors.query)}
              autoComplete="off"
              className="h-11 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              id={queryId}
              placeholder={searchModes[selectedMode].placeholder}
              {...register("query")}
            />

            <div className="flex items-center gap-1">
              <Button
                aria-label="Search by voice"
                className="hidden size-10 sm:inline-flex"
                size="icon"
                title="Search by voice"
                type="button"
                variant="ghost"
              >
                <Mic aria-hidden="true" />
              </Button>
              <Button
                aria-label="Audio input active"
                className="hidden size-10 sm:inline-flex"
                size="icon"
                title="Audio input active"
                type="button"
                variant="ghost"
              >
                <Activity aria-hidden="true" />
              </Button>
              <Button
                aria-label="Run search"
                className="size-10"
                disabled={isSubmitting}
                size="icon"
                title="Run search"
                type="submit"
              >
                <ArrowUp aria-hidden="true" />
              </Button>
            </div>
          </div>

          {errors.query ? (
            <p className="text-small text-ink px-3" id={errorId} role="alert">
              {errors.query.message}
            </p>
          ) : null}
        </div>
      </div>

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
