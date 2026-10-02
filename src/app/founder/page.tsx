"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  Copy,
  CheckCircle2,
  FileDown,
} from "lucide-react";
import { useState } from "react";
import { Projects } from "@/components/shared/Projects";
import { Timeline } from "@/components/shared/Timeline";
import { Blogs } from "@/components/shared/Blogs";
import { IEEEImpact } from "@/components/shared/IEEEImpact";
import { Tooltip } from "@/components/shared/Tooltip";

export default function FounderPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText("rishabraj2211@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-300 selection:bg-white selection:text-black">
      {/* Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top Floating Nav */}
      <nav className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Tooltip content="Return to Gateway selection" side="right">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-[11px] sm:text-xs rounded-full bg-black/80 px-3.5 py-1.5 sm:px-4 sm:py-2 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all uppercase tracking-widest shadow-lg"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Gateway
          </Link>
        </Tooltip>
      </nav>

      {/* ── SECTION: HERO ── */}
      <section className="relative min-h-[85dvh] flex flex-col justify-center px-4 sm:px-12 md:px-24 pt-28 sm:pt-32 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl"
        >
          {/* Identity & Eyebrow */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl text-zinc-100 font-medium tracking-tight mb-2.5">
              Rishab Raj
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded-full border border-white/15 bg-white/[0.04] text-zinc-200">
                SDE Intern @ Lolocab
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Systems & Backend</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-500">Delhi, IN</span>
            </div>
          </div>

          {/* Headline */}

          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] font-medium tracking-tighter text-white leading-[1.04] sm:leading-[0.98] mb-8 sm:mb-12 max-w-6xl">
            <span className="sm:whitespace-nowrap">Engineering systems</span> <br />
            that <br />
            <span className="text-zinc-600">multiply</span> leverage.
          </h1>

          {/* Bio & Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start max-w-5xl pt-2 border-t border-white/[0.06]">
            <div className="md:col-span-7 space-y-3.5">
              <p className="font-mono text-xs sm:text-sm text-zinc-300 font-medium tracking-tight">
                generalist around experts. expert around generalists.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                I gravitate toward the hard parts, the systems that have to
                survive real load, the pipelines where a failure at 2 a.m. has a
                real cost. I care less about writing clever code and more about
                building systems that keep working when the easy assumptions
                stop holding.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-2.5 font-mono text-xs">
              <a
                href="#projects"
                className="group flex items-center justify-between px-4 py-3 border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all rounded-lg text-white"
              >
                <span className="uppercase tracking-wider">
                  Examine Proof of Work
                </span>
                <ArrowDownRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#leadership"
                className="group flex items-center justify-between px-4 py-3 border border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03] transition-all rounded-lg text-zinc-400 hover:text-white"
              >
                <span className="uppercase tracking-wider">
                  Leadership & Scale
                </span>
                <ArrowDownRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <Tooltip
                content="Open formal resume PDF in Google Drive"
                side="top"
              >
                <a
                  href="https://drive.google.com/drive/folders/14FEmV08dBFJCtdYDF36QlUadfLI7OfLX?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-3 border border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03] transition-all rounded-lg text-zinc-400 hover:text-white"
                >
                  <span className="uppercase tracking-wider">
                    Formal Resume (PDF)
                  </span>
                  <FileDown className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              </Tooltip>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 1: PROOF OF WORK (PROJECTS) ── */}
      <section
        id="projects"
        className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>[01 // PROOF OF WORK]</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Systems & Architecture.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-light max-w-2xl">
              Production engines, distributed socket mechanics, and autonomous
              AI systems built from scratch.
            </p>
          </div>
          <Projects variant="founder" />
        </div>
      </section>

      {/* ── SECTION 2: LEADERSHIP & SCALE (IEEE IMPACT) ── */}
      <section
        id="leadership"
        className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04] bg-[#030303]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>[02 // LEADERSHIP & SCALE]</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Community Leadership & National Honors.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-light max-w-2xl">
              Scaling an engineering chapter from 5 to 160+ members, delivering
              50+ technical initiatives, and building high-agency culture.
            </p>
          </div>
          <IEEEImpact variant="founder" />
        </div>
      </section>

      {/* ── SECTION 3: TIMELINE (EXPERIENCE & TRACK RECORD) ── */}
      <section
        id="timeline"
        className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>[03 // TRACK RECORD]</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Experience & Education.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-light max-w-2xl">
              Production engineering at Lolocab alongside academic rigor in
              Computer Information Technology.
            </p>
          </div>
          <Timeline variant="founder" />
        </div>
      </section>

      {/* ── SECTION 4: WRITINGS & PUBLICATIONS ── */}
      <section
        id="publications"
        className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04] bg-[#030303]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span>[04 // ESSAYS & WRITING]</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
                Technical Essays & Thinking.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-400 font-light max-w-2xl">
                Deep dives on distributed systems, JVM performance, concurrency,
                and engineering leadership.
              </p>
            </div>
            <Tooltip
              content="Subscribe & read on rishab2211.substack.com"
              side="left"
            >
              <a
                href="https://rishab2211.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider transition-colors shrink-0"
              >
                <span>Read on Substack</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Tooltip>
          </div>
          <Blogs variant="founder" />
        </div>
      </section>

      {/* ── SECTION 5: CONTACT & DISCUSS ALIGNMENT ── */}
      <section
        id="contact"
        className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-36 border-t border-white/[0.04]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 sm:gap-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>[05 // CONTACT & ALIGNMENT]</span>
            </div>
            <h2 className="text-2xl sm:text-5xl font-medium tracking-tight text-white mb-4 sm:mb-6">
              Worth a conversation?
            </h2>
            <p className="text-sm sm:text-lg text-zinc-400 font-light leading-relaxed mb-8 sm:mb-10">
              Looking for a place where engineering craftsmanship matters —
              where I can tackle hard backend challenges, take ownership, and
              build systems that last.
            </p>

            <Tooltip
              content={
                copied
                  ? "Email copied to clipboard!"
                  : "Click to copy rishabraj2211@gmail.com"
              }
              side="right"
            >
              <button
                onClick={handleCopy}
                aria-label="Copy Rishab's email address"
                className="group flex items-center gap-3 sm:gap-4 text-left cursor-pointer"
              >
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 transition-colors group-hover:bg-white group-hover:text-black shrink-0">
                  {copied ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 group-hover:text-black" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <span className="block font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest mb-0.5 sm:mb-1">
                    {copied ? "Copied to clipboard" : "Copy email address"}
                  </span>
                  <span className="block text-base sm:text-xl text-zinc-200 transition-colors group-hover:text-white truncate">
                    rishabraj2211@gmail.com
                  </span>
                </div>
              </button>
            </Tooltip>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 md:text-right w-full sm:w-auto">
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-zinc-600 uppercase">
              External Nodes
            </span>
            <div className="flex flex-wrap sm:flex-col gap-3 sm:gap-3.5">
              <Tooltip content="github.com/rishab2211" side="left">
                <a
                  href="https://github.com/rishab2211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-lg text-zinc-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </Tooltip>

              <Tooltip content="linkedin.com/in/rishab2211" side="left">
                <a
                  href="https://linkedin.com/in/rishab2211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-lg text-zinc-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </Tooltip>

              <Tooltip content="rishab2211.substack.com" side="left">
                <a
                  href="https://rishab2211.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-lg text-zinc-400 hover:text-white transition-colors"
                >
                  Substack Essays
                </a>
              </Tooltip>

              <Tooltip content="x.com/Rshb_twts" side="left">
                <a
                  href="https://x.com/Rshb_twts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-lg text-zinc-400 hover:text-white transition-colors"
                >
                  X (Twitter)
                </a>
              </Tooltip>

              <Tooltip
                content="Open formal resume PDF in Google Drive"
                side="left"
              >
                <a
                  href="https://drive.google.com/drive/folders/14FEmV08dBFJCtdYDF36QlUadfLI7OfLX?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-lg text-zinc-400 hover:text-white transition-colors"
                >
                  Formal Resume
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 sm:py-10 px-4 text-center font-mono text-[10px] text-zinc-600">
        <p>Rishab Raj • Founder Mode • Built with Next.js & TailwindCSS</p>
      </footer>
    </main>
  );
}
