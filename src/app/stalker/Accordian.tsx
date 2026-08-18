"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, ExternalLink } from "lucide-react";

type Blog = {
  title: string;
  summary: string;
  link: string;
  date: string;
  tags: string[];
};

const blogs: Blog[] = [
  {
    title: "Optimizing WebSocket Connections & State in High-Traffic Environments",
    summary:
      "A deep dive into managing heartbeat timeouts, reconnection resilience, and Zustand state synchronization across distributed instances.",
    link: "https://rishab2211.substack.com",
    date: "Jun 2026",
    tags: ["WebSockets", "Node.js", "State Management"],
  },
  {
    title: "Building High-Throughput Socket Servers from Scratch in Java",
    summary:
      "Benchmarking 1M+ RPS with custom thread pools, non-blocking I/O, and slashing memory overhead compared to naive multi-threading.",
    link: "https://rishab2211.substack.com",
    date: "May 2026",
    tags: ["Java", "Concurrency", "Systems"],
  },
  {
    title: "Implementing Dynamic Pre-rendering & SEO on Edge Microservices",
    summary:
      "How we engineered custom node-based pre-rendering scripts, dynamic sitemaps, and asset pipelines to maximize search indexability.",
    link: "https://rishab2211.substack.com",
    date: "Apr 2026",
    tags: ["SEO", "Node.js", "Edge Compute"],
  },
];

export function TechBlogsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-xs sm:text-sm font-medium uppercase tracking-widest text-zinc-500">
          Technical Writing & Strategy
        </h2>
        <a
          href="https://rishab2211.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs text-green-400 hover:underline"
        >
          View all on Substack <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="border-t border-white/10">
        {blogs.map((blog, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between py-6 text-left transition-colors"
              >
                <div className="flex flex-col gap-1 pr-4">
                  <span className="text-base sm:text-lg font-medium text-zinc-300 transition-colors group-hover:text-white">
                    {blog.title}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {blog.date}
                  </span>
                </div>
                {isOpen ? (
                  <Minus className="h-5 w-5 text-green-400 shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-zinc-500 group-hover:text-white shrink-0 transition-colors" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pr-6 sm:pr-12">
                      <p className="text-sm text-zinc-400 leading-relaxed font-light">
                        {blog.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-xs font-mono text-[9px] text-zinc-400 bg-white/[0.02] border border-white/5 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-green-400 hover:text-green-300 transition-colors"
                      >
                        Read on Substack <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}