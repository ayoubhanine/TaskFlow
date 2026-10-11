
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Projects from "../pages/projects/Projects";
import Tasks from "../pages/tasks/Tasks";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ManagerDashboard from "../pages/dashboard/ManagerDashboard";
import MemberDashboard from "../pages/dashboard/MemberDashboard";

import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";
// import NotFound from "../pages/NotFound";
import Users from "../pages/users/Users";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Admin */}
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
               <Route path="/admin/projects" element={<Projects />} />
               <Route path="/admin/tasks" element={<Tasks />} />
               <Route path="/admin/users" element={<Users />} />
            </Route>

            {/* Manager */}
            <Route element={<RoleRoute allowedRoles={["manager"]} />}>
              <Route
                path="/manager/dashboard"
                element={<ManagerDashboard />}
              />
              <Route path="/manager/projects" element={<Projects />} />
              <Route path="/manager/tasks" element={<Tasks />} />
            </Route>

            {/* Member */}
            <Route element={<RoleRoute allowedRoles={["member"]} />}>
              <Route
                path="/member/dashboard"
                element={<MemberDashboard />}
              />
               <Route path="/member/projects" element={<Projects />} />
               <Route path="/member/tasks" element={<Tasks />} />
            </Route>
          </Route>
        </Route>

        {/* 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;