import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FiFolder,
  FiPlus,
  FiSearch,
  FiX,
} from "react-icons/fi";

import {
  getProjects,
  createProject,
} from "../../features/projects/projectSlice";

export default function Projects() {
  const dispatch = useDispatch();

  const {
    projects,
    isLoading,
    isCreating,
    error,
  } = useSelector((state) => state.projects);

  const user = useSelector((state) => state.auth.user);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const canCreate = ["admin", "manager"].includes(user?.role);

  // Fetch projects when the page loads
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  // Display API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Filter projects without useMemo
  const query = search.trim().toLowerCase();

  const filteredProjects = projects.filter((project) =>
    `${project.name || ""} ${project.description || ""}`
      .toLowerCase()
      .includes(query)
  );

  // Create a new project
  const handleCreate = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      await dispatch(
        createProject({
          name: name.trim(),
          description: description.trim(),
        })
      ).unwrap();

      toast.success("Project created successfully!");

      setName("");
      setDescription("");
      setShowForm(false);
    } catch {
      // The error is handled by Redux and the useEffect above.
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold tracking-widest text-indigo-600">
            WORKSPACE
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-2 text-slate-500">
            Organize your team's work in one place.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            {showForm ? <FiX size={18} /> : <FiPlus size={18} />}

            {showForm ? "Cancel" : "New project"}
          </button>
        )}
      </div>

      {/* Create project form */}
      {showForm && canCreate && (
        <form
          onSubmit={handleCreate}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Create a project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a name and description for your new project.
            </p>
          </div>

          <div>
            <label
              htmlFor="projectName"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Project name
            </label>

            <input
              id="projectName"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Website redesign"
              maxLength={100}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="projectDescription"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="projectDescription"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this project about?"
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Creating..." : "Create project"}
          </button>
        </form>
      )}

      {/* Search and project count */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            All projects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredProjects.length} project(s) found
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <FiSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          Loading projects...
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FiFolder size={26} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No projects found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {search
              ? "Try another search term."
              : "Create your first project to get started."}
          </p>
        </div>
      ) : (
        /* Projects list */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project._id || project.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiFolder size={23} />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Project
                </span>
              </div>

              <h3 className="mt-5 wrap-break-word text-lg font-bold text-slate-900">
                {project.name}
              </h3>

              <p className="mt-2 min-h-12 whitespace-pre-line wrap-break-word text-sm leading-6 text-slate-500">
                {project.description || "No description provided."}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
                {project.members?.length || 0} member(s)
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
