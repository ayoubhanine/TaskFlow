import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiFolder,
  FiCheckSquare,
  FiClock,
  FiArrowRight,
  FiClipboard,
} from "react-icons/fi";

import { getProjects } from "../../features/projects/projectSlice";
import { getTaskDashboardStats } from "../../features/dashboard/dashboardSlice";

export default function MemberDashboard() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const {
    projects,
    isLoading,
  } = useSelector((state) => state.projects);

  const {
    taskStats,
    isLoadingTaskStats,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTaskDashboardStats());
  }, [dispatch]);

  const firstName = user?.firstName || "Member";

  const stats = [
    {
      label: "My Projects",
      value: isLoading ? "..." : projects.length,
      icon: FiFolder,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "My Tasks",
      value: isLoadingTaskStats ? "..." : taskStats.totalTasks,
      icon: FiCheckSquare,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed Tasks",
      value: isLoadingTaskStats ? "..." : taskStats.completedTasks,
      icon: FiClipboard,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <section className="overflow-hidden rounded-3xl bg-linear-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-100">
          My Workspace
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Hello, {firstName}!
        </h1>

        <p className="mt-3 max-w-xl leading-7 text-sky-100">
          Stay organized, keep track of your tasks, and follow your
          projects' progress.
        </p>

        <Link
          to="/member/tasks"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-sky-50"
        >
          <FiCheckSquare size={18} />
          View My Tasks
          <FiArrowRight size={18} />
        </Link>
      </section>

      {/* Statistics */}
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          My Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Keep an eye on your work and progress.
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
            to="/member/projects"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FiFolder size={23} />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-slate-900">
                My Projects
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Explore projects in your workspace.
              </p>
            </div>

            <FiArrowRight
              className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              size={20}
            />
          </Link>

          <Link
            to="/member/tasks"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-amber-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FiClock size={23} />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-slate-900">
                My Tasks
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Check your assigned tasks and deadlines.
              </p>
            </div>

            <FiArrowRight
              className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-amber-600"
              size={20}
            />
          </Link>
        </div>
      </section>

      {/* Projects section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Available Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Projects in your workspace.
            </p>
          </div>

          <Link
            to="/member/projects"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
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
              Projects will appear here when available.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <article
                key={project._id || project.id}
                className="rounded-xl border border-slate-200 p-5 transition hover:border-indigo-200 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <FiFolder size={20} />
                  </div>

                  <h3 className="wrap-break-word font-semibold text-slate-800">
                    {project.name}
                  </h3>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                  {project.description || "No description provided."}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
