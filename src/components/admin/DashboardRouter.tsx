
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/pages/AdminDashboard";
import ManagerDashboard from "@/pages/ManagerDashboard";
import CaseWorkerDashboard from "@/pages/CaseWorkerDashboard";
import ViewerDashboard from "@/pages/ViewerDashboard";
import { Navigate } from "react-router-dom";

/**
 * DashboardRouter component that displays the appropriate dashboard based on user role
 * Acts as a central routing point for role-specific dashboards
 */
const DashboardRouter = () => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-redcross"></div>
      </div>
    );
  }

  // If no role is detected, redirect to the home page
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // Return the appropriate dashboard based on the user's role
  switch (userRole) {
    case "admin":
      return <AdminDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "case-worker":
      return <CaseWorkerDashboard />;
    case "viewer":
      return <ViewerDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default DashboardRouter;
