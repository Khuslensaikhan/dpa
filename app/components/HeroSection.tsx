import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="particle-stage pointer-events-none relative z-10 flex min-h-[100dvh] items-center px-[clamp(1.25rem,7vw,7rem)] pb-18 pt-24 max-[1023px]:items-end max-[1023px]:px-5 max-[1023px]:pb-14 max-[1023px]:pt-32"
      data-shape="neural-core-to-database"
      id="hero"
    >
      <div
        className="pointer-events-auto w-full max-w-[43rem]"
        aria-labelledby="hero-title"
      >
        <p className="type-kicker mb-4 inline-flex w-fit border-l-2 border-brand-teal pl-3 uppercase text-brand-ivory/86">
          Data systems for sharper decisions
        </p>
        <h1
          className="type-hero-title m-0 max-w-[11ch] text-brand-white max-[1023px]:max-w-[10ch]"
          id="hero-title"
        >
          Turn data into momentum.
        </h1>
        <p className="type-body mt-5 max-w-[31rem] text-brand-ivory/76 max-[1023px]:max-w-[28rem]">
          We help businesses unlock real value from their data through expert consultancy, hands-on training, and robust governance.
        </p>
        <div
          className="mt-8 flex w-fit max-w-full flex-wrap gap-3 max-[1023px]:w-full"
          aria-label="Hero actions"
        >
          <Link
            className="inline-flex min-h-11 min-w-42 items-center justify-center rounded bg-brand-teal px-5 text-sm font-semibold leading-none whitespace-nowrap !text-brand-navy transition hover:-translate-y-px hover:bg-brand-white hover:!text-brand-navy active:translate-y-px max-[1023px]:flex-1 max-[520px]:w-full max-[520px]:flex-none"
            href="/contact"
          >
            Book a Call
          </Link>
          <Link
            className="glass-button inline-flex min-h-11 min-w-42 items-center justify-center rounded px-5 text-sm font-semibold leading-none whitespace-nowrap text-brand-white transition hover:-translate-y-px hover:border-brand-ivory/55 hover:bg-brand-ivory/12 active:translate-y-px max-[1023px]:flex-1 max-[520px]:w-full max-[520px]:flex-none"
            href="/services"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
