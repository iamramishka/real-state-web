import Link from "next/link";

export interface MapProperty {
  address: string;
  coordinates: { lat: number; lng: number };
  href: string;
  id: string;
  price: number;
  priceLabel?: string;
}

interface MapViewProps {
  properties: MapProperty[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 1,
  notation: "compact",
  style: "currency",
});

function formatPrice(priceInCents: number) {
  return currencyFormatter.format(priceInCents / 100);
}

function getPosition(
  property: MapProperty,
  bounds: {
    maxLat: number;
    maxLng: number;
    minLat: number;
    minLng: number;
  },
) {
  const latRange = bounds.maxLat - bounds.minLat || 1;
  const lngRange = bounds.maxLng - bounds.minLng || 1;

  return {
    left: `${12 + ((property.coordinates.lng - bounds.minLng) / lngRange) * 76}%`,
    top: `${12 + ((bounds.maxLat - property.coordinates.lat) / latRange) * 76}%`,
  };
}

export function MapView({ properties }: MapViewProps) {
  const bounds = properties.reduce(
    (current, property) => ({
      maxLat: Math.max(current.maxLat, property.coordinates.lat),
      maxLng: Math.max(current.maxLng, property.coordinates.lng),
      minLat: Math.min(current.minLat, property.coordinates.lat),
      minLng: Math.min(current.minLng, property.coordinates.lng),
    }),
    {
      maxLat: Number.NEGATIVE_INFINITY,
      maxLng: Number.NEGATIVE_INFINITY,
      minLat: Number.POSITIVE_INFINITY,
      minLng: Number.POSITIVE_INFINITY,
    },
  );

  return (
    <div
      aria-describedby="map-alternative"
      aria-label="Map of property listings. Use the list below for an accessible alternative."
      className="border-line bg-accent-soft shadow-soft relative min-h-[26rem] overflow-hidden rounded-xl border lg:min-h-full"
      role="group"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,111,92,.12)_1px,transparent_1px),linear-gradient(rgba(31,111,92,.12)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="border-accent/20 bg-bg/60 absolute inset-x-8 top-1/3 h-16 rotate-[-8deg] rounded-full border-y" />
      <div className="border-accent/20 bg-bg/50 absolute inset-y-10 left-1/3 w-14 rotate-[12deg] rounded-full border-x" />
      <div className="bg-surface/60 absolute right-10 bottom-12 h-28 w-36 rounded-[45%]" />
      <p className="sr-only" id="map-alternative">
        The listing cards beside this map contain the same homes with prices,
        addresses, details, and links.
      </p>

      {properties.map((property) => {
        const price = property.priceLabel ?? formatPrice(property.price);

        return (
          <Link
            aria-label={`${price} — ${property.address}. Tap to view details.`}
            className="rounded-pill bg-ink text-on-ink shadow-raised focus-visible:ring-accent focus-visible:ring-offset-bg absolute z-10 -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2"
            href={property.href}
            key={property.id}
            style={getPosition(property, bounds)}
          >
            {price}
          </Link>
        );
      })}
    </div>
  );
}
