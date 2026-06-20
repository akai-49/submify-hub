import { motion } from "framer-motion";

const technologies = [
  "React",
  "TanStack",
  "Supabase",
  "Cloudflare",
  "Docker",
  "PostgreSQL",
  "OpenAI",
  "Frappe",
];

export function Trust() {
  return (
    <section className="py-12 border-y border-border bg-surface/50">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-8 tracking-widest uppercase">
          Trusted Technologies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
