import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Max 100 characters"),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+()0-9\s-]*$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000, "Max 2000 characters"),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

// Landing-page contact form. Same underlying `submissions` row, split name field.
export const contactSchema = submissionSchema.omit({ name: true, phone: true }).extend({
  firstName: z.string().trim().min(1, "First name is required").max(50, "Max 50 characters"),
  lastName: z.string().trim().max(50, "Max 50 characters").optional().or(z.literal("")),
  // Honeypot. Hidden from real users, so a non-empty value means a bot filled it.
  // Left unvalidated on purpose — checked in the handler so bots get a fake success.
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
