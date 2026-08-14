"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import RationCardForm from "@/components/ration-card/ration-card-form";
import AddMemberForm from "@/components/ration-card/add-member-form";
import MemberEditCard from "@/components/ration-card/member-edit-card";

import {
  useUpdateMember,
} from "@/modules/ration-card/ration-card.hooks";

import {
  useRationCard,
  useUpdateRationCard,
  useAddMember,
} from "@/modules/ration-card/ration-card.hooks";

export default function EditRationCardPage() {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, error } =
    useRationCard(params.id);

  const mutation =
    useUpdateRationCard();

  const addMemberMutation =
    useAddMember();
  const updateMemberMutation =
    useUpdateMember();

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

  // IMPORTANT
  const card = data?.data;

  if (!card) {
    return (
      <div className="text-red-600">
        Ration card not found.
      </div>
    );
  }

  const handleUpdateMember = async (
  memberId,
  values
) => {
  try {

    await updateMemberMutation.mutateAsync({
      cardId: params.id,
      memberId,
      payload: values,
    });

    toast.success(
      "Member updated successfully"
    );

  } catch (error) {

    console.error(error.response?.data);

    toast.error(
      error.response?.data?.message ||
        "Failed to update member"
    );

  }
};

const defaultValues = {
  rcNumber: card.rcNumber,
  cardType: card.cardType,
  category: card.category,
  totalUnits: card.totalUnits,
  remarks: card.remarks || "",
};

  const handleAddMember = async (
  member
) => {
  try {
    await addMemberMutation.mutateAsync({
      cardId: params.id,
      payload: member,
    });

    toast.success(
      "Member added successfully"
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to add member"
    );
  }
};

  const handleSubmit = async (
    values
  ) => {
    try {

      const payload = {
        ...values,
        members: values.members.map(
          (member) => ({
            ...member,
            dob: new Date(
              member.dob
            ).toISOString(),
          })
        ),
      };

      await mutation.mutateAsync({
        id: params.id,
        payload,
      });

      toast.success(
        "Ration card updated successfully"
      );

      router.push(
        `/ration-cards/${params.id}`
      );

    } catch (error) {

      console.error(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Failed to update ration card"
      );

    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Ration Card
        </h1>

        <p className="text-gray-500">
          Update beneficiary details
        </p>
      </div>
        <RationCardForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        loading={mutation.isPending}
        />

      <AddMemberForm
        onSubmit={handleAddMember}
        loading={addMemberMutation.isPending}
        />

    <div className="space-y-4">
  <h2 className="text-xl font-semibold">
    Existing Members
  </h2>

  {card.members
    ?.filter((m) => !m.isDeleted)
    .map((member) => (
      <MemberEditCard
        key={member._id}
        member={member}
        loading={updateMemberMutation.isPending}
        onSave={(values) =>
          handleUpdateMember(
            member._id,
            values
          )
        }
      />
    ))}
</div>
    </div>
  );
}