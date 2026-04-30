"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import ProjectDetail from "@/sections/ProjectDetail";

export default function ProjectSlugPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <section className="relative z-2 px-6 sm:px-10 pt-40 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">
            Project not found
          </h1>
          <p className="text-gray-400 mt-4">
            The project you're looking for doesn't exist or has moved.
          </p>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return <ProjectDetail project={project} />;
}
