
import React, { useState, useMemo } from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import RoleGuard from '@/components/auth/RoleGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, UsersRound, GitBranch, ChartBar, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Import our components
import TeamMemberForm, { TeamMember } from '@/components/team/TeamMemberForm';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import TeamStructureView from '@/components/team/TeamStructureView';
import TeamPerformanceMetrics from '@/components/team/TeamPerformanceMetrics';
import TeamMemberDetails from '@/components/team/TeamMemberDetails';
import { useRolePermissions } from '@/hooks/useRolePermissions';

const TeamManagement = () => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [viewingMember, setViewingMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Sample team members data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '(555) 123-4567',
      role: 'manager',
      department: 'Housing',
      activeCases: 8,
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '(555) 234-5678',
      role: 'case-worker',
      department: 'Housing',
      activeCases: 12,
    },
    {
      id: '3',
      name: 'Aisha Patel',
      email: 'aisha.patel@example.com',
      phone: '(555) 345-6789',
      role: 'case-worker',
      department: 'Financial',
      activeCases: 9,
    },
    {
      id: '4',
      name: 'Robert Smith',
      email: 'robert.smith@example.com',
      phone: '(555) 456-7890',
      role: 'admin',
      department: 'Health',
      activeCases: 5,
    },
    {
      id: '5',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '(555) 567-8901',
      role: 'case-worker',
      department: 'Education',
      activeCases: 15,
    },
  ]);

  const { hasPermission } = useRolePermissions();
  const canManageTeam = hasPermission('manage_users');

  // Extract unique departments and roles for filters
  const departments = useMemo(() => ['all', ...new Set(teamMembers.map(m => m.department))], [teamMembers]);
  const roles = useMemo(() => ['all', ...new Set(teamMembers.map(m => m.role))], [teamMembers]);

  // Filter and paginate team members
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      
      return matchesSearch && matchesDepartment && matchesRole;
    });
  }, [teamMembers, searchQuery, departmentFilter, roleFilter]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const handleAddMember = (member: TeamMember) => {
    setTeamMembers([...teamMembers, member]);
    toast.success(`${member.name} has been added to the team.`);
  };

  const handleViewMember = (member: TeamMember) => {
    setViewingMember(member);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
  };

  const handleUpdateMember = (updatedMember: TeamMember) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === updatedMember.id ? updatedMember : m
    ));
    toast.success(`${updatedMember.name}'s information has been updated.`);
    setEditingMember(null);
    
    // Also update the viewing member if it's being edited
    if (viewingMember && viewingMember.id === updatedMember.id) {
      setViewingMember(updatedMember);
    }
  };

  const handleDeleteMember = (id: string) => {
    const memberToDelete = teamMembers.find(m => m.id === id);
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    if (memberToDelete) {
      toast.success(`${memberToDelete.name} has been removed from the team.`);
    }
    
    // Close the details view if the deleted member was being viewed
    if (viewingMember && viewingMember.id === id) {
      setViewingMember(null);
    }
  };

  const handleAssignCase = (id: string) => {
    // In a real application, this would open a case assignment dialog
    // For now, we'll just increment the case count for demonstration
    const updatedMembers = teamMembers.map(m => 
      m.id === id ? { ...m, activeCases: m.activeCases + 1 } : m
    );
    
    setTeamMembers(updatedMembers);
    
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      toast.success(`A new case has been assigned to ${member.name}.`);
      
      // Update the viewing member if it's being assigned a case
      if (viewingMember && viewingMember.id === id) {
        const updatedMember = updatedMembers.find(m => m.id === id);
        if (updatedMember) {
          setViewingMember(updatedMember);
        }
      }
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber: number;
            
            // Calculate page numbers to show
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
              if (i === 4) return (
                <PaginationItem key="ellipsis">
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
              if (i === 0) return (
                <PaginationItem key="ellipsis">
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else {
              if (i === 0) return (
                <PaginationItem key="ellipsis1">
                  <PaginationEllipsis />
                </PaginationItem>
              );
              if (i === 4) return (
                <PaginationItem key="ellipsis2">
                  <PaginationEllipsis />
                </PaginationItem>
              );
              pageNumber = currentPage - 1 + i;
            }
            
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={currentPage === pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <RoleGuard allowedRoles={['admin', 'manager']}>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAddMemberModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Add Team Member
              </button>
            </div>
          </RoleGuard>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="members" className="flex items-center gap-1">
              <UsersRound className="h-4 w-4" />
              <span>Team Members</span>
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-1">
              <GitBranch className="h-4 w-4" />
              <span>Team Structure</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <ChartBar className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>View and manage your team members.</CardDescription>
                
                {/* Search and filter controls */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by name or email"
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                      }}
                    />
                  </div>
                  
                  <Select 
                    value={departmentFilter} 
                    onValueChange={(value) => {
                      setDepartmentFilter(value);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                  >
                    <SelectTrigger className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept === 'all' ? 'All Departments' : dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={roleFilter} 
                    onValueChange={(value) => {
                      setRoleFilter(value);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                  >
                    <SelectTrigger className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role === 'all' ? 'All Roles' : 
                           role === 'admin' ? 'Administrator' : 
                           role === 'manager' ? 'Manager' : 
                           role === 'case-worker' ? 'Case Worker' : 
                           role === 'viewer' ? 'Viewer' : role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No team members found matching your filters.
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedMembers.map((member) => (
                          <TeamMemberCard 
                            key={member.id} 
                            member={member}
                            onEdit={handleEditMember}
                            onDelete={handleDeleteMember}
                            onAssignCase={handleAssignCase}
                            onViewDetails={handleViewMember}
                          />
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {renderPagination()}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="structure">
            <Card>
              <CardHeader>
                <CardTitle>Team Structure</CardTitle>
                <CardDescription>View your team's organizational structure.</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamStructureView members={teamMembers} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>View metrics and KPIs for your team.</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamPerformanceMetrics members={teamMembers} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <TeamMemberForm 
          isOpen={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          onSave={handleAddMember}
        />
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <TeamMemberForm 
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleUpdateMember}
          initialMember={editingMember}
          isEditing
        />
      )}
      
      {/* Member Details Modal */}
      {viewingMember && (
        <TeamMemberDetails
          isOpen={!!viewingMember}
          member={viewingMember}
          onClose={() => setViewingMember(null)}
          onEdit={() => {
            handleEditMember(viewingMember);
            setViewingMember(null);
          }}
          onAssignCase={() => handleAssignCase(viewingMember.id)}
        />
      )}
    </AdminDashboardLayout>
  );
};

export default TeamManagement;
