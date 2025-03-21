
import React, { useState } from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import RoleGuard from '@/components/auth/RoleGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, UsersRound, GitBranch, ChartBar } from 'lucide-react';
import { toast } from 'sonner';

// Import our new components
import TeamMemberForm, { TeamMember } from '@/components/team/TeamMemberForm';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import TeamStructureView from '@/components/team/TeamStructureView';
import TeamPerformanceMetrics from '@/components/team/TeamPerformanceMetrics';
import { useRolePermissions } from '@/hooks/useRolePermissions';

const TeamManagement = () => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
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

  const handleAddMember = (member: TeamMember) => {
    setTeamMembers([...teamMembers, member]);
    toast.success(`${member.name} has been added to the team.`);
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
  };

  const handleDeleteMember = (id: string) => {
    const memberToDelete = teamMembers.find(m => m.id === id);
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    if (memberToDelete) {
      toast.success(`${memberToDelete.name} has been removed from the team.`);
    }
  };

  const handleAssignCase = (id: string) => {
    // In a real application, this would open a case assignment dialog
    // For now, we'll just increment the case count for demonstration
    setTeamMembers(teamMembers.map(m => 
      m.id === id ? { ...m, activeCases: m.activeCases + 1 } : m
    ));
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      toast.success(`A new case has been assigned to ${member.name}.`);
    }
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                      <TeamMemberCard 
                        key={member.id} 
                        member={member}
                        onEdit={handleEditMember}
                        onDelete={handleDeleteMember}
                        onAssignCase={handleAssignCase}
                      />
                    ))}
                  </div>
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
    </AdminDashboardLayout>
  );
};

export default TeamManagement;
