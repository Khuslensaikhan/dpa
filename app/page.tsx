import {
  ArrowRight,
  ChartLineUp,
  ClipboardText,
  Compass,
  FileText,
  FlagCheckered,
  MagnifyingGlass,
  RoadHorizon,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { CSSProperties } from "react";
import { EngagementProcessSection } from "./components/EngagementProcessSection";
import { ParticleHeroGate } from "./components/ParticleHeroGate";
import { HeroSection } from "./components/HeroSection";
import { ServiceCardsSection } from "./components/ServiceCardsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { engagementSteps, services } from "./data/site";

const missionFeatures = [
  {
    title: "We turn questions, challenges, and worries into clear direction.",
    icon: RoadHorizon,
  },
  {
    title: "We shape surveys, research, and investigations around the decisions ahead.",
    icon: FileText,
  },
  {
    title: "We turn scattered information into confident, data-driven decisions.",
    icon: ChartLineUp,
  },
];

const partnerSectors = [
  {
    title: "Education",
    body: "Institutions and learning organizations that need better evidence for planning, reporting, programs, and outcomes.",
  },
  {
    title: "Government & Public Sector",
    body: "Agencies and public programs working with complex stakeholders, accountability needs, and service delivery decisions.",
  },
  {
    title: "Non-profit & Think Tanks",
    body: "Mission-driven teams turning research, field data, policy questions, and impact reporting into clear next steps.",
  },
  {
    title: "Corporate & For-profit Teams",
    body: "Business units that need sharper analytics for operations, growth, customers, and investment choices.",
  },
  {
    title: "Market Research Firms",
    body: "Research partners that need clean data pipelines, reporting systems, and analysis support behind client work.",
  },
];

const processIcons = [
  Compass,
  MagnifyingGlass,
  ClipboardText,
  Wrench,
  FlagCheckered,
];

const processStepLayouts: Array<{
  position: string;
  style: CSSProperties;
}> = [
  {
    position: "top",
    style: { gridColumn: "3 / 6", gridRow: 1, marginLeft: "-60px", marginRight: "60px" },
  },
  { position: "left", style: { gridColumn: "2 / 5", gridRow: 2 } },
  {
    position: "right",
    style: { gridColumn: "3 / 6", gridRow: 3, marginLeft: "-60px", marginRight: "60px" },
  },
  { position: "middle", style: { gridColumn: "2 / 5", gridRow: 4 } },
  { position: "bottom", style: { gridColumn: "1 / 4", gridRow: 5 } },
];

export default function Home() {
  return (
    <div className="relative min-h-[600dvh] bg-brand-navy text-brand-ivory max-[1023px]:min-h-0">
      <ParticleHeroGate />
      <SiteHeader services={services} />

      <main className="relative z-10">
        <HeroSection />

        <section
          className="particle-stage pointer-events-none relative z-10 flex min-h-[100dvh] items-center px-[clamp(1.25rem,7vw,7rem)] py-24 max-[1023px]:min-h-0 max-[1023px]:items-end max-[1023px]:px-5 max-[1023px]:pb-14 max-[1023px]:pt-24"
          data-shape="beehive"
          id="mission"
        >
          <div className="pointer-events-auto grid w-full gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,1.05fr)] lg:items-center">
            <div className="max-w-[43rem]">
              <h2 className="type-section-title m-0 max-w-[20ch] text-brand-white">
                We help organizations turn questions, challenges, and even worries into clear direction.
              </h2>
            </div>

            <div className="grid gap-3" aria-label="Mission features">
              {missionFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    className="grid min-h-[7.4rem] grid-cols-[2.75rem_1fr] items-center gap-4 rounded-lg border border-brand-ivory/16 bg-brand-navy/36 p-5 text-left backdrop-blur-[14px] transition hover:border-brand-teal/45 hover:bg-brand-ivory/[0.055] max-[560px]:grid-cols-1"
                    key={feature.title}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded border border-brand-ivory/14 bg-brand-ivory/[0.07] text-brand-teal">
                      <Icon size={20} weight="duotone" aria-hidden="true" />
                    </span>
                    <h3 className="type-card-title m-0 text-brand-white">
                      {feature.title}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ServiceCardsSection services={services} />

        <section
          className="particle-stage pointer-events-none relative z-10 flex min-h-[100dvh] items-center px-[clamp(1.25rem,7vw,7rem)] py-24 max-[1023px]:min-h-0 max-[1023px]:items-start max-[1023px]:px-5 max-[1023px]:pb-14 max-[1023px]:pt-24"
          data-shape="tree-rings"
          id="who-we-work-with"
        >
          <div className="pointer-events-auto w-full">
            <div className="who-work-shell">
              <div className="who-work-intro">
                <h2>Who we work with.</h2>
                <p>
                  Data Power Analytics supports teams where the next decision carries public, social, or commercial weight.
                </p>
                <Link className="who-work-cta" href="/services">
                  View Services
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </Link>
              </div>

              <div className="who-work-list" role="list" aria-label="Organization sectors">
                {partnerSectors.map((sector) => (
                  <article className="who-work-row" key={sector.title} role="listitem">
                    <h3>{sector.title}</h3>
                    <p>{sector.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="particle-stage pointer-events-none relative z-10 flex min-h-[125dvh] items-center px-[clamp(1.25rem,7vw,7rem)] py-24 max-[1023px]:min-h-0 max-[1023px]:items-start max-[1023px]:px-5 max-[1023px]:pb-16 max-[1023px]:pt-24"
          data-shape="ant-colony"
          id="process"
        >
          <div className="pointer-events-auto w-full">
            <div className="process-flow">
              <div className="process-flow-header">
                <h2>How we work.</h2>
                <p>
                  We keep the process structured enough to create trust and flexible enough to adapt as we learn.
                </p>
              </div>

              <div className="process-flow-map" role="list" aria-label="How we work process">
                {engagementSteps.map((step, index) => {
                  const Icon = processIcons[index] ?? Compass;
                  const layout = processStepLayouts[index] ?? processStepLayouts[0];

                  return (
                    <article
                      className="process-flow-step"
                      data-position={layout.position}
                      key={step.title}
                      role="listitem"
                      style={layout.style}
                    >
                      <Icon className="process-flow-icon" size={30} weight="duotone" aria-hidden="true" />
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <EngagementProcessSection />

        <section
          className="particle-stage pointer-events-none relative z-10 flex min-h-[115dvh] flex-col justify-between overflow-hidden px-[clamp(1.25rem,7vw,7rem)] pt-[clamp(7rem,13vw,11rem)] max-[1023px]:min-h-[48rem] max-[1023px]:px-5 max-[1023px]:pt-28"
          data-shape="milky-way"
          id="contact"
        >
          <div className="contact-milky-bleed" aria-hidden="true" />

          <div className="pointer-events-auto relative z-1 w-full max-w-172">
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
              <a
                className="inline-flex min-h-11 min-w-42 items-center justify-center rounded bg-brand-teal px-5 text-sm font-semibold leading-none text-brand-navy no-underline whitespace-nowrap transition hover:-translate-y-px hover:bg-brand-white hover:!text-brand-navy active:translate-y-px max-[1023px]:flex-1 max-[520px]:w-full max-[520px]:flex-none"
                href="mailto:hello@datapoweranalytics.com"
              >
                Book a Call
              </a>
              <Link
                className="glass-button inline-flex min-h-11 min-w-42 items-center justify-center rounded px-5 text-sm font-semibold leading-none text-brand-white no-underline whitespace-nowrap transition hover:-translate-y-px hover:border-brand-ivory/55 hover:bg-brand-ivory/12 active:translate-y-px max-[1023px]:flex-1 max-[520px]:w-full max-[520px]:flex-none"
                href="/services"
              >
                View Services
              </Link>
            </div>
          </div>

          <SiteFooter />
        </section>
      </main>
    </div>
  );
}
