import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { MediumIcon } from "@/components/icons/SocialIcons";
import { projectsData } from "@/data/projects";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Manish Parajuli",
    };
  }

  return {
    title: `${project.title} | Case Study by Manish Parajuli`,
    description: project.subtitle,
  };
}

export default async function ProjectCaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 selection:bg-indigo-100 selection:text-indigo-950">
      {/* Soft Ambient Background Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-amber-100/30 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[32rem] h-[32rem] bg-indigo-100/30 rounded-full blur-[130px]" />
      </div>

      {/* Top Header bar */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3 bg-[#faf7f2]/90 border-b border-[#e5dfd3] backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-indigo-600 hover:text-indigo-800 transition-colors group font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.isPrivate ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Enterprise Work</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AI Project &middot; Published</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-7 sm:space-y-9">
        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-medium">
            <span>CASE STUDY</span>
            <span>&middot;</span>
            <span>{project.company || "Personal AI Lab"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-stone-600 leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#f4efe6] border border-[#e5dfd3] text-stone-700 font-medium shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 shadow-xs flex items-start gap-3.5 sm:gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-bold">
              Measurable Outcome &amp; Impact
            </h2>
            <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Architecture Diagram Area */}
        {project.architectureDiagram && (
          <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#e5dfd3] space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#ede7db]">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base sm:text-lg font-bold text-stone-900">System Architecture &amp; Data Flow</h2>
              </div>
              <span className="text-xs font-mono text-stone-400">High-Level Topology</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {project.architectureDiagram.summary}
            </p>

            {/* Visual Node Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {project.architectureDiagram.nodes.map((node, index) => (
                <div
                  key={index}
                  className="relative p-4 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] flex flex-col justify-between group hover:border-[#cfc7b7] transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2 font-medium">
                    <span>Node 0{index + 1}</span>
                    <span className="uppercase text-indigo-600">{node.type}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-stone-900">
                    {node.label}
                  </p>
                  <div className="mt-3 h-1 w-full rounded-full bg-[#ede7db] overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deep Dive Grid: Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* The Problem */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-2.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-rose-600 text-xs font-mono font-medium">
              <AlertTriangle className="w-4 h-4" />
              <span>THE CHALLENGE</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900">The Problem</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {project.details.problem}
            </p>
          </div>

          {/* The Solution */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-2.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-mono font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>THE ENGINEERING SOLUTION</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900">Technical Resolution</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {project.details.solution}
            </p>
          </div>
        </div>

        {/* Constraints and Tradeoffs */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#e5dfd3] space-y-3.5 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <span>Key Engineering Constraints &amp; Trade-Offs</span>
          </h2>
          <ul className="space-y-2.5">
            {project.details.constraintsAndTradeoffs.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Results & Lessons Learned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Key Results */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-2.5 shadow-xs">
            <h2 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Outcomes &amp; Verification</span>
            </h2>
            <ul className="space-y-2">
              {project.details.outcomesAndMetrics.map((outcome, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-emerald-600 font-mono text-xs font-bold">&gt;</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons Learned */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-2.5 shadow-xs">
            <h2 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Lessons &amp; Insights</span>
            </h2>
            <ul className="space-y-2">
              {project.details.lessonsLearned.map((lesson, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-indigo-600 font-mono text-xs font-bold">&gt;</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Confidentiality Notice / Medium Publication link */}
        {project.isPrivate ? (
          <div className="p-4 rounded-xl bg-[#f4efe6] border border-[#e5dfd3] text-xs font-mono text-stone-600 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Confidentiality Notice:</strong> In compliance with agreements with NMI, proprietary
              credentials and private SAP connection endpoints are omitted or generalized.
            </p>
          </div>
        ) : project.demoUrl ? (
          <div className="p-4 rounded-xl bg-white border border-[#e5dfd3] text-xs font-mono text-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <MediumIcon className="w-4 h-4 text-stone-900 shrink-0" />
              <span>Full implementation article published on Medium with diagrams and code walk-throughs.</span>
            </div>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-900 hover:text-indigo-600 px-3 py-1.5 rounded-lg bg-[#f4efe6] hover:bg-[#eae3d5] border border-[#e5dfd3] shrink-0 transition-colors font-semibold"
            >
              <span>Read on Medium</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ) : null}

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-[#e5dfd3] flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#e5dfd3] text-stone-700 hover:text-stone-900 text-xs font-mono transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio Grid</span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs font-mono shadow-xs transition-all"
          >
            <span>Discuss this project with Manish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
