"use client";

import { Menu } from "lucide-react";

import useAuthStore from "@/stores/auth.store";

export default function Header({ onMenu }) {
  const owner = useAuthStore((s) => s.owner);

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-6">
      <button
        onClick={onMenu}
        className="md:hidden rounded-lg p-2 hover:bg-gray-100"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="hidden md:block">
        <h2 className="text-lg font-semibold text-gray-800">
          Ration Dukan Management System
        </h2>
      </div>

      <div className="text-sm text-gray-600">
        Welcome, <span className="font-semibold">{owner?.name}</span>
      </div>
    </header>
  );
}