import {
  PropertyCard,
  type PropertyCardData,
} from "@/components/cards/PropertyCard";
import { MapListingToggle } from "@/components/MapListingToggle";
import { MapView, type MapProperty } from "@/components/MapView";
import { properties, type Property } from "@/data/properties";

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
  const mapProperties = listingProperties.map(toMapProperty);
  const resultLabel = `${listingProperties.length} Homes for sale`;
  const title = (
    <div className="grid gap-2">
      <p className="text-small text-accent font-medium">Browse with context</p>
      <h2
        className="font-display text-h1 font-semibold text-balance"
        id="listing-map-title"
      >
        {resultLabel}
      </h2>
    </div>
  );
  const list = (
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
  );
  const map = <MapView properties={mapProperties} />;

  return (
    <section
      aria-labelledby="listing-map-title"
      className="bg-bg section-y text-ink"
    >
      <div className="container-page grid gap-6">
        <MapListingToggle list={list} map={map} title={title} />
      </div>
    </section>
  );
}
