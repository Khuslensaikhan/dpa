import type { Metadata } from "next";
import {
  CTASection,
  InnerPageShell,
  PageHero,
  SectionHeader,
} from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "About | Data Power Analytics",
  description:
    "Learn about Data Power Analytics, its founder-led approach, research philosophy, and practical data consulting principles.",
};

const differentiators = [
  {
    title: "Decision-first framing",
    body: "We start by naming the decision the work needs to support, then shape the data, research, and reporting around it.",
  },
  {
    title: "Quality-minded delivery",
    body: "We treat rework, unclear definitions, and brittle reporting as costs that can be designed out of the system.",
  },
  {
    title: "Practical adoption",
    body: "Recommendations are written for the teams who need to use them, not just for the room where they are presented.",
  },
];

const credentials = [
  "Analytics and business intelligence practice",
  "Research design and insight reporting",
  "Training, facilitation, and stakeholder enablement",
  "Proposal and RFP support for measurable delivery plans",
];

export default function AboutPage() {
  return (
    <InnerPageShell meshVariant="gold">
      <PageHero
        kicker="About"
        title="Founder-led data consulting with a practical edge."
        body="Data Power Analytics helps teams turn scattered data, research, and reporting into systems that support better operating decisions."
      />

      <section className="grid gap-10 px-[clamp(1.25rem,7vw,7rem)] py-14 lg:grid-cols-[0.9fr_1.1fr] max-[1023px]:px-5">
        <SectionHeader
          title="Founder story."
          body="The firm is built around the belief that data work should make teams clearer, faster, and more confident in the decisions already in front of them."
        />
        <div className="glass-panel rounded-lg border border-brand-ivory/12 p-7 sm:p-9">
          <p className="m-0 text-[clamp(1.1rem,1.8vw,1.55rem)] font-semibold leading-[1.32] text-brand-white">
            The founder brings a career background across analytics, research, operations, training, and proposal environments where the cost of unclear data shows up quickly.
          </p>
          <p className="mt-5 text-[1rem] leading-[1.65] text-brand-ivory/74">
            That experience shapes a consulting style that is direct, structured, and grounded in business questions. The goal is not to make data feel impressive. The goal is to make the next decision easier to defend.
          </p>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <SectionHeader
            title="A philosophy shaped by quality."
            body="The work draws from practical research discipline, Gallup-style attention to the right questions, and Deming's focus on systems, quality, cost, and time."
          />
          <blockquote className="m-0 border-l-2 border-brand-gold pl-6 text-[clamp(1.35rem,2.4vw,2.35rem)] font-semibold leading-[1.12] text-brand-white">
            Better systems reduce the hidden cost of confusion.
          </blockquote>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <SectionHeader title="What sets us apart." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {differentiators.map((item) => (
            <article
              className="rounded-lg border border-brand-ivory/12 bg-brand-navy/42 p-5 backdrop-blur-xl"
              key={item.title}
            >
              <h2 className="type-card-title m-0 text-brand-white">
                {item.title}
              </h2>
              <p className="type-small-body mt-4 text-brand-ivory/72">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="glass-panel rounded-lg border border-brand-ivory/12 p-7 sm:p-9">
          <SectionHeader
            title="Credentials and memberships."
            body="Credentials are presented around the disciplines clients rely on most: analytics, research, training, and proposal support."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {credentials.map((credential) => (
              <div
                className="rounded border border-brand-ivory/12 bg-brand-ivory/[0.045] p-4 text-sm font-semibold leading-[1.45] text-brand-white"
                key={credential}
              >
                {credential}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </InnerPageShell>
  );
}
