import { motion } from "framer-motion";
import { Monitor, Cpu, Bot, Smartphone, Cloud, Code, MessageSquare, Zap, Globe } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Development", desc: "Ultra-fast, SEO-optimized, and visually stunning corporate websites." },
  { icon: Monitor, title: "Web Application Development", desc: "Complex, scalable, and responsive web applications built for performance." },
  { icon: Code, title: "SaaS Development", desc: "End-to-end SaaS architecture with secure auth, multi-tenancy, and billing." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-feeling cross-platform iOS and Android applications." },
  { icon: Bot, title: "AI Automation", desc: "Intelligent workflows that save hours of manual work every week." },
  { icon: MessageSquare, title: "WhatsApp Automation", desc: "Automated customer support and marketing via WhatsApp Cloud API." },
  { icon: Zap, title: "AI Chatbots", desc: "Custom AI agents trained on your proprietary data for 24/7 support." },
  { icon: Cloud, title: "Cloud & DevOps", desc: "AWS/GCP infrastructure, CI/CD pipelines, and Docker containerization." },
  { icon: Cpu, title: "API Integrations", desc: "Seamless connections between your software and third-party services." },
];

export function Services() {
  return (
    <section id="services" className="container mx-auto px-4 py-32 relative z-10">
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent/5 opacity-30 blur-[150px]" />
      
      <div className="mx-auto max-w-3xl text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-primary text-sm font-semibold mb-6 uppercase tracking-wider"
        >
          Our Services
        </motion.div>
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Everything you need to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Scale</span>
        </h2>
        <p className="mt-6 text-muted-foreground md:text-xl max-w-2xl mx-auto">
          We provide enterprise-grade engineering and design to transform your ideas into powerful digital products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-8 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-card/60 hover:shadow-[0_10px_40px_-15px_var(--color-primary)]"
          >
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl transition-all group-hover:bg-primary/30 group-hover:scale-150" />
            
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-primary transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_var(--color-primary)]">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground tracking-tight">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
