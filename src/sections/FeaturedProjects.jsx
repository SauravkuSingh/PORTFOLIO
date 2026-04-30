"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { renderMockup } from "@/components/ProjectMockups";
import { PROJECTS } from "@/data/projects";

const MotionLink = motion.create(Link);

const FeaturedProjects = () => {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className="relative z-2 px-6 sm:px-10 py-24 lg:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-violet-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-fuchsia-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-gray-300 tracking-wide">
              Selected Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05]"
          >
            Things I've{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">
              Built
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mt-5 leading-relaxed"
          >
            A handful of projects I've shipped end-to-end — from clean
            interfaces to the APIs and data layers that power them.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <MotionLink
              key={project.slug}
              href={`/projects/${project.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col text-left rounded-2xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-white/10 hover:from-violet-500/40 hover:via-fuchsia-500/30 hover:to-indigo-500/40 transition-colors shadow-2xl"
            >
              {/* Outer glow on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <div className="flex flex-col h-full rounded-2xl bg-[#0a0a0a]/85 backdrop-blur-xl p-3">
                {/* Preview */}
                <div
                  className={`relative h-44 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br ${project.accent}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                  {renderMockup(project.mockup)}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-0 -rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white/90 tracking-wide uppercase">
                    {project.category}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-2 px-2 pt-5 pb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-fuchsia-300 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 px-2 pb-2 mt-auto pt-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium text-gray-300 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </MotionLink>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-14 lg:mt-16"
        >
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white text-sm font-semibold shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            <span className="relative flex items-center gap-2">
              View all projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
