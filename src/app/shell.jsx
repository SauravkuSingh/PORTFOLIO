"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import Navbar from "@/layout/Navbar";
import Footer from "@/sections/Footer";
import Background from "@/components/background/Background";

export default function Shell({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  // Initialise Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      orientation: "vertical",
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll on route change (use Lenis if available, else fallback)
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
