import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";

const About = () => {
  const data = [
    {
      title: "2026 — Present",
      content: (
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Frontend Engineer
          </h4>
          <h5 className="text-lg text-blue-400 font-medium mb-4">
            @ Empmonitor
          </h5>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            Current
          </div>

          <p className="text-neutral-300 mb-6 text-sm md:text-base leading-relaxed">
            Working on the UI revamp and frontend modernization of a
            production-grade platform. Focused on scalable React component
            architecture, improving responsiveness, and restructuring legacy UI
            systems for maintainability and performance.
          </p>

          <ul className="list-disc list-inside text-neutral-400 text-sm space-y-2 mb-6">
            <li>Refactored reusable UI components</li>
            <li>Optimized large dashboard data rendering</li>
            <li>Improved UX consistency across modules</li>
            <li>Enhanced frontend structure for scalability</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                alt="Dashboard UI"
                className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                alt="Code on screen"
                className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "2024",
      content: (
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            UI/UX Developer
          </h4>
          <h5 className="text-lg text-fuchsia-400 font-medium mb-4">
            @ Globussoft
          </h5>

          <p className="text-neutral-300 mb-6 text-sm md:text-base leading-relaxed">
            Designed and implemented responsive web interfaces for production
            applications. Collaborated with backend teams to integrate APIs and
            translate design systems into scalable frontend components.
          </p>

          <ul className="list-disc list-inside text-neutral-400 text-sm space-y-2 mb-6">
            <li>Built responsive layouts using modern CSS</li>
            <li>Converted UI designs into reusable components</li>
            <li>Improved cross-browser compatibility</li>
            <li>Enhanced overall user experience</li>
          </ul>

          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
              alt="UI Development"
              className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      ),
    },

    {
      title: "2019 – 2023",
      content: (
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Bachelor of Technology (B.Tech)
          </h4>
          <h5 className="text-lg text-indigo-400 font-medium mb-4">
            Chhattisgarh Swami Vivekanand Technical University (CSVTU)
          </h5>

          <p className="text-neutral-300 mb-6 text-sm md:text-base leading-relaxed">
            Completed B.Tech with strong foundations in Data Structures,
            Algorithms, Database Systems, and Software Engineering. Developed
            problem-solving skills and built multiple academic and personal
            projects.
          </p>

          <ul className="list-disc list-inside text-neutral-400 text-sm space-y-2 mb-6">
            <li>Strengthened core programming concepts</li>
            <li>Worked on academic & self-driven projects</li>
            <li>Built frontend-focused applications</li>
          </ul>

          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
              alt="University"
              className="rounded-xl object-cover h-40 md:h-56 w-full shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full relative pt-24 md:pt-36 pb-12 overflow-hidden">
      {/* Background glow similar to home page */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <Timeline data={data} />
      </motion.div>
    </div>
  );
};

export default About;
