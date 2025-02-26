import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchDashboardMetrics = async () => {
  const response = await axios.get("/api/dashboard/metrics");
  return response.data; // { totalRequests, totalSuccess, totalFailures }
};

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ["dashboardMetrics"],
    queryFn: fetchDashboardMetrics,
  });
};
