"use client";

import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import queryClient from "@/lib/query-client";
import useAuthStore from "@/stores/auth.store";
import { meApi } from "@/modules/auth/auth.api";

export default function Providers({ children }) {
  const loadAuth = useAuthStore((s) => s.loadAuth);
  const setOwner = useAuthStore((s) => s.setOwner);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const init = async () => {
      loadAuth();

      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await meApi();

        setOwner(response.data);
      } catch (error) {
        logout();
      }
    };

    init();
  }, [loadAuth, setOwner, logout]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster richColors position="top-right" />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}