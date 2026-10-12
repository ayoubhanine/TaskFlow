import api from "../../api/axios";

const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data.data;
};

const getTaskDashboardStats = async () => {
  const response = await api.get("/dashboard/task-stats");

  return response.data.data;
};

const dashboardService = {
  getDashboardStats,
  getTaskDashboardStats,
};

export default dashboardService;
