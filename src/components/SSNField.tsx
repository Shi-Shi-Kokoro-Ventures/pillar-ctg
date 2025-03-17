
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Shield, Info } from "lucide-react";

interface SSNFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const SSNField: React.FC<SSNFieldProps> = ({
  value,
  onChange,
  error,
  className
}) => {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const formatSSN = (input: string) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, '');
    
    // Format as XXX-XX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSSN(e.target.value);
    if (formatted.length <= 11) { // 11 chars in XXX-XX-XXXX
      onChange(formatted);
    }
  };

  // Mask the SSN for display when not visible
  const displayValue = visible ? value : value.replace(/[0-9]/g, '•');

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor="ssn" className="flex items-center text-sm font-medium text-gray-700">
          <Shield className="h-4 w-4 mr-2 text-redcross" />
          Social Security Number <span className="text-red-500 ml-1">*</span>
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => alert("Your SSN is required for identity verification purposes and may be required by funding sources. It is protected under our privacy policy and applicable federal laws.")}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 p-0 h-auto"
        >
          <Info className="h-3 w-3" /> Why do we need this?
        </Button>
      </div>
      
      <div className={`relative ${focused ? 'ring-2 ring-blue-500 rounded-md' : ''}`}>
        <Input
          id="ssn"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="XXX-XX-XXXX"
          className={`pr-10 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          maxLength={11}
          aria-describedby="ssn-description"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-0 text-gray-400 hover:text-gray-700"
          onClick={toggleVisibility}
          aria-label={visible ? "Hide SSN" : "Show SSN"}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex items-start bg-gray-50 p-3 rounded-md border border-gray-200 shadow-sm">
        <Shield className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
        <p id="ssn-description" className="text-xs text-gray-600 ml-2">
          Your SSN is securely encrypted and will only be used for verification purposes and as required by our funding sources.
        </p>
      </div>
    </div>
  );
};

export default SSNField;
