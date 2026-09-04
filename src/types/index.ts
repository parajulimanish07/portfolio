export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  company?: string;
  isPrivate: boolean;
  outcome: string;
  techStack: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  starCount?: number;
  featured: boolean;
  architectureDiagram?: {
    nodes: { label: string; type: "client" | "service" | "database" | "external" }[];
    summary: string;
  };
  details: {
    overview: string;
    problem: string;
    solution: string;
    constraintsAndTradeoffs: string[];
    outcomesAndMetrics: string[];
    lessonsLearned: string[];
  };
}

export interface SkillCategory {
  title: string;
  badge?: string;
  skills: {
    name: string;
    highlight?: boolean;
    level?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  type: "Work" | "Education";
  summary: string;
  responsibilities: string[];
  stack: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url?: string;
  isComingSoon?: boolean;
}

export interface NavigationSection {
  id: string;
  label: string;
  number: string;
  hash: string;
}
