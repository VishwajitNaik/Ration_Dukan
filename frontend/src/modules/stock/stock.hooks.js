import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createStockBatchApi,
  getStockSummaryApi,
  getStockBatchesApi,
  getStockBatchApi,
  updateStockBatchApi,
  deleteStockBatchApi,
  getCurrentStockReportApi,
  getLowStockReportApi,
  getStockRegisterReportApi,
  getCommoditySummaryReportApi,
  getBatchConsumptionReportApi,
  getLowStockReport,
  getStockLedgerReportApi,
  getStockMovementReportApi,

} from "./stock.api";

/**
 * Summary
 */
export const useStockSummary = () =>
  useQuery({
    queryKey: ["stock-summary"],
    queryFn: getStockSummaryApi,
  });

/**
 * Batch List
 */
export const useStockBatches = (
  params
) =>
  useQuery({
    queryKey: ["stock-batches", params],
    queryFn: () =>
      getStockBatchesApi(params),
  });

/**
 * Single Batch
 */
export const useStockBatch = (id) =>
  useQuery({
    queryKey: ["stock-batch", id],
    queryFn: () => getStockBatchApi(id),
    enabled: !!id,
  });

/**
 * Create Batch
 */
export const useCreateStockBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStockBatchApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stock-batches"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stock-summary"],
      });
    },
  });
};

/**
 * Update Batch
 */
export const useUpdateStockBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      updateStockBatchApi(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["stock-batches"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stock-batch", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["stock-summary"],
      });
    },
  });
};

/**
 * Delete Batch
 */
export const useDeleteStockBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStockBatchApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stock-batches"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stock-summary"],
      });
    },
  });
};

/**
 * Reports
 */
export const useCurrentStockReport =
  () =>
    useQuery({
      queryKey: ["current-stock-report"],
      queryFn:
        getCurrentStockReportApi,
    });

// export const useLowStockReport = (
//   params
// ) =>
//   useQuery({
//     queryKey: ["low-stock-report", params],
//     queryFn: () =>
//       getLowStockReportApi(params),
//   });

// export const useStockRegisterReport = (
//   params
// ) =>
//   useQuery({
//     queryKey: [
//       "stock-register-report",
//       params,
//     ],
//     queryFn: () =>
//       getStockRegisterReportApi(params),
//   });

  export const useStockRegisterReport = (
  params
) =>
  useQuery({
    queryKey: [
      "stock-register-report",
      params,
    ],

    queryFn: async () => {
      const response =
        await getStockRegisterReportApi(
          params
        );

      return response.data;
    },
  });

export const useCommoditySummaryReport =
  () =>
    useQuery({
      queryKey: [
        "commodity-summary-report",
      ],
      queryFn:
        getCommoditySummaryReportApi,
    });

export const useBatchConsumptionReport =
  (params) =>
    useQuery({
      queryKey: [
        "batch-consumption-report",
        params,
      ],
      queryFn: () =>
        getBatchConsumptionReportApi(
          params
        ),
    });

    export const useStockLedgerReport = (
  params
) =>
  useQuery({
    queryKey: [
      "stock-ledger-report",
      params,
    ],

    queryFn: async () => {
      const response =
        await getStockLedgerReportApi(
          params
        );

      return response.data;
    },
  });

export const useLowStockReport = (
  params
) =>
  useQuery({
    queryKey: [
      "low-stock-report",
      params,
    ],

    queryFn: async () => {
      const response =
        await getLowStockReportApi(
          params
        );

      return response.data;
    },
  });

  export const useStockMovementReport = (
  params
) =>
  useQuery({
    queryKey: [
      "stock-movement-report",
      params,
    ],

    queryFn: async () => {
      const response =
        await getStockMovementReportApi(
          params
        );

      return response.data;
    },
  });

//   export const useStockRegisterReport = (
//   params
// ) =>
//   useQuery({
//     queryKey: [
//       "stock-register-report",
//       params,
//     ],

//     queryFn: async () => {
//       const response =
//         await getStockRegisterReportApi(
//           params
//         );

//       return response.data;
//     },
//   });