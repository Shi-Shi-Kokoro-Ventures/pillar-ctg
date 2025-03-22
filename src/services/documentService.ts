
import { 
  Document, 
  DocumentCategory, 
  DocumentSearchParams, 
  DocumentTemplate,
  DOCUMENT_CATEGORIES
} from "@/types/documents";

// Mock document data
const mockDocuments: Document[] = [
  {
    id: "doc-001",
    title: "Quarterly Performance Report",
    category: DOCUMENT_CATEGORIES[0],
    fileName: "quarterly_report_q1_2023.pdf",
    fileSize: 1.2 * 1024 * 1024, // 1.2 MB
    fileType: "PDF",
    uploadDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    uploadedBy: "John Smith",
    status: "active",
    tags: ["quarterly", "finance", "performance"],
    version: 1
  },
  {
    id: "doc-002",
    title: "Client Information Policy",
    category: DOCUMENT_CATEGORIES[1],
    fileName: "client_information_policy.docx",
    fileSize: 350 * 1024, // 350 KB
    fileType: "DOCX",
    uploadDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    uploadedBy: "Maria Johnson",
    status: "active",
    tags: ["policy", "client", "confidentiality"],
    version: 2
  },
  // Add more mock documents as needed
];

// Mock templates
const mockTemplates: DocumentTemplate[] = [
  { 
    id: "1", 
    name: "Expense Report", 
    fileType: "XLSX", 
    createdDate: new Date("2023-05-15"),
    version: 1,
    downloadUrl: "/templates/expense-report.xlsx",
    description: "Standard expense report form for employees"
  },
  { 
    id: "2", 
    name: "Client Intake Form", 
    fileType: "DOCX", 
    createdDate: new Date("2023-06-22"),
    version: 2,
    downloadUrl: "/templates/client-intake.docx",
    description: "Form used for collecting new client information"
  },
  { 
    id: "3", 
    name: "Meeting Minutes", 
    fileType: "DOCX", 
    createdDate: new Date("2023-07-10"),
    version: 1,
    downloadUrl: "/templates/meeting-minutes.docx",
    description: "Template for recording meeting minutes"
  },
  { 
    id: "4", 
    name: "Project Proposal", 
    fileType: "DOCX", 
    createdDate: new Date("2023-08-05"),
    version: 3,
    downloadUrl: "/templates/project-proposal.docx",
    description: "Standard format for project proposals"
  }
];

/**
 * This service contains methods for managing documents.
 * It currently uses mock data, but will be replaced with actual API calls.
 */
export const documentService = {
  /**
   * Fetch documents based on search parameters
   */
  getDocuments: async (searchParams?: DocumentSearchParams): Promise<Document[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return all documents if no search params provided
    if (!searchParams) return mockDocuments;
    
    let filtered = [...mockDocuments];
    
    // Apply filters
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) || 
        doc.fileName.toLowerCase().includes(query) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        doc.category.name.toLowerCase().includes(query)
      );
    }
    
    if (searchParams.category) {
      filtered = filtered.filter(doc => doc.category.id === searchParams.category);
    }
    
    if (searchParams.status) {
      filtered = filtered.filter(doc => doc.status === searchParams.status);
    }
    
    if (searchParams.dateFrom) {
      filtered = filtered.filter(doc => doc.uploadDate >= searchParams.dateFrom);
    }
    
    if (searchParams.dateTo) {
      filtered = filtered.filter(doc => doc.uploadDate <= searchParams.dateTo);
    }
    
    if (searchParams.tags && searchParams.tags.length > 0) {
      filtered = filtered.filter(doc => 
        doc.tags && searchParams.tags?.some(tag => doc.tags?.includes(tag))
      );
    }
    
    // Apply sorting
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
    
    return filtered;
  },
  
  /**
   * Get a single document by ID
   */
  getDocumentById: async (id: string): Promise<Document | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockDocuments.find(doc => doc.id === id) || null;
  },
  
  /**
   * Upload a new document
   */
  uploadDocument: async (file: File, metadata: { 
    title: string; 
    category: string;
    tags?: string[];
  }): Promise<Document> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get the category
    const category = DOCUMENT_CATEGORIES.find(c => c.id === metadata.category) || DOCUMENT_CATEGORIES[0];
    
    // Create a new document
    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      title: metadata.title,
      category,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      uploadDate: new Date(),
      uploadedBy: "Current User", // Would be replaced with actual user
      status: 'active',
      tags: metadata.tags || [],
      version: 1
    };
    
    // In a real implementation, this would add to database
    // For now, we'll just add it to our mock data
    mockDocuments.unshift(newDocument);
    
    return newDocument;
  },
  
  /**
   * Delete a document
   */
  deleteDocument: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real implementation, this would remove from database
    // For now, we'll just filter it out of our mock data
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
    }
  },
  
  /**
   * Get document templates
   */
  getTemplates: async (): Promise<DocumentTemplate[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return mockTemplates;
  },
  
  /**
   * Download a template
   */
  downloadTemplate: async (id: string): Promise<DocumentTemplate | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would trigger a download
    return mockTemplates.find(template => template.id === id) || null;
  }
};
