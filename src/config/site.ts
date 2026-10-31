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
    current: "Computer Science & Engineering Student",
    path: "Technology, Machine Learning & Software Development",
    badge: "Open to Internships & Entry-Level Opportunities",
    openTo: "Open to internships, entry-level, and technical roles",
  },

  tagline: "Building Practical Technology, Machine Learning & Software Solutions",

  bio: "I transform complex problems and raw datasets into structured solutions, actionable insights, and reproducible workflows across modern software and data stacks.",

  /** ── Update these with your real URLs ── */
  links: {
    linkedin:  "https://www.linkedin.com/in/your-linkedin-handle",
    github:    "https://github.com/your-github-handle",
    twitter:   "",
    email:     "",
    resume:    "/resume",
    profile:   "/profile",
  },

  /** ── Hero stats — replace with real numbers when ready ── */
  stats: [
    { value: "20+",  label: "Projects" },
    { value: "10+",  label: "Technologies" },
    { value: "5+",   label: "Dashboards" },
    { value: "100%", label: "Dedication" },
  ],

  /** ── SEO ── */
  seo: {
    title: "Kaushar Halani — Portfolio",
    description:
      "Personal portfolio of Kaushar Halani showcasing machine learning, software engineering, and analytical projects.",
    url: "https://kausharhalani.replit.app/",
  },
} as const;
