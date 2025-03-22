
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Document, formatFileSize } from '@/types/documents';
import { FileText, Download, Share2, Trash2, Calendar, User, Tag, FileType } from 'lucide-react';

interface DocumentPreviewProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (document: Document) => void;
  onShare: (document: Document) => void;
  onDelete?: (document: Document) => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  document, 
  isOpen, 
  onClose, 
  onDownload,
  onShare,
  onDelete
}) => {
  if (!document) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white border shadow-lg">
        <DialogHeader>
          <DialogTitle>{document.title}</DialogTitle>
          <DialogDescription>
            Document details and preview
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 py-4">
          {/* Document preview (placeholder for now) */}
          <div className="bg-gray-100 rounded-md p-8 flex justify-center items-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Document preview not available</p>
            </div>
          </div>
          
          {/* Document details */}
          <div className="bg-gray-50 rounded-md p-4 space-y-2">
            <div className="flex items-center gap-2">
              <FileType className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {document.fileName} ({document.fileType}) • {formatFileSize(document.fileSize)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Uploaded on {document.uploadDate.toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Uploaded by {document.uploadedBy}
              </span>
            </div>
            {document.tags && document.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            {onDelete && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => document && onDelete(document)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => document && onShare(document)}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => document && onDownload(document)}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreview;
