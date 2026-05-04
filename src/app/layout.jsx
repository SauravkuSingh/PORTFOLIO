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
  givenName: "Saurav",
  familyName: "Singh",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: "Full Stack Developer",
  description:
    "Full stack developer specializing in React, Next.js, and Node.js. Building fast, scalable web applications.",
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
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Saurav Singh",
  description: "Portfolio of Saurav Singh — Full Stack Developer.",
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#saurav-singh` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
