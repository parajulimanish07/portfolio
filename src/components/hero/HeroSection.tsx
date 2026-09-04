"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Mail,
  Terminal,
  MapPin,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons/SocialIcons";
import { profileData } from "@/data/profile";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const roles = profileData.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        }, 35);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, roles]);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Roles & Pitch */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs text-xs font-mono text-slate-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Full-Stack Engineer &middot; NMI Sydney &middot; AI/ML Track</span>
          </div>

          {/* Main Title & Typewriter */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Manish Parajuli
              </span>
            </h1>

            {/* Typewriter role cycling */}
            <div className="h-9 sm:h-11 flex items-center text-lg sm:text-2xl font-mono text-slate-700">
              <span className="text-indigo-600 font-bold mr-2">&gt;</span>
              <span>{displayedText}</span>
              <span className="inline-block w-2 h-5 sm:h-6 bg-indigo-600 ml-1 animate-pulse" />
            </div>
          </div>

          {/* Intro summary */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed">
            {profileData.bioIntro}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={() => onNavigate("projects")}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-slate-900/10 active:scale-95 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="/resume.pdf"
              download="Manish_Parajuli_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-95"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Resume PDF</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs transition-all shadow-xs cursor-pointer"
              title="Copy email address"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-mono text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-xs">{profileData.contact.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-1.5">
              <a
                href={profileData.socialLinks.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all"
                aria-label="Medium Articles"
                title="Medium Articles"
              >
                <MediumIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-slate-300 shadow-2xs transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.socialLinks.email}`}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-slate-300 shadow-2xs transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sydney, Australia</span>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Console & Profile Photo Preview */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Refined Developer Console */}
          <div className="rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl overflow-hidden">
            {/* Console Header Bar */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>manish@sydney-ai-node: ~</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/80">
                zsh
              </div>
            </div>

            {/* Console Body */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] space-y-2.5 leading-relaxed bg-slate-900/95">
              <div>
                <span className="text-indigo-400 font-semibold">$ </span>
                <span className="text-white">whoami</span>
                <p className="text-emerald-400 pl-4 mt-0.5">&gt; full-stack developer @ NMI (Sydney)</p>
              </div>
              <div>
                <span className="text-indigo-400 font-semibold">$ </span>
                <span className="text-white">core.stack</span>
                <p className="text-slate-300 pl-4 mt-0.5">&gt; React.js &middot; Next.js &middot; NestJS &middot; TypeScript &middot; Docker</p>
              </div>
              <div>
                <span className="text-indigo-400 font-semibold">$ </span>
                <span className="text-white">ai.engineering</span>
                <p className="text-sky-300 pl-4 mt-0.5">&gt; RAG &middot; LLMs &middot; LangGraph &middot; Agentic Workflows</p>
              </div>
              <div>
                <span className="text-indigo-400 font-semibold">$ </span>
                <span className="text-white">academic.track</span>
                <p className="text-indigo-300 pl-4 mt-0.5">&gt; Master of IT (Artificial Intelligence) @ Macquarie Univ</p>
              </div>
              <div>
                <span className="text-indigo-400 font-semibold">$ </span>
                <span className="text-white">status</span>
                <p className="text-sky-300 pl-4 mt-0.5 flex items-center gap-1.5">
                  &gt; shipping production features with clean code &amp; AI agents
                  <span className="inline-block w-1.5 h-3 bg-sky-400 animate-pulse" />
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card Preview */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-xs">
              <Image
                src="/images/manish.jpg"
                alt="Manish Parajuli - Sydney, NSW"
                fill
                className="object-cover object-center"
                sizes="56px"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">Manish Parajuli</p>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Full-Stack &amp; AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                NMI &middot; Macquarie AI &middot; Sydney, NSW
              </p>
              <button
                onClick={() => onNavigate("writing")}
                className="text-[11px] font-mono text-indigo-600 hover:text-indigo-800 mt-1 inline-flex items-center gap-1 group cursor-pointer"
              >
                <span>Read Medium articles on LangGraph &amp; RAG</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
