/**
 * Google reCAPTCHA v3 — client helper.
 *
 * Set VITE_RECAPTCHA_SITE_KEY to enable. Until it is set, the helper is a
 * no-op and the form keeps working with the existing spam heuristics.
 */
const SITE_KEY = import.meta.env['VITE_RECAPTCHA_SITE_KEY'] as string | undefined;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let loader: Promise<void> | null = null;

function loadScript(siteKey: string) {
  if (loader) return loader;
  loader = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) return resolve();
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("recaptcha script failed"));
    document.head.appendChild(script);
  });
  return loader;
}

export const recaptchaEnabled = Boolean(SITE_KEY);

/** Returns a fresh reCAPTCHA token, or "" when not configured/unavailable. */
export async function getRecaptchaToken(action = "contact_form"): Promise<string> {
  if (!SITE_KEY || typeof window === "undefined") return "";
  try {
    await loadScript(SITE_KEY);
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return "";
    await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
    return await grecaptcha.execute(SITE_KEY, { action });
  } catch {
    return "";
  }
}
