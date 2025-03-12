
import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, HelpCircle, Calendar, Info, Upload, Shield, AlertTriangle, Pen, Clock, Briefcase, GraduationCap, Award, Star } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  middleInitial: z.string().optional(),
  dob: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(9, "Full Social Security Number is required (9 digits)"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  
  // Contact Information
  currentAddress: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  
  // Employment Information
  positionApplying: z.string().min(2, "Position is required"),
  availableStartDate: z.string().min(1, "Available start date is required"),
  desiredSalary: z.string().optional(),
  employmentType: z.string().min(1, "Employment type is required"),
  willingToRelocate: z.string().min(1, "Please indicate if you are willing to relocate"),
  
  // Education
  highestEducation: z.string().min(1, "Highest education is required"),
  schoolName: z.string().min(2, "School name is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  fieldOfStudy: z.string().optional(),
  
  // Work Experience
  employmentHistory: z.string().min(10, "Please provide your employment history"),
  
  // Skills & Qualifications
  relevantSkills: z.string().min(10, "Please provide your relevant skills"),
  certifications: z.string().optional(),
  languages: z.string().optional(),
  
  // References
  reference1Name: z.string().min(2, "Reference name is required"),
  reference1Phone: z.string().min(10, "Reference phone number is required"),
  reference1Relation: z.string().min(2, "Reference relationship is required"),
  reference2Name: z.string().min(2, "Reference name is required"),
  reference2Phone: z.string().min(10, "Reference phone number is required"),
  reference2Relation: z.string().min(2, "Reference relationship is required"),
  
  // Demographic Information (Voluntary)
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  race: z.string().optional(),
  veteran: z.string().optional(),
  disability: z.string().optional(),
  
  // Required Documents
  resumeDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "Resume/CV is required"),
  coverLetterDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "Cover letter is required"),
  idDoc: z.instanceof(FileList).optional().refine(files => !files || files.length > 0, "ID document is required"),
  additionalDocs: z.instanceof(FileList).optional(),
  
  // Background Check
  criminalHistory: z.string().min(1, "Please answer this question"),
  criminalHistoryExplanation: z.string().optional(),
  
  // Signature Section
  signature: z.string().min(2, "Your signature is required"),
  signatureDate: z.string().min(1, "Signature date is required"),
  
  // Certification
  certifyTrue: z.boolean().refine(val => val === true, {
    message: "You must certify that information is true",
  }),
  backgroundCheckConsent: z.boolean().refine(val => val === true, {
    message: "You must consent to a background check",
  }),
  nonDiscriminationAcknowledge: z.boolean().refine(val => val === true, {
    message: "You must acknowledge our non-discrimination policy",
  }),
  atWillEmployment: z.boolean().refine(val => val === true, {
    message: "You must acknowledge at-will employment",
  }),
});

const EmploymentApplication = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    resume: File[] | null,
    coverLetter: File[] | null,
    id: File[] | null,
    additional: File[] | null
  }>({
    resume: null,
    coverLetter: null,
    id: null,
    additional: null
  });
  
  const signatureRef = useRef<HTMLTextAreaElement>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleString();
  });
  
  const [showCriminalHistoryExplanation, setShowCriminalHistoryExplanation] = useState(false);

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
      currentAddress: "",
      city: "",
      state: "",
      zip: "",
      positionApplying: "",
      availableStartDate: "",
      desiredSalary: "",
      employmentType: "",
      willingToRelocate: "",
      highestEducation: "",
      schoolName: "",
      graduationYear: "",
      fieldOfStudy: "",
      employmentHistory: "",
      relevantSkills: "",
      certifications: "",
      languages: "",
      reference1Name: "",
      reference1Phone: "",
      reference1Relation: "",
      reference2Name: "",
      reference2Phone: "",
      reference2Relation: "",
      gender: "",
      ethnicity: "",
      race: "",
      veteran: "",
      disability: "",
      criminalHistory: "",
      criminalHistoryExplanation: "",
      signature: "",
      signatureDate: new Date().toISOString().split('T')[0],
      certifyTrue: false,
      backgroundCheckConsent: false,
      nonDiscriminationAcknowledge: false,
      atWillEmployment: false,
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
    
    toast.success("Application submitted successfully! We'll contact you soon about next steps.");
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
  
  // Watch for criminal history changes to show/hide explanation
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'criminalHistory') {
        setShowCriminalHistoryExplanation(value.criminalHistory === 'yes');
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
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
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" 
                  alt="P.I.L.L.A.R. Initiative Logo" 
                  className="h-32 md:h-40" 
                />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Employment Application</h1>
              <p className="text-lg text-gray-600 mb-4">
                Join our team and make a difference in the community. Complete this application to apply for a position with our organization.
              </p>
              <div className="flex items-center justify-center text-amber-600 bg-amber-50 p-3 rounded-lg">
                <Info className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">Please have your resume, cover letter, and identification ready to upload. All fields marked with an asterisk (*) are required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Information Banner */}
        <section className="bg-blue-700 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Equal Opportunity Employment</h3>
                    <p className="text-sm">
                      The P.I.L.L.A.R. Initiative is an equal opportunity employer. We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, or any other characteristic protected by law. Our organization is committed to building a diverse and inclusive workforce.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">At-Will Employment Notice</h3>
                    <p className="text-sm">
                      If hired, your employment with the P.I.L.L.A.R. Initiative will be "at-will." This means that either you or the organization may terminate the employment relationship at any time, for any reason, with or without notice. Nothing in this application or any other document provided to you is intended to create a contract of employment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Background Check Notice</h3>
                    <p className="text-sm">
                      The P.I.L.L.A.R. Initiative conducts background checks on all final candidates. Any offer of employment is contingent upon satisfactory completion of a background check, which may include criminal history, credit check, verification of education and employment history, and reference checks. All information collected will be kept confidential and used solely for employment purposes.
                    </p>
                  </div>
                </div>
              </div>
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
                  <span className="font-bold">IMPORTANT:</span> Providing false information on this application may result in disqualification from consideration for employment or termination if discovered after hire.
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
                              Your SSN is required for background check purposes only.
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

                  {/* Contact Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="currentAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Street Address <span className="text-red-500">*</span>
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
                    </div>
                  </div>

                  {/* Employment Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Employment Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="positionApplying"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Position Applying For <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="case-manager">Case Manager</SelectItem>
                                <SelectItem value="program-coordinator">Program Coordinator</SelectItem>
                                <SelectItem value="outreach-specialist">Outreach Specialist</SelectItem>
                                <SelectItem value="housing-advocate">Housing Advocate</SelectItem>
                                <SelectItem value="administrative-assistant">Administrative Assistant</SelectItem>
                                <SelectItem value="fundraising-specialist">Fundraising Specialist</SelectItem>
                                <SelectItem value="volunteer-coordinator">Volunteer Coordinator</SelectItem>
                                <SelectItem value="social-worker">Social Worker</SelectItem>
                                <SelectItem value="executive-director">Executive Director</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availableStartDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Available Start Date <span className="text-red-500">*</span>
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
                        name="desiredSalary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Desired Salary/Wage
                            </FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="$50,000/year" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Employment Type <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select employment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="temporary">Temporary</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="willingToRelocate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Willing to Relocate? <span className="text-red-500">*</span>
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
                                <SelectItem value="maybe">Maybe</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Education */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Education
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="highestEducation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Highest Level of Education <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select education level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="high-school">High School Diploma/GED</SelectItem>
                                <SelectItem value="some-college">Some College</SelectItem>
                                <SelectItem value="associates">Associate's Degree</SelectItem>
                                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                <SelectItem value="masters">Master's Degree</SelectItem>
                                <SelectItem value="doctorate">Doctorate</SelectItem>
                                <SelectItem value="trade-school">Trade School/Certificate</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="schoolName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              School/Institution Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="University of California" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="graduationYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Graduation Year <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="2022" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fieldOfStudy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Field of Study/Major
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Social Work" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Work Experience
                    </h2>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="employmentHistory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Employment History <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormDescription className="text-sm mb-2">
                              Please list your last three employers, starting with the most recent. Include company name, position, dates of employment, and a brief description of your responsibilities.
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Example: Company ABC (2020-2022) - Program Coordinator. Responsibilities included coordinating programs, managing volunteers, and reporting outcomes." 
                                className="min-h-[150px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Skills & Qualifications */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Star className="mr-2 h-5 w-5" />
                      Skills & Qualifications
                    </h2>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="relevantSkills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Relevant Skills <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormDescription className="text-sm mb-2">
                              Describe skills, abilities, and qualifications that are relevant to the position you're applying for.
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Example: Case management, conflict resolution, grant writing, database management, etc." 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="certifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Certifications/Licenses
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Example: Licensed Social Worker (LSW), Certified Case Manager (CCM), CPR certified, etc." 
                                className="min-h-[80px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="languages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Languages Spoken
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Example: English (fluent), Spanish (conversational)" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* References */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Professional References
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">Please provide two professional references who are not related to you.</p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-800 mb-3">Reference #1</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="reference1Name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Full Name <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane Smith" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="reference1Phone"
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
                            name="reference1Relation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Relationship <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Former Supervisor" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-800 mb-3">Reference #2</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="reference2Name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Full Name <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="reference2Phone"
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
                            name="reference2Relation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Relationship <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Colleague" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Demographic Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Demographic Information (Voluntary)
                    </h2>
                    <div className="bg-gray-50 p-3 rounded mb-4 text-sm text-gray-600">
                      The following information is requested for statistical reporting purposes only. Your answers will not affect consideration for employment. Providing this information is voluntary.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Gender
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender (optional)" />
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
                              Ethnicity
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ethnicity (optional)" />
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
                              Race
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select race (optional)" />
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
                              Veteran Status
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select veteran status (optional)" />
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
                      <FormField
                        control={form.control}
                        name="disability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Disability Status
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select disability status (optional)" />
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

                  {/* Background Check */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Background Check Information
                    </h2>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="criminalHistory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Have you ever been convicted of a felony? <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormDescription className="text-sm mb-2">
                              A conviction will not necessarily disqualify you from employment. Each conviction will be judged on its own merits with respect to time, circumstances, and seriousness.
                            </FormDescription>
                            <Select onValueChange={(value) => {
                              field.onChange(value);
                              setShowCriminalHistoryExplanation(value === "yes");
                            }} defaultValue={field.value}>
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
                      
                      {showCriminalHistoryExplanation && (
                        <FormField
                          control={form.control}
                          name="criminalHistoryExplanation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Please explain:
                              </FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please provide details including dates, charges, and disposition." 
                                  className="min-h-[100px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
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
                          Accepted file formats: PDF, DOC, DOCX, JPG, PNG. Maximum file size: 10MB per file.
                        </span>
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="resumeDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Resume/CV <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      setUploadedFiles({
                                        ...uploadedFiles,
                                        resume: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                  />
                                </div>
                                {renderFileNames(value as FileList)}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="coverLetterDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Cover Letter <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      setUploadedFiles({
                                        ...uploadedFiles,
                                        coverLetter: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                  />
                                </div>
                                {renderFileNames(value as FileList)}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="idDoc"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>
                              Government-Issued ID <span className="text-red-500">*</span>
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
                                        id: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                  />
                                </div>
                                {renderFileNames(value as FileList)}
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              Driver's license, passport, or other government-issued ID
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
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    multiple
                                    onChange={(e) => {
                                      onChange(e.target.files);
                                      setUploadedFiles({
                                        ...uploadedFiles,
                                        additional: e.target.files ? Array.from(e.target.files) : null
                                      });
                                    }}
                                    className="flex-1"
                                  />
                                </div>
                                {renderFileNames(value as FileList)}
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              Certifications, licenses, or other relevant documents
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Signature Section */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <Pen className="mr-2 h-5 w-5" />
                      Electronic Signature
                    </h2>
                    <div className="bg-gray-50 p-4 rounded mb-6">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">Current date and time: {currentDateTime}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        By typing your full name below, you are signing this application electronically. 
                        You agree that your electronic signature is the legal equivalent of your manual signature.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="signature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Full Name Signature <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Type your full legal name" 
                                className="min-h-[60px]" 
                                ref={signatureRef}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="signatureDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Date <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Certification and Agreements */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
                      <CheckSquare className="mr-2 h-5 w-5" />
                      Certification and Agreements
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="certifyTrue"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Certification of Truth <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                I certify that all information provided in this application is true, correct, and complete to the best of my knowledge. I understand that any false statements, misrepresentations, or omissions may result in disqualification from consideration for employment or, if hired, termination of employment.
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
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Background Check Consent <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                I authorize the P.I.L.L.A.R. Initiative to conduct a thorough background check, which may include verification of my employment history, education, criminal record, credit history, and reference checks.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="nonDiscriminationAcknowledge"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Non-Discrimination Acknowledgment <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                I acknowledge that the P.I.L.L.A.R. Initiative is an equal opportunity employer and does not discriminate on the basis of race, color, religion, sex, national origin, age, disability, or any other characteristic protected by law.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="atWillEmployment"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-yellow-50">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                At-Will Employment Acknowledgment <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                I understand and agree that if hired, my employment with the P.I.L.L.A.R. Initiative will be "at-will," which means that either I or the organization may terminate the employment relationship at any time, for any reason, with or without notice.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-6">
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmploymentApplication;
