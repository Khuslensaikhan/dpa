import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  ChartLineUp,
  ChalkboardTeacher,
  Check,
  FileText,
  MagnifyingGlass,
  RoadHorizon,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import {
  InnerPageShell,
  SectionHeader,
} from "../../components/PageScaffold";
import type { Service } from "../../data/site";
import { services } from "../../data/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

const capabilityIcons = [
  RoadHorizon,
  FileText,
  ShareNetwork,
  MagnifyingGlass,
  ChartLineUp,
  ChalkboardTeacher,
];

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
    return { title: "Service | Data Power Analytics" };
  }

  return {
    title: `${service.title} | Data Power Analytics`,
    description: service.overview,
  };
}

function ApproachVisual({ service }: { service: Service }) {
  return (
    <div
      className={`service-approach-visual service-approach-${service.approach.variant}`}
    >
      <div className="service-approach-paths">
        {service.approach.steps.map((step) => (
          <article className="service-approach-path" key={step.title}>
            <h3>{step.title}</h3>
            {step.points ? (
              <>
                <ul>
                  {step.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {step.outcome ? (
                  <div className="service-approach-path-outcome">
                    <ArrowDown size={21} weight="bold" aria-hidden="true" />
                    <span>{step.outcome}</span>
                  </div>
                ) : null}
              </>
            ) : (
              <p>{step.body}</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <InnerPageShell meshVariant="default">
      <section className="service-detail-hero">
        <video
          aria-hidden="true"
          autoPlay
          className="service-detail-hero-video"
          loop
          muted
          playsInline
          poster={service.image}
          preload="metadata"
        >
          <source src={service.video} type="video/mp4" />
        </video>
        <div className="service-detail-hero-scrim" aria-hidden="true" />
        <div className="service-detail-hero-content px-[clamp(1.25rem,7vw,7rem)] pb-16 pt-32 max-[1023px]:px-5 max-[1023px]:pt-28">
          <div className="max-w-196">
            <Link
              className="inline-flex text-sm font-semibold text-brand-teal no-underline transition hover:text-brand-white"
              href="/services"
            >
              All services
            </Link>
            <p className="type-kicker mb-4 mt-8 border-l-2 border-brand-teal pl-3 uppercase text-brand-ivory/86">
              {service.signal}
            </p>
            <h1 className="type-page-title m-0 max-w-[17ch] text-brand-white">
              {service.heroTitle}
            </h1>
            <p className="type-body mt-6 max-w-2xl text-brand-ivory/78">
              {service.heroBody}
            </p>
            <Link
              className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-brand-gold px-5 text-sm font-semibold leading-none text-brand-navy no-underline whitespace-nowrap transition hover:-translate-y-px hover:bg-brand-white active:translate-y-px"
              href="/contact"
            >
              Book a Consultation
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <div className="service-challenge">
          <p className="type-body m-0 text-brand-ivory/82">{service.challenge}</p>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <ApproachVisual service={service} />
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <SectionHeader
          title="What we do"
          body="Concrete work that turns the question into a reliable next step."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {service.capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length];

            return (
              <article
                className={`service-capability-card service-capability-card-${index % capabilityIcons.length}`}
                key={capability.title}
              >
                <span className="service-capability-icon" aria-hidden="true">
                  <Icon size={22} weight="duotone" />
                </span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
          <SectionHeader
            title="How the engagement works"
            body="A focused route from the problem in front of you to a result your team can use."
          />
          <div className="grid gap-3">
            {service.engagement.map((step) => (
              <article className="service-engagement-step" key={step.title}>
                <span aria-hidden="true"><ArrowRight size={17} weight="bold" /></span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <div className="service-deliverables grid gap-9 rounded-lg border border-brand-ivory/12 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16 lg:p-10">
          <SectionHeader
            title="What you leave with"
            body="Useful outputs that make the next decision and the next piece of work easier."
          />
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable}>
                <Check size={18} weight="bold" aria-hidden="true" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <div className="service-knowledge-transfer grid overflow-hidden rounded-lg border border-brand-ivory/12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
          <div className="p-7 sm:p-10 lg:p-12">
            <h2 className="type-section-title m-0 max-w-[12ch] text-brand-white">
              Knowledge transfer is part of the work.
            </h2>
            <p className="type-body mt-5 max-w-156 text-brand-ivory/78">
              We do not simply deliver the work. We make sure your team understands how to use it, challenge it, and extend it after the engagement ends.
            </p>
          </div>
          <div className="service-knowledge-image">
            <Image
              alt="Data Power Analytics knowledge transfer illustration"
              fill
              sizes="(max-width: 1023px) 100vw, 46vw"
              src="/Delivery and knowledge transfer.png"
            />
          </div>
        </div>
      </section>

      <section className="service-contact-cta px-[clamp(1.25rem,7vw,7rem)] py-24 max-[1023px]:px-5 max-[1023px]:py-16">
        <div className="w-full max-w-172">
          <p className="mb-4 m-0 text-sm font-semibold leading-none tracking-normal text-brand-ivory/72">
            Start with the workflow that matters most.
          </p>
          <h2 className="type-section-title m-0 max-w-[12ch] text-brand-white">
            Ready to build the next system?
          </h2>
          <div
            className="mt-8 flex w-fit max-w-full flex-wrap gap-3 max-[1023px]:w-full"
            aria-label="Contact actions"
          >
            <Link
              className="inline-flex min-h-11 min-w-42 items-center justify-center rounded bg-brand-teal px-5 text-sm font-semibold leading-none !text-brand-navy no-underline whitespace-nowrap transition hover:-translate-y-px hover:bg-brand-white hover:!text-brand-navy active:translate-y-px max-[1023px]:flex-1 max-[520px]:w-full max-[520px]:flex-none"
              href="/contact"
            >
              Book a Call
            </Link>
            <Link
              className="glass-button inline-flex min-h-11 min-w-42 items-center justify-center rounded px-5 text-sm font-semibold leading-none text-brand-white no-underline whitespace-nowrap transition hover:-translate-y-px hover:border-brand-ivory/55 hover:bg-brand-ivory/12 active:translate-y-px max-[1023px]:flex-1 max-[520px]:w-full max-[520px]:flex-none"
              href="/services"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </InnerPageShell>
  );
}
