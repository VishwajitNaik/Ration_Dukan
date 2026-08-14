"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import RationCardForm from "@/components/ration-card/ration-card-form";
import { useCreateRationCard } from "@/modules/ration-card/ration-card.hooks";

export default function NewRationCardPage() {
  const router = useRouter();

  const mutation =
    useCreateRationCard();

const handleSubmit = async (values) => {
  try {

    // Convert date strings to ISO strings
    const payload = {
      ...values,
      members: values.members.map((member) => ({
        ...member,
        dob: new Date(member.dob).toISOString(),
      })),
    };

    console.log("Payload:", payload);

    await mutation.mutateAsync(payload);

    toast.success("Ration card created successfully");

    router.push("/ration-cards");

  } catch (error) {

    console.error(error.response?.data);

    toast.error(
      error.response?.data?.message ||
      "Failed to create ration card"
    );
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Add Ration Card
        </h1>

        <p className="text-gray-500">
          Create a new beneficiary ration card
        </p>
      </div>

        <RationCardForm
        mode="create"
        onSubmit={handleSubmit}
        loading={mutation.isPending}
        />
    </div>
  );
}