
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { 
  AlertCircle, 
  Upload, 
  X, 
  FileText, 
  UserCircle 
} from 'lucide-react';
import { toast } from 'sonner';

// Define form schema with Zod
const caseFormSchema = z.object({
  // Basic Information
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional().or(z.literal('')),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional().or(z.literal('')),
  dateOfBirth: z.string().optional(),
  ssn: z.string().optional().or(z.literal('')),
  
  // Case Details
  caseType: z.string().min(1, { message: "Please select a case type" }),
  priority: z.string().min(1, { message: "Please select a priority level" }),
  assignedTo: z.string().optional(),
  status: z.string().min(1, { message: "Please select a status" }),
  
  // Address
  streetAddress: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  zipCode: z.string().optional().or(z.literal('')),
  
  // Additional Information
  description: z.string().min(10, { message: "Please provide a detailed description (minimum 10 characters)" }),
  notes: z.string().optional().or(z.literal('')),
});

// Types based on the schema
type CaseFormValues = z.infer<typeof caseFormSchema>;

// Default values for the form
const defaultValues: Partial<CaseFormValues> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  caseType: "",
  priority: "Medium",
  status: "New",
  description: "",
  notes: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
};

// Mock data for dropdowns
const caseTypes = [
  "Housing Assistance", 
  "Financial Aid", 
  "Food Assistance", 
  "Healthcare Access",
  "Job Placement",
  "Utility Assistance",
  "Childcare Voucher",
  "Mental Health Services",
  "Legal Assistance",
  "Education Support"
];

const priorities = ["High", "Medium", "Low"];

const statuses = [
  "New", 
  "In Progress", 
  "Pending Documentation", 
  "Pending Review",
  "Pending Approval",
  "Document Verification",
  "Awaiting Interview",
  "Approved",
  "Completed",
  "Closed"
];

const caseWorkers = [
  "Sarah Johnson",
  "Michael Brown",
  "Emma Davis",
  "David Wilson",
  "Current User"
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

interface NewCaseFormProps {
  onCancel: () => void;
  onSubmit?: (data: CaseFormValues) => void;
}

export const NewCaseForm: React.FC<NewCaseFormProps> = ({ 
  onCancel, 
  onSubmit 
}) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Initialize form
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues,
    mode: "onChange",
  });
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Show success toast
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  };
  
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Handle form submission
  const handleSubmit = (values: CaseFormValues) => {
    // In a real app, you would handle the form data and file uploads here
    console.log("Form values:", values);
    console.log("Uploaded files:", uploadedFiles);
    
    // Show success message
    toast.success("Case created successfully!");
    
    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(values);
    }
    
    // Close the form
    onCancel();
  };
  
  // Navigation between tabs
  const goToNextTab = () => {
    if (activeTab === "basic") {
      form.trigger(["firstName", "lastName", "email", "phone", "dateOfBirth"]).then((isValid) => {
        if (isValid) setActiveTab("details");
        else toast.error("Please complete all required fields");
      });
    } else if (activeTab === "details") {
      form.trigger(["caseType", "priority", "status", "description"]).then((isValid) => {
        if (isValid) setActiveTab("address");
        else toast.error("Please complete all required fields");
      });
    } else if (activeTab === "address") {
      setActiveTab("documents");
    }
  };
  
  const goToPrevTab = () => {
    if (activeTab === "details") setActiveTab("basic");
    else if (activeTab === "address") setActiveTab("details");
    else if (activeTab === "documents") setActiveTab("address");
  };
  
  return (
    <div className="bg-background">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">New Case</CardTitle>
        <CardDescription>
          Create a new case by filling out the information below
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Case Details</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              {/* Basic Information Tab */}
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                    <CardDescription>
                      Enter the basic information about the client.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter email address"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter phone number"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="ssn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SSN (Last 4 digits)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter last 4 digits of SSN"
                                maxLength={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              For identification purposes only
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={goToNextTab}
                    >
                      Next: Case Details
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Case Details Tab */}
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Details</CardTitle>
                    <CardDescription>
                      Provide information about the case.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="caseType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Type <span className="text-red-500">*</span></FormLabel>
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select case type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {caseTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority <span className="text-red-500">*</span></FormLabel>
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {priorities.map((priority) => (
                                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="assignedTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assigned To</FormLabel>
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select case worker" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {caseWorkers.map((worker) => (
                                  <SelectItem key={worker} value={worker}>{worker}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status <span className="text-red-500">*</span></FormLabel>
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statuses.map((status) => (
                                  <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about the case"
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any additional notes or observations"
                              className="min-h-20"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={goToPrevTab}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={goToNextTab}
                    >
                      Next: Address
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Address Tab */}
              <TabsContent value="address">
                <Card>
                  <CardHeader>
                    <CardTitle>Address Information</CardTitle>
                    <CardDescription>
                      Enter the client's address details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter street address"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter city"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-60">
                                {states.map((state) => (
                                  <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter ZIP code"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={goToPrevTab}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={goToNextTab}
                    >
                      Next: Documents
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Supporting Documents</CardTitle>
                    <CardDescription>
                      Upload supporting documentation for this case.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <label htmlFor="file-upload" className="cursor-pointer block">
                        <div className="mx-auto flex justify-center mb-4">
                          <Upload className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium mb-1">Drag and drop files here, or click to browse</p>
                        <p className="text-xs text-gray-500 mb-4">
                          Supported file types: PDF, JPG, PNG, DOCX (Max 10MB each)
                        </p>
                        <Button variant="outline" type="button">
                          Select Files
                        </Button>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div 
                              key={index} 
                              className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                  {Math.round(file.size / 1024)} KB
                                </span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeFile(index)}
                                className="h-6 w-6 text-gray-500 hover:text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Important Information</h4>
                        <p className="text-sm text-blue-700">
                          All uploaded documents will be securely stored in compliance with data protection regulations. 
                          Case workers will have access to these documents for processing the client's case.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={goToPrevTab}
                    >
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Submit Case
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </form>
      </Form>
    </div>
  );
};
