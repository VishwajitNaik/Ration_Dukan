"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { stockBatchSchema } from "@/modules/stock/stock.validation";
import { STOCK_ITEMS } from "@/modules/stock/stock.constants";



export default function StockForm({
  defaultValues,
  onSubmit,
  loading,
  mode = "create",
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stockBatchSchema),

    defaultValues:
      defaultValues || {
        batchDate: new Date()
          .toISOString()
          .split("T")[0],

        remarks: "",

        items: STOCK_ITEMS.map(
          (item) => ({
            commodity:
              item.commodity,
            receivedQty: "",
            unit: item.unit,
          })
        ),
      },
  });

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-gray-700"
    >
      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-5 text-lg text-gray-900 font-semibold">
          Batch Details
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label>Batch Date</label>

            <input
              type="date"
              {...register("batchDate")}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label>Remarks</label>

            <input
              {...register("remarks")}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Commodities
        </h2>

        <div className="space-y-3">
          {fields.map(
            (field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-5 font-medium">
                  {
                    STOCK_ITEMS[index]
                      .label
                  }
                </div>

                <input
                  type="hidden"
                  {...register(
                    `items.${index}.commodity`
                  )}
                />

                <input
                  type="hidden"
                  {...register(
                    `items.${index}.unit`
                  )}
                />

                <div className="col-span-5">
                  <input
                    type="number"
                    min="0"
                    placeholder="Quantity"
                    {...register(
                      `items.${index}.receivedQty`
                    )}
                    className="w-full rounded-lg border px-3 py-2"
                  />

                  <p className="text-sm text-red-600">
                    {
                      errors
                        ?.items?.[
                        index
                      ]
                        ?.receivedQty
                        ?.message
                    }
                  </p>
                </div>

                <div className="col-span-2 text-gray-600">
                  {
                    STOCK_ITEMS[index]
                      .unit
                  }
                </div>
              </div>
            )
          )}
        </div>
      </div>
<button
  type="submit"
  disabled={loading}
  className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
>
  {loading
    ? mode === "edit"
      ? "Updating..."
      : "Saving..."
    : mode === "edit"
      ? "Update Batch"
      : "Receive Stock Batch"}
</button>
    </form>
  );
}