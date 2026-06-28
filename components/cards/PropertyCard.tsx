import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PropertyCardImage {
  alt: string;
  height: number;
  src: string;
  width: number;
}

export interface PropertyCardMeta {
  baths: number;
  beds: number;
  sqft: number;
}

export interface PropertyCardData {
  address: string;
  href: string;
  image: PropertyCardImage;
  meta: PropertyCardMeta;
  price: number;
  priceLabel?: string;
  title: string;
}

interface PropertyCardProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "property"
> {
  property: PropertyCardData;
}

interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatPrice(priceInCents: number) {
  return currencyFormatter.format(priceInCents / 100);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

function PropertyMetaItem({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon: typeof BedDouble;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon aria-hidden="true" className="text-accent size-4" />
      {children}
    </span>
  );
}

export function PropertyCard({
  className,
  property,
  ...props
}: PropertyCardProps) {
  const price = property.priceLabel ?? formatPrice(property.price);
  const metaText = `${property.meta.beds} ${pluralize(
    property.meta.beds,
    "bedroom",
    "bedrooms",
  )}, ${property.meta.baths} ${pluralize(
    property.meta.baths,
    "bathroom",
    "bathrooms",
  )}, ${formatNumber(property.meta.sqft)} square feet`;

  return (
    <article
      className={cn(
        "group border-line bg-surface shadow-soft hover:shadow-raised grid h-full overflow-hidden rounded-xl border transition-shadow",
        className,
      )}
      {...props}
    >
      <Link
        aria-label={`View details for ${property.address}`}
        className="focus-visible:ring-accent focus-visible:ring-offset-bg block overflow-hidden rounded-t-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        href={property.href}
      >
        <Image
          alt={property.image.alt}
          className="duration-base ease-standard aspect-[16/10] h-auto w-full object-cover transition-transform group-hover:scale-[1.02]"
          height={property.image.height}
          sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) 33vw, 392px"
          src={property.image.src}
          width={property.image.width}
        />
      </Link>

      <div className="grid gap-4 p-4 sm:p-5">
        <div className="grid gap-2">
          <p className="text-h3 text-ink font-semibold">{price}</p>
          <h3 className="text-body-lg text-ink font-semibold">
            <Link
              className="focus-visible:ring-accent focus-visible:ring-offset-surface rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              href={property.href}
            >
              {property.title}
            </Link>
          </h3>
          <p className="text-small text-muted inline-flex items-start gap-1.5">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>{property.address}</span>
          </p>
        </div>

        <div
          aria-label={metaText}
          className="text-small text-ink-700 flex flex-wrap gap-x-4 gap-y-2 font-medium"
        >
          <PropertyMetaItem icon={BedDouble}>
            {property.meta.beds} beds
          </PropertyMetaItem>
          <PropertyMetaItem icon={Bath}>
            {property.meta.baths} baths
          </PropertyMetaItem>
          <PropertyMetaItem icon={Ruler}>
            {formatNumber(property.meta.sqft)} sq ft
          </PropertyMetaItem>
        </div>

        <Button asChild className="w-fit" variant="secondary">
          <Link
            aria-label={`View details for ${property.address}`}
            href={property.href}
          >
            View details
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function CardGrid({ children, className, ...props }: CardGridProps) {
  return (
    <div
      className={cn("grid gap-6 md:grid-cols-2 xl:grid-cols-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
