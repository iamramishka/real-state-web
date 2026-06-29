import Link from "next/link";

import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { footerConfig, type FooterLink } from "@/data/footer";

function FooterNavLink({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        className="text-small text-white/70 transition-colors hover:text-white"
        href={link.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      className="text-small text-white/70 transition-colors hover:text-white"
      href={link.href}
      prefetch={false}
    >
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-on-ink border-t border-white/10">
      <div className="container-page grid gap-10 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Link
                aria-label="Nordhaven home"
                className="font-display text-h2 font-semibold tracking-normal"
                href="/"
              >
                {footerConfig.brand}
              </Link>
              <p className="text-body text-white/70">{footerConfig.tagline}</p>
            </div>

            <nav
              aria-label="Footer navigation"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5"
            >
              {footerConfig.columns.map((column) => (
                <div className="grid content-start gap-3" key={column.heading}>
                  <h2 className="text-small font-semibold text-white">
                    {column.heading}
                  </h2>
                  <ul className="grid gap-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <FooterNavLink link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="grid content-start gap-6">
            <NewsletterForm config={footerConfig.newsletter} />

            <div className="flex flex-wrap gap-3">
              {footerConfig.social.map((link) => (
                <a
                  aria-label={link.ariaLabel}
                  className="text-small rounded-full border border-white/15 px-4 py-2 text-white/75 transition-colors hover:border-white/35 hover:text-white"
                  href={link.href}
                  key={link.platform}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-small border-t border-white/10 pt-6 text-white/60">
          {footerConfig.legal}
        </p>
      </div>
    </footer>
  );
}
