"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Send } from "lucide-react";

import { ProductSuggestion } from "@/components/product-suggestion";
import { cn } from "@/lib/utils";
import type { ChatMessage, ChatResponse, DisplayMessage } from "@/lib/types";

type Props = {
  title: string;
  messages: DisplayMessage[];
  onChange: (messages: DisplayMessage[]) => void;
  onToggleSidebar?: () => void;
};

export function ChatView({ title, messages, onChange, onToggleSidebar }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: DisplayMessage[] = [...messages, { role: "user", content: text }];
    onChange(next);
    setInput("");
    setLoading(true);

    try {
      const history: ChatMessage[] = next.map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await res.json()) as ChatResponse;

      onChange([
        ...next,
        {
          role: "assistant",
          content: data.message || "(no response)",
          products: data.products,
        },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Request failed";
      onChange([...next, { role: "assistant", content: `Error: ${message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const canSend = input.trim().length > 0 && !loading;

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <header className="flex items-center justify-between border-b border-[#e4e6eb] bg-white px-3 py-2.5">
        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#050505] hover:bg-[#f2f2f2] md:hidden"
              aria-label="Toggle conversations"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0099ff] to-[#0064e1] text-sm font-semibold text-white">
            SA
          </div>
          <div className="flex flex-col leading-tight">
            <span className="line-clamp-1 text-[15px] font-semibold text-[#050505]">{title}</span>
            <span className="text-xs text-[#65676b]">Active now</span>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-white px-4 py-4">
        <div className="mx-auto flex w-full max-w-[760px] flex-col gap-1">
          {messages.map((m, idx) => {
            const prev = messages[idx - 1];
            const isGroupStart = !prev || prev.role !== m.role;
            return <MessageBubble key={idx} message={m} isGroupStart={isGroupStart} />;
          })}
          {loading && <TypingIndicator />}
        </div>
      </div>

      <div className="border-t border-[#e4e6eb] bg-white px-3 py-2.5">
        <div className="mx-auto flex w-full max-w-[760px] items-center gap-2">
          <div className="flex flex-1 items-center rounded-full bg-[#f0f2f5] px-4">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Aa"
              disabled={loading}
              autoFocus
              className="h-9 flex-1 bg-transparent text-[15px] text-[#050505] placeholder-[#65676b] outline-none disabled:opacity-60"
            />
          </div>
          <button
            type="button"
            onClick={send}
            disabled={!canSend}
            aria-label="Send"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              canSend
                ? "cursor-pointer text-[#0084ff] hover:bg-[#e7f3ff]"
                : "cursor-not-allowed text-[#bcc0c4]",
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isGroupStart,
}: {
  message: DisplayMessage;
  isGroupStart: boolean;
}) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex w-full flex-col",
        isUser ? "items-end" : "items-start",
        isGroupStart ? "mt-2" : "mt-0.5",
      )}
    >
      <div
        className={cn(
          "max-w-[75%] whitespace-pre-wrap break-words px-3 py-2 text-[15px] leading-[1.3333]",
          isUser
            ? "rounded-[18px] bg-[#0084ff] text-white"
            : "rounded-[18px] bg-[#f0f0f0] text-[#050505]",
        )}
      >
        {message.content}
      </div>
      {!isUser && message.products && message.products.length > 0 && (
        <div className="mt-2 grid w-full max-w-[75%] grid-cols-2 gap-2 sm:grid-cols-3">
          {message.products.map((p) => (
            <ProductSuggestion key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="mt-2 flex items-center">
      <div className="flex items-center gap-1 rounded-[18px] bg-[#f0f0f0] px-3 py-2.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#90949c] [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#90949c] [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#90949c]" />
      </div>
    </div>
  );
}
