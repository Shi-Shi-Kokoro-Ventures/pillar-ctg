
import React from 'react';
import { TeamMember } from './TeamMemberForm';
import { GitBranch, Users, User } from 'lucide-react';

interface TeamStructureViewProps {
  members: TeamMember[];
}

interface TeamNode {
  id: string;
  name: string;
  role: string;
  department: string;
  children: TeamNode[];
}

const TeamStructureView = ({ members }: TeamStructureViewProps) => {
  // Organize members into a hierarchical structure
  const buildOrgChart = (members: TeamMember[]): TeamNode[] => {
    const adminMembers = members.filter(m => m.role === 'admin');
    const managerMembers = members.filter(m => m.role === 'manager');
    const workerMembers = members.filter(m => m.role === 'case-worker');
    const viewerMembers = members.filter(m => m.role === 'viewer');
    
    // Group managers by department
    const departments = [...new Set(managerMembers.map(m => m.department))];
    
    // Create admin level nodes
    return adminMembers.map(admin => ({
      id: admin.id,
      name: admin.name,
      role: admin.role,
      department: admin.department,
      children: departments.map(dept => {
        const deptManagers = managerMembers.filter(m => m.department === dept);
        return deptManagers.length > 0 ? {
          id: `dept-${dept}`,
          name: dept,
          role: 'department',
          department: dept,
          children: deptManagers.map(manager => ({
            id: manager.id,
            name: manager.name,
            role: manager.role,
            department: manager.department,
            children: workerMembers
              .filter(w => w.department === dept)
              .map(worker => ({
                id: worker.id,
                name: worker.name,
                role: worker.role,
                department: worker.department,
                children: []
              }))
          }))
        } : {
          id: `dept-${dept}`,
          name: dept,
          role: 'department',
          department: dept,
          children: workerMembers
            .filter(w => w.department === dept)
            .map(worker => ({
              id: worker.id,
              name: worker.name,
              role: worker.role,
              department: worker.department,
              children: []
            }))
        };
      })
    }));
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Users className="h-4 w-4 text-purple-700" />;
      case 'manager':
        return <Users className="h-4 w-4 text-blue-700" />;
      case 'case-worker':
        return <User className="h-4 w-4 text-green-700" />;
      case 'viewer':
        return <User className="h-4 w-4 text-gray-700" />;
      case 'department':
        return <GitBranch className="h-4 w-4 text-gray-700" />;
      default:
        return <User className="h-4 w-4 text-gray-700" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'border-purple-300 bg-purple-50';
      case 'manager':
        return 'border-blue-300 bg-blue-50';
      case 'case-worker':
        return 'border-green-300 bg-green-50';
      case 'viewer':
        return 'border-gray-300 bg-gray-50';
      case 'department':
        return 'border-orange-300 bg-orange-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const TreeNode = ({ node }: { node: TeamNode }) => (
    <div className="flex flex-col items-center">
      <div className={`p-2 border rounded-lg ${getRoleColor(node.role)} flex items-center gap-2 min-w-40`}>
        {getRoleIcon(node.role)}
        <div>
          <p className="font-medium text-sm">{node.name}</p>
          {node.role !== 'department' && (
            <p className="text-xs text-gray-500">
              {node.role === 'admin' ? 'Administrator' : 
               node.role === 'manager' ? 'Manager' : 
               node.role === 'case-worker' ? 'Case Worker' : 'Viewer'}
            </p>
          )}
        </div>
      </div>
      
      {node.children.length > 0 && (
        <div className="h-5 w-0.5 bg-gray-300"></div>
      )}
      
      {node.children.length > 0 && (
        <div className="pt-1">
          <div className="flex flex-wrap justify-center gap-4">
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const chartData = buildOrgChart(members);

  // If we don't have members with admin role, create a flattened view
  const flattenedView = chartData.length === 0;

  return (
    <div className="w-full p-6 overflow-x-auto">
      {members.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No team members to display</p>
        </div>
      ) : flattenedView ? (
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <div className={`p-2 border rounded-lg border-blue-300 bg-blue-50 flex items-center gap-2`}>
              <Users className="h-4 w-4 text-blue-700" />
              <p className="font-medium">Organization</p>
            </div>
          </div>
          <div className="h-5 w-0.5 bg-gray-300"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {members.map(member => (
              <div key={member.id} className={`p-2 border rounded-lg ${getRoleColor(member.role)} flex items-center gap-2`}>
                {getRoleIcon(member.role)}
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">
                    {member.role === 'admin' ? 'Administrator' : 
                     member.role === 'manager' ? 'Manager' : 
                     member.role === 'case-worker' ? 'Case Worker' : 'Viewer'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          {chartData.map(node => (
            <TreeNode key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamStructureView;
