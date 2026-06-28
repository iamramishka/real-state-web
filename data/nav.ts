export interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface NavConfig {
  brand: string;
  items: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export const navConfig = {
  brand: "Nordhaven",
  items: [
    { label: "Buy", href: "/buy", ariaLabel: "Browse homes to buy" },
    {
      label: "Sell",
      href: "/sell",
      ariaLabel: "Learn how to sell with Nordhaven",
    },
    { label: "Rent", href: "/rent", ariaLabel: "Browse homes to rent" },
    { label: "Agents", href: "/agents", ariaLabel: "Meet Nordhaven agents" },
    { label: "News", href: "/news", ariaLabel: "Read real estate news" },
  ],
  cta: {
    label: "Contact us",
    href: "/contact",
  },
} satisfies NavConfig;
