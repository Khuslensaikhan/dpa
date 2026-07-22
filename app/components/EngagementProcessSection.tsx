import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const engagementModules = [
  {
    title: "Initial conversation",
    image: "/initial conversation.png",
  },
  {
    title: "Diagnostic scoping",
    image: "/Diagnostic scoping.png",
  },
  {
    title: "Proposal and project plan",
    image: "/Proposal and project plan.png",
  },
  {
    title: "Research and analysis",
    image: "/Research and analysis.png",
  },
  {
    title: "Delivery and knowledge transfer",
    image: "/Delivery and knowledge transfer.png",
  },
] as const;

export function EngagementProcessSection() {
  return (
    <section
      className="particle-stage pointer-events-none relative z-10 px-[clamp(1.25rem,7vw,7rem)] py-24 max-[1023px]:px-5 max-[1023px]:py-16"
      data-shape="tree"
      id="engagement"
    >
      <div className="engagement-process pointer-events-auto">
        <div className="engagement-process-header">
          <h2>From the first question to a system your team can use.</h2>
          <p>
            A focused engagement moves from context to a practical handoff, with each step built around the decision ahead.
          </p>
        </div>

        <ol className="engagement-process-cards" aria-label="Engagement process">
          {engagementModules.map((module, index) => (
            <li className="engagement-process-card" key={module.title}>
              <h3>{module.title}</h3>
              <Image
                alt=""
                className="engagement-process-image"
                height={1254}
                sizes="(max-width: 640px) calc(100vw - 4.5rem), (max-width: 1023px) calc((100vw - 5rem) / 3), (max-width: 1440px) calc((100vw - 12rem) / 5), 232px"
                src={module.image}
                width={1254}
              />
              {index < engagementModules.length - 1 ? (
                <ArrowRight
                  className="engagement-process-arrow"
                  size={14}
                  weight="bold"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <p className="engagement-process-note">
          The work stays clear, connected, and useful from the first conversation through delivery and knowledge transfer.
        </p>
      </div>
    </section>
  );
}
