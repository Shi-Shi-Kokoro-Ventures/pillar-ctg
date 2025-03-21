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
  });

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
