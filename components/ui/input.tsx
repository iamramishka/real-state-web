import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-2 text-base text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
