"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Activity,
  CloudFog,
  Users,
  ArrowDownRight,
  Copy,
  CheckCircle2,
  FileDown,
  Award,
} from "lucide-react";
import { useState } from "react";
import { Projects } from "@/components/shared/Projects";
import { Timeline } from "@/components/shared/Timeline";
import { Blogs } from "@/components/shared/Blogs";
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

      {/* ── SECTION 1: HERO (THE ARCHITECT & BUILDER) ── */}
      <section className="relative min-h-[90dvh] flex flex-col justify-center px-4 sm:px-12 md:px-24 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          {/* Identity & Role Block */}
          <div className="mb-6 sm:mb-10">
            <h2 className="text-lg sm:text-2xl text-zinc-200 font-medium tracking-tight mb-1">
              Rishab Raj
            </h2>
            <p className="font-mono text-[11px] sm:text-xs tracking-widest text-zinc-500 uppercase">
              Software Development Engineer Intern @ Lolocab • Full-Stack AI Engineer
            </p>
          </div>

          {/* Core Value Proposition */}
          <h1 className="font-sans text-3xl sm:text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tighter text-white leading-[1.08] sm:leading-[1.05]">
            Engineering systems that <br />
            <span className="text-zinc-600">multiply</span> leverage.
          </h1>

          <div className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
            <p className="text-sm sm:text-lg text-zinc-400 leading-relaxed font-light">
              I build high-concurrency backends, autonomous AI pipelines, and
              edge-optimized microservices aligned directly with business ROI.
              Code engineered to eliminate latency bottlenecks, scale gracefully,
              and endure heavy loads.
            </p>

            <div className="flex flex-col items-start gap-4 sm:gap-6">
              <a
                href="#execution"
                className="group flex items-center gap-3 font-mono text-xs sm:text-sm text-white uppercase tracking-widest hover:text-zinc-400 transition-colors"
              >
                Examine Proof of Work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>

              <a
                href="#contact"
                className="group flex items-center gap-3 font-mono text-xs sm:text-sm text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                Discuss Alignment
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>

              <Tooltip content="Open formal resume PDF in Google Drive" side="top">
                <a
                  href="https://drive.google.com/drive/folders/14FEmV08dBFJCtdYDF36QlUadfLI7OfLX?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between w-full sm:w-64 px-4 sm:px-5 py-2.5 sm:py-3 border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 rounded-xs"
                >
                  <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">
                    View Formal Resume
                  </span>
                  <FileDown className="h-3.5 w-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                </a>
              </Tooltip>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2: COMPETENCIES (REFINED ARCHITECTURAL BENTO) ── */}
      <section className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
          {/* Left Sticky Column */}
          <div className="lg:w-1/3 shrink-0 lg:sticky lg:top-32">
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 tracking-widest uppercase mb-3 sm:mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>[01 // COMPETENCIES]</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-tight mb-4 sm:mb-5">
              Specialized domain knowledge.
            </h2>

            <p className="text-xs sm:text-base text-zinc-400 font-light leading-relaxed mb-6 sm:mb-8">
              A strict focus on high-throughput backend mechanics, JVM concurrency,
              autonomous web extraction pipelines, and high-impact engineering leadership.
            </p>

            <div className="flex flex-col gap-2.5 font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="text-zinc-600">&gt;</span>
                <span>PRODUCTION MICROSERVICES</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-600">&gt;</span>
                <span>BARE-METAL SOCKETS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-600">&gt;</span>
                <span>EDGE COMPUTE & RUNTIMES</span>
              </div>
            </div>
          </div>

          {/* Right 2x2 Bento Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            <BentoCard
              icon={<BrainCircuit className="h-5 w-5" />}
              title="Agentic AI & Scraping"
              metric="85%+ Accuracy"
              description="Engineering node-based workflows and LLM extraction pipelines with Gemini AI, Puppeteer, and cron scheduling."
              tags={["Gemini AI", "Puppeteer", "ReactFlow", "Cron"]}
            />

            <BentoCard
              icon={<Activity className="h-5 w-5" />}
              title="High-Concurrency JVM"
              metric="1M+ RPS Benchmarked"
              description="Building bare-metal socket servers and thread pooling in Java that slash memory usage by 35% under peak traffic."
              tags={["Java Sockets", "Multithreading", "Thread Pooling"]}
            />

            <BentoCard
              icon={<CloudFog className="h-5 w-5" />}
              title="Edge & Cloud Architecture"
              metric="Sub-5ms Latency"
              description="Deploying global serverless API routes and dynamic SEO pipelines using Cloudflare Workers, HonoJS, Node.js, and AWS."
              tags={["Cloudflare", "HonoJS", "Node.js", "AWS"]}
            />

            <BentoCard
              icon={<Award className="h-5 w-5" />}
              title="Org Leadership & Honors"
              metric="10 → 160+ Scale"
              description="Scaled IEEE MAIT student branch to 160+ members and 2,000+ outreach, honored with national Outstanding Branch & J.K. Pal awards."
              tags={["IEEE MAIT", "Hackathons", "National Honors"]}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 2.5: OPERATING FRAMEWORK ── */}
      <section className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04] bg-[#030303]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-24">
          {/* Left Column */}
          <div className="lg:w-1/3 shrink-0">
            <div className="lg:sticky lg:top-32">
              <h2 className="flex items-center gap-3 text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase font-mono mb-4 sm:mb-6">
                <span className="h-px w-6 bg-zinc-700" />
                Execution Framework
              </h2>
              <p className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug mb-4 sm:mb-6">
                Code is a commodity. <br />
                <span className="text-zinc-600">Judgment is not.</span>
              </p>
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-sm">
                Scaling products requires a multi-disciplinary lens. Systems must
                be evaluated against user psychology, speed to market, and
                fault-tolerant engineering.
              </p>
            </div>
          </div>

          {/* Right Column: Principles */}
          <div className="lg:w-2/3 relative group/list">
            <div className="absolute left-[23px] sm:left-[31px] top-4 bottom-4 w-px bg-white/[0.03] hidden sm:block" />

            <div className="flex flex-col gap-10 sm:gap-16">
              {/* Principle 01 */}
              <div className="group/item relative flex gap-4 sm:gap-12 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="font-mono text-3xl sm:text-6xl font-medium text-zinc-800 transition-colors duration-500 group-hover/item:text-zinc-300 bg-[#030303] py-1 sm:py-2">
                    01
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-all duration-500 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 hidden sm:block" />
                </div>

                <div className="flex-1 pt-1 sm:pt-6 transition-transform duration-500 ease-out group-hover/item:translate-x-2">
                  <h3 className="text-lg sm:text-2xl font-medium tracking-tight text-zinc-200 mb-2 sm:mb-3 group-hover/item:text-white transition-colors">
                    Cognitive Friction is the Enemy
                  </h3>
                  <p className="text-xs sm:text-base text-zinc-500 font-light leading-relaxed group-hover/item:text-zinc-400 transition-colors">
                    A mathematically fast backend is useless if the user
                    abandons the interface. I design data flows that reduce
                    human friction, optimizing for intuitive state management
                    over unnecessary technical acrobatics.
                  </p>
                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:py-1 bg-white/[0.02] border border-white/[0.05] rounded-xs font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [DOMAIN: UX_ARCHITECTURE]
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-white/[0.02] border border-white/[0.05] rounded-xs font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [FOCUS: ZERO_FRICTION]
                    </span>
                  </div>
                </div>
              </div>

              {/* Principle 02 */}
              <div className="group/item relative flex gap-4 sm:gap-12 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="font-mono text-3xl sm:text-6xl font-medium text-zinc-800 transition-colors duration-500 group-hover/item:text-zinc-300 bg-[#030303] py-1 sm:py-2">
                    02
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-all duration-500 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 hidden sm:block" />
                </div>

                <div className="flex-1 pt-1 sm:pt-6 transition-transform duration-500 ease-out group-hover/item:translate-x-2">
                  <h3 className="text-lg sm:text-2xl font-medium tracking-tight text-zinc-200 mb-2 sm:mb-3 group-hover/item:text-white transition-colors">
                    Market Viability {">"} Mechanics
                  </h3>
                  <p className="text-xs sm:text-base text-zinc-500 font-light leading-relaxed group-hover/item:text-zinc-400 transition-colors">
                    Every line of code is a business liability until it generates
                    real leverage. Technical decisions—from edge compute routing
                    to relational schema indexing—are evaluated strictly against
                    reliability, time-to-market, and measurable value.
                  </p>
                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:py-1 bg-white/[0.02] border border-white/[0.05] rounded-xs font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [DOMAIN: PRODUCT]
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-white/[0.02] border border-white/[0.05] rounded-xs font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [FOCUS: TIME_TO_VALUE]
                    </span>
                  </div>
                </div>
              </div>

              {/* Principle 03 */}
              <div className="group/item relative flex gap-4 sm:gap-12 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="font-mono text-3xl sm:text-6xl font-medium text-zinc-800 transition-colors duration-500 group-hover/item:text-zinc-300 bg-[#030303] py-1 sm:py-2">
                    03
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-all duration-500 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 hidden sm:block" />
                </div>

                <div className="flex-1 pt-1 sm:pt-6 transition-transform duration-500 ease-out group-hover/item:translate-x-2">
                  <h3 className="text-lg sm:text-2xl font-medium tracking-tight text-zinc-200 mb-2 sm:mb-3 group-hover/item:text-white transition-colors">
                    Compound Execution Over Heroics
                  </h3>
                  <p className="text-xs sm:text-base text-zinc-500 font-light leading-relaxed group-hover/item:text-zinc-400 transition-colors">
                    Sustainable engineering velocity isn&apos;t built on late-night
                    firefighting. It is created through modular clean code,
                    observable telemetry, resilient error boundaries, and deep
                    architectural documentation.
                  </p>
                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:py-1 bg-white/[0.02] border border-white/[0.05] rounded-xs font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [DOMAIN: ENGINEERING]
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 bg-white/[0.02] border border-white/[0.05] rounded-xs font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [FOCUS: COMPOUND_VELOCITY]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PROOF OF WORK (PROJECTS) ── */}
      <section id="execution" className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Projects variant="founder" />
        </div>
      </section>

      {/* ── SECTION 4: TIMELINE (EXPERIENCE & TRACK RECORD) ── */}
      <section className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04] bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <Timeline variant="founder" />
        </div>
      </section>

      {/* ── SECTION 4.5: WRITINGS & PUBLICATIONS ── */}
      <section id="publications" className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Blogs variant="founder" />
        </div>
      </section>

      {/* ── SECTION 5: CONTACT & DISCUSS ALIGNMENT ── */}
      <section id="contact" className="relative px-4 sm:px-12 md:px-24 py-16 sm:py-36 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 sm:gap-12">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-5xl font-medium tracking-tight text-white mb-4 sm:mb-6">
              Initiate Contact.
            </h2>
            <p className="text-sm sm:text-lg text-zinc-400 font-light leading-relaxed mb-8 sm:mb-10">
              Open for high-impact software engineering roles, distributed systems discussions, and visionary product collaborations.
            </p>

            <Tooltip content={copied ? "Email copied to clipboard!" : "Click to copy rishabraj2211@gmail.com"} side="right">
              <button
                onClick={handleCopy}
                aria-label="Copy Rishab's email address"
                className="group flex items-center gap-3 sm:gap-4 text-left cursor-pointer"
              >
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 transition-colors group-hover:bg-white group-hover:text-black shrink-0">
                  {copied ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400 group-hover:text-black" />
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function BentoCard({
  icon,
  title,
  description,
  metric,
  tags,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  tags: string[];
}) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#090909] sm:bg-[#090909]/90 p-5 sm:p-8 transition-all duration-300 hover:border-white/30 hover:bg-[#0e0e0e] sm:backdrop-blur-xl">
      {/* Ambient hover light bloom (Desktop only) */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl group-hover:bg-white/[0.08] transition-all duration-500 hidden sm:block" />

      <div>
        {/* Top Metric Bar */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white shrink-0">
            {icon}
          </div>

          <Tooltip content="Production engineering metric" side="top" align="end">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] font-mono text-[9px] sm:text-[10px] text-zinc-200 tracking-wider uppercase group-hover:border-white/30 group-hover:text-white transition-all shadow-xs cursor-help">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{metric}</span>
            </div>
          </Tooltip>
        </div>

        {/* Title */}
        <h3 className="mb-2 sm:mb-2.5 text-lg sm:text-xl font-medium tracking-tight text-white group-hover:text-zinc-100 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-light">
          {description}
        </p>
      </div>

      {/* Tech Stack Tags */}
      <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/5 flex flex-wrap gap-1.5 font-mono text-[9px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-zinc-400 group-hover:text-zinc-300 group-hover:border-white/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
