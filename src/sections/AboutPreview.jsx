"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Briefcase, Code2, MailOpen } from "lucide-react";

const InfoCard = ({ Icon, label, title, sub, accent, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group relative rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-4 hover:border-white/20 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
        <Icon className={`w-4.5 h-4.5 ${accent}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
          {label}
        </p>
        <p className="text-sm font-semibold text-white mt-1 leading-snug">
          {title}
        </p>
        {sub && (
          <p className="text-xs text-gray-400 mt-0.5 leading-snug">{sub}</p>
        )}
      </div>
    </div>
  </motion.div>
);

const AboutPreview = () => {
  return (
    <section className="relative z-2 px-6 sm:px-10 py-20 lg:py-28 overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] bg-violet-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-indigo-600/8 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-gray-300 tracking-wide">
            A little about me
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 mt-8 items-center">
          {/* LEFT — Narrative */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.05]"
            >
              I build things that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">
                feel as good as they work.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-gray-300 leading-relaxed mt-6"
            >
              I'm a full-stack developer based in Bhilai, focused on shipping
              modern web apps that are fast, clean, and pleasant to use. Right
              now I'm modernizing a production platform at Empmonitor, and
              taking freelance work on the side.
            </motion.p>

           

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-sm font-medium transition-colors shadow-lg"
              >
                Read the full story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — Info cards */}
          <div className="flex flex-col gap-3">
            <InfoCard
              Icon={Briefcase}
              label="Now"
              title="Frontend Developer"
              sub="@ Empmonitor · Since 2026"
              accent="text-blue-400"
              delay={0.1}
            />
            <InfoCard
              Icon={Code2}
              label="Stack"
              title="React · Next.js · Node.js"
              sub="Tailwind · TypeScript · MongoDB"
              accent="text-fuchsia-400"
              delay={0.2}
            />
            <InfoCard
              Icon={MailOpen}
              label="Open for"
              title="Freelance & full-time roles"
              sub="Remote-friendly · IST overlap"
              accent="text-emerald-400"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
