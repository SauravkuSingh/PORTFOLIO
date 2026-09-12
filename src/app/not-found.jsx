import Link from "next/link";
import { ArrowLeft, Compass, FileText, Home, Mail, Shield, FolderOpen } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Saurav Singh",
  description: "The page you are looking for does not exist. Recover via sitemap, agent instructions, or core navigation.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10 text-white">
      <div className="max-w-2xl w-full bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
            404 — Path Not Found
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            The path you requested does not exist on this server. If you are an AI agent or automated crawler, please use the recovery index and sitemap links below.
          </p>
        </div>

        {/* Agent Recovery Section */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-violet-400 flex items-center gap-2">
            <Compass className="w-4 h-4" /> Agent & Crawler Recovery Index
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center justify-between py-1 border-b border-white/5">
              <span>XML Sitemap</span>
              <a href="/sitemap.xml" className="text-violet-400 hover:underline font-mono text-xs">/sitemap.xml</a>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-white/5">
              <span>Agent Instructions</span>
              <a href="/llms.txt" className="text-violet-400 hover:underline font-mono text-xs">/llms.txt</a>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-white/5">
              <span>Markdown Negotiation</span>
              <span className="text-gray-400 text-xs">Accept: text/markdown</span>
            </li>
          </ul>
        </div>

        {/* Site Directory */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Where to Look Next
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Home className="w-4 h-4 text-violet-400" />
              <span>Homepage</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <FileText className="w-4 h-4 text-fuchsia-400" />
              <span>About & Experience</span>
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <FolderOpen className="w-4 h-4 text-indigo-400" />
              <span>Projects Portfolio</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Contact Page</span>
            </Link>
            <Link
              href="/privacy"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Privacy Policy</span>
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
