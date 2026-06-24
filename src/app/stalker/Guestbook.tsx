"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Trace = {
  id: string;
  x_percent: number;
  y_percent: number;
  message: string;
};

export function Guestbook() {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCoord, setCurrentCoord] = useState({ x: 0, y: 0 });
  const [newMessage, setNewMessage] = useState("");
  const boardRef = useRef<HTMLDivElement>(null);

  // Fetch existing traces on load
  useEffect(() => {
    const fetchTraces = async () => {
      const { data, error } = await supabase.from("guestbook_traces").select("*");
      if (!error && data) setTraces(data);
    };
    fetchTraces();

    // Subscribe to new traces in real-time
    const channel = supabase
      .channel("realtime-traces")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "guestbook_traces" }, (payload) => {
        setTraces((prev) => [...prev, payload.new as Trace]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current) return;
    
    // Calculate relative percentages so it stays responsive
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setCurrentCoord({ x, y });
    setIsTyping(true);
  };

  const submitTrace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      setIsTyping(false);
      return;
    }

    // Optimistic UI update (feels instantly fast)
    const tempTrace = { id: Math.random().toString(), x_percent: currentCoord.x, y_percent: currentCoord.y, message: newMessage };
    setTraces((prev) => [...prev, tempTrace]);
    setIsTyping(false);
    setNewMessage("");

    // Insert to DB
    await supabase.from("guestbook_traces").insert([{
      x_percent: currentCoord.x,
      y_percent: currentCoord.y,
      message: tempTrace.message
    }]);
  };

  return (
    <div 
      ref={boardRef}
      onDoubleClick={handleDoubleClick}
      className="relative h-[60vh] w-full cursor-crosshair overflow-hidden bg-[#020202] border-t border-white/10"
    >
      {/* Instructions */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-50">
        <p className="font-mono text-sm tracking-widest text-zinc-500">DIGITAL WALL</p>
        <p className="mt-2 text-xs text-zinc-600">Double-click anywhere to leave a permanent mark.</p>
      </div>

      {/* Render all traces */}
      {traces.map((trace) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          key={trace.id}
          className="absolute whitespace-nowrap font-mono text-xs text-white mix-blend-difference"
          style={{ left: `${trace.x_percent}%`, top: `${trace.y_percent}%` }}
        >
          {trace.message}
        </motion.div>
      ))}

      {/* Input Form Box */}
      <AnimatePresence>
        {isTyping && (
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onSubmit={submitTrace}
            className="absolute z-50 flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/90 p-2 backdrop-blur-sm"
            style={{ left: `${currentCoord.x}%`, top: `${currentCoord.y}%` }}
          >
            <input
              autoFocus
              type="text"
              maxLength={40}
              placeholder="Leave a trace..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-transparent text-xs text-white outline-none placeholder:text-zinc-500 w-32"
              onBlur={() => !newMessage && setIsTyping(false)}
            />
            <button type="submit" className="text-xs text-green-500 hover:text-green-400">
              [Enter]
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}