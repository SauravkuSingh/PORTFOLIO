import { Dock, DockIcon } from "@/components/ui/dock";
import { CircleUserRound, Cpu, Home as HomeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Tech from "@/pages/Tech";
import Footer from "@/pages/Footer";
import Navbar from "./Navbar";
import Background from "@/components/background/Background";
import Loader from "./Loader";
import { AnimatePresence, motion } from "framer-motion";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <Background />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen relative z-10 text-white"
          >
            <Navbar />

            {/* SECTIONS */}
            <section id="home">
              <Home />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="tech">
              <Tech />
            </section>

            <section id="contact">
              <Footer />
            </section>
            

            {/* DOCK */}
            <Dock className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 text-white">
              <DockIcon>
                <button onClick={() => scrollToSection("home")}>
                  <HomeIcon />
                </button>
              </DockIcon>

              <DockIcon>
                <button onClick={() => scrollToSection("about")}>
                  <CircleUserRound />
                </button>
              </DockIcon>
              <DockIcon>
                <button onClick={() => scrollToSection("tech")}>
                  <Cpu />
                </button>
              </DockIcon>
            </Dock>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;
