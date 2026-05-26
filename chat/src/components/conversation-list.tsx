"use client";

import { MessageSquarePlus, PanelLeftClose, Search, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onClose?: () => void;
};

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onClose,
}: Props) {
  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-[#e4e6eb] bg-[#f0f4f9]">
      <div className="flex items-center justify-between px-3 py-3">
        <span className="text-[15px] font-semibold text-[#1f1f1f]">Chats</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#444746] hover:bg-[#e2e8ef] md:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="px-3 pb-2">
        <button
          type="button"
          onClick={onNew}
          className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-full bg-[#dde3ea] px-3 text-[14px] font-medium text-[#1f1f1f] hover:bg-[#d3dae2]"
        >
          <MessageSquarePlus className="h-5 w-5" />
          New chat
        </button>
      </div>

      <div className="px-3 pb-2">
        <div className="flex h-9 items-center gap-2 rounded-full bg-[#e2e8ef] px-3 text-[#444746]">
          <Search className="h-4 w-4" />
          <input
            placeholder="Search chats"
            className="h-full flex-1 bg-transparent text-[14px] text-[#1f1f1f] placeholder-[#5f6368] outline-none"
            // search is decorative for now
            disabled
          />
        </div>
      </div>

      <div className="px-5 pb-1 pt-2 text-[12px] font-medium uppercase tracking-wide text-[#5f6368]">
        Recent
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {conversations.length === 0 ? (
          <div className="px-3 py-2 text-[13px] text-[#5f6368]">No chats yet</div>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {conversations.map((c) => {
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                      "group relative flex h-10 cursor-pointer items-center rounded-full pl-3 pr-1 text-[14px]",
                      isActive
                        ? "bg-[#d3e3fd] text-[#001d35]"
                        : "text-[#1f1f1f] hover:bg-[#e2e8ef]",
                    )}
                    onClick={() => onSelect(c.id)}
                  >
                    <span className="line-clamp-1 flex-1 pr-2">{c.title}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Delete this chat?")) onDelete(c.id);
                      }}
                      className={cn(
                        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#444746] opacity-0 transition-opacity hover:bg-black/5 group-hover:opacity-100",
                        isActive && "opacity-100",
                      )}
                      aria-label="Delete chat"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
