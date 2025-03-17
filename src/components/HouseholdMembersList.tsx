
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, X, UserMinus } from "lucide-react";

interface HouseholdMember {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  age: string;
  isDependent: boolean;
}

interface HouseholdMembersListProps {
  value: HouseholdMember[];
  onChange: (members: HouseholdMember[]) => void;
  className?: string;
}

const relationshipOptions = [
  "Spouse/Partner",
  "Child",
  "Parent",
  "Sibling",
  "Grandparent",
  "Grandchild",
  "Other relative",
  "Roommate",
  "Other non-relative"
];

const HouseholdMembersList: React.FC<HouseholdMembersListProps> = ({
  value = [],
  onChange,
  className
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Omit<HouseholdMember, "id">>({
    firstName: "",
    lastName: "",
    relationship: "",
    age: "",
    isDependent: false
  });

  const addMember = () => {
    if (newMember.firstName && newMember.lastName && newMember.relationship && newMember.age) {
      const member: HouseholdMember = {
        ...newMember,
        id: Date.now().toString()
      };
      
      onChange([...value, member]);
      setNewMember({
        firstName: "",
        lastName: "",
        relationship: "",
        age: "",
        isDependent: false
      });
      setIsAdding(false);
    }
  };

  const removeMember = (id: string) => {
    onChange(value.filter(member => member.id !== id));
  };

  const toggleDependent = (id: string) => {
    onChange(
      value.map(member => 
        member.id === id ? { ...member, isDependent: !member.isDependent } : member
      )
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium text-form-label flex items-center">
          <Users className="h-4 w-4 mr-2 text-redcross" />
          Household Members
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 text-sm border-redcross/30 hover:bg-redcross/5 hover:text-redcross transition-colors"
          disabled={isAdding}
        >
          <UserPlus className="h-3.5 w-3.5" />
          Add Member
        </Button>
      </div>

      {value.length === 0 && !isAdding && (
        <div className="text-center py-6 border-2 border-dashed rounded-lg bg-gray-50">
          <Users className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No household members added</p>
          <p className="text-sm text-gray-400 mt-1">Click "Add Member" to add people living in your household</p>
        </div>
      )}

      {isAdding && (
        <div className="border rounded-lg p-4 bg-gray-50 animate-fade-in space-y-4">
          <h4 className="font-medium text-gray-800">Add Household Member</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={newMember.firstName}
                onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                placeholder="First name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={newMember.lastName}
                onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                placeholder="Last name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                value={newMember.age}
                onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                placeholder="Age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship to Applicant</Label>
              <Select
                value={newMember.relationship}
                onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}
              >
                <SelectTrigger id="relationship">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDependent"
              checked={newMember.isDependent}
              onChange={(e) => setNewMember({ ...newMember, isDependent: e.target.checked })}
              className="h-4 w-4 mr-2 rounded border-gray-300 text-redcross focus:ring-redcross"
            />
            <Label htmlFor="isDependent" className="text-sm font-normal cursor-pointer">
              This person is a dependent (minor child, elderly, or disabled dependent)
            </Label>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={addMember}
              disabled={!newMember.firstName || !newMember.lastName || !newMember.relationship || !newMember.age}
              className="bg-redcross hover:bg-redcross-dark text-white"
            >
              Add Member
            </Button>
          </div>
        </div>
      )}
      
      {value.length > 0 && (
        <div className="space-y-3 mt-2">
          {value.map((member) => (
            <div 
              key={member.id} 
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-redcross/30 transition-colors"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{member.firstName} {member.lastName}</p>
                  {member.isDependent && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Dependent
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-4">
                  <span>{member.relationship}</span>
                  <span>•</span>
                  <span>Age: {member.age}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleDependent(member.id)}
                  className={`p-1.5 rounded-full text-xs ${
                    member.isDependent
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                  title={member.isDependent ? "Remove dependent status" : "Mark as dependent"}
                >
                  {member.isDependent ? "Dependent" : "Not Dependent"}
                </button>
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  title="Remove member"
                >
                  <UserMinus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {value.length > 0 && (
        <div className="pt-2">
          <p className="text-sm text-gray-600">
            Total Household Size: <span className="font-semibold">{value.length + 1}</span> (including yourself)
          </p>
          {value.filter(m => m.isDependent).length > 0 && (
            <p className="text-sm text-gray-600">
              Dependents: <span className="font-semibold">{value.filter(m => m.isDependent).length}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HouseholdMembersList;
