import { ArrowLeft, ArrowRight, Compass } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

type HoldingPageProps = {
  kind: "coming-soon" | "not-found";
};

const pageContent = {
  "coming-soon": {
    eyebrow: "A new page is taking shape",
    title: "We are building this part of the site with care.",
    body: "Our team is refining the details. The work behind this page is already in progress.",
    action: "Return home",
  },
  "not-found": {
    eyebrow: "Page not found",
    title: "This route does not lead anywhere yet.",
    body: "The page may have moved, or the address may not be quite right. You can return to our homepage from here.",
    action: "Go to homepage",
  },
} as const;

export function HoldingPage({ kind }: HoldingPageProps) {
  const content = pageContent[kind];
  const Icon = kind === "coming-soon" ? Compass : ArrowLeft;

  return (
    <main className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-brand-navy px-5 py-8 text-brand-ivory sm:px-8 lg:px-[clamp(3rem,7vw,7rem)]">
      <Image
        alt=""
        className="object-cover object-[66%_center]"
        fill
        priority
        sizes="100vw"
        src="/data-network-holding-page.png"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,58,0.98)_0%,rgba(11,31,58,0.93)_36%,rgba(11,31,58,0.72)_61%,rgba(11,31,58,0.42)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_24%_78%,rgba(31,122,84,0.21),transparent_31%),radial-gradient(circle_at_74%_18%,rgba(42,168,184,0.13),transparent_28%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[86rem] flex-col justify-between gap-16">
        <Link
          aria-label="Data Power Analytics home"
          className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-brand-white no-underline"
          href="/"
        >
          <Image
            alt=""
            className="h-12 w-[3.4rem]"
            height={100}
            priority
            src="/dpa logo.png"
            width={100}
          />
          <span>Data Power Analytics</span>
        </Link>

        <section className="max-w-[44rem]">
          <div className="mb-6 flex items-center gap-3 text-brand-teal">
            <span className="flex h-10 w-10 items-center justify-center rounded border border-brand-teal/35 bg-brand-navy/50 backdrop-blur-sm">
              <Icon size={20} weight="duotone" aria-hidden="true" />
            </span>
            <p className="m-0 text-sm font-semibold tracking-[0.08em] text-brand-ivory/80 uppercase">
              {content.eyebrow}
            </p>
          </div>
          <h1 className="m-0 max-w-[12ch] text-[clamp(3.1rem,7vw,6.4rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-brand-white text-balance">
            {content.title}
          </h1>
          <p className="mt-7 max-w-[36rem] text-[clamp(1rem,1.5vw,1.18rem)] leading-[1.62] text-brand-ivory/80 text-pretty">
            {content.body}
          </p>
          <Link
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-brand-teal px-5 text-sm font-semibold leading-none text-brand-navy no-underline whitespace-nowrap transition hover:-translate-y-px hover:bg-brand-white active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
            href="/"
          >
            {content.action}
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </section>

        <p className="m-0 text-sm text-brand-ivory/58">
          Data Power Analytics
        </p>
      </div>
    </main>
  );
}
