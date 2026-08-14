"use client";

import { useState } from "react";
import Link from "next/link";

import RationCardTable from "@/components/ration-card/ration-card-table";
import { useRationCards } from "@/modules/ration-card/ration-card.hooks";

export default function RationCardsPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useRationCards({
    search,
    page: 1,
    limit: 10,
  });

  const cards = data?.data?.cards || [];

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm border">
        Loading ration cards...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load ration cards.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Ration Cards
          </h1>
          <p className="text-gray-500">
            Manage beneficiary ration cards
          </p>
        </div>

        <Link
          href="/ration-cards/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Card
        </Link>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm border">
        <input
          type="text"
          placeholder="Search by RC number or head of family"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <RationCardTable cards={cards} />
    </div>
  );
}