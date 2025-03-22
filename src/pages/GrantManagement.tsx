
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const GrantManagement = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Grant Management" 
        description="Track grant applications, deadlines, and reporting requirements" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Active Grants
            </CardTitle>
            <CardDescription>Currently active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-purple-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4" /> 
              <span>3 new grants this year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Pending Applications
            </CardTitle>
            <CardDescription>In progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <div className="text-sm text-blue-600 mt-1">
              2 with upcoming deadlines
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-600" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="text-sm text-red-600 mt-1">
              Closest deadline in 8 days
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Grant Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Active Grants</CardTitle>
            <CardDescription>
              Track current grants and their requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the active grants interface</p>
              <Button>View All Grants</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grant Applications</CardTitle>
            <CardDescription>
              Manage pending and draft applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the grant applications interface</p>
              <Button>Manage Applications</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grant Reports</CardTitle>
            <CardDescription>
              Track reporting requirements and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the grant reporting interface</p>
              <Button>View Reports</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default GrantManagement;
