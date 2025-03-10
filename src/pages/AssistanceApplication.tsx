<lov-code>
import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, HelpCircle, Calendar, Info, Upload, Shield, AlertTriangle, Pen, Clock } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

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
  
  // Signature Section
  signature: z.string().min(2, "Your signature is required"),
  signatureDate: z.string().min(1, "Signature date is required"),
  
  // Certification
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
  
  const signatureRef = useRef<HTMLTextAreaElement>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleString();
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
      signature: "",
      signatureDate: new Date().toISOString().split('T')[0],
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
  
  // Update current date and time every minute
  React.useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 60000);
    
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Updated logo size */}
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" 
                  alt="P.I.L.L.A.R. Initiative Logo" 
                  className="h-32 md:h-40" // Increased height from h-20 md:h-24 to h-32 md:h-40
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
