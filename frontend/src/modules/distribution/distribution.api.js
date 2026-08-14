import api from "@/lib/api";

/**
 * CRUD
 */
export const createDistributionApi = (
  payload
) =>
  api.post(
    "/distribution",
    payload
  );

export const getDistributionsApi = (
  params
) =>
  api.get("/distribution", {
    params,
  });

export const getDistributionApi = (
  id
) =>
  api.get(
    `/distribution/${id}`
  );

export const updateDistributionApi = ({
  id,
  payload,
}) =>
  api.put(
    `/distribution/${id}`,
    payload
  );

// export const reverseDistributionApi = (
//   id
// ) =>
//   api.delete(
//     `/distribution/${id}`
//   );

export const reverseDistributionApi = async (id) => {
  const response = await api.delete(`/distribution/${id}`);
  return response.data;
};

/**
 * History
//  */
// export const getDistributionHistoryApi =
//   (params) =>
//     api.get(
//       "/distribution/history",
//       { params }
//     );

export const getDistributionHistoryApi = async (
  params
) => {
  const response = await api.get(
    "/distribution/history",
    { params }
  );
  return response.data;
};

/**
 * Dashboard
 */
export const getDistributionDashboardApi =
  () =>
    api.get(
      "/distribution/reports/dashboard"
    );

/**
 * Today
 */
export const getTodayDistributionReportApi =
  () =>
    api.get(
      "/distribution/reports/today"
    );

/**
 * Monthly
 */
export const getMonthlyDistributionReportApi =
  (params) =>
    api.get(
      "/distribution/reports/monthly",
      { params }
    );

/**
 * Yearly
 */
export const getYearlyDistributionReportApi =
  (params) =>
    api.get(
      "/distribution/reports/yearly",
      { params }
    );

/**
 * Commodity
 */
export const getCommodityDistributionReportApi =
  (params) =>
    api.get(
      "/distribution/reports/commodity",
      { params }
    );

/**
 * Daily Register
 */
export const getDailyDistributionRegisterApi =
  (params) =>
    api.get(
      "/distribution/register/daily",
      { params }
    );

export const getTodayReportApi = async () => {
  const response = await api.get(
    "/distribution/reports/today"
  );
  return response.data;
};

export const getMonthlyReportApi = async (
  params
) => {
  const response = await api.get(
    "/distribution/reports/monthly",
    { params }
  );
  return response.data;
};

export const getYearlyReportApi = async (
  params
) => {
  const response = await api.get(
    "/distribution/reports/yearly",
    { params }
  );
  return response.data;
};

export const getCommodityReportApi = async (
  params
) => {
  const response = await api.get(
    "/distribution/reports/commodity",
    { params }
  );
  return response.data;
};

export const getDailyRegisterApi = async (
  params
) => {
  const response = await api.get(
    "/distribution/register/daily",
    { params }
  );
  return response.data;
};

