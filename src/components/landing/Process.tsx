import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, user needs, and technical requirements to form a solid strategy.",
  },
  {
    num: "02",
    title: "Design",
    description: "Creating wireframes and high-fidelity prototypes that define the user experience and visual aesthetic.",
  },
  {
    num: "03",
    title: "Development",
    description: "Building the product with scalable architecture, modern frameworks, and rigorous testing.",
  },
  {
    num: "04",
    title: "Launch",
    description: "Deploying the final product to production, monitoring performance, and ensuring a smooth rollout.",
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-surface/30 border-y border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
            Our <span className="text-primary">Process.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            A proven methodology to take your idea from concept to a launched, scalable product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-[1px] bg-border -ml-4 z-0" />
              )}
              
              <div className="relative z-10 bg-surface border border-border w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-foreground mb-6 shadow-sm">
                {step.num}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
