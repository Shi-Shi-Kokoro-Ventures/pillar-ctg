
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
}

export type DocumentStatus = 'active' | 'archived' | 'pending' | 'rejected' | 'expired';

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
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
