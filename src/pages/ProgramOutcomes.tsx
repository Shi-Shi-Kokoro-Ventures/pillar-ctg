
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Target, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProgramOutcomes = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Program Outcomes" 
        description="Measure the impact and outcomes of organization programs" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Active Programs
            </CardTitle>
            <CardDescription>Currently running</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14</div>
            <div className="text-sm text-indigo-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4" /> 
              <span>2 new programs this year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Participants
            </CardTitle>
            <CardDescription>Total across all programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,748</div>
            <div className="text-sm text-blue-600 mt-1">
              15% increase from last year
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Goals Achieved
            </CardTitle>
            <CardDescription>This quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <div className="text-sm text-green-600 mt-1">
              +12% from previous quarter
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Program Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Program Performance</CardTitle>
            <CardDescription>
              Track key metrics across all programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the program performance dashboard</p>
              <Button>View All Programs</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Outcome Measurement</CardTitle>
            <CardDescription>
              Measure and analyze program impacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the outcome measurement interface</p>
              <Button>View Metrics</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Impact Reporting</CardTitle>
            <CardDescription>
              Generate impact reports for stakeholders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the impact reporting interface</p>
              <Button>Generate Reports</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default ProgramOutcomes;
