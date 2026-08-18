"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { SocialIcon } from "react-social-icons";
import { Tooltip } from "@/components/shared/Tooltip";

interface ProjectsProps {
  variant: "stalker" | "founder";
}

export function Projects({ variant }: ProjectsProps) {
  const isStalker = variant === "stalker";

  return (
    <div className="w-full">
      {/* HEADER SECTION (Rendered only for founder mode to prevent redundancy with stalker section header) */}
      {!isStalker && (
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase font-mono mb-2 sm:mb-3">
              Proof of Work
            </h2>
            <p className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Systems & Architecture.
            </p>
          </div>
        </div>
      )}

      {/* GRID SECTION */}
      <div
        className={`grid grid-cols-1 gap-5 sm:gap-6 ${
          isStalker ? "md:grid-cols-2" : "lg:grid-cols-2 gap-y-8 sm:gap-y-12"
        }`}
      >
        {projectsData.map((project, index) => {
          const activeData = isStalker ? project.stalker : project.founder;
          const externalLink = project.links.live || project.links.demo;
          const isLiveLink = Boolean(project.links.live);

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className={`group relative flex flex-col justify-between overflow-hidden transition-all duration-300 transform-gpu ${
                isStalker
                  ? "rounded-xl border border-green-500/20 bg-[#050705] hover:border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]"
                  : "rounded-2xl border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.2]"
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
                  <span className="font-mono text-xs text-green-400/80 truncate">
                    node://projects/{project.id}
                  </span>
                </div>
              )}

              {/* CARD CONTENT */}
              <div className="flex flex-col justify-between flex-1 p-5 sm:p-8">
                {/* Title & Links */}
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-medium tracking-tight text-white ${
                        isStalker
                          ? "group-hover:text-green-300 transition-colors"
                          : ""
                      }`}
                    >
                      {project.name}
                    </h3>

                    <p
                      className={`mt-1 text-xs leading-relaxed ${
                        isStalker
                          ? "font-mono text-green-500/80"
                          : "font-mono text-zinc-400 uppercase text-[10px] sm:text-[11px] tracking-wider"
                      }`}
                    >
                      {activeData.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {project.links.github && (
                      <Tooltip content="View source code on GitHub" side="top">
                        <SocialIcon
                          url={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          bgColor="transparent"
                          fgColor="currentColor"
                          style={{
                            height: isStalker ? 30 : 26,
                            width: isStalker ? 30 : 26,
                          }}
                          className={`transition-all hover:scale-110 ${
                            isStalker
                              ? "text-green-400 hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        />
                      </Tooltip>
                    )}
                    {externalLink && (
                      <Tooltip
                        content={isLiveLink ? "Open live application" : "View demonstration on LinkedIn"}
                        side="top"
                      >
                        <a
                          href={externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${isLiveLink ? "Live project" : "Demo"} for ${project.name}`}
                          className={`flex items-center justify-center p-1 rounded-md transition-all hover:scale-110 ${
                            isStalker
                              ? "text-green-400 hover:bg-green-500/10"
                              : "text-zinc-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {isStalker ? (
                            <ExternalLink size={20} />
                          ) : (
                            <ArrowUpRight size={22} strokeWidth={1.5} />
                          )}
                        </a>
                      </Tooltip>
                    )}
                  </div>
                </div>

                {/* Descriptions */}
                <div
                  className={`flex-1 mb-6 sm:mb-8 space-y-3 sm:space-y-4 ${
                    isStalker ? "font-mono text-xs sm:text-sm" : "font-sans text-xs sm:text-sm"
                  }`}
                >
                  {activeData.description.map((desc, i) => (
                    <div
                      key={i}
                      className={`flex items-start ${
                        isStalker ? "gap-2.5 sm:gap-3" : "gap-0"
                      }`}
                    >
                      {isStalker && (
                        <span className="mt-0.5 text-green-500/50">{">"}</span>
                      )}
                      <p
                        className={`leading-relaxed ${
                          isStalker
                            ? "text-zinc-400"
                            : "text-zinc-400 font-light border-l border-white/10 pl-3.5 sm:pl-5 group-hover:border-zinc-500 group-hover:text-zinc-300 transition-colors"
                        }`}
                      >
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stacks & Tech Badges */}
                <div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
                    {project.tech_stack.map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          isStalker
                            ? "font-mono bg-green-500/5 border border-green-500/20 text-green-400/90 text-[10px] sm:text-xs"
                            : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[9px] sm:text-[10px]"
                        }`}
                      >
                        {isStalker ? `#${t}` : t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}