import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, HelpCircle, Calendar, Info, Upload, Shield, AlertTriangle, Pen, Clock, Printer } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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

// Update webhook URL to the provided n8n URL
const WEBHOOK_URL = "https://shishikokoro.app.n8n.cloud/webhook-test/8239f851-72d4-4ec4-84f9-f509e947a8b0";

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
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<z.infer<typeof formSchema> | null>(null);
  const [showPrintDialog, setShowPrintDialog] = useState(false);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    try {
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

      // Call the Supabase edge function to handle the submission
      const { error } = await supabase.functions.invoke('resume-notification', {
        body: {
          ...values,
          submissionType: 'housing-assistance',
          webhookUrl: WEBHOOK_URL,
        },
      });

      if (error) throw error;
      
      // Save the submitted values for PDF/print view
      setSubmittedValues(values);
      setIsSubmitted(true);
      setShowPrintDialog(true);
      
      toast.success("Application submitted successfully! We'll contact you within 3-5 business days.");
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("There was an error submitting your application. Please try again.");
    }
  };

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
  
  // Handle print action
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !submittedValues) return;
    
    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Housing Assistance Application - ${submittedValues.firstName} ${submittedValues.lastName}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header img { max-width: 150px; }
          h1 { color: #2563eb; font-size: 24px; margin-bottom: 20px; }
          h2 { color: #2563eb; font-size: 18px; margin-top: 25px; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          .section { margin-bottom: 25px; }
          .field { display: flex; margin-bottom: 8px; }
          .field-label { font-weight: bold; width: 200px; flex-shrink: 0; }
          .field-value { flex-grow: 1; }
          .signature-section { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 20px; }
          .footer { margin-top: 40px; font-size: 12px; text-align: center; color: #666; }
          @media print {
            body { padding: 0; }
            .print-button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="print-button" style="text-align: right;">
          <button onclick="window.print();" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Print / Save as PDF
          </button>
        </div>
        
        <div class="header">
          <img src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" alt="P.I.L.L.A.R. Initiative Logo">
          <h1>Housing Assistance Application</h1>
          <p>Application ID: APP-${Date.now().toString().slice(-8)}</p>
          <p>Submitted: ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="section">
          <h2>Personal Information</h2>
          <div class="field">
            <div class="field-label">Full Name:</div>
            <div class="field-value">${submittedValues.firstName} ${submittedValues.middleInitial ? submittedValues.middleInitial + '. ' : ''}${submittedValues.lastName}</div>
          </div>
          <div class="field">
            <div class="field-label">Date of Birth:</div>
            <div class="field-value">${submittedValues.dob}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">${submittedValues.phone}</div>
          </div>
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">${submittedValues.email}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Household Information</h2>
          <div class="field">
            <div class="field-label">Household Size:</div>
            <div class="field-value">${submittedValues.householdSize}</div>
          </div>
          <div class="field">
            <div class="field-label">Household Income:</div>
            <div class="field-value">$${submittedValues.householdIncome} ${submittedValues.incomePeriod}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Current Housing</h2>
          <div class="field">
            <div class="field-label">Current Address:</div>
            <div class="field-value">${submittedValues.currentAddress}, ${submittedValues.city}, ${submittedValues.state} ${submittedValues.zip}</div>
          </div>
          <div class="field">
            <div class="field-label">Housing Status:</div>
            <div class="field-value">${submittedValues.housingStatus}</div>
          </div>
          <div class="field">
            <div class="field-label">Monthly Rent:</div>
            <div class="field-value">$${submittedValues.monthlyRent}</div>
          </div>
          <div class="field">
            <div class="field-label">Rent Due Date:</div>
            <div class="field-value">${submittedValues.rentDue || 'Not specified'}</div>
          </div>
          <div class="field">
            <div class="field-label">Eviction Notice:</div>
            <div class="field-value">${submittedValues.evictionNotice}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Government Assistance</h2>
          <div class="field">
            <div class="field-label">Receiving Assistance:</div>
            <div class="field-value">${submittedValues.receivingAssistance}</div>
          </div>
          ${submittedValues.assistanceTypes ? `
          <div class="field">
            <div class="field-label">Types of Assistance:</div>
            <div class="field-value">${submittedValues.assistanceTypes}</div>
          </div>` : ''}
        </div>
        
        <div class="section">
          <h2>Emergency Contact</h2>
          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${submittedValues.emergencyName}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">${submittedValues.emergencyPhone}</div>
          </div>
          <div class="field">
            <div class="field-label">Relationship:</div>
            <div class="field-value">${submittedValues.emergencyRelation}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Demographic Information</h2>
          <div class="field">
            <div class="field-label">Gender:</div>
            <div class="field-value">${submittedValues.gender}</div>
          </div>
          <div class="field">
            <div class="field-label">Ethnicity:</div>
            <div class="field-value">${submittedValues.ethnicity}</div>
          </div>
          <div class="field">
            <div class="field-label">Race:</div>
            <div class="field-value">${submittedValues.race}</div>
          </div>
          <div class="field">
            <div class="field-label">Veteran Status:</div>
            <div class="field-value">${submittedValues.veteran}</div>
          </div>
          <div class="field">
            <div class="field-label">Disability Status:</div>
            <div class="field-value">${submittedValues.disability}</div>
          </div>
        </div>
        
        <div class="signature-section">
          <h2>Certification and Signature</h2>
          <div class="field">
            <div class="field-label">Applicant Signature:</div>
            <div class="field-value">${submittedValues.signature}</div>
          </div>
          <div class="field">
            <div class="field-label">Date:</div>
            <div class="field-value">${submittedValues.signatureDate}</div>
          </div>
          <p style="margin-top: 20px;">By signing above, I certify that the information provided is true and accurate to the best of my knowledge.</p>
        </div>
        
        <div class="footer">
          <p>P.I.L.L.A.R. Initiative Housing Assistance Program</p>
          <p>This document contains confidential information and is intended solely for the use of the P.I.L.L.A.R. Initiative and the applicant.</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
  };

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
                  className="h-32 md:h-40" 
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
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Privacy Act Statement</h3>
                    <p className="text-sm">
                      The information collected on this form is protected under the Privacy Act of 1974. The P.I.L.L.A.R. Initiative is authorized to collect this information pursuant to the Housing and Community Development Act of 1987, as amended. The information provided herein will be used exclusively to determine eligibility for housing assistance and will be maintained in strict accordance with all applicable federal and state privacy laws.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Equal Opportunity Statement</h3>
                    <p className="text-sm">
                      The P.I.L.L.A.R. Initiative is committed to ensuring equal access to housing and related services. In compliance with federal, state, and local anti-discrimination laws, we do not discriminate on the basis of race, color, religion, sex, national origin, ancestry, age, disability, familial status, or any other characteristic protected by law. All qualified applicants are welcome to apply for housing assistance without fear of discrimination or retaliation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Background Check Notice</h3>
                    <p className="text-sm">
                      As a condition of the housing assistance application process, the P.I.L.L.A.R. Initiative will conduct comprehensive background checks on all applicants. These checks may include, but are not limited to, the review of criminal history, credit records, eviction history, and the verification of the information provided in this application. Applicants should be aware that the results of these background checks will be used to assess eligibility for housing assistance and that any inaccuracies or intentional misrepresentations may result in disqualification from the program.
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
                        control={form.
