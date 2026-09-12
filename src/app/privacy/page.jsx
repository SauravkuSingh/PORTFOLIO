import Link from "next/link";
import { Shield, Lock, Eye, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy – Saurav Singh | Portfolio & Web Services",
  description:
    "Privacy Policy for Saurav Singh's portfolio website. Information regarding data collection, contact form usage, cookies, analytics, and user privacy rights.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative z-10 pt-28 md:pt-36 pb-20 px-6 sm:px-10 max-w-4xl mx-auto text-white">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-violet-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" /> Privacy & Data Transparency
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Last updated: September 13, 2026. This Privacy Policy explains how information is collected, used, and protected when you interact with https://www.sauravksingh.in.
        </p>
      </div>

      {/* Main Body */}
      <div className="bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Lock className="w-5 h-5 text-violet-400" /> 1. Information Collection & Purpose
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We collect personal information solely when you voluntarily submit details through our interactive contact form or communicate with us directly via email. The information collected includes:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside marker:text-violet-400 pl-2">
            <li><strong>Full Name</strong>: Used to personalize communication and address you in replies.</li>
            <li><strong>Email Address</strong>: Used to reply directly to your project inquiry, job opportunity, or technical question.</li>
            <li><strong>Phone Number</strong> (Optional): Used solely if you request telephone or WhatsApp communication regarding project scope.</li>
            <li><strong>Project Message & Scope</strong>: Used to evaluate project requirements, timelines, and proposal deliverables.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Eye className="w-5 h-5 text-fuchsia-400" /> 2. Data Usage & Third-Party Service Providers
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your personal data is treated with strict confidentiality. We do not sell, lease, rent, trade, or publicly display your contact information to third parties or marketing agencies under any circumstances.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            To ensure reliable transmission of your contact form messages, we utilize trusted infrastructure providers:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside marker:text-fuchsia-400 pl-2">
            <li><strong>Resend API</strong>: Secure transactional email delivery service used to dispatch incoming contact form notifications and auto-replies.</li>
            <li><strong>Vercel & Next.js Hosting</strong>: Serverless execution environment and CDN host for site delivery.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 3. Cookies & Essential Analytics
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            This site operates primarily static and server-rendered HTML pages with minimal client-side state. We do not place invasive cross-site tracking cookies, behavioral advertising scripts, or third-party retargeting pixels on your device.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Standard HTTP access logs (including IP addresses, user agent strings, and requested URLs) are processed automatically by host servers for security logging, DDoS defense, and infrastructure diagnostics.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" /> 4. Data Retention & User Rights
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We retain contact submission emails for as long as necessary to complete client engagements, fulfill contractual obligations, or maintain professional correspondence records.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            You maintain full control over your personal information. At any time, you have the right to:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside marker:text-blue-400 pl-2">
            <li>Request a copy of the personal data we hold about you.</li>
            <li>Request immediate deletion or correction of your contact records.</li>
            <li>Opt-out of any ongoing email correspondence.</li>
          </ul>
          <p className="text-gray-300 text-sm leading-relaxed pt-2">
            To exercise any of these rights, simply email your request to <a href="mailto:sauravsinghfsdev@gmail.com" className="text-violet-400 font-semibold hover:underline">sauravsinghfsdev@gmail.com</a>. Requests are processed within 48 hours.
          </p>
        </section>

        {/* Navigation back */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-violet-400 hover:underline"
          >
            Go to Contact Page &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
