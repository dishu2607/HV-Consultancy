// Sourced from "HV Service Architecture" — Option A (Practice Areas) structure.
// Colour denotes practice group, for each practice group.

export const PRACTICE_GROUPS = [
  {
    id: "finance",
    name: "Finance, Reporting & Assurance",
    short: "Finance & Assurance",
    color: "var(--color-sage)",
    blurb:
      "Ownership of the books and the numbers that come out of them — from daily entries to a signed set of IFRS-compliant statements.",
    services: [
      {
        name: "Accounting Services",
        what: "End-to-end ownership of the books — ERP implementation, daily entries, reconciliations and finalisation of statutory financial statements — with a monthly management pack that explains what the numbers actually mean rather than simply reporting them.",
        deliverable: "Monthly close pack, MIS dashboard and management commentary",
      },
      {
        name: "IFRS Consultancy",
        what: "Preparation and review of financial statements under IFRS and US GAAP, plus transaction-specific technical analysis that tells you how a proposed deal, instrument or restructuring will land in your accounts before you commit to it.",
        deliverable: "IFRS-compliant financial statements, or a signed technical position paper",
      },
    ],
  },
  {
    id: "valuation",
    name: "Valuation & Capital Advisory",
    short: "Valuation & Capital",
    color: "var(--color-amber-2)",
    blurb:
      "Models and ratings you can defend in front of an investor, a lender or an auditor, plus the deal work that sits around them.",
    services: [
      {
        name: "Financial Modelling & Valuation",
        what: "Company and asset valuations built on discounted cash flow, trading and transaction comparables and leveraged buyout analysis — delivered as a fully auditable model you can defend in front of an investor, a lender or an auditor.",
        deliverable: "Fully-linked Excel model with scenario toggles, plus a valuation report",
      },
      {
        name: "Credit Rating Analysis",
        what: "An indicative credit rating derived using Moody's published methodology, showing precisely where the business scores on each rated factor and what would have to change to move a notch — before a lender forms their own view.",
        deliverable: "Indicative rating with a factor-by-factor scorecard and improvement levers",
      },
      {
        name: "M&A Strategy",
        what: "Acquisition target screening against your stated criteria, buy-versus-build economics, commercial due diligence on the shortlist, and a post-merger integration plan that survives contact with the acquired business.",
        deliverable: "Screened longlist and scored shortlist, diligence findings pack, PMI roadmap",
      },
    ],
  },
  {
    id: "intelligence",
    name: "Market & Competitive Intelligence",
    short: "Market Intelligence",
    color: "var(--color-azure)",
    blurb:
      "A live, structured picture of your market and your competitors — refreshed on a cycle, not left to go stale in a deck.",
    services: [
      {
        name: "Profiling of Competitors",
        what: "Structured profiles of the companies you compete with — products, leadership, funding, acquisitions, business model and evident strategic direction — built to a consistent template and refreshed on a cycle so the picture never goes stale.",
        deliverable: "Standardised profile pack covering five to ten competitors, with a comparison matrix",
      },
      {
        name: "Industry Newsletters",
        what: "A weekly or monthly briefing on your sector: what moved, who raised, who acquired whom, and how the listed comparables re-rated — filtered down to what actually bears on your decisions.",
        deliverable: "Weekly or monthly briefing with a comparable company trading update",
      },
      {
        name: "Market Analysis",
        what: "Competitive analysis: where the profit pools sit, how the product portfolio should be optimised, and which KPIs matter — built into a live dashboard rather than left in a deck.",
        deliverable: "Market assessment, portfolio recommendations and a KPI dashboard",
      },
      {
        name: "Positioning Analysis",
        what: "Where you sit relative to competitors by industry and geography, what share you actually hold, and how much of the total addressable market you are currently participating in — with the gap between the two quantified.",
        deliverable: "Positioning map, market share analysis and TAM / SAM / SOM build-up",
      },
    ],
  },
  {
    id: "strategy",
    name: "Corporate Strategy & Talent",
    short: "Strategy & Talent",
    color: "var(--color-rust)",
    blurb:
      "The document that tells your board where the money goes, and the hiring process that gets the right people in the room to execute it.",
    services: [
      {
        name: "Growth Strategy",
        what: "Identification and sizing of the next growth vector — new markets, new products, new customer segments, pricing moves or geographic expansion — with the economics of each option laid out side by side rather than argued in prose.",
        deliverable: "Prioritised growth options with sizing, investment case and sequencing",
      },
      {
        name: "Corporate Strategy",
        what: "A five-year strategic roadmap covering portfolio strategy, business unit prioritisation and capital allocation — the document that tells your board where the money goes and why.",
        deliverable: "Board-ready five-year plan with portfolio review and capital allocation framework",
      },
      {
        name: "Market Entry Strategy",
        what: "An assessment of whether a new market is worth entering — attractiveness, competitor landscape, route to market, partnership and regulatory considerations — and, if it is, the plan to go and do it.",
        deliverable: "Market attractiveness assessment, entry-mode recommendation and go-to-market plan",
      },
      {
        name: "HR Consultancy",
        what: "End-to-end support on hiring: job descriptions that describe the actual role, sourcing and shortlisting against it, and screening that tests for capability rather than keywords.",
        deliverable: "Role specification, screened shortlist and a structured interview guide",
      },
    ],
  },
];

export const SERVICE_COUNT = PRACTICE_GROUPS.reduce((n, g) => n + g.services.length, 0);
