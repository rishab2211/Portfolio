"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Terminal, Briefcase } from "lucide-react";

export function ContextSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null; // Don't show on the gateway page

  const isFounder = pathname === "/founder";

  return (
    <div className="fixed top-6 right-6 z-[60] flex items-center rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-md">
      <button
        onClick={() => router.push('/stalker')}
        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono transition-colors ${
          !isFounder ? "text-black" : "text-zinc-500 hover:text-white"
        }`}
      >
        {!isFounder && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 rounded-full bg-green-500"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <Terminal className="h-3 w-3" /> Stalker
        </span>
      </button>

      <button
        onClick={() => router.push('/founder')}
        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono transition-colors ${
          isFounder ? "text-black" : "text-zinc-500 hover:text-white"
        }`}
      >
        {isFounder && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 rounded-full bg-white"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <Briefcase className="h-3 w-3" /> Founder
        </span>
      </button>
    </div>
  );
}