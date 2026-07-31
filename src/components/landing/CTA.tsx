import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Orange gradient glow background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-8">
            Ready to Build Something <span className="text-primary">Great?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
            Let's turn your vision into a scalable, high-performance reality. Schedule a call with
            our technical team today.
          </p>

          <Button
            size="lg"
            className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary-hover text-white font-bold group shadow-[0_0_40px_-10px_var(--color-primary)] transition-all hover:scale-105 border-0"
            asChild
          >
            <a href="#contact">
              Start Your Project
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
