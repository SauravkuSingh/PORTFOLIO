"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hourglass } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

const FILTERS = ["All", "Web Apps", "Full Stack", "Frontend"];

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="relative z-2 px-6 sm:px-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 lg:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white">
            My Projects
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-3">
            A collection of projects I've worked on.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 lg:mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                filter === f
                  ? "text-black"
                  : "text-gray-300 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="activeProjectFilter"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid or empty-state notice */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            key={`empty-${filter}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <div className="relative max-w-md w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl px-8 py-10 text-center shadow-xl overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-white/10 flex items-center justify-center mb-5">
                  <Hourglass className="w-6 h-6 text-violet-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
                  {filter} projects uploading soon
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  I'm wrapping up work in this category — check back shortly,
                  or explore the other tabs in the meantime.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
