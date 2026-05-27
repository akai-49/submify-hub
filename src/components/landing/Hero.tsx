import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BarChart, Database, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-32 pb-20 flex items-center">
      {/* Noise Texture */}
      <div className="absolute inset-0 -z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Radial Blobs */}
      <div className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-0 -z-10 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/20 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 rounded-full border border-border bg-card/40 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground/90 tracking-wide">Next-Generation Software Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl text-foreground"
            >
              Smart Websites. <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
                AI Automation.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl leading-relaxed"
            >
              We help startups and enterprises build scalable web applications, SaaS products, AI systems, and secure automation solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="h-14 rounded-xl px-8 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border-0 shadow-[0_0_40px_-10px_var(--color-primary)] transition-all hover:shadow-[0_0_60px_-15px_var(--color-secondary)] hover:scale-105" asChild>
                <a href="#contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 rounded-xl px-8 text-base bg-card/30 backdrop-blur-md border-border/50 hover:bg-card/50 transition-all hover:scale-105" asChild>
                <a href="#portfolio">View Our Work</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=1" alt="User" className="h-10 w-10 rounded-full border-2 border-background" />
                <img src="https://i.pravatar.cc/100?img=2" alt="User" className="h-10 w-10 rounded-full border-2 border-background" />
                <img src="https://i.pravatar.cc/100?img=3" alt="User" className="h-10 w-10 rounded-full border-2 border-background" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-foreground">
                  +50
                </div>
              </div>
              <p>Trusted by 50+ visionary companies</p>
            </motion.div>
          </div>

          <div className="relative hidden lg:block h-[600px]">
            {/* Floating UI Elements */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-10 right-10 w-72 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-5 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">AI Model Deployed</div>
                  <div className="text-xs text-muted-foreground">Just now via GitHub Actions</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Processing pipeline</span>
                  <span className="text-primary font-medium">Complete</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-20 left-0 w-80 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-5 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-semibold text-foreground">Performance Metrics</div>
                <BarChart className="h-4 w-4 text-secondary" />
              </div>
              <div className="flex items-end gap-2 h-24 mb-2">
                {[40, 70, 45, 90, 65, 100, 80].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                    className={`w-full rounded-t-sm ${i === 5 ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Response Time</span>
                <span className="text-accent font-bold">12ms</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 rounded-full aspect-square border border-border/30 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_100px_-20px_var(--color-primary)]"
            >
              <div className="w-48 h-48 rounded-full border border-border/40 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg animate-pulse">
                  <Database className="h-10 w-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
