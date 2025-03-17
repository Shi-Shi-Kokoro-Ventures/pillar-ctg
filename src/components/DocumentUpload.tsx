
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, AlertTriangle, Check, Image } from "lucide-react";

interface DocumentUploadProps {
  onChange: (files: File[]) => void;
  value: File[];
  type: "id" | "income" | "housing" | "crisis" | "other";
  id?: string;
  className?: string;
}

const getDocumentTypeLabel = (type: string): string => {
  switch (type) {
    case "id":
      return "Government-Issued ID";
    case "income":
      return "Proof of Income";
    case "housing":
      return "Housing Documentation";
    case "crisis":
      return "Crisis Documentation";
    case "other":
    default:
      return "Supporting Documents";
  }
};

const getDocumentTypeDescription = (type: string): string => {
  switch (type) {
    case "id":
      return "Please upload front and back of your government-issued ID (driver's license, state ID, passport)";
    case "income":
      return "Upload proof of income (pay stubs, benefits statement, tax returns, etc.)";
    case "housing":
      return "Upload housing documentation (lease agreement, mortgage statement, utility bills)";
    case "crisis":
      return "Upload documentation of your crisis (eviction notice, medical bills, etc.)";
    case "other":
    default:
      return "Upload any additional supporting documents";
  }
};

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onChange,
  value = [],
  type,
  id,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const typeLabel = getDocumentTypeLabel(type);
  const typeDescription = getDocumentTypeDescription(type);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      onChange([...value, ...newFiles]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      onChange([...value, ...newFiles]);
    }
  };
  
  const handleClick = () => {
    inputRef.current?.click();
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };
  
  // Preview image for ID type uploads
  const renderPreview = (file: File, index: number) => {
    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";
    
    return (
      <div key={index} className="flex items-center p-2 bg-white rounded-md border border-gray-200 group hover:border-redcross transition-colors">
        <div className="mr-3 flex-shrink-0">
          {isImage ? (
            <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-full w-full object-cover"
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
              />
            </div>
          ) : (
            <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
              {isPDF ? (
                <FileText className="h-6 w-6 text-gray-500" />
              ) : (
                <FileText className="h-6 w-6 text-gray-500" />
              )}
            </div>
          )}
        </div>
        
        <div className="flex-grow min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        
        <button
          type="button"
          onClick={() => removeFile(index)}
          className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  };
  
  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <Label htmlFor={id} className="text-base font-medium text-form-label mb-1 flex items-center">
          {type === "id" ? <Image className="h-4 w-4 mr-2 text-redcross" /> : <FileText className="h-4 w-4 mr-2 text-redcross" />}
          {typeLabel}
        </Label>
        <p className="text-sm text-gray-500 mb-3">{typeDescription}</p>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          dragActive ? "border-redcross bg-redcross/5" : "border-gray-300 hover:border-redcross/50"
        } transition-colors cursor-pointer`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept={type === "id" ? "image/*,.pdf" : "*"}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="space-y-3 py-3">
          <div className="mx-auto flex justify-center">
            <Upload className="h-10 w-10 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Drag and drop files here or click to browse</p>
            <p className="text-sm text-gray-500 mt-1">
              Upload JPG, PNG, or PDF files {type === "id" && "(front and back of ID required)"}
            </p>
          </div>
        </div>
      </div>
      
      {type === "id" && value.length < 2 && (
        <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
          <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Please upload both front and back of your government-issued ID</span>
        </div>
      )}
      
      {value.length > 0 && (
        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Uploaded files ({value.length})</Label>
            {value.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove all
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto p-1">
            {value.map((file, index) => renderPreview(file, index))}
          </div>
        </div>
      )}
      
      {type === "id" && value.length >= 2 && (
        <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md text-sm">
          <Check className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Front and back ID images uploaded successfully</span>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
