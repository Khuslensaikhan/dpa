import { CalendarBlank, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { label: "Services", href: "/services" },
      { label: "Our Approach", href: "/approach" },
      { label: "About", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Engagement", href: "/#engagement" },
      { label: "Book a Call", href: "/contact" },
      { label: "Email Us", href: "mailto:hello@datapoweranalytics.com" },
    ],
  },
];

const businessPrompt =
  "Tell me about Data Power Analytics and how its data strategy, analytics, digital research, training, and proposal support could help my business. Summarize the likely services, questions I should ask, and practical next steps.";

const encodedBusinessPrompt = encodeURIComponent(businessPrompt);

const aiChatLinks = [
  {
    label: "Ask ChatGPT about Data Power Analytics",
    href: `https://chatgpt.com/?q=${encodedBusinessPrompt}`,
    iconSrc: "/openai.svg",
  },
  {
    label: "Ask Perplexity about Data Power Analytics",
    href: `https://www.perplexity.ai/search?q=${encodedBusinessPrompt}`,
    iconSrc: "/perplexity.svg",
  },
  {
    label: "Ask Gemini about Data Power Analytics",
    href: `https://gemini.google.com/app?q=${encodedBusinessPrompt}`,
    iconSrc: "/gemini.svg",
  },
];

export function SiteFooter() {
  return (
    <footer className="glass-panel pointer-events-auto relative z-[1] -mx-[clamp(1.25rem,7vw,7rem)] mt-24 w-[calc(100%+clamp(1.25rem,7vw,7rem)*2)] px-[clamp(1.25rem,7vw,7rem)] pb-16 pt-24 max-[1023px]:-mx-5 max-[1023px]:mt-16 max-[1023px]:w-[calc(100%+2.5rem)] max-[1023px]:px-5 max-[1023px]:pb-10 max-[1023px]:pt-16">
      <div className="relative z-[1] grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
        <div className="max-w-[31rem]">
          <Link
            className="inline-flex w-fit items-center gap-2 text-[0.95rem] font-semibold leading-none tracking-normal text-brand-white no-underline"
            href="/"
            aria-label="Data Power Analytics home"
          >
            <Image
              className="h-[3.42rem] w-auto"
              src="/dpa logo.png"
              alt=""
              width={897}
              height={766}
              quality={50}
            />
          </Link>
          <p className="type-small-body mt-5 max-w-[31rem] text-brand-ivory/72">
            Data strategy, analytics, research, and training for teams that need clearer decisions from the systems they already run.
          </p>
          <div
            className="mt-9 flex flex-wrap gap-2"
            aria-label="Contact and AI links"
          >
            <a
              className="footer-icon-button glass-button"
              href="mailto:hello@datapoweranalytics.com"
              aria-label="Email Data Power Analytics"
            >
              <EnvelopeSimple size={17} weight="bold" aria-hidden="true" />
            </a>
            <Link
              className="footer-icon-button glass-button"
              href="/contact"
              aria-label="Book a call"
            >
              <CalendarBlank size={17} weight="bold" aria-hidden="true" />
            </Link>
            {aiChatLinks.map((link) => (
              <a
                className="footer-icon-button glass-button"
                aria-label={link.label}
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  className="footer-svg-icon"
                  src={link.iconSrc}
                  alt=""
                  width={19}
                  height={19}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 max-[520px]:grid-cols-1">
          {footerGroups.map((group) => (
            <nav aria-label={group.title} key={group.title}>
              <h3 className="m-0 text-sm font-semibold leading-none tracking-normal text-brand-ivory/62">
                {group.title}
              </h3>
              <ul className="mt-5 grid list-none gap-3 p-0">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        className="text-sm font-semibold leading-none tracking-normal text-brand-ivory/82 no-underline transition hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        className="text-sm font-semibold leading-none tracking-normal text-brand-ivory/82 no-underline transition hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="relative z-[1] mt-14 flex items-center justify-between gap-5 border-t border-brand-ivory/16 pt-6 text-sm font-semibold leading-none tracking-normal text-brand-ivory/58 max-[700px]:flex-col max-[700px]:items-start">
        <p className="m-0">© 2026 Data Power Analytics. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link
            className="text-brand-ivory/58 no-underline transition hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-brand-ivory/58 no-underline transition hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            href="/terms-of-use"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
