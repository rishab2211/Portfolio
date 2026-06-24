"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const FOLDERS = ["All", "IEEE", "Hackathons", "Trips"];

const photos = [
  { id: 1, folder: "IEEE", src: "/memories/elevion-crowd.jpg", caption: "Elevion'25", rotation: -6, x: -120, y: 20 },
  { id: 2, folder: "IEEE", src: "/memories/core-team.jpg", caption: "Core Team", rotation: 5, x: 140, y: 30 },
  { id: 3, folder: "Hackathons", src: "/memories/hackathon-1.jpg", caption: "Agentic AI", rotation: -3, x: -50, y: -20 },
  { id: 4, folder: "Hackathons", src: "/memories/hackathon-2.jpg", caption: "3AM Code", rotation: 8, x: 90, y: 40 },
  { id: 5, folder: "Trips", src: "/memories/dssywlc-1.jpg", caption: "DSSYWLC", rotation: -8, x: -100, y: -30 },
  { id: 6, folder: "Trips", src: "/memories/dssywlc-2.jpg", caption: "Outbound", rotation: 4, x: 80, y: 60 },
];

export function PolaroidGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFolder, setActiveFolder] = useState("All");

  const visiblePhotos = photos.filter(
    (photo) => activeFolder === "All" || photo.folder === activeFolder
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-6 overflow-hidden" ref={containerRef}>
      
      <div className="mb-16 text-center relative z-50">
        <h2 className="font-mono text-green-500/80 text-sm tracking-[0.2em] uppercase mb-8">{">"} system.memories --view={activeFolder.toLowerCase()}</h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          {FOLDERS.map((folder) => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 border ${
                activeFolder === folder
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-white/5 text-zinc-600 hover:border-white/20 hover:text-zinc-400 bg-transparent"
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[600px] w-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              drag
              dragConstraints={containerRef}
              whileHover={{ scale: 1.05, zIndex: 50 }}
              whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0, cursor: "grabbing" }}
              initial={{ opacity: 0, scale: 0.5, y: -100, rotate: photo.rotation, x: photo.x }}
              animate={{ opacity: 1, scale: 1, y: photo.y }}
              exit={{ opacity: 0, scale: 0.8, y: 200 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
             
              className="absolute cursor-grab bg-[#0a0a0a] p-2 pb-6 border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              style={{
                width: "220px",
                zIndex: visiblePhotos.length - index,
              }}
            >
              <div className="relative w-full h-[200px] bg-black overflow-hidden border border-white/5">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  draggable={false} 
                />
              </div>
              <div className="mt-4 text-center pointer-events-none">
                <p className="font-mono text-[10px] uppercase tracking-widest text-green-500/60">
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