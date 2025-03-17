
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface EmergencyContactInfo {
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface EmergencyContactProps {
  value: EmergencyContactInfo;
  onChange: (contact: EmergencyContactInfo) => void;
  showAddressFields?: boolean;
  className?: string;
}

const relationshipOptions = [
  "Spouse/Partner",
  "Parent",
  "Child",
  "Sibling",
  "Other relative",
  "Friend",
  "Neighbor",
  "Caregiver",
  "Other"
];

const EmergencyContact: React.FC<EmergencyContactProps> = ({
  value,
  onChange,
  showAddressFields = false,
  className
}) => {
  const handleChange = (field: keyof EmergencyContactInfo, val: string) => {
    onChange({ ...value, [field]: val });
  };

  const toggleAddressFields = () => {
    // This function would be used if we want to make the address fields optional
    // For now, they're controlled by the showAddressFields prop
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center mb-1">
        <AlertCircle className="h-4 w-4 mr-2 text-redcross" />
        <Label className="text-base font-medium text-form-label">Emergency Contact</Label>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ec-firstName" className="text-sm">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ec-firstName"
              value={value.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="First name"
              className="bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ec-lastName" className="text-sm">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ec-lastName"
              value={value.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Last name"
              className="bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ec-relationship" className="text-sm">
              Relationship <span className="text-red-500">*</span>
            </Label>
            <Select
              value={value.relationship}
              onValueChange={(val) => handleChange("relationship", val)}
            >
              <SelectTrigger id="ec-relationship" className="bg-white">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ec-phone" className="text-sm">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ec-phone"
              type="tel"
              value={value.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(123) 456-7890"
              className="bg-white"
            />
          </div>
        </div>
        
        {showAddressFields && (
          <div className="pt-2 border-t border-gray-200 mt-4">
            <p className="text-sm font-medium mb-3">Emergency Contact Address (Optional)</p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ec-address" className="text-sm">Address</Label>
                <Input
                  id="ec-address"
                  value={value.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Street address"
                  className="bg-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ec-city" className="text-sm">City</Label>
                  <Input
                    id="ec-city"
                    value={value.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="City"
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ec-state" className="text-sm">State</Label>
                  <Input
                    id="ec-state"
                    value={value.state || ""}
                    onChange={(e) => handleChange("state", e.target.value)}
                    placeholder="State"
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ec-zipCode" className="text-sm">ZIP Code</Label>
                  <Input
                    id="ec-zipCode"
                    value={value.zipCode || ""}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    placeholder="ZIP Code"
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 italic">
          Your emergency contact may be notified in case we cannot reach you or in emergency situations.
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
