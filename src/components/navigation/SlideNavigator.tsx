"use client";

import React, { useEffect, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { navigationSections } from "@/data/navigation";

interface SlideNavigatorProps {
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
}

export default function SlideNavigator({ activeSectionId, onNavigate }: SlideNavigatorProps) {
  const currentIndex = navigationSections.findIndex((s) => s.id === activeSectionId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const totalSections = navigationSections.length;

  const goToNext = useCallback(() => {
    if (safeIndex < totalSections - 1) {
      const nextSection = navigationSections[safeIndex + 1];
      onNavigate(nextSection.id);
    }
  }, [safeIndex, totalSections, onNavigate]);

  const goToPrev = useCallback(() => {
    if (safeIndex > 0) {
      const prevSection = navigationSections[safeIndex - 1];
      onNavigate(prevSection.id);
    }
  }, [safeIndex, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  const currentNumberStr = String(safeIndex + 1).padStart(2, "0");
  const totalNumberStr = String(totalSections).padStart(2, "0");
  const currentSection = navigationSections[safeIndex] || navigationSections[0];

  return (
    <>
      {/* Right Edge: Vertical Indicator Pills (Desktop) */}
      <nav
        aria-label="Section Navigation"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2.5 pointer-events-auto"
      >
        {navigationSections.map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className="group flex items-center gap-2.5 py-1 cursor-pointer focus:outline-none"
              title={`Go to ${section.label} (Slide ${section.number})`}
              aria-current={isActive ? "step" : undefined}
            >
              <span
                className={`text-[11px] font-mono uppercase tracking-wider transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                  isActive
                    ? "text-indigo-600 font-bold translate-x-0 opacity-100"
                    : "text-slate-400 group-hover:translate-x-0 translate-x-1"
                }`}
              >
                {section.label}
              </span>

              <div
                className={`transition-all duration-200 rounded-full ${
                  isActive
                    ? "w-6 h-2 bg-indigo-600 shadow-sm"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400 hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Floating Bottom-Right Controller */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-lg backdrop-blur-md pointer-events-auto">
        {/* Section Counter */}
        <div className="pl-3 pr-2 flex items-center font-mono text-xs">
          <span className="text-indigo-600 font-bold">{currentNumberStr}</span>
          <span className="text-slate-300 mx-1">/</span>
          <span className="text-slate-500">{totalNumberStr}</span>
          <span className="ml-2 hidden sm:inline text-[11px] uppercase tracking-wider text-slate-500 font-medium max-w-[75px] truncate">
            {currentSection.label}
          </span>
        </div>

        <div className="h-3.5 w-[1px] bg-slate-200" />

        {/* Previous Button */}
        <button
          onClick={goToPrev}
          disabled={safeIndex === 0}
          aria-label="Previous Slide (Arrow Up)"
          className={`p-1.5 rounded-full transition-all duration-150 cursor-pointer ${
            safeIndex === 0
              ? "opacity-25 cursor-not-allowed text-slate-400"
              : "text-slate-700 hover:text-indigo-600 hover:bg-slate-100 active:scale-95"
          }`}
          title="Previous section (Arrow Up / Page Up)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={safeIndex === totalSections - 1}
          aria-label="Next Slide (Arrow Down)"
          className={`p-1.5 rounded-full transition-all duration-150 cursor-pointer ${
            safeIndex === totalSections - 1
              ? "opacity-25 cursor-not-allowed text-slate-400"
              : "text-slate-700 hover:text-indigo-600 hover:bg-slate-100 active:scale-95"
          }`}
          title="Next section (Arrow Down / Page Down)"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
