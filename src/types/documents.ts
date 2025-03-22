
/**
 * Types for the document management system
 */

export interface Document {
  id: string;
  title: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: Date;
  uploadedBy: string;
  status: DocumentStatus;
  lastViewed?: Date;
  expiryDate?: Date;
  tags?: string[];
  version?: number;
  description?: string;
  thumbnailUrl?: string;
}

export type DocumentStatus = 'active' | 'archived' | 'pending' | 'rejected' | 'expired';

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
  count?: number;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description?: string;
  fileType: string;
  category?: string;
  createdDate: Date;
  lastModified?: Date;
  version: number;
  downloadUrl: string;
  thumbnailUrl?: string;
}

export interface DocumentSearchParams {
  query?: string;
  category?: string;
  status?: DocumentStatus;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  sortBy?: 'title' | 'date' | 'size' | 'category';
  sortDirection?: 'asc' | 'desc';
}

export interface DocumentStats {
  total: number;
  categories: number;
  recentUploads: number;
  awaitingReview: number;
  needsUpdate: number;
  critical: number;
}

// Common document categories used across the application
export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  { id: 'reports', name: 'Reports', description: 'Financial and performance reports', color: 'blue', icon: 'file-text' },
  { id: 'policies', name: 'Policies', description: 'Organizational policies and procedures', color: 'green', icon: 'shield' },
  { id: 'templates', name: 'Templates', description: 'Reusable document templates', color: 'purple', icon: 'file-plus' },
  { id: 'forms', name: 'Forms', description: 'Forms and applications', color: 'orange', icon: 'clipboard' },
  { id: 'manuals', name: 'Manuals', description: 'Training and instructional manuals', color: 'red', icon: 'book' },
  { id: 'legal', name: 'Legal', description: 'Legal documents and contracts', color: 'indigo', icon: 'file-contract' },
];

// Helper functions for document management
export const getFileTypeIcon = (fileType: string): string => {
  const type = fileType.toLowerCase();
  if (type === 'pdf') return 'file-text';
  if (type === 'docx' || type === 'doc') return 'file-text';
  if (type === 'xlsx' || type === 'xls') return 'file-spreadsheet';
  if (type.startsWith('image/') || type === 'png' || type === 'jpg' || type === 'jpeg') return 'image';
  return 'file';
};

export const getFileTypeColor = (fileType: string): string => {
  const type = fileType.toLowerCase();
  if (type === 'pdf') return 'red';
  if (type === 'docx' || type === 'doc') return 'blue';
  if (type === 'xlsx' || type === 'xls') return 'green';
  if (type.startsWith('image/') || type === 'png' || type === 'jpg' || type === 'jpeg') return 'purple';
  return 'gray';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};
