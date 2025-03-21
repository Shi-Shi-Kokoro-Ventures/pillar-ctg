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
import { UserCircle, Upload, Camera, User, Shield, Info } from "lucide-react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { supabase } from "@/integrations/supabase/client";
import RoleBasedWrapper from "@/components/auth/RoleBasedWrapper";
import RolePermissionsInfo from "@/components/admin/RolePermissionsInfo";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AddUser = () => {
  const navigate = useNavigate();
  const { user: currentAdmin } = useAuth();
  
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
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | "">("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Password strength checker
    if (name === "password") {
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLongEnough = value.length >= 8;
      
      const strength = 
        (hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChars && isLongEnough) 
          ? "strong" 
          : (isLongEnough && ((hasLowerCase && hasUpperCase) || (hasNumbers && hasSpecialChars)))
            ? "medium"
            : value.length > 0 
              ? "weak" 
              : "";
      
      setPasswordStrength(strength);
    }
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

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (passwordStrength === "weak") {
      errors.password = "Password is too weak";
    }
    
    // Name validation
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }
    
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    try {
      // Get current admin info - in a real implementation this would come from auth context
      const adminInfo = currentAdmin || {
        id: "current-admin-id", 
        email: "admin@example.com"
      };
      
      // This would be replaced with actual Supabase mutation
      console.log("Creating new user:", formData);
      console.log("Created by admin:", adminInfo);
      
      // In a real implementation, we would store both the user data and the creator info
      // const { data, error } = await supabase.from('users').insert({
      //   ...formData,
      //   created_by: adminInfo.id,
      //   created_by_email: adminInfo.email
      // });
      
      toast.success(`User ${formData.email} created successfully by ${adminInfo.email}`);
      
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
    <RoleBasedWrapper 
      allowedRoles={['admin', 'manager']} 
      requiredPermission="manage_users"
    >
      <AdminDashboardLayout>
        <DashboardHeader 
          title="Add New User" 
          description="Create a new user account and set permissions" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Enter the basic information for the new user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="add-user-form" onSubmit={handleSubmit} className="space-y-6">
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
                      <Label htmlFor="firstName">
                        First Name
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={formErrors.firstName ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={formErrors.lastName ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-red-500" : ""}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={formErrors.password ? "border-red-500" : ""}
                      required
                    />
                    {passwordStrength && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Password strength:</p>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              passwordStrength === "strong" 
                                ? "bg-green-500" 
                                : passwordStrength === "medium" 
                                  ? "bg-yellow-500" 
                                  : "bg-red-500"
                            }`}
                            style={{ width: passwordStrength === "strong" ? "100%" : passwordStrength === "medium" ? "66%" : "33%" }}
                          />
                        </div>
                      </div>
                    )}
                    {formErrors.password && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">
                      User Role
                      <span className="text-red-500 ml-1">*</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 inline ml-1 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-4">
                            <p>Roles determine what actions the user can perform in the system.</p>
                            <ul className="mt-2 space-y-1 text-xs">
                              <li>• Administrator: Full system access</li>
                              <li>• Manager: Department-level access</li>
                              <li>• Case Worker: Case-specific access</li>
                              <li>• View-Only: Read-only access</li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
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
                    
                    {/* Role Permissions Information */}
                    <RolePermissionsInfo selectedRole={formData.role} />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end space-x-3 border-t pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/user-management")}
                >
                  Cancel
                </Button>
                <Button type="submit" form="add-user-form">Create User</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Access Control Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  When creating a new user, consider the principle of least privilege. 
                  Only assign the permissions necessary for the user to perform their job functions.
                </p>
                <div className="space-y-4">
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-amber-800 text-sm">
                    <h4 className="font-medium mb-1">Administrative Roles</h4>
                    <p className="text-xs">
                      Admin and Manager roles have significant system privileges. 
                      These should be assigned sparingly and only to trusted staff members.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200 text-blue-800 text-sm">
                    <h4 className="font-medium mb-1">Manager Role</h4>
                    <p className="text-xs">
                      Managers have department-level access and can oversee case workers, 
                      manage resources, and access reporting for their department.
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md border border-green-200 text-green-800 text-sm">
                    <h4 className="font-medium mb-1">Case Worker Role</h4>
                    <p className="text-xs">
                      Case workers can access client data and manage assigned cases, 
                      but cannot perform administrative functions or see other case workers' clients.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-md border border-purple-200 text-purple-800 text-sm">
                    <h4 className="font-medium mb-1">View-Only Role</h4>
                    <p className="text-xs">
                      View-only users can see reports and resources but cannot modify any data.
                      Ideal for temporary staff or stakeholders who need visibility but not edit rights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Audit Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  All user creations are logged with the administrator's information for audit purposes.
                  This helps maintain accountability and traceability for system access management.
                </p>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Creating user as:</p>
                  <p className="text-sm font-medium">
                    {currentAdmin?.email || "admin@example.com"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminDashboardLayout>
    </RoleBasedWrapper>
  );
};

export default AddUser;
