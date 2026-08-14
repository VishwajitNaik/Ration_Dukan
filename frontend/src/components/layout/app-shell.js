"use client";

import { useState } from "react";

import Sidebar from "./sidebar";
import Header from "./header";
import MobileNav from "./mobile-nav";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenu={() => setOpen(true)} />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}