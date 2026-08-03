export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "GoMechanic",
    role: "MIS Executive",
    period: "Aug 2025 -- Present",
    location: "Gurugram, India",
    highlights: [
      "Maintained and monitored user access records for 200+ service partners and internal users, helping ensure accurate system access and operational continuity across locations.",
      "Supported workshop mapping and service buddy allocation activities using internal data, contributing to improved assignment tracking and operational visibility.",
      "Automated recurring MIS reports using Excel and Python (Pandas, NumPy), reducing manual report preparation time by approximately 30-40%.",
      "Prepared daily and monthly collections and receivables reports, improving reporting accuracy and enabling timely performance tracking.",
      "Assisted in generating business reports and performance summaries used by operations teams for monitoring workshop performance.",
      "Coordinated with multiple departments to resolve data discrepancies and ensure timely report delivery.",
    ],
  },
];

export type EducationEntry = {
  institution: string;
  credential: string;
  period: string;
  location: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    institution: "University of Delhi (School of Open Learning)",
    credential: "Bachelor of Commerce (B.Com)",
    period: "2022 -- 2025",
    location: "New Delhi, India",
  },
  {
    institution: "Madrid Software",
    credential: "Data Science Certification",
    period: "2024 -- 2025",
    location: "New Delhi, India",
    detail:
      "Advanced Excel, Python, SQL, Exploratory Data Analysis (EDA), Data Visualization using Tableau, Machine Learning Fundamentals, and real-world data analytics capstone projects.",
  },
];

export const certifications = [
  "Data Analysis with Python -- IBM",
  "Machine Learning with Python -- IBM",
  "SQL & Databases -- IBM",
  "Data Science Certification -- Madrid Software",
] as const;
