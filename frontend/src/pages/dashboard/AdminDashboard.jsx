
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../features/dashboard/dashboardSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { stats, isLoading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      color: "text-indigo-600",
    },
    {
      title: "Tasks",
      value: stats.tasks,
      color: "text-emerald-600",
    },
    {
      title: "Users",
      value: stats.users,
      color: "text-violet-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome to your TaskFlow workspace.
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-600">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {card.title}
            </p>

            <p className={`mt-2 text-3xl font-bold ${card.color}`}>
              {isLoading ? "..." : card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}