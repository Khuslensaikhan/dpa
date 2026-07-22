import {
  CaretDown,
  ChartLineUp,
  ChalkboardTeacher,
  FileText,
  RoadHorizon,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "./MobileNavigation";
import type { Service } from "../data/site";

const navItemClass =
  "inline-flex min-h-9 cursor-pointer appearance-none items-center rounded border-0 bg-transparent px-3 font-sans text-sm font-semibold leading-none tracking-normal text-brand-ivory/90 no-underline transition hover:bg-brand-ivory/12 hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

const serviceIcons: Icon[] = [
  RoadHorizon,
  ChartLineUp,
  ShareNetwork,
  ChalkboardTeacher,
  FileText,
];

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
            className="h-[3.42rem] w-[3.85rem]"
            src="/dpa logo.png"
            alt=""
            width={100}
            height={100}
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

          <div className="group relative">
            <Link
              className={`${navItemClass} gap-1.5`}
              href="/services"
              aria-haspopup="menu"
            >
              Services
              <CaretDown
                className="mt-px shrink-0 text-brand-ivory/70 transition-transform group-hover:rotate-180 group-hover:text-brand-white group-focus-within:rotate-180"
                size={11}
                weight="bold"
                aria-hidden="true"
              />
            </Link>
            <div className="invisible absolute left-1/2 top-full min-w-[35rem] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div
                className="glass-panel grid grid-cols-2 gap-2 rounded p-3"
                role="menu"
              >
                {services.map((service, index) => {
                  const Icon = serviceIcons[index] ?? ChartLineUp;

                  return (
                    <Link
                      className="grid min-h-[4.45rem] grid-cols-[2.2rem_1fr] gap-3 rounded-[2px] border border-brand-ivory/10 bg-brand-ivory/[0.045] px-3 py-3 text-brand-ivory no-underline transition hover:border-brand-teal/55 hover:bg-brand-teal/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
                      href={`/services/${service.slug}`}
                      key={service.title}
                      role="menuitem"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-brand-ivory/14 bg-brand-navy/55 text-brand-teal">
                        <Icon size={18} weight="duotone" aria-hidden="true" />
                      </span>
                      <span className="grid gap-1">
                        <span className="text-sm font-semibold leading-tight text-brand-white">
                          {index + 1}. {service.title}
                        </span>
                        <span className="text-xs leading-snug text-brand-ivory/62">
                          {service.body}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
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
