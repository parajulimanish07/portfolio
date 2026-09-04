"use client";

import React, { useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { LinkedInIcon, GitHubIcon, MediumIcon } from "@/components/icons/SocialIcons";
import { profileData } from "@/data/profile";
import { navigationSections } from "@/data/navigation";

interface HeaderNavProps {
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
}

export default function HeaderNav({ activeSectionId, onNavigate }: HeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/90 shadow-sm">
        {/* Brand / Logo */}
        <button
          onClick={() => handleLinkClick("hero")}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-900 to-indigo-700 flex items-center justify-center text-white font-bold font-mono text-sm shadow-sm group-hover:scale-105 transition-transform">
            MP
          </div>
          <div className="text-left">
            <span className="font-semibold text-sm tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              Manish Parajuli
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="block text-[10px] font-mono text-slate-500">
              Full-Stack &middot; AI Builder
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationSections.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => handleLinkClick(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50 font-semibold border border-indigo-200/70"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <span className="opacity-40 mr-1">{sec.number}</span>
                {sec.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Socials & Resume CTA */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={profileData.socialLinks.medium}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium Articles"
            title="Medium Articles"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <MediumIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
          <a
            href="/resume.pdf"
            download="Manish_Parajuli_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-800 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-white border border-slate-200 shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navigationSections.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => handleLinkClick(sec.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-mono text-left transition-all ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50 font-semibold border border-indigo-200"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{sec.label}</span>
                <span className="text-xs text-slate-400">{sec.number}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
              <a
                href={profileData.socialLinks.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-slate-900"
                aria-label="Medium"
              >
                <MediumIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-slate-900"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-indigo-600"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="/resume.pdf"
              download="Manish_Parajuli_Resume.pdf"
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 font-medium"
            >
              Resume PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
