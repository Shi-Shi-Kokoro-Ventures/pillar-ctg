
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUp, X, FileText, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { DocumentCategory, DOCUMENT_CATEGORIES } from '@/types/documents';

interface DocumentUploaderProps {
  onUpload: (file: File, metadata: { title: string; category: string }) => Promise<void>;
  allowedTypes?: string[];
  maxSize?: number; // in bytes
  className?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ 
  onUpload, 
  allowedTypes = ['.pdf', '.docx', '.xlsx', '.jpg', '.png'],
  maxSize = 10 * 1024 * 1024, // 10MB
  className 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentCategory, setDocumentCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };
  
  // Validate file before setting
  const validateAndSetFile = (file: File) => {
    // Check file size
    if (file.size > maxSize) {
      toast.error(`File too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      return;
    }
    
    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (allowedTypes.length > 0 && !allowedTypes.some(type => {
      if (type.startsWith('.')) return fileExtension === type;
      return file.type.includes(type);
    })) {
      toast.error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }
    
    setSelectedFile(file);
    
    // Set document title from filename if empty
    if (!documentTitle) {
      setDocumentTitle(file.name.split('.')[0].replace(/[_-]/g, ' '));
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile || !documentTitle || !documentCategory) {
      toast.error('Please complete all required fields');
      return;
    }
    
    try {
      setIsUploading(true);
      await onUpload(selectedFile, { title: documentTitle, category: documentCategory });
      
      // Reset form
      setSelectedFile(null);
      setDocumentTitle('');
      setDocumentCategory('');
      
      toast.success('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Format allowed file types for display
  const formatAllowedTypes = () => {
    return allowedTypes.map(type => {
      if (type.startsWith('.')) return type.substring(1).toUpperCase();
      return type.split('/')[1]?.toUpperCase() || type;
    }).join(', ');
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
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
          {DOCUMENT_CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="document-file">File</Label>
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('document-file')?.click()}
        >
          <input
            id="document-file"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept={allowedTypes.join(',')}
          />
          
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
              <p className="text-xs text-gray-400 mt-1">
                {formatAllowedTypes()} (max {maxSize / (1024 * 1024)}MB)
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedFile || !documentTitle || !documentCategory || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploader;
