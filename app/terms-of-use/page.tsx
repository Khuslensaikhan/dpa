import type { Metadata } from "next";
import {
  InnerPageShell,
  PageHero,
  SectionHeader,
} from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Terms of Use | Data Power Analytics",
  description:
    "Website terms of use for Data Power Analytics visitors and prospective clients.",
};

const termsItems = [
  {
    title: "Website content",
    body: "Content on this website is provided for general information about Data Power Analytics services and capabilities.",
  },
  {
    title: "No professional advice",
    body: "Website content should not be treated as legal, financial, or formal consulting advice for a specific organization or decision.",
  },
  {
    title: "Permitted use",
    body: "You may use the website for lawful business research and inquiry. Do not attempt to disrupt the site, misuse forms, or copy content in a way that suggests endorsement.",
  },
  {
    title: "Intellectual property",
    body: "Unless otherwise noted, the text, structure, and visual materials on this website belong to Data Power Analytics.",
  },
];

export default function TermsOfUsePage() {
  return (
    <InnerPageShell meshVariant="green">
      <PageHero
        kicker="Terms of Use"
        title="Guidelines for using this website."
        body="These terms describe the basic conditions for browsing the site and contacting Data Power Analytics."
      />

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <SectionHeader
          title="Use the site responsibly."
          body="The website is here to explain services, support discovery, and make it easier to start a relevant business conversation."
        />
        <div className="mt-10 grid gap-4">
          {termsItems.map((item) => (
            <article
              className="border-t border-brand-ivory/14 py-6"
              key={item.title}
            >
              <h2 className="type-card-title m-0 text-brand-white">
                {item.title}
              </h2>
              <p className="type-body mt-3 max-w-[48rem] text-brand-ivory/74">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </InnerPageShell>
  );
}
