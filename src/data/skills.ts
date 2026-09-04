import { SkillCategory } from "@/types";

export const skillsData: SkillCategory[] = [
  {
    title: "AI & Intelligent Systems",
    badge: "Specialization",
    skills: [
      { name: "LangGraph", highlight: true, level: "State Machines" },
      { name: "Grounded RAG", highlight: true, level: "Production" },
      { name: "LLMs & Agentic Systems", highlight: true, level: "Advanced" },
      { name: "Computer Vision & MediaPipe", highlight: true, level: "Real-Time AI" },
      { name: "Vector Databases & Embeddings", highlight: false, level: "Intermediate" },
      { name: "Entity Resolution & Scoring", highlight: false, level: "Applied ML" },
    ],
  },
  {
    title: "Languages",
    badge: "Core Foundations",
    skills: [
      { name: "TypeScript", highlight: true, level: "Production" },
      { name: "Python", highlight: true, level: "AI & Backend" },
      { name: "JavaScript (ES6+)", highlight: true, level: "Production" },
      { name: "SQL (PostgreSQL, MySQL)", highlight: false, level: "Production" },
      { name: "HTML5 & Semantic Web", highlight: false, level: "Advanced" },
      { name: "Modern CSS & PostCSS", highlight: false, level: "Advanced" },
    ],
  },
  {
    title: "Backend & Systems",
    badge: "APIs & Containers",
    skills: [
      { name: "NestJS", highlight: true, level: "Production" },
      { name: "Node.js", highlight: true, level: "Production" },
      { name: "Docker & Containerization", highlight: true, level: "Containers" },
      { name: "RESTful API Architecture", highlight: true, level: "Production" },
      { name: "FastAPI", highlight: false, level: "AI Microservices" },
      { name: "WebSockets & Streaming", highlight: false, level: "Real-Time" },
    ],
  },
  {
    title: "Frontend Engineering",
    badge: "UI Architecture",
    skills: [
      { name: "React.js", highlight: true, level: "Production" },
      { name: "Next.js (App Router)", highlight: true, level: "Production" },
      { name: "Tailwind CSS", highlight: true, level: "Production" },
      { name: "Redux Toolkit", highlight: false, level: "Production" },
      { name: "Design Systems", highlight: false, level: "Production" },
      { name: "Mobile-First UX", highlight: false, level: "Advanced" },
    ],
  },
  {
    title: "Tools & Enterprise Integrations",
    badge: "Infrastructure",
    skills: [
      { name: "SAP RFC / BAPI Integration", highlight: true, level: "Enterprise" },
      { name: "Shopify Storefront & Liquid", highlight: true, level: "Production" },
      { name: "Git & GitHub Workflows", highlight: false, level: "Daily" },
      { name: "ServiceNow & Active Directory", highlight: false, level: "Enterprise" },
      { name: "Vercel & Cloud Deployments", highlight: false, level: "Production" },
    ],
  },
];
