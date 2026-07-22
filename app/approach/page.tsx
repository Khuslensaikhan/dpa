import type { Metadata } from "next";
import {
  CTASection,
  InnerPageShell,
  PageHero,
  SectionHeader,
} from "../components/PageScaffold";
import { approachSteps } from "../data/site";

export const metadata: Metadata = {
  title: "Our Approach | Data Power Analytics",
  description:
    "How Data Power Analytics approaches data strategy, analytics, research, training, and practical implementation work.",
};

const walkthrough = [
  {
    title: "A leadership team needs clearer performance visibility",
    body: "We begin by naming the recurring decisions leaders are trying to make and the metrics they already use to make them.",
  },
  {
    title: "The current reporting path is reviewed",
    body: "We look for conflicting definitions, manual rework, missing ownership, and places where teams no longer trust the report.",
  },
  {
    title: "A smaller reliable system is designed",
    body: "We prioritize the few data flows and dashboards that support the highest-value operating conversations.",
  },
  {
    title: "The team learns how to keep it useful",
    body: "We document definitions, handoff points, review rhythms, and the next round of improvements.",
  },
];

export default function ApproachPage() {
  return (
    <InnerPageShell meshVariant="default">
      <PageHero
        kicker="Our Approach"
        title="Start with the decision. Build only what helps."
        body="Our approach keeps data work tied to business context, team adoption, and measurable next steps."
      />

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="grid gap-3 lg:grid-cols-4">
          {approachSteps.map((step, index) => (
            <article
              className="rounded-lg border border-brand-ivory/12 bg-brand-navy/42 p-5 backdrop-blur-xl"
              key={step}
            >
              <span className="text-sm font-semibold text-brand-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="type-card-title mt-5 text-brand-white">
                {step}
              </h2>
            </article>
          ))}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="glass-panel rounded-lg border border-brand-ivory/12 p-7 sm:p-9">
          <SectionHeader
            title="How we would approach a project."
            body="A sample walkthrough shows the level of practical structure we bring before anything is built."
          />
          <div className="mt-10 grid gap-4">
            {walkthrough.map((item, index) => (
              <article
                className="grid gap-4 rounded-lg border border-brand-ivory/12 bg-brand-ivory/[0.045] p-5 md:grid-cols-[4rem_1fr]"
                key={item.title}
              >
                <span className="text-[clamp(1.5rem,3vw,2.6rem)] font-semibold leading-none text-brand-teal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="type-card-title m-0 text-brand-white">
                    {item.title}
                  </h2>
                  <p className="type-small-body mt-3 max-w-[47rem] text-brand-ivory/72">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Have a project that needs structure?" />
    </InnerPageShell>
  );
}
