
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, HelpCircle, Calendar, Info, Upload, Shield, AlertTriangle } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  middleInitial: z.string().optional(),
  dob: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(9, "Full Social Security Number is required (9 digits)"),
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
  identificationFrontDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "Front of ID document is required"),
  identificationBackDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "Back of ID document is required"),
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
  dataPrivacyConsent: z.boolean().refine(val => val === true, {
    message: "You must consent to the Data Privacy Policy",
  }),
  backgroundCheckConsent: z.boolean().refine(val => val === true, {
    message: "You must consent to a background check",
  }),
  fraudWarningAcknowledge: z.boolean().refine(val => val === true, {
    message: "You must acknowledge the fraud warning",
  }),
});

const AssistanceApplication = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    identificationFront: File[] | null,
    identificationBack: File[] | null,
    income: File[] | null,
    housing: File[] | null,
    additional: File[] | null
  }>({
    identificationFront: null,
    identificationBack: null,
    income: null,
    housing: null,
    additional: null
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleInitial: "",
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
      dataPrivacyConsent: false,
      backgroundCheckConsent: false,
      fraudWarningAcknowledge: false,
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

  // Format SSN with dashes as user types (XXX-XX-XXXX)
  const formatSSN = (value: string) => {
    // Strip all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Apply formatting based on length
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 5) {
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
    } else {
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 5)}-${digitsOnly.slice(5, 9)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Organization Logo */}
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/0683dfe9-d692-4760-9453-647c50707306.png" 
                  alt="P.I.L.L.A.R. Initiative Logo" 
                  className="h-20 md:h-24"
                />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Housing Assistance Application</h1>
              <p className="text-lg text-gray-600 mb-4">
                Complete this form to apply for housing assistance. All information provided is kept confidential 
                and is required to meet government funding requirements.
              </p>
              <div className="flex items-center justify-center text-amber-600 bg-amber-50 p-3 rounded-lg">
                <Info className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">Please have your identification, proof of income, and housing documents ready. You will need to upload front and back of your government-issued ID or passport.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Information Banner */}
        <section className="bg-blue-700 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex items-center justify-center">
              <Shield className="h-6 w-6 mr-3 flex-shrink-0" />
              <p className="text-sm md:text-base font-medium">
                Your information is protected under federal and state privacy laws. Application information is used solely for determining eligibility for housing assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
              <Alert className="mb-6 bg-yellow-50 border-yellow-200 text-yellow-800">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  <span className="font-bold">IMPORTANT:</span> Providing false information on this application is a federal offense punishable by law, and may result in denial of assistance, termination of benefits, and possible prosecution.
                </AlertDescription>
              </Alert>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              First Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="middleInitial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Middle Initial
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="M" maxLength={1} {...field} />
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
                            <FormLabel>
                              Last Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Date of Birth <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ssn"
                        render={({ field: { onChange, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Social Security Number <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="XXX-XX-XXXX" 
                                {...rest}
                                onChange={(e) => {
                                  const formatted = formatSSN(e.target.value);
                                  onChange(formatted);
                                  e.target.value = formatted;
                                }}
                                maxLength={11}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Your full Social Security Number is required for identity verification and eligibility determination. This information is secured and protected.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone Number <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="555-555-5555" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Email Address <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Household Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Household Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="householdSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Household Size <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="householdIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Household Income <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="50000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="incomePeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Income Period <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select income period" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Current Housing */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Current Housing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="currentAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Current Address <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              City <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Anytown" {...field} />
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
                            <FormLabel>
                              State <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              ZIP Code <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="housingStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Housing Status <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select housing status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="renting">Renting</SelectItem>
                                <SelectItem value="owning">Owning</SelectItem>
                                <SelectItem value="living-with-family">Living with Family</SelectItem>
                                <SelectItem value="homeless">Homeless</SelectItem>
                                <SelectItem value="shelter">Emergency Shelter</SelectItem>
                                <SelectItem value="transitional">Transitional Housing</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="monthlyRent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Monthly Rent <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="1000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rentDue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Rent Due
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="evictionNotice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Eviction Notice <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Government Assistance */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Government Assistance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="receivingAssistance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Receiving Assistance? <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="assistanceTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Types of Assistance
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="SNAP, TANF, SSI, etc." {...field} />
                            </FormControl>
                            <FormDescription className="text-xs">
                              List all government assistance programs you currently receive
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Emergency Contact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="emergencyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Emergency Contact Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="emergencyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Emergency Contact Phone <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="555-555-5555" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="emergencyRelation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Relationship <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Friend" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Demographic Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Demographic Information
                    </h2>
                    <div className="bg-gray-50 p-3 rounded mb-4 text-sm text-gray-600">
                      The following information is required by federal regulations for statistical and anti-discrimination monitoring purposes.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Gender <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="non-binary">Non-binary</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ethnicity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Ethnicity <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ethnicity" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                                <SelectItem value="non-hispanic">Not Hispanic or Latino</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="race"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Race <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select race" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="black">Black or African American</SelectItem>
                                <SelectItem value="asian">Asian</SelectItem>
                                <SelectItem value="native">American Indian or Alaska Native</SelectItem>
                                <SelectItem value="pacific-islander">Native Hawaiian or Pacific Islander</SelectItem>
                                <SelectItem value="multi-racial">Multi-Racial</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="veteran"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Veteran Status <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="disability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Disability Status <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Required Documents
                    </h2>
                    <div className="bg-amber-50 p-4 rounded mb-6 border border-amber-200">
                      <p className="text-sm text-amber-600 flex items-start">
                        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>IMPORTANT:</strong> Please upload the following documents to complete your application. 
                          You must provide clear images of the front AND back of your government-issued ID or passport.
                          Accepted file formats: PDF, JPG, PNG. Maximum file size: 10MB per file.
                        </span>
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="identificationFrontDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Government ID - Front <span className="text-red-500">*</span>
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
                                        identificationFront: e.target.files ? Array.from(e.target.files) : null
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
                              Front of driver's license, state ID, or passport
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="identificationBackDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Government ID - Back <span className="text-red-500">*</span>
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
                                        identificationBack: e.target.files ? Array.from(e.target.files) : null
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
                              Back of driver's license, state ID, or second passport page
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

                  {/* Legal Disclaimers */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Legal Notices
                    </h2>
                    <div className="bg-gray-50 p-4 rounded border mb-4 text-sm">
                      <p className="mb-2"><strong>Privacy Act Statement:</strong> The information collected on this form is protected under the Privacy Act of 1974. The P.I.L.L.A.R. Initiative is authorized to collect this information under the Housing and Community Development Act of 1987, as amended. The information will be used to determine eligibility for housing assistance.</p>
                      
                      <p className="mb-2"><strong>Equal Opportunity Statement:</strong> The P.I.L.L.A.R. Initiative does not discriminate on the basis of race, color, religion, sex, national origin, ancestry, age, disability, familial status, or any other protected characteristic.</p>
                      
                      <p><strong>Background Check Notice:</strong> The P.I.L.L.A.R. Initiative conducts background checks on all applicants for housing assistance. This may include criminal history, credit check, eviction history, and verification of information provided on this application.</p>
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
                                I understand that providing false information may result in denial of assistance, termination of benefits, and possible legal action including prosecution for fraud.
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
                      <FormField
                        control={form.control}
                        name="dataPrivacyConsent"
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
                                I consent to the P.I.L.L.A.R. Initiative's Data Privacy Policy and authorize the secure storage of my personal information. <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                I understand my information will be stored on secure servers and accessed only by authorized personnel on a need-to-know basis.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="backgroundCheckConsent"
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
                                I authorize the P.I.L.L.A.R. Initiative to conduct a background check, which may include criminal history, credit check, and verification of all information provided. <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                I understand that this information will be used to determine eligibility for housing assistance and will be kept confidential.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fraudWarningAcknowledge"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-2 border-red-200 bg-red-50 p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                className="h-5 w-5 mt-0.5 accent-red-600"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-bold text-red-600">
                                FRAUD WARNING: I acknowledge that submission of false information is a federal crime under 18 U.S.C. § 1001 and may result in fines up to $250,000 and/or imprisonment of up to 5 years. <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription className="text-red-600">
                                By checking this box, I affirm that I understand the severity of providing false information on this application and that all information I have provided is true and accurate.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Application
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                      After submission, your application will be reviewed within 3-5 business days. One of our housing specialists will contact you at the phone number or email provided to discuss next steps.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      If you have questions or need assistance completing this form, please call our Housing Assistance Hotline at (555) 123-4567, Monday through Friday, 9:00 AM to 5:00 PM.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* Legal Footer Banner */}
        <section className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              The P.I.L.L.A.R. Initiative is an equal opportunity provider and employer. We do not discriminate based on race, color, national origin, religion, sex, gender identity, sexual orientation, disability, age, marital status, family/parental status, income derived from a public assistance program, or political beliefs.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AssistanceApplication;
