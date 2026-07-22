import { ArrowRight, Play, Sparkle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { services } from "../data/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type InnerPageShellProps = {
  children: ReactNode;
  meshVariant?: "default" | "gold" | "green";
};

export function MeshBackdrop({
  variant = "default",
}: {
  variant?: InnerPageShellProps["meshVariant"];
}) {
  return (
    <div
      className={`mesh-backdrop mesh-backdrop-${variant}`}
      aria-hidden="true"
    >
      <div className="mesh-backdrop-grid" />
    </div>
  );
}

export function InnerPageShell({
  children,
  meshVariant = "default",
}: InnerPageShellProps) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-brand-navy text-brand-ivory">
      <MeshBackdrop variant={meshVariant} />
      <SiteHeader services={services} />
      <main className="relative z-10">{children}</main>
      <div className="relative z-10 px-[clamp(1.25rem,7vw,7rem)]">
        <SiteFooter />
      </div>
    </div>
  );
}

type PageHeroProps = {
  kicker: string;
  title: string;
  body: string;
  children?: ReactNode;
};

export function PageHero({ kicker, title, body, children }: PageHeroProps) {
  return (
    <section className="relative px-[clamp(1.25rem,7vw,7rem)] pb-14 pt-32 max-[1023px]:px-5 max-[1023px]:pt-28">
      <div className="max-w-[58rem]">
        <p className="type-kicker mb-4 inline-flex w-fit border-l-2 border-brand-teal pl-3 uppercase text-brand-ivory/86">
          {kicker}
        </p>
        <h1 className="type-page-title m-0 max-w-[12ch] text-brand-white">
          {title}
        </h1>
        <p className="type-body mt-6 max-w-[39rem] text-brand-ivory/78">
          {body}
        </p>
      </div>
      {children ? <div className="mt-12">{children}</div> : null}
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  body?: string;
};

export function SectionHeader({ title, body }: SectionHeaderProps) {
  return (
    <div className="max-w-[43rem]">
      <h2 className="type-section-title m-0 text-brand-white">
        {title}
      </h2>
      {body ? (
        <p className="type-body mt-5 max-w-[39rem] text-brand-ivory/76">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function CTASection({
  title = "Ready to build the next system?",
  body = "Start with the workflow that matters most, then build the data layer around it.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="px-[clamp(1.25rem,7vw,7rem)] py-16 max-[1023px]:px-5">
      <div className="glass-panel grid gap-8 rounded-lg border border-brand-ivory/12 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <h2 className="type-section-title m-0 max-w-[13ch] text-brand-white">
            {title}
          </h2>
          <p className="type-body mt-4 max-w-[35rem] text-brand-ivory/76">
            {body}
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded bg-brand-gold px-5 text-sm font-semibold leading-none text-brand-navy no-underline whitespace-nowrap transition hover:-translate-y-px hover:bg-brand-white active:translate-y-px max-[520px]:w-full"
          href="/contact"
        >
          Book a Call
          <ArrowRight size={15} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ServiceVideoFrame({
  title,
  signal,
}: {
  title: string;
  signal: string;
}) {
  return (
    <div
      className="service-video-frame"
      role="img"
      aria-label={`${title} video preview`}
    >
      <div className="service-video-topbar">
        <span>{signal}</span>
        <span>01:24</span>
      </div>
      <div className="service-video-grid">
        <div className="service-video-main">
          <span className="service-video-play">
            <Play size={20} weight="fill" aria-hidden="true" />
          </span>
          <div className="service-video-title">
            <Sparkle size={16} weight="duotone" aria-hidden="true" />
            <span>{title}</span>
          </div>
        </div>
        <div className="service-video-rail">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="service-video-timeline">
        <span />
      </div>
    </div>
  );
}

export function StatStrip({
  items,
}: {
  items: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          className="rounded-lg border border-brand-ivory/12 bg-brand-navy/42 p-5 backdrop-blur-xl"
          key={item.label}
        >
          <p className="m-0 text-[clamp(1.55rem,3vw,2.4rem)] font-semibold leading-none text-brand-white">
            {item.value}
          </p>
          <p className="mt-3 text-sm leading-[1.45] text-brand-ivory/68">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
