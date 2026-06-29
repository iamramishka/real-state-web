"use client";

import { List, Map } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MapListingToggleProps = {
  list: ReactNode;
  map: ReactNode;
  title: ReactNode;
};

export function MapListingToggle({ list, map, title }: MapListingToggleProps) {
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {title}

        <div className="flex flex-wrap gap-2">
          <Button aria-label="Save this search" variant="secondary">
            Save search
          </Button>
          <Button
            aria-pressed={mobileView === "map"}
            className="lg:hidden"
            onClick={() =>
              setMobileView((current) => (current === "list" ? "map" : "list"))
            }
            type="button"
            variant="secondary"
          >
            {mobileView === "list" ? (
              <Map aria-hidden="true" />
            ) : (
              <List aria-hidden="true" />
            )}
            {mobileView === "list" ? "Show map" : "Show list"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-stretch">
        <div
          className={cn(
            "grid gap-4 lg:max-h-[48rem] lg:overflow-y-auto lg:pr-2",
            mobileView === "map" && "hidden lg:grid",
          )}
        >
          {list}
        </div>

        <div className={cn(mobileView === "list" && "hidden lg:block")}>
          {map}
        </div>
      </div>
    </>
  );
}
