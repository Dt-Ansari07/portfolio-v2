export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  bullets: string[];
  stack: string[];
  repoUrl: string;
  featured?: boolean;
};

/**
 * Every project below is pulled directly from the resume (Section 10 of the
 * audit: "Project Review"). The two projects the old site invented --
 * "Sales Dashboard" and "Customer Churn Prediction" -- are intentionally
 * absent; they had no resume backing and both linked to dead anchors.
 *
 * NOTE: repoUrl values are placeholders pointing at the GitHub profile.
 * Replace each with the real per-project repository URL before deploying --
 * see README "Content checklist" for the exact fields to update.
 */
export const projects: Project[] = [
  {
    slug: "automobile-price-prediction",
    title: "Automobile Price Prediction & Predictive Modeling",
    category: "Python & Machine Learning -- Independent Project",
    summary:
      "Regression modeling to identify which vehicle attributes drive price, from raw dataset to evaluated model.",
    bullets: [
      "Analyzed automobile datasets containing multiple vehicle attributes to identify factors affecting vehicle prices.",
      "Performed data cleaning, feature preparation, and exploratory analysis using Python and Pandas.",
      "Built and evaluated regression models for price prediction.",
      "Created visualizations to communicate trends and model findings.",
    ],
    stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    repoUrl: "https://github.com/Dt-Ansari07",
    featured: true,
  },
  {
    slug: "netflix-distribution-analysis",
    title: "Netflix Distribution & Content Analysis Dashboard",
    category: "Exploratory Data Analysis -- Independent Project",
    summary:
      "Mined historical catalog data to surface regional and genre trends across Netflix's content library.",
    bullets: [
      "Mined historical catalog streaming data using Pandas to extract trends across regional classification, content distribution schedules, and genre evolution.",
      "Designed visual heatmaps and category matrices via Seaborn to surface localized media insights.",
    ],
    stack: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    repoUrl: "https://github.com/Dt-Ansari07",
    featured: true,
  },
  {
    slug: "swiggy-marketplace-analytics",
    title: "Swiggy Restaurant Marketplace Analytics",
    category: "Data Aggregation & Analysis -- Independent Project",
    summary:
      "Aggregated multi-region restaurant data to map pricing strategy against local consumption behavior.",
    bullets: [
      "Aggregated multi-region cuisine profiles to outline optimal localized pricing strategies and consumer consumption behavior trends.",
    ],
    stack: ["Python", "Pandas", "EDA"],
    repoUrl: "https://github.com/Dt-Ansari07",
  },
];
