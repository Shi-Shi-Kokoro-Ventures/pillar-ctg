
import React from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, UsersRound, Users } from 'lucide-react';

const TeamManagement = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <RoleGuard allowedRoles={['admin', 'manager']}>
            <div className="flex items-center gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Add Team Member
              </button>
            </div>
          </RoleGuard>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="structure">Team Structure</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>View and manage your team members.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <UsersRound className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">Team Member {index + 1}</p>
                            <p className="text-sm text-gray-500">Case Worker</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">Active Cases: {Math.floor(Math.random() * 10) + 1}</p>
                          <div className="mt-2 flex gap-2">
                            <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">View Details</button>
                            <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">Manage</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="structure">
            <Card>
              <CardHeader>
                <CardTitle>Team Structure</CardTitle>
                <CardDescription>View and manage your team's organizational structure.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-center text-gray-500">Team structure visualization will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>View metrics and KPIs for your team.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <p className="text-sm text-gray-500">Total Cases Handled</p>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-xs text-green-600">↑ 12% from last month</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <p className="text-sm text-gray-500">Avg. Resolution Time</p>
                    <p className="text-2xl font-bold">8.3 days</p>
                    <p className="text-xs text-green-600">↓ 2.1 days from last month</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <p className="text-sm text-gray-500">Client Satisfaction</p>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-xs text-green-600">↑ 3% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default TeamManagement;
