import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { 
    name: "Sarah Jenkins", 
    role: "CEO at TechStart", 
    image: "https://i.pravatar.cc/150?img=1",
    content: "They completely transformed our web presence. The new SaaS platform is faster, more beautiful, and highly scalable. An absolute game-changer for our business." 
  },
  { 
    name: "Michael Chen", 
    role: "Founder of AI Flow", 
    image: "https://i.pravatar.cc/150?img=11",
    content: "The AI automation workflows they built saved our team hundreds of hours every month. Truly a premium agency that understands both design and complex engineering." 
  },
  { 
    name: "Jessica Alba", 
    role: "Product Manager", 
    image: "https://i.pravatar.cc/150?img=5",
    content: "Outstanding attention to detail and design. Our users love the new interface, and conversion rates have doubled since the redesign." 
  },
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-32 relative z-10">
      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-[100%] bg-secondary/5 opacity-50 blur-[150px]" />
      
      <div className="mx-auto max-w-3xl text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-secondary text-sm font-semibold mb-6 uppercase tracking-wider"
        >
          Client Success
        </motion.div>
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Trusted by <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Visionaries.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative flex flex-col justify-between rounded-[2rem] border border-border/40 bg-card/40 p-10 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-secondary/40 hover:bg-card/60 hover:shadow-[0_20px_40px_-20px_var(--color-secondary)]"
          >
            <Quote className="absolute top-8 right-8 h-12 w-12 text-secondary/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-secondary/20" />
            
            <div className="relative z-10">
              <div className="flex gap-1 text-yellow-500 mb-8">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-current drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                ))}
              </div>
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">"{t.content}"</p>
            </div>
            
            <div className="mt-10 flex items-center gap-4 relative z-10">
              <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full border-2 border-border/50 object-cover" />
              <div>
                <p className="font-bold text-foreground tracking-tight">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
