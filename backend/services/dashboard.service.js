
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = async () => {
  const [projects, tasks, users] = await Promise.all([
    Project.countDocuments(),
    Task.countDocuments(),
    User.countDocuments(),
  ]);

  return {
    projects,
    tasks,
    users,
  };
};

export const getTaskDashboardStats = async (user) => {
  const filter = {};

  // Members only see their assigned tasks
  if (user.role === "member") {
    filter.assignedTo = user.id;
  }

  const [totalTasks, completedTasks, pendingTasks] =
    await Promise.all([
      Task.countDocuments(filter),
      Task.countDocuments({ ...filter, status: "done" }),
      Task.countDocuments({
        ...filter,
        status: { $ne: "done" },
      }),
    ]);

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
  };
};