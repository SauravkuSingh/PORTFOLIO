import React from "react";
import LogoLoop from "../components/LogoLoop";
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
const Tech = () => {
  const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
  { node: <SiDocker />, title: "Docker", href: "https://docker.com" },
  { node: <SiReactrouter />, title: "React Router", href: "https://reactrouter.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
];
  return (
    <div className=" relative py-70 overflow-hidden">
        <div className=" absolute inset-0 bg-linear-to-b from-black/20 to-black/60 ">
            <div className="text-center mb-16">
            <p className="text-zinc-400 uppercase tracking-widest text-sm mt-10">
                Technology
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
                Tech Stack I Use
            </h2>
            <div className="w-20 h-0.5 bg-zinc-700 mx-auto mt-6" />
        </div>
      <LogoLoop
        logos={techLogos}
        speed={160}
        direction="left"
        logoHeight={100}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
        className="mt-10 text-white"
      />
      <LogoLoop
        logos={techLogos}
        speed={160}
        direction="right"
        logoHeight={100}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
        className="mt-10 text-white"
      />

        </div>
        
    </div>
  );
};

export default Tech;
