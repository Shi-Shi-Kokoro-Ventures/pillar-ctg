
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { Search, Filter, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
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
    ];
  };

  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  // Filter applications based on search term and status filter
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      searchTerm === "" ||
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === null || app.status === statusFilter;

    return matchesSearch && matchesStatus;
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

          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="w-full sm:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, ID or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <div className="flex gap-4 items-center w-full sm:w-auto">
              <Select
                value={statusFilter || ""}
                onValueChange={(value) => setStatusFilter(value === "" ? null : value)}
              >
                <SelectTrigger className="w-full sm:w-40">
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
              <Button variant="outline" onClick={handleExportCSV}>Export CSV</Button>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">Loading applications...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">Error loading applications</div>
            ) : sortedApplications.length === 0 ? (
              <div className="p-8 text-center">No applications found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("id")}
                      >
                        Application ID
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("lastName")}
                      >
                        Applicant Name
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("created_at")}
                      >
                        Submission Date
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("status")}
                      >
                        Status
                      </TableHead>
                      <TableHead>Assistance Types</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.id}</TableCell>
                        <TableCell>{`${application.firstName} ${application.lastName}`}</TableCell>
                        <TableCell>{formatDate(application.created_at)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace("-", " ")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {application.assistanceTypes.map((type) => (
                              <span key={type} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewApplicationDetails(application)}
                          >
                            <FileText className="h-4 w-4 mr-1" /> View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

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

                    {/* Household Members */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Household Members</h3>
                      {selectedApplication.householdMembers.length === 0 ? (
                        <p className="text-gray-500">No household members listed</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {selectedApplication.householdMembers.map((member) => (
                            <div key={member.id} className="bg-gray-50 p-3 rounded-md">
                              <p className="font-medium">{`${member.firstName} ${member.lastName}`}</p>
                              <p className="text-sm text-gray-500">{`${member.relationship} • DOB: ${formatDate(member.dateOfBirth)}`}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Emergency Contact */}
                    <div>
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

                    {/* Assistance Types */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Requested Assistance</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.assistanceTypes.map((type) => (
                          <span key={type} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="border-t pt-6 space-y-4">
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
