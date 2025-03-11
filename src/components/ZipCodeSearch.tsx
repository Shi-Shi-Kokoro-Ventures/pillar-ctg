
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ZipCodeSearchProps {
  onSearch: (zipCode: string) => void;
  isLoading?: boolean;
}

const ZipCodeSearch: React.FC<ZipCodeSearchProps> = ({ onSearch, isLoading = false }) => {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic zip code validation (5 digits)
    if (/^\d{5}$/.test(zipCode)) {
      onSearch(zipCode);
    } else {
      toast.error("Please enter a valid 5-digit zip code");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter zip code (e.g. 19801)"
            className="pl-10"
            maxLength={5}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <span className="mr-2">Searching</span>
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
            </>
          ) : (
            "Find Resources"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ZipCodeSearch;
