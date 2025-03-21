
import React from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, UserCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const MyCases = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Cases</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md">
              <Filter className="h-5 w-5 text-gray-700" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              New Case
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Cases</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <UserCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">In Progress</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Requires Attention</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="active">Active Cases</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Cases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Cases</CardTitle>
                <CardDescription>Cases currently being processed.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "C-1042", name: "Jane Doe", type: "Housing Assistance", status: "In Progress", lastUpdate: "2 days ago", priority: "High" },
                    { id: "C-1039", name: "John Smith", type: "Financial Aid", status: "In Progress", lastUpdate: "3 days ago", priority: "Medium" },
                    { id: "C-1036", name: "Maria Garcia", type: "Food Assistance", status: "In Progress", lastUpdate: "1 week ago", priority: "Medium" },
                    { id: "C-1033", name: "Robert Johnson", type: "Job Placement", status: "Pending Review", lastUpdate: "5 days ago", priority: "Low" },
                    { id: "C-1030", name: "Alice Williams", type: "Healthcare Access", status: "Pending Documentation", lastUpdate: "Yesterday", priority: "High" },
                  ].map((caseItem) => (
                    <div key={caseItem.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <UserCircle className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{caseItem.name}</p>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{caseItem.id}</span>
                            {caseItem.priority === "High" && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">High Priority</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{caseItem.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{caseItem.status}</p>
                          <p className="text-xs text-gray-500">Updated {caseItem.lastUpdate}</p>
                        </div>
                        <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Cases</CardTitle>
                <CardDescription>Cases awaiting action or documentation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-gray-500">
                  Content for pending cases will be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Cases</CardTitle>
                <CardDescription>Successfully resolved cases.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-gray-500">
                  Content for completed cases will be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Cases</CardTitle>
                <CardDescription>Complete case history.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-gray-500">
                  All cases will be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default MyCases;
