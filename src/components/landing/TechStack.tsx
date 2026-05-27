import { motion } from "framer-motion";

const techCategories = [
  {
    name: "Frontend",
    tech: ["React", "TanStack", "TypeScript", "TailwindCSS"]
  },
  {
    name: "Backend",
    tech: ["Node.js", "Python", "Supabase", "PostgreSQL"]
  },
  {
    name: "DevOps & AI",
    tech: ["Docker", "AWS", "OpenAI", "Cloudflare"]
  }
];

export function TechStack() {
  return (
    <section className="relative overflow-hidden border-y border-border/20 bg-card/20 py-24 backdrop-blur-3xl z-10">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/10 opacity-50 blur-[120px]" />

      <div className="container mx-auto px-4 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-12"
        >
          Powered By Enterprise Technologies
        </motion.p>
        
        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {techCategories.map((category, idx) => (
            <div key={category.name} className="flex flex-col items-center">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6"
              >
                {category.name}
              </motion.span>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {category.tech.map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx * 0.2) + (i * 0.1) }}
                    className="group flex items-center justify-center rounded-2xl border border-border/40 bg-background/50 px-8 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card/80 hover:shadow-[0_0_30px_-10px_var(--color-primary)] cursor-default"
                  >
                    <span className="font-bold tracking-wide text-foreground/90 transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                      {t}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
