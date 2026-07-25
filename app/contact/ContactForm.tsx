"use client";

import { FormEvent, useState } from "react";

type FormStatus =
  | { tone: "error"; message: string }
  | { tone: "success"; message: string }
  | null;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          industry: formData.get("industry"),
          projectDescription: formData.get("projectDescription"),
          website: formData.get("website"),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus({
          tone: "error",
          message: result.error ?? "We could not send your message.",
        });
        return;
      }

      form.reset();
      setStatus({
        tone: "success",
        message: "Thanks. Your message has been sent.",
      });
    } catch {
      setStatus({
        tone: "error",
        message: "We could not send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="glass-panel rounded-lg border border-brand-ivory/12 p-6 sm:p-8"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="type-card-title m-0 text-brand-white">
          Send a message
        </h2>
        <p className="type-small-body mt-3 text-brand-ivory/72">
          Tell us a little about what you need. We&apos;ll be in touch soon.
        </p>
      </div>

      <div className="mt-7 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-brand-white">
          <span className="flex items-center gap-1.5">
            Name <span className="text-red-400">*</span>
          </span>
          <input
            autoComplete="name"
            className="min-h-12 rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 text-base font-normal text-brand-white outline-none transition placeholder:text-brand-ivory/55 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
            maxLength={120}
            name="name"
            placeholder="Your name"
            required
            type="text"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-white">
          <span className="flex items-center gap-1.5">
            Email address <span className="text-red-400">*</span>
          </span>
          <input
            autoComplete="email"
            className="min-h-12 rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 text-base font-normal text-brand-white outline-none transition placeholder:text-brand-ivory/55 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
            maxLength={254}
            name="email"
            placeholder="you@company.com"
            required
            type="email"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-white">
          <span className="flex items-center gap-1.5">
            Phone number <span className="text-brand-ivory/60">(optional)</span>
          </span>
          <input
            autoComplete="tel"
            className="min-h-12 rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 text-base font-normal text-brand-white outline-none transition placeholder:text-brand-ivory/55 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
            maxLength={40}
            name="phone"
            placeholder="+1 202 555 0123"
            type="tel"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-white">
          <span className="flex items-center gap-1.5">
            Industry <span className="text-brand-ivory/60">(optional)</span>
          </span>
          <input
            className="min-h-12 rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 text-base font-normal text-brand-white outline-none transition placeholder:text-brand-ivory/55 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
            maxLength={120}
            name="industry"
            placeholder="e.g. Healthcare, public sector, retail"
            type="text"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-white">
          <span className="flex items-center gap-1.5">
            Brief description of your project <span className="text-red-400">*</span>
          </span>
          <textarea
            className="min-h-36 resize-y rounded border border-brand-ivory/18 bg-brand-navy/64 px-4 py-3 text-base font-normal leading-[1.55] text-brand-white outline-none transition placeholder:text-brand-ivory/55 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/35"
            maxLength={5_000}
            name="projectDescription"
            placeholder="Tell us about your goals, timeline, and the support you need."
            required
          />
        </label>
        <input
          aria-hidden="true"
          autoComplete="off"
          className="sr-only"
          name="website"
          tabIndex={-1}
          type="text"
        />
        {status ? (
          <p
            aria-live="polite"
            className={`m-0 text-sm font-semibold ${
              status.tone === "success" ? "text-brand-teal" : "text-brand-gold"
            }`}
          >
            {status.message}
          </p>
        ) : null}
        <button
          className="inline-flex min-h-12 w-fit items-center justify-center rounded bg-brand-teal px-6 text-sm font-semibold text-brand-navy transition hover:-translate-y-px hover:bg-brand-white disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px max-[520px]:w-full"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
