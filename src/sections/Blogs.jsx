"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, PenTool, Coffee } from "lucide-react";
import { BLOGS } from "@/data/blogs";

const Blogs = () => {
  return (
    <div className="relative z-2 px-6 sm:px-10 pt-32 pb-24 lg:pt-40 lg:pb-32 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-violet-500 font-semibold tracking-wider text-sm uppercase mb-4 block">
              DEV NOTES
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
              Things I figured out<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
               so you don't have to.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
              Deep dives, quick tips, and everything I'm learning as a full stack developer.
            </p>
          </motion.div>

          {/* Right side illustration (CSS based placeholder for 3D graphic) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex justify-end items-center h-64"
          >
            <div className="absolute w-72 h-72 bg-violet-600/20 rounded-full blur-3xl -z-10 right-10" />
            
            {/* Mock Editor */}
            <div className="relative z-10 w-64 h-80 rounded-2xl bg-[#0d0d12] border border-white/10 shadow-2xl overflow-hidden rotate-[-5deg] transform-gpu">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/5">
                <span className="text-xs text-gray-400 font-mono">/ Blogs</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-4/5 bg-white/10 rounded-full" />
              </div>
            </div>

            {/* Mock Pen */}
            <div className="absolute z-20 w-8 h-48 bg-gradient-to-b from-violet-500 to-fuchsia-600 rounded-full rotate-[30deg] right-32 top-10 border border-white/20 shadow-xl flex items-end justify-center pb-2">
               <div className="w-2 h-4 bg-white/50 rounded-b-full" />
            </div>

            {/* Mock Mug */}
            <div className="absolute z-30 w-24 h-24 bg-[#0a0a0f] rounded-2xl right-10 bottom-0 border border-white/10 shadow-2xl flex items-center justify-center">
              <Code2 className="w-8 h-8 text-violet-500" />
              <div className="absolute -right-4 top-4 w-6 h-12 border-4 border-[#0a0a0f] rounded-r-full" />
            </div>
          </motion.div>
        </div>

        {/* Blog List */}
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {BLOGS.map((blog, i) => (
              <motion.div
                key={blog.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group flex flex-col md:flex-row gap-6 p-4 rounded-2xl bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-xl hover:bg-[#0f0f14] hover:border-violet-500/30 transition-all duration-300"
                >
                  {/* Left: Image */}
                  <div className={`relative w-full md:w-72 lg:w-80 h-48 sm:h-56 md:h-60 lg:h-64 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${blog.accent}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_70%)]" />
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <PenTool className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-wider uppercase">
                      {blog.category}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex flex-col flex-1 py-2 pr-2">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-medium">
                      <span>{blog.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" />
                      <span>{blog.readTime}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2">
                      {blog.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-white/10 overflow-hidden">
                          {blog.authorImage ? (
                            <img src={blog.authorImage} alt={blog.authorName} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full bg-violet-500" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-300">
                          {blog.authorName}
                        </span>
                      </div>
                      
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Blogs;
