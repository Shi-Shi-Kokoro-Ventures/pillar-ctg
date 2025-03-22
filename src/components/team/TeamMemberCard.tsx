
import React, { useState } from 'react';
import { TeamMember } from './TeamMemberForm';
import { UsersRound, MoreVertical, UserCog, UserMinus, UserPlus, Eye } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  onAssignCase: (id: string) => void;
  onViewDetails?: (member: TeamMember) => void;
}

const TeamMemberCard = ({ 
  member, 
  onEdit, 
  onDelete, 
  onAssignCase, 
  onViewDetails 
}: TeamMemberCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      case 'case-worker':
        return 'bg-green-100 text-green-700';
      case 'viewer':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'manager':
        return 'Manager';
      case 'case-worker':
        return 'Case Worker';
      case 'viewer':
        return 'Viewer';
      default:
        return role;
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <UsersRound className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium">{member.name}</p>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${getRoleColor(member.role)}`}>
                  {getRoleName(member.role)}
                </span>
                <span className="text-xs text-gray-500">{member.department}</span>
              </div>
            </div>
          </div>

          <Popover open={showMenu} onOpenChange={setShowMenu}>
            <PopoverTrigger asChild>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Member options"
              >
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="end">
              <div className="flex flex-col">
                {onViewDetails && (
                  <button 
                    onClick={() => {
                      onViewDetails(member);
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 text-left text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                )}
                <button 
                  onClick={() => {
                    onEdit(member);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 text-left text-sm"
                >
                  <UserCog className="h-4 w-4" />
                  Edit Member
                </button>
                <button 
                  onClick={() => {
                    onAssignCase(member.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 text-left text-sm"
                >
                  <UserPlus className="h-4 w-4" />
                  Assign Case
                </button>
                <button 
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 text-red-600 text-left text-sm"
                >
                  <UserMinus className="h-4 w-4" />
                  Remove Member
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-500">{member.email}</p>
          {member.phone && <p className="text-sm text-gray-500">{member.phone}</p>}
          <p className="text-sm text-gray-600 mt-2">Active Cases: {member.activeCases}</p>
          
          <div className="mt-3 flex gap-2">
            <button 
              onClick={() => onViewDetails ? onViewDetails(member) : onEdit(member)} 
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              View Details
            </button>
            <button 
              onClick={() => onAssignCase(member.id)} 
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded"
            >
              Assign Case
            </button>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {member.name} from your team? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => onDelete(member.id)} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TeamMemberCard;
