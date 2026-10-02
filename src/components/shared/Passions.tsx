"use client";

import { motion } from "framer-motion";
import { Music, TrendingUp, Brain, Code2 } from "lucide-react";

interface PassionsProps {
  variant: "stalker" | "founder";
}

const passions = [
  {
    icon: Music,
    title: "Music",
    stalker:
      "// Not background noise — it's how I think. The structure of a good track and the structure of a good system aren't that different.",
    founder:
      "Music is how I decompress and how I focus. There's a pattern-recognition thing that carries over into architecture work.",
    color: "emerald",
    accentStalker: "text-emerald-400",
    borderStalker: "border-emerald-500/25 hover:border-emerald-400/60 hover:bg-emerald-500/[0.03]",
    bgIconStalker: "bg-emerald-500/10 text-emerald-400",
    borderFounder: "border-white/10 hover:border-white/25",
    bgIconFounder: "bg-white/[0.04] text-zinc-300",
  },
  {
    icon: TrendingUp,
    title: "Business",
    stalker:
      "// I read about companies the way I read about systems. How does it scale? What's the bottleneck? What breaks first?",
    founder:
      "I think about leverage, distribution, and compounding. Engineering is interesting, but the business layer is where impact actually gets multiplied.",
    color: "blue",
    accentStalker: "text-blue-400",
    borderStalker: "border-blue-500/25 hover:border-blue-400/60 hover:bg-blue-500/[0.03]",
    bgIconStalker: "bg-blue-500/10 text-blue-400",
    borderFounder: "border-white/10 hover:border-white/25",
    bgIconFounder: "bg-white/[0.04] text-zinc-300",
  },
  {
    icon: Brain,
    title: "Psychology",
    stalker:
      "// People are the hardest distributed system to debug. Understanding why people do what they do is directly useful for leadership and product.",
    founder:
      "Psychology is the operating system of teams and products. You can't build something people love without understanding what drives them.",
    color: "violet",
    accentStalker: "text-violet-400",
    borderStalker: "border-violet-500/25 hover:border-violet-400/60 hover:bg-violet-500/[0.03]",
    bgIconStalker: "bg-violet-500/10 text-violet-400",
    borderFounder: "border-white/10 hover:border-white/25",
    bgIconFounder: "bg-white/[0.04] text-zinc-300",
  },
  {
    icon: Code2,
    title: "Tech",
    stalker:
      "// Obviously. But specifically: how things actually work one layer below where most people look. Sockets, schedulers, edge runtimes.",
    founder:
      "Not just building — understanding. I want to know why the abstraction exists, not just use it. The best engineers know what's underneath.",
    color: "green",
    accentStalker: "text-green-400",
    borderStalker: "border-green-500/25 hover:border-green-400/60 hover:bg-green-500/[0.03]",
    bgIconStalker: "bg-green-500/10 text-green-400",
    borderFounder: "border-white/10 hover:border-white/25",
    bgIconFounder: "bg-white/[0.04] text-zinc-300",
  },
];

export function Passions({ variant }: PassionsProps) {
  const isStalker = variant === "stalker";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
      {passions.map((passion, i) => {
        const Icon = passion.icon;
        return (
          <motion.div
            key={passion.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className={`group relative rounded-xl border p-4 sm:p-5 transition-all duration-300 cursor-default ${
              isStalker ? passion.borderStalker : passion.borderFounder
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                  isStalker ? passion.bgIconStalker : passion.bgIconFounder
                }`}
              >
                <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </div>
              <h3
                className={`font-${isStalker ? "mono" : "sans"} text-sm sm:text-base font-medium transition-colors ${
                  isStalker
                    ? `text-zinc-200 group-hover:${passion.accentStalker}`
                    : "text-white"
                }`}
              >
                {passion.title}
              </h3>
            </div>

            {/* Text */}
            <p
              className={`leading-relaxed transition-colors ${
                isStalker
                  ? "font-mono text-[11px] sm:text-xs text-zinc-500 group-hover:text-zinc-400"
                  : "font-sans text-xs sm:text-sm text-zinc-500 font-light group-hover:text-zinc-400"
              }`}
            >
              {isStalker ? passion.stalker : passion.founder}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
