
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ZipCodeSearchProps {
  onSearch: (zipCode: string) => void;
  isLoading?: boolean;
}

// Define a schema for validation using Zod
const zipCodeSchema = z.object({
  zipCode: z.string()
    .min(5, "Please enter a 5-digit zip code")
    .max(5, "Zip code cannot be more than 5 digits")
    .regex(/^\d{5}$/, "Please enter a valid 5-digit zip code")
});

type ZipCodeFormValues = z.infer<typeof zipCodeSchema>;

const ZipCodeSearch: React.FC<ZipCodeSearchProps> = ({ onSearch, isLoading = false }) => {
  const [csrfToken, setCsrfToken] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);
  
  // Set up form with Zod validation
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch
  } = useForm<ZipCodeFormValues>({
    resolver: zodResolver(zipCodeSchema),
    defaultValues: {
      zipCode: ""
    }
  });

  // Watch the zipCode field to manage controlled input
  const zipCode = watch("zipCode");
  
  // Generate CSRF token on component mount
  useEffect(() => {
    // Use a cryptographically secure random token generator
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    const token = Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
    
    setCsrfToken(token);
    // Store token in sessionStorage for validation (more secure than localStorage)
    sessionStorage.setItem('csrfToken', token);
    
    // Clean up on unmount
    return () => {
      sessionStorage.removeItem('csrfToken');
    };
  }, []);

  // Handle input change to ensure only digits
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '').substring(0, 5);
    setValue("zipCode", value, { shouldValidate: true });
  };

  // Form submission handler
  const onSubmit = (data: ZipCodeFormValues) => {
    // Validate CSRF token
    const storedToken = sessionStorage.getItem('csrfToken');
    if (csrfToken !== storedToken) {
      toast.error("Security validation failed. Please refresh the page and try again.");
      return;
    }
    
    // Implement rate limiting
    const currentTime = Date.now();
    if (lastSubmitTime && (currentTime - lastSubmitTime) < 1000) {
      toast.error("Please wait before submitting again");
      return;
    }
    
    // Set submission time for rate limiting
    setLastSubmitTime(currentTime);
    
    // Sanitize input - ensure it's only digits
    const sanitizedZip = data.zipCode.replace(/[^\d]/g, '').substring(0, 5);
    onSearch(sanitizedZip);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full" 
      aria-label="Zip code search form"
      data-testid="zip-code-search-form"
    >
      <input type="hidden" name="_csrf" value={csrfToken} />
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            type="text"
            {...register("zipCode")}
            onChange={handleZipCodeChange}
            className={`pl-10 ${errors.zipCode ? 'border-red-500' : ''}`}
            placeholder="Enter zip code (e.g. 19801)"
            maxLength={5}
            aria-label="Zip code input"
            aria-required="true"
            aria-invalid={!!errors.zipCode}
            aria-describedby={errors.zipCode ? "zip-error" : undefined}
            autoComplete="postal-code"
            data-testid="zip-code-input"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true">
            <Search className="h-5 w-5" />
          </div>
          {errors.zipCode && (
            <div id="zip-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.zipCode.message}
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !!errors.zipCode || !zipCode}
          className="whitespace-nowrap"
          aria-busy={isLoading}
          data-testid="find-resources-button"
        >
          {isLoading ? (
            <>
              <span className="mr-2">Searching</span>
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" aria-hidden="true"></div>
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
