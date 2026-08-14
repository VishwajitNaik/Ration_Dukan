"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import MemberList from "@/components/ration-card/member-list";
import { useRationCard } from "@/modules/ration-card/ration-card.hooks";

export default function ViewRationCardPage() {
  const params = useParams();

  const { data, isLoading, error } =
    useRationCard(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600">
        Failed to load ration card.
      </div>
    );
  }

  const card = data?.data;

  if (!card) {
    return (
      <div className="text-red-600">
        Ration card not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {card.rcNumber}
          </h1>

          <Link
            href={`/ration-cards/${card._id}/edit`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Edit Card
          </Link>
        </div>

        <div className="mt-6 grid gap-4 text-gray-800 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">
              Head of Family
            </p>

            <p className="font-medium">
              {card.members?.find((m) => m.isHead)?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Card Type
            </p>

            <p className="font-medium">
              {card.cardType}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="font-medium">
              {card.cardStatus}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Members
            </p>

            <p className="font-medium">
              {card.members?.filter(
                (m) => !m.isDeleted
              ).length || 0}
            </p>
          </div>
        </div>
      </div>

      <MemberList members={card.members} />
    </div>
  );
}