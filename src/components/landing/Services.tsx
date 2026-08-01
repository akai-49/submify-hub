import { motion } from "framer-motion";
import { Globe, Code2, Bot, Database, Cloud, Webhook } from "lucide-react";

const services = [
  {
    title: "Website Development",
    description:
      "Lightning-fast, SEO-optimized marketing websites built with modern frameworks to convert visitors into customers.",
    icon: Globe,
  },
  {
    title: "SaaS Development",
    description:
      "Scalable and secure multi-tenant web applications with complex dashboards and subscription logic.",
    icon: Code2,
  },
  {
    title: "AI Automation",
    description:
      "Custom AI workflows and chatbots that automate your business operations and save thousands of hours.",
    icon: Bot,
  },
  {
    title: "MSuite & Frappe ERP Solutions",
    description:
      "Enterprise MSuite workspace apps and custom ERP implementations built using the powerful Frappe Framework & ERPNext.",
    icon: Database,
  },
  {
    title: "Cloud Deployment",
    description:
      "Robust infrastructure setup on AWS, Cloudflare, or Vercel for high availability and performance.",
    icon: Cloud,
  },
  {
    title: "API Integrations",
    description:
      "Seamlessly connect your existing tools and services to create unified automated workflows.",
    icon: Webhook,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-6">
            Expertise that drives <span className="text-primary">growth.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We deliver enterprise-grade solutions tailored to your unique business challenges,
            combining cutting-edge technology with beautiful design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(255,107,0,0.15)] flex flex-col"
              >
                <div className="h-12 w-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
