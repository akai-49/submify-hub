import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { submissionSchema, type SubmissionInput } from "@/lib/submission-schema";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit — FormFlow" },
      { name: "description", content: "Send us a message. We'll get back to you shortly." },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionInput>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: "",
      email: user?.email ?? "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: SubmissionInput) => {
    const { error } = await supabase.from("submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      user_id: user?.id ?? null,
    });

    if (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    toast.success("Submission received!");
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-xl">
          {submitted ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground">Thanks for reaching out!</h2>
              <p className="mt-2 text-muted-foreground">
                We've received your submission and will get back to you soon.
              </p>
              <Button className="mt-6" onClick={() => setSubmitted(false)}>
                Submit another
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">Get in touch</h1>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we'll be in touch shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-xl border border-border bg-card p-6 md:p-8">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" {...register("name")} className="mt-1" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-1" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register("phone")} className="mt-1" placeholder="Optional" />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" rows={5} {...register("message")} className="mt-1" />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
