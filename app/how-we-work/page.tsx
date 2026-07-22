import type { Metadata } from "next";
import {
  CTASection,
  InnerPageShell,
  PageHero,
  SectionHeader,
} from "../components/PageScaffold";
import { engagementSteps } from "../data/site";

export const metadata: Metadata = {
  title: "How We Work | Data Power Analytics",
  description:
    "The engagement process Data Power Analytics uses for research, analytics, training, and reporting projects.",
};

export default function HowWeWorkPage() {
  return (
    <InnerPageShell meshVariant="green">
      <PageHero
        kicker="How We Work"
        title="Clear steps for research and delivery."
        body="Every engagement starts with the question behind the request, then moves through diagnosis, scope, delivery, and a practical final report."
      />

      <section className="grid gap-10 px-[clamp(1.25rem,7vw,7rem)] py-14 lg:grid-cols-[0.82fr_1.18fr] max-[1023px]:px-5">
        <SectionHeader
          title="How we think about research."
          body="The right questions determine whether research becomes useful evidence or another folder of findings."
        />
        <div className="glass-panel rounded-lg border border-brand-ivory/12 p-7 sm:p-9">
          <p className="m-0 text-[clamp(1.35rem,2.4vw,2.35rem)] font-semibold leading-[1.12] text-brand-white">
            We ask what decision the research needs to support, who needs to trust the answer, and what evidence would change the next action.
          </p>
          <p className="mt-5 text-[1rem] leading-[1.65] text-brand-ivory/74">
            From there, we design the method, data review, and reporting format around the real use of the work. Good research is not just accurate. It is usable by the people responsible for moving the work forward.
          </p>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <SectionHeader
          title="Engagement steps."
          body="The process stays structured enough to create trust and flexible enough to adapt as we learn."
        />
        <div className="mt-10 grid gap-4">
          {engagementSteps.map((step, index) => (
            <article
              className="grid gap-4 rounded-lg border border-brand-ivory/12 bg-brand-navy/42 p-5 backdrop-blur-xl md:grid-cols-[9rem_1fr]"
              key={step.title}
            >
              <div>
                <span className="text-sm font-semibold text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="type-card-title mt-3 text-brand-white">
                  {step.title}
                </h2>
              </div>
              <p className="type-small-body m-0 max-w-[50rem] text-brand-ivory/74">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CTASection title="Want a clean process for the next decision?" />
    </InnerPageShell>
  );
}
