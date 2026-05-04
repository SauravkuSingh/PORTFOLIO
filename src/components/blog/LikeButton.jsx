"use client";

import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlogLikes } from "@/hooks/useBlogLikes";

export default function LikeButton({ slug }) {
  const { count, liked, toggle, pending, enabled } = useBlogLikes(slug);

  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={liked}
      title={liked ? "Unlike" : "Like this post"}
      className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors disabled:opacity-70 ${
        liked
          ? "bg-fuchsia-500/15 border-fuchsia-400/40 text-fuchsia-300"
          : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-white/20"
      }`}
    >
      <motion.span
        key={liked ? "on" : "off"}
        initial={{ scale: 1 }}
        animate={liked ? { scale: [1, 1.45, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            liked ? "fill-fuchsia-400 stroke-fuchsia-400" : ""
          }`}
        />
      </motion.span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="tabular-nums min-w-[1ch] text-center"
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
