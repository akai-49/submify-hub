import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin, ShieldCheck, MapPin, Phone, Mail, Building2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Enterprise Info & MSME Registration */}
          <div className="md:col-span-6 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-foreground"
            >
              AK SOLUTIONS <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">Govt. MSME Registered</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Registered Micro Enterprise under Government of India (Ministry of MSME).<br />
              Computer consultancy, custom software engineering & AI automation services.
            </p>
            <div className="pt-4 text-xs text-muted-foreground space-y-2 border-t border-border/50">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                Udyam Reg. No: <span className="font-mono text-emerald-400">UDYAM-KR-04-0192388</span>
              </p>
              <p className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                NIC Code: 62020 — Computer Consultancy & Facilities Management
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>AK Empire, Ward 31, Sangam Nagar, Gokak, Belagavi, Karnataka — 591307</span>
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <a href="tel:+919535450135" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Phone className="h-3.5 w-3.5 text-primary" /> +91 9535450135
                </a>
                <a href="mailto:abhishek.dev.4949@gmail.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Mail className="h-3.5 w-3.5 text-primary" /> abhishek.dev.4949@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#process"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Process
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50 text-xs text-muted-foreground">
          <p>&copy; {currentYear} AK SOLUTIONS (Agency.AI). All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

