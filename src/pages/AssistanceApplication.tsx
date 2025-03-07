import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, HelpCircle, Calendar, Info, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(4, "Last 4 digits of SSN required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  
  // Household Information
  householdSize: z.string().min(1, "Household size is required"),
  householdIncome: z.string().min(1, "Household income is required"),
  incomePeriod: z.string().min(1, "Income period is required"),
  
  // Current Housing Situation
  currentAddress: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  housingStatus: z.string().min(1, "Housing status is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  rentDue: z.string().optional(),
  evictionNotice: z.string().min(1, "Please select yes or no"),
  
  // Government Assistance
  receivingAssistance: z.string().min(1, "Please select yes or no"),
  assistanceTypes: z.string().optional(),
  
  // Emergency Contact
  emergencyName: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone is required"),
  emergencyRelation: z.string().min(1, "Relationship is required"),
  
  // Demographic Information (Required for government reporting)
  gender: z.string().min(1, "Gender is required for federal reporting"),
  ethnicity: z.string().min(1, "Ethnicity is required for federal reporting"),
  race: z.string().min(1, "Race is required for federal reporting"),
  veteran: z.string().min(1, "Veteran status is required for federal reporting"),
  disability: z.string().min(1, "Disability status is required for federal reporting"),
  
  // Required Documents
  identificationDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "Identification document is required"),
  proofOfIncomeDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "Proof of income document is required"),
  housingDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "Housing document is required"),
  additionalDocs: z.instanceof(FileList).optional(),
  
  // Certification - Changed from literal(true) to boolean() to fix type errors
  certifyTrue: z.boolean().refine(val => val === true, {
    message: "You must certify that information is true",
  }),
  consentToShare: z.boolean().refine(val => val === true, {
    message: "You must consent to share information",
  }),
});

const AssistanceApplication = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    identification: File[] | null,
    income: File[] | null,
    housing: File[] | null,
    additional: File[] | null
  }>({
    identification: null,
    income: null,
    housing: null,
    additional: null
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      ssn: "",
      phone: "",
      email: "",
      householdSize: "",
      householdIncome: "",
      incomePeriod: "",
      currentAddress: "",
      city: "",
      state: "",
      zip: "",
      housingStatus: "",
      monthlyRent: "",
      rentDue: "",
      evictionNotice: "",
      receivingAssistance: "",
      assistanceTypes: "",
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "",
      gender: "",
      ethnicity: "",
      race: "",
      veteran: "",
      disability: "",
      certifyTrue: false,
      consentToShare: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    
    // Append all form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
      } else {
        formData.append(key, value.toString());
      }
    });
    
    // Log FormData (for debugging)
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
    toast.success("Application submitted successfully! We'll contact you within 3-5 business days.");
  }

  // Helper function to display filenames
  const renderFileNames = (files: FileList | null) => {
    if (!files || files.length === 0) return null;
    
    return (
      <div className="mt-2">
        {Array.from(files).map((file, index) => (
          <div key={index} className="text-sm text-blue-600 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {file.name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Rental Assistance Application</h1>
              <p className="text-lg text-gray-600 mb-4">
                Complete this form to apply for housing assistance. All information provided is kept confidential 
                and is required to meet government funding requirements.
              </p>
              <div className="flex items-center justify-center text-amber-600 bg-amber-50 p-3 rounded-lg">
                <Info className="h-5 w-5 mr-2" />
                <p className="text-sm">Please have your identification, proof of income, and housing documents ready.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  {/* ... keep existing code (personal information section) */

                  {/* Household Information */}
                  {/* ... keep existing code (household information section) */

                  {/* Current Housing */}
                  {/* ... keep existing code (current housing section) */

                  {/* Government Assistance */}
                  {/* ... keep existing code (government assistance section) */

                  {/* Emergency Contact */}
                  {/* ... keep existing code (emergency contact section) */

                  {/* Demographic Information */}
                  {/* ... keep existing code (demographic information section) */

                  {/* Required Documents */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Required Documents
                    </h2>
                    <div className="bg-amber-50 p-3 rounded mb-6">
                      <p className="text-sm text-amber-600 flex items-start">
                        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Please upload the following documents to complete your application. 
                          Accepted file formats: PDF, JPG, PNG. Maximum file size: 10MB per file.
                        </span>
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="identificationDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Identification Document <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      setUploadedFiles({
                                        ...uploadedFiles,
                                        identification: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                    {...rest}
                                  />
                                </div>
                                {renderFileNames(value as unknown as FileList)}
                              </div>
                            </FormControl>
                            <FormDescription>
                              Government-issued ID, driver's license, passport, etc.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="proofOfIncomeDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Proof of Income <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      setUploadedFiles({
                                        ...uploadedFiles,
                                        income: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                    {...rest}
                                  />
                                </div>
                                {renderFileNames(value as unknown as FileList)}
                              </div>
                            </FormControl>
                            <FormDescription>
                              Pay stubs, tax returns, benefit statements, etc.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="housingDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Housing Document <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      setUploadedFiles({
                                        ...uploadedFiles,
                                        housing: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                    {...rest}
                                  />
                                </div>
                                {renderFileNames(value as unknown as FileList)}
                              </div>
                            </FormControl>
                            <FormDescription>
                              Lease agreement, mortgage statement, eviction notice, etc.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="additionalDocs"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Additional Documents (Optional)
                            </FormLabel>
                            <FormControl>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    multiple
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      setUploadedFiles({
                                        ...uploadedFiles,
                                        additional: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                    {...rest}
                                  />
                                </div>
                                {renderFileNames(value as unknown as FileList)}
                              </div>
                            </FormControl>
                            <FormDescription>
                              Utility bills, medical expenses, other relevant documentation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Certification and Consent */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <CheckSquare className="mr-2 h-5 w-5" />
                      Certification and Consent
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="certifyTrue"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                className="h-5 w-5 mt-0.5 accent-blue-600"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I certify that all information provided in this application is true and complete to the best of my knowledge. <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                I understand that providing false information may result in denial of assistance and possible legal action.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="consentToShare"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                className="h-5 w-5 mt-0.5 accent-blue-600"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I consent to the collection and sharing of my information with relevant agencies for the purpose of providing assistance and reporting to government funders. <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                This information will be used to determine eligibility and may be shared with HUD and other government agencies as required by funding guidelines.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto px-6 py-3"
                    >
                      Submit Application
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                      <span className="text-red-500">*</span> Indicates a required field
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                    What happens after I submit my application?
                  </h3>
                  <p className="text-gray-600">
                    Our staff will review your application within 3-5 business days. You'll be contacted for verification 
                    and to schedule an intake appointment to continue the process.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                    What documents will I need to provide?
                  </h3>
                  <p className="text-gray-600">
                    You'll need to provide ID for all household members, proof of income, current lease or rental agreement, 
                    utility bills, and any eviction notices if applicable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AssistanceApplication;
