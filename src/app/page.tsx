"use client";

import React, { useState, useEffect, useRef } from "react";
import FuturisticBackground from "@/components/background/FuturisticBackground";
import HeaderNav from "@/components/navigation/HeaderNav";
import SlideNavigator from "@/components/navigation/SlideNavigator";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import WritingSection from "@/components/writing/WritingSection";
import ContactSection from "@/components/contact/ContactSection";
import { navigationSections } from "@/data/navigation";

export default function Home() {
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSectionId(sectionId);

    // Update URL hash without forcing hard jumps
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
    }

    // Scroll section into view
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Synchronize on initial mount if hash is already present in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && navigationSections.some((s) => s.id === hash)) {
        const timer = setTimeout(() => {
          setActiveSectionId(hash);
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // IntersectionObserver to track active section during user scroll
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
          if (typeof window !== "undefined") {
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navigationSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf7f2] text-stone-900 overflow-x-hidden">
      {/* Subtle Warm Ambient Background */}
      <FuturisticBackground />

      {/* Top Fixed Header Navigation */}
      <HeaderNav activeSectionId={activeSectionId} onNavigate={handleNavigate} />

      {/* Slide Deck / Scroll Container */}
      <main
        ref={containerRef}
        className="relative z-10 w-full pt-14 sm:pt-16 lg:pt-16 slide-container"
      >
        {/* Slide 01: Hero */}
        <section id="hero" className="slide-section w-full">
          <HeroSection onNavigate={handleNavigate} />
        </section>

        {/* Slide 02: About */}
        <section id="about" className="slide-section w-full">
          <AboutSection onNavigate={handleNavigate} />
        </section>

        {/* Slide 03: Skills */}
        <section id="skills" className="slide-section w-full">
          <SkillsSection onNavigate={handleNavigate} />
        </section>

        {/* Slide 04: Projects */}
        <section id="projects" className="slide-section w-full">
          <ProjectsSection onNavigate={handleNavigate} />
        </section>

        {/* Slide 05: Experience */}
        <section id="experience" className="slide-section w-full">
          <ExperienceSection onNavigate={handleNavigate} />
        </section>

        {/* Slide 06: Writing */}
        <section id="writing" className="slide-section w-full">
          <WritingSection onNavigate={handleNavigate} />
        </section>

        {/* Slide 07: Contact */}
        <section id="contact" className="slide-section w-full">
          <ContactSection />
        </section>
      </main>

      {/* Persistent Floating Slide Navigator Controls */}
      <SlideNavigator activeSectionId={activeSectionId} onNavigate={handleNavigate} />
    </div>
  );
}
