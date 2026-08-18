"use client";

import { motion } from "framer-motion";
import { ExternalLink, Terminal, ArrowUpRight } from "lucide-react";
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
              className={`group relative flex flex-col justify-between overflow-hidden transition-all duration-500 transform-gpu ${
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
                  <span className="font-mono text-xs text-green-400/80">
                    node://projects/{project.id}
                  </span>
                </div>
              )}

              {/* CARD CONTENT */}
              <div className="flex flex-col justify-between flex-1 p-6 sm:p-8">
                {/* Title & Links */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    {isStalker ? (
                      <span className="font-mono text-xs text-green-500/70 block mb-1">
                        {"//"} {project.category}
                      </span>
                    ) : (
                      <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-1">
                        {project.category}
                      </span>
                    )}

                    <h3
                      className={`text-xl font-medium tracking-tight text-white ${
                        isStalker
                          ? "group-hover:text-green-300 transition-colors"
                          : ""
                      }`}
                    >
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.links.github && (
                      <Tooltip content="View source code on GitHub" side="top">
                        <SocialIcon
                          url={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          bgColor="transparent"
                          fgColor="currentColor"
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
                            <ExternalLink size={22} />
                          ) : (
                            <ArrowUpRight size={24} strokeWidth={1.5} />
                          )}
                        </a>
                      </Tooltip>
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

                {/* Stacks & Metrics */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded transition-colors ${
                          isStalker
                            ? "font-mono bg-green-500/5 border border-green-500/20 text-green-400/90"
                            : "bg-white/[0.03] border border-white/[0.06] text-zinc-400 font-mono text-[11px]"
                        }`}
                      >
                        {isStalker ? `#${t}` : t}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`pt-4 border-t ${
                      isStalker
                        ? "border-green-500/10 flex items-center justify-between font-mono text-xs text-zinc-500"
                        : "border-white/[0.06] flex items-center justify-between font-mono text-xs text-zinc-400"
                    }`}
                  >
                    <span>
                      {isStalker ? "STATUS: PROD_READY" : "METRIC / IMPACT"}
                    </span>
                    <span
                      className={`font-semibold ${
                        isStalker ? "text-green-400" : "text-white"
                      }`}
                    >
                      {activeData.highlight}
                    </span>
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