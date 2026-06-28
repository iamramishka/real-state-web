import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  );
}

export { Textarea };
