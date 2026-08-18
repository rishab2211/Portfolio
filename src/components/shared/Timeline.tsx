"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineData } from "@/data/timeline";
import { Tooltip } from "@/components/shared/Tooltip";

interface TimelineProps {
  variant: "stalker" | "founder";
}

export function Timeline({ variant }: TimelineProps) {
  const [activeTab, setActiveTab] = useState<"academic" | "ieee">("academic");
  const isStalker = variant === "stalker";

  // Filter the data based on the active tab
  const filteredData = timelineData.filter((event) => event.category === activeTab);

  return (
    <div className="w-full">
      {/* HEADER & TABS SECTION */}
      <div
        className={`mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b ${
          isStalker ? "border-green-500/20" : "border-white/10"
        }`}
      >
        {/* Tab Buttons */}
        <div
          role="tablist"
          aria-label="Timeline Categories"
          className="flex gap-6 sm:gap-8 overflow-x-auto custom-scrollbar"
        >
          <Tooltip content="Software engineering roles & university education" side="top">
            <button
              role="tab"
              aria-selected={activeTab === "academic"}
              aria-controls="academic-tabpanel"
              id="tab-academic"
              onClick={() => setActiveTab("academic")}
              className={`pb-4 text-sm whitespace-nowrap transition-all duration-300 relative cursor-pointer ${
                activeTab === "academic"
                  ? isStalker
                    ? "text-green-400 font-mono font-medium"
                    : "text-white font-medium"
                  : isStalker
                  ? "text-green-500/40 hover:text-green-400 font-mono"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isStalker ? "./academics_and_experience.sh" : "Academics & Experience"}
              {/* Active Tab Indicator */}
              {activeTab === "academic" && (
                <motion.div
                  layoutId={`activeTabIndicator-${variant}`}
                  className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                    isStalker
                      ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                      : "bg-white"
                  }`}
                />
              )}
            </button>
          </Tooltip>

          <Tooltip content="IEEE MAIT leadership progression & national council honors" side="top">
            <button
              role="tab"
              aria-selected={activeTab === "ieee"}
              aria-controls="ieee-tabpanel"
              id="tab-ieee"
              onClick={() => setActiveTab("ieee")}
              className={`pb-4 text-sm whitespace-nowrap transition-all duration-300 relative cursor-pointer ${
                activeTab === "ieee"
                  ? isStalker
                    ? "text-green-400 font-mono font-medium"
                    : "text-white font-medium"
                  : isStalker
                  ? "text-green-500/40 hover:text-green-400 font-mono"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isStalker ? "./ieee_leadership.sh" : "IEEE Leadership & Honors"}
              {/* Active Tab Indicator */}
              {activeTab === "ieee" && (
                <motion.div
                  layoutId={`activeTabIndicator-${variant}`}
                  className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                    isStalker
                      ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                      : "bg-white"
                  }`}
                />
              )}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* TIMELINE TRACK */}
      <div
        id={`${activeTab}-tabpanel`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className={`relative border-l ml-2 sm:ml-4 ${
          isStalker ? "border-green-500/20" : "border-white/10"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredData.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="relative pl-6 sm:pl-8 pb-12 sm:pb-16 group last:pb-4 transform-gpu"
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
        </AnimatePresence>
      </div>
    </div>
  );
}
