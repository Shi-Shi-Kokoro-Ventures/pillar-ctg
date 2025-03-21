
import React from "react";
import { Users, ClipboardList, Clock, CheckCircle } from "lucide-react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MetricsGrid from "@/components/admin/MetricsGrid";
import ActivityFeed from "@/components/admin/ActivityFeed";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { KPIMetric } from "@/components/admin/MetricsGrid";
import { ActivityItem } from "@/components/admin/ActivityFeed";

const CaseWorkerDashboard = () => {
  // Case Worker-specific KPI data
  const kpiData: KPIMetric[] = [
    {
      title: "Active Cases",
      value: "8",
      change: { value: 3, isPositive: true },
      icon: <Users className="h-5 w-5" />,
      accentColor: "blue",
    },
    {
      title: "Pending Assessments",
      value: "4",
      change: { value: 1, isPositive: false },
      icon: <ClipboardList className="h-5 w-5" />,
      accentColor: "yellow", // Changed from "amber" to "yellow"
    },
    {
      title: "Follow-ups Today",
      value: "3",
      change: { value: 2, isPositive: false },
      icon: <Clock className="h-5 w-5" />,
      accentColor: "red",
    },
    {
      title: "Completed This Week",
      value: "6",
      change: { value: 2, isPositive: true },
      icon: <CheckCircle className="h-5 w-5" />,
      accentColor: "green",
    },
  ];

  // Case Worker-specific activity feed
  const activityData: ActivityItem[] = [
    {
      id: "1",
      user: "You",
      action: "updated case notes for",
      target: "Client #1234",
      timestamp: new Date(Date.now() - 15 * 60000),
      status: "info",
    },
    {
      id: "2",
      user: "You",
      action: "scheduled follow-up with",
      target: "Family Rodriguez",
      timestamp: new Date(Date.now() - 2 * 3600000),
      status: "success",
    },
    {
      id: "3",
      user: "Manager",
      action: "assigned new case",
      target: "#AP-7890",
      timestamp: new Date(Date.now() - 4 * 3600000),
      status: "info",
    },
    {
      id: "4",
      user: "You",
      action: "submitted housing assessment for",
      target: "Client #5678",
      timestamp: new Date(Date.now() - 1 * 86400000),
      status: "success",
    },
  ];

  const upcomingAppointments = [
    {
      id: "1",
      client: "Maria Johnson",
      time: "Today, 2:00 PM",
      type: "Initial Assessment",
      location: "Office Room 102",
      priority: "high"
    },
    {
      id: "2",
      client: "Robert Garcia",
      time: "Today, 4:30 PM",
      type: "Follow-up Meeting",
      location: "Video Call",
      priority: "medium"
    },
    {
      id: "3",
      client: "Smith Family",
      time: "Tomorrow, 10:00 AM",
      type: "Housing Placement",
      location: "Main Conference Room",
      priority: "medium"
    }
  ];

  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Case Management Dashboard" 
        description="Manage your client cases, appointments, and follow-ups" 
      />
      
      {/* Case Management KPIs */}
      <MetricsGrid metrics={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled appointments for today and tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className={`p-4 rounded-lg border ${
                      appointment.priority === 'high' 
                        ? 'border-l-4 border-l-red-500' 
                        : appointment.priority === 'medium'
                          ? 'border-l-4 border-l-amber-500'
                          : 'border'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.client}</h3>
                        <p className="text-sm text-gray-700">{appointment.type}</p>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        appointment.time.includes('Today') 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.time}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {appointment.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <ActivityFeed activities={activityData} className="h-full" />
        </div>
      </div>

      {/* Quick Access to Resources */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Resources & Quick Actions</CardTitle>
          <CardDescription>Tools and resources to assist your clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center text-center">
              <ClipboardList className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">New Assessment</span>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm font-medium">Client Directory</span>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center text-center">
              <svg className="h-8 w-8 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium">Resource Database</span>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center text-center">
              <svg className="h-8 w-8 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Schedule Follow-up</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
};

export default CaseWorkerDashboard;
