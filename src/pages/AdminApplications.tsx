
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";

const AdminApplications = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Application Management" 
        description="View and manage all assistance applications" 
      />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Application Overview</CardTitle>
          <CardDescription>
            Manage and review pending and processed applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-gray-500 mb-4">Application data will be displayed here</p>
            <p className="text-sm text-gray-400">
              This page is under development. Check back soon for full functionality.
            </p>
          </div>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
};

export default AdminApplications;
