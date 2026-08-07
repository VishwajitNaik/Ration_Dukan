import StockBatch from "../modules/stock/stock.model.js";

/**
 * Restore FIFO Allocation
 * Add back remainingQty using transaction
 */
export const restoreAllocation = async (
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

    /**
     * Restore quantity
     */
    stockItem.remainingQty +=
      allocation.quantity;

    /**
     * Safety Check
     * remainingQty should never exceed receivedQty
     */
    if (
      stockItem.remainingQty >
      stockItem.receivedQty
    ) {
      throw new Error(
        `${commodity} restore quantity exceeds received quantity.`
      );
    }

    await batch.save({
      session,
    });

  }

};