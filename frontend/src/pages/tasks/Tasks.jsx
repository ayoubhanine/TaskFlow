import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FiCheckSquare,
  FiPlus,
  FiSearch,
  FiX,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiFolder,
  FiAlertCircle,
} from "react-icons/fi";
import api from "../../api/axios";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../features/tasks/taskSlice";

import { getProjects } from "../../features/projects/projectSlice";

const initialForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
  project: "",
  assignedTo: "",
};

const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];



const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const statusStyles = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-blue-100 text-blue-700",
  done: "bg-emerald-100 text-emerald-700",
};

const priorityStyles = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

export default function Tasks() {
  const dispatch = useDispatch();
    const [members, setMembers] = useState([]);
const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const {
    tasks,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
  } = useSelector((state) => state.tasks);

  const {
    projects,
    isLoading: isLoadingProjects,
  } = useSelector((state) => state.projects);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const canManageTasks = ["admin", "manager"].includes(user?.role);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
  const fetchMembers = async () => {
    setIsLoadingMembers(true);

    try {
      const response = await api.get("/users/members");
      setMembers(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch members"
      );
    } finally {
      setIsLoadingMembers(false);
    }
  };

  fetchMembers();
}, []);

  // Search and filter tasks
  const query = search.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const title = task.title || "";
    const description = task.description || "";
    const projectName =
      typeof task.project === "object"
        ? task.project?.name || ""
        : "";

    const matchesSearch = `${title} ${description} ${projectName}`
      .toLowerCase()
      .includes(query);

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const openCreateForm = () => {
    setEditingTaskId(null);
    setFormData(initialForm);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setEditingTaskId(task._id);

    setFormData({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      priority: task.priority || "medium",
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().slice(0, 10)
        : "",
      project:
        typeof task.project === "object"
          ? task.project?._id || ""
          : task.project || "",
      assignedTo:
        typeof task.assignedTo === "object"
          ? task.assignedTo?._id || ""
          : task.assignedTo || "",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTaskId(null);
    setFormData(initialForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (!formData.project) {
      toast.error("Please select a project");
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      project: formData.project,
      ...(formData.dueDate && {
        dueDate: formData.dueDate,
      }),
      ...(formData.assignedTo.trim() && {
        assignedTo: formData.assignedTo.trim(),
      }),
    };

    try {
      if (editingTaskId) {
        await dispatch(
          updateTask({
            id: editingTaskId,
            taskData,
          })
        ).unwrap();

        toast.success("Task updated successfully");
      } else {
        await dispatch(createTask(taskData)).unwrap();

        toast.success("Task created successfully");
      }

      closeForm();

      // Reload tasks so populated project/user details are up to date.
      dispatch(getTasks());
    } catch {
      // The Redux error effect displays the API error.
    }
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteTask(taskId)).unwrap();

      toast.success("Task deleted successfully");
    } catch {
      // The Redux error effect displays the API error.
    }
  };

  const getProjectName = (project) => {
    if (project && typeof project === "object") {
      return project.name || "Unnamed project";
    }

    return "Project";
  };

  const getAssignedUser = (assignedTo) => {
    if (!assignedTo) return "Unassigned";

    if (typeof assignedTo === "object") {
      const fullName = [
        assignedTo.firstName,
        assignedTo.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      return fullName || assignedTo.email || "Assigned user";
    }

    return "Assigned user";
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold tracking-widest text-indigo-600">
            WORKSPACE
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Tasks
          </h1>

          <p className="mt-2 text-slate-500">
            Organize tasks, track progress, and manage deadlines.
          </p>
        </div>

        {canManageTasks && (
          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <FiPlus size={19} />
            New Task
          </button>
        )}
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Tasks
            </p>
            <FiCheckSquare className="text-indigo-600" size={21} />
          </div>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {tasks.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            To Do
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {tasks.filter((task) => task.status === "todo").length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            In Progress
          </p>

          <p className="mt-3 text-3xl font-bold text-blue-600">
            {
              tasks.filter(
                (task) => task.status === "in-progress"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Completed
          </p>

          <p className="mt-3 text-3xl font-bold text-emerald-600">
            {tasks.filter((task) => task.status === "done").length}
          </p>
        </div>
      </section>

      {/* Create/Edit form */}
      {showForm && canManageTasks && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {editingTaskId ? "Edit Task" : "Create a Task"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Fill in the task information below.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close form"
            >
              <FiX size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Task title *
                </label>

                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Build login page"
                  maxLength={150}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what needs to be done..."
                  rows={3}
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="project"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Project *
                </label>

                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  disabled={isLoadingProjects}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
                >
                  <option value="">
                    {isLoadingProjects
                      ? "Loading projects..."
                      : "Select a project"}
                  </option>

                  {projects.map((project) => (
                    <option
                      key={project._id || project.id}
                      value={project._id || project.id}
                    >
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

<div>
  <label
    htmlFor="assignedTo"
    className="mb-2 block text-sm font-medium text-slate-700"
  >
    Assign to Member
  </label>

  <select
    id="assignedTo"
    name="assignedTo"
    value={formData.assignedTo}
    onChange={handleChange}
    disabled={isLoadingMembers}
    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
  >
    <option value="">
      {isLoadingMembers
        ? "Loading members..."
        : "Unassigned"}
    </option>

    {members.map((member) => (
      <option key={member._id} value={member._id}>
        {member.firstName} {member.lastName} — {member.email}
      </option>
    ))}
  </select>

  <p className="mt-1 text-xs text-slate-500">
    Optional. Select a member or leave unassigned.
  </p>
</div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="dueDate"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Due date
                </label>

                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating || isUpdating
                  ? "Saving..."
                  : editingTaskId
                    ? "Save Changes"
                    : "Create Task"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Search and filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All statuses</option>

            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All priorities</option>

            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>
            {filteredTasks.length} task(s) found
          </span>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setPriorityFilter("all");
            }}
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Clear filters
          </button>
        </div>
      </section>

      {/* Tasks list */}
      <section>
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Loading tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FiCheckSquare size={26} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No tasks found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {search || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try changing your search or filters."
                : "Create a task to get started."}
            </p>

            {canManageTasks && (
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                <FiPlus size={18} />
                New Task
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTasks.map((task) => (
              <article
                key={task._id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[task.status] || statusStyles.todo
                    }`}
                  >
                    {statusOptions.find(
                      (option) => option.value === task.status
                    )?.label || task.status}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      priorityStyles[task.priority] ||
                      priorityStyles.medium
                    }`}
                  >
                    {task.priority || "medium"} priority
                  </span>
                </div>

                <h3 className="mt-4 wrap-break-word text-lg font-bold text-slate-900">
                  {task.title}
                </h3>

                <p className="mt-2 min-h-12 whitespace-pre-line wrap-break-word text-sm leading-6 text-slate-500">
                  {task.description || "No description provided."}
                </p>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <FiFolder
                      size={17}
                      className="mt-0.5 shrink-0 text-indigo-500"
                    />

                    <span className="wrap-break-word">
                      {getProjectName(task.project)}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <FiUser
                      size={17}
                      className="mt-0.5 shrink-0 text-indigo-500"
                    />

                    <span className="wrap-break-word">
                      {getAssignedUser(task.assignedTo)}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    {task.dueDate ? (
                      <FiCalendar
                        size={17}
                        className="mt-0.5 shrink-0 text-indigo-500"
                      />
                    ) : (
                      <FiAlertCircle
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />
                    )}

                    <span>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>

                {canManageTasks && (
                  <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => openEditForm(task)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(task._id)}
                      disabled={isDeleting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

