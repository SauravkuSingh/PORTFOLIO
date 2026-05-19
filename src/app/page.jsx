"use client";

import dynamic from "next/dynamic";
import Home from "@/sections/Home";
import AboutPreview from "@/sections/AboutPreview";

// Below-fold sections — code-split so they load only when the user scrolls
const Tech = dynamic(() => import("@/sections/Tech"));
const FeaturedProjects = dynamic(() =>
  import("@/sections/FeaturedProjects"),
);
const Faq = dynamic(() => import("@/sections/Faq"));

const Page = () => {
  return (
    <>
      <Home />
      <AboutPreview />
      <Tech />
      <FeaturedProjects />
      <Faq />
    </>
  );
};

export default Page;
