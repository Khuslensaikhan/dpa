import type { Metadata } from "next";
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { InnerPageShell } from "../components/PageScaffold";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Data Power Analytics",
  description:
    "Get in touch with Data Power Analytics to discuss data strategy, analytics, research, training, or proposal support.",
};

const contactLinks = [
  {
    label: "Email",
    value: "turknur@datapoweranalytics.com",
    href: "mailto:turknur@datapoweranalytics.com",
    icon: EnvelopeSimple,
  },
  {
    label: "Phone",
    value: "+1(202)652-5219",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Remote, working with teams worldwide",
    href: "https://www.google.com/maps/search/?api=1&query=Data%20Power%20Analytics",
    icon: MapPin,
  },
];

const socialIcons = [LinkedinLogo, InstagramLogo, FacebookLogo];

export default function ContactPage() {
  return (
    <InnerPageShell meshVariant="gold">
      <section className="px-[clamp(1.25rem,7vw,7rem)] pb-14 pt-32 max-[1023px]:px-5 max-[1023px]:pt-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(22rem,1fr)] lg:gap-20">
          <div className="max-w-[29rem] lg:pt-6">
            <h1 className="type-page-title m-0 text-brand-white">Let&apos;s talk.</h1>
            <p className="type-body mt-5 text-brand-ivory/78">
              Send a quick note, email us directly, or arrange a call when it
              suits you.
            </p>

            <div className="mt-10 grid gap-6">
              {contactLinks.map(({ label, value, href, icon: Icon }) => {
                const content = (
                  <>
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded border border-brand-ivory/14 bg-brand-ivory/[0.06] text-brand-teal">
                      <Icon size={18} weight="bold" aria-hidden="true" />
                    </span>
                    <span className="grid gap-1">
                      <span className="text-sm font-semibold text-brand-ivory/60">
                        {label}
                      </span>
                      <span className="text-sm font-semibold leading-[1.45] text-brand-white">
                        {value}
                      </span>
                    </span>
                  </>
                );

                return href ? (
                  <a
                    className="group flex w-fit items-start gap-3 no-underline transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
                    href={href}
                    key={label}
                    rel={label === "Location" ? "noreferrer" : undefined}
                    target={label === "Location" ? "_blank" : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-start gap-3" key={label}>
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex items-center gap-3" aria-label="Social media profiles coming soon">
              <span className="text-sm font-semibold text-brand-ivory/60">
                Follow us
              </span>
              <div className="flex gap-2 text-brand-white" aria-hidden="true">
                {socialIcons.map((Icon) => (
                  <span
                    className="flex size-8 items-center justify-center rounded border border-brand-ivory/12"
                    key={Icon.displayName}
                  >
                    <Icon size={17} weight="bold" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </InnerPageShell>
  );
}
