
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Users, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const DonationManagement = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Donation Management" 
        description="Track donations, manage donor information, and monitor campaign performance" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-green-600" />
              Total Donations
            </CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$248,500</div>
            <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4" /> 
              <span>15% increase from last year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Active Donors
            </CardTitle>
            <CardDescription>Total count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,245</div>
            <div className="text-sm text-blue-600 mt-1">
              78 new donors this month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Upcoming Campaigns
            </CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <div className="text-sm text-purple-600 mt-1">
              Next campaign starts in 5 days
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Donation Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>
              Track recent donations and donor information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the donation tracking interface</p>
              <Button>View All Donations</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Donor Management</CardTitle>
            <CardDescription>
              Manage donor profiles and communication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the donor management interface</p>
              <Button>Manage Donors</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Track campaign metrics and outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the campaign analytics interface</p>
              <Button>View Analytics</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default DonationManagement;
