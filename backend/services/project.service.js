import Project from "../models/project.model.js";

export const createProject = async ({
  name,
  description,
  owner,
}) => {
  const project = await Project.create({
    name,
    description,
    owner,
  });

  return project;
};

export const getProjects = async () => {
  const projects = await Project.find()
    .populate("owner", "firstName lastName email")
    .populate("members", "firstName lastName email");

  return projects;
};

export const getProjectById = async (projectId) => {
  const project = await Project.findById(projectId)
    .populate("owner", "firstName lastName email")
    .populate("members", "firstName lastName email");

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const updateProject = async (
  projectId,
  { name, description }
) => {
  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const deleteProject = async (projectId) => {
  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};