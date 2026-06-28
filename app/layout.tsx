import type { Metadata } from "next";

import { Header } from "@/layouts/Header";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nordhaven",
    template: "%s | Nordhaven",
  },
  description:
    "A premium real estate experience for discovering homes, agents, and market guidance.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
