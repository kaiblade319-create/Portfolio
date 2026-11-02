/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL CONTENT CONFIG
 *  Edit this one file to update your name, role, links, and
 *  key stats everywhere on the portfolio at once.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Kaushar Halani",
  initials: "KH",

  role: {
    current: "High-Agency Problem Solver & Builder",
    path: "Root-Cause Diagnostics · Rapid Adaptation · Systems Automation",
    badge: "High-Agency Problem Solver · Systems Builder",
    openTo: "Open to high-impact internships, entry-level roles, and technical generalist challenges",
  },

  tagline: "Solving Bottlenecks From the Root. Engineering Systems That Protect & Grow Business Value.",

  bio: "Adaptable builder combining business-first diagnostics with engineering execution. I solve root bottlenecks, master modern stacks rapidly, and build automated systems that eliminate losses and protect margins.",

  /** ── Update these with your real URLs ── */
  links: {
    linkedin:  "https://www.linkedin.com/in/your-linkedin-handle",
    github:    "https://github.com/your-github-handle",
    twitter:   "",
    email:     "",
    resume:    "/resume",
    profile:   "/profile",
  },

  /** ── Core Impact Pillars ── */
  stats: [
    { value: "Root-Cause",   label: "Deep Diagnostics & Friction Removal" },
    { value: "High-Agency",  label: "Fearless & Rapid Stack Mastery" },
    { value: "Automated",    label: "Operational & Workflow Precision" },
    { value: "Value-First",  label: "Measurable ROI & Client Impact" },
  ],

  /** ── SEO ── */
  seo: {
    title: "Kaushar Halani — High-Agency Problem Solver & Builder",
    description:
      "Portfolio of Kaushar Halani. Diagnosing root causes, mastering modern stacks with fearless adaptability, and building automated systems that protect and grow business value.",
    url: "https://kausharhalani.replit.app/",
  },
} as const;
