"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Terminal as TerminalIcon,
  BrainCircuit,
  Zap,
  Users,
  Database,
  CloudFog,
  LayoutTemplate,
  Network,
  BookOpen,
  Radio,
  Sparkles,
  FileText,
  Cpu,
  Code2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Guestbook } from "./Guestbook";
import { Timeline } from "@/components/shared/Timeline";
import { Projects } from "@/components/shared/Projects";
import { PolaroidGallery } from "@/components/shared/PollaroidGallery";
import {
  GithubIcon,
  LinkedinIcon,
  SpotifyIcon,
  TwitterIcon,
} from "@/components/shared/SocialIcons";
import { Tooltip } from "@/components/shared/Tooltip";

type SpotifyData = {
  isPlaying: boolean;
  lastPlayed?: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
};

// Scanline + noise overlay (Desktop only for max mobile performance)
function CRTOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.02] transform-gpu hidden sm:block"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,255,100,0.1) 2px,
          rgba(0,255,100,0.1) 4px
        )`,
      }}
    />
  );
}

// Subtle grid background (Desktop only)
function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-25 hidden sm:block"
      style={{
        backgroundImage: `
          linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}

// Blinking cursor
function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0, 1] }}
      transition={{
        duration: 0.9,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.49, 0.5, 0.99, 1],
      }}
      className="inline-block w-2 h-3.5 bg-green-400 ml-1 align-middle"
    />
  );
}

// Section header
function SectionHeader({
  command,
  label,
  showCursor = false,
}: {
  command: string;
  label: string;
  showCursor?: boolean;
}) {
  return (
    <div className="mb-6 sm:mb-12 flex flex-col gap-1">
      <span className="font-mono text-[10px] sm:text-xs text-green-500/50 tracking-widest uppercase">
        {label}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-green-500/60 text-xs sm:text-sm">$</span>
        <span className="font-mono text-green-400 text-xs sm:text-base tracking-tight break-all">
          {command}
        </span>
        {showCursor && <Cursor />}
      </div>
      <div className="mt-2 h-px w-16 bg-gradient-to-r from-green-500/50 to-transparent" />
    </div>
  );
}

function SkillCard({
  icon,
  title,
  tech,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  tech: string;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefix = String(index + 1).padStart(2, "0");

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Tooltip content={isFlipped ? "Click to flip back" : "Click to view stack payload"} side="top" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        role="button"
        tabIndex={0}
        aria-label={`View skill ${prefix}: ${title}`}
        onKeyDown={handleKeyDown}
        className="relative h-28 sm:h-32 cursor-pointer group [perspective:1000px] w-full outline-none focus-visible:ring-1 focus-visible:ring-green-400 rounded-xl touch-manipulation"
        onClick={handleClick}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 240,
            damping: 24,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 w-full h-full rounded-xl border border-white/5 bg-[#080c08]/90 p-3.5 sm:p-4 flex flex-col justify-between [backface-visibility:hidden] overflow-hidden transition-all duration-300 hover:border-green-500/40 hover:bg-[#0c120c]">
            <div className="flex items-start justify-between w-full">
              <div className="flex items-center justify-center p-1.5 sm:p-2 rounded-lg bg-green-500/10 text-green-400">
                {icon}
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 group-hover:text-green-500/70 transition-colors">
                [{prefix}]
              </span>
            </div>

            <div>
              <h3 className="font-sans text-xs sm:text-sm font-medium text-white group-hover:text-green-300 transition-colors truncate">
                {title}
              </h3>
              <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 truncate mt-0.5 sm:mt-1">
                Tap to decrypt stack →
              </p>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 w-full h-full rounded-xl border border-green-500/40 bg-[#050805] p-3 sm:p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateX(180deg)] overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <div className="flex items-center justify-between border-b border-green-500/20 pb-1 shrink-0">
              <span className="font-mono text-[8px] sm:text-[9px] text-green-400 font-semibold uppercase tracking-wider truncate">
                {title}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
            </div>

            <p className="font-mono text-[10px] sm:text-[11px] text-green-300 leading-snug line-clamp-3">
              {tech}
            </p>

            <span className="font-mono text-[7px] sm:text-[8px] text-zinc-600 text-right uppercase">
              Tap to flip
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Tooltip>
  );
}

function SocialPill({
  url,
  label,
  icon,
  tooltip,
}: {
  url: string;
  label: string;
  icon?: React.ReactNode;
  tooltip: string;
}) {
  return (
    <Tooltip content={tooltip} side="top" className="w-full">
      <motion.a
        href={url}
        target={url.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 sm:px-4 py-2.5 sm:py-3 font-mono text-xs text-zinc-400 transition-all duration-200 hover:border-green-500/40 hover:bg-green-500/5 hover:text-green-300 w-full overflow-hidden"
      >
        <span className="shrink-0 text-zinc-400 group-hover:text-green-400">
          {icon}
        </span>
        <span className="truncate text-[11px] sm:text-xs">{label}</span>
        <span className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-green-500/60">
          →
        </span>
      </motion.a>
    </Tooltip>
  );
}

export default function StalkerPage() {
  const [time, setTime] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Rishab Raj Terminal Shell v2.4",
    "Type 'help' for commands, or 'exit' to return to UI.",
  ]);
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({
    isPlaying: false,
  });
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  const BOOT_SEQUENCE = [
    "> initializing session...",
    "> loading telemetry modules...",
    "> sync spotify bridge...",
    "> identity verified: Rishab Raj (SDE)",
  ];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setBootLines((prev) => [...prev, BOOT_SEQUENCE[i]]);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setBootDone(true), 250);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchSpotify = async () => {
      if (typeof document !== "undefined" && document.hidden) return;
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const data = (await res.json()) as SpotifyData;
          setSpotifyData(data);
        }
      } catch {
        // silent fail
      }
    };

    fetchSpotify();
    interval = setInterval(fetchSpotify, 15000);

    const handleVisibilityChange = () => {
      if (!document.hidden) fetchSpotify();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handlePinClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setEasterEggActive(true);
      setClickCount(0);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput("");

    if (!cmd) return;

    if (cmd === "exit" || cmd === "quit") {
      setEasterEggActive(false);
      return;
    }

    if (cmd === "clear") {
      setTerminalHistory([]);
      return;
    }

    let response = "";
    switch (cmd) {
      case "help":
        response =
          "Commands: whoami, experience, skills, projects, awards, spotify, exit, clear";
        break;
      case "whoami":
        response =
          "Rishab Raj • Software Development Engineer Intern @ Lolocab\nB.Tech in IT @ Maharaja Agrasen Institute of Technology (GPA 8.0)";
        break;
      case "experience":
        response =
          "Lolocab (Triptota Services Pvt. Ltd.) • SDE Intern (May 2026 - Present)\nBuilt carpooling search/booking engines, coupon APIs, and dynamic SEO pre-rendering.";
        break;
      case "skills":
        response =
          "Languages & Tech: Java, Spring Boot, Node.js, Express, React, Next.js, PostgreSQL, MongoDB, Cloudflare Workers, WebSockets, Python, Docker";
        break;
      case "projects":
        response =
          "1. AI Web Scraping Automation Tool (Next.js, Puppeteer, Gemini)\n2. ChatX Real-Time Chat (React, Node, MongoDB, Zustand)\n3. Multithreaded TCP Server (Java Sockets, 1M+ RPS)\n4. Social App Backend (Java, Spring Boot, PostgreSQL, JWT)";
        break;
      case "awards":
        response =
          "1. Dr. J.K. Pal Memorial Award (IEEE Delhi SSN, Jun 2026)\n2. Outstanding Student Branch Award (IEEE India Council, Dec 2025)";
        break;
      case "spotify":
        response = spotifyData.isPlaying
          ? `Playing: ${spotifyData.title} by ${spotifyData.artist}`
          : "Spotify is currently offline.";
        break;
      default:
        response = `Command not found: '${cmd}'. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, `$ ${cmd}`, response]);
  };

  if (easterEggActive) {
    return (
      <main className="min-h-screen bg-black p-4 sm:p-8 font-mono text-green-400 overflow-y-auto flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-green-500/30 pb-3 mb-4">
            <span className="text-xs sm:text-sm font-bold truncate">
              ~/rishab_terminal [SHELL]
            </span>
            <button
              onClick={() => setEasterEggActive(false)}
              className="text-xs px-2.5 py-1 bg-green-500/10 border border-green-500/40 rounded hover:bg-green-500/20 text-green-300"
            >
              [EXIT]
            </button>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            {terminalHistory.map((line, idx) => (
              <p key={idx} className="whitespace-pre-wrap leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleTerminalSubmit}
          className="mt-6 flex items-center gap-2 border-t border-green-500/20 pt-4"
        >
          <span className="text-green-500">$</span>
          <input
            autoFocus
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Type command ('help', 'projects', 'whoami')..."
            className="flex-1 bg-transparent text-green-300 font-mono text-xs sm:text-sm outline-none placeholder:text-green-500/30"
          />
        </form>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040604] text-zinc-300 selection:bg-green-500/30 selection:text-white">
      <CRTOverlay />
      <GridBackground />

      {/* Top Floating Nav */}
      <nav className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Tooltip content="Return to Gateway selection" side="right">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-[11px] rounded-full bg-[#070c07]/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-zinc-400 hover:text-green-400 hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/40 backdrop-blur-md transition-all uppercase tracking-widest shadow-lg"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            cd ..
          </Link>
        </Tooltip>
      </nav>

      {/* ── SECTION 1: HERO (AUTHENTIC DEVELOPER TERMINAL) ── */}
      <section className="relative flex min-h-[100dvh] items-center justify-center px-3.5 sm:px-8 py-20 lg:py-24">
        {/* Soft Ambient Glow (Desktop only) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[650px] rounded-full bg-green-500/[0.04] blur-[100px] pointer-events-none hidden sm:block" />

        <AnimatePresence mode="wait">
          {!bootDone ? (
            <motion.div
              key="boot"
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-xl border border-green-500/20 bg-black/90 p-5 sm:p-6 font-mono text-xs sm:text-sm backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[10px] sm:text-[11px] text-zinc-500 truncate">
                  ~/init_stalker.sh
                </span>
              </div>
              {bootLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`leading-relaxed py-0.5 text-xs sm:text-sm ${
                    i === bootLines.length - 1
                      ? "text-green-400 font-semibold"
                      : "text-green-500/40"
                  }`}
                >
                  {line}
                </motion.p>
              ))}
              {bootLines.length > 0 && <Cursor />}
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 w-full max-w-5xl"
            >
              {/* Terminal Window */}
              <div className="rounded-2xl border border-green-500/20 bg-[#060a06]/95 backdrop-blur-2xl shadow-2xl">
                {/* Title Bar */}
                <div className="rounded-t-2xl flex items-center justify-between px-3.5 sm:px-6 py-3 border-b border-green-500/15 bg-[#080e08] font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500/60" />
                    <span className="ml-1 sm:ml-2 text-[10px] sm:text-[11px] text-zinc-500 truncate max-w-[150px] xs:max-w-none">
                      rishab@delhi: ~/stalker
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Tooltip content="Click 3 times to reveal Easter egg shell" side="bottom">
                      <button
                        onClick={handlePinClick}
                        className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-green-300 transition-colors cursor-help"
                      >
                        <MapPin className="h-3 w-3 text-red-400" />
                        <span>Delhi, IN</span>
                        <span className="text-zinc-600">[{time}]</span>
                      </button>
                    </Tooltip>

                    <Tooltip content="Launch interactive terminal commands" side="bottom" align="end">
                      <button
                        onClick={() => setEasterEggActive(true)}
                        className="flex items-center gap-1 text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all cursor-pointer"
                      >
                        <TerminalIcon className="h-3 w-3 text-green-400" />
                        <span>Terminal</span>
                      </button>
                    </Tooltip>
                  </div>
                </div>

                {/* Main Hero Content */}
                <div className="rounded-b-2xl p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  {/* Left Column: Identity & Authentic Bio */}
                  <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-green-500/70 mb-1.5 sm:mb-2">
                        <span>$</span>
                        <span>whoami</span>
                      </div>
                      <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
                        Rishab Raj
                      </h1>
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-mono text-green-400">
                        Software Development Engineer Intern @ Lolocab
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-base text-zinc-300 font-light leading-relaxed border-l-2 border-green-500/40 pl-3.5 sm:pl-4 py-1">
                      I build high-concurrency Java socket servers, production
                      Node.js backends at <span className="text-white font-medium">Lolocab</span>,
                      and autonomous web automation pipelines with Gemini AI.
                      Previously scaled the <span className="text-white font-medium">IEEE MAIT</span> community
                      to 160+ student engineers in Delhi.
                    </p>

                    {/* Navigation Chips */}
                    <div className="pt-1 sm:pt-2">
                      <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest mb-2 sm:mb-3">
                        EXPLORE WORKFLOWS:
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 font-mono text-xs">
                        <a
                          href="#skills"
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-green-500/10 border border-green-500/25 text-green-300 hover:bg-green-500/20 text-[11px] sm:text-xs transition-all"
                        >
                          <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-400" />
                          <span>Stacks & Skills</span>
                        </a>

                        <a
                          href="#projects"
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-300 hover:border-green-500/40 hover:text-green-300 text-[11px] sm:text-xs transition-all"
                        >
                          <Cpu className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-400" />
                          <span>Projects</span>
                        </a>

                        <a
                          href="#timeline"
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-300 hover:border-green-500/40 hover:text-green-300 text-[11px] sm:text-xs transition-all"
                        >
                          <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-400" />
                          <span>Experience & Awards</span>
                        </a>

                        <a
                          href="#memories"
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-300 hover:border-green-500/40 hover:text-green-300 text-[11px] sm:text-xs transition-all"
                        >
                          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-400" />
                          <span>Memories</span>
                        </a>

                        <a
                          href="#guestbook"
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-300 hover:border-green-500/40 hover:text-green-300 text-[11px] sm:text-xs transition-all"
                        >
                          <Code2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-400" />
                          <span>Guestbook</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Telemetry & Bento Grid */}
                  <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                    {/* Live Spotify Card */}
                    <div className="rounded-xl border border-green-500/20 bg-[#091009] p-3.5 sm:p-4 font-mono w-full">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest mb-2.5 sm:mb-3 border-b border-green-500/10 pb-2">
                        <div className="flex items-center gap-2 text-green-400">
                          <SpotifyIcon size={14} className="text-green-400 shrink-0" />
                          <span className="truncate">
                            {spotifyData.isPlaying
                              ? "NOW PLAYING"
                              : spotifyData.lastPlayed
                              ? "LAST PLAYED"
                              : "SPOTIFY STATUS"}
                          </span>
                        </div>

                        {spotifyData.isPlaying && (
                          <div className="flex items-end gap-0.5 h-3 shrink-0">
                            <span className="w-1 bg-green-400 animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                            <span className="w-1 bg-green-400 animate-[pulse_0.4s_ease-in-out_infinite] h-3" />
                            <span className="w-1 bg-green-400 animate-[pulse_0.8s_ease-in-out_infinite] h-1.5" />
                            <span className="w-1 bg-green-400 animate-[pulse_0.5s_ease-in-out_infinite] h-2.5" />
                          </div>
                        )}
                      </div>

                      {spotifyData.isPlaying || spotifyData.lastPlayed ? (
                        <a
                          href={spotifyData.songUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-green-400 transition-colors truncate">
                            {spotifyData.title}
                          </p>
                          <p className="text-[11px] sm:text-xs text-zinc-400 truncate mt-0.5">
                            {spotifyData.artist}
                          </p>
                          <span className="text-[9px] sm:text-[10px] text-green-500/70 mt-1.5 sm:mt-2 inline-flex items-center gap-1 group-hover:text-green-400">
                            Open in Spotify →
                          </span>
                        </a>
                      ) : (
                        <div className="text-xs text-zinc-500 flex items-center gap-2 py-1">
                          <span className="h-2 w-2 rounded-full bg-zinc-700" />
                          <span>Spotify is idle</span>
                        </div>
                      )}
                    </div>

                    {/* 2x2 Telemetry Grid */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-3.5 w-full text-left">
                        <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                          CURRENT ROLE
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                          <span className="text-green-400 font-medium text-[10px] sm:text-[11px] truncate">
                            SDE @ Lolocab
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-3.5 w-full text-left">
                        <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                          EDUCATION
                        </span>
                        <span className="text-zinc-200 font-medium text-[10px] sm:text-[11px] truncate block">
                          B.Tech IT • GPA 8.0
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-3.5 w-full text-left">
                        <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                          COMMUNITY
                        </span>
                        <span className="text-zinc-200 font-medium text-[10px] sm:text-[11px] truncate block">
                          160+ MAIT Engineers
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-3.5 w-full text-left">
                        <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                          HONORS
                        </span>
                        <span className="text-green-400 font-medium text-[10px] sm:text-[11px] truncate block">
                          J.K. Pal & India Council
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-zinc-600 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-none"
        >
          <span>$ scroll_down</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-3 sm:h-4 w-px bg-gradient-to-b from-zinc-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── SECTION 2: SKILL MATRIX ── */}
      <section
        id="skills"
        className="relative py-12 sm:py-24 px-3.5 sm:px-8 bg-[#050805] border-t border-green-500/10"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            command="./view_skills.sh"
            label="technical architecture & stacks"
          />
          <div className="grid grid-cols-1 gap-2.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SkillCard
              index={0}
              icon={<BrainCircuit className="text-green-400 h-5 w-5" />}
              title="AI & Scraping Automation"
              tech="Next.js, Puppeteer, ReactFlow, Gemini AI, Cron jobs (85%+ extraction accuracy)"
            />
            <SkillCard
              index={1}
              icon={<Zap className="text-green-400 h-5 w-5" />}
              title="Real-Time Systems"
              tech="Node.js, Express.js, WebSockets, Socket.IO, JWT, Zustand, 99.9% uptime"
            />
            <SkillCard
              index={2}
              icon={<Database className="text-green-400 h-5 w-5" />}
              title="Backend & REST APIs"
              tech="Java, Spring Boot, PostgreSQL, Spring Security, JWT, 15+ secured endpoints"
            />
            <SkillCard
              index={3}
              icon={<CloudFog className="text-green-400 h-5 w-5" />}
              title="Cloud & Edge Runtimes"
              tech="Cloudflare Workers, HonoJS, OpenNext, AWS (S3, EC2), Docker"
            />
            <SkillCard
              index={4}
              icon={<LayoutTemplate className="text-green-400 h-5 w-5" />}
              title="Modern Frontend"
              tech="React.js, Next.js, Vite, TailwindCSS, Zustand, Framer Motion"
            />
            <SkillCard
              index={5}
              icon={<Network className="text-green-400 h-5 w-5" />}
              title="High Concurrency"
              tech="Java Socket Programming, Multi-Threading, Thread Pooling (1M+ RPS benchmark)"
            />
            <SkillCard
              index={6}
              icon={<TerminalIcon className="text-green-400 h-5 w-5" />}
              title="Systems & Tooling"
              tech="Ubuntu Linux, Bash, Git, Postman, IntelliJ Ultimate, VS Code"
            />
            <SkillCard
              index={7}
              icon={<Users className="text-green-400 h-5 w-5" />}
              title="Leadership & Scale"
              tech="Scaled IEEE MAIT <10 to 160+ members, 2000+ outreach, Agentic AI Hackathon"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PROOF OF WORK ── */}
      <section
        id="projects"
        className="relative py-12 sm:py-24 px-3.5 sm:px-8 border-t border-green-500/10"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            command="./view_projects.sh"
            label="featured systems & projects"
          />
          <Projects variant="stalker" />
        </div>
      </section>

      {/* ── SECTION 4: TIMELINE / EXPERIENCE ── */}
      <section
        id="timeline"
        className="relative py-12 sm:py-24 px-3.5 sm:px-8 bg-[#050805] border-t border-green-500/10"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            command="./cat_experience.log"
            label="experience & honors"
          />
          <Timeline variant="stalker" />
        </div>
      </section>

      {/* ── SECTION 5: MEMORIES GALLERY ── */}
      <section
        id="memories"
        className="relative py-12 sm:py-24 px-3.5 sm:px-8 border-t border-green-500/10 overflow-hidden"
      >
        <PolaroidGallery />
      </section>

      {/* ── SECTION 6: GUESTBOOK ── */}
      <section
        id="guestbook"
        className="relative py-12 sm:py-24 px-3.5 sm:px-8 bg-[#050805] border-t border-green-500/10"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            command="./sign_guestbook.sh"
            label="digital guestbook"
            showCursor
          />
          <Guestbook />
        </div>
      </section>

      {/* ── SECTION 7: EXTERNAL NODES ── */}
      <section className="relative py-12 sm:py-24 px-3.5 sm:px-8 border-t border-green-500/10 bg-black">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            command="./connect_socials.sh"
            label="links & contact"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
            <SocialPill
              url="https://github.com/rishab2211"
              label="github.com/rishab2211"
              icon={<GithubIcon size={18} />}
              tooltip="View GitHub profile, commits & source code"
            />
            <SocialPill
              url="https://linkedin.com/in/rishab2211"
              label="linkedin.com/in/rishab2211"
              icon={<LinkedinIcon size={18} />}
              tooltip="Connect with Rishab on LinkedIn"
            />
            <SocialPill
              url="https://rishab2211.hashnode.dev"
              label="rishab2211.hashnode.dev"
              icon={<BookOpen className="h-4 w-4 text-green-400" />}
              tooltip="Read technical engineering blogs on Hashnode"
            />
            <SocialPill
              url="https://x.com/Rshb_twts"
              label="x.com/Rshb_twts"
              icon={<TwitterIcon size={18} />}
              tooltip="Follow on X (Twitter) @Rshb_twts"
            />
            <SocialPill
              url="mailto:rishabraj2211@gmail.com"
              label="rishabraj2211@gmail.com"
              icon={<Radio className="h-4 w-4 text-green-400" />}
              tooltip="Send email directly to rishabraj2211@gmail.com"
            />
            <SocialPill
              url="https://drive.google.com/drive/folders/14FEmV08dBFJCtdYDF36QlUadfLI7OfLX?usp=sharing"
              label="resume_latest.pdf"
              icon={<FileText className="h-4 w-4 text-green-400" />}
              tooltip="Open latest resume PDF in Google Drive"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/10 py-6 sm:py-8 px-4 text-center font-mono text-[10px] text-zinc-600">
        <p>Rishab Raj • Portfolio Stalker Mode • Built with Next.js & TailwindCSS</p>
      </footer>
    </main>
  );
}
