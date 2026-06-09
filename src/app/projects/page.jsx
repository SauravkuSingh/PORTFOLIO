import Projects from "@/sections/Projects";
import { getGithubProjects } from "@/lib/github";

export const metadata = {
  title: 'Projects – Saurav Singh | React & Next.js Portfolio',
  description: 'Explore web development projects by Saurav Singh — built with React, Next.js, Node.js and modern tools.',
  alternates: {
    canonical: '/projects',
  },
}

// Re-fetch the GitHub repo list at most once an hour (ISR) so newly published
// public repos with a live link appear automatically — no redeploy needed.
export const revalidate = 3600;

export default async function ProjectsPage() {
  const githubProjects = await getGithubProjects();
  return <Projects githubProjects={githubProjects} />;
}
