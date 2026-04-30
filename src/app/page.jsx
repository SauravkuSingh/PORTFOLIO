"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import { CircleUserRound, Cpu, Home as HomeIcon } from "lucide-react";
import Home from "@/sections/Home";
import About from "@/sections/About";
import Tech from "@/sections/Tech";
import Footer from "@/sections/Footer";
import Navbar from "@/layout/Navbar";
import Background from "@/components/background/Background";

const Page = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Background />
      <div className="min-h-screen relative z-10 text-white">
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
      </div>
    </>
  );
};

export default Page;
