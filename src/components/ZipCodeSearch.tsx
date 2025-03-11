
import React, { useState, useEffect } from "react";
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
  const [csrfToken, setCsrfToken] = useState("");
  
  // Generate CSRF token on component mount
  useEffect(() => {
    // Simple CSRF token generation - in production, this should come from the server
    const token = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
    // Store token in localStorage for validation
    localStorage.setItem('csrfToken', token);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate CSRF token
    const storedToken = localStorage.getItem('csrfToken');
    if (csrfToken !== storedToken) {
      toast.error("Security validation failed. Please refresh the page and try again.");
      return;
    }
    
    // Rate limiting - prevent rapid submissions
    const lastSubmitTime = localStorage.getItem('lastZipSubmit');
    const currentTime = Date.now();
    if (lastSubmitTime && (currentTime - parseInt(lastSubmitTime)) < 1000) {
      toast.error("Please wait before submitting again");
      return;
    }
    
    // Basic zip code validation (5 digits)
    if (/^\d{5}$/.test(zipCode)) {
      // Record submission time for rate limiting
      localStorage.setItem('lastZipSubmit', currentTime.toString());
      // Sanitize input - ensure it's only digits
      const sanitizedZip = zipCode.replace(/[^\d]/g, '').substring(0, 5);
      onSearch(sanitizedZip);
    } else {
      toast.error("Please enter a valid 5-digit zip code");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input type="hidden" name="_csrf" value={csrfToken} />
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/[^\d]/g, '').substring(0, 5))}
            placeholder="Enter zip code (e.g. 19801)"
            className="pl-10"
            maxLength={5}
            aria-label="Zip code"
            autoComplete="postal-code"
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
