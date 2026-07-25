"use client";

import {
  CaretDown,
  ChartLineUp,
  ChalkboardTeacher,
  FileText,
  RoadHorizon,
  ShareNetwork,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { useId, useState } from "react";
import type { Service } from "../data/site";

const serviceIcons: Icon[] = [
  RoadHorizon,
  ChartLineUp,
  ShareNetwork,
  ChalkboardTeacher,
  FileText,
];

const triggerClass =
  "inline-flex min-h-9 cursor-pointer appearance-none items-center rounded border-0 bg-transparent px-3 font-sans text-sm font-semibold leading-none tracking-normal text-brand-ivory/90 no-underline transition hover:bg-brand-ivory/12 hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

export function ServicesMenu({ services }: { services: Service[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`${triggerClass} gap-1.5`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
      >
        Services
        <CaretDown
          className={`mt-px shrink-0 text-brand-ivory/70 transition-transform ${
            isOpen ? "rotate-180 text-brand-white" : ""
          }`}
          size={11}
          weight="bold"
          aria-hidden="true"
        />
      </button>

      <div
        className={`absolute left-1/2 top-full min-w-[35rem] -translate-x-1/2 pt-2 transition ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        id={menuId}
      >
        <div className="glass-panel grid grid-cols-2 gap-2 rounded p-3">
          <Link
            className="col-span-2 flex min-h-11 items-center justify-between rounded-[2px] border border-brand-teal/45 bg-brand-teal/12 px-3 text-sm font-semibold text-brand-white no-underline transition hover:border-brand-gold hover:bg-brand-teal/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
            href="/services"
          >
            All services
            <span className="text-xs font-medium text-brand-teal">
              See every way we can help
            </span>
          </Link>
          {services.map((service, index) => {
            const Icon = serviceIcons[index] ?? ChartLineUp;

            return (
              <Link
                className="grid min-h-[4.45rem] grid-cols-[2.2rem_1fr] gap-3 rounded-[2px] border border-brand-ivory/10 bg-brand-ivory/[0.045] px-3 py-3 text-brand-ivory no-underline transition hover:border-brand-teal/55 hover:bg-brand-teal/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
                href={`/services/${service.slug}`}
                key={service.title}
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
  );
}
