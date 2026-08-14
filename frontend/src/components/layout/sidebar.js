"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import navigation from "@/constants/navigation";
import useAuthStore from "@/stores/auth.store";
import { logoutApi } from "@/modules/auth/auth.api";



export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
  try {
    await logoutApi();
  } catch (error) {
    // ignore API errors
  }

  logout();

  window.location.href = "/login";
};

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">
          Ration Dukan
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}