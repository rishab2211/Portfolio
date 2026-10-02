"use client";

import { motion } from "framer-motion";

interface OriginStoryProps {
  variant: "stalker" | "founder";
}

export function OriginStory({ variant }: OriginStoryProps) {
  const isStalker = variant === "stalker";

  const paragraphs = [
    {
      label: "how it started",
      text: "Class 10. A Python tutorial. I wrote a loop that printed numbers and thought — wait, the computer is actually *doing* what I told it to. That was the moment. I went down the rabbit hole: how does the internet work? What actually happens when you type a URL? I read everything I could find and decided — I'm going to be an engineer.",
    },
    {
      label: "what pulled me deeper",
      text: "Joined MAIT in 2022. Started with Java, DSA, then web dev. Got obsessed with how scalable backends work under load, how operating systems schedule threads, how sockets actually move bytes. I wanted to understand things at the layer most people skip. Still do.",
    },
    {
      label: "the realization",
      text: "But somewhere in 2023 I realized: pure technical depth isn't enough. The engineers who actually move things are the ones who can communicate, build trust, and get people to believe in a direction. So I walked into IEEE MAIT as a volunteer with no credentials — and figured it out from there.",
    },
  ];

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {paragraphs.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className={`group relative pl-5 border-l-2 transition-all duration-300 ${
            isStalker
              ? "border-green-500/25 hover:border-green-400/60"
              : "border-white/15 hover:border-white/40"
          }`}
        >
          {/* Label */}
          <span
            className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-widest block mb-1.5 transition-colors ${
              isStalker
                ? "text-green-500/50 group-hover:text-green-400/70"
                : "text-zinc-600 group-hover:text-zinc-500"
            }`}
          >
            {isStalker ? `// ${p.label}` : p.label}
          </span>

          {/* Text */}
          <p
            className={`leading-relaxed transition-colors ${
              isStalker
                ? "font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-300"
                : "font-sans text-sm sm:text-base text-zinc-400 font-light group-hover:text-zinc-300"
            }`}
          >
            {p.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
