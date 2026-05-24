import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart3, Mail, Zap, Users, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FormFlow — Production-ready form submissions" },
      { name: "description", content: "Build forms. Capture leads. Get insights. Everything you need to run a SaaS form workflow in one place." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Production-ready
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Form submissions,
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                done right.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Collect leads, contact requests, or onboarding data with a beautiful form, secure auth,
              email confirmations, and a full admin dashboard with analytics.
            </p>
            {!user ? (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="/signup">
                    Get started free <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/submit">Try the form</Link>
                </Button>
              </div>
            ) : (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Everything in one place</h2>
          <p className="mt-3 text-muted-foreground">No backend setup. No glue code. Just ship.</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Shield, title: "Secure by default", desc: "Row-level security, hashed passwords, role-based access." },
            { icon: BarChart3, title: "Built-in analytics", desc: "Track submissions over time with beautiful charts." },
            { icon: Mail, title: "Email confirmations", desc: "Auto-send branded confirmations on every submission." },
            { icon: Zap, title: "Fast & responsive", desc: "Mobile-first UI, instant validation, optimistic updates." },
            { icon: Users, title: "Role-based admin", desc: "Promote users to admin from the dashboard." },
            { icon: Lock, title: "Google sign-in", desc: "Email/password and Google OAuth out of the box." },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-10 text-center md:p-16">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Start collecting in minutes</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Sign up, submit your first entry, and watch it appear in the admin dashboard in real time.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link to="/signup">
                Create your account <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FormFlow..
      </footer>
    </div>
  );
}
