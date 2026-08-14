import api from "@/lib/api";

export const getDashboardApi = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};