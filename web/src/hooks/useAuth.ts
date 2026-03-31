"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type Session = {
  user: User;
  session: { id: string; expiresAt: string };
};

async function fetchSession(): Promise<Session | null> {
  const res = await fetch("/api/sessions", { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.user ? data : null;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: ["auth-session"],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Email hoặc mật khẩu không đúng");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-session"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const res = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Đăng ký không thành công");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-session"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-session"] });
    },
  });

  return {
    user: session?.user ?? null,
    isLoading,
    isAuthenticated: !!session?.user,
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    loginPending: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    registerError: registerMutation.error,
    registerPending: registerMutation.isPending,
    logout: logoutMutation.mutateAsync,
    logoutPending: logoutMutation.isPending,
  };
}
