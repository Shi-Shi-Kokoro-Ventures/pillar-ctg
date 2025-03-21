
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart, LineChart, BookOpen } from "lucide-react";

const AdminReports = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Reports & Analytics" 
        description="View and analyze key metrics across the organization" 
      />

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Financial</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Services</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Custom Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Applications Processed</CardTitle>
                <CardDescription>Monthly application processing trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center p-6 bg-gray-50 rounded-lg w-full">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Chart Visualization</h3>
                  <p className="text-gray-500 text-sm">
                    Interactive charts will be displayed here showing applications processed by month and status.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>User engagement and activity metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center p-6 bg-gray-50 rounded-lg w-full">
                  <LineChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Chart Visualization</h3>
                  <p className="text-gray-500 text-sm">
                    Interactive charts will be displayed here showing user activity trends over time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Revenue, expenses, and financial metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center p-6 bg-gray-50 rounded-lg w-full">
                <LineChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Financial Metrics</h3>
                <p className="text-gray-500 text-sm">
                  Financial reports and visualizations will be displayed here showing revenue, expenses, 
                  donations, and other financial metrics over time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Analysis</CardTitle>
              <CardDescription>Analysis of services provided and their impact</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center p-6 bg-gray-50 rounded-lg w-full">
                <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Services Breakdown</h3>
                <p className="text-gray-500 text-sm">
                  Service analytics will be displayed here showing distribution of services provided, 
                  client outcomes, and impact metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create customized reports for specific needs</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center p-6 bg-gray-50 rounded-lg w-full">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Report Builder</h3>
                <p className="text-gray-500 text-sm">
                  Custom report builder interface will be displayed here allowing users to select metrics, 
                  date ranges, and visualization types to create customized reports.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminDashboardLayout>
  );
};

export default AdminReports;
