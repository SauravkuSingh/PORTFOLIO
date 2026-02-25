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
    <div className="flex items-center justify-center min-h-screen relative z-10 px-6 sm:px-10 pt-32 pb-24 lg:pt-24 lg:pb-12 overflow-hidden">
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
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 z-10 w-full">
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
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4rem] font-bold tracking-tighter text-white leading-[1.1]">
              Crafting <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">
                Digital Experiences
              </span>
            </h1>

            <div className="text-md md:text-2xl lg:text-3xl text-gray-400 font-light flex flex-wrap items-center justify-center lg:justify-start gap-2 min-h-[40px]">
              <span>Specializing in</span>
              <TypingAnimation
                words={[
                  "Frontend Development",
                  "UI/UX Design",
                  "React Ecosystem",
                  "Creative Coding",
                ]}
                loop
                className="text-white font-medium"
                duration={80}
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
                  background="rgba(17, 24, 39, 0.8)"
                  className="h-14 px-8 w-full shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]"
                >
                  <span className="flex items-center justify-center gap-2 text-base font-semibold text-white">
                    View Projects
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

        {/* Right Content / Image Glassmorphism Card */}
        <motion.div
          className="flex justify-center items-center w-full relative perspective-1000 mt-2 sm:mt-24 lg:mt-0 py-8 lg:py-0"
          variants={photoVariants}
          whileHover="hover"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] rounded-[2.5rem] p-3 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group transition-transform duration-500 transform-gpu preserve-3d">
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
          <motion.div
            className="absolute top-10 -left-6 sm:-left-10 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">&lt;/&gt;</span>
              </div>
              <div>
                <p className="text-xs text-gray-300 font-medium tracking-wide">
                  Frontend
                </p>
                <p className="text-sm text-white font-bold">Engineer</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute -top-6 -right-4 sm:right-10 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <SiReact className="text-blue-500 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 -right-4 sm:-right-2 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
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
              <p className="text-xs font-semibold text-white">10+ Projects</p>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-10 -left-4 sm:left-8 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <div className="flex items-center gap-3">
              <SiNextdotjs className="text-white text-2xl" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-6 sm:right-10 px-3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <SiTailwindcss className="text-cyan-400 text-2xl" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 -left-6 sm:left-5 px-3 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <SiTypescript className="text-blue-500 text-2xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
