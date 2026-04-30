import React from "react";
import { Marquee } from "@/components/ui/marquee";
import {
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiFigma,
  SiDocker,
  SiReactrouter,
  SiGithub,
  SiGit,
  SiTypescript,
} from "react-icons/si";

const techLogos = [
  { Icon: SiReact, name: "React", color: "text-cyan-400" },
  { Icon: SiNodedotjs, name: "Node.js", color: "text-green-500" },
  { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-400" },
  { Icon: SiHtml5, name: "HTML5", color: "text-orange-500" },
  { Icon: SiCss3, name: "CSS3", color: "text-blue-500" },
  { Icon: SiTailwindcss, name: "Tailwind CSS", color: "text-cyan-300" },
  { Icon: SiFigma, name: "Figma", color: "text-pink-400" },
  { Icon: SiDocker, name: "Docker", color: "text-blue-400" },
  { Icon: SiReactrouter, name: "React Router", color: "text-red-400" },
  { Icon: SiGithub, name: "GitHub", color: "text-white" },
  { Icon: SiGit, name: "Git", color: "text-orange-600" },
  { Icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
];

const TechCard = ({ Icon, name, color }) => (
  <div className="mx-2 flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-colors shadow-lg">
    <Icon className={`w-7 h-7 ${color}`} />
    <span className="text-sm font-medium text-gray-200 whitespace-nowrap">
      {name}
    </span>
  </div>
);

const Tech = () => {
  return (
    <section className="relative py-6 lg:py-12 overflow-hidden">
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative">
        <div className="text-center mb-12 lg:mb-16 px-6">
          <p className="text-zinc-400 uppercase tracking-widest text-sm">
            Technology
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Tech Stack I Use
          </h2>
          <div className="w-20 h-0.5 bg-zinc-700 mx-auto mt-6" />
        </div>

        <div className="relative flex flex-col gap-4">
          <Marquee pauseOnHover className="[--duration:40s]">
            {techLogos.map((tech) => (
              <TechCard key={tech.name} {...tech} />
            ))}
          </Marquee>
          {/* <Marquee reverse pauseOnHover className="[--duration:40s]">
            {techLogos.map((tech) => (
              <TechCard key={`r-${tech.name}`} {...tech} />
            ))}
          </Marquee> */}

          {/* Edge fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-linear-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-linear-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Tech;
