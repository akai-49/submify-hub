import { createFileRoute } from "@tanstack/react-router";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, canonical } from "@/lib/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/landing/Hero";
import { Trust } from "@/components/landing/Trust";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Portfolio } from "@/components/landing/Portfolio";
import { Metrics } from "@/components/landing/Metrics";
import { Contact } from "@/components/landing/Contact";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": canonical("/#organization"),
      name: SITE_NAME,
      url: SITE_URL,
      logo: canonical("/favicon.svg"),
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": canonical("/#website"),
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": canonical("/#organization") },
    },
    {
      "@type": "ProfessionalService",
      "@id": canonical("/#service"),
      name: SITE_NAME,
      url: SITE_URL,
      provider: { "@id": canonical("/#organization") },
      description: SITE_DESCRIPTION,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          "Web Development",
          "Application Development",
          "AI Automation",
          "Cloud & DevOps",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} — Premium Software & AI Agency` },
      { name: "description", content: SITE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: canonical("/") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Process />
        <Portfolio />
        <Metrics />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
