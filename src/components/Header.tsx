import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "border-b border-border/20 bg-background/60 backdrop-blur-2xl shadow-sm" 
          : "bg-transparent py-2"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_20px_-5px_var(--color-primary)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="tracking-tight text-foreground group-hover:text-white transition-colors">Agency.AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex rounded-full border border-border/40 bg-background/50 px-6 py-2.5 backdrop-blur-md shadow-sm">
          <a href="#services" className="text-sm font-medium text-muted-foreground transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            Services
          </a>
          <a href="#portfolio" className="text-sm font-medium text-muted-foreground transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            Portfolio
          </a>
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            Why Us
          </a>
          {user && (
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" activeProps={{ className: "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" }}>
              Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" activeProps={{ className: "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" }}>
              Admin
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <Button
              variant="ghost"
              className="text-sm font-medium hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" className="text-sm font-medium hover:text-white hover:bg-white/5 transition-colors" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="rounded-full px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-[0_0_20px_-5px_var(--color-primary)] transition-all hover:shadow-[0_0_30px_-5px_var(--color-primary)] hover:scale-105 border-0" asChild>
                <a href="#contact">Get Started</a>
              </Button>
            </>
          )}
        </div>

        <button 
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 text-foreground transition-colors hover:bg-white/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/20 bg-background/95 backdrop-blur-3xl overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              <a 
                href="#services" 
                className="text-lg font-medium text-foreground/90 py-3 border-b border-border/10 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#portfolio" 
                className="text-lg font-medium text-foreground/90 py-3 border-b border-border/10 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </a>
              <a 
                href="#features" 
                className="text-lg font-medium text-foreground/90 py-3 border-b border-border/10 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us
              </a>
              <div className="flex flex-col gap-3 mt-6">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center h-12 rounded-xl bg-background/50 backdrop-blur-md"
                    onClick={async () => {
                      await signOut();
                      setMobileMenuOpen(false);
                      navigate({ to: "/" });
                    }}
                  >
                    Sign out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-center h-12 rounded-xl bg-background/50 backdrop-blur-md" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button className="w-full justify-center h-12 rounded-xl bg-gradient-to-r from-primary to-accent border-0 shadow-[0_0_20px_-5px_var(--color-primary)]" asChild onClick={() => setMobileMenuOpen(false)}>
                      <a href="#contact">Get Started</a>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
