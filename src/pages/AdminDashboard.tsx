
import React, { useEffect, useState } from "react";
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
  DownloadIcon,
  SearchIcon,
  UserIcon,
  FileTextIcon,
  FilterIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Application } from "@/types/application";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch applications from Supabase
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*");
      
      if (error) {
        console.error("Error fetching applications:", error);
        throw new Error("Failed to fetch applications");
      }
      
      return data as Application[];
    },
  });

  // Filter applications based on search term and status
  const filteredApplications = applications
    ? applications.filter((app) => {
        const matchesSearch =
          search === "" ||
          `${app.firstName} ${app.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
          app.email.toLowerCase().includes(search.toLowerCase()) ||
          app.phone.includes(search);
        
        const matchesStatus = 
          statusFilter === "all" || 
          app.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
    : [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  // Export to CSV functionality
  const exportToCSV = () => {
    try {
      // Define CSV headers based on application properties
      const headers = [
        "ID",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Address",
        "City",
        "State",
        "Zip Code",
        "Date of Birth",
        "Status",
        "Created At",
      ];

      // Map application data to CSV rows
      const csvRows = [
        headers.join(","),
        ...filteredApplications.map((app) =>
          [
            app.id,
            app.firstName,
            app.lastName,
            app.email,
            app.phone,
            `"${app.address.replace(/"/g, '""')}"`, // Handle commas in addresses
            app.city,
            app.state,
            app.zipCode,
            app.dateOfBirth,
            app.status,
            new Date(app.created_at).toLocaleDateString(),
          ].join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `applications_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Successfully exported applications to CSV");
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      toast.error("Failed to export applications");
    }
  };

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "denied":
        return "bg-red-100 text-red-800";
      case "in-review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage and view all assistance applications
          </p>
        </header>

        {/* Controls Section */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name, email or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-review">In Review</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
            
            <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Applications Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-redcross"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">Failed to load applications. Please try again.</span>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
            <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
            <p className="text-gray-500">
              {search ? "Try adjusting your search criteria." : "There are no applications in the system yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <Table>
                <TableCaption>
                  Showing {currentItems.length} of {filteredApplications.length} applications
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        {application.firstName} {application.lastName}
                      </TableCell>
                      <TableCell>
                        <div>{application.email}</div>
                        <div className="text-gray-500 text-sm">{application.phone}</div>
                      </TableCell>
                      <TableCell>
                        {application.city}, {application.state}
                      </TableCell>
                      <TableCell>
                        {new Date(application.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // View details functionality can be added later
                            toast.info("View details feature coming soon");
                          }}
                        >
                          <FileTextIcon className="h-4 w-4" />
                        </Button>
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

        {/* Audit Information */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Information</h3>
          <p className="text-gray-600 text-sm">
            All data access and modifications are logged for compliance purposes. 
            Full audit logs and detailed reports will be available in future updates.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
