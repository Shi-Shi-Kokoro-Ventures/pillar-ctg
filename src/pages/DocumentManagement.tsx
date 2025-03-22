
import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBox, FileText, Clock, Upload, X, FileUp, FilePlus, Filter, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DocumentStats, Document, DocumentTemplate, DocumentSearchParams } from "@/types/documents";
import { secureSupabaseOperation } from "@/integrations/supabase/securityUtils";

const DocumentManagement = () => {
  // State for managing the visibility of different dialogs
  const [browseDialogOpen, setBrowseDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Document states
  const [documents, setDocuments] = useState<Document[]>([]);
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<DocumentSearchParams>({
    query: '',
    sortBy: 'date',
    sortDirection: 'desc'
  });
  const [documentStats, setDocumentStats] = useState<DocumentStats>({
    total: 1248,
    categories: 24,
    recentUploads: 87,
    awaitingReview: 18,
    needsUpdate: 35,
    critical: 12
  });

  // Form states for document upload
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentCategory, setDocumentCategory] = useState('');

  // Fetch documents (placeholder for actual API call)
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // This would be replaced with an actual API call to fetch documents
        // const response = await supabaseClient.from('documents').select('*');
        // setDocuments(response.data || []);
        
        // For now, we're using mock data
        setTimeout(() => {
          setDocuments([]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast.error('Failed to load documents');
        setIsLoading(false);
      }
    };

    // Fetch templates
    const fetchTemplates = async () => {
      try {
        // Mock data for templates
        setTemplates([
          { 
            id: '1', 
            name: 'Expense Report', 
            fileType: 'XLSX', 
            createdDate: new Date('2023-05-15'),
            version: 1,
            downloadUrl: '/templates/expense-report.xlsx' 
          },
          { 
            id: '2', 
            name: 'Client Intake Form', 
            fileType: 'DOCX', 
            createdDate: new Date('2023-06-22'),
            version: 2,
            downloadUrl: '/templates/client-intake.docx' 
          },
          { 
            id: '3', 
            name: 'Meeting Minutes', 
            fileType: 'DOCX', 
            createdDate: new Date('2023-07-10'),
            version: 1,
            downloadUrl: '/templates/meeting-minutes.docx' 
          },
          { 
            id: '4', 
            name: 'Project Proposal', 
            fileType: 'DOCX', 
            createdDate: new Date('2023-08-05'),
            version: 3,
            downloadUrl: '/templates/project-proposal.docx' 
          }
        ]);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
      }
    };
    
    if (browseDialogOpen) {
      fetchDocuments();
    }
    
    if (templatesDialogOpen) {
      fetchTemplates();
    }
  }, [browseDialogOpen, templatesDialogOpen]);

  // Handler for file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handler for document search
  const handleSearch = (query: string) => {
    setSearchParams({
      ...searchParams,
      query
    });
    // This would trigger a refetch with the updated search params in a real app
  };

  // Handler for file upload
  const handleFileUpload = async () => {
    if (!selectedFile || !documentTitle || !documentCategory) {
      toast.error('Please complete all required fields');
      return;
    }

    try {
      setIsLoading(true);
      
      // This is where we would call a secure operation to upload the file
      // For now, we'll simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);
      setDocumentTitle('');
      setDocumentCategory('');
      setUploadDialogOpen(false);
      
      // Update the document stats to reflect the new upload
      setDocumentStats({
        ...documentStats,
        total: documentStats.total + 1,
        recentUploads: documentStats.recentUploads + 1
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for template download
  const handleTemplateDownload = (template: DocumentTemplate) => {
    // In a real application, we would trigger a download here
    // For now, we'll just show a success message
    toast.success(`Template "${template.name}" downloaded successfully!`);
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
            <div className="text-3xl font-bold">{documentStats.total.toLocaleString()}</div>
            <div className="text-sm text-orange-600 mt-1">
              Across {documentStats.categories} categories
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
            <div className="text-3xl font-bold">{documentStats.recentUploads}</div>
            <div className="text-sm text-green-600 mt-1">
              {documentStats.awaitingReview} awaiting review
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
            <div className="text-3xl font-bold">{documentStats.needsUpdate}</div>
            <div className="text-sm text-blue-600 mt-1">
              {documentStats.critical} critical documents need updates
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
              <p className="text-gray-500 mb-4">Access your organization's document repository</p>
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
              <p className="text-gray-500 mb-4">Upload new documents to your organization's repository</p>
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
              <p className="text-gray-500 mb-4">Download and use standardized document templates</p>
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
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search documents..." 
                  className="pl-8" 
                  value={searchParams.query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="border rounded-md p-8 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : documents.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-xs text-gray-500">{doc.category.name} • {doc.fileType}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast.success(`Opened document "${doc.title}"`)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-4 text-center bg-gray-50">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No documents match your search criteria</p>
              </div>
            )}
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
              <Input 
                id="document-title" 
                placeholder="Enter document title" 
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
              />
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document-category">Category</Label>
              <select 
                id="document-category" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={documentCategory}
                onChange={(e) => setDocumentCategory(e.target.value)}
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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
            <Button 
              variant="outline" 
              onClick={() => {
                setUploadDialogOpen(false);
                setSelectedFile(null);
                setDocumentTitle('');
                setDocumentCategory('');
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleFileUpload} 
              disabled={!selectedFile || !documentTitle || !documentCategory || isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </Button>
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
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search templates..." className="pl-8" />
              </div>
              <Button variant="outline">Search</Button>
            </div>
            
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {templates.map(template => (
                <div key={template.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FilePlus className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-xs text-gray-500">
                        {template.fileType} • v{template.version} • 
                        {template.createdDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleTemplateDownload(template)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
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
