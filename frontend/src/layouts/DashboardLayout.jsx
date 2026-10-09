import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiGrid,
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { logout } from "../features/auth/authSlice";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role;

  const links = [
    {
      label: "Dashboard",
      path: `/${role}/dashboard`,
      icon: FiGrid,
    },
    {
      label: "Projects",
      path: `/${role}/projects`,
      icon: FiFolder,
    },
    {
      label: "Tasks",
      path: `/${role}/tasks`,
      icon: FiCheckSquare,
    },
    ...(role === "admin"
      ? [
          {
            label: "Users",
            path: "/admin/users",
            icon: FiUsers,
          },
        ]
      : []),
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <span className="text-2xl font-bold">
            Task<span className="text-indigo-400">Flow</span>
          </span>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold">
            {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <p className="mt-3 font-semibold">
            {user?.firstName || "User"} {user?.lastName || ""}
          </p>

          <p className="mt-1 text-xs capitalize text-indigo-300">
            {role || "Member"}
          </p>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <FiLogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open sidebar"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={22} />
            </button>

            <div>
              <p className="font-semibold text-slate-900">Workspace</p>
              <p className="text-xs text-slate-500">
                Manage your work efficiently
              </p>
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
            {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </header>

        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}