
import React, { useState, useEffect } from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, FileText, Folder, Download, Eye, Share2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Document, 
  DocumentCategory, 
  DOCUMENT_CATEGORIES, 
  DocumentSearchParams,
  getFileTypeColor,
  formatFileSize
} from '@/types/documents';
import { toast } from 'sonner';

const Documents = () => {
  // State for documents and search
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<DocumentCategory[]>(DOCUMENT_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<DocumentSearchParams>({
    query: '',
    sortBy: 'date',
    sortDirection: 'desc'
  });

  // Mock document data - would be replaced by API call
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockDocuments: Document[] = [
          {
            id: '1',
            title: 'Quarterly Performance Report',
            category: categories[0],
            fileName: 'quarterly_report_q1_2023.pdf',
            fileSize: 1.2 * 1024 * 1024, // 1.2 MB
            fileType: 'PDF',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            uploadedBy: 'John Smith',
            status: 'active',
            tags: ['quarterly', 'finance', 'performance']
          },
          {
            id: '2',
            title: 'Client Information Policy',
            category: categories[1],
            fileName: 'client_information_policy.docx',
            fileSize: 350 * 1024, // 350 KB
            fileType: 'DOCX',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 2)),
            uploadedBy: 'Maria Johnson',
            status: 'active',
            tags: ['policy', 'client', 'confidentiality']
          },
          {
            id: '3',
            title: 'Service Delivery Template',
            category: categories[2],
            fileName: 'service_delivery_template.docx',
            fileSize: 425 * 1024, // 425 KB
            fileType: 'DOCX',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 7)),
            uploadedBy: 'David Wong',
            status: 'active',
            tags: ['template', 'service']
          },
          {
            id: '4',
            title: 'Budget Overview Q1 2023',
            category: categories[0],
            fileName: 'budget_q1_2023.xlsx',
            fileSize: 780 * 1024, // 780 KB
            fileType: 'XLSX',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 3)),
            uploadedBy: 'Sarah Miller',
            status: 'active',
            tags: ['budget', 'finance', 'quarterly']
          },
          {
            id: '5',
            title: 'New Employee Onboarding Checklist',
            category: categories[3],
            fileName: 'employee_onboarding.pdf',
            fileSize: 520 * 1024, // 520 KB
            fileType: 'PDF',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 5)),
            uploadedBy: 'Alex Chen',
            status: 'active',
            tags: ['hr', 'onboarding', 'checklist']
          },
          {
            id: '6',
            title: 'Department Meeting Minutes - March',
            category: categories[0],
            fileName: 'dept_meeting_march.docx',
            fileSize: 290 * 1024, // 290 KB
            fileType: 'DOCX',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            uploadedBy: 'Patricia Adams',
            status: 'active',
            tags: ['meeting', 'minutes']
          },
          {
            id: '7',
            title: 'Emergency Response Protocol',
            category: categories[1],
            fileName: 'emergency_protocol.pdf',
            fileSize: 1.5 * 1024 * 1024, // 1.5 MB
            fileType: 'PDF',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 14)),
            uploadedBy: 'Robert Johnson',
            status: 'active',
            tags: ['emergency', 'protocol', 'safety']
          },
          {
            id: '8',
            title: 'Client Satisfaction Survey',
            category: categories[3],
            fileName: 'satisfaction_survey.pdf',
            fileSize: 480 * 1024, // 480 KB
            fileType: 'PDF',
            uploadDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            uploadedBy: 'Lisa Wang',
            status: 'active',
            tags: ['survey', 'client', 'feedback']
          },
        ];
        
        setDocuments(mockDocuments);
        setFilteredDocuments(mockDocuments);
        
        // Update category counts
        const updatedCategories = [...categories];
        mockDocuments.forEach(doc => {
          const catIndex = updatedCategories.findIndex(cat => cat.id === doc.category.id);
          if (catIndex !== -1) {
            if (!updatedCategories[catIndex].count) updatedCategories[catIndex].count = 0;
            updatedCategories[catIndex].count = (updatedCategories[catIndex].count || 0) + 1;
          }
        });
        setCategories(updatedCategories);
        
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocuments();
  }, []);
  
  // Filter documents based on search params
  useEffect(() => {
    if (!documents.length) return;
    
    let filtered = [...documents];
    
    // Filter by search query
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) || 
        doc.fileName.toLowerCase().includes(query) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        doc.category.name.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (searchParams.category) {
      filtered = filtered.filter(doc => doc.category.id === searchParams.category);
    }
    
    // Sort documents
    if (searchParams.sortBy) {
      filtered.sort((a, b) => {
        switch (searchParams.sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'date':
            return a.uploadDate.getTime() - b.uploadDate.getTime();
          case 'size':
            return a.fileSize - b.fileSize;
          case 'category':
            return a.category.name.localeCompare(b.category.name);
          default:
            return 0;
        }
      });
      
      if (searchParams.sortDirection === 'desc') {
        filtered.reverse();
      }
    }
    
    setFilteredDocuments(filtered);
  }, [documents, searchParams]);
  
  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      query: e.target.value
    });
  };
  
  // Category filter handler
  const handleCategoryFilter = (categoryId: string | null) => {
    setSearchParams({
      ...searchParams,
      category: categoryId || undefined
    });
  };
  
  // Document action handlers
  const handleViewDocument = (doc: Document) => {
    // In a real app, this would open the document
    toast.success(`Viewing document: ${doc.title}`);
  };
  
  const handleDownloadDocument = (doc: Document) => {
    // In a real app, this would download the document
    toast.success(`Downloading document: ${doc.title}`);
  };
  
  const handleShareDocument = (doc: Document) => {
    // In a real app, this would show sharing options
    toast.success(`Sharing document: ${doc.title}`);
  };
  
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2"
                value={searchParams.query}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Document categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`hover:border-${category.color || 'blue'}-300 cursor-pointer transition-colors`}
              onClick={() => handleCategoryFilter(
                searchParams.category === category.id ? null : category.id
              )}
            >
              <CardContent className="pt-6 pb-4">
                <div className="flex items-center gap-4">
                  <div className={`bg-${category.color || 'blue'}-100 p-3 rounded-lg`}>
                    <Folder className={`h-6 w-6 text-${category.color || 'blue'}-600`} />
                  </div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500">
                      {category.count || 0} document{(category.count !== 1) ? 's' : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Error state */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading state */}
        {isLoading ? (
          <Card>
            <CardContent className="p-8">
              <div className="flex justify-center items-center">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  <div className="h-4 w-64 bg-gray-200 rounded"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {searchParams.category 
                  ? `${categories.find(c => c.id === searchParams.category)?.name} Documents` 
                  : searchParams.query 
                    ? 'Search Results' 
                    : 'Recent Documents'
                }
              </CardTitle>
              <CardDescription>
                {searchParams.category 
                  ? `Viewing documents in the ${categories.find(c => c.id === searchParams.category)?.name} category` 
                  : searchParams.query 
                    ? `Results for "${searchParams.query}"` 
                    : 'Recently updated and viewed documents'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>No documents found.</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full bg-${getFileTypeColor(doc.fileType)}-100`}>
                          <FileText className={`h-5 w-5 text-${getFileTypeColor(doc.fileType)}-600`} />
                        </div>
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{doc.category.name}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{formatFileSize(doc.fileSize)}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              Updated {doc.uploadDate.toLocaleDateString(undefined, { dateStyle: 'medium' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1 rounded hover:bg-gray-200" 
                          title="View"
                          onClick={() => handleViewDocument(doc)}
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-gray-200" 
                          title="Download"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-gray-200" 
                          title="Share"
                          onClick={() => handleShareDocument(doc)}
                        >
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default Documents;
