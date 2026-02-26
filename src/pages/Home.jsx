import { motion } from "framer-motion";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { CoolMode } from "@/components/ui/cool-mode";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  Download,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
} from "lucide-react";
import profileImg from "@/assets/profile.png";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import RotatingText from "@/components/RotatingText";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(20px)", rotate: -5, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotate: 0,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
    hover: {
      scale: 1.05,
      filter: "brightness(1.1)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative z-2 px-6 sm:px-10 pt-32 pb-24 lg:pt-24 lg:pb-12 overflow-hidden">
      {/* Abstract Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <motion.div
        className="max-w-7xl w-full mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 z-10 w-full">
          {/* Status Pill */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl group cursor-pointer hover:bg-white/10 transition-colors">
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium text-gray-200">
                Open to new opportunities
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-6 relative">
            {/* Hand-drawn thought annotation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute -top-12 -left-2 sm:-top-20 sm:-left-32 lg:-top-24 lg:-left-32 z-20 pointer-events-none flex items-start"
            >
              <div className="relative rotate-[-18deg] flex flex-col items-center hidden sm:flex">
                <div className="relative w-max">
                  {/* Scribble Box */}
                  <svg
                    className="absolute -inset-2 w-[calc(100%+2rem)] h-[calc(100%+1rem)] text-purple-400/60 pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        delay: 1.3,
                        duration: 1.2,
                        ease: "easeOut",
                      }}
                      d="M 5,10 Q 50,2 95,15 Q 98,50 85,90 Q 40,95 10,85 Q 0,40 5,10 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-xl sm:text-3xl lg:text-4xl text-purple-300/90 font-bold whitespace-nowrap leading-none px-2 py-1 sm:px-3 sm:py-2 tracking-wide"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Hi I'm Saurav
                  </span>
                </div>

                {/* Arrow pointing down and right */}
                <svg
                  className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-purple-400/80 -mt-2 ml-8 sm:ml-10 lg:ml-16"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.7, duration: 0.8, ease: "easeOut" }}
                    d="M 20 10 Q 20 80, 90 80"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.3 }}
                    d="M 75 70 L 90 80 L 75 90"
                  />
                </svg>
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4rem] font-bold tracking-tighter text-white leading-[1.1]">
              Building Scalable
              <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">
                Full-Stack Applications
              </span>
            </h1>

            <div className="text-md md:text-2xl lg:text-3xl text-gray-400 font-medium flex flex-wrap items-center justify-center lg:justify-start gap-2 min-h-[40px]">
              <span>Focused on</span>
              <RotatingText
                texts={["React Frontends", "Node APIs", "Databases"]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-[#5227ff] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-xl leading-relaxed font-light"
          >
            I'm a software engineer passionate about building accessible,
            pixel-perfect user interfaces that blend thoughtful design with
            robust engineering.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-5 mt-4 w-full sm:w-auto"
          >
            <CoolMode options={{ particle: "✨", size: 14 }}>
              <div className="w-full sm:w-auto">
                <ShimmerButton
                  shimmerColor="#a855f7"
                  className="h-14 px-8 w-full"
                >
                  <span className="flex items-center justify-center gap-2 text-base font-semibold text-white">
                    Explore Projects
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </ShimmerButton>
              </div>
            </CoolMode>
            <div>
              <button className="h-14 px-8 w-full sm:w-auto rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Resume
              </button>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-6"
          >
            {[
              { Icon: Github, href: "https://github.com" },
              { Icon: Linkedin, href: "https://linkedin.com" },
              // { Icon: Twitter, href: "https://twitter.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-300 shadow-xl backdrop-blur-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Content  */}
        <motion.div
          className="flex justify-center items-center w-full relative perspective-1000 lg:mt-0 py-8 lg:py-0 order-first lg:order-last mt-12 lg:mt-0"
          variants={photoVariants}
          whileHover="hover"
        >
          {/* Inner fixed-size wrapper to keep floating icons accurately positioned across all laptop/desktop screens */}
          <div className="relative w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] lg:w-[26rem] lg:h-[26rem] xl:w-[28rem] xl:h-[28rem]">
            {/* Main Glass Card containing Image */}
            <div className="absolute inset-0 rounded-[2.5rem] p-3 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group transition-transform duration-500 transform-gpu preserve-3d cursor-pointer">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-b from-gray-800 to-black isolate">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-white/10 mix-blend-overlay"></div>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
            </div>

            {/* Floating UI Elements (Decorative) */}
            <motion.div
              className="absolute top-2 -left-2 sm:top-8 sm:-left-10 xl:-left-12 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 scale-75 sm:scale-100 origin-top-left"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    &lt;/&gt;
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">
                    Frontend
                  </p>
                  <p className="text-sm text-white font-bold">Engineer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-6 xl:-right-8 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 scale-75 sm:scale-100 origin-top-right"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="flex items-center gap-3">
                <SiReact className="text-blue-500 text-3xl xl:text-4xl shadow-blue-500/50 drop-shadow-lg" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-6 -right-2 sm:bottom-12 sm:-right-8 xl:-right-10 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 scale-75 sm:scale-100 origin-bottom-right"
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full border border-gray-600 bg-black/50 backdrop-blur-md flex items-center justify-center relative z-30">
                    <SiReact className="text-blue-500 text-sm" />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-gray-600 bg-black/50 backdrop-blur-md flex items-center justify-center relative z-20">
                    <SiNextdotjs className="text-white text-sm" />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-gray-600 bg-black/50 backdrop-blur-md flex items-center justify-center relative z-10">
                    <SiTailwindcss className="text-cyan-400 text-sm" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-white tracking-wide">
                  10+ Projects
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 -left-2 sm:bottom-16 sm:-left-6 xl:-left-8 px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 scale-75 sm:scale-100 origin-bottom-left"
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <div className="flex items-center gap-3">
                <SiNextdotjs className="text-white text-3xl shadow-white/50 drop-shadow-lg" />
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-2 sm:-right-10 xl:-right-12 px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 scale-75 sm:scale-100 origin-right"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <SiTailwindcss className="text-cyan-400 text-3xl shadow-cyan-400/50 drop-shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 -left-2 sm:-left-8 xl:-left-10 px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 scale-75 sm:scale-100 origin-left"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <SiTypescript className="text-blue-500 text-3xl shadow-blue-500/50 drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
