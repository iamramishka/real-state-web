"use client";

import { List, Map } from "lucide-react";
import { useState } from "react";

import {
  PropertyCard,
  type PropertyCardData,
} from "@/components/cards/PropertyCard";
import { MapView, type MapProperty } from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { properties, type Property } from "@/data/properties";
import { cn } from "@/lib/utils";

const listingProperties = properties.filter(
  (property) => property.mode === "buy",
);

function toCardProperty(property: Property): PropertyCardData {
  return {
    address: property.address,
    href: `/property/${property.slug}`,
    image: property.image,
    meta: property.meta,
    price: property.price,
    priceLabel: property.priceLabel,
    title: property.title,
  };
}

function toMapProperty(property: Property): MapProperty {
  return {
    address: property.address,
    coordinates: property.coordinates,
    href: `/property/${property.slug}`,
    id: property.id,
    price: property.price,
    priceLabel: property.priceLabel,
  };
}

export function MapListing() {
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const mapProperties = listingProperties.map(toMapProperty);
  const resultLabel = `${listingProperties.length} Homes for sale`;

  return (
    <section
      aria-labelledby="listing-map-title"
      className="bg-bg section-y text-ink"
    >
      <div className="container-page grid gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="grid gap-2">
            <p className="text-small text-accent font-medium">
              Browse with context
            </p>
            <h2
              className="font-display text-h1 font-semibold text-balance"
              id="listing-map-title"
            >
              {resultLabel}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button aria-label="Save this search" variant="secondary">
              Save search
            </Button>
            <Button
              aria-pressed={mobileView === "map"}
              className="lg:hidden"
              onClick={() =>
                setMobileView((current) =>
                  current === "list" ? "map" : "list",
                )
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
            <div
              aria-label={resultLabel}
              className="grid gap-4"
              id="property-list"
              role="list"
            >
              {listingProperties.map((property) => (
                <PropertyCard
                  className="lg:grid-cols-[minmax(12rem,0.42fr)_minmax(0,0.58fr)] lg:[&_>a]:rounded-l-xl lg:[&_>a]:rounded-tr-none lg:[&_img]:h-full"
                  key={property.id}
                  property={toCardProperty(property)}
                  role="listitem"
                />
              ))}
            </div>
          </div>

          <div className={cn(mobileView === "list" && "hidden lg:block")}>
            <MapView properties={mapProperties} />
          </div>
        </div>
      </div>
    </section>
  );
}
