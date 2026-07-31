import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "NexFinance SaaS",
    description:
      "A comprehensive financial dashboard for enterprise clients. Features real-time data visualization, predictive AI modeling, and automated reporting systems.",
    tech: ["Next.js", "Tailwind CSS", "PostgreSQL", "Stripe"],
    imageStyle: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    title: "HealthCore Platform",
    description:
      "Secure, HIPAA-compliant patient management system. Streamlines appointment scheduling, medical records, and telemedicine communications.",
    tech: ["React", "Node.js", "Supabase", "WebRTC"],
    imageStyle: "bg-gradient-to-br from-gray-50 to-gray-100",
  },
  {
    title: "LogisSync ERP",
    description:
      "Custom ERP solution for global logistics. Optimizes supply chain routing, inventory tracking, and automated vendor payments.",
    tech: ["Frappe", "Python", "Redis", "Docker"],
    imageStyle: "bg-gradient-to-br from-gray-200 to-gray-300",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
              Selected <span className="text-primary">Work.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We build scalable digital products that solve real problems. Here are some of our
              recent highlights.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 lg:gap-16 ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center`}
            >
              {/* Image/Mockup */}
              <div className="w-full lg:w-3/5">
                <div className="group relative w-full aspect-video rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500">
                  <div
                    className={`absolute inset-0 ${project.imageStyle} flex items-center justify-center p-8`}
                  >
                    {/* Abstract Mockup UI */}
                    <div className="w-full h-full bg-background rounded-xl shadow-lg border border-border/50 flex flex-col overflow-hidden transition-transform duration-500 group-hover:scale-105">
                      <div className="h-8 border-b border-border/50 bg-surface flex items-center px-4 gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                      </div>
                      <div className="flex-1 p-6 flex flex-col gap-4">
                        <div className="h-6 w-1/3 bg-border/40 rounded" />
                        <div className="flex gap-4">
                          <div className="h-32 flex-1 bg-border/20 rounded" />
                          <div className="h-32 w-1/3 bg-border/20 rounded" />
                        </div>
                        <div className="h-20 w-full bg-border/10 rounded mt-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-2/5 flex flex-col">
                <h3 className="text-3xl font-bold text-foreground mb-4">{project.title}</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-surface border border-border rounded-full text-sm font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-hover transition-colors group"
                >
                  View Case Study
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
