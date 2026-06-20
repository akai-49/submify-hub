import { motion } from "framer-motion";

const metrics = [
  {
    value: "2x",
    label: "Faster Delivery",
    description: "Our optimized workflows and boilerplate systems allow us to ship production-ready apps in half the usual time."
  },
  {
    value: "99.9%",
    label: "Uptime & Scalability",
    description: "Enterprise-grade architecture that handles traffic spikes and scales automatically with your user base."
  },
  {
    value: "100+",
    label: "Automated Workflows",
    description: "Custom AI integrations that save our clients thousands of manual hours every single month."
  },
  {
    value: "SOC2",
    label: "Enterprise Security",
    description: "Built-in security best practices, data encryption, and compliance-ready infrastructure from day one."
  }
];

export function Metrics() {
  return (
    <section className="py-24 bg-dark text-white border-y border-dark">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="text-5xl md:text-6xl font-extrabold text-primary mb-4 tracking-tighter">
                {metric.value}
              </div>
              <h3 className="text-xl font-bold mb-3">{metric.label}</h3>
              <p className="text-gray-400 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
