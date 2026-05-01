import "./globals.css";
import Shell from "./shell";

export const metadata = {
  title:
    "Saurav Singh – Full Stack Developer | Bhilai, India (React & Next.js)",
  description:
    "Saurav Singh is a full stack developer in Bhilai specializing in React.js, Next.js, Node.js, and modern web applications. Available for freelance and full-time roles.",

  metadataBase: new URL("https://www.sauravksingh.in"),
  alternates: {
    canonical: "/",
  },

  keywords: [
    "Full Stack Developer Bhilai",
    "Frontend Developer Bhilai",
    "React Developer Bhilai",
    "Next.js Developer India",
    "MERN Stack Developer",
  ],

  openGraph: {
    title: "Full Stack Developer in Bhilai | Saurav Singh",
    description:
      "Full stack developer specializing in React, Next.js, and Node.js. Based in Bhilai and available for freelance and full-time roles.",
    url: "https://www.sauravksingh.in",
    siteName: "Saurav Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saurav Singh Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Full Stack Developer in Bhilai | Saurav Singh",
    description:
      "React, Next.js & Node.js developer portfolio. Building scalable web applications.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Saurav Singh",
              url: "https://www.sauravksingh.in",
              jobTitle: "Full Stack Developer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bhilai",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.linkedin.com/in/sauravksingh/",
                "https://github.com/sauravksingh",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
