import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background with Grid and Radial Glow */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,107,0,0.12), transparent 60%)`
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            maskImage: `linear-gradient(to bottom, white, transparent)`,
            opacity: 0.3
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.1] mb-6">
              Build Websites.<br />
              Automate Business.<br />
              <span className="text-primary">Scale Faster.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              We help startups and businesses build modern web applications, AI systems, SaaS platforms and business automation solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary-hover text-white font-medium group transition-all" asChild>
                <a href="#contact">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full font-medium hover:bg-surface border-border transition-all" asChild>
                <a href="#portfolio">View Portfolio</a>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square"
          >
            <div className="absolute inset-0 rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col">
              {/* Mockup Header */}
              <div className="h-12 border-b border-border bg-background flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-orange-400/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
              </div>
              
              {/* Mockup Body */}
              <div className="flex-1 p-6 flex flex-col gap-4 bg-surface">
                {/* Simulated Dashboard Content */}
                <div className="flex justify-between items-center">
                  <div className="h-6 w-32 bg-border/50 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-primary/20 rounded-full" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-background rounded-xl border border-border/50 p-4 flex flex-col justify-between">
                      <div className="h-4 w-12 bg-border/50 rounded" />
                      <div className="h-6 w-20 bg-border/80 rounded" />
                    </div>
                  ))}
                </div>
                
                <div className="flex-1 bg-background rounded-xl border border-border/50 p-4 mt-2">
                  <div className="h-full w-full rounded border-2 border-dashed border-border/50 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-primary/20 animate-ping" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Floating Element */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-xl border border-border p-4 flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                <div className="h-5 w-5 bg-success rounded-full" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">System Active</div>
                <div className="text-xs text-muted-foreground">All services operational</div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
