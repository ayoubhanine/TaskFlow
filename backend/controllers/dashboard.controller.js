
import { getDashboardStats,getTaskDashboardStats } from "../services/dashboard.service.js";

export const getStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const stats = await getTaskDashboardStats(req.user);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};