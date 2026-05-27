import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/5 opacity-50 blur-[100px]" />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8 border-b border-border/20 pb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_20px_-5px_var(--color-primary)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="tracking-tight">Agency.AI</span>
            </Link>
            <p className="mt-6 max-w-sm text-base text-muted-foreground leading-relaxed">
              We engineer intelligent, scalable, and visually stunning software solutions for the world's most ambitious brands.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Accepting new projects
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground tracking-wider uppercase text-sm mb-6">Expertise</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-1 group">Web App Development <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" /></a></li>
              <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-1 group">SaaS Architecture <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" /></a></li>
              <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-1 group">AI & ML Solutions <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" /></a></li>
              <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-1 group">WhatsApp Automation <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground tracking-wider uppercase text-sm mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Our Work</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground tracking-wider uppercase text-sm mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between sm:flex-row text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Agency.AI. All rights reserved.</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <span className="text-foreground/50">Designed for the future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
