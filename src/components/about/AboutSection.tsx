"use client";

import React from "react";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Trophy,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";
import { profileData } from "@/data/profile";

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 flex flex-col justify-center">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1">
            <span>02 // ARCHITECTURE &amp; BACKGROUND</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            About Manish
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-slate-500 mt-1 md:mt-0">
          Full-Stack Engineer &middot; AI Builder &middot; Sydney, Australia
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Photo Frame & Stats */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 shadow-sm group">
            <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-100">
              <Image
                src="/images/manish.jpg"
                alt="Manish Parajuli - Sydney, NSW"
                fill
                className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-900">Manish Parajuli</p>
                  <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-indigo-600" />
                    Sydney, NSW
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-700 font-medium px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    Active @ NMI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {profileData.stats.map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs"
              >
                <span className="block text-xl font-bold font-mono text-slate-900">
                  {stat.value}
                </span>
                <span className="block text-xs text-slate-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
          {/* Main Story Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-3.5 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Full-Stack Engineering &amp; AI Systems</span>
            </h3>

            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {profileData.aboutDetailed}
            </p>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              My engineering approach connects <strong>production software rigor</strong> with modern AI agentic
              patterns. Whether architecting stateful verification graphs with <strong>LangGraph</strong> to eliminate
              hallucinations in nutrition apps, engineering Grounded RAG pipelines, or deploying Dockerized NestJS
              services, I focus on clean code and measurable impact.
            </p>

            {/* Current Dual Focus Callout */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-slate-900">Dual Focus: </span>
                <span className="text-slate-700">
                  Engineering production systems at NMI (React, NestJS, Docker, SAP) while researching AI models
                  at Macquarie University and publishing on Medium.
                </span>
              </div>
            </div>
          </div>

          {/* Academic & Personal Balance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Academic Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-mono mb-1.5 font-medium">
                  <GraduationCap className="w-4 h-4" />
                  <span>MACQUARIE UNIVERSITY</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                  Master of IT (Artificial Intelligence)
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  2025 – 2027. Machine learning models, stateful agent architectures, computational intelligence,
                  and deep learning foundations.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>In Progress</span>
                <span className="text-indigo-600 font-medium">Sydney, Australia</span>
              </div>
            </div>

            {/* Futsal & Beyond Coding Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-1.5 text-amber-600 text-xs font-mono mb-1.5 font-medium">
                  <Trophy className="w-4 h-4" />
                  <span>LEADERSHIP &amp; SPORT</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                  Futsal Captain &amp; Tech Writer
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {profileData.personalTouch.content}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Team Leadership</span>
                <span className="text-amber-700 font-medium">Medium Writer</span>
              </div>
            </div>
          </div>

          {/* Bottom Nav Links */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => onNavigate("skills")}
              className="text-xs font-mono text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 group cursor-pointer font-medium"
            >
              <span>Explore full technical toolset</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("writing")}
              className="text-xs font-mono text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Read Medium publications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
