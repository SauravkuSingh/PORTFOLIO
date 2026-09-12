import "./globals.css";
import Shell from "./shell";

const SITE_URL = "https://www.sauravksingh.in";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saurav Singh — Full Stack Developer (React, Next.js, Node.js)",
    template: "%s | Saurav Singh",
  },
  description:
    "Saurav Singh is a full stack developer specializing in React, Next.js, and Node.js. Building fast, scalable web applications. Based in Bhilai, India — available for freelance and full-time roles.",
  applicationName: "Saurav Singh — Portfolio",
  authors: [{ name: "Saurav Singh", url: SITE_URL }],
  creator: "Saurav Singh",
  publisher: "Saurav Singh",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Saurav Singh",
    "Saurav Singh Developer",
    "Saurav Singh Portfolio",
    "Saurav Singh Full Stack Developer",
    "Saurav Singh React",
    "Saurav Singh Next.js",
    "Saurav Singh Bhilai",
    "Full Stack Developer India",
    "React Developer India",
    "Next.js Developer",
    "MERN Stack Developer",
    "Frontend Developer",
  ],
  openGraph: {
    title: "Saurav Singh — Full Stack Developer (React, Next.js, Node.js)",
    description:
      "Portfolio of Saurav Singh — a full stack developer building modern, scalable web applications with React, Next.js, and Node.js.",
    url: SITE_URL,
    siteName: "Saurav Singh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saurav Singh — Full Stack Developer Portfolio",
      },
    ],
    locale: "en_IN",
    type: "profile",
    firstName: "Saurav",
    lastName: "Singh",
    username: "sauravksingh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurav Singh — Full Stack Developer",
    description:
      "Full stack developer building modern web apps with React, Next.js & Node.js.",
    images: ["/og-image.png"],
    creator: "@sauravksingh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#saurav-singh`,
  name: "Saurav Singh",
  alternateName: [
    "Saurav K Singh",
    "SauravkuSingh",
    "Saurav Singh Developer",
    "Saurav Singh Bhilai",
    "Saurav Singh Full Stack Developer",
    "Saurav Kumar Singh",
    "Saurav Singh Portfolio",
    
  ],
  givenName: "Saurav",
  familyName: "Singh",
  url: SITE_URL,
  email: "sauravksinghdev@gmail.com",
  image: `${SITE_URL}/og-image.png`,
  jobTitle: "Full Stack Developer",
  description:
    "Saurav Singh is a Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript. Based in Bhilai, India.",
  worksFor: {
    "@type": "Organization",
    name: "Empmonitor",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Shri Shankaracharya Technical Campus",
    alternateName: "SSTC Bhilai",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhilai",
    addressRegion: "Chhattisgarh",
    addressCountry: "IN",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "MongoDB",
    "Full Stack Web Development",
    "MERN Stack",
  ],
  sameAs: [
    "https://www.linkedin.com/in/saurav-singh-fsdev/",
    "https://github.com/SauravkuSingh",
  ],
  brand: {
    "@type": "Brand",
    name: "Saurav Singh",
    url: SITE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Saurav Singh",
  alternateName: ["sauravksingh.in", "Saurav Singh Portfolio"],
  description: "Official Portfolio & Engineering Site of Saurav Singh — Full Stack Developer.",
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#saurav-singh` },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Saurav Singh — Official Portfolio",
  mainEntity: { "@id": `${SITE_URL}/#saurav-singh` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicons are auto-injected by Next from src/app/icon.png,
            apple-icon.png and favicon.ico (file-based metadata convention). */}
        <link rel="agent-instructions" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" title="Agent Instructions" href="/llms.txt" />
        <meta name="author" content="Saurav Singh" />
        <meta name="publisher" content="Saurav Singh" />
        <meta name="copyright" content="Saurav Singh" />
        <meta name="identifier-URL" content={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
