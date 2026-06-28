# Data Shapes — Nordhaven

> TypeScript interface specifications for all `data/**` modules. Owner: Claude (spec). Codex implements the actual files in `data/**` using these interfaces.
> Copy values come from `docs/ux-copy.md`. Do not duplicate copy here — reference it.

---

## Module index

| File (Codex creates) | Export | Used by section |
|---|---|---|
| `data/properties.ts` | `Property[]` | Featured homes, Homes for you, Listing+Map |
| `data/agents.ts` | `Agent[]` | Agent section |
| `data/news.ts` | `NewsArticle[]` | Real estate news |
| `data/articles.ts` | `Article[]` | Trends / tips / inspiration |
| `data/suggestions.ts` | `SearchSuggestion[]` | Suggested search chips |
| `data/filters.ts` | `FilterChip[]` | Property category filters |
| `data/nav.ts` | `NavItem[]`, `NavConfig` | Header/Navbar |
| `data/discovery.ts` | `DiscoveryCard[]` | Neighbourhood discovery trio |
| `data/footer.ts` | `FooterConfig` | Footer |
| `data/copy.ts` | `SiteCopy` | Global / section headings / system copy |

---

## Shared primitives

```typescript
// Reuse these across modules — do not redefine per file.

export type Slug = string; // kebab-case unique identifier

export interface Image {
  src: string;        // path or URL (must be in next.config remotePatterns if external)
  alt: string;        // non-empty descriptive alt; empty string only for decorative
  width: number;
  height: number;
}

export interface Rating {
  score: number;      // 0–5, one decimal e.g. 4.8
  count: number;      // number of reviews
}
```

---

## `data/properties.ts`

```typescript
export type PropertyMode = 'buy' | 'rent' | 'sold';

export type PropertyCategory =
  | 'new-to-market'
  | 'most-viewed'
  | 'open-house'
  | 'price-drop'
  | 'luxury'
  | 'sold';

export interface PropertyMeta {
  beds: number;
  baths: number;
  sqft: number;
}

export interface Property {
  id: string;                        // unique, e.g. 'prop-001'
  slug: Slug;                        // e.g. 'luxury-downtown-residence-01'
  title: string;                     // e.g. 'Luxury Downtown Residence'
  address: string;                   // full address string
  city: string;
  state: string;
  price: number;                     // in USD cents to avoid float issues; format in utils
  priceLabel?: string;               // optional display override e.g. 'Price on application'
  mode: PropertyMode;
  categories: PropertyCategory[];    // can belong to multiple
  meta: PropertyMeta;
  image: Image;
  images?: Image[];                  // gallery for detail page
  coordinates: { lat: number; lng: number };
  featured: boolean;                 // appears in Featured Homes section
  forYou: boolean;                   // appears in Homes For You section
  listedAt: string;                  // ISO 8601 date string
  description?: string;             // used on detail page
}

// Minimum 6 items for Featured, 4 for HomesForYou, 4+ for map listing.
// Total mock dataset: aim for 12–16 varied properties.
```

---

## `data/agents.ts`

```typescript
export interface Agent {
  id: string;
  slug: Slug;
  name: string;
  agency: string;
  title: string;               // e.g. 'Senior Sales Consultant'
  avatar: Image;
  rating: Rating;
  phone?: string;              // display only — no tel: links without privacy review
  email?: string;              // display only
  areasServed: string[];       // e.g. ['Downtown', 'Midtown', 'Riverside']
  bio?: string;                // used on agent detail page
  featured: boolean;           // shown in homepage agent section
}

// Minimum 4 featured agents for homepage grid (1→2→4 cols).
```

---

## `data/news.ts`

```typescript
export interface NewsArticle {
  id: string;
  slug: Slug;
  title: string;
  excerpt: string;             // 1–2 sentences, used on card
  image: Image;
  publishedAt: string;         // ISO 8601
  author?: string;
  category?: string;           // e.g. 'Market update', 'Buying guide'
  featured: boolean;           // shown in homepage news section
}

// Minimum 3 featured for homepage grid.
```

---

## `data/articles.ts`

```typescript
// Trends / tips / inspiration content — distinct from news.
export interface Article {
  id: string;
  slug: Slug;
  title: string;
  excerpt: string;
  image: Image;
  publishedAt: string;         // ISO 8601
  tag: string;                 // e.g. 'Buying tips', 'Renovation', 'Market trends'
  featured: boolean;           // shown in homepage Trends section
}

// Minimum 3 featured for homepage grid.
```

---

## `data/suggestions.ts`

```typescript
// Conversational search suggestion chips (copy from docs/ux-copy.md §3)
export interface SearchSuggestion {
  id: string;
  label: string;               // visible chip text
  query: string;               // value passed to search on click (may differ from label)
  mode?: 'buy' | 'rent' | 'sell' | 'all';  // if undefined, shows for all modes
}

// Provide 8 suggestions as specified in docs/ux-copy.md.
```

---

## `data/filters.ts`

```typescript
// Property category filter chips (copy from docs/ux-copy.md §4)
export interface FilterChip {
  id: string;
  label: string;
  value: PropertyCategory;     // import type from data/properties.ts
  defaultActive: boolean;
}

// Provide 6 chips: new-to-market, most-viewed, open-house, price-drop, luxury, sold.
```

---

## `data/nav.ts`

```typescript
export interface NavItem {
  label: string;               // e.g. 'Buy'
  href: string;                // e.g. '/buy'
  ariaLabel?: string;          // if label needs more context for SR
}

export interface NavConfig {
  brand: string;               // 'Nordhaven'
  items: NavItem[];
  cta: {
    label: string;             // 'Contact us'
    href: string;              // '/contact'
  };
}

// items: Buy /buy · Sell /sell · Rent /rent · Agents /agents · News /news
```

---

## `data/discovery.ts`

```typescript
// Neighbourhood discovery trio cards (copy from docs/ux-copy.md §9)
export interface DiscoveryCard {
  id: string;
  heading: string;
  subtext: string;
  cta: string;                 // 'Explore'
  ctaAriaLabel: string;        // 'Explore {heading}'
  href: string;
  image: Image;
}

// Exactly 3 items: search-neighbourhoods, new-builds, agent-directory.
```

---

## `data/footer.ts`

```typescript
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;          // if true, add rel="noopener noreferrer" target="_blank"
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;            // 'Instagram' | 'LinkedIn' | 'Facebook'
  href: string;
  ariaLabel: string;           // 'Nordhaven on {platform}'
}

export interface FooterConfig {
  brand: string;               // 'Nordhaven'
  tagline: string;             // 'Find your place.'
  columns: FooterColumn[];     // 5 columns per docs/ux-copy.md §14
  social: SocialLink[];
  newsletter: {
    label: string;
    placeholder: string;
    buttonLabel: string;
    buttonAriaLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  legal: string;               // '© {year} Nordhaven. All rights reserved.'
}
```

---

## `data/copy.ts`

```typescript
// Global and section-level copy consumed by layout/section components.
// Values from docs/ux-copy.md — do not invent copy; use the spec.

export interface SectionCopy {
  eyebrow?: string;
  heading: string;
  subhead?: string;
  cta?: { label: string; href: string; ariaLabel?: string };
}

export interface SiteCopy {
  hero: {
    headingLine1: string;
    headingLine2: string;
    supportingText: string;
    imageAlt: string;
  };
  search: {
    modes: { buy: string; sell: string; rent: string };
    placeholders: { buy: string; sell: string; rent: string };
    iconLabels: {
      add: string;
      mic: string;
      waveform: string;
      submit: string;
    };
    saveSearch: string;
    resultCount: (n: number, mode: 'sale' | 'rent') => string;
  };
  featuredHomes: SectionCopy & { emptyState: string };
  homesForYou: SectionCopy;
  listing: {
    mapAriaLabel: string;
    mapToggleShow: string;
    mapToggleHide: string;
  };
  sellerBand: SectionCopy & {
    bullets: string[];
    imageAlt: string;
  };
  discovery: SectionCopy;
  agents: SectionCopy & { emptyState: string };
  news: SectionCopy & { emptyState: string };
  trends: SectionCopy;
  cta: SectionCopy;
  notFound: { heading: string; body: string; cta: string };
  error: { heading: string; body: string; cta: string };
  formErrors: {
    required: string;
    email: string;
    tooShort: (n: number) => string;
    tooLong: (n: number) => string;
    submitFailed: string;
    submitSuccess: string;
  };
}
```

---

## Rules for Codex when implementing `data/**`

1. **All interfaces above must be satisfied** — no field omissions; optional fields (`?`) may be omitted.
2. **Image `alt`** must be non-empty and descriptive for every property/agent/news image.
3. **Prices** stored as integer cents (`$1,340,000 → 134000000`); use a `formatPrice` util in `utils/format.ts`.
4. **Dates** stored as ISO 8601 strings (`"2025-06-12"`); use a `formatDate` util.
5. **Slugs** must be unique within their module; kebab-case only.
6. **Minimum counts** (see each interface above) must be met for homepage layouts to render correctly.
7. **Image sources** must be allow-listed in `next.config` `images.remotePatterns` (or use `/public/images/`).
8. **External links** in `FooterConfig` with `external: true` must render with `rel="noopener noreferrer" target="_blank"`.
9. **`data/copy.ts`** values must be copied verbatim from `docs/ux-copy.md` — do not paraphrase.
10. **No secrets** in data files; no real personal data (emails/phones are display-only mock values).

---

*Handoff note: C-008 complete. Codex can now implement all `data/**` modules against these interfaces. Next Claude task: C-009 (maintain accountability table) — update `plan.md §18` to reflect Phase 1 readiness.*
