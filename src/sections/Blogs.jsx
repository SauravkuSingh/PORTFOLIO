"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Blogs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative z-2 px-6 sm:px-10 pt-36 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-gray-300">Writing in progress</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
          Notes &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Blogs
          </span>
        </h1>
        <p className="text-lg text-gray-400 mt-6 leading-relaxed">
          Thoughts on building modern web apps — React patterns, Next.js
          internals, and the messy bits in between. First posts dropping soon.
        </p>
      </motion.div>
    </div>
  );
};

export default Blogs;
