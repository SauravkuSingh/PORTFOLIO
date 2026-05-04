"use client";

import { useEffect, useState } from "react";
import { Linkedin, Twitter, Link as LinkIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareMenu({ url: urlProp, title }) {
  const [url, setUrl] = useState(urlProp || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!urlProp && typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, [urlProp]);

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`;

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const btn =
    "w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors";

  return (
    <div className="flex items-center gap-3">
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        className={btn}
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X"
        className={btn}
      >
        <Twitter className="w-4 h-4" />
      </a>
      <button type="button" onClick={copy} title="Copy link" className={btn}>
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-4 h-4 text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span
              key="link"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <LinkIcon className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
