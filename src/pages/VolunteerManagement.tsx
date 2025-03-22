
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Clock, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const VolunteerManagement = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Volunteer Management" 
        description="Track volunteers, schedules, and hours logged" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              Active Volunteers
            </CardTitle>
            <CardDescription>Currently active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <div className="text-sm text-blue-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4" /> 
              <span>12 new volunteers this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Hours Logged
            </CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,245</div>
            <div className="text-sm text-green-600 mt-1">
              15% increase from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Upcoming Shifts
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48</div>
            <div className="text-sm text-purple-600 mt-1">
              8 shifts need additional volunteers
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Volunteer Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Volunteer Directory</CardTitle>
            <CardDescription>
              Search and manage volunteer profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the volunteer directory interface</p>
              <Button>View All Volunteers</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Schedule Management</CardTitle>
            <CardDescription>
              Manage shifts and volunteer assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the scheduling interface</p>
              <Button>Manage Schedule</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Hours Tracking</CardTitle>
            <CardDescription>
              Review and approve volunteer hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the hours tracking interface</p>
              <Button>View Hours Log</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default VolunteerManagement;
