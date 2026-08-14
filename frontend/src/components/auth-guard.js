"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/stores/auth.store";

export default function AuthGuard({ children }) {
  const router = useRouter();

  const token = useAuthStore((s) => s.token);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!token) return null;

  return children;
}