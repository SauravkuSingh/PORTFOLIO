"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { renderProjectPreview } from "@/components/ProjectMockups";
import { PROJECTS } from "@/data/projects";

const FILTERS = ["All", "Web Apps", "Full Stack", "Frontend"];
const MotionLink = motion.create(Link);

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

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <MotionLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col text-left rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-3 hover:border-white/20 hover:bg-[#0a0a0a]/80 transition-colors shadow-xl"
              >
                <div
                  className={`relative h-44 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br ${project.accent}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
                  {renderProjectPreview(project)}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 px-2 pt-4 pb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 px-2 pb-2 mt-auto">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] sm:text-[11px] font-medium text-gray-300 px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </MotionLink>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
