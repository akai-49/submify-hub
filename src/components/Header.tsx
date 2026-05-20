import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span>FormFlow</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-medium" }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/submit" className="text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-medium" }}>
            Submit
          </Link>
          {user && (
            <Link to="/dashboard" className="text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-medium" }}>
              Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-medium" }}>
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
