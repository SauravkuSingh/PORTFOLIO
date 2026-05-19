"use client";

import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";
import { Code2, Zap, Heart } from "lucide-react";

const VALUES = [
  {
    icon: Code2,
    title: "Clean code",
    body: "If it's hard to read, it'll be hard to maintain. I'd rather write 30 obvious lines than 5 clever ones.",
    color: "text-violet-400",
  },
  {
    icon: Zap,
    title: "Performance",
    body: "Slow software is rude software. I sweat first paint, bundle size, and the gap between click and feedback.",
    color: "text-fuchsia-400",
  },
  {
    icon: Heart,
    title: "User experience",
    body: "Buttons should feel like buttons. Loading states should exist. Errors should be helpful. The basics still matter.",
    color: "text-indigo-400",
  },
];

const About = () => {
  const data = [
    {
      title: "2026 — Present",
      content: (
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Frontend Developer
          </h4>
          <h5 className="text-lg text-blue-400 font-medium mb-4">
            @ Empmonitor
          </h5>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            Current
          </div>

          <p className="text-neutral-300 mb-6 text-sm md:text-base leading-relaxed">
            Working on the UI revamp and frontend modernization of a
            production-grade platform. Focused on scalable React component
            architecture, improving responsiveness, and restructuring legacy UI
            systems for maintainability and performance.
          </p>

          <ul className="list-disc list-inside text-neutral-400 text-sm space-y-2 mb-6">
            <li>Refactored reusable UI components</li>
            <li>Optimized large dashboard data rendering</li>
            <li>Improved UX consistency across modules</li>
            <li>Enhanced frontend structure for scalability</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                alt="Dashboard UI"
                loading="lazy"
                decoding="async"
                className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                alt="Code on screen"
                loading="lazy"
                decoding="async"
                className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            UI/UX Developer
          </h4>
          <h5 className="text-lg text-fuchsia-400 font-medium mb-4">
            @ Globussoft
          </h5>

          <p className="text-neutral-300 mb-6 text-sm md:text-base leading-relaxed">
            Designed and implemented responsive web interfaces for production
            applications. Collaborated with backend teams to integrate APIs and
            translate design systems into scalable frontend components.
          </p>

          <ul className="list-disc list-inside text-neutral-400 text-sm space-y-2 mb-6">
            <li>Built responsive layouts using modern CSS</li>
            <li>Converted UI designs into reusable components</li>
            <li>Improved cross-browser compatibility</li>
            <li>Enhanced overall user experience</li>
          </ul>

          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
              alt="UI Development"
              className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2019 – 2023",
      content: (
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Bachelor of Technology (B.Tech)
          </h4>
          <h5 className="text-lg text-indigo-400 font-medium mb-4">
            Shri Shankaracharya Technical Campus, Bhilai (SSTC)
          </h5>

          <p className="text-neutral-300 mb-6 text-sm md:text-base leading-relaxed">
            Completed B.Tech with strong foundations in Data Structures,
            Algorithms, Database Systems, and Software Engineering. Developed
            problem-solving skills and built multiple academic and personal
            projects.
          </p>

          <ul className="list-disc list-inside text-neutral-400 text-sm space-y-2 mb-6">
            <li>Strengthened core programming concepts</li>
            <li>Worked on academic & self-driven projects</li>
            <li>Built frontend-focused applications</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <img
                src="/assets/college.webp"
                alt="University"
                loading="lazy"
                decoding="async"
                className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative group">
              <img
                src="/assets/campus.webp"
                alt="University"
                loading="lazy"
                decoding="async"
                className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full relative pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center"
        >
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-300 tracking-[0.2em] uppercase">
                About me · Open to work
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05]">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">
                Saurav.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              A full-stack developer who likes building things that feel as good
              as they work. I work mostly with{" "}
              <span className="text-white font-medium">React</span>,{" "}
              <span className="text-white font-medium">Next.js</span>, and{" "}
              <span className="text-white font-medium">Node.js</span> — and I
              care a lot about the small details users never quite notice but
              always feel.
            </p>
          </div>

          {/* Profile pic glass card */}
          <div className="hidden lg:block shrink-0">
            <div className="relative w-56 h-56 xl:w-64 xl:h-64 rounded-3xl p-2 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 to-black">
                <img
                  src="/assets/profile.webp"
                  alt="Saurav Singh — Full Stack Developer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-[1.6rem] blur-xl opacity-50 -z-10" />
            </div>
          </div>
        </motion.div>

        {/* STORY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-24 max-w-3xl"
        >
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-6">
            The story
          </h2>
          <div className="space-y-5">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              I stumbled into web development the way most curious people do —
              by trying to make a webpage look "cooler" than it had any right
              to. That curiosity stuck around. I went on to do a B.Tech at SSTC
              in Bhilai, picked up frontend in earnest at{" "}
              <span className="text-fuchsia-400 font-medium">Globussoft</span>,
              and I'm now at{" "}
              <span className="text-blue-400 font-medium">Empmonitor</span>{" "}
              working on the UI revamp of a production-grade platform.
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Most days I'm thinking about component architecture, how to make
              slow pages feel fast, or trying to talk myself out of yet another
              animation. I take freelance projects on the side — mostly with
              small teams and founders who care about how their product feels.
            </p>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Outside the editor I'm usually reading about design systems,
              tinkering with side projects, or trying to make my keyboard click
              in just the right way.
            </p>
          </div>
        </motion.div>

        {/* VALUES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-24"
        >
          <h2 className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-6">
            What I care about
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-5 hover:border-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${v.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {v.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* TIMELINE (with built-in section heading) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full mt-12 lg:mt-16"
      >
        <Timeline data={data} />
      </motion.div>

    </div>
  );
};

export default About;
