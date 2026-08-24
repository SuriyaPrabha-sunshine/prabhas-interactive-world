import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { sendContactMessage } from "@/lib/contact.functions";
import { GlassCard } from "./primitives";
import welcomeScene from "@/assets/scene-welcome.png";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const submit = useServerFn(sendContactMessage);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentName, setSentName] = useState("");

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await submit({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
      });
      if (res.ok) {
        setSentName(form.name.trim().split(" ")[0] ?? form.name.trim());
        setForm({ name: "", email: "", subject: "", message: "" });
        setStatus("sent");
      } else {
        setServerError(res.error);
        setStatus("idle");
      }
    } catch {
      setServerError("Could not send your message. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <GlassCard className="relative overflow-hidden p-6">
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: "var(--gradient-soft)" }}
          aria-hidden="true"
        />
        <div className="relative">
          <p className="glass text-foreground inline-block rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
            “Hi! I'd love to hear from you.”
          </p>
          <p className="glass text-muted-foreground mt-3 inline-block rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
            “Have an idea, question, opportunity, or collaboration in mind?”
          </p>
          <img
            src={welcomeScene}
            alt="Illustration of Suriya waving beside a laptop"
            loading="lazy"
            width={1024}
            height={1024}
            className="mx-auto mt-4 h-60 w-auto sm:h-72"
          />
        </div>
      </GlassCard>

      <GlassCard className="p-6 sm:p-8">
        {status === "sent" ? (
          <div className="animate-scale-in text-center">
            <span
              className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full text-white"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              <Check className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-display mt-5 text-2xl font-extrabold">MESSAGE SENT ✓</h3>
            <p className="mt-2 font-semibold">Thank you, {sentName}!</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Your message has reached Suriya successfully.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setStatus("idle")}
                className="text-primary-foreground inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold shadow-[var(--shadow-glow)]"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                SEND ANOTHER MESSAGE
              </button>
              <a
                href="#home"
                className="border-border bg-card/70 hover:border-primary/50 hover:text-primary inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors"
              >
                BACK TO PORTFOLIO
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-4">
            <h3 className="text-lg font-bold">Send me a message</h3>
            <Field label="Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={80}
                required
                className="input-base"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={160}
                required
                className="input-base"
              />
            </Field>
            <Field label="Subject">
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                maxLength={140}
                className="input-base"
              />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                maxLength={2000}
                required
                className="input-base resize-y"
              />
            </Field>
            {serverError ? <p className="text-destructive text-sm">{serverError}</p> : null}
            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor="INTERACT"
              className="text-primary-foreground inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              {status === "sending" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              )}
              SEND MESSAGE
            </button>
          </form>
        )}
      </GlassCard>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
        {label}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {error ? <span className="text-destructive mt-1 block text-xs">{error}</span> : null}
    </label>
  );
}
