import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "NexFinance SaaS",
    description:
      "A comprehensive financial dashboard for enterprise clients. Features real-time data visualization, predictive AI modeling, and automated reporting systems.",
    tech: ["Next.js", "Tailwind CSS", "PostgreSQL", "Stripe"],
    category: "Financial Analytics",
    mockup: (
      <div className="w-full h-full bg-slate-950 text-slate-100 p-5 font-sans flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold tracking-wide uppercase text-slate-300">NexFinance AI Terminal</span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
            Live Stream
          </span>
        </div>
        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-3 my-3">
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Monthly Recurring</span>
            <span className="text-base font-extrabold text-white">$84,200</span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">↑ +14.2% MoM</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Net Volume</span>
            <span className="text-base font-extrabold text-white">$412,900</span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">↑ +22.8%</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">AI Forecast</span>
            <span className="text-base font-extrabold text-indigo-400">$98,000</span>
            <span className="text-[9px] text-indigo-300 block mt-0.5">High Confidence</span>
          </div>
        </div>
        {/* Recent Transactions List */}
        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800/80 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-mono text-slate-200">Stripe Payout #9081</span>
            <span className="font-bold text-emerald-400">+$12,450.00</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-mono text-slate-200">Enterprise Annual Plan</span>
            <span className="font-bold text-emerald-400">+$24,000.00</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "HealthCore Platform",
    description:
      "Secure, HIPAA-compliant patient management system. Streamlines appointment scheduling, medical records, and telemedicine communications.",
    tech: ["React", "Node.js", "Supabase", "WebRTC"],
    category: "Telehealth & Clinical Care",
    mockup: (
      <div className="w-full h-full bg-slate-900 text-slate-100 p-5 font-sans flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400" />
            <span className="text-xs font-bold tracking-wide uppercase text-slate-300">HealthCore Portal</span>
          </div>
          <span className="text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
            HIPAA Compliant
          </span>
        </div>
        {/* Patient Status Grid */}
        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Active Consultations</span>
              <span className="text-lg font-bold text-white">18 Patients</span>
            </div>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded font-semibold">WebRTC HD</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Vital Sync</span>
              <span className="text-lg font-bold text-cyan-400">72 BPM / Normal</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>
        {/* Upcoming Appointments */}
        <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium text-slate-200">Dr. Sarah Jenkins (Cardiology)</span>
            <span className="text-[10px] text-cyan-400 font-mono">10:30 AM</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-[11px]">
            <span>Encrypted Telemedicine Session ID #8910</span>
            <span className="text-emerald-400 font-semibold">Ready</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "LogisSync ERP",
    description:
      "Custom ERP solution for global logistics. Optimizes supply chain routing, inventory tracking, and automated vendor payments.",
    tech: ["Frappe", "Python", "Redis", "Docker"],
    category: "Logistics & Supply Chain",
    mockup: (
      <div className="w-full h-full bg-slate-950 text-slate-100 p-5 font-sans flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="text-xs font-bold tracking-wide uppercase text-slate-300">LogisSync Control Tower</span>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
            Frappe Framework
          </span>
        </div>
        {/* Supply Chain Status */}
        <div className="grid grid-cols-3 gap-3 my-3">
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Active Shipments</span>
            <span className="text-base font-extrabold text-white">1,420</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">On-Time Delivery</span>
            <span className="text-base font-extrabold text-emerald-400">98.6%</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Warehouse Load</span>
            <span className="text-base font-extrabold text-amber-400">78%</span>
          </div>
        </div>
        {/* Live Container Log */}
        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800/80 space-y-1 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-mono text-amber-400">Container #IN-9082</span>
            <span className="text-[10px] text-slate-400">Customs Cleared</span>
          </div>
          <p className="text-[11px] text-slate-400">En route to Port of Hamburg — Estimated Arrival: 14:00 UTC</p>
        </div>
      </div>
    ),
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
              {/* Mockup Display */}
              <div className="w-full lg:w-3/5">
                <div className="group relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-border shadow-xl hover:shadow-2xl transition-all duration-500 bg-card">
                  {/* Window Chrome Header */}
                  <div className="h-9 border-b border-border/80 bg-muted/60 flex items-center px-4 justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">{project.category}</span>
                  </div>
                  {/* Interactive/Realistic UI Content */}
                  <div className="h-[calc(100%-2.25rem)]">
                    {project.mockup}
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
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-hover transition-colors group text-base"
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
