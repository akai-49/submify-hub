import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Github, Linkedin, ArrowRight, Sparkles } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-32 z-10 relative">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-border/40 bg-card/30 backdrop-blur-2xl relative shadow-2xl">
        {/* Glow Effects inside card */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 relative z-10">
          <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-border/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 rounded-full border border-border bg-background/50 px-4 py-1.5 backdrop-blur-md mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Get In Touch</span>
            </motion.div>
            
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">Let's build the future together.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Ready to start your next big project? Get in touch with our team of experts and let's make it happen. We typically respond within 24 hours.
            </p>
            
            <div className="mt-12 flex flex-col gap-4">
              <Button size="lg" className="justify-between group h-16 rounded-2xl text-base bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C3F] text-white border-0 shadow-[0_0_30px_-10px_#25D366] transition-all hover:scale-105">
                <span className="flex items-center gap-3"><MessageSquare className="h-6 w-6" /> Chat on WhatsApp</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
              <Button size="lg" variant="outline" className="justify-between group h-16 rounded-2xl text-base bg-background/40 backdrop-blur-xl border-border/50 hover:bg-background/60 transition-all hover:scale-105 hover:border-primary/50 text-foreground">
                <span className="flex items-center gap-3"><Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" /> Email Us</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 text-muted-foreground group-hover:text-primary" />
              </Button>
            </div>

            <div className="mt-16 flex items-center gap-6">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Follow Us</span>
              <div className="h-px w-12 bg-border/50" />
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 border border-border/50 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:shadow-[0_0_20px_-5px_var(--color-primary)]">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 border border-border/50 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:shadow-[0_0_20px_-5px_var(--color-primary)]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="p-12 lg:p-20 bg-background/20 backdrop-blur-sm">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground/90 uppercase tracking-wider">First Name</label>
                  <input type="text" className="w-full rounded-xl border border-border/50 bg-background/40 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-xl transition-all text-foreground placeholder:text-muted-foreground/50" placeholder="John" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground/90 uppercase tracking-wider">Last Name</label>
                  <input type="text" className="w-full rounded-xl border border-border/50 bg-background/40 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-xl transition-all text-foreground placeholder:text-muted-foreground/50" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground/90 uppercase tracking-wider">Work Email</label>
                <input type="email" className="w-full rounded-xl border border-border/50 bg-background/40 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-xl transition-all text-foreground placeholder:text-muted-foreground/50" placeholder="john@company.com" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground/90 uppercase tracking-wider">Project Details</label>
                <textarea className="w-full min-h-[160px] rounded-xl border border-border/50 bg-background/40 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-xl transition-all resize-none text-foreground placeholder:text-muted-foreground/50" placeholder="Tell us about your project goals, timeline, and budget..." />
              </div>
              <Button type="submit" size="lg" className="mt-4 w-full h-14 rounded-xl text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-[0_0_30px_-10px_var(--color-primary)] hover:shadow-[0_0_40px_-10px_var(--color-primary)] transition-all hover:scale-[1.02]">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
