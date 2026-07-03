"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaExternalLinkAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import type { SocialLink } from "@/types/cms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactSectionProps {
  contactSection?: {
    heading?: string;
    description?: string;
    submitLabel?: string;
    nameLabel?: string;
    emailLabel?: string;
    messageLabel?: string;
    successMessage?: string;
    phone?: string;
  };
  socialLinks?: SocialLink[];
  email?: string;
}

const platformConfig: Record<string, { icon: React.ReactNode; label: string }> = {
  github: { icon: <FaGithub className="text-xl" />, label: "GitHub" },
  linkedin: { icon: <FaLinkedin className="text-xl" />, label: "LinkedIn" },
  email: { icon: <FaEnvelope className="text-xl" />, label: "Email" },
};

export function ContactSection({
  contactSection,
  socialLinks,
  email,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setToast({
          type: "success",
          message: contactSection?.successMessage || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setToast({ type: "error", message: data.message });
      }
    } catch {
      setToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setToast(null), 5000);
  }

  const linkMap = new Map<string, { url: string; icon: React.ReactNode; label: string }>();

  if (email) {
    const mailto = `mailto:${email}`;
    linkMap.set(mailto, {
      url: mailto,
      icon: <FaEnvelope className="text-xl" />,
      label: "Email",
    });
  }

  if (contactSection?.phone) {
    const tel = `tel:${contactSection.phone}`;
    linkMap.set(tel, {
      url: tel,
      icon: <FaPhone className="text-xl" />,
      label: "Phone",
    });
  }

  if (socialLinks?.length) {
    for (const link of socialLinks) {
      if (!linkMap.has(link.url)) {
        const key = link.iconKey?.toLowerCase();
        const config = platformConfig[key as keyof typeof platformConfig];
        linkMap.set(link.url, {
          url: link.url,
          icon: config?.icon || <FaExternalLinkAlt className="text-xl" />,
          label: config?.label || link.platform,
        });
      }
    }
  }

  const allLinks = Array.from(linkMap.values());

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {contactSection?.heading || "Get In Touch"}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-foreground/20" />
          {contactSection?.description ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {contactSection.description}
            </p>
          ) : null}
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {contactSection?.nameLabel || "Your Name"}
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  required
                  className="rounded-md"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {contactSection?.emailLabel || "Your Email"}
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  required
                  className="rounded-md"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {contactSection?.messageLabel || "Your Message"}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your message..."
                  rows={5}
                  required
                  className="rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  contactSection?.submitLabel || "Send Message"
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect With Me
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {allLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-foreground/10 bg-card px-5 py-4 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {toast ? (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-xl border px-5 py-4 text-sm shadow-xl backdrop-blur-md ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
              : "border-red-500/30 bg-red-50 text-red-700 dark:bg-red-950/80 dark:text-red-300"
          }`}
        >
          {toast.type === "success" ? (
            <FaCheckCircle className="shrink-0 text-emerald-500" />
          ) : (
            <FaTimesCircle className="shrink-0 text-red-500" />
          )}
          <span>{toast.message}</span>
        </motion.div>
      ) : null}
    </section>
  );
}
