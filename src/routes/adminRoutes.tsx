
import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";
import DashboardRouter from "../components/admin/DashboardRouter";
import RoleBasedWrapper from "../components/auth/RoleBasedWrapper";

// Admin Pages
const AdminApplications = lazy(() => import("../pages/AdminApplications"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const AddUser = lazy(() => import("../pages/AddUser"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const Login = lazy(() => import("../pages/Login"));

/**
 * Admin routes configuration
 * Groups all admin-related routes for better organization
 */
export const adminRoutes = [
  // Public login route (no auth required)
  <Route key="login" path="/login" element={<Login />} />,

  // Protected routes (require authentication)
  <Route 
    key="admin-dashboard" 
    path="/admin-dashboard" 
    element={
      <RoleBasedWrapper>
        <DashboardRouter />
      </RoleBasedWrapper>
    } 
  />,
  <Route 
    key="admin-applications" 
    path="/admin-applications" 
    element={
      <RoleBasedWrapper>
        <AdminApplications />
      </RoleBasedWrapper>
    } 
  />,
  <Route 
    key="user-management" 
    path="/user-management" 
    element={
      <RoleBasedWrapper allowedRoles={["admin"]}>
        <UserManagement />
      </RoleBasedWrapper>
    } 
  />,
  <Route 
    key="add-user" 
    path="/add-user" 
    element={
      <RoleBasedWrapper allowedRoles={["admin"]}>
        <AddUser />
      </RoleBasedWrapper>
    } 
  />,
  <Route 
    key="admin-reports" 
    path="/admin-reports" 
    element={
      <RoleBasedWrapper>
        <Navigate to="/coming-soon" />
      </RoleBasedWrapper>
    } 
  />,
  <Route 
    key="admin-settings" 
    path="/admin-settings" 
    element={
      <RoleBasedWrapper>
        <Navigate to="/coming-soon" />
      </RoleBasedWrapper>
    } 
  />,
];
