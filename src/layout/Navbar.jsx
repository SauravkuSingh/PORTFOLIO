import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import profileImg from "@/assets/profile.png";
import ContactDialog from "@/pages/ContactDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isCompact = isScrolled && !isHovered;

  return (
    <div className="fixed top-6 left-0 w-full z-[100] flex justify-center pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20, width: "90%", maxWidth: 900 }}
        animate={{
          opacity: 1,
          y: 0,
          width: isCompact ? 120 : "90%",
          maxWidth: isCompact ? 120 : 900,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto flex items-center h-14 sm:h-16 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-xl overflow-hidden relative cursor-pointer"
        style={{
          padding: isCompact ? "0" : "0 1.5rem",
          justifyContent: isCompact ? "center" : "space-between",
        }}
      >
        <AnimatePresence mode="wait">
          {isCompact ? (
            <motion.div
              key="clock"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="font-mono text-sm font-medium tracking-widest text-white whitespace-nowrap"
            >
              {time}
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between w-full min-w-max"
            >
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                  <img
                    className="rounded-full w-full h-full object-cover"
                    src={profileImg}
                    alt="Profile"
                  />
                </div>
                <span className="text-white text-sm tracking-wide font-medium">
                  Saurav Singh
                </span>
              </div>
              <ShimmerButton className="text-xs px-4 sm:px-6" onClick={() => setContactOpen(true)}>
                Let's Connect
              </ShimmerButton>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Navbar;
