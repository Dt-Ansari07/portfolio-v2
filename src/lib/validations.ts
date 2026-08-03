import { z } from "zod";

/**
 * Single schema shared by the client form (react-hook-form resolver) and the
 * `/api/contact` route, so validation rules can never drift between the two.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name (at least 2 characters).")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(2000, "Message is too long (max 2000 characters)."),
  // Honeypot field: real users never fill this in. Bots that auto-fill every
  // input will. Deliberately unrestricted here (any string is valid) so a
  // tripped honeypot fails silently in the route handler instead of surfacing
  // a validation error that would tip a bot off to the detection.
  company: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
