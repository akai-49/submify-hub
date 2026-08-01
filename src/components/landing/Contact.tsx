import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema, type ContactInput } from "@/lib/submission-schema";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Github, Linkedin, ArrowRight, Sparkles, Loader2 } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-border/50 bg-background/40 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-xl transition-all text-foreground placeholder:text-muted-foreground/50";
const labelClass = "text-sm font-semibold text-foreground/90 uppercase tracking-wider";

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "", message: "", company: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    // Bot filled the honeypot. Report success so it does not retry, write nothing.
    if (data.company) {
      reset();
      toast.success("Thanks — we'll be in touch shortly.");
      return;
    }

    const { error } = await supabase.from("submissions").insert({
      name: [data.firstName, data.lastName].filter(Boolean).join(" "),
      email: data.email,
      phone: null,
      message: data.message,
      user_id: null,
    });

    if (error) {
      console.error(error);
      toast.error("Couldn't send your message. Please try again.");
      return;
    }

    reset();
    toast.success("Thanks — we'll be in touch shortly.");
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-32 z-10 relative">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-border/40 bg-card/30 backdrop-blur-2xl relative shadow-2xl">
        {/* Glow Effects inside card */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-[120px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 relative z-10">
          <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-border/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 rounded-full border border-border bg-background/50 px-4 py-1.5 backdrop-blur-md mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Get In Touch</span>
            </motion.div>

            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Let's build the future together.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Ready to start your next big project? Get in touch with our team of experts and let's
              make it happen. We typically respond within 24 hours.
            </p>

            <div className="mt-12 flex flex-col gap-4">
              <a
                href="https://wa.me/919535450135"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group h-16 px-6 rounded-2xl text-base bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C3F] text-white font-medium shadow-[0_0_30px_-10px_#25D366] transition-all hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6" /> Chat on WhatsApp (+91 9535450135)
                </span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </a>
              <a
                href="mailto:abhishek.dev.4949@gmail.com"
                className="flex items-center justify-between group h-16 px-6 rounded-2xl text-base bg-background/40 backdrop-blur-xl border border-border/50 hover:bg-background/60 transition-all hover:scale-105 hover:border-primary/50 text-foreground font-medium"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />{" "}
                  abhishek.dev.4949@gmail.com
                </span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-border/40 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">AK SOLUTIONS (Govt. MSME Registered Micro Enterprise)</p>
              <p>Udyam Reg. No: UDYAM-KR-04-0192388 | NIC Code: 62020</p>
              <p>AK Empire, Ward 31, Sangam Nagar, Gokak, Belagavi, Karnataka - 591307</p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Follow Us
              </span>
              <div className="h-px w-12 bg-border/50" />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 border border-border/50 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:shadow-[0_0_20px_-5px_var(--color-primary)]"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 border border-border/50 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:shadow-[0_0_20px_-5px_var(--color-primary)]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="p-12 lg:p-20 bg-background/20 backdrop-blur-sm">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="contact-first-name" className={labelClass}>
                    First Name
                  </label>
                  <input
                    id="contact-first-name"
                    type="text"
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "contact-first-name-error" : undefined}
                    className={fieldClass}
                    placeholder="John"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p id="contact-first-name-error" className="text-sm text-destructive">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <label htmlFor="contact-last-name" className={labelClass}>
                    Last Name
                  </label>
                  <input
                    id="contact-last-name"
                    type="text"
                    autoComplete="family-name"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "contact-last-name-error" : undefined}
                    className={fieldClass}
                    placeholder="Doe"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p id="contact-last-name-error" className="text-sm text-destructive">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="contact-email" className={labelClass}>
                  Work Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={fieldClass}
                  placeholder="john@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <label htmlFor="contact-message" className={labelClass}>
                  Project Details
                </label>
                <textarea
                  id="contact-message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${fieldClass} min-h-[160px] resize-none`}
                  placeholder="Tell us about your project goals, timeline, and budget..."
                  {...register("message")}
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot. Hidden from users and skipped by tab order; bots fill it. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-company">Company (leave this field empty)</label>
                <input
                  id="contact-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-4 w-full h-14 rounded-xl text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-[0_0_30px_-10px_var(--color-primary)] hover:shadow-[0_0_40px_-10px_var(--color-primary)] transition-all hover:scale-[1.02]"
              >
                {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
