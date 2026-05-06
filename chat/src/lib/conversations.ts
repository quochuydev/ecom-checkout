import type { Conversation, DisplayMessage } from "@/lib/types";

const STORAGE_KEY = "ecom-chat-conversations";

const GREETING: DisplayMessage = {
  role: "assistant",
  content: "Hi! What kind of product are you looking for today?",
};

export function newConversation(): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "New chat",
    messages: [GREETING],
    updatedAt: Date.now(),
  };
}

export function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((c): c is Conversation =>
        Boolean(
          c &&
            typeof c === "object" &&
            typeof (c as Conversation).id === "string" &&
            Array.isArray((c as Conversation).messages),
        ),
      )
      .map((c) => ({
        ...c,
        title: c.title || "New chat",
        updatedAt: c.updatedAt ?? Date.now(),
      }));
  } catch {
    return [];
  }
}

export function saveConversations(conversations: Conversation[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    // ignore quota errors
  }
}

export function deriveTitle(messages: DisplayMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New chat";
  const text = firstUser.content.trim().replace(/\s+/g, " ");
  return text.length > 40 ? `${text.slice(0, 40)}…` : text || "New chat";
}
