import React, { useState } from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, UserCircle, Clock, CheckCircle, AlertTriangle, ChevronDown, ArrowUpDown, Calendar, Briefcase, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NewCaseForm } from "@/components/admin/NewCaseForm";

// Sample data - would typically come from an API
const caseData = {
  active: [
    { id: "C-1042", name: "Jane Doe", type: "Housing Assistance", status: "In Progress", lastUpdate: "2 days ago", priority: "High", assignedTo: "Sarah Johnson", createdAt: "2023-10-15", notes: "Client needs urgent housing support due to eviction notice. Following up with local resources." },
    { id: "C-1039", name: "John Smith", type: "Financial Aid", status: "In Progress", lastUpdate: "3 days ago", priority: "Medium", assignedTo: "Michael Brown", createdAt: "2023-10-12", notes: "Client struggling with utility bills. Referred to emergency assistance program." },
    { id: "C-1036", name: "Maria Garcia", type: "Food Assistance", status: "In Progress", lastUpdate: "1 week ago", priority: "Medium", assignedTo: "Sarah Johnson", createdAt: "2023-10-08", notes: "Client needs food assistance for family of 4. Connected with local food bank." },
    { id: "C-1033", name: "Robert Johnson", type: "Job Placement", status: "Pending Review", lastUpdate: "5 days ago", priority: "Low", assignedTo: "David Wilson", createdAt: "2023-10-10", notes: "Client seeking employment assistance. Resume review scheduled." },
    { id: "C-1030", name: "Alice Williams", type: "Healthcare Access", status: "Pending Documentation", lastUpdate: "Yesterday", priority: "High", assignedTo: "Emma Davis", createdAt: "2023-10-18", notes: "Client needs medical care but lacks insurance. Working on Medicaid application." }
  ],
  pending: [
    { id: "C-1028", name: "Thomas Lee", type: "Utility Assistance", status: "Awaiting Interview", lastUpdate: "1 day ago", priority: "Medium", assignedTo: "Sarah Johnson", createdAt: "2023-10-17", notes: "Client applied for utility assistance. Interview scheduled for next week." },
    { id: "C-1025", name: "Emily Davis", type: "Childcare Voucher", status: "Document Verification", lastUpdate: "4 days ago", priority: "Medium", assignedTo: "Michael Brown", createdAt: "2023-10-14", notes: "Waiting on proof of income documentation from client." },
    { id: "C-1022", name: "James Wilson", type: "Rental Assistance", status: "Pending Approval", lastUpdate: "2 days ago", priority: "High", assignedTo: "Emma Davis", createdAt: "2023-10-16", notes: "Application complete. Waiting for program manager approval." }
  ],
  completed: [
    { id: "C-1019", name: "Sophia Martinez", type: "Housing Assistance", status: "Approved", lastUpdate: "1 week ago", priority: "Medium", assignedTo: "David Wilson", createdAt: "2023-10-05", resolution: "Successfully placed in transitional housing program.", notes: "Client successfully housed in transitional program. Follow-up in 30 days." },
    { id: "C-1016", name: "Daniel Taylor", type: "Food Assistance", status: "Completed", lastUpdate: "2 weeks ago", priority: "Low", assignedTo: "Sarah Johnson", createdAt: "2023-09-30", resolution: "Provided emergency food supply and SNAP application assistance.", notes: "Client received emergency food assistance and help with SNAP application." }
  ],
  all: [] // Will combine all cases
};

// Combine all cases for the "All" tab
caseData.all = [...caseData.active, ...caseData.pending, ...caseData.completed];

const MyCases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [newCaseDialogOpen, setNewCaseDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priority: [],
    type: [],
    status: []
  });
  
  // Filter cases based on search term and active filters
  const filterCases = (cases) => {
    return cases.filter(caseItem => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        caseItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Priority filter
      const matchesPriority = activeFilters.priority.length === 0 || 
        activeFilters.priority.includes(caseItem.priority);
      
      // Type filter
      const matchesType = activeFilters.type.length === 0 || 
        activeFilters.type.includes(caseItem.type);
      
      // Status filter
      const matchesStatus = activeFilters.status.length === 0 || 
        activeFilters.status.includes(caseItem.status);
      
      return matchesSearch && matchesPriority && matchesType && matchesStatus;
    });
  };

  // Handler for filter toggling
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else {
        updatedFilters[category] = [...updatedFilters[category], value];
      }
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      priority: [],
      type: [],
      status: []
    });
    setSearchTerm('');
  };

  const openCaseDetails = (caseItem) => {
    setSelectedCase(caseItem);
  };

  // Extract unique values for filter dropdowns
  const uniqueTypes = [...new Set(caseData.all.map(item => item.type))];
  const uniqueStatuses = [...new Set(caseData.all.map(item => item.status))];
  const priorityLevels = ["High", "Medium", "Low"];

  // Render case card component
  const renderCaseCard = (caseItem) => (
    <div 
      key={caseItem.id} 
      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md cursor-pointer"
      onClick={() => openCaseDetails(caseItem)}
    >
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 p-2 rounded-full">
          <UserCircle className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{caseItem.name}</p>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{caseItem.id}</span>
            {caseItem.priority === "High" && (
              <Badge variant="destructive" className="text-xs bg-red-100 text-red-800 px-2 py-1">High Priority</Badge>
            )}
            {caseItem.priority === "Medium" && (
              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1">Medium Priority</Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{caseItem.type}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">
            {caseItem.status === "In Progress" && <span className="flex items-center text-blue-600"><Clock className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
            {caseItem.status === "Pending Review" && <span className="flex items-center text-yellow-600"><Clock className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
            {caseItem.status === "Completed" && <span className="flex items-center text-green-600"><CheckCircle className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
            {caseItem.status === "Approved" && <span className="flex items-center text-green-600"><CheckCircle className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
            {caseItem.status === "Pending Documentation" && <span className="flex items-center text-orange-600"><AlertTriangle className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
            {caseItem.status === "Awaiting Interview" && <span className="flex items-center text-purple-600"><Calendar className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
            {caseItem.status === "Document Verification" && <span className="flex items-center text-indigo-600"><Briefcase className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
            {caseItem.status === "Pending Approval" && <span className="flex items-center text-yellow-600"><Clock className="h-3 w-3 mr-1" /> {caseItem.status}</span>}
          </p>
          <p className="text-xs text-gray-500">Updated {caseItem.lastUpdate}</p>
        </div>
        <Button size="sm" variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100">
          View Details
        </Button>
      </div>
    </div>
  );

  // Filter component
  const FilterComponent = () => (
    <Card className="w-full mb-6 border-blue-100">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-sm mb-2">Priority</h3>
            <div className="space-y-2">
              {priorityLevels.map(priority => (
                <div key={priority} className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id={`priority-${priority}`}
                    checked={activeFilters.priority.includes(priority)}
                    onChange={() => toggleFilter('priority', priority)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`priority-${priority}`} className="text-sm">
                    {priority}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Case Type</h3>
            <div className="space-y-2">
              {uniqueTypes.map(type => (
                <div key={type} className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id={`type-${type}`}
                    checked={activeFilters.type.includes(type)}
                    onChange={() => toggleFilter('type', type)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`type-${type}`} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Status</h3>
            <div className="space-y-2">
              {uniqueStatuses.map(status => (
                <div key={status} className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id={`status-${status}`}
                    checked={activeFilters.status.includes(status)}
                    onChange={() => toggleFilter('status', status)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`status-${status}`} className="text-sm">
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Cases</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cases..."
                className="pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline"
              className={`${filterOpen ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-md`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className={`h-5 w-5 ${filterOpen ? 'text-blue-700' : 'text-gray-700'}`} />
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setNewCaseDialogOpen(true)}
            >
              New Case
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Cases</p>
                  <p className="text-2xl font-bold">{caseData.all.length}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <UserCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200 hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">In Progress</p>
                  <p className="text-2xl font-bold">{caseData.active.filter(c => c.status === "In Progress").length}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold">{caseData.completed.length}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-200 hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Requires Attention</p>
                  <p className="text-2xl font-bold">{caseData.all.filter(c => c.priority === "High").length}</p>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {filterOpen && <FilterComponent />}

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="active">Active Cases</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Cases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Cases</CardTitle>
                    <CardDescription>Cases currently being processed.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterCases(caseData.active).length > 0 ? (
                    filterCases(caseData.active).map(caseItem => renderCaseCard(caseItem))
                  ) : (
                    <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
                      No active cases match your filters. Try adjusting your search criteria.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Pending Cases</CardTitle>
                    <CardDescription>Cases awaiting action or documentation.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterCases(caseData.pending).length > 0 ? (
                    filterCases(caseData.pending).map(caseItem => renderCaseCard(caseItem))
                  ) : (
                    <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
                      No pending cases match your filters. Try adjusting your search criteria.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Completed Cases</CardTitle>
                    <CardDescription>Successfully resolved cases.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterCases(caseData.completed).length > 0 ? (
                    filterCases(caseData.completed).map(caseItem => renderCaseCard(caseItem))
                  ) : (
                    <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
                      No completed cases match your filters. Try adjusting your search criteria.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>All Cases</CardTitle>
                    <CardDescription>Complete case history.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterCases(caseData.all).length > 0 ? (
                      filterCases(caseData.all).map(caseItem => (
                        <TableRow key={caseItem.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openCaseDetails(caseItem)}>
                          <TableCell className="font-medium">{caseItem.id}</TableCell>
                          <TableCell>{caseItem.name}</TableCell>
                          <TableCell>{caseItem.type}</TableCell>
                          <TableCell>
                            {caseItem.status === "In Progress" && <Badge variant="default" className="bg-blue-100 text-blue-800">In Progress</Badge>}
                            {caseItem.status === "Pending Review" && <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>}
                            {caseItem.status === "Completed" && <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>}
                            {caseItem.status === "Approved" && <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>}
                            {caseItem.status === "Pending Documentation" && <Badge variant="default" className="bg-orange-100 text-orange-800">Pending Documentation</Badge>}
                            {caseItem.status === "Awaiting Interview" && <Badge variant="default" className="bg-purple-100 text-purple-800">Awaiting Interview</Badge>}
                            {caseItem.status === "Document Verification" && <Badge variant="default" className="bg-indigo-100 text-indigo-800">Document Verification</Badge>}
                            {caseItem.status === "Pending Approval" && <Badge variant="default" className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>}
                          </TableCell>
                          <TableCell>
                            {caseItem.priority === "High" && <Badge variant="destructive">High</Badge>}
                            {caseItem.priority === "Medium" && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>}
                            {caseItem.priority === "Low" && <Badge variant="outline" className="bg-gray-100 text-gray-800">Low</Badge>}
                          </TableCell>
                          <TableCell>{caseItem.lastUpdate}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700">View</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center p-8 text-gray-500">
                          No cases match your filters. Try adjusting your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Case Detail Sheet */}
      <Sheet open={selectedCase !== null} onOpenChange={() => setSelectedCase(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedCase && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex justify-between items-center">
                  <SheetTitle className="text-xl">{selectedCase.name}</SheetTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCase(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <SheetDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{selectedCase.id}</Badge>
                    {selectedCase.priority === "High" && <Badge variant="destructive">High Priority</Badge>}
                  </div>
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500 text-xs">Case Type</Label>
                    <p className="font-medium">{selectedCase.type}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-xs">Status</Label>
                    <p className="font-medium">{selectedCase.status}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-xs">Created Date</Label>
                    <p className="font-medium">{selectedCase.createdAt}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-xs">Last Updated</Label>
                    <p className="font-medium">{selectedCase.lastUpdate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-xs">Assigned To</Label>
                    <p className="font-medium">{selectedCase.assignedTo}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-xs">Priority</Label>
                    <p className="font-medium">{selectedCase.priority}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-500 text-xs">Case Notes</Label>
                  <div className="bg-gray-50 p-3 rounded-md mt-1">
                    <p className="text-sm">{selectedCase.notes}</p>
                  </div>
                </div>
                
                {selectedCase.resolution && (
                  <div>
                    <Label className="text-gray-500 text-xs">Resolution</Label>
                    <div className="bg-green-50 p-3 rounded-md mt-1">
                      <p className="text-sm">{selectedCase.resolution}</p>
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                        <Briefcase className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Case created</p>
                        <p className="text-xs text-gray-500">{selectedCase.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-yellow-100 text-yellow-800 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status updated to {selectedCase.status}</p>
                        <p className="text-xs text-gray-500">{selectedCase.lastUpdate}</p>
                      </div>
                    </div>
                    {selectedCase.status === "Completed" || selectedCase.status === "Approved" ? (
                      <div className="flex gap-3">
                        <div className="bg-green-100 text-green-800 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Case resolved</p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              
              <SheetFooter className="mt-6">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">Add Note</Button>
                  <Button variant="default" className="flex-1">Update Status</Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* New Case Dialog */}
      <Dialog open={newCaseDialogOpen} onOpenChange={setNewCaseDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0">
          <NewCaseForm onCancel={() => setNewCaseDialogOpen(false)} />
        </DialogContent>
      </Dialog
