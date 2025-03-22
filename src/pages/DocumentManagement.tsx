
import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBox, FileText, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentManagement = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Document Management" 
        description="Store and organize important organizational documents" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileBox className="h-5 w-5 text-orange-600" />
              Total Documents
            </CardTitle>
            <CardDescription>In system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <div className="text-sm text-orange-600 mt-1">
              Across 24 categories
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Upload className="h-5 w-5 text-green-600" />
              Recent Uploads
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
            <div className="text-sm text-green-600 mt-1">
              18 awaiting review
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Document Aging
            </CardTitle>
            <CardDescription>Requiring updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">35</div>
            <div className="text-sm text-blue-600 mt-1">
              12 critical documents need updates
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Document Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>
              Browse all organizational documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the document library interface</p>
              <Button>Browse Documents</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Add new documents to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the document upload interface</p>
              <Button>Upload New</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Templates</CardTitle>
            <CardDescription>
              Access and manage organizational templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the templates repository</p>
              <Button>View Templates</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default DocumentManagement;
