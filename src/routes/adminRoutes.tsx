
import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";
import DashboardRouter from "../components/admin/DashboardRouter";

// Admin Pages
const AdminApplications = lazy(() => import("../pages/AdminApplications"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const AddUser = lazy(() => import("../pages/AddUser"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));

/**
 * Admin routes configuration
 * Groups all admin-related routes for better organization
 */
export const adminRoutes = [
  <Route key="admin-dashboard" path="/admin-dashboard" element={<DashboardRouter />} />,
  <Route key="admin-applications" path="/admin-applications" element={<AdminApplications />} />,
  <Route key="user-management" path="/user-management" element={<UserManagement />} />,
  <Route key="add-user" path="/add-user" element={<AddUser />} />,
  <Route key="admin-reports" path="/admin-reports" element={<Navigate to="/coming-soon" />} />,
  <Route key="admin-settings" path="/admin-settings" element={<Navigate to="/coming-soon" />} />,
];
