
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Admin Dashboard
      </h1>

      <p className="text-slate-600">
        Welcome to your TaskFlow workspace.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Projects</p>
          <p className="mt-2 text-3xl font-bold text-indigo-600">0</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Tasks</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">0</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Users</p>
          <p className="mt-2 text-3xl font-bold text-violet-600">0</p>
        </div>
      </div>
    </div>
  );
}
