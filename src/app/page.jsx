"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/sections/Home";
import About from "@/sections/About";
import Tech from "@/sections/Tech";
import Projects from "@/sections/Projects";
import FeaturedProjects from "@/sections/FeaturedProjects";
import ProjectDetail from "@/sections/ProjectDetail";
import Blogs from "@/sections/Blogs";
import Footer from "@/sections/Footer";
import Navbar from "@/layout/Navbar";
import Background from "@/components/background/Background";
import { getProjectBySlug } from "@/data/projects";

const Page = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, selectedProject]);

  const handleSelectProject = (slug) => {
    setSelectedProject(slug);
    setActiveTab("projects");
  };

  const handleTabChange = (tab) => {
    setSelectedProject(null);
    setActiveTab(tab);
  };

  const project = selectedProject ? getProjectBySlug(selectedProject) : null;

  const renderActive = () => {
    if (project) {
      return (
        <ProjectDetail
          project={project}
          onBack={() => setSelectedProject(null)}
        />
      );
    }
    switch (activeTab) {
      case "about":
        return <About />;
      case "projects":
        return <Projects onSelectProject={handleSelectProject} />;
      case "blogs":
        return <Blogs />;
      case "home":
      default:
        return (
          <>
            <Home />
            <About />
            <Tech />
            <FeaturedProjects
              onViewAll={() => setActiveTab("projects")}
              onSelectProject={handleSelectProject}
            />
          </>
        );
    }
  };

  const viewKey = project ? `detail-${project.slug}` : activeTab;

  return (
    <>
      <Background />
      <div className="min-h-screen relative z-10 text-white">
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
        <AnimatePresence mode="wait">
          <motion.main
            key={viewKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActive()}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
};

export default Page;
