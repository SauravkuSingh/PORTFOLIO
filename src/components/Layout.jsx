// components/Layout.jsx
import { Dock, DockIcon } from "@/components/ui/dock";
import { Home as HomeIcon, Settings } from "lucide-react";
import Home from "./Home";
import About from "./About";

const Layout = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* SECTIONS */}
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      {/* DOCK NAVIGATION */}
      <Dock className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 text-white">
        <DockIcon>
          <button onClick={() => scrollToSection("home")}>
            <HomeIcon />
          </button>
        </DockIcon>

        <DockIcon>
          <button onClick={() => scrollToSection("about")}>
            <Settings />
          </button>
        </DockIcon>
      </Dock>
    </>
  );
};

export default Layout;
