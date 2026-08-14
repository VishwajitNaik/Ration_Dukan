import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createDistributionApi,
  getDistributionsApi,
  getDistributionApi,
  updateDistributionApi,
  reverseDistributionApi,
  getDistributionHistoryApi,
  getDistributionDashboardApi,
  getTodayDistributionReportApi,
  getMonthlyDistributionReportApi,
  getYearlyDistributionReportApi,
  getCommodityDistributionReportApi,
  getDailyDistributionRegisterApi,
  getTodayReportApi,
  getMonthlyReportApi,
  getYearlyReportApi,
  getCommodityReportApi,
  getDailyRegisterApi,
} from "./distribution.api";

/**
 * Dashboard
 */
export const useDistributionDashboard =
  () =>
    useQuery({
      queryKey: [
        "distribution-dashboard",
      ],

      queryFn: async () => {
        const response =
          await getDistributionDashboardApi();

        return response.data;
      },
    });

/**
 * List
 */
export const useDistributions = (
  params
) =>
  useQuery({
    queryKey: [
      "distributions",
      params,
    ],

    queryFn: async () => {
      const response =
        await getDistributionsApi(
          params
        );

      return response.data;
    },
  });

/**
 * Single
 */
export const useDistribution = (
  id
) =>
  useQuery({
    queryKey: [
      "distribution",
      id,
    ],

    queryFn: async () => {
      const response =
        await getDistributionApi(id);

      return response.data;
    },

    enabled: !!id,
  });

/**
 * Create
 */
export const useCreateDistribution =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createDistributionApi,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "distributions",
            ],
          }
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "distribution-dashboard",
            ],
          }
        );
      },
    });
  };

/**
 * Update
 */
export const useUpdateDistribution =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateDistributionApi,

      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "distributions",
            ],
          }
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "distribution",
              variables.id,
            ],
          }
        );
      },
    });
  };

/**
 * Reverse
 */
export const useReverseDistribution =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        reverseDistributionApi,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "distributions",
            ],
          }
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "distribution-dashboard",
            ],
          }
        );
      },
    });
  };

/**
 * History
 */
export const useDistributionHistory =
  (params) =>
    useQuery({
      queryKey: [
        "distribution-history",
        params,
      ],

      queryFn: async () => {
        const response =
          await getDistributionHistoryApi(
            params
          );

        return response.data;
      },
    });

/**
 * Today Report
 */
export const useTodayDistributionReport =
  () =>
    useQuery({
      queryKey: [
        "distribution-today-report",
      ],

      queryFn: async () => {
        const response =
          await getTodayDistributionReportApi();

        return response.data;
      },
    });

/**
 * Monthly Report
 */
export const useMonthlyDistributionReport =
  (params) =>
    useQuery({
      queryKey: [
        "distribution-monthly-report",
        params,
      ],

      queryFn: async () => {
        const response =
          await getMonthlyDistributionReportApi(
            params
          );

        return response.data;
      },
    });

/**
 * Yearly Report
 */
export const useYearlyDistributionReport =
  (params) =>
    useQuery({
      queryKey: [
        "distribution-yearly-report",
        params,
      ],

      queryFn: async () => {
        const response =
          await getYearlyDistributionReportApi(
            params
          );

        return response.data;
      },
    });

/**
 * Commodity Report
 */
export const useCommodityDistributionReport =
  (params) =>
    useQuery({
      queryKey: [
        "distribution-commodity-report",
        params,
      ],

      queryFn: async () => {
        const response =
          await getCommodityDistributionReportApi(
            params
          );

        return response.data;
      },
    });

/**
 * Daily Register
 */
export const useDailyDistributionRegister =
  (params) =>
    useQuery({
      queryKey: [
        "distribution-daily-register",
        params,
      ],

      queryFn: async () => {
        const response =
          await getDailyDistributionRegisterApi(
            params
          );

        return response.data;
      },
    });

    export const useTodayReport = () =>
  useQuery({
    queryKey: ["distribution-today-report"],
    queryFn: getTodayReportApi,
  });

export const useMonthlyReport = (
  params
) =>
  useQuery({
    queryKey: [
      "distribution-monthly-report",
      params,
    ],
    queryFn: () =>
      getMonthlyReportApi(params),
  });

export const useYearlyReport = (
  params
) =>
  useQuery({
    queryKey: [
      "distribution-yearly-report",
      params,
    ],
    queryFn: () =>
      getYearlyReportApi(params),
  });

export const useCommodityReport = (
  params
) =>
  useQuery({
    queryKey: [
      "distribution-commodity-report",
      params,
    ],
    queryFn: () =>
      getCommodityReportApi(params),
  });

export const useDailyRegister = (
  params
) =>
  useQuery({
    queryKey: [
      "distribution-daily-register",
      params,
    ],
    queryFn: () =>
      getDailyRegisterApi(params),
  });

