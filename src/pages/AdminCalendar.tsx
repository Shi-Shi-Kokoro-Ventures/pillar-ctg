
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminCalendar = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Calendar" 
        description="View and manage important events, deadlines, and meetings" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-rose-600" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <div className="text-sm text-rose-600 mt-1">
              3 with required attendance
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              Approaching Deadlines
            </CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-yellow-600 mt-1">
              4 high priority deadlines
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Today's Schedule
            </CardTitle>
            <CardDescription>For today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4 events</div>
            <div className="text-sm text-blue-600 mt-1">
              Next: Board meeting at 2:00 PM
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Calendar Interface */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Calendar</CardTitle>
            <CardDescription>
              View and manage all scheduled events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the calendar interface</p>
              <Button>View Full Calendar</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Meeting</CardTitle>
              <CardDescription>
                Create and schedule new meetings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">This is a placeholder for the meeting scheduling interface</p>
                <Button>Schedule New</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Availability Management</CardTitle>
              <CardDescription>
                Manage team availability and scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">This is a placeholder for the availability management interface</p>
                <Button>Manage Availability</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCalendar;
