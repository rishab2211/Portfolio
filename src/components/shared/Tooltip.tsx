"use client";

import React, { useState, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "center" | "start" | "end";
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delay = 150,
  className = "",
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const id = useId();

  if (disabled || !content) return <>{children}</>;

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getPositionClass = () => {
    if (side === "top") {
      if (align === "end") return "bottom-full right-0 mb-2";
      if (align === "start") return "bottom-full left-0 mb-2";
      return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
    if (side === "bottom") {
      if (align === "end") return "top-full right-0 mt-2";
      if (align === "start") return "top-full left-0 mt-2";
      return "top-full left-1/2 -translate-x-1/2 mt-2";
    }
    if (side === "left") return "right-full top-1/2 -translate-y-1/2 mr-2";
    if (side === "right") return "left-full top-1/2 -translate-y-1/2 ml-2";
    return "bottom-full left-1/2 -translate-x-1/2 mb-2";
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={isVisible ? id : undefined}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={id}
            role="tooltip"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: side === "top" ? 3 : side === "bottom" ? -3 : 0,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`pointer-events-none absolute z-[999] whitespace-nowrap rounded-md border border-green-500/30 bg-[#070b07]/98 px-2.5 py-1 text-[10px] font-mono tracking-wider text-zinc-200 shadow-[0_4px_25px_rgba(0,0,0,0.9)] backdrop-blur-md ${getPositionClass()}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
