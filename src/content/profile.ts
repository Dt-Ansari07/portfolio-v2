/**
 * Single source of truth for identity/contact content.
 * Every claim here must be traceable to the resume — this file exists
 * specifically to close the "portfolio contradicts the resume" gap
 * flagged in the audit report (Section 2: CV vs Portfolio Comparison).
 */
export const profile = {
  name: "Zulfiqar Ansari",
  title: "MIS Executive | Junior Data Analyst",
  tagline:
    "I turn messy operational data into reports people actually trust — built in Excel and Python, shipped on a deadline.",
  location: "New Delhi, India",
  email: "zulfiqarhussain7777@gmail.com",
  phoneDisplay: "+91 88825 04013",
  links: {
    linkedin: "https://linkedin.com/in/zulfiqar-ansari",
    github: "https://github.com/Dt-Ansari07",
    resumePdf: "/resume/Zulfiqar_Ansari_Resume.pdf",
  },
  summary:
    "MIS Executive with hands-on experience in Excel, SQL, Python, and business reporting. Experienced in data cleaning, report preparation, dashboard support, and process automation. Interested in leveraging analytical and reporting skills to support business decision-making and operational efficiency.",
} as const;

/** Signature "KPI ledger" stats — real, resume-sourced numbers only. */
export const kpiStats = [
  { cell: "A1", label: "Service partners tracked", value: "200+", unit: "" },
  { cell: "B1", label: "Report prep time reduced", value: "30-40", unit: "%" },
  { cell: "C1", label: "Independent data projects", value: "3", unit: "" },
  { cell: "D1", label: "Professional certifications", value: "4", unit: "" },
] as const;
