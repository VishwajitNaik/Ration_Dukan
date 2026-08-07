import StockBatch from "../modules/stock/stock.model.js";

/**
 * Apply FIFO Allocation
 * Deduct remainingQty using transaction
 */
export const applyAllocation = async (
  commodity,
  allocations,
  session
) => {

  for (const allocation of allocations) {

    const batch = await StockBatch.findById(
      allocation.batchId
    ).session(session);

    if (!batch) {
      throw new Error(
        `Batch ${allocation.batchId} not found`
      );
    }

    const stockItem = batch.items.find(
      item => item.commodity === commodity
    );

    if (!stockItem) {
      throw new Error(
        `${commodity} not found in batch`
      );
    }

    if (
      stockItem.remainingQty <
      allocation.quantity
    ) {
      throw new Error(
        `${commodity} stock mismatch`
      );
    }

    stockItem.remainingQty -= allocation.quantity;

    await batch.save({
      session,
    });

  }

};