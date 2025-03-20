import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User, UserFormData } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SearchIcon,
  UserPlusIcon, 
  EditIcon,
  UserIcon,
  FilterIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AdminSidebar from "@/components/admin/AdminSidebar";

const UserManagement = () => {
  // State for user data
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserFormData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock data - in a real implementation, this would come from Supabase
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // This would be replaced with an actual Supabase query
      // Mock data for demonstration
      const mockUsers: User[] = [
        {
          id: "1",
          email: "admin@example.com",
          firstName: "Admin",
          lastName: "User",
          role: "admin",
          status: "active",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        },
        {
          id: "2",
          email: "manager@example.com",
          firstName: "Manager",
          lastName: "User",
          role: "manager",
          status: "active",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        },
        {
          id: "3",
          email: "caseworker@example.com",
          firstName: "Case",
          lastName: "Worker",
          role: "case-worker",
          status: "active",
          created_at: new Date().toISOString(),
        },
        {
          id: "4",
          email: "viewer@example.com",
          firstName: "View",
          lastName: "Only",
          role: "viewer",
          status: "inactive",
          created_at: new Date().toISOString(),
        },
        {
          id: "5",
          email: "pending@example.com",
          firstName: "Pending",
          lastName: "User",
          role: "viewer",
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ];

      return mockUsers;
    },
  });

  // Filter users based on search term and role
  const filteredUsers = users
    ? users.filter((user) => {
        const matchesSearch =
          search === "" ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase());
        
        const matchesRole = 
          roleFilter === "all" || 
          user.role === roleFilter;
        
        return matchesSearch && matchesRole;
      })
    : [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handle user dialog open/close
  const openAddUserDialog = () => {
    setIsEditMode(false);
    setCurrentUser({
      email: "",
      firstName: "",
      lastName: "",
      role: "viewer",
      password: "",
    });
    setUserDialogOpen(true);
  };

  const openEditUserDialog = (user: User) => {
    setIsEditMode(true);
    setCurrentUser({
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: user.role,
    });
    setUserDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => 
      prev ? { ...prev, [name]: value } : null
    );
  };

  const handleRoleChange = (value: string) => {
    setCurrentUser((prev) => 
      prev ? { ...prev, role: value as any } : null
    );
  };

  // Handle user form submission
  const handleUserSubmit = async () => {
    if (!currentUser) return;

    try {
      // This would be replaced with actual Supabase mutation
      if (isEditMode) {
        // Update existing user
        toast.success(`User ${currentUser.email} updated successfully`);
      } else {
        // Create new user
        toast.success(`User ${currentUser.email} created successfully`);
      }
      setUserDialogOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user information");
    }
  };

  // Handle user status change
  const handleStatusChange = async (user: User, newStatus: 'active' | 'inactive') => {
    try {
      // This would be replaced with actual Supabase mutation
      toast.success(`User status changed to ${newStatus}`);
    } catch (error) {
      console.error("Error changing user status:", error);
      toast.error("Failed to change user status");
    }
  };

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  // Role display names
  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "manager":
        return "Manager";
      case "case-worker":
        return "Case Worker";
      case "viewer":
        return "View-Only";
      default:
        return role;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">
              Manage user accounts and access permissions
            </p>
          </header>

          {/* Controls Section */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-96">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrators</option>
                <option value="manager">Managers</option>
                <option value="case-worker">Case Workers</option>
                <option value="viewer">View-Only</option>
              </select>
              
              <Button onClick={openAddUserDialog} className="flex items-center gap-2">
                <UserPlusIcon className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          {/* Users Table */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-redcross"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error: </strong> 
              <span className="block sm:inline">Failed to load users. Please try again.</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
              <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
              <p className="text-gray-500">
                {search ? "Try adjusting your search criteria." : "There are no users in the system yet."}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                <Table>
                  <TableCaption>
                    Showing {currentItems.length} of {filteredUsers.length} users
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleName(user.role)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditUserDialog(user)}
                              title="Edit User"
                            >
                              <EditIcon className="h-4 w-4" />
                            </Button>
                            {user.status === "active" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(user, "inactive")}
                                className="text-red-500 hover:text-red-700"
                                title="Deactivate User"
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(user, "active")}
                                className="text-green-500 hover:text-green-700"
                                title="Activate User"
                              >
                                <CheckIcon className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* User Dialog */}
          <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogDescription>
                  {isEditMode 
                    ? "Update user information and permissions." 
                    : "Create a new user account and set their permissions."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={currentUser?.email || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                    disabled={isEditMode}
                  />
                </div>
                {!isEditMode && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={currentUser?.password || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={currentUser?.firstName || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={currentUser?.lastName || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select
                    value={currentUser?.role}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="case-worker">Case Worker</SelectItem>
                      <SelectItem value="viewer">View-Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setUserDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUserSubmit}>
                  {isEditMode ? "Save Changes" : "Create User"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Audit Information */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">User Management Policy</h3>
            <p className="text-gray-600 text-sm">
              User accounts should be created based on the principle of least privilege. 
              Administrators should regularly review user access and deactivate accounts 
              that are no longer needed. All user management actions are logged for audit purposes.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserManagement;
