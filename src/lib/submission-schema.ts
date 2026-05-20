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
