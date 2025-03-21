
import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";
import DashboardRouter from "../components/admin/DashboardRouter";

// Admin Pages
const AdminApplications = lazy(() => import("../pages/AdminApplications"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const AddUser = lazy(() => import("../pages/AddUser"));
const AdminReports = lazy(() => import("../pages/AdminReports"));
const AdminSettings = lazy(() => import("../pages/AdminSettings"));
const UserActivity = lazy(() => import("../pages/UserActivity"));
const Login = lazy(() => import("../pages/Login"));

// Role-specific Pages
const TeamManagement = lazy(() => import("../pages/TeamManagement"));
const DepartmentResources = lazy(() => import("../pages/DepartmentResources"));
const MyCases = lazy(() => import("../pages/MyCases"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Resources = lazy(() => import("../pages/Resources"));
const Documents = lazy(() => import("../pages/Documents"));

/**
 * Admin routes configuration
 * Groups all admin-related routes for better organization
 */
export const adminRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="admin-dashboard" path="/admin-dashboard" element={<DashboardRouter />} />,
  <Route key="admin-applications" path="/admin-applications" element={<AdminApplications />} />,
  <Route key="user-management" path="/user-management" element={<UserManagement />} />,
  <Route key="add-user" path="/add-user" element={<AddUser />} />,
  <Route key="user-activity" path="/user-activity" element={<UserActivity />} />,
  <Route key="admin-reports" path="/admin-reports" element={<AdminReports />} />,
  <Route key="admin-settings" path="/admin-settings" element={<AdminSettings />} />,
  
  // Role-specific routes
  <Route key="team-management" path="/team-management" element={<TeamManagement />} />,
  <Route key="department-resources" path="/department-resources" element={<DepartmentResources />} />,
  <Route key="my-cases" path="/my-cases" element={<MyCases />} />,
  <Route key="calendar" path="/calendar" element={<Calendar />} />,
  <Route key="resources" path="/resources" element={<Resources />} />,
  <Route key="documents" path="/documents" element={<Documents />} />
];
