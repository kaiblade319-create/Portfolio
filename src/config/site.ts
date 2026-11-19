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
    current: "Data Analyst",
    path: "SQL & Python Analytics · Root-Cause Diagnostics · BI Storytelling",
    badge: "Data Analyst · Technical Coordinator",
    openTo: "Open to Data Analyst, BI & Product Analytics internships and entry-level roles",
  },

  tagline: "Turning raw data into clear decisions, early churn signals, and measurable growth.",

  bio: "Computer Science (Data Science) student & Technical Project Coordinator at Blink Beyond. Focused on SQL, Python analytics, dashboards, and root-cause business diagnostics.",

  /** ── Update these with your real URLs ── */
  links: {
    linkedin:  "https://www.linkedin.com/in/your-linkedin-handle",
    github:    "https://github.com/your-github-handle",
    twitter:   "",
    email:     "",
    resume:    "/resume",
    profile:   "/profile",
  },

  /** ── Core Proof Strip ── */
  stats: [
    { value: "1",        label: "End-to-End Analytics Case Study" },
    { value: "10",       label: "Downloadable CSV & XLSX Datasets" },
    { value: "23+",      label: "Data, BI & ML Tools Applied" },
    { value: "Palghar",  label: "Coordinator Lead · Blink Beyond" },
  ],

  /** ── SEO ── */
  seo: {
    title: "Kaushar Halani | Data Analyst Portfolio",
    description:
      "Portfolio of Kaushar Halani — Data Analyst & Technical Project Coordinator. SQL, Python analytics, predictive churn diagnostics, and decision-ready insights.",
    url: "/",
  },
} as const;
