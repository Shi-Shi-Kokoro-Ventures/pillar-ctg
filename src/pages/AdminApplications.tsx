
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { 
  Search, 
  Filter, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  DownloadIcon,
  RefreshCw,
  ChevronDown,
  AlertTriangle,
  CalendarIcon,
  UsersIcon,
  HomeIcon
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ApplicationStats from "@/components/admin/ApplicationStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<{ field: keyof Application; direction: "asc" | "desc" }>({
    field: "created_at",
    direction: "desc",
  });
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<Application["status"]>("pending");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Mock fetch applications (will connect to Supabase later)
  const fetchApplications = async (): Promise<Application[]> => {
    // This would be replaced with actual Supabase query
    // For now, return mock data
    return [
      {
        id: "ap-1001",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "555-123-4567",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "90210",
        dateOfBirth: "1985-05-15",
        householdMembers: [
          {
            id: "hm-1",
            firstName: "Jane",
            lastName: "Doe",
            relationship: "Spouse",
            dateOfBirth: "1987-03-22",
          }
        ],
        emergencyContact: {
          firstName: "Michael",
          lastName: "Smith",
          relationship: "Brother",
          phone: "555-987-6543",
          address: "456 Oak Ave",
          city: "Somewhere",
          state: "CA",
          zipCode: "90211",
        },
        assistanceTypes: ["housing", "utility"],
        created_at: "2023-11-15T08:30:00Z",
        status: "pending",
      },
      {
        id: "ap-1002",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarahj@example.com",
        phone: "555-222-3333",
        address: "789 Elm St",
        city: "Othertown",
        state: "NY",
        zipCode: "10001",
        dateOfBirth: "1990-08-12",
        householdMembers: [],
        emergencyContact: {
          firstName: "Robert",
          lastName: "Johnson",
          relationship: "Father",
          phone: "555-444-5555",
          address: "101 Pine St",
          city: "Elsewhere",
          state: "NY",
          zipCode: "10002",
        },
        assistanceTypes: ["food", "medical"],
        created_at: "2023-11-10T14:45:00Z",
        status: "approved",
      },
      {
        id: "ap-1003",
        firstName: "Robert",
        lastName: "Williams",
        email: "rwilliams@example.com",
        phone: "555-777-8888",
        address: "321 Cedar St",
        city: "Somewhere",
        state: "TX",
        zipCode: "75001",
        dateOfBirth: "1975-12-03",
        householdMembers: [
          {
            id: "hm-2",
            firstName: "Emily",
            lastName: "Williams",
            relationship: "Daughter",
            dateOfBirth: "2010-07-14",
          },
          {
            id: "hm-3",
            firstName: "James",
            lastName: "Williams",
            relationship: "Son",
            dateOfBirth: "2012-09-22",
          }
        ],
        emergencyContact: {
          firstName: "Lisa",
          lastName: "Williams",
          relationship: "Sister",
          phone: "555-111-2222",
          address: "555 Maple Ave",
          city: "Anywhere",
          state: "TX",
          zipCode: "75002",
        },
        assistanceTypes: ["housing", "food", "education"],
        created_at: "2023-11-05T10:15:00Z",
        status: "denied",
      },
      {
        id: "ap-1004",
        firstName: "Maria",
        lastName: "Garcia",
        email: "mgarcia@example.com",
        phone: "555-333-4444",
        address: "987 Birch St",
        city: "Newtown",
        state: "FL",
        zipCode: "33101",
        dateOfBirth: "1988-04-19",
        householdMembers: [
          {
            id: "hm-4",
            firstName: "Luis",
            lastName: "Garcia",
            relationship: "Spouse",
            dateOfBirth: "1986-02-28",
          }
        ],
        emergencyContact: {
          firstName: "Carlos",
          lastName: "Rodriguez",
          relationship: "Brother",
          phone: "555-666-7777",
          address: "753 Palm Dr",
          city: "Beachside",
          state: "FL",
          zipCode: "33102",
        },
        assistanceTypes: ["utility", "financial"],
        created_at: "2023-11-18T16:20:00Z",
        status: "in-review",
      },
      {
        id: "ap-1005",
        firstName: "David",
        lastName: "Chen",
        email: "dchen@example.com",
        phone: "555-888-9999",
        address: "456 Willow St",
        city: "Metro City",
        state: "CA",
        zipCode: "94501",
        dateOfBirth: "1992-09-28",
        householdMembers: [
          {
            id: "hm-5",
            firstName: "Mei",
            lastName: "Chen",
            relationship: "Spouse",
            dateOfBirth: "1993-11-15",
          },
          {
            id: "hm-6",
            firstName: "Lily",
            lastName: "Chen",
            relationship: "Daughter",
            dateOfBirth: "2018-03-12",
          }
        ],
        emergencyContact: {
          firstName: "Wei",
          lastName: "Chen",
          relationship: "Father",
          phone: "555-123-9876",
          address: "789 Oak Dr",
          city: "Metro City",
          state: "CA",
          zipCode: "94502",
        },
        assistanceTypes: ["housing", "childcare", "education"],
        created_at: "2023-10-29T09:15:00Z",
        status: "pending",
      },
      {
        id: "ap-1006",
        firstName: "Michael",
        lastName: "Thompson",
        email: "mthompson@example.com",
        phone: "555-444-2222",
        address: "321 Pine St",
        city: "Highland",
        state: "WA",
        zipCode: "98001",
        dateOfBirth: "1980-07-15",
        householdMembers: [],
        emergencyContact: {
          firstName: "Susan",
          lastName: "Thompson",
          relationship: "Sister",
          phone: "555-333-1111",
          address: "456 Fir Dr",
          city: "Highland",
          state: "WA",
          zipCode: "98002",
        },
        assistanceTypes: ["food", "medical", "employment"],
        created_at: "2023-11-03T14:30:00Z",
        status: "approved",
      },
    ];
  };

  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  // Filter applications based on search, status, and date filters
  const filteredApplications = applications.filter((app) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === null || app.status === statusFilter;
    
    // Tab filter
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "pending" && app.status === "pending") ||
      (activeTab === "in-review" && app.status === "in-review") ||
      (activeTab === "approved" && app.status === "approved") ||
      (activeTab === "denied" && app.status === "denied");

    // Date filter
    let matchesDate = true;
    const appDate = new Date(app.created_at);
    const now = new Date();
    
    if (dateFilter === "today") {
      const today = new Date();
      matchesDate = 
        appDate.getDate() === today.getDate() &&
        appDate.getMonth() === today.getMonth() &&
        appDate.getFullYear() === today.getFullYear();
    } else if (dateFilter === "this-week") {
      const weekStart = new Date();
      weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
      matchesDate = appDate >= weekStart;
    } else if (dateFilter === "this-month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      matchesDate = appDate >= monthStart;
    }

    return matchesSearch && matchesStatus && matchesTab && matchesDate;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    const aValue = a[sortBy.field];
    const bValue = b[sortBy.field];

    if (sortBy.field === "created_at") {
      return sortBy.direction === "asc"
        ? new Date(aValue as string).getTime() - new Date(bValue as string).getTime()
        : new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortBy.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  // Handle application status update
  const handleStatusUpdate = async () => {
    if (!selectedApplication) return;

    try {
      // This would be an actual Supabase update
      // For now just mock the update
      toast.success(`Application ${selectedApplication.id} status updated to ${applicationStatus}`);
      setIsDetailOpen(false);
      
      // In a real implementation:
      // await supabase
      //   .from('applications')
      //   .update({ status: applicationStatus, admin_notes: adminNote })
      //   .eq('id', selectedApplication.id);
    } catch (error) {
      toast.error("Failed to update application status");
      console.error(error);
    }
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    // Implementation of CSV export would go here
    toast.success("Applications exported to CSV");
  };

  // View application details
  const viewApplicationDetails = (application: Application) => {
    setSelectedApplication(application);
    setApplicationStatus(application.status);
    setAdminNote(""); // Reset admin note
    setIsDetailOpen(true);
  };

  // Handle sort change
  const handleSort = (field: keyof Application) => {
    setSortBy({
      field,
      direction: sortBy.field === field && sortBy.direction === "asc" ? "desc" : "asc",
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get status badge class
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "denied":
        return "bg-red-100 text-red-800";
      case "in-review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Toggle selection of an item
  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Select or deselect all items
  const toggleSelectAll = () => {
    if (selectedItems.length === sortedApplications.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedApplications.map(app => app.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = () => {
    if (!bulkAction || selectedItems.length === 0) return;
    
    switch (bulkAction) {
      case "approve":
        toast.success(`${selectedItems.length} applications marked as approved`);
        break;
      case "deny":
        toast.success(`${selectedItems.length} applications marked as denied`);
        break;
      case "review":
        toast.success(`${selectedItems.length} applications set to in-review`);
        break;
      case "export":
        toast.success(`${selectedItems.length} applications exported`);
        break;
      default:
        toast.error("No action selected");
    }
    
    // Reset selections after action
    setSelectedItems([]);
    setBulkAction("");
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications Management</h1>
            <p className="text-gray-600">
              View, filter, and manage assistance applications
            </p>
          </header>

          {/* Application Statistics */}
          <ApplicationStats applications={applications} />

          {/* Filters and Search */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, ID or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select
              value={statusFilter || ""}
              onValueChange={(value) => setStatusFilter(value === "" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={dateFilter}
              onValueChange={setDateFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter(null);
                  setDateFilter("all");
                  setActiveTab("all");
                }}
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Reset
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleExportCSV}>
                <DownloadIcon className="h-4 w-4 mr-1" /> Export CSV
              </Button>
            </div>
          </div>

          {/* Applications Tabs and Table */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all" className="relative">
                    All
                    <Badge variant="secondary" className="ml-1">{applications.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="relative">
                    Pending
                    <Badge variant="secondary" className="ml-1">
                      {applications.filter(app => app.status === "pending").length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="in-review" className="relative">
                    In Review
                    <Badge variant="secondary" className="ml-1">
                      {applications.filter(app => app.status === "in-review").length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="relative">
                    Approved
                    <Badge variant="secondary" className="ml-1">
                      {applications.filter(app => app.status === "approved").length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="denied" className="relative">
                    Denied
                    <Badge variant="secondary" className="ml-1">
                      {applications.filter(app => app.status === "denied").length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="p-8 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
                  <p>Loading applications...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
                  <p>Error loading applications</p>
                </div>
              ) : sortedApplications.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No applications found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                <>
                  {/* Bulk Action Controls */}
                  {selectedItems.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox 
                          id="select-all" 
                          checked={selectedItems.length === sortedApplications.length}
                          onCheckedChange={toggleSelectAll}
                          className="mr-2"
                        />
                        <label htmlFor="select-all" className="text-sm text-gray-700">
                          {selectedItems.length} of {sortedApplications.length} selected
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={bulkAction} onValueChange={setBulkAction}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Bulk Actions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Mark as Approved</SelectItem>
                            <SelectItem value="deny">Mark as Denied</SelectItem>
                            <SelectItem value="review">Set to In-Review</SelectItem>
                            <SelectItem value="export">Export Selected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          size="sm" 
                          disabled={!bulkAction || selectedItems.length === 0} 
                          onClick={handleBulkAction}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                
                  {/* Applications Table */}
                  <div className="overflow-x-auto border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox 
                              checked={selectedItems.length === sortedApplications.length && sortedApplications.length > 0}
                              onCheckedChange={toggleSelectAll}
                            />
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("id")}
                          >
                            ID
                            {sortBy.field === "id" && (
                              <ChevronDown 
                                className={`inline h-4 w-4 transition-transform ${
                                  sortBy.direction === "desc" ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("lastName")}
                          >
                            Applicant Name
                            {sortBy.field === "lastName" && (
                              <ChevronDown 
                                className={`inline h-4 w-4 transition-transform ${
                                  sortBy.direction === "desc" ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("created_at")}
                          >
                            Submission Date
                            {sortBy.field === "created_at" && (
                              <ChevronDown 
                                className={`inline h-4 w-4 transition-transform ${
                                  sortBy.direction === "desc" ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("status")}
                          >
                            Status
                            {sortBy.field === "status" && (
                              <ChevronDown 
                                className={`inline h-4 w-4 transition-transform ${
                                  sortBy.direction === "desc" ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </TableHead>
                          <TableHead>Assistance Types</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedApplications.map((application) => (
                          <TableRow key={application.id} className="group">
                            <TableCell>
                              <Checkbox 
                                checked={selectedItems.includes(application.id)}
                                onCheckedChange={() => toggleSelectItem(application.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{application.id}</TableCell>
                            <TableCell>
                              <div>
                                {`${application.firstName} ${application.lastName}`}
                              </div>
                              <div className="text-xs text-gray-500">{application.email}</div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{formatDate(application.created_at)}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(application.status)}`}>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace("-", " ")}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {application.assistanceTypes.map((type) => (
                                  <span key={type} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="focus:ring-0">
                                    <span>Actions</span> <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => viewApplicationDetails(application)}>
                                    <FileText className="h-4 w-4 mr-2" /> View Details
                                  </DropdownMenuItem>
                                  
                                  <DropdownMenuSeparator />
                                  
                                  {application.status !== "approved" && (
                                    <DropdownMenuItem onClick={() => {
                                      setSelectedApplication(application);
                                      setApplicationStatus("approved");
                                      handleStatusUpdate();
                                    }}>
                                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" /> Approve
                                    </DropdownMenuItem>
                                  )}
                                  
                                  {application.status !== "denied" && (
                                    <DropdownMenuItem onClick={() => {
                                      setSelectedApplication(application);
                                      setApplicationStatus("denied");
                                      handleStatusUpdate();
                                    }}>
                                      <XCircle className="h-4 w-4 mr-2 text-red-600" /> Deny
                                    </DropdownMenuItem>
                                  )}
                                  
                                  {application.status !== "in-review" && (
                                    <DropdownMenuItem onClick={() => {
                                      setSelectedApplication(application);
                                      setApplicationStatus("in-review");
                                      handleStatusUpdate();
                                    }}>
                                      <AlertCircle className="h-4 w-4 mr-2 text-yellow-600" /> Mark as In-Review
                                    </DropdownMenuItem>
                                  )}
                                  
                                  <DropdownMenuSeparator />
                                  
                                  <DropdownMenuItem>
                                    <DownloadIcon className="h-4 w-4 mr-2" /> Export
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Application Detail Dialog */}
          <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              {selectedApplication && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <span>Application {selectedApplication.id}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedApplication.status)}`}>
                        {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1).replace("-", " ")}
                      </span>
                    </DialogTitle>
                    <DialogDescription>
                      Submitted on {formatDate(selectedApplication.created_at)}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-6 space-y-8">
                    {/* Application Tabs */}
                    <Tabs defaultValue="personal">
                      <TabsList className="mb-4 w-full">
                        <TabsTrigger value="personal" className="flex items-center">
                          <UsersIcon className="h-4 w-4 mr-2" /> Personal Info
                        </TabsTrigger>
                        <TabsTrigger value="household" className="flex items-center">
                          <HomeIcon className="h-4 w-4 mr-2" /> Household
                        </TabsTrigger>
                        <TabsTrigger value="assistance" className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" /> Assistance
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" /> Notes & Status
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="personal">
                        {/* Applicant Information */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Applicant Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Full Name</p>
                              <p className="text-base">{`${selectedApplication.firstName} ${selectedApplication.lastName}`}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                              <p className="text-base">{formatDate(selectedApplication.dateOfBirth)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-base">{selectedApplication.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p className="text-base">{selectedApplication.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-500">Address</p>
                              <p className="text-base">
                                {`${selectedApplication.address}, ${selectedApplication.city}, ${selectedApplication.state} ${selectedApplication.zipCode}`}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="mt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Emergency Contact</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Name</p>
                              <p className="text-base">{`${selectedApplication.emergencyContact.firstName} ${selectedApplication.emergencyContact.lastName}`}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Relationship</p>
                              <p className="text-base">{selectedApplication.emergencyContact.relationship}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p className="text-base">{selectedApplication.emergencyContact.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-500">Address</p>
                              <p className="text-base">
                                {`${selectedApplication.emergencyContact.address}, ${selectedApplication.emergencyContact.city}, ${selectedApplication.emergencyContact.state} ${selectedApplication.emergencyContact.zipCode}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="household">
                        {/* Household Members */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Household Members</h3>
                          {selectedApplication.householdMembers.length === 0 ? (
                            <div className="bg-gray-50 p-6 rounded-md text-center">
                              <p className="text-gray-500">No household members listed</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-4">
                              {selectedApplication.householdMembers.map((member) => (
                                <div key={member.id} className="bg-gray-50 p-4 rounded-md border border-gray-100">
                                  <div className="flex justify-between">
                                    <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                                    <p className="text-sm text-gray-500">
                                      <CalendarIcon className="h-4 w-4 inline mr-1" />
                                      {formatDate(member.dateOfBirth)}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">{member.relationship}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="assistance">
                        {/* Assistance Types */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Requested Assistance</h3>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {selectedApplication.assistanceTypes.map((type) => (
                              <Badge key={type} variant="secondary" className="px-3 py-1.5 text-base bg-gray-100">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* Additional assistance details would go here */}
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <p className="text-sm text-gray-500">
                              Additional details about requested assistance would be displayed here.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notes">
                        {/* Admin Actions */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-900">Admin Actions</h3>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-500">Update Status</p>
                            <Select
                              value={applicationStatus}
                              onValueChange={(value: Application["status"]) => setApplicationStatus(value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-review">In Review</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="denied">Denied</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-500">Admin Notes</p>
                            <Textarea
                              placeholder="Add internal notes about this application..."
                              value={adminNote}
                              onChange={(e) => setAdminNote(e.target.value)}
                              rows={4}
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <DialogFooter className="mt-6 space-x-2">
                    <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      variant={applicationStatus === "approved" ? "default" : (
                        applicationStatus === "denied" ? "destructive" : "secondary"
                      )}
                      onClick={handleStatusUpdate}
                    >
                      {applicationStatus === "approved" && <CheckCircle className="h-4 w-4 mr-2" />}
                      {applicationStatus === "denied" && <XCircle className="h-4 w-4 mr-2" />}
                      {applicationStatus === "in-review" && <AlertCircle className="h-4 w-4 mr-2" />}
                      Save Changes
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminApplications;
