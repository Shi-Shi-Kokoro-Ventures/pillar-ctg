import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBox, FileText, Clock, Upload, X, FileUp, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DocumentManagement = () => {
  // State for managing the visibility of different dialogs
  const [browseDialogOpen, setBrowseDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handler for file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handler for file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      // Here you would typically handle the actual file upload to a server
      // For now, we'll just show a success message
      toast.success(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);
      setUploadDialogOpen(false);
    }
  };

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
              <Button onClick={() => setBrowseDialogOpen(true)}>Browse Documents</Button>
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
              <Button onClick={() => setUploadDialogOpen(true)}>Upload New</Button>
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
              <Button onClick={() => setTemplatesDialogOpen(true)}>View Templates</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Browse Documents Dialog */}
      <Dialog open={browseDialogOpen} onOpenChange={setBrowseDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border shadow-lg"> {/* Removed glassmorphism, added solid background */}
          <DialogHeader>
            <DialogTitle>Document Library</DialogTitle>
            <DialogDescription>
              Browse and search through all organizational documents.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="Search documents..." className="flex-1" />
              <Button variant="outline">Search</Button>
            </div>
            
            <div className="border rounded-md p-4 text-center bg-gray-50">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No documents match your search criteria</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBrowseDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Document Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border shadow-lg"> {/* Removed glassmorphism, added solid background */}
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Add a new document to the organization's repository.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document-title">Document Title</Label>
              <Input id="document-title" placeholder="Enter document title" />
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document-category">Category</Label>
              <select 
                id="document-category" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                <option value="policies">Policies</option>
                <option value="forms">Forms</option>
                <option value="reports">Reports</option>
                <option value="manuals">Manuals</option>
              </select>
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document-file">File</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50" onClick={() => document.getElementById('document-file')?.click()}>
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileUp className="h-6 w-6 text-green-600" />
                    <span className="text-green-600 font-medium">{selectedFile.name}</span>
                  </div>
                ) : (
                  <div>
                    <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to select a file or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOCX, or XLSX (max 10MB)</p>
                  </div>
                )}
                <input
                  id="document-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.docx,.xlsx"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleFileUpload} disabled={!selectedFile}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Templates Dialog */}
      <Dialog open={templatesDialogOpen} onOpenChange={setTemplatesDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border shadow-lg"> {/* Removed glassmorphism, added solid background */}
          <DialogHeader>
            <DialogTitle>Document Templates</DialogTitle>
            <DialogDescription>
              Access and download organizational document templates.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="Search templates..." className="flex-1" />
              <Button variant="outline">Search</Button>
            </div>
            
            <div className="space-y-2">
              {[
                { id: 1, name: "Expense Report", type: "XLSX" },
                { id: 2, name: "Client Intake Form", type: "DOCX" },
                { id: 3, name: "Meeting Minutes", type: "DOCX" },
                { id: 4, name: "Project Proposal", type: "DOCX" }
              ].map(template => (
                <div key={template.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FilePlus className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.type}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      toast.success(`Template "${template.name}" downloaded successfully!`);
                    }}
                  >
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplatesDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default DocumentManagement;
