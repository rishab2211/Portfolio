"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, Sparkles } from "lucide-react";
import type { BlogPost } from "@/app/api/blogs/route";
import { Tooltip } from "@/components/shared/Tooltip";
import { SubstackIcon } from "@/components/shared/SocialIcons";

interface BlogsProps {
  variant: "stalker" | "founder";
}

export function Blogs({ variant }: BlogsProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const isStalker = variant === "stalker";

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as BlogPost[];
          if (isMounted && Array.isArray(data)) {
            setBlogs(data);
          }
        }
      } catch (err) {
        console.warn("Failed to load Substack articles:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full">
      {/* HEADER FOR FOUNDER MODE */}
      {!isStalker && (
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>[03 // ESSAYS & PUBLICATIONS]</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Technical Essays & Writing.
            </h2>
          </div>

          <Tooltip content="Subscribe & read on rishab2211.substack.com" side="left">
            <a
              href="https://rishab2211.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
            >
              <SubstackIcon size={14} className="text-[#FF6719]" />
              <span>Read on Substack</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Tooltip>
        </div>
      )}

      {/* SKELETON LOADING STATE */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${
                isStalker
                  ? "border-green-500/10 bg-[#050805] animate-pulse"
                  : "border-white/5 bg-white/[0.01] animate-pulse"
              } h-64`}
            />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        /* SIMPLE MESSAGE WHEN NO POSTS / FETCH FAILED */
        <div
          className={`rounded-2xl border p-8 sm:p-10 text-center ${
            isStalker
              ? "border-green-500/20 bg-[#050805] font-mono"
              : "border-white/10 bg-[#090909]/80 font-sans"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-zinc-400 mb-3">
            <SubstackIcon size={18} className="text-[#FF6719]" />
            <span
              className={`text-xs uppercase tracking-widest ${
                isStalker ? "text-green-400/90 font-mono" : "text-zinc-400 font-mono"
              }`}
            >
              rishab2211.substack.com
            </span>
          </div>

          <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6 font-light leading-relaxed">
            Technical essays, backend architecture breakdowns, and engineering deep-dives are published directly on Substack.
          </p>

          <a
            href="https://rishab2211.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all text-xs sm:text-sm ${
              isStalker
                ? "bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20"
                : "bg-white/[0.04] border border-white/15 text-white hover:bg-white/10 hover:border-white/30"
            }`}
          >
            <span>Read on Substack</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      ) : (
        /* LIVE ARTICLES GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogs.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 transform-gpu ${
                isStalker
                  ? "border-green-500/30 bg-[#071107] hover:border-green-500/60 hover:bg-[#0b1a0b] shadow-[0_0_20px_rgba(34,197,94,0.08)] hover:shadow-[0_0_30px_rgba(34,197,94,0.18)]"
                  : "border-white/10 bg-[#090909] sm:bg-[#090909]/90 hover:border-white/30 hover:bg-[#0e0e0e] sm:backdrop-blur-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
              } p-6 sm:p-7`}
            >
              {/* STALKER TERMINAL TOP TAG */}
              {isStalker && (
                <div className="flex items-center justify-between border-b border-green-500/15 pb-3 mb-4 font-mono text-[10px]">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>// SUBSTACK_POST</span>
                  </span>

                  <span className="flex items-center gap-1 text-zinc-500">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTimeInMinutes}m read</span>
                  </span>
                </div>
              )}

              {/* FOUNDER MODE META TAG */}
              {!isStalker && (
                <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[10px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                      <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                      LATEST
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-zinc-500">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTimeInMinutes} min read</span>
                  </span>
                </div>
              )}

              {/* CONTENT */}
              <div className="flex-1">
                <h3
                  className={`text-base sm:text-lg font-medium tracking-tight mb-2.5 line-clamp-2 transition-colors ${
                    isStalker
                      ? "text-white group-hover:text-green-300 font-sans"
                      : "text-white group-hover:text-zinc-100 font-sans"
                  }`}
                >
                  {post.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 font-light ${
                    isStalker ? "text-zinc-400 font-mono text-xs" : "text-zinc-400 font-sans"
                  }`}
                >
                  {post.brief}
                </p>
              </div>

              {/* FOOTER & TAGS */}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                  {post.tags.slice(0, 3).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-2 py-0.5 rounded ${
                        isStalker
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-white/[0.03] text-zinc-400 border border-white/10"
                      }`}
                    >
                      {isStalker ? `#${tag}` : tag}
                    </span>
                  ))}
                </div>

                <div
                  className={`flex items-center justify-between font-mono text-[11px] pt-1 transition-colors ${
                    isStalker
                      ? "text-green-400/80 group-hover:text-green-300"
                      : "text-zinc-400 group-hover:text-white"
                  }`}
                >
                  <span>Read Essay</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {/* FOOTER CTA FOR STALKER */}
      {isStalker && blogs.length > 0 && (
        <div className="mt-8 text-center font-mono text-xs">
          <a
            href="https://rishab2211.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20 transition-all text-[11px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-green-400" />
            <span>Read and subscribe on rishab2211.substack.com →</span>
          </a>
        </div>
      )}
    </div>
  );
}
