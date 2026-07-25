import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CTASection, InnerPageShell, SectionHeader } from "../components/PageScaffold";
import { services } from "../data/site";

export const metadata: Metadata = {
  title: "Services | Data Power Analytics",
  description:
    "Data strategy, analytics, digital research, training, and proposal support services from Data Power Analytics.",
};

export default function ServicesPage() {
  return (
    <InnerPageShell meshVariant="green">
      <section className="services-video-hero">
        <video
          aria-hidden="true"
          autoPlay
          className="services-video-hero-video"
          loop
          muted
          playsInline
          poster="/Data Strategy & Roadmap.jpeg"
          preload="metadata"
        >
          <source src="/service-preview-3.mp4" type="video/mp4" />
        </video>
        <div className="services-video-hero-scrim" aria-hidden="true" />
        <div className="services-video-hero-content px-[clamp(1.25rem,7vw,7rem)] pb-16 pt-32 max-[1023px]:px-5 max-[1023px]:pt-28">
          <div className="max-w-[46rem]">
            <p className="type-kicker mb-4 border-l-2 border-brand-teal pl-3 uppercase text-brand-ivory/86">
              Services
            </p>
            <h1 className="type-page-title m-0 max-w-[13ch] text-brand-white">
              Practical data work for decisions that matter.
            </h1>
            <p className="type-body mt-6 max-w-[37rem] text-brand-ivory/82">
              Choose the support your team needs now, then connect it into a practical data system.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <SectionHeader
          title="Find the right path forward."
          body="Each service starts with a real question and ends with clear evidence, a stronger capability, or a practical next move."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          {services.map((service) => (
            <Link
              className="group rounded-lg border border-brand-ivory/12 bg-brand-navy/44 p-5 text-brand-ivory no-underline backdrop-blur-xl transition hover:-translate-y-1 hover:border-brand-teal/55 hover:bg-brand-ivory/[0.065] first:lg:row-span-2 first:lg:p-7"
              href={`/services/${service.slug}`}
              key={service.slug}
            >
              <h2 className="type-card-title max-w-[18rem] text-brand-white">
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
