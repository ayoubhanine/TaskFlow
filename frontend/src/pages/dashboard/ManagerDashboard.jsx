import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiFolder,
  FiCheckSquare,
  FiPlus,
  FiArrowRight,
  FiClipboard,
} from "react-icons/fi";

import { getProjects } from "../../features/projects/projectSlice";

export default function ManagerDashboard() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const {
    projects,
    isLoading,
  } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const firstName = user?.firstName || "Manager";

  const stats = [
    {
      label: "Total Projects",
      value: isLoading ? "..." : projects.length,
      icon: FiFolder,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Total Tasks",
      value: "—",
      icon: FiCheckSquare,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed Tasks",
      value: "—",
      icon: FiClipboard,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <section className="overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-lg sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">
          Manager Workspace
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Welcome back, {firstName}!
        </h1>

        <p className="mt-3 max-w-xl leading-7 text-indigo-100">
          Manage your projects, organize your team, and keep track of
          your work from one place.
        </p>

        <Link
          to="/manager/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
        >
          <FiFolder size={18} />
          View Projects
          <FiArrowRight size={18} />
        </Link>
      </section>

      {/* Statistics */}
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          A quick overview of your workspace.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={23} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Link
            to="/manager/projects"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FiFolder size={23} />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-slate-900">
                Manage Projects
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                View and organize your projects.
              </p>
            </div>

            <FiArrowRight
              className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              size={20}
            />
          </Link>

          <Link
            to="/manager/tasks"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FiCheckSquare size={23} />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-slate-900">
                Manage Tasks
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Track tasks and their progress.
              </p>
            </div>

            <FiArrowRight
              className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              size={20}
            />
          </Link>
        </div>
      </section>

      {/* Recent projects */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Projects available in your workspace.
            </p>
          </div>

          <Link
            to="/manager/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all
            <FiArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <p className="py-10 text-center text-sm text-slate-500">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <div className="py-10 text-center">
            <FiFolder
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-medium text-slate-700">
              No projects available
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Create a project to get started.
            </p>

            <Link
              to="/manager/projects"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <FiPlus size={17} />
              Create Project
            </Link>
          </div>
        ) : (
          <div className="mt-5 divide-y divide-slate-100">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project._id || project.id}
                className="flex items-center gap-4 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiFolder size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-slate-800">
                    {project.name}
                  </h3>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {project.description || "No description provided."}
                  </p>
                </div>

                <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 sm:inline-block">
                  Project
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}