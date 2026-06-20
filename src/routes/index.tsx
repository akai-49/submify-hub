import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/landing/Hero";
import { Trust } from "@/components/landing/Trust";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Portfolio } from "@/components/landing/Portfolio";
import { Metrics } from "@/components/landing/Metrics";
import { CTA } from "@/components/landing/CTA";
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
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Process />
        <Portfolio />
        <Metrics />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
