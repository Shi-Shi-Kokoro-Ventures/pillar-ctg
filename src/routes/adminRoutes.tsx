
import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AdminApplications = lazy(() => import("../pages/AdminApplications"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));

/**
 * Admin routes configuration
 * Groups all admin-related routes for better organization
 */
export const adminRoutes = [
  <Route key="admin-dashboard" path="/admin-dashboard" element={<AdminDashboard />} />,
  <Route key="admin-applications" path="/admin-applications" element={<AdminApplications />} />,
  <Route key="user-management" path="/user-management" element={<UserManagement />} />,
  <Route key="admin-reports" path="/admin-reports" element={<Navigate to="/coming-soon" />} />,
  <Route key="admin-settings" path="/admin-settings" element={<Navigate to="/coming-soon" />} />,
];
