import { CardGrid, PropertyCard } from "@/components/cards/PropertyCard";
import { homesForYouProperties } from "@/data/properties";

function toCardProperty(property: (typeof homesForYouProperties)[number]) {
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

export function HomesForYou() {
  return (
    <section
      aria-labelledby="homes-for-you-title"
      className="bg-bg-soft section-y"
    >
      <div className="container-page grid gap-8">
        <div className="grid gap-3 md:max-w-2xl">
          <h2
            className="font-display text-h1 text-ink font-semibold text-balance"
            id="homes-for-you-title"
          >
            Homes for you
          </h2>
          <p className="text-body-lg text-muted">
            Based on where people like you are searching — updated daily.
          </p>
        </div>

        <CardGrid>
          {homesForYouProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={toCardProperty(property)}
            />
          ))}
        </CardGrid>
      </div>
    </section>
  );
}
