import type { Metadata } from "next";
import {
  InnerPageShell,
  PageHero,
  SectionHeader,
} from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Privacy Policy | Data Power Analytics",
  description:
    "Privacy information for visitors and prospective clients of Data Power Analytics.",
};

const privacyItems = [
  {
    title: "Information we collect",
    body: "We collect the information you choose to send through this website or by email, such as your name, email address, organization, and message.",
  },
  {
    title: "How we use it",
    body: "We use submitted information to respond to inquiries, prepare for relevant conversations, provide requested services, and maintain ordinary business records.",
  },
  {
    title: "Sharing",
    body: "We do not sell personal information. Information may be shared only with service providers or advisors who help operate the business, or when required by law.",
  },
  {
    title: "Your choices",
    body: "You can ask to update, correct, or delete information you have provided by contacting hello@datapoweranalytics.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <InnerPageShell>
      <PageHero
        kicker="Privacy Policy"
        title="How visitor and inquiry information is handled."
        body="This page summarizes how Data Power Analytics handles information shared through the website and direct inquiries."
      />

      <section className="px-[clamp(1.25rem,7vw,7rem)] py-14 max-[1023px]:px-5">
        <SectionHeader
          title="Privacy in plain language."
          body="The site is designed for business inquiries. Information you send is used to respond to you and support the consulting relationship you request."
        />
        <div className="mt-10 grid gap-4">
          {privacyItems.map((item) => (
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
