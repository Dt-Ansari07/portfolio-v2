import { Resend } from "resend";
import type { ContactFormValues } from "./validations";

/**
 * Thin wrapper around Resend so the API route doesn't know about the
 * provider directly -- swapping to another transactional email service
 * later means editing this one file only.
 */
export async function sendContactEmail(data: ContactFormValues) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    throw new Error(
      "Email is not configured: set RESEND_API_KEY and CONTACT_EMAIL_TO in your environment."
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact Form <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `New portfolio message from ${data.name}`,
    text: [`Name: ${data.name}`, `Email: ${data.email}`, "", data.message].join("\n"),
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send email.");
  }
}
