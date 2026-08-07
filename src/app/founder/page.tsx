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
} from "lucide-react";
import { useState } from "react";
import { Projects } from "@/components/shared/Projects";
import { Timeline } from "@/components/shared/Timeline";

export default function FounderPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("rishabraj2211@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-300 selection:bg-zinc-800 selection:text-white overflow-x-hidden">
      {/* Subtle Noise / Grain Overlay for texture */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 sm:p-10 z-50 flex items-center mix-blend-difference">
        <Link
          href="/"
          className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Return
          </span>
        </Link>
      </nav>

      {/* SECTION 1: Left-Aligned Asymmetrical Hero */}
      <section className="relative min-h-[90dvh] flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          {/* Identity & Role Block */}
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl text-zinc-200 font-medium tracking-tight mb-1.5">
              Rishab Raj
            </h2>
            <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-4">
              Software Engineer • Full-Stack AI Engineer
            </p>
          </div>

          {/* Core Value Proposition */}
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium tracking-tighter text-white leading-[1.05]">
            Engineering systems that <br />
            <span className="text-zinc-600">multiply</span> leverage.
          </h1>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light">
              I align high-concurrency backends, autonomous RAG pipelines, and
              edge-optimized microservices directly with business objectives.
              Code built to handle massive scale, eliminate bottlenecks, and
              drive measurable ROI.
            </p>

            <div className="flex flex-col items-start gap-6">
              <button
                onClick={() =>
                  document
                    .getElementById("execution")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-3 font-mono text-xs sm:text-sm text-white uppercase tracking-widest hover:text-zinc-400 transition-colors"
              >
                Examine Proof of Work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-3 font-mono text-xs sm:text-sm text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                Discuss Alignment
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </button>

              <a
                href="https://drive.google.com/drive/folders/14FEmV08dBFJCtdYDF36QlUadfLI7OfLX?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full sm:w-64 px-5 py-3 border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">
                  View Formal Profile(Resume)
                </span>
                <FileDown className="h-3.5 w-3.5 text-zinc-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Core Capabilities (Architectural Grid) */}
      <section className="relative px-6 sm:px-12 md:px-24 py-24 sm:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3 shrink-0 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-medium tracking-widest text-zinc-500 uppercase font-mono mb-4">
                Competencies
              </h2>
              <p className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug mb-6">
                Specialized domain knowledge.
              </p>
              <p className="text-sm text-zinc-500 font-light leading-relaxed max-w-sm">
                A strict focus on robust backend mechanics, zero-latency data
                transfer, and systems that refuse to fail under heavy
                multi-threaded loads.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <BentoCard
              icon={<BrainCircuit className="h-5 w-5" />}
              title="Agentic AI & RAG"
              metric="85%+ Accuracy"
              description="Engineering LLM workflows and retrieval-augmented generation systems that enforce factual grounding and eliminate unstructured data hallucinations."
            />
            <BentoCard
              icon={<Activity className="h-5 w-5" />}
              title="High-Concurrency"
              metric="1M+ RPS"
              description="Writing native multi-threaded architectures and bare-metal Java implementations that optimize thread pools and slash memory overhead."
            />
            <BentoCard
              icon={<CloudFog className="h-5 w-5" />}
              title="Edge Runtimes"
              metric="0ms Latency"
              description="Bypassing traditional cloud bloat. Deploying globally distributed, serverless API routes using Cloudflare Workers and HonoJS."
            />
            <BentoCard
              icon={<Users className="h-5 w-5" />}
              title="Org Scaling"
              metric="10 → 160 Personnel"
              description="Scaling technical teams from the ground up. Architected operations that mentored 1,000+ engineers and secured national IEEE recognition."
            />
          </div>
        </div>
      </section>

      {/* SECTION 2.5: Operating Framework (Mental Models) */}
      <section className="relative px-6 sm:px-12 md:px-24 py-24 sm:py-32 border-t border-white/[0.04] bg-[#030303]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column: Context */}
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-32">
              <h2 className="flex items-center gap-3 text-sm font-medium tracking-widest text-zinc-500 uppercase font-mono mb-6">
                <span className="h-px w-6 bg-zinc-700" />
                My Execution Framework
              </h2>
              <p className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-snug mb-6">
                Code is a commodity. <br />
                <span className="text-zinc-600">Judgment is not.</span>
              </p>
              <p className="text-base text-zinc-400 font-light leading-relaxed max-w-sm">
                Scaling a product requires a multi-disciplinary lens. We cannot
                architect a system without understanding the market it serves
                and the psychology of the human using it. This is my execution
                framework.
              </p>
            </div>
          </div>

          {/* Right Column: The Principles (Pipeline Layout) */}
          <div className="lg:w-2/3 relative group/list">
            {/* The continuous vertical pipeline line */}
            <div className="absolute left-[23px] sm:left-[31px] top-4 bottom-4 w-px bg-white/[0.03] hidden sm:block" />

            <div className="flex flex-col gap-12 sm:gap-16">
              {/* Principle 01 */}
              <div className="group/item relative flex gap-6 sm:gap-12 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="font-mono text-4xl sm:text-6xl font-medium text-zinc-800 transition-colors duration-500 group-hover/item:text-zinc-300 bg-[#030303] py-2">
                    01
                  </div>
                  {/* Active Node Indicator */}
                  <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-all duration-500 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 hidden sm:block" />
                </div>

                <div className="flex-1 pt-4 sm:pt-6 transition-transform duration-500 ease-out group-hover/item:translate-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-200 mb-3 group-hover/item:text-white transition-colors">
                    Cognitive Friction is the Enemy
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed group-hover/item:text-zinc-400 transition-colors">
                    A mathematically perfect backend is useless if the user
                    abandons the interface. I build architectures that
                    aggressively reduce server latency, but I design data flows
                    that reduce human cognitive load. I optimize for intuitive
                    state management over unnecessary technical acrobatics.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [DOMAIN: PSYCHOLOGY]
                    </span>
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [FOCUS: UX_ARCHITECTURE]
                    </span>
                  </div>
                </div>
              </div>

              {/* Principle 02 */}
              <div className="group/item relative flex gap-6 sm:gap-12 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="font-mono text-4xl sm:text-6xl font-medium text-zinc-800 transition-colors duration-500 group-hover/item:text-zinc-300 bg-[#030303] py-2">
                    02
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-all duration-500 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 hidden sm:block" />
                </div>

                <div className="flex-1 pt-4 sm:pt-6 transition-transform duration-500 ease-out group-hover/item:translate-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-200 mb-3 group-hover/item:text-white transition-colors">
                    Market Viability {">"} Mechanics
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed group-hover/item:text-zinc-400 transition-colors">
                    Every line of code is a business liability until it
                    generates value. I do not engineer features in a vacuum.
                    Technical decisions from edge compute routing to database
                    schema modeling are evaluated strictly against
                    time-to-market, user acquisition potential, and asymmetrical
                    ROI.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [DOMAIN: BUSINESS]
                    </span>
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [METRIC: TIME_TO_MARKET]
                    </span>
                  </div>
                </div>
              </div>

              {/* Principle 03 */}
              <div className="group/item relative flex gap-6 sm:gap-12 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="font-mono text-4xl sm:text-6xl font-medium text-zinc-800 transition-colors duration-500 group-hover/item:text-zinc-300 bg-[#030303] py-2">
                    03
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-all duration-500 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 hidden sm:block" />
                </div>

                <div className="flex-1 pt-4 sm:pt-6 transition-transform duration-500 ease-out group-hover/item:translate-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-200 mb-3 group-hover/item:text-white transition-colors">
                    First-Principles Scaling
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed group-hover/item:text-zinc-400 transition-colors">
                    Scale breaks weak assumptions. Instead of applying band-aid
                    fixes to failing infrastructure, I strip problems down to
                    their fundamental truths. Whether orchestrating autonomous
                    RAG agents or tuning multi-threaded JVMs, I build
                    fault-tolerant systems designed to self-heal under pressure.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [DOMAIN: ENGINEERING]
                    </span>
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [FOCUS: FAULT_TOLERANCE]
                    </span>
                  </div>
                </div>
              </div>

              {/* Principle 04 */}
              <div className="group/item relative flex gap-6 sm:gap-12 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="font-mono text-4xl sm:text-6xl font-medium text-zinc-800 transition-colors duration-500 group-hover/item:text-zinc-300 bg-[#030303] py-2">
                    04
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-all duration-500 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 hidden sm:block" />
                </div>

                <div className="flex-1 pt-4 sm:pt-6 transition-transform duration-500 ease-out group-hover/item:translate-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-200 mb-3 group-hover/item:text-white transition-colors">
                    The Leverage Multiplier
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed group-hover/item:text-zinc-400 transition-colors">
                    The objective is never to write the most complex code
                    possible. The objective is leverage. I architect systems
                    specifically to automate manual operations, slash cloud
                    compute bloat, and aggressively multiply the output of the
                    entire organization.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [DOMAIN: OPERATIONS]
                    </span>
                    <span className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded-sm font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                      [GOAL: ASYMMETRICAL_OUTPUT]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Dynamic Projects Engine */}
      <section
        id="execution"
        className="px-6 sm:px-12 md:px-24 py-24 bg-zinc-900/10 border-t border-white/[0.04]"
      >
        <div className="max-w-7xl mx-auto">
          <Projects variant="founder" />
        </div>
      </section>

      {/* SECTION 4: Dynamic Timeline Engine */}
      <section className="px-6 sm:px-12 md:px-24 py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Timeline variant="founder" />
        </div>
      </section>

      {/* SECTION 5: Footer / Comm Link (Asymmetrical) */}
      <section
        id="contact"
        className="px-6 sm:px-12 md:px-24 py-32 border-t border-white/[0.04] bg-[#030303]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-2xl">
            <h2 className="mb-8 text-4xl sm:text-6xl font-medium tracking-tighter text-white">
              Direct Line.
            </h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-12">
              My inbox is open for those building at scale.
            </p>

            <button
              onClick={handleCopy}
              className="group flex items-center gap-4 text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 transition-colors group-hover:bg-white group-hover:text-black">
                {copied ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </div>
              <div>
                <span className="block font-mono text-xs text-zinc-600 uppercase tracking-widest mb-1">
                  Copy Address
                </span>
                <span className="block text-xl text-zinc-300 transition-colors group-hover:text-white">
                  {copied ? "Copied to clipboard" : "rishabraj2211@gmail.com"}
                </span>
              </div>
            </button>
          </div>

          <div className="flex flex-col gap-6 md:text-right">
            <span className="font-mono text-xs tracking-widest text-zinc-700 uppercase">
              External Nodes
            </span>
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/rishab2211"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-zinc-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/rishab2211"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-zinc-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/Rshb_twts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-zinc-400 hover:text-white transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function BentoCard({
  icon,
  title,
  description,
  metric,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden bg-white/[0.01] p-8 transition-all duration-500 hover:bg-white/[0.03] border border-white/[0.05] rounded-sm">
      {/* Animated Accent Borders (Draws a frame on hover) */}
      <div className="absolute top-0 left-0 h-px w-0 bg-zinc-400 transition-all duration-700 ease-out group-hover:w-full" />
      <div className="absolute bottom-0 right-0 h-px w-0 bg-zinc-400 transition-all duration-700 ease-out group-hover:w-full" />
      <div className="absolute top-0 left-0 w-px h-0 bg-zinc-400 transition-all duration-700 ease-out group-hover:h-full" />
      <div className="absolute bottom-0 right-0 w-px h-0 bg-zinc-400 transition-all duration-700 ease-out group-hover:h-full" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-10">
          {/* Icon Box */}
          <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.02] text-zinc-500 transition-colors duration-300 group-hover:border-zinc-500/50 group-hover:text-white rounded-sm">
            {icon}
          </div>

          {/* Metric Status Pill */}
          <div className="flex items-center gap-2 border border-white/5 bg-black/50 px-3 py-1.5 rounded-sm transition-colors group-hover:border-white/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-500 opacity-75 group-hover:bg-zinc-300"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-zinc-600 transition-colors group-hover:bg-white"></span>
            </span>
            <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase transition-colors group-hover:text-zinc-300">
              {metric}
            </span>
          </div>
        </div>

        <h3 className="mb-4 text-xl font-medium tracking-tight text-zinc-200 group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-zinc-500 font-light group-hover:text-zinc-400 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}
