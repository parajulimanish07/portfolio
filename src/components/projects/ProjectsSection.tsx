"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  ShoppingBag,
  Database,
  Cpu,
  Bot,
  Eye,
} from "lucide-react";
import { MediumIcon } from "@/components/icons/SocialIcons";
import { projectsData } from "@/data/projects";

const projectIcons: Record<string, React.ReactNode> = {
  "langgraph-ai-calorie-tracker": <Bot className="w-4 h-4 text-indigo-600" />,
  "gesturelab-ai-air-canvas": <Eye className="w-4 h-4 text-blue-600" />,
  "ai-football-transfer-intelligence": <Sparkles className="w-4 h-4 text-emerald-600" />,
  "sap-rex-integration": <Database className="w-4 h-4 text-slate-700" />,
  "shopify-storefront-modernization": <ShoppingBag className="w-4 h-4 text-amber-600" />,
  "log-ui-monitoring-dashboard": <Activity className="w-4 h-4 text-indigo-600" />,
  "crm-dynamic-forms-frontend": <Cpu className="w-4 h-4 text-purple-600" />,
};

interface ProjectsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "AI & Personal", "NMI (Sydney)", "Calcgen Nepal"];

  const filteredProjects =
    selectedFilter === "All"
      ? projectsData
      : selectedFilter === "AI & Personal"
      ? projectsData.filter((p) => p.company?.includes("Personal AI"))
      : projectsData.filter((p) => (p.company ? p.company.includes(selectedFilter.split(" ")[0]) : true));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#e5dfd3]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1 font-medium">
            <span>04 // PRODUCTION &amp; AI LABS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900">
            Featured Projects &amp; AI Research
          </h2>
        </div>
        <div className="flex items-center gap-1.5 mt-3 md:mt-0 overflow-x-auto pb-1 no-scrollbar">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === opt
                  ? "bg-stone-900 text-white font-medium shadow-xs"
                  : "bg-white text-stone-600 border border-[#e5dfd3] hover:text-stone-900 hover:border-stone-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl bg-white border border-[#e5dfd3] hover:border-[#cfc7b7] p-4 sm:p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group"
          >
            <div>
              {/* Card Top: Banner */}
              <div className="relative h-32 sm:h-36 w-full rounded-xl bg-[#f8f5ee] border border-[#e7e2d6] p-3 mb-3 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#a8a29e 1px, transparent 1px)`,
                    backgroundSize: "14px 14px",
                  }}
                />

                {/* Top badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white border border-[#e5dfd3] shadow-2xs">
                      {projectIcons[project.id] || <Layers className="w-4 h-4 text-stone-700" />}
                    </div>
                    {project.company && (
                      <span className="text-[11px] font-mono text-stone-700 bg-white/95 px-2 py-0.5 rounded border border-[#e5dfd3] shadow-2xs font-medium">
                        {project.company}
                      </span>
                    )}
                  </div>

                  {project.isPrivate ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-medium">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Enterprise</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-medium">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>AI Project</span>
                    </div>
                  )}
                </div>

                {/* Architecture mini-nodes */}
                {project.architectureDiagram && (
                  <div className="relative z-10 hidden sm:flex items-center justify-between gap-1 px-2 py-1 rounded bg-white/95 border border-[#e5dfd3] font-mono text-[9px] text-stone-600 shadow-2xs">
                    <span className="text-indigo-600 font-medium truncate">
                      {project.architectureDiagram.nodes[0]?.label}
                    </span>
                    <span className="text-stone-400">&rarr;</span>
                    <span className="text-emerald-700 font-medium truncate">
                      {project.architectureDiagram.nodes[1]?.label}
                    </span>
                    <span className="text-stone-400">&rarr;</span>
                    <span className="text-stone-700 truncate">
                      {project.architectureDiagram.nodes[2]?.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Title and subtitle */}
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {project.subtitle}
                </p>
              </div>

              {/* Impact / Outcome */}
              <div className="mt-2.5 p-2.5 rounded-lg bg-[#fbf9f5] border border-[#e7e2d6] text-[11px] text-stone-700 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="leading-tight line-clamp-2">
                  <strong className="text-stone-900">Outcome:</strong> {project.outcome}
                </span>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1 mt-2.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4efe6] text-stone-700 border border-[#e5dfd3] font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#fbf9f5] text-stone-500 border border-[#e5dfd3]">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-3.5 pt-2.5 border-t border-[#ede7db] flex items-center justify-between">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-600 hover:text-stone-900 transition-colors font-medium"
                >
                  <MediumIcon className="w-3 h-3 text-stone-900" />
                  <span>Medium Article</span>
                </a>
              ) : (
                <span className="text-[10px] font-mono text-stone-400">
                  {project.isPrivate ? "Proprietary Code" : "Public Repo"}
                </span>
              )}

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-indigo-600 hover:text-indigo-800 font-semibold group/link"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link to Experience */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-stone-500 gap-2">
        <span>Combining enterprise engineering rigor with cutting-edge AI experimentation</span>
        <button
          onClick={() => onNavigate("experience")}
          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>View professional timeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
