
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Filter, ArrowDownUp, Download, CheckCircle, XCircle, Clock, HelpCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Mock data for applications
const mockApplications = [
  {
    id: "APP-001",
    name: "John Smith",
    type: "Housing Assistance",
    status: "pending",
    priority: "high",
    submittedDate: "2023-10-15T08:30:00Z",
    lastUpdated: "2023-10-15T08:30:00Z",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "APP-002",
    name: "Maria Garcia",
    type: "Financial Support",
    status: "approved",
    priority: "medium",
    submittedDate: "2023-10-10T09:45:00Z",
    lastUpdated: "2023-10-14T11:20:00Z",
    assignedTo: "David Wilson",
  },
  {
    id: "APP-003",
    name: "Robert Chen",
    type: "Emergency Shelter",
    status: "rejected",
    priority: "high",
    submittedDate: "2023-10-14T14:15:00Z",
    lastUpdated: "2023-10-16T10:05:00Z",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "APP-004",
    name: "Emily Taylor",
    type: "Housing Assistance",
    status: "pending",
    priority: "low",
    submittedDate: "2023-10-12T16:30:00Z",
    lastUpdated: "2023-10-12T16:30:00Z",
    assignedTo: "Unassigned",
  },
  {
    id: "APP-005",
    name: "Michael Johnson",
    type: "Food Assistance",
    status: "in-review",
    priority: "medium",
    submittedDate: "2023-10-11T11:00:00Z",
    lastUpdated: "2023-10-15T09:10:00Z",
    assignedTo: "David Wilson",
  },
  {
    id: "APP-006",
    name: "Sophia Williams",
    type: "Utility Assistance",
    status: "approved",
    priority: "medium",
    submittedDate: "2023-10-09T10:20:00Z",
    lastUpdated: "2023-10-13T14:30:00Z",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "APP-007",
    name: "James Brown",
    type: "Food Assistance",
    status: "pending",
    priority: "high",
    submittedDate: "2023-10-13T08:45:00Z",
    lastUpdated: "2023-10-13T08:45:00Z",
    assignedTo: "Unassigned",
  },
  {
    id: "APP-008",
    name: "Olivia Martinez",
    type: "Financial Support",
    status: "rejected",
    priority: "low",
    submittedDate: "2023-10-08T13:15:00Z",
    lastUpdated: "2023-10-12T11:40:00Z",
    assignedTo: "David Wilson",
  },
];

// Analytics data
const statusData = [
  { name: "Pending", value: 3, color: "#f59e0b" },
  { name: "In Review", value: 1, color: "#3b82f6" },
  { name: "Approved", value: 2, color: "#10b981" },
  { name: "Rejected", value: 2, color: "#ef4444" },
];

const typeData = [
  { name: "Housing", value: 2, color: "#8b5cf6" },
  { name: "Financial", value: 2, color: "#06b6d4" },
  { name: "Food", value: 2, color: "#84cc16" },
  { name: "Emergency", value: 1, color: "#f43f5e" },
  { name: "Utility", value: 1, color: "#6366f1" },
];

const timelineData = [
  { name: "Week 1", pending: 2, approved: 1, rejected: 0 },
  { name: "Week 2", pending: 1, approved: 1, rejected: 1 },
  { name: "Week 3", pending: 3, approved: 2, rejected: 1 },
  { name: "Week 4", pending: 2, approved: 3, rejected: 2 },
];

// Chart configuration
const chartConfig = {
  pending: { label: "Pending", color: "#f59e0b" },
  approved: { label: "Approved", color: "#10b981" },
  rejected: { label: "Rejected", color: "#ef4444" },
};

const AdminApplications = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const itemsPerPage = 5;

  // Handle filters
  const filteredApplications = mockApplications.filter((app) => {
    // Search by name or ID
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    // Filter by type
    const matchesType = 
      typeFilter === "all" || 
      app.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    // Filter by priority
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter;
    
    // Filter by assignee
    const matchesAssignee = 
      assigneeFilter === "all" || 
      (assigneeFilter === "unassigned" && app.assignedTo === "Unassigned") ||
      (assigneeFilter !== "unassigned" && app.assignedTo.includes(assigneeFilter));
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesAssignee;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "text-green-800 bg-green-100";
      case "rejected": return "text-red-800 bg-red-100";
      case "pending": return "text-amber-800 bg-amber-100";
      case "in-review": return "text-blue-800 bg-blue-100";
      default: return "text-gray-800 bg-gray-100";
    }
  };

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending": return <Clock className="h-4 w-4 text-amber-600" />;
      case "in-review": return <HelpCircle className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-800 bg-red-50";
      case "medium": return "text-amber-800 bg-amber-50";
      case "low": return "text-green-800 bg-green-50";
      default: return "text-gray-800 bg-gray-50";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Export data as CSV
  const exportToCSV = () => {
    // In a real application, this would create and download a CSV file
    toast.success("Report downloaded successfully", {
      description: "Application data has been exported as CSV"
    });
  };

  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="Application Management" 
        description="View, filter, and manage assistance applications" 
      />

      {/* Filters Section */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle>Application Filters</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={showAnalytics ? "bg-blue-50" : ""}
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                {showAnalytics ? "Hide Analytics" : "Show Analytics"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportToCSV}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by name or ID"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  <SelectItem value="Sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="David">David Wilson</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Applied filters pills */}
          {(statusFilter !== "all" || typeFilter !== "all" || priorityFilter !== "all" || assigneeFilter !== "all") && (
            <div className="flex flex-wrap gap-2 mt-2">
              {statusFilter !== "all" && (
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                  Status: {statusFilter}
                  <button 
                    className="ml-1 hover:text-blue-900" 
                    onClick={() => setStatusFilter("all")}
                  >
                    ×
                  </button>
                </div>
              )}
              {typeFilter !== "all" && (
                <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                  Type: {typeFilter}
                  <button 
                    className="ml-1 hover:text-purple-900" 
                    onClick={() => setTypeFilter("all")}
                  >
                    ×
                  </button>
                </div>
              )}
              {priorityFilter !== "all" && (
                <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center">
                  Priority: {priorityFilter}
                  <button 
                    className="ml-1 hover:text-amber-900" 
                    onClick={() => setPriorityFilter("all")}
                  >
                    ×
                  </button>
                </div>
              )}
              {assigneeFilter !== "all" && (
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  Assignee: {assigneeFilter === "unassigned" ? "Unassigned" : assigneeFilter}
                  <button 
                    className="ml-1 hover:text-green-900" 
                    onClick={() => setAssigneeFilter("all")}
                  >
                    ×
                  </button>
                </div>
              )}
              <button 
                className="text-xs text-gray-600 underline hover:text-gray-900"
                onClick={() => {
                  setStatusFilter("all");
                  setTypeFilter("all");
                  setPriorityFilter("all");
                  setAssigneeFilter("all");
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Section */}
      {showAnalytics && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Analytics</CardTitle>
            <CardDescription>
              Overview of application metrics and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Status Distribution */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Status Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Application Types */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Application Types</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Application Timeline */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Application Timeline</h3>
                <div className="h-64">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                      <Bar dataKey="approved" fill="#10b981" name="Approved" />
                      <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Applications</CardTitle>
            <p className="text-sm text-gray-500">
              Showing {Math.min(filteredApplications.length, indexOfFirstItem + 1)}-
              {Math.min(indexOfLastItem, filteredApplications.length)} of {filteredApplications.length} applications
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                  setPriorityFilter("all");
                  setAssigneeFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.name}</TableCell>
                      <TableCell>{application.type}</TableCell>
                      <TableCell>
                        <div className={`flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getPriorityColor(application.priority)}`}>
                          {application.priority}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(application.submittedDate)}</TableCell>
                      <TableCell>{application.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {filteredApplications.length > 0 && totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
};

export default AdminApplications;
