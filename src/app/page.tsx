"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Terminal,
  Briefcase,
  ArrowRight,
  Radio,
  FileText,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, SubstackIcon } from "@/components/shared/SocialIcons";
import { Tooltip } from "@/components/shared/Tooltip";

// Isolated zero-re-render timer component
const LiveTime = memo(function LiveTime() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <span suppressHydrationWarning>[--:--:--]</span>;
  return <span suppressHydrationWarning>[{time}]</span>;
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.05, duration: 0.35, staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function GatewayPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<"stalker" | "founder" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Keyboard navigation shortcuts: [1] Stalker, [2] Founder
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "1" || e.key.toLowerCase() === "s") {
        router.push("/stalker");
      } else if (e.key === "2" || e.key.toLowerCase() === "f") {
        router.push("/founder");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Zero-rerender hardware-accelerated mouse light tracking (desktop pointer only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
      }
    });
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#050505] text-zinc-300 selection:bg-zinc-800 selection:text-white flex flex-col justify-between overflow-x-hidden"
      style={
        {
          "--mouse-x": "50vw",
          "--mouse-y": "50vh",
        } as React.CSSProperties
      }
    >
      {/* Hardware-accelerated CSS Spotlight (Desktop only) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-40 will-change-[background] hidden sm:block"
        style={{
          background: `radial-gradient(650px circle at var(--mouse-x) var(--mouse-y), ${
            hoveredCard === "stalker"
              ? "rgba(34, 197, 94, 0.08)"
              : hoveredCard === "founder"
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(255, 255, 255, 0.02)"
          }, transparent 70%)`,
        }}
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-25 hidden sm:flex">
        <div className="h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 blur-3xl transform-gpu" />
      </div>

      {/* ── TOP HUD HEADER ── */}
      <header className="relative z-30 w-full px-4 sm:px-8 pt-5 sm:pt-7 flex items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500">
        <div className="flex items-center gap-2 sm:gap-3">
          <Tooltip content="Systems Operational • SDE Intern @ Lolocab" side="bottom">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 cursor-help">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-200 font-semibold tracking-wider">RISHAB RAJ</span>
            </div>
          </Tooltip>
          <span className="hidden md:inline text-zinc-600">•</span>
          <span className="hidden md:inline text-zinc-500">SYSTEMS & AI ENGINEER</span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4 text-[10px] sm:text-[11px]">
          <Tooltip content="Live local time in New Delhi, India" side="bottom">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/5 text-zinc-400 cursor-help">
              <Radio className="h-3 w-3 text-emerald-400 shrink-0" />
              <span className="hidden xs:inline">DELHI, IN</span>
              <span className="text-zinc-500">
                <LiveTime />
              </span>
            </div>
          </Tooltip>

          <div className="hidden sm:flex items-center gap-1.5 text-zinc-500">
            <Tooltip content="Press '1' or 'S' key on keyboard" side="bottom">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-400 cursor-help">
                [1] STALKER
              </span>
            </Tooltip>
            <Tooltip content="Press '2' or 'F' key on keyboard" side="bottom" align="end">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-400 cursor-help">
                [2] FOUNDER
              </span>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* ── MAIN HERO & PROMPT ── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-10 max-w-5xl mx-auto w-full text-center">
        {/* Intro sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 font-mono text-[10px] sm:text-xs tracking-widest text-zinc-400 uppercase mb-3.5 sm:mb-5"
        >
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span>Context dictates the experience</span>
        </motion.div>

        {/* The Main Question */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-2.5 sm:mb-3"
        >
          What brings you here today?
        </motion.h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-light leading-relaxed mb-6 sm:mb-12">
          Select an experience below to explore technical depth, live telemetry, or business impact.
        </p>

        {/* The Choice Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl"
        >
          {/* Path A: Stalker */}
          <Link
            href="/stalker"
            onMouseEnter={() => setHoveredCard("stalker")}
            onMouseLeave={() => setHoveredCard(null)}
            aria-label="Explore Stalker developer perspective"
            className="group relative w-full text-left"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-white/10 bg-[#090909] sm:bg-[#090909]/90 p-5 sm:p-7 transition-all duration-300 hover:border-emerald-500/50 hover:bg-[#070e08] sm:backdrop-blur-xl hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] transform-gpu"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                  <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-emerald-400/90 tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>[01 // DEV_LOGS]</span>
                  </div>
                  <Tooltip content="Keyboard shortcut: Press '1' or 'S'" side="top" align="end">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                      KEY [1]
                    </span>
                  </Tooltip>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-sans text-lg sm:text-2xl font-medium text-white group-hover:text-emerald-300 transition-colors">
                      I&apos;m just a Stalker
                    </h2>
                  </div>
                </div>

                <p className="font-mono text-[10px] sm:text-xs text-zinc-400 mt-1">
                  [ Just Stalking • The Hacker Perspective ]
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mt-2.5 sm:mt-3">
                  For curious developers, peers & late-night explorers. Real-time Spotify telemetry, socket decryptors, candid Polaroid memories, and interactive digital guestbook.
                </p>

                {/* Tech Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                    #LiveSpotify
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                    #WebSockets
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                    #DigitalGuestbook
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                    #Memories
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-5 sm:mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500 group-hover:text-emerald-400 transition-colors">
                <span className="tracking-widest uppercase text-[11px] font-semibold">&gt; Enter Terminal</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          </Link>

          {/* Path B: Founder */}
          <Link
            href="/founder"
            onMouseEnter={() => setHoveredCard("founder")}
            onMouseLeave={() => setHoveredCard(null)}
            aria-label="Explore Founder builder perspective"
            className="group relative w-full text-left"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-white/10 bg-[#090909] sm:bg-[#090909]/90 p-5 sm:p-7 transition-all duration-300 hover:border-white/40 hover:bg-[#0e0e0e] sm:backdrop-blur-xl hover:shadow-[0_0_35px_rgba(255,255,255,0.06)] transform-gpu"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                  <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-zinc-400 tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>[02 // SYSTEMS_ROI]</span>
                  </div>
                  <Tooltip content="Keyboard shortcut: Press '2' or 'F'" side="top" align="end">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-zinc-500 group-hover:text-white group-hover:border-white/30 transition-colors">
                      KEY [2]
                    </span>
                  </Tooltip>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-zinc-200 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-sans text-lg sm:text-2xl font-medium text-white transition-colors">
                      I need a Builder
                    </h2>
                  </div>
                </div>

                <p className="font-mono text-[10px] sm:text-xs text-zinc-400 mt-1">
                  [ Founders & Recruiters • Proof of Work ]
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mt-2.5 sm:mt-3">
                  For founders, recruiters, and engineering leaders. High-concurrency system design, scalable microservices, edge compute, and technical execution built for business impact.
                </p>

                {/* Tech Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                    1M+ RPS Benchmarked
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                    Bare-Metal Java Sockets
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                    AI Autonomous Workflows
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                    Edge Compute
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-5 sm:mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">
                <span className="tracking-widest uppercase text-[11px] font-semibold">&gt; View Proof of Work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* ── FLOATING BOTTOM DOCK ── */}
      <footer className="relative z-30 w-full px-4 sm:px-8 pb-5 sm:pb-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-xs text-zinc-500">
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-center max-w-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="tracking-wider uppercase text-zinc-400 truncate">
            JAVA • SPRING BOOT • NODE.JS • NEXT.JS • DOCKER
          </span>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto max-w-xs sm:max-w-none">
          <Tooltip content="View latest resume PDF on Google Drive" side="top">
            <a
              href="https://drive.google.com/drive/folders/14FEmV08dBFJCtdYDF36QlUadfLI7OfLX?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl sm:rounded-full bg-white/[0.03] border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.06] transition-all text-[11px] w-full sm:w-auto shadow-xs active:scale-95"
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span>Resume</span>
            </a>
          </Tooltip>

          <Tooltip content="github.com/rishab2211 (Repositories & Code)" side="top">
            <a
              href="https://github.com/rishab2211"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl sm:rounded-full bg-white/[0.03] border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.06] transition-all text-[11px] w-full sm:w-auto shadow-xs active:scale-95"
            >
              <GithubIcon size={14} className="shrink-0" />
              <span>GitHub</span>
            </a>
          </Tooltip>

          <Tooltip content="linkedin.com/in/rishab2211 (Connect on LinkedIn)" side="top">
            <a
              href="https://linkedin.com/in/rishab2211"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl sm:rounded-full bg-white/[0.03] border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.06] transition-all text-[11px] w-full sm:w-auto shadow-xs active:scale-95"
            >
              <LinkedinIcon size={14} className="shrink-0" />
              <span>LinkedIn</span>
            </a>
          </Tooltip>

          <Tooltip content="rishab2211.substack.com (Technical essays & newsletters)" side="top" align="end">
            <a
              href="https://rishab2211.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl sm:rounded-full bg-[#FF6719]/10 border border-[#FF6719]/30 text-[#FF6719] hover:bg-[#FF6719]/20 hover:border-[#FF6719]/50 transition-all text-[11px] w-full sm:w-auto shadow-xs active:scale-95"
            >
              <SubstackIcon size={14} className="shrink-0" />
              <span>Substack</span>
            </a>
          </Tooltip>
        </div>
      </footer>
    </main>
  );
}
