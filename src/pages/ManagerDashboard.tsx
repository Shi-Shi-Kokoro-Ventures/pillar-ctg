
import React from "react";
import { BarChart3, Users, Briefcase, Calendar } from "lucide-react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MetricsGrid from "@/components/admin/MetricsGrid";
import ActivityFeed from "@/components/admin/ActivityFeed";
import PerformanceMetricsCard from "@/components/admin/PerformanceMetricsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { KPIMetric } from "@/components/admin/MetricsGrid";
import { ActivityItem } from "@/components/admin/ActivityFeed";

const ManagerDashboard = () => {
  // Manager-specific KPI data
  const kpiData: KPIMetric[] = [
    {
      title: "Department Applications",
      value: "42",
      change: { value: 8, isPositive: true },
      icon: <Briefcase className="h-5 w-5" />,
      accentColor: "blue",
    },
    {
      title: "Team Members",
      value: "12",
      change: { value: 2, isPositive: true },
      icon: <Users className="h-5 w-5" />,
      accentColor: "green",
    },
    {
      title: "Pending Approvals",
      value: "7",
      change: { value: 3, isPositive: false },
      icon: <Calendar className="h-5 w-5" />,
      accentColor: "yellow",
    },
    {
      title: "Department Performance",
      value: "94%",
      change: { value: 2, isPositive: true },
      icon: <BarChart3 className="h-5 w-5" />,
      accentColor: "purple",
    },
  ];

  // Manager-specific activity feed
  const activityData: ActivityItem[] = [
    {
      id: "1",
      user: "Alex Johnson",
      action: "added a new case worker",
      target: "Sarah Thomas",
      timestamp: new Date(Date.now() - 45 * 60000),
      status: "success",
    },
    {
      id: "2",
      user: "Maria Garcia",
      action: "requested approval for",
      target: "Housing Application #2234",
      timestamp: new Date(Date.now() - 3 * 3600000),
      status: "info",
    },
    {
      id: "3",
      user: "Robert Smith",
      action: "updated department guidelines for",
      target: "Rental Assistance Program",
      timestamp: new Date(Date.now() - 8 * 3600000),
      status: "info",
    },
    {
      id: "4",
      user: "You",
      action: "approved application",
      target: "#AP-5678",
      timestamp: new Date(Date.now() - 1 * 86400000),
      status: "success",
    },
  ];

  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Department Management Dashboard" 
        description="Manage your department's resources, team members, and applications" 
      />
      
      {/* Department KPI Cards */}
      <MetricsGrid metrics={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activityData} className="h-full" />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-amber-600 font-medium">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  Review 3 resource allocation requests
                </li>
                <li className="flex items-center gap-2 text-red-600 font-medium">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Approve staff time-off request (Urgent)
                </li>
                <li className="flex items-center gap-2 text-blue-600 font-medium">
                  <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                  Schedule monthly team meeting
                </li>
                <li className="flex items-center gap-2 text-blue-600 font-medium">
                  <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                  Complete quarterly department report
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Department Analytics */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Tracking key department metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceMetricsCard />
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
};

export default ManagerDashboard;
