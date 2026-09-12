import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact – Saurav Singh | Full Stack Developer Bhilai",
  description:
    "Get in touch with Saurav Singh, a full stack developer based in Bhilai, India. Available for freelance projects, full-time engineering roles, and web app audits.",
  alternates: {
    canonical: "/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Saurav Singh",
  description:
    "Direct contact details, availability, and communication channels for Saurav Singh — Full Stack Developer.",
  url: "https://www.sauravksingh.in/contact",
  mainEntity: {
    "@type": "Person",
    name: "Saurav Singh",
    email: "sauravsinghfsdev@gmail.com",
    jobTitle: "Full Stack Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhilai",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
