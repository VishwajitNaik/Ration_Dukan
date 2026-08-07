export const generateBatchNumber = () => {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const unique = Date.now()
    .toString()
    .slice(-6);

  return `BATCH-${year}${month}-${unique}`;

};