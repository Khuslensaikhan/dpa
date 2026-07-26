import type { Metadata } from "next";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { InnerPageShell } from "../components/PageScaffold";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Data Power Analytics",
  description:
    "Get in touch with Data Power Analytics to discuss data strategy, analytics, research, training, or proposal support.",
};

const socialIcons = [LinkedinLogo, InstagramLogo, FacebookLogo];

export default function ContactPage() {
  return (
    <InnerPageShell meshVariant="gold">
      <section className="px-[clamp(1.25rem,7vw,7rem)] pb-14 pt-32 max-[1023px]:px-5 max-[1023px]:pt-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(22rem,1fr)] lg:gap-20">
          <div className="max-w-[29rem] lg:pt-6">
            <h1 className="type-page-title m-0 text-brand-white">Let&apos;s talk.</h1>
            <p className="type-body mt-5 text-brand-ivory/78">
              Send a quick note and we&apos;ll be in touch.
            </p>

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
