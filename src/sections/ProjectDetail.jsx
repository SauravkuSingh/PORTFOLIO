"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Check,
  Sparkles,
  BarChart3,
  ImageDown,
  Bitcoin,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiStripe,
  SiSocketdotio,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiVite,
  SiExpress,
  SiJsonwebtokens,
  SiFramer,
  SiGithub,
  SiReactrouter,
} from "react-icons/si";
import { Safari } from "@/components/ui/safari";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const ProjectImage = ({ project, className = "" }) => (
  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
    {project.image && (
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )}
  </div>
);

const TECH = {
  "Next.js": { Icon: SiNextdotjs, color: "text-white" },
  React: { Icon: SiReact, color: "text-blue-400" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "text-cyan-400" },
  "Node.js": { Icon: SiNodedotjs, color: "text-green-500" },
  MongoDB: { Icon: SiMongodb, color: "text-green-400" },
  Stripe: { Icon: SiStripe, color: "text-violet-400" },
  Express: { Icon: SiExpress, color: "text-zinc-300" },
  "Socket.io": { Icon: SiSocketdotio, color: "text-zinc-200" },
  JWT: { Icon: SiJsonwebtokens, color: "text-pink-400" },
  JavaScript: { Icon: SiJavascript, color: "text-yellow-400" },
  HTML: { Icon: SiHtml5, color: "text-orange-500" },
  CSS: { Icon: SiCss3, color: "text-blue-500" },
  Vite: { Icon: SiVite, color: "text-violet-400" },
  LocalStorage: { Icon: SiJavascript, color: "text-yellow-400" },
  "OpenWeather API": { Icon: SiJavascript, color: "text-sky-400" },
  "Framer Motion": { Icon: SiFramer, color: "text-fuchsia-400" },
  "Gemini API": { Icon: Sparkles, color: "text-violet-400" },
  "GitHub API": { Icon: SiGithub, color: "text-white" },
  Recharts: { Icon: BarChart3, color: "text-emerald-400" },
  html2canvas: { Icon: ImageDown, color: "text-amber-400" },
  "React Router": { Icon: SiReactrouter, color: "text-red-400" },
  "CoinGecko API": { Icon: Bitcoin, color: "text-yellow-400" },
};

const ProjectDetail = ({ project }) => {
  return (
    <section className="relative z-2 px-6 sm:px-10 pt-32 pb-20 lg:pt-32 lg:pb-28">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05]">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 font-medium">
              {project.tagline}
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShimmerButton
                  shimmerColor="#a855f7"
                  className="h-12 px-5"
                  background="linear-gradient(135deg, #6d28d9, #a855f7)"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </span>
                </ShimmerButton>
              </a>
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
              >
                <Code2 className="w-4 h-4" />
                View Code
              </a>
            </div>
          </motion.div>

          {/* Safari Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Safari url={project.url}>
              <ProjectImage project={project} />
            </Safari>
          </motion.div>
        </div>

        {/* Two-column info */}
        <div className="grid lg:grid-cols-2 gap-5 mt-12 lg:mt-16">
          {/* Left: Overview + Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-6 lg:p-7 space-y-6"
          >
            <div>
              <h2 className="text-base font-semibold text-white mb-3">
                Project Overview
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {project.overview}
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-white mb-3">
                Key Features
              </h2>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Tech Stack + Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-6 lg:p-7">
              <h2 className="text-base font-semibold text-white mb-4">
                Tech Stack
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {project.fullStack.map((tech) => {
                  const meta = TECH[tech];
                  const Icon = meta?.Icon;
                  return (
                    <div
                      key={tech}
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-3 hover:bg-white/10 transition-colors"
                    >
                      {Icon ? (
                        <Icon
                          className={`w-6 h-6 ${meta.color || "text-white"}`}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-md bg-white/10 border border-white/10 flex items-center justify-center text-[11px] font-bold text-gray-300">
                          {tech.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-[11px] font-medium text-gray-300 text-center leading-tight">
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-6 lg:p-7">
              <h2 className="text-base font-semibold text-white mb-4">
                Project Info
              </h2>
              <div className="space-y-2.5">
                {Object.entries(project.info).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-500">{key}</span>
                    <span className="text-gray-200 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Screenshots */}
        {project.screenshots?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 lg:mt-16"
          >
            <h2 className="text-base font-semibold text-white mb-4">
              Screenshots
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {project.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-[#0a0a0a]/60 p-2 hover:border-white/20 transition-colors"
                >
                  <div className="relative h-24 sm:h-28 rounded-lg overflow-hidden">
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
