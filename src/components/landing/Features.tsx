import { motion } from "framer-motion";
import { Zap, Layers, Sparkles, Code2, HeadphonesIcon, Rocket } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Scalable Architecture",
    desc: "Enterprise-grade systems designed to grow with your business and handle millions of users seamlessly.",
  },
  {
    icon: Rocket,
    title: "AI Integration",
    desc: "Infusing the latest LLMs and custom machine learning models directly into your product workflows.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Strictly typed, highly maintainable, and well-documented codebases built on TanStack and React.",
  },
  {
    icon: Sparkles,
    title: "Modern UI/UX",
    desc: "Premium, conversion-focused designs that leverage glassmorphism and fluid animations.",
  },
  {
    icon: HeadphonesIcon,
    title: "Long-term Support",
    desc: "Dedicated maintenance, monitoring, and iterative improvements even after your product launches.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Agile methodologies ensuring rapid prototyping, continuous integration, and timely deployment.",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-32 relative z-10">
      <div className="absolute right-0 bottom-0 -z-10 h-[600px] w-[600px] translate-y-1/3 translate-x-1/3 rounded-full bg-primary/10 opacity-40 blur-[150px]" />

      <div className="mx-auto max-w-4xl text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-primary text-sm font-semibold mb-6 uppercase tracking-wider"
        >
          Why Choose Us
        </motion.div>
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Engineered for{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Excellence.
          </span>
        </h2>
        <p className="mt-6 text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
          We combine deep technical expertise with stunning design to deliver digital products that
          stand out in the modern web.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col items-start gap-4 rounded-3xl border border-border/40 bg-card/40 p-8 backdrop-blur-xl shadow-lg transition-all hover:-translate-y-2 hover:bg-card/60 hover:border-primary/40 hover:shadow-[0_20px_40px_-20px_var(--color-primary)]"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary border border-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <f.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
