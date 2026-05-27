import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const projects = [
  { 
    title: "AI Automation Dashboard", 
    category: "SaaS Development", 
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    tech: ["React", "TypeScript", "Python", "OpenAI"]
  },
  { 
    title: "Global E-Commerce Engine", 
    category: "Web Application", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tech: ["Next.js", "Supabase", "TailwindCSS"]
  },
  { 
    title: "FinTech Mobile Wallet", 
    category: "Mobile App Development", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    tech: ["React Native", "Node.js", "PostgreSQL"]
  },
  { 
    title: "WhatsApp CRM Tool", 
    category: "WhatsApp Automation", 
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    tech: ["Node.js", "Meta API", "Redis"]
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="container mx-auto px-4 py-32 relative z-10">
      <div className="absolute left-0 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 opacity-40 blur-[150px]" />
      
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end mb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-secondary text-sm font-semibold mb-6 uppercase tracking-wider"
          >
            Featured Work
          </motion.div>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Built for <span className="text-muted-foreground">Performance.</span> <br/>
            Designed for <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Conversion.</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-card border border-border/50 shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Hover Actions */}
              <div className="absolute top-6 right-6 z-20 flex gap-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border/50">
                  <Github className="h-5 w-5" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border/50">
                  <ExternalLink className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 z-20 w-full p-8 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="mb-4 flex flex-wrap gap-2">
                {p.tech.map(tech => (
                  <span key={tech} className="inline-block rounded-full bg-background/50 border border-border/50 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="mb-2 block text-sm font-semibold text-primary">
                    {p.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white tracking-tight">{p.title}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
