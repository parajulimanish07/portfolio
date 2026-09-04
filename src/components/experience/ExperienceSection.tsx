"use client";

import React from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { experienceData } from "@/data/experience";

interface ExperienceSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function ExperienceSection({ onNavigate }: ExperienceSectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#e5dfd3]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1 font-medium">
            <span>05 // CAREER PROGRESSION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900">
            Experience &amp; Education Timeline
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-stone-500 mt-1 md:mt-0">
          Chronological track record &middot; Sydney &amp; International
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-5 sm:pl-8 border-l-2 border-[#e0d9cb] space-y-5 sm:space-y-6 my-2">
        {experienceData.map((item) => {
          const isEducation = item.type === "Education";
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[27px] sm:-left-[41px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border shadow-2xs transition-all duration-200 ${
                  item.isCurrent
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : isEducation
                    ? "bg-white border-indigo-300 text-indigo-600"
                    : "bg-white border-[#dcd4c5] text-stone-600"
                }`}
              >
                {isEducation ? (
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </div>

              {/* Experience Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e5dfd3] hover:border-[#cfc7b7] transition-all duration-200 shadow-xs">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-[#ede7db]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-indigo-600 transition-colors">
                        {item.role}
                      </h3>
                      {item.isCurrent && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-indigo-600 mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  {/* Meta dates and location */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-stone-700 my-2.5 leading-relaxed">
                  {item.summary}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-1.5 mb-3.5">
                  {item.responsibilities.map((resp, i) => (
                    <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#ede7db]">
                  <span className="text-[10px] font-mono text-stone-400 mr-1 uppercase">Stack:</span>
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4efe6] border border-[#e5dfd3] text-stone-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation helper */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-stone-500 gap-2">
        <span>Combining full-stack software development with postgraduate AI research</span>
        <button
          onClick={() => onNavigate("writing")}
          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Read technical articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
