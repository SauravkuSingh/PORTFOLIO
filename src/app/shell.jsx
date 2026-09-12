"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import Navbar from "@/layout/Navbar";
import Footer from "@/sections/Footer";
import Background from "@/components/background/Background";
import ChatWidget from "@/components/bot/ChatWidget";

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

    // Observe DOM height changes to automatically resize Lenis
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll on route change and recalculate page dimensions
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => {
        lenisRef.current?.resize();
      });
      // Additional fallback timers for lazy/dynamically imported components
      const t1 = setTimeout(() => lenisRef.current?.resize(), 100);
      const t2 = setTimeout(() => lenisRef.current?.resize(), 400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
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
      <ChatWidget />
    </>
  );
}
