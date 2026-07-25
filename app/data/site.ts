export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  body: string;
  overview: string;
  signal: string;
  heroTitle: string;
  heroBody: string;
  challenge: string;
  approach: {
    title: string;
    body: string;
    variant: "split" | "sequence" | "cycle";
    steps: Array<{
      title: string;
      body: string;
      points?: string[];
      outcome?: string;
    }>;
  };
  capabilities: Array<{
    title: string;
    body: string;
  }>;
  engagement: Array<{
    title: string;
    body: string;
  }>;
  deliverables: string[];
  image: string;
  imageAlt: string;
  video: string;
  finalCta: {
    title: string;
    body?: string;
  };
  relatedSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "data-strategy-roadmap",
    title: "Data Strategy & Roadmap",
    shortTitle: "Strategy",
    body: "Align data investments with the decisions, teams, and operating rhythm that matter most.",
    overview:
      "We translate business priorities into a practical data roadmap: what to measure, what to fix first, and how to phase work so teams see value quickly.",
    signal: "Roadmap logic",
    heroTitle: "Start with the right questions. Build the right data around them.",
    heroBody:
      "Turn business challenges and unanswered problems into a practical data strategy, from the evidence you have to the data you need.",
    challenge:
      "Organizations often come to us with an important question but no clear path from that question to an evidence-based answer. The information may already exist across internal systems, databases, reports, or previous research. Or it may not exist yet. We help you determine which situation you are in and build the right path forward.",
    approach: {
      title: "Your answers may already be in your data. Or they may not exist yet.",
      body:
        "Sometimes the information exists across systems, reports, or previous research. Sometimes it has never been collected.",
      variant: "split",
      steps: [
        {
          title: "You already have data",
          body: "We assess, clean, structure, analyse, and interpret the information already available to extract evidence for the decision ahead.",
          points: ["Clean", "Structure", "Analyze", "Interpret"],
          outcome: "Extract answers",
        },
        {
          title: "You need new data",
          body: "We design the research question, method, sample, collection plan, and analysis framework around the evidence you need.",
          points: ["Research design", "Survey design", "Sampling", "Collection"],
          outcome: "Create evidence",
        },
      ],
    },
    capabilities: [
      {
        title: "Research and data strategy",
        body: "Connect organizational objectives, research questions, required data, and the right analytical approach.",
      },
      {
        title: "Survey and questionnaire design",
        body: "Build research instruments around the information you actually need to obtain.",
      },
      {
        title: "Data collection strategy",
        body: "Select the right channels, methodology, sampling approach, and operating plan for reliable collection.",
      },
      {
        title: "Data assessment and preparation",
        body: "Evaluate, clean, organize, and prepare existing data for meaningful analysis.",
      },
      {
        title: "Analysis planning",
        body: "Define how collected or existing data will be examined, interpreted, and translated into direction.",
      },
      {
        title: "Data management recommendations",
        body: "Set practical guidance for storing, organizing, maintaining, and governing information beyond one project.",
      },
    ],
    engagement: [
      {
        title: "Define the question",
        body: "Clarify the central problem, supporting research questions, and what a useful answer needs to accomplish.",
      },
      {
        title: "Understand what already exists",
        body: "Identify available data, research, systems, and knowledge so meaningful gaps are clear.",
      },
      {
        title: "Design the right approach",
        body: "Determine the combination of sources, methods, analytical techniques, and collection approaches the problem requires.",
      },
      {
        title: "Collect or prepare the data",
        body: "Establish a structured collection plan or prepare, clean, organize, and structure the data already available.",
      },
      {
        title: "Turn evidence into direction",
        body: "Translate findings into conclusions, visualizations, recommendations, and a practical roadmap your organization can act on.",
      },
    ],
    deliverables: [
      "Clearly defined research and business questions",
      "Data availability and gap assessment",
      "Research methodology and collection plan",
      "Survey, questionnaire, and sampling strategy",
      "Analysis framework and prepared datasets",
      "Findings, visualizations, and strategic recommendations",
      "A practical data roadmap",
    ],
    image: "/Data Strategy & Roadmap.jpeg",
    imageAlt: "Abstract data strategy roadmap visual",
    video: "/service-preview-3.mp4",
    finalCta: {
      title: "Have a question your data should be answering?",
      body: "Whether the information already exists or still needs to be collected, we can help you determine the right way forward.",
    },
    relatedSlugs: ["advanced-analytics-business-intelligence", "social-media-digital-research", "training"],
  },
  {
    slug: "advanced-analytics-business-intelligence",
    title: "Advanced Analytics & Business Intelligence",
    shortTitle: "Analytics",
    body: "Build trusted reporting, models, and dashboards that make performance easier to act on.",
    overview:
      "We design analytics and BI systems that teams can trust, from metric definitions and data models to reporting workflows and decision-ready dashboards.",
    signal: "Decision intelligence",
    heroTitle: "Turn complex data into intelligence you can act on.",
    heroBody:
      "DPA builds analytics systems around the questions teams ask repeatedly. From shared metric definitions to decision-ready reporting, we reduce the work between a number and a useful next action.",
    challenge:
      "Your team has reports, dashboards, and data exports, yet discussions still begin with which number is right. Manual cleanup, inconsistent definitions, and report overload make it harder to see what is changing and what deserves attention.",
    approach: {
      title: "Data to pattern to insight to decision.",
      body:
        "Every reporting system is designed as a short chain. If one link is weak, the insight cannot be trusted.",
      variant: "sequence",
      steps: [
        {
          title: "Define the measure",
          body: "Agree what success looks like and how the metric is calculated before a dashboard is built.",
        },
        {
          title: "Build a reliable model",
          body: "Create a clean, documented data layer that produces a consistent answer every time.",
        },
        {
          title: "Design for the decision",
          body: "Shape reporting around the moments where teams need to notice, discuss, and act.",
        },
      ],
    },
    capabilities: [
      {
        title: "KPI definition",
        body: "Create shared definitions, calculation logic, and context for the measures your team relies on.",
      },
      {
        title: "Data modelling",
        body: "Structure source data into reusable models that make reporting faster, clearer, and more reliable.",
      },
      {
        title: "Dashboard design",
        body: "Develop decision-focused views that surface the signals, comparisons, and exceptions people need.",
      },
      {
        title: "Reporting workflow redesign",
        body: "Reduce recurring manual work and clarify how reports are produced, reviewed, and used.",
      },
      {
        title: "Quality checks",
        body: "Introduce practical validation routines so teams know when a number is ready to use.",
      },
    ],
    engagement: [
      {
        title: "Choose the decisions",
        body: "We identify the recurring conversations where better visibility will make the biggest difference.",
      },
      {
        title: "Make the numbers trustworthy",
        body: "We align definitions, sources, and model logic before treating an output as a reliable signal.",
      },
      {
        title: "Put insight into practice",
        body: "We deliver reporting with the documentation and operating rhythm needed to make it stick.",
      },
    ],
    deliverables: [
      "Metric dictionary and KPI framework",
      "Documented analytic data model",
      "Decision-ready dashboard or reporting suite",
      "Quality and reporting workflow guidance",
    ],
    image: "/Advanced Analytics & Business Intelligence.jpeg",
    imageAlt: "Analytics and business intelligence visual",
    video: "/service-preview-2.mp4",
    finalCta: {
      title: "Turn complex data into clear direction.",
    },
    relatedSlugs: ["data-strategy-roadmap", "training", "proposal-rfp-support"],
  },
  {
    slug: "social-media-digital-research",
    title: "Social Media & Digital Research",
    shortTitle: "Digital Research",
    body: "Turn public signals, audience behavior, and market movement into sharper insight.",
    overview:
      "We help teams understand digital conversations, audience behavior, campaign movement, and public signals so research can guide strategy instead of only reporting activity.",
    signal: "Signal mapping",
    heroTitle: "Understand what people really think, feel, and do online.",
    heroBody:
      "DPA makes public signals, audience behaviour, and campaign movement easier to interpret. We focus research on the strategic question, so findings help a team decide what to do next.",
    challenge:
      "There is no shortage of digital activity to observe. The hard part is separating useful signals from noise and connecting a change in conversation, behaviour, or reach to the question your organisation is actually trying to answer.",
    approach: {
      title: "Beyond conventional social listening.",
      body:
        "We make each stage explicit so findings can shape the next question, message, or move.",
      variant: "cycle",
      steps: [
        {
          title: "Listen with intent",
          body: "Set the research question, relevant sources, audience groups, and signals that matter before collection begins.",
        },
        {
          title: "Interpret in context",
          body: "Combine quantitative patterns with the language, moments, and market conditions behind them.",
        },
        {
          title: "Turn findings into direction",
          body: "Translate evidence into practical recommendations for strategy, messaging, campaigns, or proposals.",
        },
      ],
    },
    capabilities: [
      {
        title: "Social listening design",
        body: "Set the questions, source set, keywords, and interpretive framework for ongoing social intelligence.",
      },
      {
        title: "Audience research",
        body: "Identify behaviour, needs, language, and points of attention across priority audience groups.",
      },
      {
        title: "Market and narrative mapping",
        body: "Track relevant conversations, competitors, themes, and shifts that affect your position.",
      },
      {
        title: "Campaign analysis",
        body: "Evaluate movement before, during, and after activity, with attention to context rather than vanity metrics.",
      },
      {
        title: "Insight reporting",
        body: "Produce concise readouts that explain what changed, why it matters, and what to consider next.",
      },
    ],
    engagement: [
      {
        title: "Set the research frame",
        body: "We agree the audience, questions, and decisions the research needs to inform.",
      },
      {
        title: "Collect and analyse signals",
        body: "We gather relevant evidence, test patterns, and bring context to the data.",
      },
      {
        title: "Share the strategic read",
        body: "We synthesise findings into a clear narrative with recommendations your team can discuss and use.",
      },
    ],
    deliverables: [
      "Research framework and source map",
      "Audience, conversation, or market analysis",
      "Campaign or trend readout",
      "Insight report with recommendations",
    ],
    image: "/Social Media & Digital Research.jpeg",
    imageAlt: "Digital research network visual",
    video: "/service-preview-4.mp4",
    finalCta: {
      title: "Find the signal in the digital conversation.",
    },
    relatedSlugs: ["data-strategy-roadmap", "proposal-rfp-support", "advanced-analytics-business-intelligence"],
  },
  {
    slug: "training",
    title: "Training",
    shortTitle: "Training",
    body: "Help teams build confidence with analytics tools, workflows, and decision habits.",
    overview:
      "We build practical training around the tools, data, and decision workflows your team already uses, so new habits stick after the session ends.",
    signal: "Team enablement",
    heroTitle: "Build data capability that stays inside your organization.",
    heroBody:
      "DPA training is built around your team’s tools, reporting, and recurring decisions. People leave with practical habits they can apply in their next meeting, not just a set of slides.",
    challenge:
      "Even a well-designed data system goes unused if people do not feel confident asking questions, interpreting results, or knowing what to do next. Generic training often explains a tool without changing the day-to-day workflow around it.",
    approach: {
      title: "Learn, apply, work independently.",
      body:
        "We combine instruction, practice, and follow-through so new knowledge becomes a useful team habit.",
      variant: "sequence",
      steps: [
        {
          title: "Learn the essential concept",
          body: "Introduce the data, metrics, tools, and decision logic in a way that matches each role.",
        },
        {
          title: "Practice on real scenarios",
          body: "Use realistic questions and examples so participants work through the judgement, not just the clicks.",
        },
        {
          title: "Apply it in the workflow",
          body: "Leave teams with prompts, materials, and next steps that fit their recurring work.",
        },
      ],
    },
    capabilities: [
      {
        title: "Role-based learning design",
        body: "Shape content for the different decisions, confidence levels, and responsibilities across a team.",
      },
      {
        title: "Tool enablement",
        body: "Help people use analytics and reporting tools with clear context for what each feature is for.",
      },
      {
        title: "Metric literacy workshops",
        body: "Build a shared language for definitions, interpretation, and the questions behind the numbers.",
      },
      {
        title: "Decision workflow coaching",
        body: "Embed data use into the meetings and routines where decisions are already being made.",
      },
      {
        title: "Reusable learning materials",
        body: "Create practical guides, exercises, and reference materials your team can return to after the session.",
      },
    ],
    engagement: [
      {
        title: "Understand the team",
        body: "We learn who needs to do what differently and where confidence or adoption is getting stuck.",
      },
      {
        title: "Build the learning experience",
        body: "We tailor workshops and materials around real tools, reports, and examples from the team’s work.",
      },
      {
        title: "Support the first application",
        body: "We give people a clear route to try the new approach in the workflow that follows.",
      },
    ],
    deliverables: [
      "Role-specific training plan",
      "Facilitated workshops or learning sessions",
      "Practical exercises using real scenarios",
      "Reusable guides and follow-up materials",
    ],
    image: "/Training.jpeg",
    imageAlt: "Data analytics training visual",
    video: "/service-preview-5.mp4",
    finalCta: {
      title: "Help your team work with data confidently.",
    },
    relatedSlugs: ["advanced-analytics-business-intelligence", "data-strategy-roadmap", "proposal-rfp-support"],
  },
  {
    slug: "proposal-rfp-support",
    title: "Proposal & RFP Support",
    shortTitle: "RFP Support",
    body: "Strengthen proposals with data strategy, research framing, and measurable delivery plans.",
    overview:
      "We support proposal teams with the research, data framing, metrics, and delivery logic needed to make complex responses clearer and more credible.",
    signal: "Evidence planning",
    heroTitle: "Build stronger proposals around evidence, clarity, and strategy.",
    heroBody:
      "DPA gives proposal teams the evidence, data framing, and measurement logic needed to show how a strong idea will work in practice. We help turn capability claims into a credible delivery plan.",
    challenge:
      "A proposal can have a compelling idea and still leave reviewers wondering how success will be measured, how evidence supports the approach, or whether the delivery plan can be executed. These gaps are especially costly when technical and non-technical audiences need to agree.",
    approach: {
      title: "Requirement, evidence, narrative, submission.",
      body:
        "We connect evidence, narrative, and measurement so the response holds together from the first claim to the final delivery plan.",
      variant: "cycle",
      steps: [
        {
          title: "Find the evidence",
          body: "Identify the research, data, and context that give the proposal a solid and relevant foundation.",
        },
        {
          title: "Make the case",
          body: "Translate complex thinking into clear language that works for reviewers with different levels of technical knowledge.",
        },
        {
          title: "Show how it will be measured",
          body: "Define outcomes, metrics, and delivery logic that make the plan credible before work begins.",
        },
        {
          title: "Submit with confidence",
          body: "Bring the evidence, narrative, and delivery plan together into a response reviewers can assess with clarity.",
        },
      ],
    },
    capabilities: [
      {
        title: "Bid research",
        body: "Gather relevant context, evidence, and market intelligence to strengthen the response strategy.",
      },
      {
        title: "Response framing",
        body: "Clarify the central argument and organise complex material into a compelling, easy-to-follow narrative.",
      },
      {
        title: "Measurement framework",
        body: "Define outcomes, indicators, and evaluation logic that make success specific and assessable.",
      },
      {
        title: "Data and analytics language",
        body: "Explain technical delivery approaches with enough rigour for specialists and enough clarity for every reviewer.",
      },
      {
        title: "Delivery-plan development",
        body: "Translate ambition into phases, responsibilities, outputs, and proof points that can be evaluated.",
      },
    ],
    engagement: [
      {
        title: "Read the brief for the real question",
        body: "We identify what reviewers need to believe, what evidence will matter, and where the response needs more precision.",
      },
      {
        title: "Strengthen the evidence and logic",
        body: "We develop the research, data framing, and measurement approach alongside the proposal narrative.",
      },
      {
        title: "Make the plan evaluable",
        body: "We help finalise a delivery story that shows how progress and results will be tracked.",
      },
    ],
    deliverables: [
      "Research and evidence summary",
      "Proposal narrative and data framing",
      "Measurement and evaluation framework",
      "Clear delivery plan with outputs and indicators",
    ],
    image: "/Proposal & RFP Support.jpeg",
    imageAlt: "Proposal planning visual",
    video: "/service-preview-1.mp4",
    finalCta: {
      title: "Put forward a proposal built on evidence.",
    },
    relatedSlugs: ["social-media-digital-research", "data-strategy-roadmap", "training"],
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
