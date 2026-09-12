import { NextResponse } from "next/server";

const VALID_MARKDOWN_ROUTES = {
  "/": `# Saurav Singh — Full Stack Developer (React, Next.js, Node.js)

> Full stack developer specializing in React, Next.js, and Node.js. Building fast, scalable, production-ready web applications. Based in Bhilai, India.

## Hero Overview
- **Name**: Saurav Singh
- **Role**: Full Stack Developer / Frontend Engineer
- **Location**: Bhilai, Chhattisgarh, India
- **Status**: Open to freelance and full-time engineering roles
- **Key Metrics**: 1600+ GitHub commits, 10+ shipped projects, 5+ freelance clients

## Bio
I build modern web applications that are fast, responsive, clean, and user-friendly. Currently modernizing production frontend architecture at Empmonitor and available for select freelance client projects.

## Core Navigation & Endpoints
- [About](/about) — Career history, values, and experience timeline
- [Projects](/projects) — Full-stack portfolio and live project demos
- [Blogs](/blogs) — Web engineering articles and guides
- [Contact](/contact) — Contact form, email, and response SLA
- [Privacy Policy](/privacy) — Data privacy and security commitments
- [Agent Guidance](/llms.txt) — Machine-readable agent instructions

## Contact Details
- **Email**: sauravsinghfsdev@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/saurav-singh-fsdev/
- **GitHub**: https://github.com/SauravkuSingh
`,

  "/about": `# About Saurav Singh — Full Stack Developer

> Full stack developer from Bhilai, India, with expertise in React, Next.js, Node.js, TypeScript, and modern web architectures.

## Professional Experience
### Frontend Developer @ Empmonitor (2026 – Present)
- UI revamp and frontend modernization of a production-grade enterprise platform.
- Scalable React component architecture, performance optimization, and responsive design systems.

### UI/UX Developer @ Globussoft (2024)
- Designed and developed responsive web interfaces for production web applications.
- API integration, frontend state management, and cross-browser performance tuning.

### Education
- **Bachelor of Technology (B.Tech)** (2019 – 2023)
- Shri Shankaracharya Technical Campus (SSTC), Bhilai

## Engineering Principles
1. **Clean Code**: Readable, modular, and maintainable code structure over clever hacks.
2. **Performance**: Optimizing Core Web Vitals, initial load times, bundle size, and rendering speed.
3. **User Experience**: Responsive layouts, clean typography, intuitive interactions, and accessible states.

## Contact Information
- **Email**: sauravsinghfsdev@gmail.com
- **Location**: Bhilai, Chhattisgarh, India
- **GitHub**: https://github.com/SauravkuSingh
- **LinkedIn**: https://www.linkedin.com/in/saurav-singh-fsdev/
`,

  "/contact": `# Contact Saurav Singh — Full Stack Developer

> Available for full-stack web application development, frontend engineering roles, technical consultations, and freelance projects.

## Direct Contact Channels
- **Primary Email**: sauravsinghfsdev@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/saurav-singh-fsdev/
- **GitHub**: https://github.com/SauravkuSingh
- **Location**: Bhilai, Chhattisgarh, India (Remote-friendly, IST overlap)

## Service & Engagement SLA
- **Response Time**: Inquiries answered within 24 business hours.
- **Project Kickoff**: Typically within 1 week of scope alignment.
- **Engagement Types**: Fixed-price project builds, hourly consulting, or monthly frontend retainers.

## API & Form Submissions
- Contact Form UI available at: https://www.sauravksingh.in/contact
- API Contact Endpoint: POST https://www.sauravksingh.in/api/contact
`,

  "/privacy": `# Privacy Policy — Saurav Singh Portfolio

> Transparency commitment regarding data collection, contact form processing, analytics, and user privacy rights.

## Summary of Practices
- **Data Collected**: Name, email address, message details provided via the contact form.
- **Purpose**: Exclusively for replying to project inquiries and job opportunities.
- **Data Sharing**: We never sell, rent, or trade your personal information with third parties.
- **Service Providers**: Form submissions are securely handled via Resend / Supabase for communication delivery.
- **Cookies & Analytics**: Minimal essential site performance analytics without invasive tracking.
- **User Rights**: You may request access, correction, or deletion of your contact data anytime by emailing sauravsinghfsdev@gmail.com.
`,

  "/projects": `# Projects Portfolio — Saurav Singh

> End-to-end full stack web applications, dashboards, tools, and responsive interfaces built with React, Next.js, Node.js, and Tailwind CSS.

## Featured Projects
1. **Empmonitor UI Revamp**: Enterprise dashboard frontend modernization and performance optimization.
2. **Snake Game Engine**: Interactive canvas-based game engine with responsive controls.
3. **Full-Stack SaaS Starter**: Authentication, database integration, subscription workflow, and API routes.

For complete project details and live links, visit https://www.sauravksingh.in/projects.
`,

  "/blogs": `# Technical Blogs & Articles — Saurav Singh

> Engineering articles and guides covering React, Next.js, performance optimization, and modern web development.

Visit https://www.sauravksingh.in/blogs to explore technical articles.
`,
};

const KNOWN_PATHS = new Set([
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/projects",
  "/blogs",
  "/llms.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/icon.png",
  "/apple-icon.png",
  "/og-image.png",
]);

export function middleware(request) {
  const acceptHeader = request.headers.get("accept") || "";
  const pathname = request.nextUrl.pathname;

  // Handle Accept: text/markdown negotiation
  if (acceptHeader.toLowerCase().includes("text/markdown")) {
    if (VALID_MARKDOWN_ROUTES[pathname]) {
      return new NextResponse(VALID_MARKDOWN_ROUTES[pathname], {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept, Accept-Encoding",
        },
      });
    }

    // Nonexistent path under Accept: text/markdown
    if (!KNOWN_PATHS.has(pathname) && !pathname.startsWith("/assets/") && !pathname.startsWith("/api/")) {
      const markdown404 = `# 404 - Page Not Found

The requested path (\`${pathname}\`) does not exist on this server.

## Recovery Index & Sitemap Links
- **XML Sitemap**: https://www.sauravksingh.in/sitemap.xml
- **Agent Instructions (llms.txt)**: https://www.sauravksingh.in/llms.txt
- **Homepage**: https://www.sauravksingh.in/
- **About Page**: https://www.sauravksingh.in/about
- **Contact Page**: https://www.sauravksingh.in/contact
- **Privacy Policy**: https://www.sauravksingh.in/privacy
- **Projects**: https://www.sauravksingh.in/projects
- **Blogs**: https://www.sauravksingh.in/blogs
`;

      return new NextResponse(markdown404, {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept, Accept-Encoding",
        },
      });
    }
  }

  // Pass-through for HTML/other requests, attaching Vary header
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files (_next/static, _next/image, assets, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
