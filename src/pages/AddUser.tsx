
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle, Upload, Camera, User } from "lucide-react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { supabase } from "@/integrations/supabase/client";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "viewer",
    avatarUrl: "",
  });
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarType, setAvatarType] = useState<"default" | "upload">("default");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleAvatarTypeChange = (type: "default" | "upload") => {
    setAvatarType(type);
    
    // Reset avatar preview if switching to default
    if (type === "default") {
      setAvatarPreview(null);
      setFormData(prev => ({
        ...prev,
        avatarUrl: ""
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarPreview(event.target.result as string);
        
        // In a real implementation, we would upload this to Supabase storage
        // and then set the URL in formData.avatarUrl
        // For now, we'll just store the data URL for preview
        setFormData(prev => ({
          ...prev,
          avatarUrl: event.target?.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getInitials = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();
    } else if (formData.firstName) {
      return formData.firstName[0].toUpperCase();
    } else if (formData.lastName) {
      return formData.lastName[0].toUpperCase();
    }
    return "U";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real implementation, we would get the current admin's information
      const currentAdmin = {
        id: "current-admin-id", // This would come from auth context in a real app
        email: "admin@example.com", // This would come from auth context in a real app
      };
      
      // This would be replaced with actual Supabase mutation
      console.log("Creating new user:", formData);
      console.log("Created by admin:", currentAdmin);
      
      // In a real implementation, we would store both the user data and the creator info
      // const { data, error } = await supabase.from('users').insert({
      //   ...formData,
      //   created_by: currentAdmin.id,
      //   created_by_email: currentAdmin.email
      // });
      
      toast.success(`User ${formData.email} created successfully by ${currentAdmin.email}`);
      
      // Navigate back to user management page after successful creation
      setTimeout(() => {
        navigate("/user-management");
      }, 1500);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Add New User" 
        description="Create a new user account and set permissions" 
      />
      
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
              
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 text-sm rounded-full ${
                    avatarType === "default" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => handleAvatarTypeChange("default")}
                >
                  Default Avatar
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm rounded-full ${
                    avatarType === "upload" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => handleAvatarTypeChange("upload")}
                >
                  Upload Photo
                </button>
              </div>
              
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-gray-200">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                {avatarType === "upload" && (
                  <button
                    type="button"
                    onClick={triggerFileUpload}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                )}
              </div>
              
              {avatarType === "upload" && (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              )}
              
              {avatarType === "upload" && !avatarPreview && (
                <p className="text-sm text-gray-500">
                  Click the camera icon to upload a photo
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <Select
                value={formData.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="case-worker">Case Worker</SelectItem>
                  <SelectItem value="viewer">View-Only</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Roles determine what actions the user can perform in the system.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/user-management")}
            >
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Information</h3>
        <p className="text-gray-600 text-sm">
          All user creations are logged with the administrator's information for audit purposes.
          This helps maintain accountability and traceability for system access management.
        </p>
      </div>
    </AdminDashboardLayout>
  );
};

export default AddUser;
