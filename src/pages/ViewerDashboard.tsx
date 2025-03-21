
import React from "react";
import { FileText, BarChart3, Search, Info } from "lucide-react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MetricsGrid from "@/components/admin/MetricsGrid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { KPIMetric } from "@/components/admin/MetricsGrid";

const ViewerDashboard = () => {
  // Viewer-specific KPI data - focused on reports and viewing only
  const kpiData: KPIMetric[] = [
    {
      title: "Available Reports",
      value: "24",
      change: { value: 3, isPositive: true },
      icon: <FileText className="h-5 w-5" />,
      accentColor: "blue",
    },
    {
      title: "Last Updated",
      value: "Today",
      change: { value: 0, isPositive: true },
      icon: <Info className="h-5 w-5" />,
      accentColor: "green",
    },
    {
      title: "Program Metrics",
      value: "12",
      change: { value: 0, isPositive: true },
      icon: <BarChart3 className="h-5 w-5" />,
      accentColor: "purple",
    },
    {
      title: "Resources",
      value: "48",
      change: { value: 5, isPositive: true },
      icon: <Search className="h-5 w-5" />,
      accentColor: "amber",
    },
  ];

  // Sample report categories for the viewer dashboard
  const reportCategories = [
    {
      title: "Client Demographics",
      description: "Statistical data on client population served",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      count: 5
    },
    {
      title: "Program Outcomes",
      description: "Success metrics and program effectiveness",
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      count: 7
    },
    {
      title: "Resource Utilization",
      description: "Analysis of resources and their usage",
      icon: <PieChart className="h-6 w-6 text-purple-500" />,
      count: 4
    },
    {
      title: "Geographic Distribution",
      description: "Service distribution by region and location",
      icon: <Map className="h-6 w-6 text-amber-500" />,
      count: 3
    }
  ];

  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Reports & Analytics Dashboard" 
        description="Access and review organizational reports and statistics" 
      />
      
      {/* Viewer KPI Cards */}
      <MetricsGrid metrics={kpiData} />

      {/* Reports Categories */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Report Categories</CardTitle>
          <CardDescription>Browse available reports by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportCategories.map((category, index) => (
              <div key={index} className="border rounded-lg p-5 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {category.icon}
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-800">
                    {category.count} reports
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Reports */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Featured Reports</CardTitle>
          <CardDescription>Recently updated and important reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Quarterly Program Effectiveness Summary</h3>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Updated Today</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Comprehensive overview of all program metrics for Q2 2023</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Annual Client Demographics Report</h3>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Most Viewed</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Statistical analysis of client population and service trends</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Resource Allocation & Utilization</h3>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Last Week</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Breakdown of organizational resources and their allocation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
};

// Import the missing icons
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const PieChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const Map = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

export default ViewerDashboard;
