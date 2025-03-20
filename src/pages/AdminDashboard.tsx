
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, DollarSign, Briefcase, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import KPICard from "@/components/admin/KPICard";
import ActivityFeed from "@/components/admin/ActivityFeed";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import { ActivityItem } from "@/components/admin/ActivityFeed";
import { Notification } from "@/components/admin/NotificationsPanel";

const AdminDashboard = () => {
  // Mock KPI data for the dashboard
  const kpiData = [
    {
      title: "Total Applications",
      value: "156",
      change: { value: 12, isPositive: true },
      icon: <FileText className="h-5 w-5" />,
      accentColor: "blue" as const,
    },
    {
      title: "Active Cases",
      value: "38",
      change: { value: 5, isPositive: true },
      icon: <Users className="h-5 w-5" />,
      accentColor: "green" as const,
    },
    {
      title: "Donations This Month",
      value: "$24,500",
      change: { value: 8, isPositive: true },
      icon: <DollarSign className="h-5 w-5" />,
      accentColor: "yellow" as const,
    },
    {
      title: "Partnerships",
      value: "12",
      change: { value: 2, isPositive: false },
      icon: <Briefcase className="h-5 w-5" />,
      accentColor: "red" as const,
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

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">
              Monitor key metrics and activity across the platform
            </p>
          </header>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                icon={kpi.icon}
                accentColor={kpi.accentColor}
              />
            ))}
          </div>

          {/* Activity and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <ActivityFeed activities={activityData} className="h-full" />
            </div>
            <div>
              <NotificationsPanel notifications={notificationData} className="h-full" />
            </div>
          </div>

          {/* Quick Stats / Secondary Metrics */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Performance Metrics</h3>
              <select className="border border-gray-300 rounded-md p-2 text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-gray-500 text-center">Interactive charts will be implemented here</p>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Last Database Backup</h4>
                <p className="text-lg font-semibold">Yesterday, 2:00 AM</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Active Users Today</h4>
                <p className="text-lg font-semibold">24 users</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">System Status</h4>
                <p className="text-lg font-semibold text-green-600">All Systems Operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
