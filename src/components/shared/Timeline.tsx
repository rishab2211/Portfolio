"use client";

import { motion } from "framer-motion";
import { timelineData } from "@/data/timeline";

interface TimelineProps {
  variant: "stalker" | "founder";
}

export function Timeline({ variant }: TimelineProps) {
  const isStalker = variant === "stalker";

  // Filter for academic & professional career track (IEEE is fully covered in IEEEImpact)
  const careerData = timelineData.filter((event) => event.category === "academic");

  return (
    <div className="w-full">
      {/* TIMELINE TRACK */}
      <div
        className={`relative border-l ml-2 sm:ml-4 ${
          isStalker ? "border-green-500/20" : "border-white/10"
        }`}
      >
        {careerData.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="relative pl-6 sm:pl-8 pb-10 sm:pb-14 group last:pb-2 transform-gpu"
          >
            {/* TIMELINE NODE DOT */}
            <div
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                isStalker
                  ? "border-green-500 bg-[#050505] group-hover:bg-green-400 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                  : "border-white bg-[#050505] group-hover:bg-white group-hover:scale-125"
              }`}
            />

            {/* TIMELINE CONTENT CARD */}
            <div
              className={`p-5 sm:p-6 rounded-lg transition-all duration-300 ${
                isStalker
                  ? "border border-green-500/10 bg-[#080808]/60 hover:border-green-500/30 hover:bg-[#0a0a0a]"
                  : "border border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03]"
              }`}
            >
              {/* Meta details */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span
                  className={`font-mono text-xs ${
                    isStalker ? "text-green-500/80" : "text-zinc-500 font-medium"
                  }`}
                >
                  {event.date}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`text-lg sm:text-xl font-medium mb-3 ${
                  isStalker
                    ? "text-zinc-200 group-hover:text-green-300 font-mono transition-colors"
                    : "text-white"
                }`}
              >
                {event.title}
              </h3>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isStalker
                    ? "font-mono text-zinc-400 text-xs sm:text-sm"
                    : "font-sans text-zinc-400 font-light"
                }`}
              >
                {isStalker ? event.stalkerText : event.founderText}
              </p>

              {/* Tech tags / Badges */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded font-mono ${
                        isStalker
                          ? "bg-green-500/5 text-green-400/80 border border-green-500/20"
                          : "bg-white/5 text-zinc-400 border border-white/10"
                      }`}
                    >
                      {isStalker ? `#${tag}` : tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
