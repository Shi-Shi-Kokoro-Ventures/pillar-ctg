
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ROLE_DEFINITIONS } from '@/types/user';
import { UserRound, Briefcase, Mail, Phone } from 'lucide-react';

interface TeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
  initialMember?: TeamMember;
  isEditing?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
  activeCases: number;
  avatar?: string;
}

const TeamMemberForm = ({ isOpen, onClose, onSave, initialMember, isEditing = false }: TeamMemberFormProps) => {
  const [member, setMember] = useState<TeamMember>(
    initialMember || {
      id: crypto.randomUUID(),
      name: '',
      email: '',
      phone: '',
      role: 'case-worker',
      department: 'Housing',
      activeCases: 0,
      avatar: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMember(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(member);
    onClose();
  };

  const roleOptions = Object.entries(ROLE_DEFINITIONS).map(([value, { name }]) => ({
    value,
    label: name
  }));

  const departmentOptions = [
    { value: 'Housing', label: 'Housing' },
    { value: 'Health', label: 'Health' },
    { value: 'Financial', label: 'Financial' },
    { value: 'Employment', label: 'Employment' },
    { value: 'Education', label: 'Education' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Team Member</DialogTitle>
          <DialogDescription>
            Fill in the details to {isEditing ? 'update' : 'add a new'} team member.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <UserRound className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={member.name}
                  onChange={handleChange}
                  required
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={member.email}
                  onChange={handleChange}
                  required
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(555) 123-4567"
                  value={member.phone}
                  onChange={handleChange}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <select
                    id="role"
                    name="role"
                    value={member.role}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <div className="relative">
                  <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <select
                    id="department"
                    name="department"
                    value={member.department}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {departmentOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="activeCases">Active Cases</Label>
                <Input
                  id="activeCases"
                  name="activeCases"
                  type="number"
                  min="0"
                  value={member.activeCases}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              {isEditing ? 'Update' : 'Add'} Member
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberForm;
