import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  CTASection,
  InnerPageShell,
  PageHero,
  SectionHeader,
} from "../components/PageScaffold";
import { services } from "../data/site";

export const metadata: Metadata = {
  title: "Services | Data Power Analytics",
  description:
    "Data strategy, analytics, digital research, training, and proposal support services from Data Power Analytics.",
};

export default function ServicesPage() {
  return (
    <InnerPageShell meshVariant="green">
      <PageHero
        kicker="Services"
        title="Practical data work for decisions that matter."
        body="Choose the service that fits your immediate question, or combine them into a focused roadmap."
      >
        <blockquote className="glass-panel m-0 max-w-[48rem] rounded-lg border border-brand-ivory/12 p-6 text-[clamp(1.25rem,2.2vw,2rem)] font-semibold leading-[1.18] text-brand-white">
          The best data work reduces uncertainty where a team is about to make a real choice.
        </blockquote>
      </PageHero>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <SectionHeader
          title="Five ways to make the work useful."
          body="Each service is designed to produce clear next actions, not just analysis for its own sake."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          {services.map((service, index) => (
            <Link
              className="group rounded-lg border border-brand-ivory/12 bg-brand-navy/44 p-5 text-brand-ivory no-underline backdrop-blur-xl transition hover:-translate-y-1 hover:border-brand-teal/55 hover:bg-brand-ivory/[0.065] first:lg:row-span-2 first:lg:p-7"
              href={`/services/${service.slug}`}
              key={service.slug}
            >
              <span className="text-sm font-semibold text-brand-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="type-card-title mt-4 max-w-[18rem] text-brand-white">
                {service.title}
              </h2>
              <p className="type-small-body mt-4 max-w-[34rem] text-brand-ivory/72">
                {service.overview}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal">
                Explore service
                <ArrowRight
                  className="transition group-hover:translate-x-1"
                  size={15}
                  weight="bold"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </InnerPageShell>
  );
}
