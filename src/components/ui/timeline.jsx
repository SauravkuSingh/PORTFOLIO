"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl mb-4 font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 max-w-4xl">
          My Professional Journey
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-md mt-2">
          Here&apos;s a timeline of my experience, projects, and education.
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="flex flex-col md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-1 md:left-3 w-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border border-white/20 p-2 shadow-inner" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-14 md:pl-4 pr-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-6 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/10 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
