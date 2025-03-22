
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PieChart, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientData = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Client Data" 
        description="Track demographics and needs of those being served" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-600" />
              Total Clients
            </CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4,572</div>
            <div className="text-sm text-cyan-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4" /> 
              <span>16% increase from last year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              Service Distribution
            </CardTitle>
            <CardDescription>By program type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8 types</div>
            <div className="text-sm text-purple-600 mt-1">
              Housing assistance is most requested
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Geographic Reach
            </CardTitle>
            <CardDescription>Service areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12 counties</div>
            <div className="text-sm text-red-600 mt-1">
              3 new service areas this year
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Client Data Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Client Demographics</CardTitle>
            <CardDescription>
              Review demographic breakdown of clients served
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the demographic visualization dashboard</p>
              <Button>View Demographics</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Service Analytics</CardTitle>
            <CardDescription>
              Track services provided and client needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the service analytics interface</p>
              <Button>View Analytics</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Client Directory</CardTitle>
            <CardDescription>
              Search and manage client profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the client directory interface</p>
              <Button>Access Directory</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default ClientData;
