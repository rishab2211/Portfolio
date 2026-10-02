"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Trophy, Users, Zap, Award } from "lucide-react";

interface IEEEImpactProps {
  variant: "stalker" | "founder";
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
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
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
      className={`tabular-nums font-bold text-2xl sm:text-3xl lg:text-4xl ${
        isStalker ? "text-green-400 font-mono" : "text-white font-sans"
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
    icon: Users,
    label: "Student Members Scaled",
    sublabel: "from ~5 to 160+",
    target: 160,
    suffix: "+",
    stalkerNote: "// 3 years. volunteer → vice chair.",
    founderNote: "Built a community from the ground up",
  },
  {
    icon: Zap,
    label: "Events & Initiatives",
    sublabel: "national + college level",
    target: 50,
    suffix: "+",
    stalkerNote: "// hackathons, workshops, bootcamps",
    founderNote: "Technical events, hackathons, workshops",
  },
  {
    icon: Trophy,
    label: "Students Reached",
    sublabel: "across outreach programs",
    target: 2000,
    suffix: "+",
    stalkerNote: "// bootcamps, fast-track courses",
    founderNote: "Direct outreach across programs",
  },
  {
    icon: Award,
    label: "National Awards",
    sublabel: "IEEE India Council + Delhi SSN",
    target: 2,
    suffix: "",
    stalkerNote: "// outstanding branch + J.K. Pal memorial",
    founderNote: "Recognition at the highest national level",
  },
];

const journey = [
  { role: "Volunteer", date: "Aug 2023", note: "walked in, knew nobody" },
  { role: "Core Team", date: "Jan 2024", note: "3 months later" },
  { role: "Core Lead", date: "Jun 2024", note: "8 months in" },
  { role: "Vice Chair", date: "Feb 2025", note: "and 8 months after that" },
  { role: "Mentor", date: "Mar 2026", note: "after the handover" },
  { role: "J.K. Pal Award", date: "Jun 2026", note: "individual national honor" },
];

export function IEEEImpact({ variant }: IEEEImpactProps) {
  const isStalker = variant === "stalker";

  return (
    <div className="w-full space-y-10 sm:space-y-14">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group relative rounded-xl border p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300 ${
                isStalker
                  ? "border-green-500/15 bg-[#080c08]/80 hover:border-green-500/40 hover:bg-[#0a100a]"
                  : "border-white/8 bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.03]"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-lg flex-shrink-0 ${
                  isStalker
                    ? "bg-green-500/10 text-green-400"
                    : "bg-white/[0.05] text-zinc-300"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              {/* Counter */}
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                isStalker={isStalker}
              />

              {/* Label */}
              <div>
                <p
                  className={`text-xs sm:text-sm font-medium leading-tight ${
                    isStalker ? "font-mono text-zinc-300" : "font-sans text-white"
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-[10px] sm:text-[11px] mt-0.5 ${
                    isStalker
                      ? "font-mono text-green-500/60"
                      : "font-sans text-zinc-500"
                  }`}
                >
                  {isStalker ? stat.stalkerNote : stat.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Journey Progression Bar */}
      <div>
        <p
          className={`mb-6 sm:mb-8 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest ${
            isStalker ? "text-green-500/50" : "text-zinc-600"
          }`}
        >
          {isStalker
            ? "// the progression — volunteer → vice chair → mentor → award"
            : "The Progression"}
        </p>

        <div className="relative">
          {/* Connector Line */}
          <div
            className={`absolute top-3 left-3 right-3 h-px ${
              isStalker
                ? "bg-gradient-to-r from-green-500/40 via-green-400/20 to-transparent"
                : "bg-gradient-to-r from-white/20 via-white/10 to-transparent"
            } hidden sm:block`}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {journey.map((step, i) => (
              <motion.div
                key={step.role}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className={`relative flex flex-col gap-2 rounded-lg border p-3 transition-all duration-300 ${
                  isStalker
                    ? "border-green-500/15 bg-[#080c08]/60 hover:border-green-500/35"
                    : "border-white/8 bg-white/[0.01] hover:border-white/20"
                }`}
              >
                {/* Node dot */}
                <div
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    i === journey.length - 1
                      ? isStalker
                        ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                        : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                      : isStalker
                      ? "bg-green-500/40"
                      : "bg-zinc-600"
                  }`}
                />

                <div>
                  <p
                    className={`text-xs font-medium leading-tight ${
                      isStalker
                        ? `font-mono ${i === journey.length - 1 ? "text-green-300" : "text-zinc-300"}`
                        : `font-sans ${i === journey.length - 1 ? "text-white" : "text-zinc-300"}`
                    }`}
                  >
                    {step.role}
                  </p>
                  <p
                    className={`text-[9px] sm:text-[10px] mt-0.5 ${
                      isStalker ? "font-mono text-green-500/50" : "font-sans text-zinc-600"
                    }`}
                  >
                    {step.date}
                  </p>
                  <p
                    className={`text-[9px] mt-1 leading-snug ${
                      isStalker ? "font-mono text-zinc-600" : "font-sans text-zinc-600"
                    }`}
                  >
                    {step.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
