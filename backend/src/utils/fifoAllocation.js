import StockBatch from "../modules/stock/stock.model.js";

/**
 * Build FIFO Allocation Plan
 * Does NOT update the database.
 */
export const allocateFIFOStock = async (
  ownerId,
  commodity,
  requiredQty
) => {

  const batches = await StockBatch.find({
    ownerId,
    isDeleted: false,
    "items.commodity": commodity,
    "items.remainingQty": {
      $gt: 0,
    },
  }).sort({
    batchDate: 1,
    createdAt: 1,
  });

  let remainingRequired = requiredQty;

  const allocations = [];

  for (const batch of batches) {

    const item = batch.items.find(
      i =>
        i.commodity === commodity &&
        i.remainingQty > 0
    );

    if (!item) {
      continue;
    }

    const allocateQty = Math.min(
      remainingRequired,
      item.remainingQty
    );

    allocations.push({
      batchId: batch._id,
      batchNo: batch.batchNo,
      quantity: allocateQty,
    });
    remainingRequired -= allocateQty;

    if (remainingRequired === 0) {
      break;
    }

  }

  if (remainingRequired > 0) {
    throw new Error(
      `${commodity} stock allocation failed.`
    );
  }

  return {
  commodity,
  requestedQty: requiredQty,
  allocations,
};

};


// import StockBatch from "../modules/stock/stock.model.js";

// /**
//  * FIFO Stock Allocation
//  */
// export const allocateFIFOStock = async (
//   ownerId,
//   commodity,
//   requiredQty
// ) => {

//   const batches = await StockBatch.find({
//     ownerId,
//     isDeleted: false,
//     "items.commodity": commodity,
//     "items.remainingQty": { $gt: 0 },
//   }).sort({
//     batchDate: 1,
//     createdAt: 1,
//   });

//   let remainingRequired = requiredQty;

//   const allocations = [];

//   for (const batch of batches) {

//     const item = batch.items.find(
//       i =>
//         i.commodity === commodity &&
//         i.remainingQty > 0
//     );

//     if (!item) {
//       continue;
//     }

//     const allocateQty = Math.min(
//       remainingRequired,
//       item.remainingQty
//     );

//     allocations.push({
//       batchId: batch._id,
//       quantity: allocateQty,
//     });

//     item.remainingQty -= allocateQty;

//     remainingRequired -= allocateQty;

//     await batch.save();

//     if (remainingRequired === 0) {
//       break;
//     }

//   }

//   if (remainingRequired > 0) {
//     throw new Error(
//       `${commodity} stock allocation failed.`
//     );
//   }

//   return allocations;

// };