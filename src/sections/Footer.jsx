import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import ContactDialog from "./ContactDialog";

const Footer = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="relative z-10 w-full h-full pt-20 pb-24 lg:pb-12 px-6 overflow-hidden mt-10">
      {/* Cool glassmorphism top border / divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10 relative z-10">
        <div className="text-center space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
          >
            Let's work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              together
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-md mx-auto text-lg font-light leading-relaxed"
          >
            I'm currently available for new opportunities. If you have a project
            that needs some creative magic, I'd love to hear from you.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
        >
          <ShimmerButton
            onClick={() => setContactOpen(true)}
            className="h-14 px-8"
            shimmerColor="#a855f7"
          >
            <span className="flex items-center justify-center gap-2 text-base font-semibold text-white">
              Say Hello <Mail className="w-5 h-5 ml-2" />
            </span>
          </ShimmerButton>
        </motion.div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full pt-8 border-t border-white/5 mt-8 gap-6">
          <p className="text-gray-400 text-sm flex items-center gap-2 font-medium">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by
            Saurav Singh
          </p>

          <div className="flex items-center gap-4">
            {[
              { Icon: Github, href: "https://github.com" },
              { Icon: Linkedin, href: "https://linkedin.com" },
            //   { Icon: Twitter, href: "https://twitter.com" },
            ].map(({ Icon, href }, i) => (
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                key={i}
                href={href}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-300 shadow-xl backdrop-blur-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[40rem] h-[20rem] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </footer>
  );
};

export default Footer;
