"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { FALLBACK_MEMORIES, type MemoryPhoto } from "@/lib/cloudinary";
import { Tooltip } from "@/components/shared/Tooltip";

const FOLDERS = ["All", "IEEE", "Hackathons", "Trips"] as const;

export function PolaroidGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFolder, setActiveFolder] = useState<string>("All");
  const [allPhotos, setAllPhotos] = useState<MemoryPhoto[]>(FALLBACK_MEMORIES);
  const [isSyncing, setIsSyncing] = useState(false);

  // Single dynamic fetch on mount, instant client-side memoized filtering
  useEffect(() => {
    let isMounted = true;
    const fetchAllMemories = async () => {
      setIsSyncing(true);
      try {
        const res = await fetch("/api/memories?folder=All");
        if (res.ok) {
          const data = (await res.json()) as MemoryPhoto[];
          if (isMounted && data && data.length > 0) {
            setAllPhotos(data);
          }
        }
      } catch (err) {
        console.warn("Dynamic memories sync fallback:", err);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    };

    fetchAllMemories();
    return () => {
      isMounted = false;
    };
  }, []);

  const visiblePhotos = useMemo(() => {
    if (activeFolder === "All") return allPhotos;
    return allPhotos.filter(
      (photo) => photo.folder.toLowerCase() === activeFolder.toLowerCase()
    );
  }, [allPhotos, activeFolder]);

  return (
    <div
      className="w-full max-w-5xl mx-auto py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      ref={containerRef}
    >
      <div className="mb-12 sm:mb-16 text-center relative z-50">
        <h2 className="font-mono text-green-500/80 text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 sm:mb-8">
          {">"} system.memories --view={activeFolder.toLowerCase()}
        </h2>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {FOLDERS.map((folder) => (
            <Tooltip
              key={folder}
              content={
                folder === "All"
                  ? "Show all memories"
                  : `Filter by ${folder} events & memories`
              }
              side="top"
            >
              <button
                onClick={() => setActiveFolder(folder)}
                className={`px-3 sm:px-4 py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-200 border rounded-sm cursor-pointer ${
                  activeFolder === folder
                    ? "border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                    : "border-white/5 text-zinc-600 hover:border-white/20 hover:text-zinc-400 bg-transparent"
                }`}
              >
                {folder}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="relative h-[480px] sm:h-[580px] w-full flex items-center justify-center">
        {isSyncing && (
          <div className="absolute top-4 right-4 font-mono text-[10px] text-green-500/40 animate-pulse">
            [SYNCING_CLOUDINARY...]
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileHover={{ scale: 1.05, zIndex: 50 }}
              whileDrag={{
                scale: 1.1,
                zIndex: 100,
                rotate: 0,
                cursor: "grabbing",
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: -30,
                x: photo.x,
                rotate: photo.rotation,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: photo.x,
                y: photo.y,
                rotate: photo.rotation,
              }}
              exit={{ opacity: 0, scale: 0.8, y: 60 }}
              transition={{ type: "spring", damping: 25, stiffness: 140 }}
              className="absolute cursor-grab bg-[#0a0a0a] p-2 pb-5 sm:pb-6 border border-white/10 rounded-sm shadow-[0_0_25px_rgba(0,0,0,0.8)] touch-none select-none max-w-[85vw] transform-gpu"
              style={{
                width: "220px",
                zIndex: visiblePhotos.length - index,
              }}
            >
              <div className="relative w-full h-[170px] sm:h-[190px] bg-black overflow-hidden border border-white/5 rounded-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300 transform-gpu"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-xs bg-black/60 backdrop-blur-xs font-mono text-[8px] text-green-400/80 border border-green-500/20">
                  {photo.folder}
                </div>
              </div>
              <div className="mt-3 text-center pointer-events-none">
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-green-400/80 truncate px-1">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}