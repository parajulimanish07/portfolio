import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "langgraph-ai-calorie-tracker",
    slug: "langgraph-ai-calorie-tracker",
    title: "LangGraph Multi-Agent Calorie & Nutrition Verifier",
    subtitle: "Eliminating nutritional hallucination using LangGraph state graphs, multi-agent verification, and vision models.",
    description:
      "Engineered an autonomous multi-agent nutrition verification pipeline replacing naive single-shot LLM vision guessing with cyclical validation graphs.",
    company: "Personal AI Lab",
    isPrivate: false,
    featured: true,
    outcome: "Eliminated blind LLM nutrition hallucinations through deterministic schema validation and multi-step verification graphs.",
    techStack: ["LangGraph", "Python", "LLMs", "FastAPI", "Docker", "Vision AI"],
    tags: ["LangGraph", "AI Agents", "LLMs", "Docker"],
    demoUrl: "https://medium.com/@parajuli.manish07/why-your-ai-calorie-tracker-is-lying-to-you-and-how-im-fixing-it-with-langgraph-a3675184642b",
    githubUrl: "https://github.com/parajulimanish07",
    architectureDiagram: {
      summary: "User meal image processed by vision agent -> routed through LangGraph state machine with cross-validation nodes -> nutritional ground-truth verification -> deterministic output schema.",
      nodes: [
        { label: "Meal Photo Input", type: "client" },
        { label: "Vision Extraction Agent", type: "service" },
        { label: "LangGraph State Graph", type: "service" },
        { label: "Nutritional USDA Store", type: "database" },
      ],
    },
    details: {
      overview:
        "Modern AI fitness apps routinely mislead users by asking a single LLM prompt to guess calories from meal photos, leading to wild 30-50% estimation swings. This project introduces a stateful multi-agent system built on LangGraph to verify portion sizes, component breakdowns, and nutritional accuracy.",
      problem:
        "Single-turn LLMs hallucinate nutritional values without cross-referencing ingredients, portion scales, or validated databases, rendering them dangerous for strict dietary management.",
      solution:
        "Engineered a LangGraph cyclical graph that partitions the problem into distinct agents: an Ingredient Segmenter, Portion Reasoner, and Database Cross-Verifier that rejects uncertain predictions until confidence thresholds are satisfied.",
      constraintsAndTradeoffs: [
        "Multi-agent cycles increase latency; optimized state transitions using parallel sub-graphs to keep verification response times under 2.5 seconds.",
        "Containerized with Docker for reproducible microservice deployment alongside FastAPI endpoints.",
      ],
      outcomesAndMetrics: [
        "Documented full architectural breakdown and methodology in a published Medium engineering article.",
        "Significantly improved macro consistency across varied lighting conditions and mixed cuisines.",
        "Adopted cyclical error recovery to self-correct obvious volume miscalculations.",
      ],
      lessonsLearned: [
        "Stateful graph machines (LangGraph) vastly outperform linear chains for non-deterministic AI tasks.",
        "Enforcing strict Pydantic output schemas between graph nodes prevents cascading hallucinations.",
      ],
    },
  },
  {
    id: "gesturelab-ai-air-canvas",
    slug: "gesturelab-ai-air-canvas",
    title: "GestureLab: Real-Time AI Air Canvas & Vision Arcade",
    subtitle: "Sub-millisecond computer vision platform turning standard laptop webcams into a responsive mid-air drawing workspace.",
    description:
      "Architected a real-time gesture tracking and vision arcade running locally with low CPU overhead and zero specialized sensors.",
    company: "Personal AI Lab",
    isPrivate: false,
    featured: true,
    outcome: "Achieved 60 FPS low-latency mid-air drawing and gesture interaction on standard hardware without external GPUs.",
    techStack: ["Python", "OpenCV", "MediaPipe", "React.js", "WebSockets", "Docker"],
    tags: ["Computer Vision", "Real-Time AI", "Python", "Interactive"],
    demoUrl: "https://medium.com/@parajuli.manish07/building-gesturelab-how-i-built-a-real-time-ai-air-canvas-vision-arcade-f1041420bfe8",
    githubUrl: "https://github.com/parajulimanish07",
    architectureDiagram: {
      summary: "Webcam video frames captured and normalized -> MediaPipe landmark extraction pipeline -> gesture state machine -> WebSocket streaming to React canvas overlay.",
      nodes: [
        { label: "Standard Laptop Webcam", type: "client" },
        { label: "MediaPipe Vision Engine", type: "service" },
        { label: "Gesture State Machine", type: "service" },
        { label: "React Canvas UI", type: "client" },
      ],
    },
    details: {
      overview:
        "GestureLab explores interactive spatial computing without expensive VR headsets or infrared depth cameras. Using standard RGB webcams, the system extracts hand landmarks and interprets fine-grained finger gestures to draw, erase, and interact with vision mini-games in mid-air.",
      problem:
        "Processing raw video frames in browser JavaScript often suffers from jitter, dropped frames, and imprecise gesture boundaries, creating frustrating lag for drawing applications.",
      solution:
        "Built an optimized Python backend pipeline using MediaPipe and OpenCV that calculates landmark velocities and palm heuristics in sub-milliseconds, communicating smooth vector coordinates to a React canvas via WebSockets.",
      constraintsAndTradeoffs: [
        "Lightweight algorithmic smoothing (Kalman filtering / exponential moving averages) was essential to eliminate jitter without adding perceptible lag.",
        "Dockerized the service to guarantee consistent OpenCV and MediaPipe runtime environments across macOS and Linux.",
      ],
      outcomesAndMetrics: [
        "Stable 60 FPS rendering on standard integrated laptop GPUs.",
        "Zero hardware dependency: works on any standard 720p or 1080p webcam.",
        "Published full implementation walk-through on Medium detailing coordinate normalization.",
      ],
      lessonsLearned: [
        "Mastered real-time coordinate transformation between normalized camera coordinates and responsive DOM elements.",
        "Designing intuitive spatial gestures requires prioritizing human hand ergonomics over mathematical simplicity.",
      ],
    },
  },
  {
    id: "ai-football-transfer-intelligence",
    slug: "ai-football-transfer-intelligence",
    title: "Football Transfer Intelligence (Grounded RAG)",
    subtitle: "Grounded RAG platform with source reliability scoring and entity resolution to filter transfer market rumor noise.",
    description:
      "Combined Next.js, Python, vector retrieval, and credibility algorithms to turn chaotic transfer speculation into verified intelligence.",
    company: "Personal AI Lab",
    isPrivate: false,
    featured: true,
    outcome: "Synthesized hundreds of conflicting transfer reports into verified, probability-weighted dossiers with zero hallucinated source attribution.",
    techStack: ["Next.js", "Python", "Grounded RAG", "Vector DB", "Docker", "TypeScript"],
    tags: ["RAG", "LLMs", "Next.js", "Python", "Docker"],
    demoUrl: "https://medium.com/@parajuli.manish07/building-an-ai-powered-football-transfer-intelligence-platform-e7415f1a74d2",
    githubUrl: "https://github.com/parajulimanish07",
    architectureDiagram: {
      summary: "Multi-source news scraper -> Entity Resolution & Tier-based Credibility Scorer -> Vector DB embedding -> Grounded RAG synthesis with strict citation enforcement.",
      nodes: [
        { label: "Sports Reporter Feeds", type: "external" },
        { label: "Entity Resolution Service", type: "service" },
        { label: "Vector Search Store", type: "database" },
        { label: "Next.js Intelligence UI", type: "client" },
      ],
    },
    details: {
      overview:
        "Football transfer windows generate immense media noise, contradictory claims, and clickbait speculation. This platform aggregates global sports journalism, resolves player and club entities, scores source reliability, and answers complex transfer queries using Grounded RAG.",
      problem:
        "Standard LLMs produce plausible-sounding transfer rumors that confuse unverified gossip with confirmed tier-one journalist scoops, hallucinating contracts and dates.",
      solution:
        "Designed a Grounded RAG architecture where LLM generation is strictly conditioned on retrieved, credibility-weighted documents. Every generated claim links directly to its timestamped source quote.",
      constraintsAndTradeoffs: [
        "Entity resolution challenges: resolving nicknames, spelling variations, and club names across multilingual sports reporting.",
        "Engineered automated tiering logic that penalizes repeat speculative clickbait while boosting confirmed tier-1 journalists.",
      ],
      outcomesAndMetrics: [
        "Zero hallucinated sources: all claims backed by verifiable citation chips.",
        "Over 90% accuracy in identifying the consensus status of high-profile global transfers.",
        "Published on Medium covering end-to-end RAG architecture and embedding strategies.",
      ],
      lessonsLearned: [
        "In domain-specific RAG, source credibility weighting is just as crucial as vector similarity ranking.",
        "Entity resolution must happen before vectorization to avoid query drift across player aliases.",
      ],
    },
  },
  {
    id: "sap-rex-integration",
    slug: "sap-rex-integration",
    title: "SAP REX Enterprise Integration",
    subtitle: "Automated real-time bidirectional data bridge connecting enterprise SAP ERP with modern internal services.",
    description:
      "Engineered an automated SAP REX data pipeline and sync service eliminating manual data entries between ERP and operations teams.",
    company: "NMI (Sydney)",
    isPrivate: true,
    featured: true,
    outcome: "Reduced manual data entry overhead and eliminated sync mismatches across enterprise inventory workflows.",
    techStack: ["NestJS", "TypeScript", "Docker", "SAP RFC / BAPI", "PostgreSQL", "Node.js"],
    tags: ["Enterprise Integration", "Backend", "SAP", "NestJS", "Docker"],
    architectureDiagram: {
      summary: "Event-driven NestJS synchronization service polling and consuming SAP RFC payloads, validating schemas with Zod, and updating relational datastores with zero data loss.",
      nodes: [
        { label: "Client / Ops Webhook", type: "client" },
        { label: "NestJS Bridge Service", type: "service" },
        { label: "SAP RFC Gateway", type: "external" },
        { label: "Relational Sync Store", type: "database" },
      ],
    },
    details: {
      overview:
        "At NMI, enterprise teams relied on manual sync operations between legacy SAP systems and current operational tools. This project replaced fragile manual checkpoints with a resilient, automated bridge built using NestJS, Docker, and TypeScript.",
      problem:
        "Manual data re-entry caused recurring discrepancies, inventory latency, and operational friction between warehouse management and downstream order processing.",
      solution:
        "Designed and shipped a NestJS middleware service that connects to SAP ERP endpoints, handles authentication, transforms payloads into strongly typed TypeScript DTOs, and safely coordinates updates with transaction-level rollbacks.",
      constraintsAndTradeoffs: [
        "Proprietary enterprise SAP schemas required careful defensive decoding without exposing private enterprise endpoints.",
        "High availability was essential; implemented automatic exponential backoff retries and dead-letter queuing to handle intermittent SAP maintenance windows.",
      ],
      outcomesAndMetrics: [
        "Replaced manual sync bottlenecks with a reliable automated background scheduler.",
        "Zero data corruption or lost transactions during continuous production operation.",
        "Built comprehensive health check metrics and error telemetry for rapid debugging.",
      ],
      lessonsLearned: [
        "Mastered enterprise RFC and BAPI payload translation patterns in Node/TypeScript.",
        "Reinforced the value of strict schema validation at the ingestion boundary before touching production databases.",
      ],
    },
  },
  {
    id: "shopify-storefront-modernization",
    slug: "shopify-storefront-modernization",
    title: "Shopify Storefront & Custom Apps",
    subtitle: "High-performance custom storefront features, conversion optimizations, and bug resolution for NMI.",
    description:
      "Maintained, optimized, and engineered custom checkout and storefront features for NMI's active e-commerce platforms.",
    company: "NMI (Sydney)",
    isPrivate: true,
    featured: false,
    outcome: "Resolved critical checkout friction points, boosted mobile responsiveness, and enhanced storefront load speed.",
    techStack: ["Shopify Liquid", "React.js", "JavaScript", "REST APIs", "Tailwind CSS"],
    tags: ["E-Commerce", "Frontend", "Shopify", "React"],
    architectureDiagram: {
      summary: "Shopify Storefront Liquid engine combined with reactive React mini-apps communicating via Shopify Storefront GraphQL & Cart APIs.",
      nodes: [
        { label: "Mobile / Desktop Shopper", type: "client" },
        { label: "Shopify CDN / Liquid Theme", type: "service" },
        { label: "React Interactive Components", type: "service" },
        { label: "Storefront GraphQL API", type: "external" },
      ],
    },
    details: {
      overview:
        "Maintained and enhanced NMI's customer-facing e-commerce storefront. Responsible for diagnosing critical checkout anomalies, optimizing UI component render speed, and engineering custom frontend feature extensions.",
      problem:
        "Legacy theme customizations had accumulated technical debt, resulting in layout shift on mobile devices, sporadic cart state de-synchronization, and sluggish product pages.",
      solution:
        "Refactored brittle JavaScript event listeners into clean, isolated React components. Streamlined the cart state lifecycle using the Shopify Storefront API and modern CSS practices.",
      constraintsAndTradeoffs: [
        "Had to work within an active, revenue-generating store without interrupting daily commercial customer traffic.",
        "Balanced native Liquid server rendering with progressive client-side React islands for interactive widgets.",
      ],
      outcomesAndMetrics: [
        "Eliminated cart state synchronization glitches across multiple browser tabs.",
        "Improved mobile Core Web Vitals score through asset optimization and script deferral.",
      ],
      lessonsLearned: [
        "Deepened practical expertise with Shopify Liquid themes, App Bridge, and cart life-cycles.",
      ],
    },
  },
  {
    id: "log-ui-monitoring-dashboard",
    slug: "log-ui-monitoring-dashboard",
    title: "Log UI & Real-Time Monitoring Dashboard",
    subtitle: "Developer-first telemetry visualizer and real-time log inspector for distributed microservices.",
    description:
      "Created an intuitive internal log viewing dashboard enabling engineers and support teams to inspect live service streams.",
    company: "NMI (Sydney)",
    isPrivate: true,
    featured: false,
    outcome: "Reduced internal incident triage time by giving support and engineering instant structured query visibility.",
    techStack: ["React.js", "Next.js", "NestJS", "Docker", "WebSockets", "TypeScript"],
    tags: ["DevTools", "Dashboard", "Real-Time", "Docker"],
    architectureDiagram: {
      summary: "Streaming log aggregation service pushing structured log events via WebSockets to a virtualized React dashboard.",
      nodes: [
        { label: "Engineering Ops User", type: "client" },
        { label: "Next.js Virtualized UI", type: "service" },
        { label: "NestJS Log Streamer", type: "service" },
        { label: "Central Structured Log Store", type: "database" },
      ],
    },
    details: {
      overview:
        "To empower cross-functional teams with direct visibility into service errors, this dedicated Log UI provides real-time log search, level filtering (ERROR, WARN, INFO), and instant stack trace inspection.",
      problem:
        "Non-backend team members and on-call engineers had to execute complex CLI scripts or query raw log files, slowing down bug diagnosis.",
      solution:
        "Built a responsive internal monitoring dashboard using React and NestJS, featuring virtualized list rendering to handle thousands of incoming logs per minute without browser stutter.",
      constraintsAndTradeoffs: [
        "High log ingestion volume required DOM virtualization to prevent memory leaks in the browser.",
        "Masked sensitive customer credentials, tokens, and PII before log rendering.",
      ],
      outcomesAndMetrics: [
        "Shortened average time-to-identify error root causes from 20+ minutes down to seconds.",
        "Adopted daily by both software engineers and operational support teams.",
      ],
      lessonsLearned: [
        "Hands-on optimization of windowing/virtualization techniques in React for high-frequency live data streams.",
      ],
    },
  },
  {
    id: "crm-dynamic-forms-frontend",
    slug: "crm-dynamic-forms-frontend",
    title: "CRM Dynamic Form Engine & Platform",
    subtitle: "Modular component architecture and dynamic JSON-schema form generator for enterprise CRM workflows.",
    description:
      "Architected reusable React UI components and configurable dynamic form templates for complex enterprise operations.",
    company: "Calcgen Nepal",
    isPrivate: true,
    featured: false,
    outcome: "Standardized UI consistency across 15+ internal CRM views and accelerated feature delivery by 40%.",
    techStack: ["React.js", "Redux Toolkit", "Next.js", "REST APIs", "TypeScript"],
    tags: ["CRM", "Design System", "State Management", "Frontend"],
    architectureDiagram: {
      summary: "Configurable JSON schema interpreter rendering validated form fields with Redux Toolkit state persistence.",
      nodes: [
        { label: "Internal CRM Operator", type: "client" },
        { label: "Dynamic Form Engine", type: "service" },
        { label: "Redux State Store", type: "service" },
        { label: "Enterprise REST Backend", type: "external" },
      ],
    },
    details: {
      overview:
        "At Calcgen Nepal, internal enterprise operations required numerous bespoke data-entry forms with intricate validation rules and cross-field conditional logic.",
      problem:
        "Hardcoding forms led to duplicate code, inconsistent error handling, and high development overhead for every new business workflow.",
      solution:
        "Engineered a dynamic JSON-schema form builder in React and Redux Toolkit that allowed developers to generate complete, validated forms purely from declarative configuration objects.",
      constraintsAndTradeoffs: [
        "Complex dependencies between input fields.",
        "Preserving field state during step-by-step multi-page wizard navigation.",
      ],
      outcomesAndMetrics: [
        "Reduced new form delivery time from several days to under 2 hours.",
        "Standardized validation UX and error messaging across the entire CRM suite.",
      ],
      lessonsLearned: [
        "Deep appreciation for resilient state normalization and declarative UI patterns in large-scale React codebases.",
      ],
    },
  },
];
