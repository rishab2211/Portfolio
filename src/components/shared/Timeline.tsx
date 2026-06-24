"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineData } from "@/data/timeline";

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
      <div className={`mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b ${isStalker ? "border-green-500/20" : "border-white/10"}`}>
        
        {/* Tab Buttons */}
        <div className="flex gap-6 sm:gap-8 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("academic")}
            className={`pb-4 text-sm whitespace-nowrap transition-all duration-300 relative ${
              activeTab === "academic"
                ? isStalker 
                  ? "text-green-400 font-mono" 
                  : "text-white font-medium"
                : isStalker
                  ? "text-green-500/40 hover:text-green-400 font-mono"
                  : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {isStalker ? "./academics.sh" : "Academics & Career"}
            {/* Active Tab Indicator */}
            {activeTab === "academic" && (
              <motion.div 
                layoutId={`activeTabIndicator-${variant}`}
                className={`absolute bottom-0 left-0 right-0 h-[2px] ${isStalker ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-white"}`} 
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("ieee")}
            className={`pb-4 text-sm whitespace-nowrap transition-all duration-300 relative ${
              activeTab === "ieee"
                ? isStalker 
                  ? "text-green-400 font-mono" 
                  : "text-white font-medium"
                : isStalker
                  ? "text-green-500/40 hover:text-green-400 font-mono"
                  : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {isStalker ? "./ieee_journey.sh" : "IEEE Leadership"}
            {/* Active Tab Indicator */}
            {activeTab === "ieee" && (
              <motion.div 
                layoutId={`activeTabIndicator-${variant}`}
                className={`absolute bottom-0 left-0 right-0 h-[2px] ${isStalker ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-white"}`} 
              />
            )}
          </button>
        </div>
      </div>

      {/* TIMELINE TRACK */}
      <div className={`relative border-l ml-2 sm:ml-4 ${isStalker ? "border-green-500/20" : "border-white/10"}`}>
        <AnimatePresence mode="popLayout">
          {filteredData.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 10, filter: "blur(5px)" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="mb-12 ml-6 sm:ml-10 relative group"
            >
              {/* THE NODE (Square for Stalker, Diamond for Founder) */}
              <div className={`absolute top-1.5 transition-all duration-300 ${
                isStalker 
                  ? "-left-[29px] sm:-left-[45px] h-2 w-2 bg-green-500/50 group-hover:bg-green-400 group-hover:shadow-[0_0_12px_rgba(34,197,94,0.8)]" 
                  : "-left-[28px] sm:-left-[44px] h-1.5 w-1.5 bg-zinc-600 rotate-45 group-hover:bg-white group-hover:scale-125"
              }`} />
              
              {/* CONTENT CONTAINER */}
              <div className="flex flex-col gap-2">
                {/* Date */}
                <span className={isStalker ? "text-green-500/50 font-mono text-[10px] sm:text-xs" : "text-zinc-500 font-mono text-[10px] tracking-widest uppercase"}>
                  {event.date}
                </span>
                
                {/* Title */}
                <h3 className={`text-xl sm:text-2xl transition-colors ${
                  isStalker ? "text-white font-mono font-bold" : "text-zinc-200 group-hover:text-white font-medium tracking-tight"
                }`}>
                  {event.title}
                </h3>
                
                {/* Description */}
                <p className={`mt-2 ${
                  isStalker 
                    ? "text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed" 
                    : "text-zinc-400 text-sm sm:text-base leading-relaxed font-light border-l border-white/10 pl-4 group-hover:border-zinc-500 group-hover:text-zinc-300 transition-colors"
                }`}>
                  {isStalker ? event.stalkerText : event.founderText}
                </p>

                {/* TAGS (Newly Integrated) */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {event.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className={`px-2.5 py-1 transition-colors ${
                          isStalker 
                            ? "text-[10px] font-mono text-green-500 border border-green-500/20 bg-green-500/5 group-hover:bg-green-500/10 rounded-sm" 
                            : "text-[9px] sm:text-[10px] font-mono text-zinc-500 border border-white/10 uppercase tracking-widest group-hover:border-white/20 group-hover:text-zinc-400 rounded-sm bg-transparent"
                        }`}
                      >
                        {tag}
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


