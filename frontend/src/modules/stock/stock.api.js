import api from "@/lib/api";

/**
 * Create Batch
 */
export const createStockBatchApi = async (
  payload
) => {
  const response = await api.post(
    "/stock",
    payload
  );

  return response.data;
};

/**
 * Summary
 */
export const getStockSummaryApi = async () => {
  const response = await api.get(
    "/stock/summary"
  );

  return response.data;
};

/**
 * Batch List
 */
export const getStockBatchesApi = async (
  params
) => {
  const response = await api.get("/stock", {
    params,
  });

  return response.data;
};

/**
 * Single Batch
 */
export const getStockBatchApi = async (
  id
) => {
  const response = await api.get(
    `/stock/${id}`
  );

  return response.data;
};

/**
 * Update Batch
 */
export const updateStockBatchApi = async (
  id,
  payload
) => {
  const response = await api.put(
    `/stock/${id}`,
    payload
  );

  return response.data;
};

/**
 * Delete Batch
 */
export const deleteStockBatchApi = async (
  id
) => {
  const response = await api.delete(
    `/stock/${id}`
  );

  return response.data;
};

/**
 * Current Stock Report
 */
export const getCurrentStockReportApi =
  async () => {
    const response = await api.get(
      "/stock/reports/current"
    );

    return response.data;
  };

/**
 * Low Stock Report
 */
export const getLowStockReportApi =
  async (params) => {
    const response = await api.get(
      "/stock/reports/low-stock",
      { params }
    );

    return response.data;
  };

/**
 * Stock Register
 */
// export const getStockRegisterReportApi =
//   async (params) => {
//     const response = await api.get(
//       "/stock/reports/register",
//       { params }
//     );

//     return response.data;
//   };

/**
 * Commodity Summary
 */
export const getCommoditySummaryReportApi =
  async () => {
    const response = await api.get(
      "/stock/reports/commodity-summary"
    );

    return response.data;
  };

  // export const getCommoditySummaryReportApi = () =>
  // api.get(
  //   "/stock/reports/commodity-summary"
  // );

/**
 * Batch Consumption
 */
export const getBatchConsumptionReportApi =
  async (params) => {
    const response = await api.get(
      "/stock/reports/batch-consumption",
      { params }
    );

    return response.data;
  };

export const getStockRegisterReportApi = (
  params = {}
) => {

  const cleanParams = {};

  if (params.fromDate)
    cleanParams.fromDate =
      params.fromDate;

  if (params.toDate)
    cleanParams.toDate =
      params.toDate;

  if (params.commodity)
    cleanParams.commodity =
      params.commodity;

  return api.get(
    "/stock/reports/register",
    {
      params: cleanParams,
    }
  );
};

export const getStockLedgerReportApi = (params) => {
  const cleanParams = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      cleanParams[key] = value;
    }
  });

  return api.get("/stock/reports/ledger", {
    params: cleanParams,
  });
};

export const getStockMovementReportApi = (
  params
) =>
  api.get(
    "/stock/reports/movement",
    { params }
  );

  export const getCurrentStockReport = () =>
  api.get("/stock/reports/current");

  