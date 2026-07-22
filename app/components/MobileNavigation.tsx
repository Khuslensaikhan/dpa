"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type MobileServiceLink = {
  slug: string;
  shortTitle: string;
};

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "Our Approach" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/services", label: "All Services" },
] as const;

export function MobileNavigation({
  services,
}: {
  services: MobileServiceLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = window.matchMedia("(min-width: 1024px)");
    const handleViewportChange = () => {
      if (closeOnDesktop.matches) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    closeOnDesktop.addEventListener("change", handleViewportChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      closeOnDesktop.removeEventListener("change", handleViewportChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative col-start-2 flex items-center gap-2 min-[1024px]:hidden">
      <Link
        className="inline-flex min-h-10 items-center justify-center rounded bg-brand-teal px-3 text-[0.82rem] font-semibold leading-none !text-brand-navy no-underline whitespace-nowrap transition hover:-translate-y-px hover:bg-brand-white hover:!text-brand-navy active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        href="/contact"
      >
        Book a Call
      </Link>
      <button
        className="inline-flex size-10 items-center justify-center rounded border border-brand-ivory/20 bg-brand-navy/48 text-brand-white transition hover:border-brand-teal/70 hover:bg-brand-ivory/12 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
      </button>

      {isOpen ? (
        <nav
          className="glass-panel mobile-navigation-panel absolute right-0 top-[calc(100%+0.7rem)] grid w-[calc(100vw-2.5rem)] max-w-[22rem] gap-5 rounded-lg border border-brand-ivory/16 p-3 shadow-[0_24px_70px_rgb(0_0_0_/_0.36)]"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <div className="grid gap-1">
            {primaryLinks.map((link) => (
              <Link
                className="flex min-h-11 items-center rounded px-3 text-sm font-semibold text-brand-ivory no-underline transition hover:bg-brand-ivory/10 hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
                href={link.href}
                key={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-brand-ivory/14 pt-4">
            <p className="m-0 px-3 text-xs font-semibold tracking-[0.12em] text-brand-teal uppercase">
              Explore services
            </p>
            <div className="mt-2 grid gap-1">
              {services.map((service) => (
                <Link
                  className="flex min-h-10 items-center rounded px-3 text-sm font-medium leading-snug text-brand-ivory/78 no-underline transition hover:bg-brand-ivory/10 hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
                  href={`/services/${service.slug}`}
                  key={service.slug}
                  onClick={closeMenu}
                >
                  {service.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
