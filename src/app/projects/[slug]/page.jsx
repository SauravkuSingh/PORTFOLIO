import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { getGithubProjects, getGithubProjectBySlug } from "@/lib/github";
import ProjectDetail from "@/sections/ProjectDetail";

// Keep auto-pulled repos fresh (ISR) without a redeploy.
export const revalidate = 3600;

// Pre-render a detail page for every curated and auto-pulled project.
export async function generateStaticParams() {
  const github = await getGithubProjects();
  return [...PROJECTS, ...github].map((p) => ({ slug: p.slug }));
}

export default async function ProjectSlugPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug) || (await getGithubProjectBySlug(slug));

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
