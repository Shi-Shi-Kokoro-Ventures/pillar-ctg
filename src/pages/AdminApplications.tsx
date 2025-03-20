
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminApplications = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Management</h1>
            <p className="text-gray-600">
              View and manage all assistance applications
            </p>
          </header>

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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminApplications;
