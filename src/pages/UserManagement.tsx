
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, UserFormData } from "@/types/user";
import { useForm } from "react-hook-form";
import { SearchIcon, UserPlusIcon, UserIcon, KeyIcon, MailIcon, Edit } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserManagement = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Mock users data as it's not connected to a real database yet
  const mockUsers: User[] = [
    {
      id: "1",
      email: "admin@example.org",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      status: "active",
      created_at: "2023-01-15T12:00:00Z",
      last_login: "2023-06-10T14:32:00Z"
    },
    {
      id: "2",
      email: "manager@example.org",
      firstName: "Manager",
      lastName: "Smith",
      role: "manager",
      status: "active",
      created_at: "2023-02-20T10:15:00Z",
      last_login: "2023-06-09T09:45:00Z"
    },
    {
      id: "3",
      email: "caseworker1@example.org",
      firstName: "John",
      lastName: "Doe",
      role: "case-worker",
      status: "active",
      created_at: "2023-03-10T09:00:00Z",
      last_login: "2023-06-08T16:20:00Z"
    },
    {
      id: "4",
      email: "caseworker2@example.org",
      firstName: "Jane",
      lastName: "Wilson",
      role: "case-worker",
      status: "inactive",
      created_at: "2023-04-05T11:30:00Z",
      last_login: "2023-05-15T10:10:00Z"
    },
    {
      id: "5",
      email: "viewer@example.org",
      firstName: "View",
      lastName: "Only",
      role: "viewer",
      status: "pending",
      created_at: "2023-05-18T15:45:00Z",
    }
  ];

  // This would be replaced with a real API call
  const { data: users = mockUsers, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // When connected to Supabase, uncomment this code:
      /*
      const { data, error } = await (supabase as any)
        .from("users")
        .select("*");
      
      if (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
      
      return data as User[];
      */
      
      // For now, return mock data
      return mockUsers;
    },
  });

  // Filter users based on search term and role
  const filteredUsers = users
    ? users.filter((user) => {
        const matchesSearch =
          search === "" ||
          `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase().includes(search.toLowerCase()) ||
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

  // Form for creating and editing users
  const userForm = useForm<UserFormData>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "viewer",
      password: "",
    },
  });
  
  // Handle opening edit user dialog with pre-filled form
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    userForm.reset({
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: user.role,
      password: "", // Don't pre-fill password
    });
    setIsEditUserOpen(true);
  };
  
  // Handle creating a new user
  const handleCreateUserSubmit = (data: UserFormData) => {
    console.log("Creating new user:", data);
    
    // When connected to Supabase, uncomment this code:
    /*
    // This would insert a user in the database
    (async () => {
      try {
        const { error } = await (supabase as any)
          .from("users")
          .insert([
            {
              email: data.email,
              first_name: data.firstName,
              last_name: data.lastName,
              role: data.role,
              status: "pending",
            }
          ]);
        
        if (error) throw error;
        
        toast.success("User created successfully");
        setIsCreateUserOpen(false);
        userForm.reset();
      } catch (err) {
        console.error("Error creating user:", err);
        toast.error("Failed to create user");
      }
    })();
    */
    
    // For now, just show a success message
    toast.success("User would be created (mock)");
    setIsCreateUserOpen(false);
    userForm.reset();
  };
  
  // Handle updating an existing user
  const handleEditUserSubmit = (data: UserFormData) => {
    if (!currentUser) return;
    
    console.log("Updating user:", currentUser.id, data);
    
    // When connected to Supabase, uncomment this code:
    /*
    // This would update a user in the database
    (async () => {
      try {
        const { error } = await (supabase as any)
          .from("users")
          .update({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.role,
          })
          .eq("id", currentUser.id);
        
        if (error) throw error;
        
        toast.success("User updated successfully");
        setIsEditUserOpen(false);
        userForm.reset();
      } catch (err) {
        console.error("Error updating user:", err);
        toast.error("Failed to update user");
      }
    })();
    */
    
    // For now, just show a success message
    toast.success("User would be updated (mock)");
    setIsEditUserOpen(false);
    userForm.reset();
  };
  
  // Handle toggling user status (activate/deactivate)
  const handleToggleUserStatus = (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    
    // When connected to Supabase, uncomment this code:
    /*
    (async () => {
      try {
        const { error } = await (supabase as any)
          .from("users")
          .update({ status: newStatus })
          .eq("id", user.id);
        
        if (error) throw error;
        
        toast.success(`User ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
      } catch (err) {
        console.error("Error updating user status:", err);
        toast.error("Failed to update user status");
      }
    })();
    */
    
    // For now, just show a success message
    toast.success(`User would be ${newStatus === "active" ? "activated" : "deactivated"} (mock)`);
  };

  // Get color for user status badge
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

  // Get color for user role badge
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "case-worker":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">
            Manage system users, roles, and permissions
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
              <option value="admin">Admins</option>
              <option value="manager">Managers</option>
              <option value="case-worker">Case Workers</option>
              <option value="viewer">Viewers</option>
            </select>
            
            <Button 
              onClick={() => {
                userForm.reset({
                  email: "",
                  firstName: "",
                  lastName: "",
                  role: "viewer",
                  password: "",
                });
                setIsCreateUserOpen(true);
              }}
              className="flex items-center gap-2"
            >
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
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
            <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
            <p className="text-gray-500">
              {search ? "Try adjusting your search criteria." : "There are no users in the system yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
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
                    <TableHead>Created</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.firstName || ""} {user.lastName || ""}
                      </TableCell>
                      <TableCell>
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </TableCell>
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
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            title="Edit User"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={user.status === "active" ? "destructive" : "default"}
                            size="sm"
                            onClick={() => handleToggleUserStatus(user)}
                            title={user.status === "active" ? "Deactivate User" : "Activate User"}
                          >
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
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
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Create User Dialog */}
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(handleCreateUserSubmit)} className="space-y-4">
                <FormField
                  control={userForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            placeholder="user@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={userForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={userForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          {...field}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="case-worker">Case Worker</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </FormControl>
                      <FormDescription>
                        Role determines what permissions the user has in the system.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={userForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temporary Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Temporary password"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The user will be asked to change this password on first login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Edit User Dialog */}
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(handleEditUserSubmit)} className="space-y-4">
                <FormField
                  control={userForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            placeholder="user@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={userForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={userForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          {...field}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="case-worker">Case Worker</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </FormControl>
                      <FormDescription>
                        Role determines what permissions the user has in the system.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Role Information */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Understanding role capabilities in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Admin</h4>
                  <p className="text-sm text-gray-500">Full system access, including user management, system settings, and all data.</p>
                </div>
                <div>
                  <h4 className="font-medium">Manager</h4>
                  <p className="text-sm text-gray-500">Can access all case data, generate reports, and approve applications.</p>
                </div>
                <div>
                  <h4 className="font-medium">Case Worker</h4>
                  <p className="text-sm text-gray-500">Can create and edit client data and applications assigned to them.</p>
                </div>
                <div>
                  <h4 className="font-medium">Viewer</h4>
                  <p className="text-sm text-gray-500">Read-only access to non-sensitive data and reports.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Notes</CardTitle>
              <CardDescription>
                Important information about user management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li className="text-sm text-gray-600">
                  Users are required to change their temporary password on first login
                </li>
                <li className="text-sm text-gray-600">
                  Admin users can reset passwords for other users
                </li>
                <li className="text-sm text-gray-600">
                  Failed login attempts are logged for security monitoring
                </li>
                <li className="text-sm text-gray-600">
                  User permissions are checked for every operation
                </li>
                <li className="text-sm text-gray-600">
                  Inactive users cannot log into the system
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserManagement;
