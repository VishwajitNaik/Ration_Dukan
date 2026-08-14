"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { rationCardSchema } from "@/modules/ration-card/ration-card.validation";

export default function RationCardForm({
  defaultValues,
  onSubmit,
  loading,
  mode = "create",
}) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rationCardSchema),

    defaultValues:
      defaultValues || {
        rcNumber: "",
        cardType: "PHH",
        category: "Priority",
        totalUnits: 1,
        remarks: "",
        members: [
        {
          name: "",
          dob: "",
          gender: "FEMALE",
          relation: "SELF",
          aadhaarNumber: "",
          mobile: "",
          status: "ACTIVE",
          isHead: true,
        },
        ],
      },
  });

const fieldArray =
  mode === "create"
    ? useFieldArray({
        control,
        name: "members",
      })
    : null;

const fields = fieldArray?.fields || [];
const append = fieldArray?.append;
const remove = fieldArray?.remove;
const members = watch("members") || [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-gray-700"
    >
      {/* Card Details */}
      <div className="rounded-xl border bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          Card Details
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">
              RC Number
            </label>

            <input
              {...register("rcNumber")}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />

            <p className="mt-1 text-sm text-red-600">
              {errors.rcNumber?.message}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">
              Total Units
            </label>

            <input
              type="number"
              {...register("totalUnits")}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Card Type
            </label>

            <select
              {...register("cardType")}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option value="PHH">PHH</option>
              <option value="AAY">AAY</option>
              <option value="NPHH">NPHH</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Category
            </label>

            <input
              {...register("category")}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            Remarks
          </label>

          <textarea
            rows={3}
            {...register("remarks")}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      {/* Members */}
      {mode === "create" && (
      <div className="rounded-xl border bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Family Members
          </h2>

        {mode === "create" && (
          <button
            type="button"
            onClick={() =>
              append({
                name: "",
                dob: "",
                gender: "MALE",
                relation: "SON",
                aadhaarNumber: "",
                mobile: "",
                status: "ACTIVE",
                isHead: false,
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Add Member
          </button>
        )}
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Member {index + 1}
              </h3>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="hidden"
                {...register(`members.${index}._id`)}
              />
              <input
                placeholder="Name"
                {...register(
                  `members.${index}.name`
                )}
                className="rounded-lg border px-3 py-2"
              />

              <input
                type="date"
                {...register(
                  `members.${index}.dob`
                )}
                className="rounded-lg border px-3 py-2"
              />

              <select
                {...register(
                  `members.${index}.gender`
                )}
                className="rounded-lg border px-3 py-2"
              >
                <option value="MALE">
                  Male
                </option>
                <option value="FEMALE">
                  Female
                </option>
                <option value="OTHER">
                  Other
                </option>
              </select>

              <input
                placeholder="Relation"
                {...register(
                  `members.${index}.relation`
                )}
                className="rounded-lg border px-3 py-2"
              />

              <input
                placeholder="Aadhaar Number"
                {...register(
                  `members.${index}.aadhaarNumber`
                )}
                className="rounded-lg border px-3 py-2"
              />

              <input
                placeholder="Mobile Number"
                {...register(
                  `members.${index}.mobile`
                )}
                className="rounded-lg border px-3 py-2"
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
                <input
                type="radio"
                name="headOfFamily"
                checked={members[index]?.isHead || false}
                onChange={() => {
                  members.forEach((_, i) => {
                    members[i].isHead = i === index;
                  });
                }}
              />

              Head of Family
            </label>
          </div>
        ))}
      </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Save Ration Card"}
      </button>
    </form>
  );
}