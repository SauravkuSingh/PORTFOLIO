import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { renderMockup } from "@/components/ProjectMockups";
import { PROJECTS } from "@/data/projects";

const FeaturedProjects = ({ onViewAll, onSelectProject }) => {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className="relative z-2 px-6 sm:px-10 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 lg:mb-10">
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase">
            Featured Projects
          </h2>
          <button
            type="button"
            onClick={onViewAll}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            View all projects
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <motion.button
              key={project.slug}
              type="button"
              onClick={() => onSelectProject?.(project.slug)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col text-left rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-3 hover:border-white/20 hover:bg-[#0a0a0a]/80 transition-colors shadow-xl cursor-pointer"
            >
              <div
                className={`relative h-40 sm:h-44 rounded-xl overflow-hidden bg-gradient-to-br ${project.accent}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
                {renderMockup(project.mockup)}
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
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
