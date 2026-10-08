import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const createTask = async ({
  title,
  description,
  status,
  priority,
  dueDate,
  project,
  assignedTo,
}) => {
  const existingProject = await Project.findById(project);

  if (!existingProject) {
    throw new Error("Project not found");
  }

  if (assignedTo) {
    const user = await User.findById(assignedTo);

    if (!user) {
      throw new Error("Assigned user not found");
    }
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    project,
    assignedTo,
  });

  return task;
};

export const getTasks = async () => {
  return await Task.find()
    .populate("project", "name")
    .populate("assignedTo", "firstName lastName email");
};

export const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("project", "name")
    .populate("assignedTo", "firstName lastName email");

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

export const updateTask = async (taskId, data) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

export const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};