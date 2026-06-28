export type PropertyCategory =
  | "new-to-market"
  | "most-viewed"
  | "open-house"
  | "price-drop"
  | "luxury"
  | "sold";

export interface FilterChip {
  id: string;
  label: string;
  value: PropertyCategory;
  defaultActive: boolean;
}

export const propertyFilters: FilterChip[] = [
  {
    id: "new-to-market",
    label: "New to market",
    value: "new-to-market",
    defaultActive: false,
  },
  {
    id: "most-viewed",
    label: "Most viewed",
    value: "most-viewed",
    defaultActive: false,
  },
  {
    id: "open-houses",
    label: "Open houses",
    value: "open-house",
    defaultActive: false,
  },
  {
    id: "price-drop",
    label: "Price drop",
    value: "price-drop",
    defaultActive: false,
  },
  {
    id: "luxury",
    label: "Luxury",
    value: "luxury",
    defaultActive: false,
  },
  {
    id: "sold",
    label: "Sold",
    value: "sold",
    defaultActive: false,
  },
];
