import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "./MobileNavigation";
import { ServicesMenu } from "./ServicesMenu";
import type { Service } from "../data/site";

const navItemClass =
  "inline-flex min-h-9 cursor-pointer appearance-none items-center rounded border-0 bg-transparent px-3 font-sans text-sm font-semibold leading-none tracking-normal text-brand-ivory/90 no-underline transition hover:bg-brand-ivory/12 hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

export function SiteHeader({ services }: { services: Service[] }) {
  return (
    <header className="site-header px-[clamp(1.25rem,4vw,4.75rem)] pt-3 max-[1023px]:px-5">
      <nav
        className="relative grid min-h-12 w-full grid-cols-[minmax(9rem,1fr)_auto_minmax(9rem,1fr)] items-center gap-4 font-sans max-[1023px]:grid-cols-[minmax(0,1fr)_auto]"
        aria-label="Primary navigation"
      >
        <Link
          className="col-start-1 inline-flex w-fit items-center gap-2 justify-self-start text-[0.95rem] font-semibold leading-none tracking-normal text-brand-white no-underline whitespace-nowrap"
          href="/"
          aria-label="Data Power Analytics home"
        >
          <Image
            className="h-[3.42rem] w-auto"
            src="/dpa logo.png"
            alt=""
            width={897}
            height={766}
            quality={50}
            priority
          />
        </Link>

        <div className="col-start-2 hidden items-center gap-1 min-[1024px]:flex">
          <Link className={navItemClass} href="/about">
            About
          </Link>
          <Link className={navItemClass} href="/approach">
            Our Approach
          </Link>

          <Link className={navItemClass} href="/how-we-work">
            How We Work
          </Link>

          <ServicesMenu services={services} />
        </div>

        <Link
          className="col-start-3 hidden min-h-10 items-center justify-center justify-self-end rounded bg-brand-teal px-4 text-sm font-semibold leading-none !text-brand-navy no-underline whitespace-nowrap transition visited:!text-brand-navy hover:-translate-y-px hover:bg-brand-white hover:!text-brand-navy active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold min-[1024px]:inline-flex"
          href="/contact"
        >
          Book a Call
        </Link>

        <MobileNavigation
          services={services.map(({ slug, shortTitle }) => ({ slug, shortTitle }))}
        />
      </nav>
    </header>
  );
}
