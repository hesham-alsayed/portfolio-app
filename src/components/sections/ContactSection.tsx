"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type {
  ContactFormPayload,
  ContactFormResponse,
  ContactSectionContent,
  SocialLink,
} from "@/types/cms";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getSocialIcon } from "@/lib/social-icons";

interface ContactSectionProps {
  contactSection?: ContactSectionContent;
  socialLinks: SocialLink[];
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function ContactSection({
  contactSection,
  socialLinks,
}: ContactSectionProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");

  if (!contactSection?.heading) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form satisfies ContactFormPayload),
      });

      const data = (await response.json()) as ContactFormResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message);
      }

      setStatus("success");
      setFeedbackMessage(contactSection?.successMessage || data.message);
      setForm(initialFormState);
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={contactSection.heading}
          subtitle={contactSection.description}
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 rounded-2xl border border-border bg-surface/30 p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {contactSection.nameLabel}
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {contactSection.emailLabel}
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {contactSection.messageLabel}
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                placeholder="Your message..."
              />
            </div>

            <div className="flex items-center gap-4">
              {contactSection.submitLabel ? (
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading"
                    ? `${contactSection.submitLabel}...`
                    : contactSection.submitLabel}
                </Button>
              ) : null}
              {feedbackMessage ? (
                <p
                  className={`text-sm ${
                    status === "success" ? "text-accent" : "text-red-500"
                  }`}
                >
                  {feedbackMessage}
                </p>
              ) : null}
            </div>
          </motion.form>

          {socialLinks.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-sm font-medium text-foreground">Find me on</p>
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.iconKey);
                return (
                  <motion.a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface/30 px-5 py-4 text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="text-sm font-medium">
                      {link.platform}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
