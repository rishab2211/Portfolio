"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface IEEEImpactProps {
  variant: "stalker" | "founder";
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1600,
  isStalker,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isStalker: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span
      ref={ref}
      className={`tabular-nums font-mono text-3xl sm:text-4xl font-bold tracking-tight ${
        isStalker ? "text-green-400" : "text-white"
      }`}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    target: 160,
    suffix: "+",
    label: "Student Members Scaled",
    detail: "Grew active chapter from ~5 to 160+ engineers",
  },
  {
    target: 50,
    suffix: "+",
    label: "Technical Initiatives",
    detail: "Hackathons, workshops & backend summer camps",
  },
  {
    target: 2000,
    suffix: "+",
    label: "Students Reached",
    detail: "Hands-on engineering outreach across colleges",
  },
  {
    target: 2,
    suffix: "",
    label: "National Honors",
    detail: "Dr. J.K. Pal Memorial + Outstanding Student Branch",
  },
];

const milestones = [
  {
    step: "01",
    role: "Volunteer",
    date: "Aug 2023",
    note: "Walked in with zero credentials or prior network.",
  },
  {
    step: "02",
    role: "Core Team",
    date: "Jan 2024",
    note: "Promoted in 3 months; taught git & web fundamentals.",
  },
  {
    step: "03",
    role: "Core Lead",
    date: "Jun 2024",
    note: "Designed technical curriculum for summer bootcamps.",
  },
  {
    step: "04",
    role: "Vice Chair",
    date: "Feb 2025",
    note: "Elected to executive leadership; scaled branch to 160+.",
  },
  {
    step: "05",
    role: "Mentor",
    date: "Mar 2026",
    note: "Structured leadership handover; stayed on as advisor.",
  },
  {
    step: "06",
    role: "J.K. Pal Award",
    date: "Jun 2026",
    note: "National honor awarded by IEEE Delhi SSN.",
  },
];

export function IEEEImpact({ variant }: IEEEImpactProps) {
  const isStalker = variant === "stalker";

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* ── 1. UNIFIED IMPACT METRICS ── */}
      <div
        className={`rounded-xl border ${
          isStalker
            ? "border-green-500/20 bg-[#060a06]/80"
            : "border-white/10 bg-white/[0.02]"
        } p-6 sm:p-8`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x lg:divide-white/5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between ${
                i !== 0 ? "lg:pl-8" : ""
              }`}
            >
              <div>
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  isStalker={isStalker}
                />
                <h3
                  className={`mt-2 text-xs sm:text-sm font-medium ${
                    isStalker ? "font-mono text-zinc-200" : "font-sans text-white"
                  }`}
                >
                  {stat.label}
                </h3>
              </div>
              <p
                className={`mt-1.5 text-xs leading-relaxed ${
                  isStalker
                    ? "font-mono text-zinc-500"
                    : "font-sans text-zinc-400 font-light"
                }`}
              >
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. PROGRESSION TIMELINE ── */}
      <div className="space-y-6">
        {/* Subheader */}
        <div
          className={`flex items-center justify-between border-b pb-3 ${
            isStalker ? "border-green-500/10" : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isStalker ? "bg-green-400 animate-pulse" : "bg-white animate-pulse"
              }`}
            />
            <p
              className={`font-mono text-xs tracking-wider uppercase font-semibold ${
                isStalker ? "text-green-400/90" : "text-zinc-300"
              }`}
            >
              {isStalker ? "Leadership Progression" : "Leadership Trajectory"}
            </p>
          </div>
          <span className="font-mono text-[11px] text-zinc-500">
            Aug 2023 — Jun 2026
          </span>
        </div>

        {/* Desktop Horizontal Stepper Track */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-3.5 relative">
            {milestones.map((m, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === milestones.length - 1;

              return (
                <div key={m.step} className="relative flex flex-col">
                  {/* Top Timeline Connector Bar */}
                  <div className="relative flex items-center h-6 mb-3">
                    {/* Left Line Segment (hidden for first) */}
                    <div
                      className={`h-px flex-1 ${
                        isFirst
                          ? "invisible"
                          : isStalker
                          ? "bg-green-500/25"
                          : "bg-white/15"
                      }`}
                    />

                    {/* Milestone Node */}
                    <div className="relative px-2 flex items-center gap-1.5 shrink-0">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isLast
                            ? isStalker
                              ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]"
                              : "bg-white"
                            : isStalker
                            ? "bg-green-500/80"
                            : "bg-zinc-500"
                        }`}
                      />
                      <span
                        className={`font-mono text-[10px] font-medium ${
                          isLast
                            ? isStalker
                              ? "text-green-300 font-bold"
                              : "text-white"
                            : isStalker
                            ? "text-green-500/70"
                            : "text-zinc-500"
                        }`}
                      >
                        {m.step}
                      </span>
                    </div>

                    {/* Right Line Segment (hidden for last) */}
                    <div
                      className={`h-px flex-1 ${
                        isLast
                          ? "invisible"
                          : isStalker
                          ? "bg-green-500/25"
                          : "bg-white/15"
                      }`}
                    />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`flex-1 rounded-lg border p-4 flex flex-col justify-between transition-all duration-200 ${
                      isLast
                        ? isStalker
                          ? "border-green-500/40 bg-green-500/[0.04]"
                          : "border-white/20 bg-white/[0.02]"
                        : isStalker
                        ? "border-green-500/15 bg-black/40 hover:border-green-500/35 hover:bg-green-500/[0.02]"
                        : "border-white/5 bg-white/[0.01] hover:border-white/15"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`font-mono text-[10px] ${
                            isStalker ? "text-green-400" : "text-zinc-400"
                          }`}
                        >
                          {m.date}
                        </span>
                      </div>
                      <h4
                        className={`text-xs sm:text-sm font-semibold leading-snug ${
                          isStalker ? "font-mono text-zinc-100" : "font-sans text-white"
                        }`}
                      >
                        {m.role}
                      </h4>
                    </div>

                    <p
                      className={`text-[11px] leading-relaxed mt-2.5 pt-2 border-t ${
                        isStalker
                          ? "border-green-500/10 font-mono text-zinc-400"
                          : "border-white/5 font-sans text-zinc-400 font-light"
                      }`}
                    >
                      {m.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div
          className={`lg:hidden relative border-l ml-3 pl-6 space-y-5 ${
            isStalker ? "border-green-500/25" : "border-white/15"
          }`}
        >
          {milestones.map((m, idx) => {
            const isLast = idx === milestones.length - 1;
            return (
              <div key={m.step} className="relative">
                {/* Node dot on vertical line */}
                <div
                  className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border ${
                    isLast
                      ? isStalker
                        ? "border-green-400 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]"
                        : "border-white bg-white"
                      : isStalker
                      ? "border-green-500 bg-[#040604]"
                      : "border-zinc-500 bg-black"
                  }`}
                />

                <div
                  className={`rounded-lg border p-3.5 ${
                    isLast
                      ? isStalker
                        ? "border-green-500/40 bg-green-500/[0.04]"
                        : "border-white/20 bg-white/[0.02]"
                      : isStalker
                      ? "border-green-500/15 bg-black/40"
                      : "border-white/5 bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`font-mono text-[10px] ${
                        isStalker ? "text-green-400" : "text-zinc-400"
                      }`}
                    >
                      {m.date}
                    </span>
                    <span
                      className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${
                        isStalker
                          ? "border-green-500/20 text-green-500/60"
                          : "border-white/10 text-zinc-500"
                      }`}
                    >
                      {m.step}
                    </span>
                  </div>

                  <h4
                    className={`text-xs sm:text-sm font-semibold ${
                      isStalker ? "font-mono text-zinc-100" : "font-sans text-white"
                    }`}
                  >
                    {m.role}
                  </h4>

                  <p
                    className={`text-xs leading-relaxed mt-1.5 pt-1.5 border-t ${
                      isStalker
                        ? "border-green-500/10 font-mono text-zinc-400"
                        : "border-white/5 font-sans text-zinc-400 font-light"
                    }`}
                  >
                    {m.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
