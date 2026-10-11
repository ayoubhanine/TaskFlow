
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