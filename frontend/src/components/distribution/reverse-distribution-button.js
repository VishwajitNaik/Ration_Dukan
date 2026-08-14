"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useConfirm } from "@/hooks/use-confirm";
import { useReverseDistribution } from "@/modules/distribution/distribution.hooks";

export default function ReverseDistributionButton({
  distributionId,
  redirectTo,
  className = "",
}) {
  const router = useRouter();

  const confirm = useConfirm();

  const mutation = useReverseDistribution();

  const handleReverse = async () => {
    const confirmed = await confirm(
      "Are you sure you want to reverse this distribution? Stock will be restored."
    );

    if (!confirmed) return;

    try {
      await mutation.mutateAsync(distributionId);

      toast.success(
        "Distribution reversed successfully."
      );

      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reverse distribution."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleReverse}
      disabled={mutation.isPending}
      className={`rounded-lg border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50 ${className}`}
    >
      {mutation.isPending
        ? "Reversing..."
        : "Reverse"}
    </button>
  );
}