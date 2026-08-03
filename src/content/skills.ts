export type SkillGroup = {
  group: string;
  cellPrefix: string;
  items: string[];
};

/**
 * All 12 resume skills are represented (audit Section 2 flagged 7 of 12
 * as missing from the old site). Grouped the way the resume groups them.
 */
export const skillGroups: SkillGroup[] = [
  {
    group: "Reporting & MIS",
    cellPrefix: "A",
    items: ["Advanced Excel", "Google Sheets", "KPI Dashboards"],
  },
  {
    group: "Data Analysis & Scripting",
    cellPrefix: "B",
    items: ["Python (Pandas, NumPy)", "MySQL", "Exploratory Data Analysis (EDA)"],
  },
  {
    group: "Data Visualization",
    cellPrefix: "C",
    items: ["Matplotlib", "Seaborn", "Tableau"],
  },
  {
    group: "Tools & Systems",
    cellPrefix: "D",
    items: ["Jupyter Notebook", "GitHub", "Microsoft Office"],
  },
];
