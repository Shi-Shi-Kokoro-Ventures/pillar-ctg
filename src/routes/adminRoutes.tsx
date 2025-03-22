
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

// New Management Pages
const DonationManagement = lazy(() => import("../pages/DonationManagement"));
const GrantManagement = lazy(() => import("../pages/GrantManagement"));
const VolunteerManagement = lazy(() => import("../pages/VolunteerManagement"));
const ProgramOutcomes = lazy(() => import("../pages/ProgramOutcomes"));
const BudgetFinance = lazy(() => import("../pages/BudgetFinance"));
const ClientData = lazy(() => import("../pages/ClientData"));
const DocumentManagement = lazy(() => import("../pages/DocumentManagement"));
const AdminCalendar = lazy(() => import("../pages/AdminCalendar"));
const TaskManagement = lazy(() => import("../pages/TaskManagement"));

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
  
  // New Management Routes
  <Route key="donation-management" path="/donation-management" element={<DonationManagement />} />,
  <Route key="grant-management" path="/grant-management" element={<GrantManagement />} />,
  <Route key="volunteer-management" path="/volunteer-management" element={<VolunteerManagement />} />,
  <Route key="program-outcomes" path="/program-outcomes" element={<ProgramOutcomes />} />,
  <Route key="budget-finance" path="/budget-finance" element={<BudgetFinance />} />,
  <Route key="client-data" path="/client-data" element={<ClientData />} />,
  <Route key="document-management" path="/document-management" element={<DocumentManagement />} />,
  <Route key="admin-calendar" path="/admin-calendar" element={<AdminCalendar />} />,
  <Route key="task-management" path="/task-management" element={<TaskManagement />} />,
  
  // Role-specific routes
  <Route key="team-management" path="/team-management" element={<TeamManagement />} />,
  <Route key="department-resources" path="/department-resources" element={<DepartmentResources />} />,
  <Route key="my-cases" path="/my-cases" element={<MyCases />} />,
  <Route key="calendar" path="/calendar" element={<Calendar />} />,
  <Route key="resources" path="/resources" element={<Resources />} />,
  <Route key="documents" path="/documents" element={<Documents />} />
];
