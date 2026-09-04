import { ExperienceItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    id: "nmi-fullstack",
    role: "Full-Stack Developer",
    company: "NMI",
    location: "Sydney, Australia",
    period: "Feb 2026 – Present",
    isCurrent: true,
    type: "Work",
    summary:
      "Joined as an intern (Feb–Apr 2026) and quickly stepped up to a casual full-stack engineering role. Driving enterprise integrations and key internal developer tooling.",
    responsibilities: [
      "Engineered an automated SAP REX enterprise integration connecting internal services with ERP databases.",
      "Maintained, enhanced, and resolved high-priority bugs on the live company Shopify storefront.",
      "Developed an internal Log UI and observability dashboard with React and NestJS for real-time error tracing.",
      "Collaborated closely with cross-functional teams to modernize internal workflows and API reliability.",
    ],
    stack: ["React.js", "NestJS", "TypeScript", "Shopify Liquid", "SAP RFC", "Node.js", "Tailwind CSS"],
  },
  {
    id: "macquarie-masters-ai",
    role: "Master of Information Technology (Artificial Intelligence)",
    company: "Macquarie University",
    location: "Sydney, Australia",
    period: "2025 – 2027 (Expected)",
    isCurrent: true,
    type: "Education",
    summary:
      "Advanced postgraduate studies specializing in Artificial Intelligence, machine learning foundations, intelligent systems, and computational data analysis.",
    responsibilities: [
      "Focusing on Machine Learning models, natural language processing, and deep neural network architectures.",
      "Applying software engineering best practices to data pipelines, model inference, and AI agent frameworks.",
      "Collaborating on cutting-edge research projects investigating AI-native software workflows.",
    ],
    stack: ["Python", "Machine Learning", "Data Structures & Algorithms", "Neural Networks", "Deep Learning"],
  },
  {
    id: "calcgen-frontend",
    role: "Frontend Developer",
    company: "Calcgen Nepal",
    location: "Kathmandu, Nepal",
    period: "Jun 2023 – Apr 2024",
    isCurrent: false,
    type: "Work",
    summary:
      "Engineered responsive and performant web applications using React.js, Redux, and Next.js for high-volume enterprise CRM systems.",
    responsibilities: [
      "Built and maintained core web application frontends with React.js, Redux Toolkit, and Next.js.",
      "Designed reusable design system components and configurable dynamic form templates for internal CRM systems.",
      "Integrated secure REST APIs, handled error boundaries, and optimized client-side state caching.",
      "Enhanced page render speed and user experience across diverse desktop and mobile browsers.",
    ],
    stack: ["React.js", "Redux", "Next.js", "JavaScript (ES6+)", "REST APIs", "CSS Modules"],
  },
];
