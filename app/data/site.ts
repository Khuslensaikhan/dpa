export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  body: string;
  overview: string;
  pullQuote: string;
  outcomes: string[];
  includes: string[];
  signal: string;
};

export const services: Service[] = [
  {
    slug: "data-strategy-roadmap",
    title: "Data Strategy & Roadmap",
    shortTitle: "Strategy",
    body: "Align data investments with the decisions, teams, and operating rhythm that matter most.",
    overview:
      "We translate business priorities into a practical data roadmap: what to measure, what to fix first, and how to phase work so teams see value quickly.",
    pullQuote:
      "A useful data strategy starts with decisions, not tools.",
    outcomes: [
      "Clear priorities for data, reporting, governance, and adoption",
      "A phased roadmap with owners, dependencies, and decision points",
      "Sharper alignment between leadership questions and the systems behind them",
    ],
    includes: [
      "Stakeholder interviews",
      "Current-state data audit",
      "Decision and metric mapping",
      "Roadmap and governance recommendations",
    ],
    signal: "Roadmap logic",
  },
  {
    slug: "advanced-analytics-business-intelligence",
    title: "Advanced Analytics & Business Intelligence",
    shortTitle: "Analytics",
    body: "Build trusted reporting, models, and dashboards that make performance easier to act on.",
    overview:
      "We design analytics and BI systems that teams can trust, from metric definitions and data models to reporting workflows and decision-ready dashboards.",
    pullQuote:
      "Better reporting is not more charts. It is fewer arguments about what the numbers mean.",
    outcomes: [
      "Trusted reporting definitions and reusable data models",
      "Dashboards built around operating decisions",
      "Analytic workflows that reduce manual cleanup and rework",
    ],
    includes: [
      "Metric and KPI design",
      "BI dashboard planning",
      "Analytic model development",
      "Reporting workflow improvements",
    ],
    signal: "Decision intelligence",
  },
  {
    slug: "social-media-digital-research",
    title: "Social Media & Digital Research",
    shortTitle: "Digital Research",
    body: "Turn public signals, audience behavior, and market movement into sharper insight.",
    overview:
      "We help teams understand digital conversations, audience behavior, campaign movement, and public signals so research can guide strategy instead of only reporting activity.",
    pullQuote:
      "Public signals become useful when they are tied to the question the business is trying to answer.",
    outcomes: [
      "Clearer readouts on audience, market, and campaign behavior",
      "Research frameworks that connect digital activity to business questions",
      "Sharper evidence for positioning, proposals, and strategic decisions",
    ],
    includes: [
      "Social listening frameworks",
      "Audience and market research",
      "Campaign performance analysis",
      "Insight reporting and recommendations",
    ],
    signal: "Signal mapping",
  },
  {
    slug: "training",
    title: "Training",
    shortTitle: "Training",
    body: "Help teams build confidence with analytics tools, workflows, and decision habits.",
    overview:
      "We build practical training around the tools, data, and decision workflows your team already uses, so new habits stick after the session ends.",
    pullQuote:
      "Training works when people leave knowing what to do on Monday morning.",
    outcomes: [
      "More confident teams using data in recurring workflows",
      "Shared language for metrics, tools, and reporting expectations",
      "Training materials shaped around real business questions",
    ],
    includes: [
      "Role-specific workshops",
      "Analytics and reporting enablement",
      "Tool adoption support",
      "Decision workflow coaching",
    ],
    signal: "Team enablement",
  },
  {
    slug: "proposal-rfp-support",
    title: "Proposal & RFP Support",
    shortTitle: "RFP Support",
    body: "Strengthen proposals with data strategy, research framing, and measurable delivery plans.",
    overview:
      "We support proposal teams with the research, data framing, metrics, and delivery logic needed to make complex responses clearer and more credible.",
    pullQuote:
      "A strong proposal shows how the work will be measured before the work begins.",
    outcomes: [
      "Sharper research and evidence for proposal narratives",
      "Measurable delivery plans that are easier to evaluate",
      "Clear data strategy language for technical and non-technical reviewers",
    ],
    includes: [
      "Proposal research support",
      "Evaluation and metric framing",
      "RFP response strategy",
      "Data and analytics delivery language",
    ],
    signal: "Evidence planning",
  },
];

export const approachSteps = [
  "Map the decisions that matter",
  "Audit the data behind them",
  "Build the smallest reliable system",
  "Ship, measure, and tighten the loop",
];

export const engagementSteps = [
  {
    title: "Consultation",
    body: "We clarify the business question, audience, timeline, constraints, and what success needs to look like.",
  },
  {
    title: "Diagnosis",
    body: "We review the data path, reporting habits, research materials, and decision workflows already in place.",
  },
  {
    title: "Proposal",
    body: "We define scope, deliverables, owners, and the practical route from current state to useful output.",
  },
  {
    title: "Work",
    body: "We build in focused increments, keeping stakeholders close to the decisions the work is meant to support.",
  },
  {
    title: "Final Report",
    body: "We close with findings, recommendations, documentation, and the next actions your team can carry forward.",
  },
];
