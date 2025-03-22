
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskManagement = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Task Management" 
        description="Manage projects and tasks for staff and volunteers" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-teal-600" />
              Active Tasks
            </CardTitle>
            <CardDescription>Currently assigned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <div className="text-sm text-teal-600 mt-1">
              Across 8 active projects
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
            <div className="text-sm text-green-600 mt-1">
              92% completion rate
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Overdue
            </CardTitle>
            <CardDescription>Past deadline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="text-sm text-red-600 mt-1">
              3 high priority tasks
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Task Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Task Board</CardTitle>
            <CardDescription>
              View and manage all tasks by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the task board interface</p>
              <Button>View All Tasks</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Management</CardTitle>
            <CardDescription>
              Track projects and milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the project management interface</p>
              <Button>Manage Projects</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Assignment</CardTitle>
            <CardDescription>
              Assign and delegate tasks to team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the task assignment interface</p>
              <Button>Assign Tasks</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default TaskManagement;
