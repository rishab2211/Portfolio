"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

type Blog = {
  title: string;
  summary: string;
  link: string;
};

const blogs: Blog[] = [
  {
    title: "Optimizing WebSocket Connection Drops in High-Traffic Environments",
    summary: "A deep dive into managing state and reconnection logic in Socket.io when deployed across multiple Ubuntu server instances.",
    link: "#"
  },
  {
    title: "Implementing Strict RAG Architecture for Safety-Critical AI Agents",
    summary: "How to prevent LLM hallucinations in production by binding query generation to verified vector databases.",
    link: "#"
  }
];

export function TechBlogsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-6 py-32">
      <h2 className="mb-12 font-mono text-sm font-medium uppercase tracking-widest text-zinc-500">
        Technical Strategy & Writing
      </h2>
      <div className="border-t border-white/10">
        {blogs.map((blog, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-white"
              >
                <span className="text-lg font-medium text-zinc-300 transition-colors group-hover:text-white">
                  {blog.title}
                </span>
                {isOpen ? (
                  <Minus className="h-5 w-5 text-zinc-500 shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-zinc-500 shrink-0" />
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
                    <div className="pb-6 pr-12">
                      <p className="text-zinc-400">{blog.summary}</p>
                      <a 
                        href={blog.link} 
                        className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-white hover:underline"
                      >
                        Read Full Markdown <ArrowRight className="h-4 w-4" />
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