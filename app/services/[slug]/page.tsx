import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  CTASection,
  InnerPageShell,
  SectionHeader,
  ServiceVideoFrame,
} from "../../components/PageScaffold";
import { services } from "../../data/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service | Data Power Analytics",
    };
  }

  return {
    title: `${service.title} | Data Power Analytics`,
    description: service.overview,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <InnerPageShell meshVariant="default">
      <section className="grid gap-10 px-[clamp(1.25rem,7vw,7rem)] pb-16 pt-32 lg:grid-cols-[minmax(0,0.88fr)_minmax(28rem,1.12fr)] lg:items-center max-[1023px]:px-5 max-[1023px]:pt-28">
        <div>
          <Link
            className="mb-5 inline-flex text-sm font-semibold text-brand-teal no-underline transition hover:text-brand-white"
            href="/services"
          >
            Services
          </Link>
          <h1 className="type-page-title m-0 max-w-[12ch] text-brand-white">
            {service.title}
          </h1>
          <p className="type-body mt-6 max-w-[37rem] text-brand-ivory/78">
            {service.overview}
          </p>
        </div>
        <ServiceVideoFrame title={service.title} signal={service.signal} />
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <blockquote className="m-0 max-w-[54rem] border-l-2 border-brand-gold pl-6 text-[clamp(1.55rem,3vw,3rem)] font-semibold leading-[1.05] text-brand-white">
          {service.pullQuote}
        </blockquote>
      </section>

      <section className="grid gap-10 px-[clamp(1.25rem,7vw,7rem)] py-14 lg:grid-cols-[0.8fr_1.2fr] max-[1023px]:px-5">
        <SectionHeader
          title="What this work creates."
          body="The deliverables are shaped around the decisions, teams, and operating cadence behind the request."
        />
        <div className="grid gap-3">
          {service.outcomes.map((outcome) => (
            <div
              className="rounded-lg border border-brand-ivory/12 bg-brand-navy/42 p-5 backdrop-blur-xl"
              key={outcome}
            >
              <p className="m-0 text-[1rem] font-semibold leading-[1.5] text-brand-white">
                {outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="glass-panel rounded-lg border border-brand-ivory/12 p-7 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionHeader
              title="Typical scope."
              body="A focused engagement can stand alone or connect with other services as part of a broader roadmap."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <div
                  className="min-h-24 rounded border border-brand-ivory/12 bg-brand-ivory/[0.045] p-4"
                  key={item}
                >
                  <p className="m-0 text-sm font-semibold leading-[1.45] text-brand-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="flex flex-wrap gap-3">
          {services
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-brand-ivory/14 bg-brand-navy/38 px-4 text-sm font-semibold text-brand-ivory no-underline backdrop-blur-xl transition hover:-translate-y-px hover:border-brand-teal/55 hover:text-brand-white"
                href={`/services/${item.slug}`}
                key={item.slug}
              >
                {item.shortTitle}
                <ArrowRight size={14} weight="bold" aria-hidden="true" />
              </Link>
            ))}
        </div>
      </section>

      <CTASection title="Want to shape this around your team?" />
    </InnerPageShell>
  );
}
