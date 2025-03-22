
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PieChart, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const BudgetFinance = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Budget & Finance" 
        description="Access detailed financial reporting and budget tracking" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              Total Budget
            </CardTitle>
            <CardDescription>Annual budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2.4M</div>
            <div className="text-sm text-yellow-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4" /> 
              <span>12% increase from last year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Budget Utilization
            </CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">67%</div>
            <div className="text-sm text-blue-600 mt-1">
              On track with projections
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Budget Exceptions
            </CardTitle>
            <CardDescription>Current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-orange-600 flex items-center gap-1 mt-1">
              <TrendingDown className="h-4 w-4" /> 
              <span>Down from 5 last period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Finance Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Financial Dashboard</CardTitle>
            <CardDescription>
              Track financial performance across all departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the financial dashboard</p>
              <Button>View Full Dashboard</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Budget Management</CardTitle>
            <CardDescription>
              Review and adjust departmental budgets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the budget management interface</p>
              <Button>Manage Budgets</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>
              Generate financial statements and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the financial reporting interface</p>
              <Button>Generate Reports</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default BudgetFinance;
