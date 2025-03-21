
import React from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, FileText, Folder, Download, Eye, Share2 } from 'lucide-react';

const Documents = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md">
              <Filter className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Document categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:border-blue-300 cursor-pointer transition-colors">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Folder className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Reports</p>
                  <p className="text-sm text-gray-500">12 documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-green-300 cursor-pointer transition-colors">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Folder className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Policies</p>
                  <p className="text-sm text-gray-500">8 documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-purple-300 cursor-pointer transition-colors">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Folder className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Templates</p>
                  <p className="text-sm text-gray-500">15 documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-orange-300 cursor-pointer transition-colors">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Folder className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Forms</p>
                  <p className="text-sm text-gray-500">10 documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Recently updated and viewed documents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Quarterly Performance Report.pdf", category: "Reports", size: "1.2 MB", updated: "Yesterday", type: "PDF" },
                { name: "Client Information Policy.docx", category: "Policies", size: "350 KB", updated: "2 days ago", type: "DOCX" },
                { name: "Service Delivery Template.docx", category: "Templates", size: "425 KB", updated: "1 week ago", type: "DOCX" },
                { name: "Budget Overview Q1 2023.xlsx", category: "Reports", size: "780 KB", updated: "3 days ago", type: "XLSX" },
                { name: "New Employee Onboarding Checklist.pdf", category: "Forms", size: "520 KB", updated: "5 days ago", type: "PDF" },
                { name: "Department Meeting Minutes - March.docx", category: "Reports", size: "290 KB", updated: "Yesterday", type: "DOCX" },
                { name: "Emergency Response Protocol.pdf", category: "Policies", size: "1.5 MB", updated: "2 weeks ago", type: "PDF" },
                { name: "Client Satisfaction Survey.pdf", category: "Forms", size: "480 KB", updated: "1 day ago", type: "PDF" },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      doc.type === 'PDF' ? 'bg-red-100' : 
                      doc.type === 'DOCX' ? 'bg-blue-100' : 
                      doc.type === 'XLSX' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <FileText className={`h-5 w-5 ${
                        doc.type === 'PDF' ? 'text-red-600' : 
                        doc.type === 'DOCX' ? 'text-blue-600' : 
                        doc.type === 'XLSX' ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{doc.category}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{doc.size}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">Updated {doc.updated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded hover:bg-gray-200" title="View">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200" title="Download">
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200" title="Share">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default Documents;
