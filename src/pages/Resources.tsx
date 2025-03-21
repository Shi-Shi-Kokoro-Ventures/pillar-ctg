
import React from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Bookmark, Download, ExternalLink } from 'lucide-react';

const Resources = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <Tabs defaultValue="case-resources" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="case-resources">Case Resources</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
          
          <TabsContent value="case-resources">
            <Card>
              <CardHeader>
                <CardTitle>Case Management Resources</CardTitle>
                <CardDescription>Tools and resources to help with your cases.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Client Intake Form", description: "Standard form for collecting initial client information.", type: "Form", category: "Intake" },
                    { title: "Needs Assessment Guide", description: "A comprehensive guide for assessing client needs.", type: "Guide", category: "Assessment" },
                    { title: "Community Resource Directory", description: "List of local community resources for client referrals.", type: "Directory", category: "Referrals" },
                    { title: "Crisis Intervention Protocol", description: "Steps to follow during crisis situations.", type: "Protocol", category: "Crisis" },
                    { title: "Case Notes Templates", description: "Standardized templates for documenting case notes.", type: "Template", category: "Documentation" },
                    { title: "Housing Assistance Checklist", description: "Eligibility and document checklist for housing programs.", type: "Checklist", category: "Housing" },
                  ].map((resource, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{resource.type}</span>
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{resource.category}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex gap-2">
                        <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
                          <Download className="h-3 w-3" /> Download
                        </button>
                        <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                          <Bookmark className="h-3 w-3" /> Save
                        </button>
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
                <CardTitle>Common Forms</CardTitle>
                <CardDescription>Frequently used forms for case management.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Client Intake Form", category: "Intake", updated: "1 week ago" },
                    { name: "Consent for Release of Information", category: "Legal", updated: "2 weeks ago" },
                    { name: "Benefits Application", category: "Assistance", updated: "1 month ago" },
                    { name: "Housing Stability Assessment", category: "Housing", updated: "2 days ago" },
                    { name: "Client Service Plan", category: "Planning", updated: "3 weeks ago" },
                  ].map((form, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{form.name}</p>
                          <p className="text-xs text-gray-500">{form.category} • Updated {form.updated}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
                          <Download className="h-3 w-3" /> Download
                        </button>
                        <button className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" /> Open
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guidelines">
            <Card>
              <CardHeader>
                <CardTitle>Case Management Guidelines</CardTitle>
                <CardDescription>Best practices and standard procedures.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-gray-500">
                  Content for Guidelines tab will be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Resources</CardTitle>
                <CardDescription>Materials for professional development.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-gray-500">
                  Content for Training tab will be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default Resources;
