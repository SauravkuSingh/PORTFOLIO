"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project, index = 0 }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-white/10 hover:from-violet-500/40 hover:via-fuchsia-500/30 hover:to-indigo-500/40 transition-colors shadow-2xl"
    >
      {/* Outer glow on hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-col h-full text-left rounded-2xl bg-[#0a0a0a]/85 backdrop-blur-xl p-3"
      >
        {/* Preview */}
        <div
          className={`relative h-44 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br ${project.accent}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Hover arrow */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-0 -rotate-45 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          {/* Category tag */}
          {project.category && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white/90 tracking-wide uppercase">
              {project.category}
            </div>
          )}
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
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
