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
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/SocialIcons";
import { Tooltip } from "@/components/shared/Tooltip";

// Isolated zero-re-render timer component
const LiveTime = memo(function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
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

  return <span>[{time || "00:00:00"}]</span>;
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 0.5, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
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

  // Zero-rerender hardware-accelerated mouse light tracking
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
      {/* Hardware-accelerated CSS Spotlight (0 React re-renders) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-40 will-change-[background]"
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

      {/* Subtle Radial Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20">
        <div className="h-[35rem] w-[35rem] rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 blur-3xl transform-gpu" />
      </div>

      {/* ── TOP HUD HEADER ── */}
      <header className="relative z-30 w-full px-4 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-500">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Tooltip content="Systems operational • Available for engineering roles" side="bottom">
            <span className="flex items-center gap-2.5 cursor-help">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-300 font-semibold tracking-wider">RISHAB RAJ</span>
            </span>
          </Tooltip>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-500">SYSTEMS & AI ENGINEER</span>
        </div>

        <div className="flex items-center gap-4 text-[10px] sm:text-[11px]">
          <Tooltip content="Local time in New Delhi, India" side="bottom">
            <div className="flex items-center gap-1.5 text-zinc-400 cursor-help">
              <Radio className="h-3 w-3 text-emerald-400 shrink-0" />
              <span>DELHI, IN</span>
              <span className="text-zinc-600 hidden sm:inline">
                <LiveTime />
              </span>
            </div>
          </Tooltip>

          <div className="hidden md:flex items-center gap-1.5 text-zinc-600">
            <Tooltip content="Press '1' or 'S' key on keyboard to navigate" side="bottom">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-400 cursor-help">
                [1] STALKER
              </span>
            </Tooltip>
            <Tooltip content="Press '2' or 'F' key on keyboard to navigate" side="bottom" align="end">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-400 cursor-help">
                [2] FOUNDER
              </span>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* ── MAIN HERO & PROMPT ── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-5xl mx-auto w-full text-center">
        {/* Intro sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.4] }}
          transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
          className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-4"
        >
          &gt; Context dictates the experience.
        </motion.div>

        {/* The Main Question */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-sans text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-zinc-100"
        >
          What brings you here today?
        </motion.h1>

        {/* The Elevated Choice Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
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
              className="relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-white/10 bg-[#090909]/80 p-7 sm:p-8 transition-colors duration-300 hover:border-emerald-500/50 hover:bg-[#070e08]/90 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-xl transform-gpu"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400/80 tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>[01 // DEV_LOGS]</span>
                  </div>
                  <Tooltip content="Shortcut: Press '1' or 'S'" side="top">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                      KEY [1]
                    </span>
                  </Tooltip>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-sans text-xl sm:text-2xl font-medium text-white group-hover:text-emerald-300 transition-colors">
                      I&apos;m just a Stalker
                    </h2>
                  </div>
                </div>

                <p className="font-mono text-xs text-zinc-400 mt-2">
                  [ Just Stalking • The Hacker Perspective ]
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mt-3.5">
                  For curious devs, peers & late-night explorers. Check live Spotify telemetry, decrypt technical stacks, explore candid memories, and leave a permanent mark on the wall.
                </p>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <Tooltip content="Live Spotify track synchronization" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                      #LiveTelemetry
                    </span>
                  </Tooltip>
                  <Tooltip content="Real-time WebSockets & Socket.io" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                      #WebSockets
                    </span>
                  </Tooltip>
                  <Tooltip content="Leave public messages on live wall" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                      #DigitalWall
                    </span>
                  </Tooltip>
                  <Tooltip content="Cloudinary dynamic memories gallery" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-colors">
                      #Memories
                    </span>
                  </Tooltip>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-7 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500 group-hover:text-emerald-400 transition-colors">
                <span className="tracking-widest uppercase text-[11px]">&gt; Enter Terminal</span>
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
              className="relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-white/10 bg-[#090909]/80 p-7 sm:p-8 transition-colors duration-300 hover:border-white/40 hover:bg-[#0e0e0e]/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-xl transform-gpu"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>[02 // SYSTEMS_ROI]</span>
                  </div>
                  <Tooltip content="Shortcut: Press '2' or 'F'" side="top">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-zinc-500 group-hover:text-white group-hover:border-white/30 transition-colors">
                      KEY [2]
                    </span>
                  </Tooltip>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-zinc-200 group-hover:scale-105 transition-transform duration-300">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-sans text-xl sm:text-2xl font-medium text-white transition-colors">
                      I need a Builder
                    </h2>
                  </div>
                </div>

                <p className="font-mono text-xs text-zinc-400 mt-2">
                  [ Founders & Recruiters • Proof of Work ]
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mt-3.5">
                  For founders, recruiters, and engineering leaders. High-concurrency system design, scalable microservices, edge compute, and technical execution built for business impact.
                </p>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <Tooltip content="Distributed systems & schema indexing" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                      System Architecture
                    </span>
                  </Tooltip>
                  <Tooltip content="1M+ RPS Java socket engine benchmark" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                      High Concurrency
                    </span>
                  </Tooltip>
                  <Tooltip content="Gemini AI workflows & autonomous scraping" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                      Full-Stack AI
                    </span>
                  </Tooltip>
                  <Tooltip content="160+ Student branch scaling & national awards" side="top">
                    <span className="px-2 py-0.5 rounded-xs bg-white/[0.02] border border-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/20 transition-colors">
                      Technical Leadership
                    </span>
                  </Tooltip>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-7 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">
                <span className="tracking-widest uppercase text-[11px]">&gt; View Proof of Work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* ── FLOATING BOTTOM DOCK ── */}
      <footer className="relative z-30 w-full px-6 sm:px-12 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-2 text-zinc-600 text-[10px] sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <span>STACK: JAVA • SPRING BOOT • NODE.JS • REACT • NEXT.JS • AWS • DOCKER</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <Tooltip content="View latest resume PDF on Google Drive" side="top">
            <a
              href="https://drive.google.com/drive/folders/14FEmV08dBFJCtdYDF36QlUadfLI7OfLX?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 hover:border-white/30 hover:text-white transition-all"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
          </Tooltip>

          <Tooltip content="github.com/rishab2211 (Repositories & Code)" side="top">
            <a
              href="https://github.com/rishab2211"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 hover:border-white/30 hover:text-white transition-all"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 hover:border-white/30 hover:text-white transition-all"
            >
              <LinkedinIcon size={14} className="shrink-0" />
              <span>LinkedIn</span>
            </a>
          </Tooltip>

          <Tooltip content="rishab2211.hashnode.dev (Technical engineering blogs)" side="top">
            <a
              href="https://rishab2211.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Blogs</span>
            </a>
          </Tooltip>
        </div>
      </footer>
    </main>
  );
}
