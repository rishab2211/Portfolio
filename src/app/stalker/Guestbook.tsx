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

  const openFormAt = (clientX: number, clientY: number) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const rawX = ((clientX - rect.left) / rect.width) * 100;
    const rawY = ((clientY - rect.top) / rect.height) * 100;

    // Clamp coordinates safely within bounds so input form never clips
    const x = Math.min(Math.max(rawX, 5), 75);
    const y = Math.min(Math.max(rawY, 8), 82);

    setCurrentCoord({ x, y });
    setIsTyping(true);
  };

  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    openFormAt(e.clientX, e.clientY);
  };

  const handleMobileButton = () => {
    // Spawn at center or random safe coordinate
    const x = 20 + Math.random() * 50;
    const y = 30 + Math.random() * 40;
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
      className="relative h-[55vh] sm:h-[65vh] w-full cursor-crosshair overflow-hidden bg-[#020202] border-t border-white/10 select-none"
    >
      {/* Instructions Overlay */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-40">
        <p className="font-mono text-xs sm:text-sm tracking-widest text-green-500/80">
          DIGITAL WALL
        </p>
        <p className="mt-2 font-mono text-[10px] sm:text-xs text-zinc-500">
          Double-click anywhere to leave a permanent mark.
        </p>
      </div>

      {/* Mobile Leave Note Button */}
      <div className="absolute top-4 right-4 z-40 sm:hidden">
        <button
          onClick={handleMobileButton}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-[10px] backdrop-blur-md"
        >
          <MessageSquarePlus className="h-3 w-3" />
          Leave Note
        </button>
      </div>

      {/* Render all traces */}
      {traces.map((trace) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          key={trace.id}
          className="absolute whitespace-nowrap font-mono text-[11px] sm:text-xs text-green-400/90 pointer-events-none drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
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
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onSubmit={submitTrace}
            className="absolute z-50 flex items-center gap-2 rounded-lg border border-green-500/40 bg-black/90 p-2 sm:p-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)]"
            style={{
              left: `${currentCoord.x}%`,
              top: `${currentCoord.y}%`,
            }}
          >
            <input
              autoFocus
              type="text"
              maxLength={50}
              placeholder="Leave a trace..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-transparent text-xs font-mono text-green-300 outline-none placeholder:text-zinc-600 w-36 sm:w-48"
            />
            <button
              type="submit"
              aria-label="Submit note"
              className="p-1 rounded text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-colors"
            >
              <Send className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setIsTyping(false)}
              aria-label="Cancel note"
              className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}