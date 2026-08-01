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
            backgroundImage: `radial-gradient(circle at center, rgba(255,107,0,0.12), transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            maskImage: `linear-gradient(to bottom, white, transparent)`,
            opacity: 0.3,
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
              Build Websites.
              <br />
              Automate Business.
              <br />
              <span className="text-primary">Scale Faster.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              We help startups and businesses build modern web applications, AI systems, SaaS
              platforms and business automation solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary-hover text-white font-medium group transition-all"
                asChild
              >
                <a href="#contact">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full font-medium hover:bg-surface border-border transition-all"
                asChild
              >
                <a href="#portfolio">View Portfolio</a>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Interactive Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative rounded-2xl bg-card/90 border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col backdrop-blur-xl">
              {/* Mockup Header */}
              <div className="h-11 border-b border-border/60 bg-muted/40 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-3 text-xs font-mono text-muted-foreground/80">
                    https://console.agency.ai/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </div>
              </div>

              {/* Mockup Body - Rich AI & Analytics UI */}
              <div className="p-6 flex flex-col gap-5 bg-card/50 font-sans">
                {/* Header Stats Bar */}
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground">AI Automation Console</h3>
                    <p className="text-xs text-muted-foreground">Real-time system telemetry & active workflows</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20">
                      v2.4 Active
                    </span>
                  </div>
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-background/80 rounded-xl border border-border/60 p-3.5 space-y-1">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Revenue Managed</span>
                    <div className="text-lg font-extrabold text-foreground">$128,450</div>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      ↑ 32.4% <span className="text-muted-foreground font-normal">this mo</span>
                    </span>
                  </div>
                  <div className="bg-background/80 rounded-xl border border-border/60 p-3.5 space-y-1">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">AI Tasks Run</span>
                    <div className="text-lg font-extrabold text-foreground">14,892</div>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      99.9% <span className="text-muted-foreground font-normal">success rate</span>
                    </span>
                  </div>
                  <div className="bg-background/80 rounded-xl border border-border/60 p-3.5 space-y-1">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Lead Conversion</span>
                    <div className="text-lg font-extrabold text-foreground">24.8%</div>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      ↑ 4.2% <span className="text-muted-foreground font-normal">opt rate</span>
                    </span>
                  </div>
                </div>

                {/* Live Activity Stream */}
                <div className="bg-background/90 rounded-xl border border-border/60 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                    <span>Recent Automated Workflows</span>
                    <span className="text-[10px] text-muted-foreground">Updated seconds ago</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface/40 border border-border/40">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="font-mono text-foreground font-medium">Stripe Payment Sync</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">Processed $4,250.00</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface/40 border border-border/40">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-mono text-foreground font-medium">Lead Auto-Responder</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">Sent to 14 client leads</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface/40 border border-border/40">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="font-mono text-foreground font-medium">Database Backup & Audit</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">0 vulnerabilities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Status Pill */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 bg-card/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border p-4 flex items-center gap-3.5"
            >
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <div className="h-4 w-4 bg-emerald-400 rounded-full animate-ping" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">System Active</div>
                <div className="text-xs text-muted-foreground">All AI services operational</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
