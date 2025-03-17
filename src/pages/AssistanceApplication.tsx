
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  AlertTriangle, 
  Home, 
  DollarSign, 
  Users, 
  FileText, 
  Upload, 
  Info, 
  Shield, 
  Check,
  User,
  Clock,
  AlertCircle,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Heart
} from "lucide-react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicationWrapper from "@/components/ApplicationWrapper";

// Define the comprehensive form schema based on the requirements
const assistanceFormSchema = z.object({
  // Basic Information
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  ssn: z.string().optional().refine(val => !val || /^\d{3}-\d{2}-\d{4}$/.test(val), {
    message: "SSN must be in format XXX-XX-XXXX"
  }),
  
  // Contact Information
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  
  // Current Address
  currentAddress: z.string().min(1, { message: "Current address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().min(5, { message: "ZIP code is required" }),
  
  // ID Information
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  idIssueDate: z.string().optional(),
  idExpirationDate: z.string().optional(),
  
  // Household Information
  householdSize: z.string().min(1, { message: "Household size is required" }),
  householdMembers: z.array(z.object({
    name: z.string(),
    age: z.string(),
    relationship: z.string()
  })).optional(),
  dependents: z.string().optional(),
  
  // Demographics (all optional)
  race: z.string().optional(),
  ethnicity: z.string().optional(),
  gender: z.string().optional(),
  disabilityStatus: z.string().optional(),
  veteranStatus: z.string().optional(),
  citizenshipStatus: z.string().optional(),
  
  // Income & Financial
  householdIncome: z.string().min(1, { message: "Household income is required" }),
  incomePeriod: z.string().min(1, { message: "Income period is required" }),
  employmentStatus: z.string().min(1, { message: "Employment status is required" }),
  incomeSource: z.string().optional(),
  noIncomeExplanation: z.string().optional(),
  
  // Housing Status
  housingStatus: z.string().min(1, { message: "Housing status is required" }),
  evictionNotice: z.string().min(1, { message: "Please indicate if you have received an eviction notice" }),
  landlordName: z.string().optional(),
  landlordPhone: z.string().optional(),
  landlordEmail: z.string().optional(),
  
  // Assistance Needed
  assistanceTypes: z.array(z.string()).min(1, { message: "Please select at least one type of assistance needed" }),
  crisisDescription: z.string().min(1, { message: "Please describe your current situation" }),
  assistanceDuration: z.string().optional(),
  
  // Emergency Contact
  emergencyContactName: z.string().min(1, { message: "Emergency contact name is required" }),
  emergencyContactRelationship: z.string().min(1, { message: "Emergency contact relationship is required" }),
  emergencyContactPhone: z.string().min(10, { message: "Emergency contact phone is required" }),
  emergencyContactAddress: z.string().optional(),
  
  // Health Information (if relevant)
  healthConditions: z.string().optional(),
  mobilityRequirements: z.string().optional(),
  medicationNeeds: z.string().optional(),
  
  // Current Assistance
  receivingAssistance: z.string().min(1, { message: "Please indicate if you are receiving other assistance" }),
  otherAssistanceTypes: z.string().optional(),
  
  // Legal Acknowledgments
  informationAccuracy: z.boolean().refine(val => val === true, {
    message: "You must certify that all information provided is accurate"
  }),
  consentToShare: z.boolean().refine(val => val === true, {
    message: "You must consent to the sharing of your information for processing your application"
  }),
  privacyAcknowledgment: z.boolean().refine(val => val === true, {
    message: "You must acknowledge our privacy practices"
  }),
  nonDiscriminationAcknowledgment: z.boolean().refine(val => val === true, {
    message: "You must acknowledge our non-discrimination policy"
  }),
});

type AssistanceFormValues = z.infer<typeof assistanceFormSchema>;

// Housing status options
const housingStatusOptions = [
  { value: "renting", label: "Currently Renting" },
  { value: "homeowner", label: "Homeowner" },
  { value: "homeless", label: "Experiencing Homelessness" },
  { value: "shelter", label: "Living in Shelter" },
  { value: "transitional", label: "Transitional Housing" },
  { value: "doubled-up", label: "Doubled-up with Family/Friends" },
  { value: "hotel", label: "Hotel/Motel" },
  { value: "vehicle", label: "Living in Vehicle" },
  { value: "other", label: "Other" }
];

// Employment status options
const employmentStatusOptions = [
  { value: "full-time", label: "Employed Full-time" },
  { value: "part-time", label: "Employed Part-time" },
  { value: "self-employed", label: "Self-employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "retired", label: "Retired" },
  { value: "disabled", label: "Unable to work due to disability" },
  { value: "student", label: "Student" },
  { value: "other", label: "Other" }
];

// Assistance types
const assistanceTypeOptions = [
  { id: "rental", label: "Rental Assistance" },
  { id: "utilities", label: "Utility Assistance" },
  { id: "security-deposit", label: "Security Deposit" },
  { id: "emergency-shelter", label: "Emergency Shelter" },
  { id: "food", label: "Food Assistance" },
  { id: "relocation", label: "Relocation Assistance" },
  { id: "eviction-prevention", label: "Eviction Prevention" },
  { id: "legal", label: "Legal Assistance" },
  { id: "medical", label: "Medical Assistance" },
  { id: "mental-health", label: "Mental Health Services" },
  { id: "substance-abuse", label: "Substance Abuse Services" },
  { id: "other", label: "Other" }
];

// Race options
const raceOptions = [
  { value: "american-indian", label: "American Indian or Alaska Native" },
  { value: "asian", label: "Asian" },
  { value: "black", label: "Black or African American" },
  { value: "pacific-islander", label: "Native Hawaiian or Pacific Islander" },
  { value: "white", label: "White" },
  { value: "multiple", label: "Two or More Races" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" }
];

// Ethnicity options
const ethnicityOptions = [
  { value: "hispanic", label: "Hispanic or Latino" },
  { value: "not-hispanic", label: "Not Hispanic or Latino" },
  { value: "prefer-not-to-say", label: "Prefer not to say" }
];

// Gender options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "transgender", label: "Transgender" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" }
];

// State options
const stateOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

// ID Types
const idTypeOptions = [
  { value: "drivers-license", label: "Driver's License" },
  { value: "state-id", label: "State ID" },
  { value: "passport", label: "Passport" },
  { value: "military-id", label: "Military ID" },
  { value: "other", label: "Other Government-issued ID" }
];

const AssistanceApplication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [householdMembersCount, setHouseholdMembersCount] = useState(1);
  const [householdMembersArray, setHouseholdMembersArray] = useState([{ name: "", age: "", relationship: "" }]);

  const form = useForm<AssistanceFormValues>({
    resolver: zodResolver(assistanceFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      phone: "",
      currentAddress: "",
      city: "",
      state: "",
      zip: "",
      idType: "",
      idNumber: "",
      idIssueDate: "",
      idExpirationDate: "",
      householdSize: "",
      householdMembers: [],
      dependents: "",
      race: "",
      ethnicity: "",
      gender: "",
      disabilityStatus: "",
      veteranStatus: "",
      citizenshipStatus: "",
      householdIncome: "",
      incomePeriod: "monthly",
      employmentStatus: "",
      incomeSource: "",
      noIncomeExplanation: "",
      housingStatus: "",
      evictionNotice: "no",
      landlordName: "",
      landlordPhone: "",
      landlordEmail: "",
      assistanceTypes: [],
      crisisDescription: "",
      assistanceDuration: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      emergencyContactAddress: "",
      healthConditions: "",
      mobilityRequirements: "",
      medicationNeeds: "",
      receivingAssistance: "no",
      otherAssistanceTypes: "",
      informationAccuracy: false,
      consentToShare: false,
      privacyAcknowledgment: false,
      nonDiscriminationAcknowledgment: false,
    }
  });

  // Update household members array when count changes
  const updateHouseholdMembers = (count: number) => {
    const newCount = parseInt(count.toString());
    if (newCount < 1) return;
    
    setHouseholdMembersCount(newCount);
    
    // If increasing, add new empty members
    if (newCount > householdMembersArray.length) {
      const newMembers = [...householdMembersArray];
      for (let i = householdMembersArray.length; i < newCount; i++) {
        newMembers.push({ name: "", age: "", relationship: "" });
      }
      setHouseholdMembersArray(newMembers);
    } 
    // If decreasing, remove members from the end
    else if (newCount < householdMembersArray.length) {
      setHouseholdMembersArray(householdMembersArray.slice(0, newCount));
    }
  };

  // Update a specific household member's information
  const updateHouseholdMember = (index: number, field: string, value: string) => {
    const updatedMembers = [...householdMembersArray];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setHouseholdMembersArray(updatedMembers);
    form.setValue('householdMembers', updatedMembers);
  };

  const navigateToNextTab = () => {
    switch (activeTab) {
      case "personal":
        setActiveTab("household");
        break;
      case "household":
        setActiveTab("demographics");
        break;
      case "demographics":
        setActiveTab("income");
        break;
      case "income":
        setActiveTab("housing");
        break;
      case "housing":
        setActiveTab("assistance");
        break;
      case "assistance":
        setActiveTab("health");
        break;
      case "health":
        setActiveTab("documents");
        break;
      case "documents":
        setActiveTab("consent");
        break;
      default:
        break;
    }
    window.scrollTo(0, 0);
  };

  const navigateToPrevTab = () => {
    switch (activeTab) {
      case "household":
        setActiveTab("personal");
        break;
      case "demographics":
        setActiveTab("household");
        break;
      case "income":
        setActiveTab("demographics");
        break;
      case "housing":
        setActiveTab("income");
        break;
      case "assistance":
        setActiveTab("housing");
        break;
      case "health":
        setActiveTab("assistance");
        break;
      case "documents":
        setActiveTab("health");
        break;
      case "consent":
        setActiveTab("documents");
        break;
      default:
        break;
    }
    window.scrollTo(0, 0);
  };

  const onSubmit = (data: AssistanceFormValues) => {
    setIsSubmitting(true);
    
    // Include household members data
    data.householdMembers = householdMembersArray;
    
    // Simulate API submission
    console.log("Submitting application data:", data);
    
    // Add webhook URL for processing (likely to connect with edge function)
    const webhookUrl = "https://qbzuocsgfkugpsahesay.supabase.co/functions/v1/resume-notification";
    
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        submissionType: 'housing-assistance',
        webhookUrl: 'https://n8n.example.com/webhook/housing-assistance' // Replace with actual webhook if available
      }),
    })
    .then(response => response.json())
    .then(data => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
      window.scrollTo(0, 0);
    })
    .catch(error => {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      toast.error("There was an error submitting your application. Please try again.");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <ApplicationWrapper
          title="Housing Assistance Application"
          subtitle="Complete this form to apply for housing assistance. Fields marked with * are required."
        >
          {isSubmitted ? (
            <div className="text-center p-8 bg-white rounded-xl shadow-xl border border-green-100 animate-fade-in">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-800">Application Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6 py-1">
                Thank you for your application. Our team will review your information and contact you within 3-5 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  Return Home
                </Button>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Application Steps Indicators */}
                <div className="mb-8">
                  <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 md:grid-cols-9 w-full">
                      <TabsTrigger value="personal" className="text-xs md:text-sm py-1">Personal</TabsTrigger>
                      <TabsTrigger value="household" className="text-xs md:text-sm py-1">Household</TabsTrigger>
                      <TabsTrigger value="demographics" className="text-xs md:text-sm py-1">Demographics</TabsTrigger>
                      <TabsTrigger value="income" className="text-xs md:text-sm py-1">Income</TabsTrigger>
                      <TabsTrigger value="housing" className="text-xs md:text-sm py-1">Housing</TabsTrigger>
                      <TabsTrigger value="assistance" className="text-xs md:text-sm py-1">Assistance</TabsTrigger>
                      <TabsTrigger value="health" className="text-xs md:text-sm py-1">Health</TabsTrigger>
                      <TabsTrigger value="documents" className="text-xs md:text-sm py-1">Documents</TabsTrigger>
                      <TabsTrigger value="consent" className="text-xs md:text-sm py-1">Consent</TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Personal Information */}
                    <TabsContent value="personal" className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <Info className="h-5 w-5 text-blue-500" />
                          Personal Information
                        </h3>
                        <p className="text-sm text-gray-600">
                          Please provide your basic contact information so we can reach you regarding your application.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                First Name <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="First name" 
                                  {...field} 
                                  className="py-2"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="middleName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Middle Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Middle name (optional)" 
                                  {...field} 
                                  className="py-2"
                                />
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
                              <FormLabel className="flex items-center gap-1">
                                Last Name <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Last name" 
                                  {...field}
                                  className="py-2" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Date of Birth <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="date" 
                                  {...field}
                                  className="py-2"
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
                              <FormLabel className="flex items-center gap-1">
                                <Shield className="h-4 w-4" />
                                Social Security Number
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="XXX-XX-XXXX" 
                                  {...field}
                                  className="py-2"
                                />
                              </FormControl>
                              <FormDescription>
                                Your SSN is used to verify your identity. This field is optional but may be required for certain types of assistance.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                Phone Number <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="(XXX) XXX-XXXX" 
                                  {...field}
                                  className="py-2"
                                />
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
                              <FormLabel className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="your@email.com" 
                                  {...field}
                                  className="py-2"
                                />
                              </FormControl>
                              <FormDescription>
                                Email is optional but recommended for faster communication.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg py-1">Current Address</h3>
                        <FormField
                          control={form.control}
                          name="currentAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Street Address <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Street address" 
                                  {...field}
                                  className="py-2"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  City <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="City" 
                                    {...field}
                                    className="py-2"
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
                                <FormLabel className="flex items-center gap-1">
                                  State <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[300px]">
                                    {stateOptions.map((state) => (
                                      <SelectItem key={state} value={state}>
                                        {state}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  ZIP Code <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="ZIP code" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg py-1">ID Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="idType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ID Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select ID type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {idTypeOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Government-issued ID information may be required for certain types of assistance.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="idNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ID Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="ID number" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="idIssueDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ID Issue Date</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="date" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="idExpirationDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ID Expiration Date</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="date" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Household Information
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 2: Household Information */}
                    <TabsContent value="household" className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-blue-500" />
                          Household Information
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tell us about the people who live with you to help determine eligibility and assistance needs.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="householdSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                Total Number of People in Household <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    updateHouseholdMembers(parseInt(e.target.value));
                                  }}
                                  className="py-2"
                                />
                              </FormControl>
                              <FormDescription>
                                Include yourself and all people who live with you.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold py-1">Household Members</h3>
                          <p className="text-sm text-gray-600 py-1">
                            Please provide information about each person living in your household (including yourself).
                          </p>

                          {householdMembersArray.map((member, index) => (
                            <Card key={index} className="mb-4">
                              <CardHeader>
                                <CardTitle className="text-md">Person {index + 1}{index === 0 ? " (You)" : ""}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input 
                                      value={member.name} 
                                      onChange={(e) => updateHouseholdMember(index, 'name', e.target.value)}
                                      placeholder="Full name"
                                      className="py-2"
                                    />
                                  </div>
                                  <div>
                                    <FormLabel>Age</FormLabel>
                                    <Input 
                                      value={member.age} 
                                      onChange={(e) => updateHouseholdMember(index, 'age', e.target.value)}
                                      placeholder="Age"
                                      type="number"
                                      min="0"
                                      className="py-2"
                                    />
                                  </div>
                                  <div>
                                    <FormLabel>Relationship to You</FormLabel>
                                    <Input 
                                      value={member.relationship} 
                                      onChange={(e) => updateHouseholdMember(index, 'relationship', e.target.value)}
                                      placeholder={index === 0 ? "Self" : "Relationship"}
                                      className="py-2"
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <FormField
                          control={form.control}
                          name="dependents"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dependents Information</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please list any additional information about dependents (children under 18, elderly, or disabled persons in your household)"
                                  {...field}
                                  className="min-h-[100px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Personal Information
                        </Button>
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Demographics
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 3: Demographics (Optional) */}
                    <TabsContent value="demographics" className="space-y-6 py-4">
                      <div className="bg-amber-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <Info className="h-5 w-5 text-amber-500" />
                          Demographics Information (Optional)
                        </h3>
                        <p className="text-sm text-gray-600">
                          This information is collected for statistical purposes only and does not affect your eligibility. 
                          All fields in this section are optional.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="race"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Race</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select race (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {raceOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                This information is used for statistical purposes only.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ethnicity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ethnicity</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select ethnicity (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {ethnicityOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select gender (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {genderOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="veteranStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Veteran Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select veteran status (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="veteran">Veteran</SelectItem>
                                  <SelectItem value="non-veteran">Non-Veteran</SelectItem>
                                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="disabilityStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Disability Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select disability status (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="disability">Have a disability</SelectItem>
                                  <SelectItem value="no-disability">No disability</SelectItem>
                                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="citizenshipStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Citizenship/Residency Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="us-citizen">U.S. Citizen</SelectItem>
                                  <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                                  <SelectItem value="visa-holder">Visa Holder</SelectItem>
                                  <SelectItem value="refugee">Refugee/Asylee</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                This information may be required for certain federally-funded programs.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Household Information
                        </Button>
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Income Information
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 4: Income Information */}
                    <TabsContent value="income" className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-blue-500" />
                          Income & Financial Information
                        </h3>
                        <p className="text-sm text-gray-600">
                          This information helps determine your eligibility for various assistance programs.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="householdIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                Household Income <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Household income amount" 
                                  {...field}
                                  className="py-2"
                                />
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
                              <FormLabel className="flex items-center gap-1">
                                Income Period <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select income period" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                  <SelectItem value="annually">Annually</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="employmentStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              Employment Status <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select employment status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {employmentStatusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
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
                            <FormLabel>Source(s) of Income</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List all sources of income (e.g., employment, Social Security, disability, child support, etc.)"
                                {...field}
                                className="min-h-[80px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="noIncomeExplanation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>If No Income, Explain How Basic Needs Are Met</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="If you have no income, please explain how you meet your basic needs (e.g., support from family, friends, etc.)"
                                {...field}
                                className="min-h-[80px]"
                              />
                            </FormControl>
                            <FormDescription>
                              Only required if you have no income.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <p className="text-sm text-gray-600 py-1">
                          <strong>Note:</strong> You may be asked to provide documentation of your income (pay stubs, 
                          benefit statements, etc.) at a later stage in the application process.
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Demographics
                        </Button>
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Housing Status
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 5: Housing Status */}
                    <TabsContent value="housing" className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <Home className="h-5 w-5 text-blue-500" />
                          Housing Status
                        </h3>
                        <p className="text-sm text-gray-600">
                          Information about your current housing situation helps us determine the most appropriate assistance.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="housingStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              Current Housing Status <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select housing status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {housingStatusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="evictionNotice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              Have you received an eviction notice? <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="not-applicable">Not applicable</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              If yes, you may be asked to provide a copy of the notice.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg py-1">Landlord Information (if renting)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="landlordName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Landlord/Property Manager Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Landlord name" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="landlordPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Landlord Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Landlord phone" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="landlordEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Landlord Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Landlord email" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Income Information
                        </Button>
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Assistance Needed
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 6: Assistance Needed */}
                    <TabsContent value="assistance" className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <Heart className="h-5 w-5 text-blue-500" />
                          Assistance Needed
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tell us about the assistance you need and your current situation.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="assistanceTypes"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="flex items-center gap-1">
                                  Type(s) of Assistance Needed <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormDescription>
                                  Select all that apply
                                </FormDescription>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {assistanceTypeOptions.map((option) => (
                                  <FormField
                                    key={option.id}
                                    control={form.control}
                                    name="assistanceTypes"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={option.id}
                                          className="flex flex-row items-start space-x-3 space-y-0 py-1"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(option.id)}
                                              onCheckedChange={(checked) => {
                                                const updatedList = checked
                                                  ? [...field.value || [], option.id]
                                                  : field.value?.filter(
                                                      (value) => value !== option.id
                                                    ) || [];
                                                field.onChange(updatedList);
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {option.label}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="crisisDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                Describe Your Current Situation <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please describe your current housing crisis or situation, including any immediate needs or concerns"
                                  {...field}
                                  className="min-h-[150px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="assistanceDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                How Long Do You Anticipate Needing Assistance?
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="one-time">One-time assistance</SelectItem>
                                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                                  <SelectItem value="long-term">Longer than 12 months</SelectItem>
                                  <SelectItem value="unsure">Unsure</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="receivingAssistance"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="flex items-center gap-1">
                              Are you currently receiving any other assistance? <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("receivingAssistance") === "yes" && (
                        <FormField
                          control={form.control}
                          name="otherAssistanceTypes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Please describe the assistance you are receiving
                              </FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="List organizations and types of assistance (e.g., food stamps, housing vouchers, utility assistance, etc.)"
                                  {...field}
                                  className="min-h-[100px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Housing Status
                        </Button>
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Health Information
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 7: Health Information */}
                    <TabsContent value="health" className="space-y-6 py-4">
                      <div className="bg-amber-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          Health Information (Optional)
                        </h3>
                        <p className="text-sm text-gray-600">
                          This information helps us better understand any specific housing needs related to health conditions. 
                          All fields in this section are optional and will be kept confidential.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="healthConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relevant Health Conditions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please describe any health conditions that may affect your housing needs"
                                {...field}
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormDescription>
                              Only include health information relevant to your housing situation.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobilityRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobility or Accessibility Requirements</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Do you need wheelchair accessibility, first-floor living, or other accommodations?"
                                {...field}
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="medicationNeeds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Critical Medication or Treatment Needs</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List any critical medications or treatments you need continuous access to"
                                {...field}
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormDescription>
                              This helps us ensure you maintain access to necessary medical care.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 py-1">Emergency Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="emergencyContactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  Emergency Contact Name <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Emergency contact name" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="emergencyContactRelationship"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  Relationship <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Relationship to you" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <FormField
                            control={form.control}
                            name="emergencyContactPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                  Emergency Contact Phone <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Emergency contact phone" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="emergencyContactAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Emergency Contact Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Emergency contact address (optional)" 
                                    {...field}
                                    className="py-2"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Assistance Needed
                        </Button>
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Required Documents
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 8: Required Documents */}
                    <TabsContent value="documents" className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          Documentation
                        </h3>
                        <p className="text-sm text-gray-600">
                          The following documents may be required to process your application. You do not need to upload them now,
                          but please be prepared to provide them if requested.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="rounded-lg border p-4">
                          <h3 className="font-semibold text-lg mb-4 py-1">Required Documents</h3>
                          <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                              <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">1</div>
                              <div>
                                <p className="font-medium py-1">Valid Photo ID</p>
                                <p className="text-sm text-gray-600">Driver's license, state ID, passport, or other government-issued ID</p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">2</div>
                              <div>
                                <p className="font-medium py-1">Proof of Income</p>
                                <p className="text-sm text-gray-600">Recent pay stubs, benefit award letters, tax returns, or bank statements</p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">3</div>
                              <div>
                                <p className="font-medium py-1">Proof of Residency</p>
                                <p className="text-sm text-gray-600">Current lease or mortgage statement, utility bills</p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">4</div>
                              <div>
                                <p className="font-medium py-1">Social Security Cards</p>
                                <p className="text-sm text-gray-600">For all household members (if applicable)</p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-2">
                              <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">5</div>
                              <div>
                                <p className="font-medium py-1">Proof of Crisis (if applicable)</p>
                                <p className="text-sm text-gray-600">Eviction notice, utility shutoff notice, or other documentation</p>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700 py-1">
                            <strong>Note:</strong> If you are unable to provide any of these documents, our staff will work with you to identify alternatives.
                            You do not need to upload documents with this initial application. If your application is eligible for assistance,
                            we will contact you to collect necessary documentation.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Health Information
                        </Button>
                        <Button 
                          type="button" 
                          onClick={navigateToNextTab}
                          className="mt-4 py-1"
                        >
                          Next: Agreements & Consent
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Tab 9: Agreements & Consent */}
                    <TabsContent value="consent" className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <Shield className="h-5 w-5 text-blue-500" />
                          Agreements & Consent
                        </h3>
                        <p className="text-sm text-gray-600">
                          Please review and acknowledge the following agreements before submitting your application.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="informationAccuracy"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-4 rounded-md border">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-1">
                                  Information Accuracy <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormDescription>
                                  I certify that all information provided in this application is true and complete to the best of my knowledge.
                                  I understand that providing false information may result in denial of assistance and may be subject to legal action.
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
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-4 rounded-md border">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-1">
                                  Consent to Share Information <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormDescription>
                                  I authorize P.I.L.L.A.R. Initiative CTG to share my information with partner agencies, landlords, utility companies,
                                  and other organizations as necessary to process my application and coordinate services. This consent remains in effect
                                  for one year from the date of signature unless revoked in writing.
                                </FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="privacyAcknowledgment"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-4 rounded-md border">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-1">
                                  Privacy Practices <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormDescription>
                                  I acknowledge that I have been informed of the organization's privacy practices and understand 
                                  how my personal information will be used and protected. I understand that I can request a copy 
                                  of the full privacy policy at any time.
                                </FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="nonDiscriminationAcknowledgment"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-4 rounded-md border">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-1">
                                  Non-Discrimination Policy <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormDescription>
                                  I acknowledge that P.I.L.L.A.R. Initiative CTG provides equal access to services regardless of race, 
                                  color, religion, gender, sexual orientation, gender identity, national origin, age, disability, 
                                  genetic information, marital status, or veteran status.
                                </FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                          <h3 className="font-semibold mb-2 py-1">Appeal Process</h3>
                          <p className="text-sm text-gray-700">
                            If your application is denied, you have the right to appeal the decision within 14 days. 
                            Instructions for filing an appeal will be included with the notification of denial.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={navigateToPrevTab}
                          className="mt-4 py-1"
                        >
                          Previous: Required Documents
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="mt-4 py-1"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </form>
            </Form>
          )}
        </ApplicationWrapper>
      </div>
      
      <Footer />
    </div>
  );
};

export default AssistanceApplication;
