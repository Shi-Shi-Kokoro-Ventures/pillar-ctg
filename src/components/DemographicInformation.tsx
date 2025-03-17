
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Info } from "lucide-react";

interface DemographicInformationProps {
  value: {
    race?: string;
    ethnicity?: string;
    gender?: string;
    disability?: boolean;
    veteran?: boolean;
    citizenship?: string;
  };
  onChange: (values: any) => void;
  className?: string;
}

const raceOptions = [
  { value: "american_indian", label: "American Indian or Alaska Native" },
  { value: "asian", label: "Asian" },
  { value: "black", label: "Black or African American" },
  { value: "pacific_islander", label: "Native Hawaiian or Other Pacific Islander" },
  { value: "white", label: "White" },
  { value: "multiracial", label: "Multiracial" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
];

const ethnicityOptions = [
  { value: "hispanic", label: "Hispanic or Latino" },
  { value: "not_hispanic", label: "Not Hispanic or Latino" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
];

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "transgender", label: "Transgender" },
  { value: "non_binary", label: "Non-binary" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
];

const citizenshipOptions = [
  { value: "us_citizen", label: "U.S. Citizen" },
  { value: "permanent_resident", label: "Permanent Resident" },
  { value: "temporary_visa", label: "Temporary Visa Holder" },
  { value: "refugee_asylee", label: "Refugee/Asylee" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
];

const DemographicInformation: React.FC<DemographicInformationProps> = ({
  value,
  onChange,
  className
}) => {
  const handleChange = (field: string, val: any) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-redcross" />
          <h2 className="text-xl font-semibold text-gray-800">Demographic Information</h2>
        </div>
        <button
          type="button"
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full"
          onClick={() => alert("This information is completely optional and is collected only for statistical and reporting purposes. It will not affect your eligibility for assistance.")}
        >
          <Info className="h-3 w-3" /> Why We Ask
        </button>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 mb-4 italic">
          All demographic questions are <strong>optional</strong> and used only for statistical reporting purposes. 
          Your responses (or decision not to respond) will not affect your eligibility for assistance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="race" className="text-sm flex items-center">
              Race <span className="text-xs text-gray-500 ml-1">(optional)</span>
            </Label>
            <Select
              value={value.race}
              onValueChange={(val) => handleChange("race", val)}
            >
              <SelectTrigger id="race" className="bg-white">
                <SelectValue placeholder="Select race" />
              </SelectTrigger>
              <SelectContent>
                {raceOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ethnicity" className="text-sm flex items-center">
              Ethnicity <span className="text-xs text-gray-500 ml-1">(optional)</span>
            </Label>
            <Select
              value={value.ethnicity}
              onValueChange={(val) => handleChange("ethnicity", val)}
            >
              <SelectTrigger id="ethnicity" className="bg-white">
                <SelectValue placeholder="Select ethnicity" />
              </SelectTrigger>
              <SelectContent>
                {ethnicityOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm flex items-center">
              Gender <span className="text-xs text-gray-500 ml-1">(optional)</span>
            </Label>
            <Select
              value={value.gender}
              onValueChange={(val) => handleChange("gender", val)}
            >
              <SelectTrigger id="gender" className="bg-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="citizenship" className="text-sm flex items-center">
              Citizenship Status <span className="text-xs text-gray-500 ml-1">(optional)</span>
            </Label>
            <Select
              value={value.citizenship}
              onValueChange={(val) => handleChange("citizenship", val)}
            >
              <SelectTrigger id="citizenship" className="bg-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {citizenshipOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-start space-x-3 p-2">
            <Checkbox
              id="disability"
              checked={value.disability}
              onCheckedChange={(checked) => handleChange("disability", checked === true)}
              className="mt-1"
            />
            <div>
              <Label htmlFor="disability" className="text-sm">
                Person with a disability <span className="text-xs text-gray-500 ml-1">(optional)</span>
              </Label>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-2">
            <Checkbox
              id="veteran"
              checked={value.veteran}
              onCheckedChange={(checked) => handleChange("veteran", checked === true)}
              className="mt-1"
            />
            <div>
              <Label htmlFor="veteran" className="text-sm">
                Veteran status <span className="text-xs text-gray-500 ml-1">(optional)</span>
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographicInformation;
