
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Phone, 
  Home, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Shield, 
  Info, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  AlertTriangle,
  Clipboard,
  Clock,
  CalendarDays,
  CreditCard
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicationWrapper from "@/components/ApplicationWrapper";
import MultiSelectAssistance from "@/components/MultiSelectAssistance";
import DigitalSignature from "@/components/DigitalSignature";
import SSNField from "@/components/SSNField";
import EmergencyContact from "@/components/EmergencyContact";
import DocumentUpload from "@/components/DocumentUpload";
import HouseholdMembersList from "@/components/HouseholdMembersList";
import DemographicInformation from "@/components/DemographicInformation";

// Schema definition for form validation
const assistanceFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  ssn: z.string().min(9, { message: "Valid SSN is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Please enter a valid ZIP code" }),

  // Emergency Contact
  emergencyContact: z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    relationship: z.string().min(1, { message: "Relationship is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),

  // Household Information
  householdMembers: z.array(z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    relationship: z.string(),
    age: z.string(),
    isDependent: z.boolean(),
  })),
  householdSize: z.string().min(1, { message: "Household size is required" }),
  householdIncome: z.string().min(1, { message: "Household income is required" }),
  housingStatus: z.string().min(1, { message: "Housing status is required" }),
  
  // Demographic Information (optional)
  demographics: z.object({
    race: z.string().optional(),
    ethnicity: z.string().optional(),
    gender: z.string().optional(),
    disability: z.boolean().optional(),
    veteran: z.boolean().optional(),
    citizenship: z.string().optional(),
  }),
  
  // Assistance Needed
  assistanceTypes: z.array(z.string()).min(1, { message: "Please select at least one type of assistance" }),
  urgencyLevel: z.string().min(1, { message: "Please select an urgency level" }),
  assistanceReason: z.string().min(1, { message: "Please provide a reason for seeking assistance" }),
  previousAssistance: z.boolean().optional(),
  previousAssistanceDetails: z.string().optional(),

  // Additional Information
  isVeteran: z.boolean().optional(),
  hasDisability: z.boolean().optional(),
  needsInterpreter: z.boolean().optional(),
  preferredLanguage: z.string().optional(),
  additionalNotes: z.string().optional(),

  // Documentation
  idDocuments: z.array(z.any()).min(2, { message: "Please upload front and back of your ID" }),
  incomeDocuments: z.array(z.any()).optional(),
  housingDocuments: z.array(z.any()).optional(),
  crisisDocuments: z.array(z.any()).optional(),
  otherDocuments: z.array(z.any()).optional(),

  // Certifications and agreements
  documentationAgreement: z.boolean().refine(val => val === true, { message: "You must agree to provide required documentation" }),
  verificationAgreement: z.boolean().refine(val => val === true, { message: "You must agree to verification of your information" }),
  truthfulnessAgreement: z.boolean().refine(val => val === true, { message: "You must certify that all information provided is true" }),
  
  // Signature field
  signature: z.string().nullable().refine(val => val !== null, { message: "Please sign the form" }),
  signatureDate: z.string().min(1, { message: "Please enter the date" }),
});

type AssistanceFormValues = z.infer<typeof assistanceFormSchema>;

const householdSizeOptions = [
  { id: "1", label: "1 person" },
  { id: "2", label: "2 people" },
  { id: "3", label: "3 people" },
  { id: "4", label: "4 people" },
  { id: "5", label: "5 people" },
  { id: "6", label: "6 people" },
  { id: "7", label: "7 people" },
  { id: "8+", label: "8+ people" },
];

const householdIncomeOptions = [
  { id: "under15k", label: "Under $15,000" },
  { id: "15k-25k", label: "$15,000 - $24,999" },
  { id: "25k-35k", label: "$25,000 - $34,999" },
  { id: "35k-50k", label: "$35,000 - $49,999" },
  { id: "50k-75k", label: "$50,000 - $74,999" },
  { id: "75k-100k", label: "$75,000 - $99,999" },
  { id: "100k+", label: "$100,000+" },
];

const housingStatusOptions = [
  { id: "own", label: "Homeowner" },
  { id: "rent", label: "Renter" },
  { id: "homeless", label: "Experiencing homelessness" },
  { id: "temp", label: "Temporary housing" },
  { id: "subsidized", label: "Subsidized housing" },
  { id: "sharing", label: "Sharing housing" },
  { id: "other", label: "Other" },
];

const assistanceTypeOptions = [
  { value: "rental", label: "Rental Assistance" },
  { value: "utility", label: "Utility Bill Assistance" },
  { value: "food", label: "Food Assistance" },
  { value: "medical", label: "Medical Expense Help" },
  { value: "childcare", label: "Childcare Assistance" },
  { value: "transportation", label: "Transportation Aid" },
  { value: "job", label: "Job Placement" },
  { value: "housing", label: "Housing Search Help" },
  { value: "mental", label: "Mental Health Services" },
  { value: "legal", label: "Legal Aid" },
  { value: "education", label: "Education Support" },
  { value: "senior", label: "Senior Services" },
];

const urgencyOptions = [
  { id: "emergency", label: "Emergency (24-48 hours)" },
  { id: "urgent", label: "Urgent (3-7 days)" },
  { id: "soon", label: "Needed Soon (1-2 weeks)" },
  { id: "planning", label: "Planning Ahead (1+ months)" },
];

const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "mandarin", label: "Mandarin" },
  { id: "cantonese", label: "Cantonese" },
  { id: "vietnamese", label: "Vietnamese" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
  { id: "korean", label: "Korean" },
  { id: "other", label: "Other" },
];

const stateOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", 
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

const AssistanceApplication = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const form = useForm<AssistanceFormValues>({
    resolver: zodResolver(assistanceFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      emergencyContact: {
        firstName: "",
        lastName: "",
        relationship: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      householdMembers: [],
      householdSize: "",
      householdIncome: "",
      housingStatus: "",
      demographics: {
        race: "",
        ethnicity: "",
        gender: "",
        disability: false,
        veteran: false,
        citizenship: "",
      },
      assistanceTypes: [],
      urgencyLevel: "",
      assistanceReason: "",
      previousAssistance: false,
      previousAssistanceDetails: "",
      isVeteran: false,
      hasDisability: false,
      needsInterpreter: false,
      preferredLanguage: "",
      additionalNotes: "",
      idDocuments: [],
      incomeDocuments: [],
      housingDocuments: [],
      crisisDocuments: [],
      otherDocuments: [],
      documentationAgreement: false,
      verificationAgreement: false,
      truthfulnessAgreement: false,
      signature: null,
      signatureDate: today,
    },
  });

  const onSubmit = (data: AssistanceFormValues) => {
    setIsSubmitting(true);
    
    // Simulating API submission with a delay
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast.success("Application submitted successfully!");
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <ApplicationWrapper 
          title="Assistance Application"
          subtitle="Complete this application to request assistance. Fields marked with * are required."
        >
          {isSubmitted ? (
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-green-100 animate-fade-in">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-800">Application Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Thank you for submitting your assistance application. Our team will review your information and contact you within 2-3 business days regarding next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="group flex items-center gap-2"
                >
                  Return Home
                </Button>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2 group"
                >
                  <FileText className="h-4 w-4 group-hover:animate-pulse" />
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                {/* Important Notice Section */}
                <div className="p-5 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Important Information</h3>
                      <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-4">
                        <li>Complete all required fields marked with an asterisk (*)</li>
                        <li>Have documentation ready to verify your information</li>
                        <li>All information provided will be kept confidential</li>
                        <li>Applications are typically processed within 2-3 business days</li>
                        <li>You may be contacted for additional information</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2 text-gray-800">
                    <User className="text-redcross h-5 w-5" />
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 relative group">
                      <Label htmlFor="firstName" className="flex items-center gap-1">
                        <span>First Name</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <Label htmlFor="middleName" className="flex items-center gap-1">
                        <span>Middle Name</span> <span className="text-gray-400 text-xs ml-1">(optional)</span>
                      </Label>
                      <Input
                        id="middleName"
                        {...form.register("middleName")}
                        className="bg-white border border-gray-300 focus:border-redcross focus:ring-redcross transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <Label htmlFor="lastName" className="flex items-center gap-1">
                        <span>Last Name</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <Label htmlFor="dateOfBirth" className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Date of Birth</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...form.register("dateOfBirth")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.dateOfBirth.message}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <SSNField 
                        value={form.watch("ssn")}
                        onChange={(value) => form.setValue("ssn", value, { shouldValidate: true })}
                        error={form.formState.errors.ssn?.message}
                      />
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <Label htmlFor="email" className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>Email</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <Label htmlFor="phone" className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                        placeholder="(123) 456-7890"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-3 space-y-2 relative group">
                      <Label htmlFor="address" className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>Address</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        {...form.register("address")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.address && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.address.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <Label htmlFor="city" className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>City</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        {...form.register("city")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.city && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.city.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state" className="flex items-center gap-1">
                        <span>State</span> <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}
                        defaultValue={form.watch("state")}
                      >
                        <SelectTrigger 
                          id="state"
                          className={`bg-white border transition-all duration-300 ${form.formState.errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                        >
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {stateOptions.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.state && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.state.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <Label htmlFor="zipCode" className="flex items-center gap-1">
                        <span>ZIP Code</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        {...form.register("zipCode")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.zipCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.zipCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Emergency Contact Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <EmergencyContact 
                    value={form.watch("emergencyContact")}
                    onChange={(contact) => form.setValue("emergencyContact", contact, { shouldValidate: true })}
                    showAddressFields={true}
                  />
                  {form.formState.errors.emergencyContact && (
                    <div className="text-red-500 text-sm mt-1 animate-fade-in">
                      Please complete all required emergency contact fields
                    </div>
                  )}
                </div>
                
                {/* Household Information Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2 text-gray-800">
                    <Users className="text-redcross h-5 w-5" />
                    Household Information
                  </h2>
                  
                  <HouseholdMembersList 
                    value={form.watch("householdMembers")}
                    onChange={(members) => form.setValue("householdMembers", members)}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="space-y-2">
                      <Label htmlFor="householdSize" className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Household Size</span> <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => form.setValue("householdSize", value, { shouldValidate: true })}
                        defaultValue={form.watch("householdSize")}
                      >
                        <SelectTrigger 
                          id="householdSize"
                          className={`bg-white border transition-all duration-300 ${form.formState.errors.householdSize ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                        >
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {householdSizeOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.householdSize && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.householdSize.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="householdIncome" className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>Annual Household Income</span> <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => form.setValue("householdIncome", value, { shouldValidate: true })}
                        defaultValue={form.watch("householdIncome")}
                      >
                        <SelectTrigger 
                          id="householdIncome"
                          className={`bg-white border transition-all duration-300 ${form.formState.errors.householdIncome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                        >
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent>
                          {householdIncomeOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.householdIncome && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.householdIncome.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="housingStatus" className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>Housing Status</span> <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => form.setValue("housingStatus", value, { shouldValidate: true })}
                        defaultValue={form.watch("housingStatus")}
                      >
                        <SelectTrigger 
                          id="housingStatus"
                          className={`bg-white border transition-all duration-300 ${form.formState.errors.housingStatus ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {housingStatusOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.housingStatus && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.housingStatus.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Demographic Information Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <DemographicInformation 
                    value={form.watch("demographics")}
                    onChange={(demographics) => form.setValue("demographics", demographics)}
                  />
                </div>
                
                {/* Assistance Information Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2 text-gray-800">
                    <Shield className="text-redcross h-5 w-5" />
                    Assistance Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        <Clipboard className="h-4 w-4 text-redcross" />
                        <span>Type of Assistance Needed</span> <span className="text-red-500">*</span>
                      </Label>
                      <MultiSelectAssistance
                        options={assistanceTypeOptions}
                        selectedValues={form.watch("assistanceTypes")}
                        onChange={(values) => form.setValue("assistanceTypes", values, { shouldValidate: true })}
                        placeholder="Select assistance types"
                        error={!!form.formState.errors.assistanceTypes}
                      />
                      {form.formState.errors.assistanceTypes && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.assistanceTypes.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="urgencyLevel" className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-redcross" />
                        <span>Urgency Level</span> <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => form.setValue("urgencyLevel", value, { shouldValidate: true })}
                        defaultValue={form.watch("urgencyLevel")}
                      >
                        <SelectTrigger 
                          id="urgencyLevel"
                          className={`bg-white border transition-all duration-300 ${form.formState.errors.urgencyLevel ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                        >
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.urgencyLevel && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.urgencyLevel.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="assistanceReason" className="flex items-center gap-1">
                        <Info className="h-4 w-4" />
                        <span>Reason for Seeking Assistance</span> <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="assistanceReason"
                        {...form.register("assistanceReason")}
                        className={`bg-white border transition-all duration-300 min-h-[120px] ${form.formState.errors.assistanceReason ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                        placeholder="Please explain your current situation and why you're seeking assistance..."
                      />
                      {form.formState.errors.assistanceReason && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.assistanceReason.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="previousAssistance"
                          checked={form.watch("previousAssistance")}
                          onCheckedChange={(checked) => {
                            form.setValue("previousAssistance", checked === true);
                            if (!checked) {
                              form.setValue("previousAssistanceDetails", "");
                            }
                          }}
                          className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                        />
                        <div>
                          <Label htmlFor="previousAssistance" className="font-medium">Have you received assistance from us before?</Label>
                        </div>
                      </div>
                      
                      {form.watch("previousAssistance") && (
                        <div className="space-y-2 ml-7 animate-fade-in">
                          <Label htmlFor="previousAssistanceDetails">
                            <span>When and what type of assistance did you receive?</span>
                          </Label>
                          <Textarea
                            id="previousAssistanceDetails"
                            {...form.register("previousAssistanceDetails")}
                            className="bg-white border border-gray-300 focus:border-redcross focus:ring-redcross transition-all duration-300"
                            placeholder="Please provide details about previous assistance..."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Documentation Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2 text-gray-800">
                    <FileText className="text-redcross h-5 w-5" />
                    Required Documentation
                  </h2>
                  
                  <div className="space-y-8">
                    <DocumentUpload
                      type="id"
                      value={form.watch("idDocuments")}
                      onChange={(files) => form.setValue("idDocuments", files, { shouldValidate: true })}
                      id="id-documents"
                    />
                    {form.formState.errors.idDocuments && (
                      <p className="text-red-500 text-sm animate-fade-in">{form.formState.errors.idDocuments.message}</p>
                    )}
                    
                    <DocumentUpload
                      type="income"
                      value={form.watch("incomeDocuments")}
                      onChange={(files) => form.setValue("incomeDocuments", files)}
                      id="income-documents"
                    />
                    
                    <DocumentUpload
                      type="housing"
                      value={form.watch("housingDocuments")}
                      onChange={(files) => form.setValue("housingDocuments", files)}
                      id="housing-documents"
                    />
                    
                    <DocumentUpload
                      type="crisis"
                      value={form.watch("crisisDocuments")}
                      onChange={(files) => form.setValue("crisisDocuments", files)}
                      id="crisis-documents"
                    />
                    
                    <DocumentUpload
                      type="other"
                      value={form.watch("otherDocuments")}
                      onChange={(files) => form.setValue("otherDocuments", files)}
                      id="other-documents"
                    />
                  </div>
                </div>
                
                {/* Additional Information Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2 text-gray-800">
                    <Info className="text-redcross h-5 w-5" />
                    Additional Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="isVeteran"
                        checked={form.watch("isVeteran")}
                        onCheckedChange={(checked) => {
                          form.setValue("isVeteran", checked === true);
                        }}
                        className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                      />
                      <div>
                        <Label htmlFor="isVeteran" className="font-medium">Are you a veteran?</Label>
                        <p className="text-sm text-gray-500">We have special programs for veterans</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="hasDisability"
                        checked={form.watch("hasDisability")}
                        onCheckedChange={(checked) => {
                          form.setValue("hasDisability", checked === true);
                        }}
                        className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                      />
                      <div>
                        <Label htmlFor="hasDisability" className="font-medium">Do you have a disability?</Label>
                        <p className="text-sm text-gray-500">This helps us provide appropriate accommodations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="needsInterpreter"
                        checked={form.watch("needsInterpreter")}
                        onCheckedChange={(checked) => {
                          form.setValue("needsInterpreter", checked === true);
                          if (!checked) {
                            form.setValue("preferredLanguage", "");
                          }
                        }}
                        className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                      />
                      <div>
                        <Label htmlFor="needsInterpreter" className="font-medium">Do you need an interpreter?</Label>
                        <p className="text-sm text-gray-500">We can provide language assistance</p>
                      </div>
                    </div>
                    
                    {form.watch("needsInterpreter") && (
                      <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="preferredLanguage">Preferred Language</Label>
                        <Select
                          onValueChange={(value) => form.setValue("preferredLanguage", value)}
                          defaultValue={form.watch("preferredLanguage")}
                        >
                          <SelectTrigger id="preferredLanguage" className="bg-white border border-gray-300 focus:border-redcross focus:ring-redcross">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languageOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="additionalNotes">
                      Additional Notes or Special Circumstances
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      {...form.register("additionalNotes")}
                      className="bg-white border border-gray-300 focus:border-redcross focus:ring-redcross transition-all duration-300 min-h-[100px]"
                      placeholder="Is there anything else you would like us to know about your situation?"
                    />
                  </div>
                </div>
                
                {/* Rights and Signature Section */}
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2 text-gray-800">
                    <FileText className="text-redcross h-5 w-5" />
                    Applicant Rights & Signature
                  </h2>
                  
                  <div className="p-5 bg-gray-50 rounded-md border border-gray-200 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Your Rights as an Applicant</h3>
                        <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
                          <li>You have the right to be treated with dignity and respect.</li>
                          <li>You have the right to confidentiality regarding your personal information.</li>
                          <li>You have the right to receive assistance without discrimination based on race, color, national origin, religion, sex, familial status, disability, or age.</li>
                          <li>You have the right to appeal decisions regarding your application.</li>
                          <li>You have the right to request reasonable accommodations for disabilities.</li>
                          <li>You have the right to receive clear information about the assistance program requirements and your responsibilities.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md">
                      <Checkbox
                        id="documentationAgreement"
                        checked={form.watch("documentationAgreement")}
                        onCheckedChange={(checked) => {
                          form.setValue("documentationAgreement", checked === true, { shouldValidate: true });
                        }}
                        className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                      />
                      <div>
                        <Label htmlFor="documentationAgreement" className="font-medium flex items-center">
                          Documentation Agreement <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I agree to provide all necessary documentation to verify the information provided in this application upon request.
                        </p>
                        {form.formState.errors.documentationAgreement && (
                          <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.documentationAgreement.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md">
                      <Checkbox
                        id="verificationAgreement"
                        checked={form.watch("verificationAgreement")}
                        onCheckedChange={(checked) => {
                          form.setValue("verificationAgreement", checked === true, { shouldValidate: true });
                        }}
                        className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                      />
                      <div>
                        <Label htmlFor="verificationAgreement" className="font-medium flex items-center">
                          Verification Agreement <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I authorize verification of all information provided in this application, including contacting employers, landlords, or other parties as needed.
                        </p>
                        {form.formState.errors.verificationAgreement && (
                          <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.verificationAgreement.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md">
                      <Checkbox
                        id="truthfulnessAgreement"
                        checked={form.watch("truthfulnessAgreement")}
                        onCheckedChange={(checked) => {
                          form.setValue("truthfulnessAgreement", checked === true, { shouldValidate: true });
                        }}
                        className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                      />
                      <div>
                        <Label htmlFor="truthfulnessAgreement" className="font-medium flex items-center">
                          Truthfulness Certification <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I certify that all information provided in this application is true and complete to the best of my knowledge.
                        </p>
                        {form.formState.errors.truthfulnessAgreement && (
                          <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.truthfulnessAgreement.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 mt-4 pt-4 border-t border-gray-200">
                    <DigitalSignature 
                      onChange={(signatureData) => form.setValue("signature", signatureData, { shouldValidate: true })}
                      value={form.watch("signature")}
                    />
                    {form.formState.errors.signature && (
                      <p className="text-red-500 text-sm animate-fade-in">{form.formState.errors.signature.message}</p>
                    )}
                    
                    <div className="space-y-2 relative group max-w-xs">
                      <Label htmlFor="signatureDate" className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>Date</span> <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="signatureDate"
                        type="date"
                        {...form.register("signatureDate")}
                        className={`bg-white border transition-all duration-300 ${form.formState.errors.signatureDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-redcross focus:ring-redcross'}`}
                      />
                      {form.formState.errors.signatureDate && (
                        <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.signatureDate.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-6">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-redcross hover:bg-redcross-dark text-white px-6 py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4 group-hover:translate-x.5 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </ApplicationWrapper>
      </div>
    </div>
  );
};

export default AssistanceApplication;
