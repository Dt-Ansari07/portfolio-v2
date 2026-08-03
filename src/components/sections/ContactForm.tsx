"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setState("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await res.json()) as { message?: string };

      if (!res.ok) {
        throw new Error(payload.message ?? "Something went wrong. Please try again.");
      }

      setState("success");
      reset();
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="border-teal bg-teal-soft text-teal flex items-start gap-3 border p-5"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>
          Message sent. Thanks for reaching out -- I&apos;ll reply to your email directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot: hidden from sighted + screen-reader users, bots fill it anyway */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div>
        <label htmlFor="name" className="text-ink mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="border-line bg-paper-1 text-ink focus:border-gold w-full border px-3.5 py-2.5 transition-colors outline-none"
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="text-red-flag mt-1.5 text-sm">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-ink mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="border-line bg-paper-1 text-ink focus:border-gold w-full border px-3.5 py-2.5 transition-colors outline-none"
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="text-red-flag mt-1.5 text-sm">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-ink mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="border-line bg-paper-1 text-ink focus:border-gold w-full resize-y border px-3.5 py-2.5 transition-colors outline-none"
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="text-red-flag mt-1.5 text-sm">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {state === "error" && errorMessage ? (
        <div
          role="alert"
          className="border-red-flag bg-red-flag/10 text-red-flag flex items-start gap-3 border p-4"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      ) : null}

      <Button type="submit" disabled={state === "loading"} className="w-full sm:w-auto">
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
