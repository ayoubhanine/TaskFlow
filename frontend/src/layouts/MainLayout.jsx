
import { Link, NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
              T
            </div>

            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Task<span className="text-indigo-600">Flow</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-3 sm:gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `hidden text-sm font-medium transition sm:block ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-indigo-600"
                }`
              }
            >
              Home
            </NavLink>

            <Link
              to="/login"
              className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Current page */}
      <main className="min-h-[calc(100vh-145px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-slate-500 sm:flex-row">
          <p>
            <span className="font-semibold text-indigo-600">TaskFlow</span>
            {" "}— Plan better. Work smarter.
          </p>

          <p>© {new Date().getFullYear()} TaskFlow</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;