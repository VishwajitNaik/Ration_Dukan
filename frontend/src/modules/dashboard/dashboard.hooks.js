import { useQuery } from "@tanstack/react-query";
import { getDashboardApi } from "./dashboard.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardApi,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};