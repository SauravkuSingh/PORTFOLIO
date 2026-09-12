import Home from "@/sections/Home";
import AboutPreview from "@/sections/AboutPreview";
import Tech from "@/sections/Tech";
import FeaturedProjects from "@/sections/FeaturedProjects";
import Faq from "@/sections/Faq";

export const metadata = {
  title: "Saurav Singh — Full Stack Developer (React, Next.js, Node.js)",
  description:
    "Portfolio of Saurav Singh — Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript. Based in Bhilai, India.",
  alternates: {
    canonical: "/",
  },
};

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
