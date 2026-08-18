"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Terminal, Briefcase } from "lucide-react";
import { Tooltip } from "@/components/shared/Tooltip";

export function ContextSwitcher() {
  const pathname = usePathname();

  if (pathname === "/") return null; // Don't show on the gateway page

  const isFounder = pathname === "/founder";

  return (
    <nav
      aria-label="Experience switcher"
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] flex items-center rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-md shadow-lg"
    >
      <Tooltip
        content={!isFounder ? "Active: Stalker (Developer) Mode" : "Switch to Stalker (Developer) Mode"}
        side="bottom"
      >
        <Link
          href="/stalker"
          aria-label="Switch to Stalker Developer mode"
          className={`relative flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono transition-colors ${
            !isFounder ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
          }`}
        >
          {!isFounder && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-green-500"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Stalker
          </span>
        </Link>
      </Tooltip>

      <Tooltip
        content={isFounder ? "Active: Founder (Builder) Mode" : "Switch to Founder (Builder) Mode"}
        side="bottom"
      >
        <Link
          href="/founder"
          aria-label="Switch to Founder Builder mode"
          className={`relative flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono transition-colors ${
            isFounder ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
          }`}
        >
          {isFounder && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Founder
          </span>
        </Link>
      </Tooltip>
    </nav>
  );
}