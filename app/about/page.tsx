import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import aboutOne from "../../public/about1.jpg";
import { InnerPageShell } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "About | Data Power Analytics",
  description:
    "Why Data Power Analytics exists: founder-led research, analytics, and practical decision support grounded in quality and trust.",
};

const experience = [
  {
    title: "Research and sampling",
    body: "Designing the right question and method before collecting more data, so the evidence can stand up to scrutiny.",
  },
  {
    title: "Analytics and operations",
    body: "Connecting information to the decisions, workflows, and people responsible for moving the work forward.",
  },
  {
    title: "Training and knowledge transfer",
    body: "Making the work understandable and usable for the team that will own it after the engagement ends.",
  },
  {
    title: "Scoping and delivery",
    body: "Balancing quality, cost, and time early, with a practical route from question to useful output.",
  },
];

export default function AboutPage() {
  return (
    <InnerPageShell meshVariant="gold">
      <section className="px-[clamp(1.25rem,7vw,7rem)] pb-14 pt-32 max-[1023px]:px-5 max-[1023px]:pt-28">
        <div className="grid gap-2 md:grid-cols-12">
          <div className="flex min-h-[31rem] flex-col justify-between py-3 md:col-span-5">
            <h1 className="m-0 max-w-[10ch] text-[clamp(2.35rem,3.8vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-brand-white">
              The clarity behind better decisions.
            </h1>
            <div className="max-w-[28rem]">
              <p className="m-0 text-[1rem] leading-[1.6] text-brand-ivory/76">
                We turn raw information into research, analytics, and reporting that helps people decide what to do next.
              </p>
              <a
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-brand-teal px-5 text-sm font-semibold leading-none !text-brand-navy no-underline whitespace-nowrap transition hover:-translate-y-px hover:bg-brand-white hover:!text-brand-navy active:translate-y-px"
                href="#founder"
              >
                Meet the founder
                <ArrowRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative min-h-124 overflow-hidden rounded-sm md:col-span-4">
            <Image
              src={aboutOne}
              alt="Business team reviewing information together"
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 58vw, 36vw"
              className="object-cover"
            />
          </div>

          <div className="grid min-h-[31rem] grid-cols-2 gap-4 md:col-span-3 md:grid-cols-1 md:grid-rows-2">
            <div className="relative min-h-[15rem] overflow-hidden rounded-lg">
              <Image
                src="/about2.jpg"
                alt="Team discussing a business decision"
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 42vw, 26vw"
                className="object-cover"
              />
            </div>
            <div className="flex min-h-[15rem] items-end rounded-lg bg-brand-teal p-5 sm:p-6">
              <p className="m-0 max-w-[10ch] text-[clamp(1.35rem,2vw,2rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-brand-navy">
                Better questions lead to better decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <article className="lg:col-span-7">
            <h2 className="type-section-title m-0 max-w-[14ch] text-brand-white">
              Data should make the next move clearer.
            </h2>
            <p className="type-body mt-6 max-w-[43rem] text-brand-ivory/76">
              Teams can have plenty of information and still lack a clear line from the evidence to the decision in front of them. Data Power Analytics exists to close that gap with technical depth, disciplined research, and a practical understanding of the questions that matter to the business.
            </p>
          </article>
          <article className="border-l-2 border-brand-teal pl-6 lg:col-span-5">
            <p className="m-0 max-w-[16ch] text-[clamp(1.45rem,2.5vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-teal">
              Useful evidence arrives in time to make a difference.
            </p>
            <p className="mt-5 max-w-[30rem] text-sm leading-[1.55] text-brand-ivory/76">
              The goal is real-time, cost-efficient, user-friendly output that people can trust and use.
            </p>
          </article>
        </div>
      </section>

      <section
        className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5"
        id="founder"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="relative min-h-[35rem] overflow-hidden rounded-lg max-[1023px]:min-h-[28rem] lg:col-span-5">
            <Image
              src="/Founder.png"
              alt="Dr. Turknur Brand"
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <article className="lg:col-span-7">
            <p className="m-0 text-sm font-semibold text-brand-gold">DR. Turknur Brand</p>
            <h2 className="type-section-title mt-5 max-w-[13ch] text-brand-white">
              Practical rigor, with people in mind.
            </h2>
            <div className="mt-7 max-w-[43rem] space-y-5 text-[1rem] leading-[1.65] text-brand-ivory/76">
              <p>
                Data Power Analytics is shaped by experience across research, analytics, operations, training, and proposal environments, where unclear data has an immediate cost.
              </p>
              <p>
                That experience led to a straightforward approach: work alongside the people closest to the decision, make the method understandable, and leave each team with more capability than it started with.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
          <div>
            <p className="m-0 text-sm font-semibold text-brand-teal">Founder experience</p>
            <h2 className="type-section-title mt-5 max-w-[12ch] text-brand-white">
              What informs the way we work.
            </h2>
            <p className="type-body mt-6 max-w-[30rem] text-brand-ivory/76">
              The goal is not to make data feel impressive. It is to make the next decision easier to defend, implement, and revisit.
            </p>
          </div>
          <div>
            {experience.map((item) => (
              <article
                className="grid gap-3 border-t border-brand-ivory/14 py-6 first:pt-0 last:border-b sm:grid-cols-[12rem_1fr] sm:gap-7"
                key={item.title}
              >
                <h3 className="type-card-title m-0 text-brand-white">{item.title}</h3>
                <p className="type-small-body m-0 max-w-[35rem] text-brand-ivory/72">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
        <div className="max-w-172">
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
