import { CardGrid, PropertyCard } from "@/components/cards/PropertyCard";
import { featuredProperties } from "@/data/properties";

function toCardProperty(property: (typeof featuredProperties)[number]) {
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

export function FeaturedHomes() {
  return (
    <section
      aria-labelledby="featured-homes-title"
      className="bg-bg pb-section-y"
    >
      <div className="container-page grid gap-8">
        <div className="grid gap-3 md:max-w-2xl">
          <h2
            className="font-display text-h1 text-ink font-semibold text-balance"
            id="featured-homes-title"
          >
            Explore our homes
          </h2>
          <p className="text-body-lg text-muted">
            Hand-picked listings across every price point, from starter homes to
            statement properties.
          </p>
        </div>

        {featuredProperties.length > 0 ? (
          <CardGrid>
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={toCardProperty(property)}
              />
            ))}
          </CardGrid>
        ) : (
          <p className="border-line bg-surface text-body text-muted rounded-lg border p-5">
            No homes match your filters right now. Try removing a filter or
            broadening your search area.
          </p>
        )}
      </div>
    </section>
  );
}
