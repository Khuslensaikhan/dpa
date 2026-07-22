"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { RefObject } from "react";
import type { Service } from "../data/site";

type ServiceCardMedia = {
  imageSrc?: string;
  videoSrc?: string;
  alt: string;
  variant: "strategy" | "analytics" | "research" | "training" | "proposal";
};

const mediaBySlug: Record<string, ServiceCardMedia> = {
  "data-strategy-roadmap": {
    alt: "Strategy roadmap preview",
    imageSrc: "/Data Strategy & Roadmap.png",
    variant: "strategy",
  },
  "advanced-analytics-business-intelligence": {
    alt: "Analytics workspace preview",
    imageSrc: "/Advanced Analytics & Business Intelligence.png",
    variant: "analytics",
  },
  "social-media-digital-research": {
    alt: "Digital research preview",
    imageSrc: "/Social Media & Digital Research.png",
    variant: "research",
  },
  training: {
    alt: "Team training preview",
    imageSrc: "/Training.png",
    variant: "training",
  },
  "proposal-rfp-support": {
    alt: "Proposal support preview",
    imageSrc: "/Proposal & RFP Support.png",
    variant: "proposal",
  },
};

const cardLayout = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-4 lg:row-span-1",
  "lg:col-span-3 lg:row-span-1",
  "lg:col-span-3 lg:row-span-1",
  "lg:col-span-4 lg:row-span-1",
];

function ServiceHoverMedia({
  media,
  service,
  title,
  videoRef,
}: {
  media: ServiceCardMedia;
  service: Service;
  title: string;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  return (
    <div className="service-card-media" data-variant={media.variant}>
      {media.imageSrc ? (
        <Image
          className="service-card-image"
          src={media.imageSrc}
          alt={media.alt}
          fill
          sizes="(max-width: 840px) 100vw, 42vw"
        />
      ) : (
        <div className="service-card-placeholder" role="img" aria-label={media.alt}>
          <span />
          <span />
          <span />
        </div>
      )}

      {media.videoSrc ? (
        <video
          ref={videoRef}
          className="service-card-video"
          src={media.videoSrc}
          poster={media.imageSrc}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${title} video preview`}
        />
      ) : null}

      <div className="service-card-content">
        <span className="service-card-signal">{service.signal}</span>
        <h3>{service.title}</h3>
        <span className="service-card-action" aria-hidden="true">
          <ArrowRight size={17} weight="bold" />
        </span>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = mediaBySlug[service.slug];

  const playPreview = () => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !videoRef.current
    ) {
      return;
    }

    videoRef.current.currentTime = 0;
    videoRef.current.playbackRate = 1.55;
    void videoRef.current.play();
  };

  const stopPreview = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <Link
      className={`service-card group ${cardLayout[index] ?? "lg:col-span-4"}`}
      href={`/services/${service.slug}`}
      aria-label={`Explore ${service.title}`}
      onBlur={stopPreview}
      onFocus={playPreview}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
    >
      <ServiceHoverMedia
        media={media}
        service={service}
        title={service.title}
        videoRef={videoRef}
      />
    </Link>
  );
}

export function ServiceCardsSection({ services }: { services: Service[] }) {
  return (
    <section
      className="particle-stage pointer-events-none relative z-10 flex min-h-[118dvh] items-center px-[clamp(1.25rem,7vw,7rem)] py-24 max-[1023px]:min-h-0 max-[1023px]:items-start max-[1023px]:px-5 max-[1023px]:pb-16 max-[1023px]:pt-24"
      data-shape="spider-web"
      id="services"
    >
      <div className="pointer-events-auto w-full">
        <div className="max-w-[44rem]">
          <h2 className="type-section-title m-0 max-w-[15ch] text-brand-white">
            Services built around the decision.
          </h2>
          <p className="type-body mt-5 max-w-[36rem] text-brand-ivory/78">
            Pick the support your team needs now, then connect it into a practical data system.
          </p>
        </div>

        <div className="service-card-grid mt-9 grid gap-1 lg:grid-cols-12 lg:auto-rows-[minmax(15rem,auto)]">
          {services.map((service, index) => (
            <ServiceCard
              index={index}
              key={service.slug}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
