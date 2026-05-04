"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/layout/Navbar";
import Footer from "@/sections/Footer";
import Background from "@/components/background/Background";

export default function Shell({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Background />
      <div className="min-h-screen relative z-10 text-white">
        <Navbar />
        <main key={pathname}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
