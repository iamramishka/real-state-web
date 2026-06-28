export type SearchSuggestionMode = "buy" | "rent" | "sell" | "all";

export interface SearchSuggestion {
  id: string;
  label: string;
  query: string;
  mode?: SearchSuggestionMode;
}

export const searchSuggestions: SearchSuggestion[] = [
  {
    id: "king-bed-primary",
    label: "Will a king bed fit in the primary?",
    query: "Will a king bed fit in the primary bedroom",
    mode: "all",
  },
  {
    id: "three-bedroom-starbucks",
    label: "3-bedroom near a Starbucks",
    query: "3-bedroom home near a Starbucks",
    mode: "buy",
  },
  {
    id: "unique-house",
    label: "What makes this house unique?",
    query: "What makes this house unique?",
    mode: "all",
  },
  {
    id: "backyard",
    label: "Does this property have a backyard?",
    query: "Does this property have a backyard?",
    mode: "all",
  },
  {
    id: "walkable-schools",
    label: "Good schools within walking distance?",
    query: "Good schools within walking distance?",
    mode: "buy",
  },
  {
    id: "open-plan",
    label: "Open plan kitchen and living?",
    query: "Open plan kitchen and living space",
    mode: "all",
  },
  {
    id: "home-office",
    label: "Home office or bonus room?",
    query: "Home office or bonus room",
    mode: "all",
  },
  {
    id: "recently-renovated",
    label: "Recently renovated?",
    query: "Recently renovated homes",
    mode: "all",
  },
];
