
import React from "react";
import { Users, FileText, DollarSign, Briefcase, Calendar, ClipboardList, BarChart3, CircleDollarSign, Award, FileBox, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MetricsGrid from "@/components/admin/MetricsGrid";
import ActivityFeed from "@/components/admin/ActivityFeed";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import PerformanceMetricsCard from "@/components/admin/PerformanceMetricsCard";
import SystemInfoCard from "@/components/admin/SystemInfoCard";
import { KPIMetric } from "@/components/admin/MetricsGrid";
import { ActivityItem } from "@/components/admin/ActivityFeed";
import { Notification } from "@/components/admin/NotificationsPanel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Management Section Card Component
const ManagementCard = ({ 
  title, 
  description, 
  icon, 
  path 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  path: string;
}) => (
  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
    </CardContent>
    <CardFooter className="pt-0">
      <Link to={path} className="w-full">
        <Button variant="outline" className="w-full mt-2" size="sm">
          Access
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

const AdminDashboard = () => {
  // Mock KPI data for the dashboard
  const kpiData: KPIMetric[] = [
    {
      title: "Total Applications",
      value: "156",
      change: { value: 12, isPositive: true },
      icon: <FileText className="h-5 w-5" />,
      accentColor: "blue",
    },
    {
      title: "Active Cases",
      value: "38",
      change: { value: 5, isPositive: true },
      icon: <Users className="h-5 w-5" />,
      accentColor: "green",
    },
    {
      title: "Donations This Month",
      value: "$24,500",
      change: { value: 8, isPositive: true },
      icon: <DollarSign className="h-5 w-5" />,
      accentColor: "yellow",
    },
    {
      title: "Partnerships",
      value: "12",
      change: { value: 2, isPositive: false },
      icon: <Briefcase className="h-5 w-5" />,
      accentColor: "red",
    },
  ];

  // Mock activity feed data
  const activityData: ActivityItem[] = [
    {
      id: "1",
      user: "John Smith",
      action: "approved application",
      target: "#AP-1234",
      timestamp: new Date(Date.now() - 30 * 60000),
      status: "success",
    },
    {
      id: "2",
      user: "Jane Doe",
      action: "added new user",
      target: "mark@example.com",
      timestamp: new Date(Date.now() - 120 * 60000),
      status: "info",
    },
    {
      id: "3",
      user: "Michael Johnson",
      action: "rejected application",
      target: "#AP-5678",
      timestamp: new Date(Date.now() - 240 * 60000),
      status: "error",
    },
    {
      id: "4",
      user: "Sarah Williams",
      action: "updated partnership with",
      target: "Acme Corp",
      timestamp: new Date(Date.now() - 10 * 3600000),
      status: "info",
    },
    {
      id: "5",
      user: "David Brown",
      action: "requested additional documents for",
      target: "#AP-9012",
      timestamp: new Date(Date.now() - 24 * 3600000),
      status: "warning",
    },
  ];

  // Mock notification data
  const notificationData: Notification[] = [
    {
      id: "1",
      title: "Applications Awaiting Approval",
      description: "5 applications are pending approval for over 48 hours.",
      type: "approval",
      isRead: false,
      timestamp: new Date(Date.now() - 3 * 3600000),
    },
    {
      id: "2",
      title: "Grant Submission Deadline",
      description: "Federal Housing Grant application due in 3 days.",
      type: "deadline",
      isRead: false,
      timestamp: new Date(Date.now() - 12 * 3600000),
    },
    {
      id: "3",
      title: "System Maintenance",
      description: "Planned downtime on Saturday from 2 AM to 4 AM.",
      type: "info",
      isRead: true,
      timestamp: new Date(Date.now() - 2 * 86400000),
    },
    {
      id: "4",
      title: "Data Backup Failed",
      description: "Last night's automated backup did not complete successfully.",
      type: "alert",
      isRead: false,
      timestamp: new Date(Date.now() - 18 * 3600000),
    },
  ];

  const systemInfoItems = [
    {
      title: "Last Database Backup",
      value: "Yesterday, 2:00 AM",
    },
    {
      title: "Active Users Today",
      value: "24 users",
    },
    {
      title: "System Status",
      value: <span className="text-green-600">All Systems Operational</span>,
    },
  ];

  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Dashboard Overview" 
        description="Monitor key metrics and activity across the platform" 
      />
      
      {/* KPI Cards */}
      <MetricsGrid metrics={kpiData} />

      {/* NEW: Management Sections */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Management Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <ManagementCard 
          title="Donation Management" 
          description="Track donations, donor information, and campaign performance"
          icon={<CircleDollarSign className="w-8 h-8 text-green-600" />}
          path="/donation-management"
        />
        <ManagementCard 
          title="Grant Management" 
          description="Track grant applications, deadlines, and reporting requirements"
          icon={<Award className="w-8 h-8 text-purple-600" />}
          path="/grant-management"
        />
        <ManagementCard 
          title="Volunteer Management" 
          description="Track volunteers, schedules, and hours logged"
          icon={<UserCheck className="w-8 h-8 text-blue-600" />}
          path="/volunteer-management"
        />
        <ManagementCard 
          title="Program Outcomes" 
          description="Measure the impact and outcomes of organization programs"
          icon={<BarChart3 className="w-8 h-8 text-indigo-600" />}
          path="/program-outcomes"
        />
        <ManagementCard 
          title="Budget & Finance" 
          description="Access detailed financial reporting and budget tracking"
          icon={<DollarSign className="w-8 h-8 text-yellow-600" />}
          path="/budget-finance"
        />
        <ManagementCard 
          title="Client Data" 
          description="Track demographics and needs of those being served"
          icon={<Users className="w-8 h-8 text-cyan-600" />}
          path="/client-data"
        />
        <ManagementCard 
          title="Document Management" 
          description="Store and organize important organizational documents"
          icon={<FileBox className="w-8 h-8 text-orange-600" />}
          path="/document-management"
        />
        <ManagementCard 
          title="Calendar" 
          description="View and manage important events, deadlines, and meetings"
          icon={<Calendar className="w-8 h-8 text-rose-600" />}
          path="/admin-calendar"
        />
        <ManagementCard 
          title="Task Management" 
          description="Manage projects and tasks for staff and volunteers"
          icon={<ClipboardList className="w-8 h-8 text-teal-600" />}
          path="/task-management"
        />
      </div>

      {/* Activity and Notifications - PRESERVED EXACTLY AS BEFORE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activityData} className="h-full" />
        </div>
        <div>
          <NotificationsPanel notifications={notificationData} className="h-full" />
        </div>
      </div>

      {/* Performance Metrics - PRESERVED EXACTLY AS BEFORE */}
      <PerformanceMetricsCard />

      {/* System Information - PRESERVED EXACTLY AS BEFORE */}
      <SystemInfoCard infoItems={systemInfoItems} />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
