export const profile = {
  name: "Suriya Prabha",
  role: "MCA Student",
  college: "Holy Cross College",
  period: "2025 – 2027",
  cgpa: "9.0",
  direction: "Web Development • Backend Development • UI Design • Technology & Research",
  email: "suriyaprabha30boopalan@gmail.com",
  github: "https://github.com/SuriyaPrabha-sunshine",
  githubHandle: "SuriyaPrabha-sunshine",
  linkedin: "https://www.linkedin.com/in/suriya-prabha-350b9b322",
};

export const rotatingWords = [
  "WEB DEVELOPMENT",
  "BACKEND DEVELOPMENT",
  "UI DESIGN",
  "PROGRAMMING",
  "RESEARCH",
  "LEARNING",
  "CREATING",
];

export const bootLines = [
  "> initializing portfolio...",
  "> loading education...",
  "> loading technical skills...",
  "> loading projects...",
  "> loading research...",
  "> loading experience...",
  "> loading achievements...",
  "> Suriya Prabha portfolio ready.",
];

export const values = [
  {
    key: "learn",
    title: "LEARN",
    text: "Always exploring new technologies and improving technical knowledge.",
  },
  { key: "build", title: "BUILD", text: "Turning concepts and learning into practical projects." },
  {
    key: "design",
    title: "DESIGN",
    text: "Interested in creating clean, useful, and engaging web experiences.",
  },
  {
    key: "research",
    title: "RESEARCH",
    text: "Interested in AI, emerging technologies, and research-driven ideas.",
  },
  {
    key: "contribute",
    title: "CONTRIBUTE",
    text: "Willing to contribute ideas, effort, teamwork, and technical skills.",
  },
] as const;

export const education = [
  {
    id: "sslc",
    year: "2020",
    title: "SSLC",
    place: "LNP Girls Higher Secondary School",
    score: "72.8%",
    metric: 72.8,
    metricLabel: "Percentage",
    current: false,
  },
  {
    id: "hsc",
    year: "2022",
    title: "HSC",
    place: "LNP Girls Higher Secondary School",
    score: "85.33%",
    metric: 85.33,
    metricLabel: "Percentage",
    current: false,
  },
  {
    id: "bca",
    year: "2022 – 2025",
    title: "Bachelor of Computer Applications (BCA)",
    place: "Holy Cross College",
    score: "CGPA: 8.30",
    metric: 8.3,
    metricLabel: "CGPA",
    current: false,
  },
  {
    id: "mca",
    year: "2025 – 2027",
    title: "Master of Computer Applications (MCA)",
    place: "Holy Cross College",
    score: "CGPA: 9.0",
    metric: 9.0,
    metricLabel: "CGPA",
    current: true,
  },
] as const;

export const skillGroups = [
  { title: "PROGRAMMING LANGUAGES", items: ["C", "Java", "JavaScript", "PHP"] },
  { title: "WEB TECHNOLOGIES", items: ["HTML", "CSS"] },
  { title: "DATABASE", items: ["SQL", "Database Management Systems (DBMS)"] },
  { title: "DATA ANALYTICS & VISUALIZATION", items: ["Power BI"] },
  { title: "TOOLS & PLATFORMS", items: ["Linux", "Visual Studio Code", "MS Office"] },
] as const;

export const skillNodes = [
  { name: "Java", category: "Programming Languages" },
  { name: "JavaScript", category: "Programming Languages" },
  { name: "PHP", category: "Programming Languages" },
  { name: "C", category: "Programming Languages" },
  { name: "HTML", category: "Web Technologies" },
  { name: "CSS", category: "Web Technologies" },
  { name: "SQL", category: "Database" },
  { name: "DBMS", category: "Database" },
  { name: "Power BI", category: "Data Analytics & Visualization" },
  { name: "Linux", category: "Tools & Platforms" },
  { name: "VS Code", category: "Tools & Platforms" },
  { name: "MS Office", category: "Tools & Platforms" },
] as const;

export const internships = [
  { date: "20 Sep 2023", org: "ESOFT Technologies", topic: "PHP and MySQL" },
  { date: "26 Feb 2024", org: "IAFC", topic: "Core Java" },
  { date: "14 Aug 2024", org: "HCCIICT", topic: "Full Stack Web Development" },
  { date: "20 Feb 2025", org: "T4TEQ", topic: "Data Visualization Using Power BI" },
  { date: "31 May 2025", org: "IAFC", topic: "Python Programming" },
  { date: "16 Sep 2025", org: "HCCIICT", topic: "Sensor Technology" },
  { date: "11 Feb 2026", org: "T4TEQ", topic: "Data Analytics" },
] as const;

export const workshops = [
  {
    date: "28 Feb 2023",
    title: "International Conference on Futuristic Trends in Computational Sciences (ICFTCS 2023)",
  },
  {
    date: "21 Mar 2024",
    title: "International Seminar on Futuristic Trends in Computational Sciences (HCC 2024)",
  },
  {
    date: "06 Mar 2025",
    title:
      "International Digital Innovation Summit: Environmental Technologies and In-Demand Computing Solutions",
  },
  {
    date: "30 Jul 2025",
    title: "International Seminar on Next-Gen AI: Innovation and Impacts Shaping the Future",
  },
] as const;

export const certifications = [
  { provider: "SWAYAM-NPTEL", title: "Database Management Systems", year: "2025" },
  {
    provider: "SWAYAM-NPTEL",
    title: "Enhancing Soft Skills and Personality Development",
    year: "2024",
  },
  { provider: "SWAYAM-NPTEL", title: "Soft Skills Development", year: "2022" },
] as const;

export const achievements = [
  {
    title: "Best Paper Award",
    detail:
      "International Conference on Next-Gen AI and Emerging Technologies for Sustainable Development",
    year: "2026",
  },
  { title: "Merit Certificate in Tamil Language", detail: "Holy Cross College", year: "2023" },
] as const;

export const research = {
  title: "AI in Digital Humanities: Explainable AI for Cultural Heritage and Education",
  nodes: ["AI", "Explainability", "Cultural Heritage", "Education", "Technology"],
};

export const processSteps = [
  { title: "UNDERSTAND", text: "Understand the requirement." },
  { title: "PLAN", text: "Think about the solution." },
  { title: "DESIGN", text: "Create the interface / structure." },
  { title: "BUILD", text: "Implement the solution." },
  { title: "TEST", text: "Check the result." },
  { title: "IMPROVE", text: "Learn and refine." },
  { title: "CONTRIBUTE", text: "Share ideas and contribute." },
] as const;

export const beyond = [
  { title: "Drawing", text: "Sketching ideas and visuals." },
  { title: "Music", text: "Listening as a way to reset and focus." },
  { title: "Movies", text: "Stories that spark new ideas." },
  { title: "Creative activities", text: "Small creative experiments outside the screen." },
] as const;

export const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "education", label: "EDUCATION" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "research", label: "RESEARCH" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "resume", label: "RESUME" },
  { id: "contact", label: "CONTACT" },
] as const;
