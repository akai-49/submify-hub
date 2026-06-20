import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
      className={`fixed top-0 z-50 w-full transition-all duration-300 h-20 flex items-center ${
        isScrolled 
          ? "bg-background/70 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b border-border/50" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex w-full items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-foreground group">
          Agency<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Services
          </a>
          <a href="#portfolio" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Portfolio
          </a>
          <a href="#process" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Process
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </a>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Admin
                </Link>
              )}
              <Button
                variant="ghost"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={async () => {
                  await signOut();
                  navigate({ to: "/" });
                }}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          )}
          <Button className="rounded-full px-6 bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm transition-all hover:scale-105 border-0 font-medium" asChild>
            <a href="#contact">Book a Call</a>
          </Button>
        </div>

        <button 
          className="md:hidden flex h-10 w-10 items-center justify-center text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 w-full md:hidden border-b border-border bg-background/95 backdrop-blur-xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              <a 
                href="#services" 
                className="text-lg font-medium text-foreground py-3 border-b border-border/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#portfolio" 
                className="text-lg font-medium text-foreground py-3 border-b border-border/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </a>
              <a 
                href="#process" 
                className="text-lg font-medium text-foreground py-3 border-b border-border/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </a>
              <a 
                href="#about" 
                className="text-lg font-medium text-foreground py-3 border-b border-border/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <div className="flex flex-col gap-3 mt-6">
                {user ? (
                  <>
                    <Button variant="outline" className="w-full justify-center h-12 rounded-lg" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center h-12 rounded-lg"
                      onClick={async () => {
                        await signOut();
                        setMobileMenuOpen(false);
                        navigate({ to: "/" });
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-center h-12 rounded-lg" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button className="w-full justify-center h-12 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium" asChild onClick={() => setMobileMenuOpen(false)}>
                      <a href="#contact">Book a Call</a>
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
