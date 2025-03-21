
import React from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FolderArchive, Bookmark, Download } from 'lucide-react';

const DepartmentResources = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Department Resources</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Upload Resource
          </button>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Department Documents</CardTitle>
                <CardDescription>Access key documents for your department.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Department Handbook", type: "PDF", size: "2.4 MB", updated: "2 weeks ago" },
                    { name: "Emergency Procedures", type: "PDF", size: "1.8 MB", updated: "1 month ago" },
                    { name: "Staff Directory", type: "XLSX", size: "680 KB", updated: "1 week ago" },
                    { name: "Resource Allocation Guide", type: "DOCX", size: "1.2 MB", updated: "3 days ago" },
                    { name: "Budget Templates", type: "XLSX", size: "950 KB", updated: "2 months ago" },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Updated {doc.updated}</span>
                        <button className="p-1 rounded hover:bg-gray-200">
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200">
                          <Bookmark className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Materials</CardTitle>
                <CardDescription>Access training resources for your team.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["New Employee Onboarding", "Case Management System", "Client Interview Techniques", "Crisis Intervention", "Documentation Best Practices"].map((training, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <FolderArchive className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="font-medium">{training}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Training materials and resources for {training.toLowerCase()}.</p>
                      <div className="flex gap-2">
                        <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded">View Materials</button>
                        <button className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded">Start Training</button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Department Forms</CardTitle>
                <CardDescription>Access and download department forms.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Content for Forms tab will be added soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle>Department Policies</CardTitle>
                <CardDescription>Review department policies and procedures.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Content for Policies tab will be added soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default DepartmentResources;
