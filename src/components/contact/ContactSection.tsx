"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  Copy,
  Clock,
  Briefcase,
  FileText,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon, MediumIcon } from "@/components/icons/SocialIcons";
import { profileData } from "@/data/profile";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Time / Contract Opportunity",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#e5dfd3]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1 font-medium">
            <span>07 // START A CONVERSATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900">
            Interested in working together?
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mt-1 md:mt-0">
          <Clock className="w-3.5 h-3.5 text-indigo-600" />
          <span>{profileData.contact.responseTime}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e5dfd3] space-y-4 shadow-xs">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Open for Opportunities</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                {profileData.contact.availability}. Whether you need an engineer to lead full-stack features,
                bridge enterprise SAP pipelines, or architect stateful LangGraph AI workflows.
              </p>
            </div>

            {/* Email card with quick copy */}
            <div className="p-3.5 rounded-xl bg-[#fbf9f5] border border-[#e7e2d6] space-y-1.5">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block font-medium">
                Direct Email Address
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="text-xs sm:text-sm font-mono text-indigo-600 hover:underline font-medium truncate"
                >
                  {profileData.contact.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg bg-white hover:bg-[#f4efe6] text-stone-600 hover:text-stone-900 border border-[#e5dfd3] transition-all cursor-pointer shrink-0 shadow-2xs"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-stone-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Direct Social Links */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block font-medium">
                Networks &amp; Publications
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={profileData.socialLinks.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] hover:border-[#cfc7b7] flex flex-col items-center justify-center gap-1 text-stone-700 hover:text-stone-900 transition-all"
                >
                  <MediumIcon className="w-4 h-4 text-stone-900" />
                  <span className="text-[10px] font-mono">Medium</span>
                </a>
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] hover:border-[#cfc7b7] flex flex-col items-center justify-center gap-1 text-stone-700 hover:text-stone-900 transition-all"
                >
                  <GitHubIcon className="w-4 h-4 text-stone-700" />
                  <span className="text-[10px] font-mono">GitHub</span>
                </a>
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] hover:border-[#cfc7b7] flex flex-col items-center justify-center gap-1 text-stone-700 hover:text-indigo-600 transition-all"
                >
                  <LinkedInIcon className="w-4 h-4 text-indigo-600" />
                  <span className="text-[10px] font-mono">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Resume CTA */}
            <div className="pt-1">
              <a
                href="/resume.pdf"
                download="Manish_Parajuli_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#f4efe6] hover:bg-[#eae3d5] border border-[#e5dfd3] text-stone-800 text-xs font-mono font-medium transition-all shadow-2xs"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#e5dfd3] shadow-xs">
            {submitted ? (
              <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Message Transmitted</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
                  Thank you for reaching out! Manish has received your message and will reply promptly.
                  Expected response window: <strong>1–2 business days</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-all cursor-pointer font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-stone-600 mb-1 font-medium"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] focus:bg-white focus:border-indigo-600 focus:outline-none text-xs text-stone-900 placeholder-stone-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-stone-600 mb-1 font-medium"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] focus:bg-white focus:border-indigo-600 focus:outline-none text-xs text-stone-900 placeholder-stone-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-stone-600 mb-1 font-medium"
                  >
                    Engagement Type
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] focus:bg-white focus:border-indigo-600 focus:outline-none text-xs text-stone-900 transition-colors"
                  >
                    <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                    <option value="AI / Agentic Workflow Consulting">AI / Agentic Workflow Consulting (LangGraph, RAG)</option>
                    <option value="Contract / Freelance Project">Contract / Freelance Project</option>
                    <option value="Enterprise Integration Consultation">Enterprise Integration Consultation</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-stone-600 mb-1 font-medium"
                  >
                    Message / Brief *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell Manish about the role, scope, or technical challenges you're tackling..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbf9f5] border border-[#e5dfd3] focus:bg-white focus:border-indigo-600 focus:outline-none text-xs text-stone-900 placeholder-stone-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Manish</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 sm:mt-10 pt-4 border-t border-[#e5dfd3] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-500 gap-2.5">
        <div className="flex items-center gap-1.5">
          <span>&copy; {new Date().getFullYear()} Manish Parajuli.</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Next.js 16 &middot; Tailwind CSS &middot; TypeScript</span>
          <span className="text-stone-700 font-medium">Sydney, Australia</span>
        </div>
      </footer>
    </div>
  );
}
