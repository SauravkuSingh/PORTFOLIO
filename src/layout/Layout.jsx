import { Dock, DockIcon } from "@/components/ui/dock";
import { CircleUserRound, Home as HomeIcon } from "lucide-react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Tech from "@/pages/Tech";
import Navbar from "./Navbar";
import Background from '@/components/background/Background'

const Layout = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <> <Background/>
      <div className="min-h-screen relative z-10 inset-0 text-white">
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
              <CircleUserRound />
            </button>
          </DockIcon>
        </Dock>
      </div>
    </>
  );
};

export default Layout;
