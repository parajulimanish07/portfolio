"use client";

import React, { useState } from "react";
import {
  Code,
  Layout,
  Server,
  Wrench,
  BrainCircuit,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { skillsData } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  "AI & Intelligent Systems": <BrainCircuit className="w-4 h-4 text-indigo-600" />,
  Languages: <Code className="w-4 h-4 text-blue-600" />,
  "Backend & Systems": <Server className="w-4 h-4 text-emerald-600" />,
  "Frontend Engineering": <Layout className="w-4 h-4 text-sky-600" />,
  "Tools & Enterprise Integrations": <Wrench className="w-4 h-4 text-amber-600" />,
};

interface SkillsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function SkillsSection({ onNavigate }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skillsData.map((c) => c.title)];

  const filteredCategories =
    selectedCategory === "All"
      ? skillsData
      : skillsData.filter((c) => c.title === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1">
            <span>03 // CORE CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Technical Stack &amp; Specializations
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-slate-500 mt-1 md:mt-0">
          AI &middot; Full-Stack &middot; Docker &middot; Enterprise Integration
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-5 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white font-medium shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-2xs"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredCategories.map((catGroup) => (
          <div
            key={catGroup.title}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200/70 transition-colors">
                    {categoryIcons[catGroup.title] || <Layers className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {catGroup.title}
                  </h3>
                </div>
                {catGroup.badge && (
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60 font-medium">
                    {catGroup.badge}
                  </span>
                )}
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {catGroup.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                      skill.highlight
                        ? "bg-indigo-50/80 text-indigo-900 border border-indigo-200/80 font-medium"
                        : "bg-slate-50 text-slate-700 border border-slate-200/70 hover:border-slate-300"
                    }`}
                  >
                    {skill.highlight ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    )}
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[9px] text-slate-400 ml-0.5 uppercase tracking-tighter">
                        ({skill.level})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom summary indicator */}
            <div className="pt-3 mt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>{catGroup.skills.length} core competencies</span>
              <span className="text-indigo-600 group-hover:text-indigo-700 transition-colors font-medium">
                Production Ready
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation helper */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-500 gap-2">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Extending full-stack architecture with LangGraph agents and Grounded RAG</span>
        </span>
        <button
          onClick={() => onNavigate("projects")}
          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>View applied projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
