export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
}

export interface FooterConfig {
  brand: string;
  tagline: string;
  columns: FooterColumn[];
  social: SocialLink[];
  newsletter: {
    label: string;
    placeholder: string;
    buttonLabel: string;
    buttonAriaLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  legal: string;
}

export const footerConfig: FooterConfig = {
  brand: "Nordhaven",
  tagline: "Find your place.",
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About Nordhaven", href: "/about" },
        { label: "Our agents", href: "/agents" },
        { label: "Careers", href: "/careers" },
        { label: "Contact us", href: "/contact" },
      ],
    },
    {
      heading: "Buy",
      links: [
        { label: "Search homes", href: "/buy" },
        { label: "New to market", href: "/buy?filter=new-to-market" },
        { label: "Open houses", href: "/buy?filter=open-house" },
        { label: "Luxury homes", href: "/buy?filter=luxury" },
      ],
    },
    {
      heading: "Sell",
      links: [
        { label: "Get a valuation", href: "/sell#valuation" },
        { label: "How we sell", href: "/sell" },
        { label: "Seller guides", href: "/news?topic=seller-guides" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Real estate news", href: "/news" },
        { label: "Trends & tips", href: "/news?topic=trends" },
        { label: "Neighbourhood guides", href: "/neighbourhoods" },
        { label: "Mortgage calculator", href: "/mortgage-calculator" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of use", href: "/terms" },
        { label: "Cookie policy", href: "/cookies" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ],
  social: [
    {
      platform: "Instagram",
      href: "https://www.instagram.com/",
      ariaLabel: "Nordhaven on Instagram",
    },
    {
      platform: "LinkedIn",
      href: "https://www.linkedin.com/",
      ariaLabel: "Nordhaven on LinkedIn",
    },
    {
      platform: "Facebook",
      href: "https://www.facebook.com/",
      ariaLabel: "Nordhaven on Facebook",
    },
  ],
  newsletter: {
    label: "Stay in the loop",
    placeholder: "Your email address",
    buttonLabel: "Subscribe",
    buttonAriaLabel: "Subscribe to the Nordhaven newsletter",
    successMessage: "You're subscribed. We'll send the good stuff only.",
    errorMessage: "Please enter a valid email address.",
  },
  legal: "© 2026 Nordhaven. All rights reserved.",
};
