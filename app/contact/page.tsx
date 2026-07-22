import type { Metadata } from "next";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import {
  InnerPageShell,
  PageHero,
  SectionHeader,
} from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Contact | Data Power Analytics",
  description:
    "Contact Data Power Analytics to discuss data strategy, analytics, research, training, and proposal support.",
};

export default function ContactPage() {
  return (
    <InnerPageShell meshVariant="gold">
      <PageHero
        kicker="Contact"
        title="Start with the workflow that matters most."
        body="Share the decision, report, research question, or proposal challenge you want to improve."
      />

      <section className="grid gap-10 px-[clamp(1.25rem,7vw,7rem)] py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] max-[1023px]:px-5">
        <form
          action="mailto:hello@datapoweranalytics.com"
          className="glass-panel rounded-lg border border-brand-ivory/12 p-6 sm:p-8"
          encType="text/plain"
          method="post"
        >
          <SectionHeader
            title="Tell us what you are working through."
            body="A few details are enough for a useful first conversation."
          />
          <div className="mt-8 grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-brand-white">
              Name
              <input
                className="min-h-12 rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 text-base font-normal text-brand-white outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
                name="name"
                type="text"
                autoComplete="name"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-white">
              Email
              <input
                className="min-h-12 rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 text-base font-normal text-brand-white outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-white">
              Organization
              <input
                className="min-h-12 rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 text-base font-normal text-brand-white outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
                name="organization"
                type="text"
                autoComplete="organization"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-white">
              What would you like help with?
              <textarea
                className="min-h-36 resize-y rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 py-3 text-base font-normal leading-[1.55] text-brand-white outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
                name="message"
                required
              />
            </label>
            <button
              className="inline-flex min-h-12 w-fit items-center justify-center rounded bg-brand-gold px-6 text-sm font-semibold text-brand-navy transition hover:-translate-y-px hover:bg-brand-white active:translate-y-px max-[520px]:w-full"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>

        <aside className="grid h-fit gap-4">
          <div className="rounded-lg border border-brand-ivory/12 bg-brand-navy/42 p-6 backdrop-blur-xl">
            <h2 className="type-card-title m-0 text-brand-white">
              Direct contact
            </h2>
            <a
              className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-brand-ivory no-underline transition hover:text-brand-white"
              href="mailto:hello@datapoweranalytics.com"
            >
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
              hello@datapoweranalytics.com
            </a>
          </div>
          <div className="rounded-lg border border-brand-ivory/12 bg-brand-navy/42 p-6 backdrop-blur-xl">
            <h2 className="type-card-title m-0 text-brand-white">
              Data privacy
            </h2>
            <p className="type-small-body mt-4 text-brand-ivory/72">
              Information you submit is used only to respond to your inquiry and prepare for a relevant first conversation.
            </p>
          </div>
        </aside>
      </section>
    </InnerPageShell>
  );
}
