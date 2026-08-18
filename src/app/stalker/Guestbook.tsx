"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { MessageSquarePlus, Send, X } from "lucide-react";

type Trace = {
  id: string;
  x_percent: number;
  y_percent: number;
  message: string;
};

export function Guestbook() {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCoord, setCurrentCoord] = useState({ x: 50, y: 50 });
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch existing traces on load
  useEffect(() => {
    let isMounted = true;
    const fetchTraces = async () => {
      try {
        const { data, error } = await supabase
          .from("guestbook_traces")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(100);
        if (!error && data && isMounted) setTraces(data);
      } catch (err) {
        console.warn("Guestbook traces fetch error:", err);
      }
    };
    fetchTraces();

    // Subscribe to new traces in real-time
    const channel = supabase
      .channel("realtime-traces")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook_traces" },
        (payload) => {
          if (isMounted && payload.new) {
            setTraces((prev) => {
              if (prev.some((t) => t.id === (payload.new as Trace).id)) return prev;
              return [...prev, payload.new as Trace];
            });
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (isTyping && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTyping]);

  const openFormAt = (clientX: number, clientY: number) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const rawX = ((clientX - rect.left) / rect.width) * 100;
    const rawY = ((clientY - rect.top) / rect.height) * 100;

    // Clamp coordinates safely within bounds so input form never clips
    const x = Math.min(Math.max(rawX, 8), 75);
    const y = Math.min(Math.max(rawY, 10), 78);

    setCurrentCoord({ x, y });
    setIsTyping(true);
  };

  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    openFormAt(e.clientX, e.clientY);
  };

  const handleMobileButton = () => {
    // Spawn at center or random safe coordinate
    const x = 20 + Math.random() * 50;
    const y = 25 + Math.random() * 40;
    setCurrentCoord({ x, y });
    setIsTyping(true);
  };

  const submitTrace = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed || isSubmitting) {
      setIsTyping(false);
      return;
    }

    const tempTrace: Trace = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      x_percent: currentCoord.x,
      y_percent: currentCoord.y,
      message: trimmed.slice(0, 50),
    };

    // Optimistic UI update
    setTraces((prev) => [...prev, tempTrace]);
    setIsTyping(false);
    setNewMessage("");
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("guestbook_traces").insert([
        {
          x_percent: tempTrace.x_percent,
          y_percent: tempTrace.y_percent,
          message: tempTrace.message,
        },
      ]);
      if (error) {
        console.warn("Guestbook insert error:", error);
      }
    } catch (err) {
      console.error("Failed to insert guestbook trace:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={boardRef}
      onDoubleClick={handleDoubleClick}
      className="relative h-[60vh] sm:h-[65vh] w-full cursor-crosshair overflow-hidden bg-[#020402] border-t border-green-500/10 select-none rounded-xl"
    >
      {/* Instructions Overlay */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-40 px-4">
        <p className="font-mono text-xs sm:text-sm tracking-widest text-green-500/80">
          DIGITAL WALL
        </p>
        <p className="mt-2 font-mono text-[10px] sm:text-xs text-zinc-500">
          Double-tap or click anywhere to leave your mark.
        </p>
      </div>

      {/* Mobile Leave Note Button */}
      <div className="absolute top-4 right-4 z-40 sm:hidden">
        <button
          onClick={handleMobileButton}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 font-mono text-xs backdrop-blur-md shadow-lg active:scale-95 transition-transform"
        >
          <MessageSquarePlus className="h-3.5 w-3.5" />
          Leave Note
        </button>
      </div>

      {/* Render all traces */}
      {traces.map((trace) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          key={trace.id}
          className="absolute whitespace-nowrap font-mono text-[10px] sm:text-xs text-green-400/90 pointer-events-none drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] max-w-[80vw] truncate"
          style={{
            left: `${trace.x_percent}%`,
            top: `${trace.y_percent}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {trace.message}
        </motion.div>
      ))}

      {/* Input Form Box */}
      <AnimatePresence>
        {isTyping && (
          <>
            {/* Desktop absolute positioning */}
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={submitTrace}
              className="hidden sm:flex absolute z-50 items-center gap-2 rounded-xl border border-green-500/40 bg-black/95 p-2 sm:p-2.5 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.25)]"
              style={{
                left: `${currentCoord.x}%`,
                top: `${currentCoord.y}%`,
                transform: "translate(-10%, -50%)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                maxLength={50}
                placeholder="Leave message (max 50 chars)..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-56 sm:w-64 bg-transparent font-mono text-xs text-green-300 outline-none placeholder:text-green-500/30"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isSubmitting}
                className="rounded-md bg-green-500/20 p-1.5 text-green-400 hover:bg-green-500/40 disabled:opacity-30 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsTyping(false)}
                className="rounded-md p-1.5 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.form>

            {/* Mobile Fixed Bottom Drawer Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="sm:hidden fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-green-500/40 bg-[#080d08]/98 p-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">
                  &gt; post_wall_graffiti
                </span>
                <button
                  type="button"
                  onClick={() => setIsTyping(false)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={submitTrace} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  maxLength={50}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-black/60 border border-green-500/20 rounded-lg px-3 py-2 font-mono text-xs text-green-300 outline-none placeholder:text-zinc-600 focus:border-green-500/50"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSubmitting}
                  className="flex items-center justify-center rounded-lg bg-green-500/20 border border-green-500/40 px-3 py-2 text-green-300 font-mono text-xs disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}