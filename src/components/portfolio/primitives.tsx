import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/portfolio";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("relative scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28", className)}
    >
      <div ref={ref} data-visible={visible} className="reveal mx-auto max-w-6xl">
        {eyebrow ? (
          <p className="mb-3 font-mono text-xs tracking-[0.28em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={`${id}-heading`}
          className="text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
        >
          {title}
        </h2>
        {intro ? (
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
            {intro}
          </p>
        ) : null}
        <div className="mt-10 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}

export function GlassCard({
  children,
  className,
  as: As = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <As className={cn("glass grad-border rounded-2xl", className)} {...rest}>
      {children}
    </As>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 min-h-11 focus-visible:outline-2";

export const buttonStyles = {
  primary: cn(
    btnBase,
    "text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:brightness-110",
  ),
  outline: cn(
    btnBase,
    "border border-border bg-card/70 text-foreground hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary",
  ),
  ghost: cn(btnBase, "text-primary hover:bg-primary/10"),
};

export function PrimaryButton({
  className,
  style,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(buttonStyles.primary, className)}
      style={{ backgroundImage: "var(--gradient-hero)", ...style }}
      {...rest}
    />
  );
}

export function OutlineButton({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(buttonStyles.outline, className)} {...rest} />;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[oklch(0.24_0.05_285_/_0.45)] backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="glass animate-scale-in relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-primary hover:border-primary/40 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5 space-y-4 text-sm leading-relaxed sm:text-base">{children}</div>
        <div className="mt-7 flex flex-wrap gap-3">
          {footer}
          <OutlineButton onClick={onClose}>CLOSE</OutlineButton>
        </div>
      </div>
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="border-border/80 bg-secondary/70 text-secondary-foreground inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs">
      {children}
    </span>
  );
}
