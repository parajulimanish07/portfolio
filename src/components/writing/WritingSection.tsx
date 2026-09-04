"use client";

import React from "react";
import { ExternalLink, Clock, ArrowRight } from "lucide-react";
import { MediumIcon } from "@/components/icons/SocialIcons";
import { writingData } from "@/data/writing";
import { profileData } from "@/data/profile";

interface WritingSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function WritingSection({ onNavigate }: WritingSectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1">
            <span>06 // THOUGHT LEADERSHIP &amp; NOTES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Engineering Insights &amp; Writing
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 mt-2 md:mt-0">
          <p className="text-xs sm:text-sm font-mono text-slate-500">
            Dispatches from enterprise integration &amp; AI research
          </p>
          <a
            href={profileData.socialLinks.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-800 hover:text-indigo-600 hover:border-slate-300 shadow-2xs transition-all"
          >
            <MediumIcon className="w-3.5 h-3.5" />
            <span>medium/@parajuli.manish07</span>
          </a>
        </div>
      </div>

      {/* Writing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {writingData.map((article) => (
          <div
            key={article.id}
            className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group shadow-xs"
          >
            <div>
              {/* Meta header */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3 pb-2 border-b border-slate-100">
                <span className="flex items-center gap-1 text-slate-600">
                  <MediumIcon className="w-3 h-3 text-slate-900" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1 text-indigo-600 font-medium">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 text-slate-600 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom link to Medium */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={article.url || profileData.socialLinks.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 hover:text-indigo-800 font-semibold group/link"
              >
                <span>Read on Medium</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-[11px] font-mono text-slate-400">
                By Manish Parajuli
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation helper */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-500 gap-2">
        <span>Regularly publishing practical deep-dives on LangGraph, Computer Vision, and RAG</span>
        <button
          onClick={() => onNavigate("contact")}
          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Get in touch directly</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
