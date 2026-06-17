"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, Mic, MicOff } from "lucide-react";
import Bot from "./Bot";
import { getBotReply, QUICK_CHIPS, BOT } from "@/data/botKnowledge";

const MAX_VISIBLE = 4;
const STORAGE_KEY = "sonic-chat-messages";

const GREETING = `Hi! I'm **${BOT.name}** — Saurav's personal chatbot. 🙂 Ask me anything about his projects, skills, experience, or how to hire him.`;

// Idle teasers that pop near the orb to invite a chat.
const TEASERS = [
  "Show me his projects",
  "What's his tech stack?",
  "Is he open to work?",
  "Tell me a joke",
];

// Pre-computed particle burst (radial) used for dissolve effects.
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const d = 26 + (i % 4) * 11;
  return {
    x: Math.cos(a) * d,
    y: Math.sin(a) * d - 8,
    s: 3 + (i % 3),
    c: ["#22d3ee", "#8b5cf6", "#ec4899", "#ff5a33"][i % 4],
  };
});

let idSeq = 0;
const nextId = () => `m${++idSeq}`;

function FormattedText({ text }) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={j} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={j}>{part}</span>
        ),
      )}
    </span>
  ));
}

function LinkButtons({ links, onNavigate }) {
  if (!links?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2.5">
      {links.map((l, i) =>
        l.external ? (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/20 border border-violet-400/30 text-violet-100 text-xs font-medium hover:bg-violet-500/30 transition-colors"
          >
            {l.label} ↗
          </a>
        ) : (
          <Link
            key={i}
            href={l.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-gray-100 text-xs font-medium hover:bg-white/15 transition-colors"
          >
            {l.label}
          </Link>
        ),
      )}
    </div>
  );
}

const msgVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  dissolve: { opacity: 0, y: -18, filter: "blur(9px)", scale: 0.95, transition: { duration: 0.6 } },
};

function ParticleBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: p.s, height: p.s, background: p.c, left: "50%", top: "50%" }}
          variants={{
            hidden: { opacity: 0, x: 0, y: 0, scale: 0.3 },
            visible: { opacity: 0, x: 0, y: 0, scale: 0.3 },
            dissolve: {
              x: p.x,
              y: p.y,
              opacity: [0, 1, 0],
              scale: [0.3, 1.1, 0],
              transition: { duration: 0.6, ease: "easeOut", delay: (i % 5) * 0.02 },
            },
          }}
        />
      ))}
    </div>
  );
}

// Glassy floating message with the bot's orb avatar; dissolves into particles on exit.
function FloatingMessage({ m, onNavigate }) {
  const isUser = m.from === "user";
  return (
    <motion.div
      variants={msgVariants}
      initial="hidden"
      animate="visible"
      exit="dissolve"
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={`flex items-end gap-1.5 max-w-[94%] ${isUser ? "self-end flex-row-reverse" : "self-start"}`}
    >
      {!isUser && (
        <Bot
          mood={m.mood || "naughty"}
          size={26}
          className="shrink-0 mb-0.5"
          level={m.anger || 0}
          cooling={m.cooling || false}
        />
      )}
      <div
        className={`relative px-3.5 py-2.5 rounded-2xl border backdrop-blur-xl shadow-xl text-[13.5px] leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-violet-600/85 to-fuchsia-600/75 border-white/15 text-white rounded-br-md"
            : "bg-[#0a0a0a]/70 border-white/10 text-gray-100 rounded-bl-md"
        }`}
      >
        <FormattedText text={m.text} />
        {!isUser && <LinkButtons links={m.links} onNavigate={onNavigate} />}
        <ParticleBurst />
      </div>
    </motion.div>
  );
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mood, setMood] = useState("naughty");
  const [angerLevel, setAngerLevel] = useState(0); // 0–10, reddens the orb like a sun
  const [cooling, setCooling] = useState(false); // ice block after an apology

  // Mic / speech
  const [listening, setListening] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Idle teaser
  const [teaser, setTeaser] = useState(0);
  const [teaserActive, setTeaserActive] = useState(false);

  const inputRef = useRef(null);
  const sendRef = useRef(null);

  const seed = () => ({ id: nextId(), from: "bot", mood: "naughty", text: GREETING });

  // Restore the conversation from localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) {
        setMessages(parsed);
        idSeq = parsed.length + 1;
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist every question + reply.
  useEffect(() => {
    try {
      if (messages.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [messages]);

  // Set up speech recognition once (if supported).
  useEffect(() => {
    const SR =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return;
    setMicSupported(true);
    const rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
      if (e.results[e.results.length - 1].isFinal) {
        setListening(false);
        try {
          rec.stop();
        } catch {
          /* ignore */
        }
        if (transcript.trim()) sendRef.current?.(transcript);
      }
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {
        /* ignore */
      }
    };
  }, []);

  // Show the teaser ~3s after load, and again ~3s after each time the chat closes.
  useEffect(() => {
    if (isOpen) {
      setTeaserActive(false);
      return;
    }
    const t = setTimeout(() => setTeaserActive(true), 3000);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Cycle through the teasers while active.
  useEffect(() => {
    if (!teaserActive) return;
    const t = setInterval(() => setTeaser((p) => (p + 1) % TEASERS.length), 3800);
    return () => clearInterval(t);
  }, [teaserActive]);

  const toggleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) {
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
      setListening(false);
    } else {
      setInput("");
      try {
        rec.start();
        setListening(true);
      } catch {
        /* ignore */
      }
    }
  };

  const open = () => {
    setIsOpen(true);
    setMessages((prev) => (prev.length ? prev : [seed()]));
    setMood("naughty");
    setTimeout(() => inputRef.current?.focus(), 250);
  };

  const clearChat = () => {
    setMessages([seed()]);
    setMood("naughty");
    setAngerLevel(0);
    setCooling(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const send = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text || isTyping) return;
    setInput("");
    const priorHistory = messages.slice(-8).map((m) => ({ from: m.from, text: m.text }));
    setMessages((prev) => [...prev, { id: nextId(), from: "user", text }]);
    setIsTyping(true);
    setMood("thinking");

    let reply = null;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: priorHistory }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && !data.fallback && data.text) {
        reply = { text: data.text, mood: data.mood || "naughty", chips: QUICK_CHIPS };
      }
    } catch {
      /* fall through to local engine */
    }
    if (!reply) reply = getBotReply(text);

    // Anger escalation (1→10, gets sun-hot) and cool-down (ice on an apology).
    const isApology = /\b(sorry|apolog|my bad|maaf|maafi|galti|forgive)\b/i.test(text);
    let newAnger = angerLevel;
    let cool = false;
    if (isApology) {
      cool = true;
      newAnger = 0;
    } else if ((reply.mood || "") === "angry") {
      newAnger = Math.min(10, angerLevel + 1);
    }
    setAngerLevel(newAnger);
    setCooling(cool);
    if (cool) setTimeout(() => setCooling(false), 3500); // ice melts after a bit

    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        from: "bot",
        mood: reply.mood || "naughty",
        text: reply.text,
        links: reply.links,
        anger: newAnger,
        cooling: cool,
      },
    ]);
    setMood(reply.mood || "naughty");
    setIsTyping(false);
  };
  sendRef.current = send;

  const visible = messages.slice(-MAX_VISIBLE);
  const showTeaser = !isOpen && teaserActive;

  return (
    <div className="fixed z-[60] bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-end gap-2.5">
      {/* Messages + input share one column (left of the orb) so they line up */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="flex flex-col gap-3 w-[min(76vw,280px)]"
          >
            <div className="relative flex flex-col gap-2.5">
              <AnimatePresence>
                {visible.map((m) => (
                  <FloatingMessage key={m.id} m={m} onNavigate={() => setIsOpen(false)} />
                ))}

                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="self-start flex items-end gap-1.5"
                  >
                    <Bot mood="thinking" size={26} className="shrink-0 mb-0.5" />
                    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-md bg-[#0a0a0a]/70 border border-white/10 backdrop-blur-xl">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-violet-300"
                          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-0.5 h-11 pl-2 pr-1 rounded-full bg-[#0a0a0a]/80 border border-white/12 backdrop-blur-xl shadow-2xl w-full"
            >
              <button
                type="button"
                onClick={clearChat}
                aria-label="New chat"
                title="New chat"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={listening ? "Listening…" : "Ask Sonic…"}
                className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none px-1"
              />
              {micSupported && (
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={listening ? "Stop listening" : "Speak"}
                  title={listening ? "Stop" : "Speak"}
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    listening
                      ? "text-red-300 bg-red-500/20 animate-pulse"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send"
                className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/30 disabled:opacity-40 hover:scale-105 active:scale-95 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The orb — shrinks to match the input when open */}
      <div className="relative shrink-0">
        <motion.button
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isOpen ? "Close chat" : `Chat with ${BOT.name}`}
          className={`relative grid place-items-center transition-all duration-300 ${
            isOpen ? "w-11 h-11" : "w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem]"
          }`}
        >
          <Bot
            mood={isOpen ? mood : "naughty"}
            className="w-full h-full"
            level={angerLevel}
            cooling={cooling}
          />
        </motion.button>

        {/* Idle teaser — ABSOLUTELY positioned to the left of the orb so it never
            shifts the chat panel. Dissolves into particles ("AI thinking"). */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3">
          <AnimatePresence mode="wait">
            {showTeaser && (
              <motion.button
                key={teaser}
                onClick={() => {
                  open();
                  send(TEASERS[teaser]);
                }}
                variants={msgVariants}
                initial="hidden"
                animate="visible"
                exit="dissolve"
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="relative block whitespace-nowrap px-3 py-2 rounded-2xl rounded-br-sm bg-[#0a0a0a]/85 border border-white/10 backdrop-blur-xl shadow-xl text-xs font-medium text-gray-100"
              >
                <span className="text-violet-300">Try:</span> {TEASERS[teaser]}
                <ParticleBurst />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
