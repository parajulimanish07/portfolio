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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 pb-3 border-b border-[#e5dfd3]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1">
            <span>03 // CORE CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900">
            Technical Stack &amp; Specializations
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-stone-500 mt-1 md:mt-0">
          AI &middot; Full-Stack &middot; Docker &middot; Enterprise Integration
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-stone-900 text-white font-medium shadow-xs"
                  : "bg-white text-stone-600 border border-[#e5dfd3] hover:text-stone-900 hover:border-stone-400 shadow-2xs"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredCategories.map((catGroup) => (
          <div
            key={catGroup.title}
            className="p-4 sm:p-4.5 rounded-2xl bg-white border border-[#e5dfd3] hover:border-stone-300 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#f5f1e8] group-hover:bg-[#ebe5d8] transition-colors">
                    {categoryIcons[catGroup.title] || <Layers className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                    {catGroup.title}
                  </h3>
                </div>
                {catGroup.badge && (
                  <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200/60 font-medium">
                    {catGroup.badge}
                  </span>
                )}
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-1.5">
                {catGroup.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                      skill.highlight
                        ? "bg-indigo-50 text-indigo-900 border border-indigo-200/70 font-medium"
                        : "bg-[#f8f5ee] text-stone-700 border border-[#e5dfd3] hover:border-stone-300"
                    }`}
                  >
                    {skill.highlight ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    )}
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[9px] text-stone-400 ml-0.5 uppercase tracking-tighter">
                        ({skill.level})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom summary indicator */}
            <div className="pt-2.5 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>{catGroup.skills.length} core competencies</span>
              <span className="text-indigo-600 group-hover:text-indigo-700 transition-colors font-medium">
                Production Ready
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation helper */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-stone-500 gap-2">
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
