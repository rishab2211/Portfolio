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
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { useState, useEffect } from "react";
import { Guestbook } from "./Guestbook";
import { Timeline } from "@/components/shared/Timeline";
import { Projects } from "@/components/shared/Projects";
import { PolaroidGallery } from "@/components/shared/PollaroidGallery";

type SpotifyData = {
  isPlaying: boolean;
  lastPlayed?: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
};

// Scanline + noise overlay
function CRTOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,255,100,0.15) 2px,
          rgba(0,255,100,0.15) 4px
        )`,
      }}
    />
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
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
        duration: 1,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.49, 0.5, 0.99, 1],
      }}
      className="inline-block w-2 h-4 bg-green-400 ml-0.5 align-middle"
    />
  );
}

// Terminal-style section header
function SectionHeader({ command, label }: { command: string; label: string }) {
  return (
    <div className="mb-8 sm:mb-12 flex flex-col gap-1">
      <span className="font-mono text-[10px] sm:text-xs text-green-500/40 tracking-widest uppercase">
        {label}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-green-500/60 text-xs sm:text-sm">
          $
        </span>
        <span className="font-mono text-green-400 text-base sm:text-lg tracking-tight break-all">
          {command}
        </span>
        <Cursor />
      </div>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-green-500/50 to-transparent" />
    </div>
  );
}

function SkillCard({
  icon,
  front,
  back,
  index,
}: {
  icon: React.ReactNode;
  front: string;
  back: string;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const prefixes = ["01", "02", "03", "04", "05", "06", "07", "08"];

  const handleClick = () => {
    // If it's already showing the back, flip it to the front immediately
    if (isFlipped) {
      setIsFlipped(false);
      return;
    }

    // Prevent spam clicking while animation is running
    if (isDecrypting) return;

    // Trigger the progress bar fill animation
    setIsDecrypting(true);

    // Wait for the bar to fill (500ms), then flip the card
    setTimeout(() => {
      setIsFlipped(true);
      setIsDecrypting(false); // Reset state for the next time it flips back
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      // Locked at h-32 for perfect grid alignment
      className="relative h-32 cursor-pointer group [perspective:1000px] w-full"
      onClick={handleClick}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* --- FRONT: DENSE DASHBOARD WIDGET --- */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl border bg-[#080808] p-3 sm:p-4 flex flex-col justify-between [backface-visibility:hidden] overflow-hidden transition-all duration-300 ${
            isDecrypting
              ? "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              : "border-white/5 lg:group-hover:border-green-500/30 lg:group-hover:bg-[#0a0a0a]"
          }`}
        >
          {/* Top Row: Icon & Meta */}
          <div className="flex items-start justify-between w-full">
            <div
              className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDecrypting
                  ? "bg-green-500/20 text-green-400"
                  : "bg-white/[0.02] text-zinc-500 lg:group-hover:bg-green-500/10 lg:group-hover:text-green-400"
              }`}
            >
              {icon}
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`font-mono text-[9px] sm:text-[10px] transition-colors ${
                  isDecrypting
                    ? "text-green-500/80"
                    : "text-zinc-600 lg:group-hover:text-green-500/50"
                }`}
              >
                NODE_{prefixes[index]}
              </span>
              <span
                className={`font-mono text-[7px] sm:text-[8px] mt-0.5 transition-colors ${
                  isDecrypting ? "text-green-500/50" : "text-zinc-700"
                }`}
              >
                {isDecrypting ? "DECRYPTING" : "SECURE"}
              </span>
            </div>
          </div>

          {/* Bottom Row: Command & Progress Bar */}
          <div className="w-full space-y-1.5 sm:space-y-2">
            <p
              className={`font-mono text-[11px] sm:text-xs line-clamp-2 leading-tight transition-colors ${
                isDecrypting
                  ? "text-green-400"
                  : "text-zinc-300 lg:group-hover:text-white"
              }`}
            >
              {front}
            </p>

            <div className="flex items-center gap-2 w-full">
              {/* Animated loading bar */}
              <div className="h-1 flex-1 bg-white/[0.02] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-out ${
                    isDecrypting
                      ? "w-full bg-green-500/80"
                      : "w-1/3 bg-green-500/30 lg:group-hover:w-full lg:group-hover:bg-green-500/60"
                  }`}
                />
              </div>
              <span
                className={`font-mono text-[7px] sm:text-[8px] shrink-0 uppercase tracking-widest transition-colors ${
                  isDecrypting
                    ? "text-green-500"
                    : "text-zinc-500 lg:group-hover:text-green-500/60"
                }`}
              >
                {isDecrypting ? "Decrypting..." : "Decrypt"}
              </span>
            </div>
          </div>
        </div>

        {/* --- BACK: DECRYPTED PAYLOAD --- */}
        <div className="absolute inset-0 w-full h-full rounded-xl border border-green-500/40 bg-[#050505] p-3 sm:p-4 flex flex-col [backface-visibility:hidden] [transform:rotateX(180deg)] overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          {/* Back Header */}
          <div className="flex items-center justify-between border-b border-green-500/20 pb-1.5 sm:pb-2 mb-1.5 sm:mb-2 shrink-0">
            <span className="font-mono text-[8px] sm:text-[9px] text-green-500/60 uppercase tracking-widest">
              Payload_Extracted
            </span>
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500/80 animate-pulse" />
            </span>
          </div>

          {/* Back Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex items-start sm:items-center">
            <p className="font-mono text-[10px] sm:text-xs text-green-400/90 leading-relaxed pt-1 sm:pt-0">
              {back}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Social link pill
function SocialPill({ url, label }: { url: string; label: string }) {
  return (
    <motion.a
      href={url}
      target={url.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 sm:px-4 py-2.5 font-mono text-xs text-zinc-500 transition-all duration-200 hover:border-green-500/40 hover:bg-green-500/5 hover:text-green-400 w-full overflow-hidden"
    >
      <SocialIcon
        url={url}
        bgColor="transparent"
        fgColor="currentColor"
        style={{ height: 18, width: 18 }}
        className="shrink-0"
        as="span"
      />
      <span className="truncate">{label}</span>
      <span className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-green-500/50">
        →
      </span>
    </motion.a>
  );
}

export default function StalkerPage() {
  const [time, setTime] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({
    isPlaying: false,
  });
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  const BOOT_SEQUENCE = [
    "> initializing profile.sh...",
    "> loading telemetry modules...",
    "> establishing spotify link...",
    "> decrypting identity...",
    "> access granted. welcome.",
  ];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setBootLines((prev) => [...prev, BOOT_SEQUENCE[i]]);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setBootDone(true), 400);
      }
    }, 280);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        }) + " IST",
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data = (await res.json()) as SpotifyData;
        setSpotifyData(data);
      } catch (error) {
        console.error("Failed to fetch Spotify data", error);
      }
    };
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePinClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 2) {
      setEasterEggActive(true);
      setClickCount(0);
    }
  };

  if (easterEggActive) {
    return (
      <main className="min-h-screen bg-black p-4 sm:p-8 font-mono text-green-500 overflow-hidden">
        <p className="text-xs sm:text-sm">
          {">"} Accessing ~/classified_memories/blooper_reel
        </p>
        <p className="mt-4 text-xs sm:text-sm opacity-50">
          Loading unedited hackathon footage...
        </p>
        <button
          onClick={() => setEasterEggActive(false)}
          className="mt-8 text-xs sm:text-sm hover:text-white hover:underline"
        >
          {">"} exit
        </button>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-zinc-300 selection:bg-green-500/30 selection:text-black">
      <CRTOverlay />
      <GridBackground />

      {/* Nav */}
      <nav className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[10px] sm:text-xs rounded-md bg-black/50 px-3 py-1.5 text-zinc-500 hover:text-green-400 hover:bg-green-500/10 border border-transparent hover:border-green-500/20 backdrop-blur-md transition-all uppercase tracking-widest"
        >
          <ArrowLeft className="h-3 w-3" />
          cd ..
        </Link>
      </nav>

      {/* ── SECTION 1: HERO + TELEMETRY ── */}
      <section className="relative flex min-h-[100dvh] items-center justify-center px-4 py-20 sm:px-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-green-500/[0.04] blur-3xl" />

        <AnimatePresence mode="wait">
          {!bootDone ? (
            <motion.div
              key="boot"
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg rounded-xl border border-green-500/20 bg-black/80 p-4 sm:p-6 font-mono text-xs sm:text-sm backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[10px] sm:text-xs text-zinc-600">
                  profile.sh
                </span>
              </div>
              {bootLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`leading-relaxed py-0.5 ${i === bootLines.length - 1 ? "text-green-400" : "text-green-500/40"}`}
                >
                  {line}
                </motion.p>
              ))}
              {bootLines.length > 0 && <Cursor />}
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full max-w-lg"
            >
              <div className="hidden sm:block absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-green-500/40" />
              <div className="hidden sm:block absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-green-500/40" />
              <div className="hidden sm:block absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-green-500/40" />
              <div className="hidden sm:block absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-green-500/40" />

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8 backdrop-blur-md">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] sm:text-xs text-green-500/50 mb-1 tracking-widest">
                      SUBJECT_ID: RR-001
                    </p>
                    <h1 className="font-sans text-2xl sm:text-3xl font-medium text-white tracking-tight">
                      Rishab Raj
                    </h1>
                  </div>
                  <button
                    onClick={handlePinClick}
                    className="self-start sm:self-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] sm:text-xs text-zinc-500 hover:border-green-500/30 hover:text-green-400 transition-all"
                  >
                    <MapPin className="h-3 w-3 text-red-400 shrink-0" />
                    Delhi, IN
                  </button>
                </div>

                <p className="mb-8 font-sans text-sm sm:text-base text-zinc-400 leading-relaxed border-l-2 border-green-500/20 pl-4">
                  I engineer intelligent systems that think before they speak,
                  and build communities that empower the next generation of
                  builders.
                </p>

                <div className="space-y-0 border border-white/[0.06] rounded-lg overflow-hidden font-mono text-[10px] sm:text-xs">
                  {[
                    {
                      key: "SYS.TIME",
                      value: (
                        <span className="text-zinc-300">
                          {time || "syncing..."}
                        </span>
                      ),
                    },
                    {
                      key: "STATUS",
                      value: (
                        <span className="flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                          </span>
                          <span className="text-green-400 truncate">
                            Compiling next chapter
                          </span>
                        </span>
                      ),
                    },
                    {
  key: spotifyData.isPlaying
    ? "NOW_PLAYING"
    : spotifyData.lastPlayed
      ? "LAST_PLAYED"
      : "NOW_PLAYING",
  value: spotifyData.isPlaying ? (
    <a
      href={spotifyData.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 text-zinc-300 hover:text-green-400 transition-colors max-w-[140px] sm:max-w-[200px]"
    >
      {/* Spotify Icon - Increased to 20x20 and vertically centered */}
      <SocialIcon
        network="spotify"
        as="span"
        style={{ height: 20, width: 20 }}
        fgColor="currentColor"
        bgColor="transparent"
        className="shrink-0 self-center text-2xl"
      />
      <span className="truncate flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
        </span>
        <span className="truncate">
          {spotifyData.title}
        </span>
        <span className="text-zinc-600 truncate">
          — {spotifyData.artist}
        </span>
      </span>
    </a>
  ) : spotifyData.lastPlayed ? (
    <a
      href={spotifyData.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 hover:text-zinc-300 transition-colors max-w-[140px] sm:max-w-[200px]"
    >
      {/* Spotify Icon - Increased to 20x20 and vertically centered */}
      <SocialIcon
        network="spotify"
        as="span"
        style={{ height: 20, width: 20 }}
        fgColor="currentColor"
        bgColor="transparent"
        className="shrink-0 text-2xl self-center opacity-50 group-hover:opacity-100"
      />
      <span className="flex flex-col truncate">
        <span className="truncate text-zinc-500">
          {spotifyData.title}{" "}
          <span className="text-zinc-700">
            — {spotifyData.artist}
          </span>
        </span>
        <span className="text-zinc-700 text-[8px] sm:text-[10px] leading-tight">
          last played
        </span>
      </span>
    </a>
  ) : (
    <span className="flex items-center gap-1.5 text-zinc-600">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 shrink-0" />
      offline
    </span>
  ),
}
                  ].map((row, i, arr) => (
                    <div
                      key={row.key}
                      className={`flex items-center justify-between px-3 sm:px-4 py-3 ${
                        i < arr.length - 1 ? "border-b border-white/[0.04]" : ""
                      } ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                    >
                      <span className="text-zinc-600 shrink-0 mr-2">
                        {row.key}
                      </span>
                      {row.value}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-xs text-zinc-700 flex flex-col items-center gap-2"
        >
          <span>scroll_down</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-3 sm:h-4 w-px bg-gradient-to-b from-zinc-700 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── SECTION 2: SKILL MATRIX ── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a] border-t border-white/[0.04]">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            command="./execute_skill_matrix.sh"
            label="architecture"
          />
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SkillCard
              index={0}
              icon={<BrainCircuit className="text-green-500/70 h-5 w-5" />}
              front="> kill -9 hallucinations"
              back="Agentic AI, RAG Pipelines, FastAPI, Gemini AI"
            />
            <SkillCard
              index={1}
              icon={<Zap className="text-green-500/70 h-5 w-5" />}
              front="WS:// zero_latency"
              back="Real-Time Systems, Node.js, Express, WebSockets, Socket.IO"
            />
            <SkillCard
              index={2}
              icon={<Database className="text-green-500/70 h-5 w-5" />}
              front="Relational_Mechanics"
              back="Spring Boot, Java, PostgreSQL, MongoDB, Prisma ORM"
            />
            <SkillCard
              index={3}
              icon={<CloudFog className="text-green-500/70 h-5 w-5" />}
              front="Deploying_To_Edge"
              back="Serverless Architecture, Cloudflare Workers, HonoJS"
            />
            <SkillCard
              index={4}
              icon={<LayoutTemplate className="text-green-500/70 h-5 w-5" />}
              front="DOM_Manipulation"
              back="React.js, Next.js, Tailwind CSS, Zustand State Control"
            />
            <SkillCard
              index={5}
              icon={<Network className="text-green-500/70 h-5 w-5" />}
              front="Thread_Pool_Saturation"
              back="High-Concurrency Systems, Java Multi-threading, Socket Programming"
            />
            <SkillCard
              index={6}
              icon={<TerminalIcon className="text-green-500/70 h-5 w-5" />}
              front="root@ubuntu:~#"
              back="Ubuntu Linux, Bash Scripting, IntelliJ IDEA Ultimate"
            />
            <SkillCard
              index={7}
              icon={<Users className="text-green-500/70 h-5 w-5" />}
              front="> sudo restructure"
              back="Engineering Mentorship, Event Logistics, Hackathon Architecture"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PROJECTS ── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader command="ls -la ./projects/" label="proof_of_work" />
          <Projects variant="stalker" />
        </div>
      </section>

      {/* ── SECTION 4: TIMELINE ── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-green-500/[0.02] to-transparent">
        <div className="mx-auto max-w-5xl">
          <SectionHeader command="git log --oneline" label="commit_history" />
          <Timeline variant="stalker" />
        </div>
      </section>

      {/* ── SECTION 5: MEMORIES ── */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            command="./memories.sh --play"
            label="classified_memories"
          />
        </div>
        <PolaroidGallery />
      </section>

      {/* ── SECTION 6: SOCIALS ── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 border-t border-white/[0.04] bg-[#0a0a0a]">
        <div className="mx-auto max-w-lg">
          <SectionHeader
            command="./ping_target.sh --all"
            label="network_interfaces"
          />

          <p className="font-mono text-xs sm:text-sm text-zinc-500 mb-8 leading-relaxed">
            Slide into the inbox. Judge the late-night commits. Read unhinged
            thoughts on X. Don't be a stranger.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:gap-2 sm:grid-cols-2">
            <SocialPill
              url="https://github.com/rishab2211"
              label="github/rishab2211"
            />
            <SocialPill url="https://x.com/Rshb_twts" label="x/Rshb_twts" />
            <SocialPill
              url="https://www.instagram.com/_rishabh_22/"
              label="ig/_rishabh_22"
            />
            <SocialPill
              url="mailto:rishabraj2211@gmail.com"
              label="rishabraj2211@gmail.com"
            />
          </div>

          <div className="mt-12 rounded-lg border border-white/[0.04] bg-black/40 p-4 font-mono text-[10px] sm:text-xs text-zinc-700">
            <p>
              <span className="text-green-500/50">$</span> uptime
            </p>
            <p className="mt-1 text-zinc-600 leading-relaxed">
              system online since Nov 2003 · host: Acer Swift 3 SF314-512
              (Ubuntu)
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: GUESTBOOK ── */}
      <section className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-4">
          <SectionHeader command="vim ./guestbook.txt" label="leave_a_trace" />
        </div>
        <Guestbook />
      </section>
    </main>
  );
}
