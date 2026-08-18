"use client";

import { motion } from "framer-motion";
import { ExternalLink, Terminal, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { SocialIcon } from "react-social-icons";

interface ProjectsProps {
  variant: "stalker" | "founder";
}

export function Projects({ variant }: ProjectsProps) {
  const isStalker = variant === "stalker";

  return (
    <div className="w-full">
      {/* HEADER SECTION (Rendered only for founder mode to prevent redundancy with stalker section header) */}
      {!isStalker && (
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-medium tracking-widest text-zinc-500 uppercase font-mono mb-3">
              Proof of Work
            </h2>
            <p className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Systems & Architecture.
            </p>
          </div>
        </div>
      )}

      {/* GRID SECTION */}
      <div
        className={`grid grid-cols-1 gap-6 ${
          isStalker ? "md:grid-cols-2" : "lg:grid-cols-2 gap-y-12"
        }`}
      >
        {projectsData.map((project, index) => {
          const activeData = isStalker ? project.stalker : project.founder;
          const externalLink = project.links.live || project.links.demo;
          const isLiveLink = Boolean(project.links.live);

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`group relative flex flex-col justify-between overflow-hidden transition-all duration-500 ${
                isStalker
                  ? "rounded-md border border-green-500/20 bg-[#050505] hover:border-green-500/60 shadow-[0_0_15px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                  : "rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.15]"
              }`}
            >
              {/* STALKER TERMINAL HEADER */}
              {isStalker && (
                <div className="flex items-center gap-2 border-b border-green-500/20 bg-green-500/5 px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="ml-2 font-mono text-[10px] text-green-500/50">
                    bash: ./run_{project.id}.sh
                  </span>
                </div>
              )}

              {/* MAIN CONTENT BLOCK */}
              <div
                className={`${
                  isStalker ? "p-6" : "p-8 sm:p-10 flex flex-col h-full"
                }`}
              >
                {/* Header & Meta */}
                <div className="flex items-start justify-between mb-8">
                  {isStalker ? (
                    // Stalker Meta
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-green-500/10 text-green-500 group-hover:bg-green-500/20 transition-colors">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-mono font-bold text-white">
                          {project.name}
                        </h3>
                        <p className="mt-1 text-sm font-mono text-green-400/80">
                          {activeData.tagline}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Founder Meta
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-3 block">
                        {activeData.tagline}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                        {project.name}
                      </h3>
                    </div>
                  )}

                  {/* Links Block */}
                  <div
                    className={`flex items-center gap-3 ${
                      isStalker
                        ? ""
                        : "opacity-60 group-hover:opacity-100 transition-opacity"
                    }`}
                  >
                    {project.links.github && (
                      <SocialIcon
                        url={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        bgColor="transparent"
                        fgColor="currentColor"
                        aria-label={`GitHub repository for ${project.name}`}
                        style={{
                          height: isStalker ? 32 : 28,
                          width: isStalker ? 32 : 28,
                        }}
                        className={`transition-all hover:scale-110 ${
                          isStalker
                            ? "text-green-400 hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      />
                    )}
                    {externalLink && (
                      <a
                        href={externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${isLiveLink ? "Live project" : "Demo"} for ${project.name}`}
                        title={isLiveLink ? "Open Live App" : "View Live Demo"}
                        className={`flex items-center justify-center p-1 rounded-md transition-all hover:scale-110 ${
                          isStalker
                            ? "text-green-400 hover:bg-green-500/10"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {isStalker ? (
                          <ExternalLink size={22} />
                        ) : (
                          <ArrowUpRight size={24} strokeWidth={1.5} />
                        )}
                      </a>
                    )}
                  </div>
                </div>

                {/* Descriptions */}
                <div
                  className={`flex-1 mb-8 space-y-4 ${
                    isStalker ? "font-mono text-sm" : "font-sans text-base"
                  }`}
                >
                  {activeData.description.map((desc, i) => (
                    <div
                      key={i}
                      className={`flex items-start ${
                        isStalker ? "gap-3" : "gap-0"
                      }`}
                    >
                      {isStalker && (
                        <span className="mt-1 text-green-500/50">{">"}</span>
                      )}
                      <p
                        className={`leading-relaxed ${
                          isStalker
                            ? "text-zinc-400"
                            : "text-zinc-400 font-light border-l border-white/10 pl-5 group-hover:border-zinc-500 group-hover:text-zinc-300 transition-colors"
                        }`}
                      >
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div
                  className={`flex flex-wrap gap-2 pt-6 border-t ${
                    isStalker ? "border-white/5" : "border-white/[0.06]"
                  }`}
                >
                  {project.tech_stack.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 transition-colors ${
                        isStalker
                          ? "text-xs rounded-full bg-green-500/5 text-green-500 border border-green-500/20 font-mono group-hover:bg-green-500/10"
                          : "text-[10px] rounded-xs bg-transparent border border-white/10 text-zinc-400 font-mono tracking-widest uppercase group-hover:border-white/20 group-hover:text-zinc-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}