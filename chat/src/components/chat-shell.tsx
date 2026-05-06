"use client";

import { useEffect, useState } from "react";

import { ChatView } from "@/components/chat-view";
import { ConversationList } from "@/components/conversation-list";
import {
  deriveTitle,
  loadConversations,
  newConversation,
  saveConversations,
} from "@/lib/conversations";
import type { Conversation, DisplayMessage } from "@/lib/types";

export function ChatShell() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loaded = loadConversations();
    if (loaded.length === 0) {
      const fresh = newConversation();
      setConversations([fresh]);
      setActiveId(fresh.id);
    } else {
      const sorted = [...loaded].sort((a, b) => b.updatedAt - a.updatedAt);
      setConversations(sorted);
      setActiveId(sorted[0].id);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveConversations(conversations);
  }, [conversations, hydrated]);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  const handleChange = (messages: DisplayMessage[]) => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages,
              title: c.title === "New chat" ? deriveTitle(messages) : c.title,
              updatedAt: Date.now(),
            }
          : c,
      ),
    );
  };

  const handleNew = () => {
    const fresh = newConversation();
    setConversations((prev) => [fresh, ...prev]);
    setActiveId(fresh.id);
    setSidebarOpen(false);
  };

  const handleSelect = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
  };

  const handleDelete = (id: string) => {
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (id === activeId) {
        if (next.length > 0) {
          setActiveId(next[0].id);
        } else {
          const fresh = newConversation();
          setActiveId(fresh.id);
          return [fresh];
        }
      }
      return next;
    });
  };

  if (!hydrated || !active) {
    return <div className="h-full w-full bg-white" />;
  }

  return (
    <div className="flex h-full w-full bg-white">
      <div className="hidden md:flex">
        <ConversationList
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelect}
          onNew={handleNew}
          onDelete={handleDelete}
        />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <ConversationList
            conversations={conversations}
            activeId={activeId}
            onSelect={handleSelect}
            onNew={handleNew}
            onDelete={handleDelete}
            onClose={() => setSidebarOpen(false)}
          />
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="flex-1 cursor-pointer bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <ChatView
          title={active.title}
          messages={active.messages}
          onChange={handleChange}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
      </div>
    </div>
  );
}
