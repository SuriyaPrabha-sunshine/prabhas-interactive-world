import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { askSuriyaAi } from "@/lib/chatbot.functions";
import { suggestedQuestions } from "@/lib/suriya-knowledge";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm Suriya AI. Ask me about Suriya's education, skills, projects or research.",
};

export function Chatbot() {
  const ask = useServerFn(askSuriyaAi);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    const history = [...messages.filter((m) => m !== GREETING), { role: "user" as const, content: question }];
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setBusy(true);
    try {
      const res = await ask({ data: { messages: history.slice(-12) } });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.ok ? res.text : res.error },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong reaching the assistant." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="INTERACT"
        aria-label={open ? "Close Suriya AI" : "Ask about Suriya"}
        className="fixed right-4 bottom-4 z-90 inline-flex min-h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-1 sm:right-6 sm:bottom-6"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Bot className="h-5 w-5" aria-hidden="true" />
        )}
        <span className="hidden font-mono text-[11px] tracking-[0.18em] sm:inline">
          {open ? "CLOSE" : "ASK ABOUT SURIYA"}
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Suriya AI"
          className="glass grad-border animate-scale-in fixed right-3 bottom-22 z-90 flex max-h-[70vh] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl sm:right-6 sm:bottom-24"
        >
          <div className="border-border/60 flex items-center gap-3 border-b p-4">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-sm font-bold tracking-wide">SURIYA AI</p>
              <p className="text-muted-foreground text-xs">Ask me about Suriya's journey.</p>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <p
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary/10 text-foreground ml-auto"
                    : "bg-secondary/70 text-secondary-foreground",
                )}
              >
                {m.content}
              </p>
            ))}
            {busy ? (
              <p className="bg-secondary/70 text-muted-foreground inline-flex gap-1 rounded-2xl px-3.5 py-2.5 text-sm">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce [animation-delay:120ms]">•</span>
                <span className="animate-bounce [animation-delay:240ms]">•</span>
              </p>
            ) : null}
          </div>

          <div className="border-border/60 border-t p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {suggestedQuestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.question)}
                  disabled={busy}
                  className="border-border/70 bg-card/70 hover:border-primary/50 hover:text-primary rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] transition-colors disabled:opacity-50"
                >
                  {s.label}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Your question"
                maxLength={400}
                className="border-input bg-card/80 focus-visible:border-primary/60 min-h-11 flex-1 rounded-full border px-4 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send question"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
