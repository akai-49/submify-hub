import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Portfolio } from "@/components/landing/Portfolio";
import { Features } from "@/components/landing/Features";
import { TechStack } from "@/components/landing/TechStack";
import { Testimonials } from "@/components/landing/Testimonials";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agency.AI — Premium Software & AI Agency" },
      { name: "description", content: "Smart Websites. Powerful Applications. AI Automation." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-primary">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Features />
        <TechStack />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
