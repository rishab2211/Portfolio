"use client";

import { motion, Variants } from "framer-motion"; // <-- Add Variants here
import Link from "next/link";
import { Terminal, Briefcase } from "lucide-react";

export default function GatewayPage() {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 2.5, duration: 1, staggerChildren: 0.2 }
    }
  };

  // Add : Variants here too
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
        <div className="h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 blur-3xl" />
      </div>

      <div className="z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Typewriter Effect Sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.1, 0.8, 1] }}
          className="absolute text-sm font-mono tracking-widest text-zinc-500"
        >
          &gt; Context dictates the experience.
        </motion.div>

        {/* The Main Prompt */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 4.5, duration: 1.5 }}
          className="font-sans text-3xl font-light tracking-tight text-zinc-200 md:text-5xl"
        >
          What brings you here today?
        </motion.h1>

        {/* The Choice Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 flex w-full flex-col gap-6 md:flex-row md:justify-center"
        >
          {/* Path A: Stalker */}
          <Link href="/stalker" className="group relative w-full md:w-72">
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl border md:border-white/10 bg-white/5 p-8 transition-all  hover:border-green-500/50 md:hover:bg-green-500/5 bg-green-500/10 border-green-500/50">
              <div className="flex flex-col items-center gap-4">
                <Terminal className="h-8 w-8 text-green-400 md:text-zinc-400 transition-colors duration-500 md:group-hover:text-green-400" />
                <div className="text-center">
                  <h2 className="font-sans text-xl font-medium text-white">I&apos;m just a Stalker</h2>
                  <p className="mt-2 font-mono text-xs text-green-400 md:text-zinc-500 md:group-hover:text-green-500/70">
                    [ Just Stalking ]
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Path B: Founder */}
          <Link href="/founder" className="group relative w-full md:w-72">
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="flex flex-col items-center gap-4">
                <Briefcase className="h-8 w-8 text-zinc-400 transition-colors duration-500 group-hover:text-white" />
                <div className="text-center">
                  <h2 className="font-sans text-xl font-medium text-white">I need a Builder</h2>
                  <p className="mt-2 font-mono text-xs text-zinc-500 group-hover:text-zinc-300">
                    [ Founder / Collaborator ]
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
