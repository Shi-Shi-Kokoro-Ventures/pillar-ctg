
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import DocumentUpload from "@/components/DocumentUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Home, DollarSign, FileText, HelpCircle, Users, Briefcase, 
  AlertTriangle, Calendar, CirclePlus, Clock, HeartPulse, GraduationCap,
  Baby, Utensils, Car, Plug, Building, School, LandPlot
} from "lucide-react";

// Define the form schema with validation
const formSchema = z.object({
  // Client Personal Information
  clientFirstName: z.string().min(2, "First name must be at least 2 characters"),
  clientLastName: z.string().min(2, "Last name must be at least 2 characters"),
  middleInitial: z.string().max(1).optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)"),
  gender: z.string().min(1, "Please select a gender"),
  maritalStatus: z.string().min(1, "Please select a marital status"),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Please enter a valid SSN (XXX-XX-XXXX)").optional(),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number (XXX) XXX-XXXX"),
  alternatePhone: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  preferredContactMethod: z.string().min(1, "Please select a preferred contact method"),
  
  // Address Information
  address: z.string().min(5, "Address must be at least 5 characters"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "Please select a state"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  countyDistrict: z.string().optional(),
  residenceDuration: z.string().optional(),
  housingStatus: z.string(),
  homelessStatus: z.string().optional(),
  previousAddress: z.string().optional(),
  
  // Financial information
  incomeSource: z.string().optional(),
  employmentStatus: z.string(),
  employer: z.string().optional(),
  jobTitle: z.string().optional(),
  employmentDuration: z.string().optional(),
  monthlyIncome: z.string().optional(),
  otherIncome: z.string().optional(),
  bankAccount: z.boolean().default(false),
  bankingInfo: z.string().optional(),
  
  // Benefit Information
  receivingBenefits: z.boolean().default(false),
  tanf: z.boolean().default(false),
  snap: z.boolean().default(false),
  wic: z.boolean().default(false),
  ssi: z.boolean().default(false),
  medicaid: z.boolean().default(false),
  medicare: z.boolean().default(false),
  veteransBenefits: z.boolean().default(false),
  unemployment: z.boolean().default(false),
  childSupport: z.boolean().default(false),
  otherBenefits: z.string().optional(),
  
  // Case details
  caseType: z.string(),
  caseDescription: z.string().min(10, "Please provide details about the case"),
  needsAssessment: z.string().min(10, "Please provide an assessment of needs").optional(),
  urgencyLevel: z.string(),
  referralSource: z.string().optional(),
  referringAgency: z.string().optional(),
  governmentPrograms: z.array(z.string()).optional(),
  programEligibility: z.string().optional(),
  barriersToCare: z.string().optional(),
  
  // Household information
  householdSize: z.string(),
  dependents: z.string().optional(),
  childrenAges: z.string().optional(),
  childrenSchools: z.string().optional(),
  additionalHouseholdMembers: z.array(z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
    age: z.string().optional(),
    income: z.string().optional()
  })).optional(),
  
  // Health information
  hasMedicalConditions: z.boolean().default(false),
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  healthInsurance: z.string(),
  primaryDoctor: z.string().optional(),
  lastMedicalVisit: z.string().optional(),
  mentalHealthNeeds: z.string().optional(),
  substanceUseHistory: z.string().optional(),
  
  // Education and Employment
  educationLevel: z.string().optional(),
  schoolStatus: z.string().optional(),
  vocationalTraining: z.string().optional(),
  employmentGoals: z.string().optional(),
  employmentBarriers: z.string().optional(),
  workHistory: z.string().optional(),
  
  // Legal Information
  hasLegalIssues: z.boolean().default(false),
  legalIssueDescription: z.string().optional(),
  courtDates: z.string().optional(),
  probationStatus: z.string().optional(),
  immigration: z.string().optional(),
  
  // Transportation
  transportationAccess: z.string(),
  hasVehicle: z.boolean().default(false),
  publicTransportationAccess: z.boolean().default(false),
  transportationBarriers: z.string().optional(),
  
  // Utility Information
  utilityNeeds: z.array(z.string()).optional(),
  pastDueUtilities: z.boolean().default(false),
  utilityCompany: z.string().optional(),
  utilityAccountNumber: z.string().optional(),
  
  // Documentation status
  hasIdentification: z.boolean().default(false),
  hasProofOfIncome: z.boolean().default(false),
  hasProofOfResidence: z.boolean().default(false),
  hasProofOfCitizenship: z.boolean().default(false),
  hasBirthCertificate: z.boolean().default(false),
  hasSocialSecurityCard: z.boolean().default(false),
  otherDocuments: z.string().optional(),
  
  // Additional information
  strengths: z.string().optional(),
  additionalNotes: z.string().optional(),
  followUpDate: z.string().optional(),
  followUpNotes: z.string().optional(),
  caseManagerNotes: z.string().optional(),
  
  // Client consent
  consentToShare: z.boolean().default(false),
  hipaaConsent: z.boolean().default(false),
  clientRightsReviewed: z.boolean().default(false),
  clientSignature: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface NewCaseFormProps {
  onCancel: () => void;
}

export function NewCaseForm({ onCancel }: NewCaseFormProps) {
  // State for document uploads
  const [identificationDocs, setIdentificationDocs] = useState<File[]>([]);
  const [incomeDocs, setIncomeDocs] = useState<File[]>([]);
  const [residenceDocs, setResidenceDocs] = useState<File[]>([]);
  const [otherDocs, setOtherDocs] = useState<File[]>([]);
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientFirstName: "",
      clientLastName: "",
      middleInitial: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      ssn: "",
      phone: "",
      alternatePhone: "",
      email: "",
      preferredContactMethod: "phone",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      countyDistrict: "",
      residenceDuration: "",
      housingStatus: "",
      homelessStatus: "",
      previousAddress: "",
      incomeSource: "",
      employmentStatus: "",
      employer: "",
      jobTitle: "",
      employmentDuration: "",
      monthlyIncome: "",
      otherIncome: "",
      bankAccount: false,
      bankingInfo: "",
      receivingBenefits: false,
      tanf: false,
      snap: false,
      wic: false,
      ssi: false,
      medicaid: false,
      medicare: false,
      veteransBenefits: false,
      unemployment: false,
      childSupport: false,
      otherBenefits: "",
      caseType: "",
      caseDescription: "",
      needsAssessment: "",
      urgencyLevel: "Medium",
      referralSource: "",
      referringAgency: "",
      governmentPrograms: [],
      programEligibility: "",
      barriersToCare: "",
      householdSize: "1",
      dependents: "",
      childrenAges: "",
      childrenSchools: "",
      additionalHouseholdMembers: [],
      hasMedicalConditions: false,
      medicalConditions: "",
      medications: "",
      healthInsurance: "",
      primaryDoctor: "",
      lastMedicalVisit: "",
      mentalHealthNeeds: "",
      substanceUseHistory: "",
      educationLevel: "",
      schoolStatus: "",
      vocationalTraining: "",
      employmentGoals: "",
      employmentBarriers: "",
      workHistory: "",
      hasLegalIssues: false,
      legalIssueDescription: "",
      courtDates: "",
      probationStatus: "",
      immigration: "",
      transportationAccess: "",
      hasVehicle: false,
      publicTransportationAccess: false,
      transportationBarriers: "",
      utilityNeeds: [],
      pastDueUtilities: false,
      utilityCompany: "",
      utilityAccountNumber: "",
      hasIdentification: false,
      hasProofOfIncome: false,
      hasProofOfResidence: false,
      hasProofOfCitizenship: false,
      hasBirthCertificate: false,
      hasSocialSecurityCard: false,
      otherDocuments: "",
      strengths: "",
      additionalNotes: "",
      followUpDate: "",
      followUpNotes: "",
      caseManagerNotes: "",
      consentToShare: false,
      hipaaConsent: false,
      clientRightsReviewed: false,
      clientSignature: false,
    },
  });

  // Define state options
  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  // Case types
  const caseTypes = [
    "Housing Assistance",
    "Financial Aid",
    "Food Assistance",
    "Healthcare Access",
    "Job Placement",
    "Legal Aid",
    "Mental Health Services",
    "Substance Abuse Treatment",
    "Child Support",
    "Domestic Violence",
    "Senior Services",
    "Disability Services",
    "Utility Assistance",
    "Transportation Assistance",
    "Childcare Voucher",
    "Education Assistance",
    "Immigration Services",
    "Veteran Services",
    "Homeless Services",
    "Emergency Services",
    "Other"
  ];

  // Housing status options
  const housingStatusOptions = [
    "Renting",
    "Own Home",
    "Homeless",
    "Temporary Housing",
    "Living with Family/Friends",
    "Shelter",
    "Transitional Housing",
    "Public Housing",
    "Section 8/Housing Choice Voucher",
    "Group Home",
    "Residential Treatment",
    "Halfway House",
    "Hotel/Motel",
    "Car/RV",
    "Street",
    "Other"
  ];
  
  // Gender options
  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Transgender",
    "Other",
    "Prefer not to say"
  ];
  
  // Marital status options
  const maritalStatusOptions = [
    "Single",
    "Married",
    "Divorced",
    "Separated",
    "Widowed",
    "Domestic Partnership",
    "Other"
  ];
  
  // Employment status options
  const employmentStatusOptions = [
    "Full-time",
    "Part-time",
    "Unemployed",
    "Self-employed",
    "Retired",
    "Student",
    "Unable to work/Disabled",
    "Seasonal/Temporary",
    "Other"
  ];
  
  // Education level options
  const educationLevelOptions = [
    "No formal education",
    "Some grade school",
    "Middle school",
    "Some high school",
    "High school diploma/GED",
    "Some college",
    "Associate's degree",
    "Bachelor's degree",
    "Master's degree",
    "Doctoral/Professional degree",
    "Vocational/Trade school",
    "Other"
  ];
  
  // Health insurance options
  const healthInsuranceOptions = [
    "None",
    "Medicaid",
    "Medicare",
    "Private insurance",
    "Employer provided",
    "ACA/Marketplace",
    "CHIP",
    "Veteran's benefits",
    "Other"
  ];
  
  // Transportation options
  const transportationOptions = [
    "Own vehicle",
    "Public transportation",
    "Ride from family/friends",
    "Taxi/Uber/Lyft",
    "Walking/Biking",
    "Agency transportation",
    "No reliable transportation",
    "Other"
  ];
  
  // Utility needs options
  const utilityNeedsOptions = [
    { id: "electric", label: "Electricity" },
    { id: "gas", label: "Gas" },
    { id: "water", label: "Water" },
    { id: "internet", label: "Internet" },
    { id: "phone", label: "Phone" },
    { id: "heating", label: "Heating" },
    { id: "cooling", label: "Cooling" },
    { id: "trash", label: "Trash" }
  ];
  
  // Government programs options
  const governmentProgramsOptions = [
    { id: "tanf", label: "TANF" },
    { id: "snap", label: "SNAP/Food Stamps" },
    { id: "wic", label: "WIC" },
    { id: "ssi", label: "SSI/SSDI" },
    { id: "medicaid", label: "Medicaid" },
    { id: "medicare", label: "Medicare" },
    { id: "section8", label: "Section 8" },
    { id: "liheap", label: "LIHEAP" },
    { id: "publichousing", label: "Public Housing" },
    { id: "childcare", label: "Childcare Assistance" },
    { id: "veteran", label: "Veteran Benefits" }
  ];

  // Form submission handler
  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    
    // In a real application, this would send the data to your backend
    // along with the uploaded documents
    console.log("Uploaded documents:", {
      identification: identificationDocs,
      income: incomeDocs,
      residence: residenceDocs,
      other: otherDocs
    });
    
    toast.success("New case has been created successfully", {
      description: `Case created for ${data.clientFirstName} ${data.clientLastName}`,
    });
    
    // Close the form
    onCancel();
  }

  return (
    <div className="space-y-6 p-6 max-h-[80vh] overflow-y-auto bg-white">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Case Information</h2>
        <p className="text-gray-500 text-sm mt-2">
          Please fill out all required fields to create a new case. This information will be used for government service applications.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Personal</span>
              </TabsTrigger>
              <TabsTrigger value="housing" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Housing</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Financial</span>
              </TabsTrigger>
              <TabsTrigger value="case" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Case Details</span>
              </TabsTrigger>
              <TabsTrigger value="household" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Household</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4" />
                <span>Health</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </TabsTrigger>
              <TabsTrigger value="additional" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Additional</span>
              </TabsTrigger>
            </TabsList>
          
            {/* Client Personal Information Section */}
            <TabsContent value="personal">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Client Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="clientFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
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
                        <FormLabel>Middle Initial</FormLabel>
                        <FormControl>
                          <Input placeholder="M" maxLength={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clientLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Format: YYYY-MM-DD
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select marital status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {maritalStatusOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ssn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Security Number</FormLabel>
                        <FormControl>
                          <Input placeholder="XXX-XX-XXXX" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional but may be required for some services
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
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="(XXX) XXX-XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="alternatePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternate Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(XXX) XXX-XXXX" {...field} />
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
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredContactMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contact method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="text">Text Message</SelectItem>
                            <SelectItem value="mail">Postal Mail</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Address Section */}
            <TabsContent value="housing">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Housing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Street Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apartment/Unit #</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt/Unit number" {...field} />
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
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
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
                        <FormLabel>State *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="XXXXX or XXXXX-XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="countyDistrict"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County/District</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter county or district" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="residenceDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How long at this address?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="< 1 month">Less than 1 month</SelectItem>
                            <SelectItem value="1-3 months">1-3 months</SelectItem>
                            <SelectItem value="3-6 months">3-6 months</SelectItem>
                            <SelectItem value="6-12 months">6-12 months</SelectItem>
                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                            <SelectItem value="2+ years">2+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="housingStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Housing Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select housing status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {housingStatusOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("housingStatus") === "Homeless" && (
                    <FormField
                      control={form.control}
                      name="homelessStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Homeless Situation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select situation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="street">Street</SelectItem>
                              <SelectItem value="shelter">Shelter</SelectItem>
                              <SelectItem value="vehicle">Vehicle</SelectItem>
                              <SelectItem value="couch-surfing">Couch Surfing</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="previousAddress"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Previous Address (if at current address less than 1 year)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter previous address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-gray-700 mb-2">Utility Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="utilityNeeds"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Utility Assistance Needed For</FormLabel>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {utilityNeedsOptions.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="utilityNeeds"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-start space-x-2 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value || [], item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="pastDueUtilities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0 mb-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Has past due utility bills
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        {form.watch("pastDueUtilities") && (
                          <>
                            <FormField
                              control={form.control}
                              name="utilityCompany"
                              render={({ field }) => (
                                <FormItem className="mb-2">
                                  <FormLabel>Utility Company</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter utility company" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="utilityAccountNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Account Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter account number" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                <h3 className="text-lg font-medium mb-4">Transportation Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="transportationAccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Mode of Transportation *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transportation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {transportationOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="hasVehicle"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 mb-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Has reliable vehicle
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="publicTransportationAccess"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Has access to public transportation
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="transportationBarriers"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Transportation Barriers</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe any transportation barriers"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Financial Information Section */}
            <TabsContent value="financial">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employmentStatusOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="incomeSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Source of Income</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Employment, SSI, TANF" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Employer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter employer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title/Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employmentDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration of Current Employment</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="< 1 month">Less than 1 month</SelectItem>
                            <SelectItem value="1-3 months">1-3 months</SelectItem>
                            <SelectItem value="3-6 months">3-6 months</SelectItem>
                            <SelectItem value="6-12 months">6-12 months</SelectItem>
                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                            <SelectItem value="2-5 years">2-5 years</SelectItem>
                            <SelectItem value="5+ years">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Income ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="otherIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Income Sources (monthly total)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter amount" {...field} />
                        </FormControl>
                        <FormDescription>
                          Child support, disability, pension, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="bankAccount"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 mb-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Has a bank account
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("bankAccount") && (
                      <FormField
                        control={form.control}
                        name="bankingInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Banking Information</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="checking">Checking Only</SelectItem>
                                <SelectItem value="savings">Savings Only</SelectItem>
                                <SelectItem value="both">Both Checking & Savings</SelectItem>
                                <SelectItem value="prepaid">Prepaid Card</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                <h3 className="text-lg font-medium mb-4">Benefits Information</h3>
                <div>
                  <FormField
                    control={form.control}
                    name="receivingBenefits"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0 mb-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-medium">
                          Currently receiving government benefits
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("receivingBenefits") && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      <FormField
                        control={form.control}
                        name="tanf"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              TANF
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="snap"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              SNAP/Food Stamps
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="wic"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              WIC
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="ssi"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              SSI/SSDI
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="medicaid"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Medicaid
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="medicare"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Medicare
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="veteransBenefits"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Veterans Benefits
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="unemployment"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Unemployment
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="childSupport"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Child Support
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {form.watch("receivingBenefits") && (
                    <FormField
                      control={form.control}
                      name="otherBenefits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Benefits</FormLabel>
                          <FormControl>
                            <Input placeholder="List any other benefits" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                <h3 className="text-lg font-medium mb-4">Education & Employment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="educationLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Education Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {educationLevelOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="schoolStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current School Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="not-enrolled">Not enrolled</SelectItem>
                            <SelectItem value="k-12">Enrolled in K-12</SelectItem>
                            <SelectItem value="ged">Working on GED</SelectItem>
                            <SelectItem value="vocational">Vocational/Trade School</SelectItem>
                            <SelectItem value="community-college">Community College</SelectItem>
                            <SelectItem value="university">University/College</SelectItem>
                            <SelectItem value="graduate">Graduate School</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vocationalTraining"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vocational/Skills Training</FormLabel>
                        <FormControl>
                          <Input placeholder="List any vocational training" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employmentGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Goals</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe employment goals" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employmentBarriers"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Employment Barriers</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe any barriers to employment"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                </div>
              </div>
            </TabsContent>
            
            {/* Case Information Section */}
            <TabsContent value="case">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Case Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="caseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select case type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {caseTypes.map(type => (
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
                    name="urgencyLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency Level *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referral Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select referral source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="self">Self-referred</SelectItem>
                            <SelectItem value="family-friend">Family/Friend</SelectItem>
                            <SelectItem value="social-services">Social Services</SelectItem>
                            <SelectItem value="healthcare">Healthcare Provider</SelectItem>
                            <SelectItem value="school">School</SelectItem>
                            <SelectItem value="court">Court/Legal System</SelectItem>
                            <SelectItem value="church">Faith-based Organization</SelectItem>
                            <SelectItem value="community">Community Organization</SelectItem>
                            <SelectItem value="shelter">Shelter</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="referringAgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referring Agency/Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of referring agency or person" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="caseDescription"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Case Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe the client's situation and needs in detail"
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
                    name="needsAssessment"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Initial Needs Assessment</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide an assessment of client needs"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                <h3 className="text-lg font-medium mb-4">Government Program Eligibility</h3>
                <div className="space-y-4">
                  <div>
                    <FormLabel>Potentially Eligible For:</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {governmentProgramsOptions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="governmentPrograms"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value || [], item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="programEligibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Eligibility Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Notes about potential program eligibility"
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
                    name="barriersToCare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barriers to Accessing Services</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe any barriers to accessing needed services"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                <h3 className="text-lg font-medium mb-4">Legal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="hasLegalIssues"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 mb-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Has current legal issues
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.watch("hasLegalIssues") && (
                    <>
                      <FormField
                        control={form.control}
                        name="legalIssueDescription"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Description of Legal Issues</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe legal issues"
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
                        name="courtDates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upcoming Court Dates</FormLabel>
                            <FormControl>
                              <Input placeholder="List any court dates" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="probationStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Probation/Parole Status</FormLabel>
                            <FormControl>
                              <Input placeholder="Probation or parole status" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="immigration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Immigration Status (if applicable)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us-citizen">U.S. Citizen</SelectItem>
                            <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                            <SelectItem value="refugee">Refugee</SelectItem>
                            <SelectItem value="asylum">Asylum Seeker</SelectItem>
                            <SelectItem value="visa">Visa Holder</SelectItem>
                            <SelectItem value="daca">DACA Recipient</SelectItem>
                            <SelectItem value="undocumented">Undocumented</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="decline">Decline to state</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Household information */}
            <TabsContent value="household">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Household Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="householdSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Household Size *</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dependents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Dependents</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="Enter number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="childrenAges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ages of Children (if applicable)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2, 5, 10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="childrenSchools"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Children's Schools (if applicable)</FormLabel>
                        <FormControl>
                          <Input placeholder="List schools children attend" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* This would ideally be implemented as a dynamic form array for household members */}
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Additional Household Members</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Please provide information about other household members. In a real implementation, 
                    this would be a dynamic form that allows adding multiple household members.
                  </p>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="member-name">Name</Label>
                        <Input id="member-name" placeholder="Household member name" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="member-relationship">Relationship</Label>
                        <Input id="member-relationship" placeholder="Relationship to client" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="member-age">Age</Label>
                        <Input id="member-age" placeholder="Age" type="number" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="member-income">Monthly Income (if any)</Label>
                        <Input id="member-income" placeholder="Income amount" type="number" className="mt-1" />
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-4">
                      <CirclePlus className="h-4 w-4 mr-1" />
                      Add Another Household Member
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Health Information */}
            <TabsContent value="health">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Health Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="hasMedicalConditions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 mb-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Has medical conditions that affect daily life
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.watch("hasMedicalConditions") && (
                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Medical Conditions</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe medical conditions"
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications</FormLabel>
                        <FormControl>
                          <Input placeholder="List current medications" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="healthInsurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Health Insurance</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select insurance type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {healthInsuranceOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="primaryDoctor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Doctor/Clinic</FormLabel>
                        <FormControl>
                          <Input placeholder="Primary healthcare provider" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastMedicalVisit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Medical Visit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="< 1 month">Less than 1 month ago</SelectItem>
                            <SelectItem value="1-3 months">1-3 months ago</SelectItem>
                            <SelectItem value="3-6 months">3-6 months ago</SelectItem>
                            <SelectItem value="6-12 months">6-12 months ago</SelectItem>
                            <SelectItem value="1+ year">More than 1 year ago</SelectItem>
                            <SelectItem value="never">Never/Not sure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mentalHealthNeeds"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Mental Health Needs</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe any mental health needs or concerns"
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
                    name="substanceUseHistory"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Substance Use History (if applicable)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe any substance use history"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Documentation Section */}
            <TabsContent value="documents">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Documentation Checklist</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please indicate which documents have been collected or verified
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hasIdentification"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Valid Identification (Driver's License, State ID)
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasProofOfIncome"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Proof of Income (Pay Stubs, Tax Returns)
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasProofOfResidence"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Proof of Residence (Lease, Utility Bills)
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasProofOfCitizenship"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Proof of Citizenship/Legal Status
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasBirthCertificate"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Birth Certificate
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasSocialSecurityCard"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Social Security Card
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="otherDocuments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Documents</FormLabel>
                          <FormControl>
                            <Input placeholder="List any other documents collected" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <DocumentUpload 
                      onChange={setIdentificationDocs}
                      value={identificationDocs}
                      type="id"
                      id="id-docs"
                    />
                    
                    <DocumentUpload 
                      onChange={setIncomeDocs}
                      value={incomeDocs}
                      type="income"
                      id="income-docs"
                    />
                    
                    <DocumentUpload 
                      onChange={setResidenceDocs}
                      value={residenceDocs}
                      type="housing"
                      id="residence-docs"
                    />
                    
                    <DocumentUpload 
                      onChange={setOtherDocs}
                      value={otherDocs}
                      type="other"
                      id="other-docs"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                <h3 className="text-lg font-medium mb-4">Client Consent</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="consentToShare"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Client has signed consent to share information with partner agencies
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hipaaConsent"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          HIPAA consent form has been signed
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clientRightsReviewed"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Client rights and responsibilities have been reviewed
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clientSignature"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Client signature has been obtained on all required forms
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Additional Notes Section */}
            <TabsContent value="additional">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="strengths"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Strengths & Resources</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe client strengths and available resources"
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
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any additional information or notes about this case"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
                <h3 className="text-lg font-medium mb-4">Case Manager Notes & Follow-up</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="followUpDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-up Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="followUpNotes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Follow-up Plan</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe follow-up actions needed"
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
                    name="caseManagerNotes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Case Manager Notes (Internal Only)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Internal notes not shared with client"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Case
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
