
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Info, 
  User, 
  Home, 
  FileText, 
  Heart, 
  HelpCircle,
  Phone, 
  Mail, 
  Calendar, 
  AlertTriangle,
  UserCheck,
  Users,
  BarChart4,
  DollarSign,
  FileCheck
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultiSelectAssistance from "@/components/MultiSelectAssistance";

// Form validation schema
const assistanceSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(1, "Social Security Number is required"),
  idNumber: z.string().min(1, "ID number is required"),
  idIssueDate: z.string().min(1, "ID issue date is required"),
  idExpirationDate: z.string().min(1, "ID expiration date is required"),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Current address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 digits"),
  
  // Household Information
  householdSize: z.string().min(1, "Household size is required"),
  householdMembers: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    age: z.string().min(1, "Age is required"),
    isDependent: z.boolean().optional(),
  })).optional(),
  
  // Demographics (optional)
  race: z.string().optional(),
  ethnicity: z.string().optional(),
  gender: z.string().optional(),
  disabilityStatus: z.string().optional(),
  veteranStatus: z.boolean().optional(),
  
  // Income and Financial Information
  employmentStatus: z.string().min(1, "Employment status is required"),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  incomeSource: z.string().optional(),
  noIncomeReason: z.string().optional(),
  
  // Housing Status
  housingStatus: z.string().min(1, "Housing status is required"),
  evictionNotice: z.boolean().optional(),
  evictionDate: z.string().optional(),
  landlordName: z.string().optional(),
  landlordPhone: z.string().optional(),
  landlordEmail: z.string().optional(),
  
  // Assistance Needed
  assistanceTypes: z.array(z.string()).min(1, "Please select at least one type of assistance needed"),
  crisisDescription: z.string().min(1, "Please describe your current situation and needs"),
  
  // Emergency Contact
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone must be at least 10 digits"),
  emergencyContactRelationship: z.string().min(1, "Emergency contact relationship is required"),
  
  // Health Information
  hasHealthConcerns: z.boolean().optional(),
  healthConcerns: z.string().optional(),
  medications: z.string().optional(),
  
  // Agreements and Consents
  informationRelease: z.boolean().refine(value => value === true, {
    message: "You must consent to release of information",
  }),
  accuracyAcknowledgment: z.boolean().refine(value => value === true, {
    message: "You must acknowledge that all information is accurate",
  }),
  privacyConsent: z.boolean().refine(value => value === true, {
    message: "You must consent to our privacy policy",
  }),
});

type AssistanceFormValues = z.infer<typeof assistanceSchema>;

// Options for selectable fields
const stateOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

const raceOptions = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Native Hawaiian or Other Pacific Islander",
  "White",
  "Multiple Races",
  "Prefer not to say"
];

const ethnicityOptions = [
  "Hispanic or Latino",
  "Not Hispanic or Latino",
  "Prefer not to say"
];

const genderOptions = [
  "Male",
  "Female",
  "Non-binary/third gender",
  "Prefer to self-describe",
  "Prefer not to say"
];

const employmentStatusOptions = [
  "Full-time employed",
  "Part-time employed",
  "Self-employed",
  "Unemployed",
  "Retired",
  "Student",
  "Unable to work due to disability",
  "Other"
];

const housingStatusOptions = [
  "Renting",
  "Own home",
  "Staying with friends/family",
  "Homeless",
  "Emergency shelter",
  "Transitional housing",
  "Vehicle",
  "Other"
];

const assistanceTypeOptions = [
  { value: "rental", label: "Rental Assistance" },
  { value: "utilities", label: "Utility Bill Assistance" },
  { value: "foodAssistance", label: "Food Assistance" },
  { value: "housingPlacement", label: "Housing Placement" },
  { value: "shelterServices", label: "Emergency Shelter Services" },
  { value: "mentalHealth", label: "Mental Health Services" },
  { value: "substanceAbuse", label: "Substance Abuse Services" },
  { value: "medicalServices", label: "Medical Services/Supplies" },
  { value: "transportation", label: "Transportation Assistance" },
  { value: "employmentSupport", label: "Employment Support" },
  { value: "childcare", label: "Childcare Assistance" },
  { value: "legalAid", label: "Legal Aid" },
  { value: "financialCounseling", label: "Financial Counseling" },
  { value: "depositAssistance", label: "Security Deposit Assistance" },
  { value: "furnitureAppliances", label: "Furniture/Appliances" },
  { value: "clothingAssistance", label: "Clothing Assistance" },
  { value: "other", label: "Other (please specify)" }
];

const AssistanceApplication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [showEmergencyContact, setShowEmergencyContact] = useState(true);
  const [showLandlordInfo, setShowLandlordInfo] = useState(false);
  const [showHealthInfo, setShowHealthInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [householdMembers, setHouseholdMembers] = useState([
    { name: "", relationship: "", age: "", isDependent: false }
  ]);
  
  // Initialize form
  const form = useForm<AssistanceFormValues>({
    resolver: zodResolver(assistanceSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      ssn: "",
      idNumber: "",
      idIssueDate: "",
      idExpirationDate: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      householdSize: "",
      race: "",
      ethnicity: "",
      gender: "",
      disabilityStatus: "",
      veteranStatus: false,
      employmentStatus: "",
      monthlyIncome: "",
      incomeSource: "",
      noIncomeReason: "",
      housingStatus: "",
      evictionNotice: false,
      evictionDate: "",
      landlordName: "",
      landlordPhone: "",
      landlordEmail: "",
      assistanceTypes: [],
      crisisDescription: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      hasHealthConcerns: false,
      healthConcerns: "",
      medications: "",
      informationRelease: false,
      accuracyAcknowledgment: false,
      privacyConsent: false,
    }
  });
  
  // Watch specific form values to display conditional fields
  const housingStatus = form.watch("housingStatus");
  const hasHealthConcerns = form.watch("hasHealthConcerns");
  const evictionNotice = form.watch("evictionNotice");
  const employmentStatus = form.watch("employmentStatus");
  
  // Update conditional fields display based on form values
  React.useEffect(() => {
    if (housingStatus === "Renting") {
      setShowLandlordInfo(true);
    } else {
      setShowLandlordInfo(false);
      form.setValue("landlordName", "");
      form.setValue("landlordPhone", "");
      form.setValue("landlordEmail", "");
    }
    
    setShowHealthInfo(hasHealthConcerns === true);
    
    if (employmentStatus === "Unemployed") {
      form.setValue("monthlyIncome", "0");
    }
  }, [housingStatus, hasHealthConcerns, employmentStatus, form]);
  
  // Submit form
  const onSubmit = (data: AssistanceFormValues) => {
    console.log("Form data:", data);
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted successfully");
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast.success("Application submitted successfully");
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  // Add household member
  const addHouseholdMember = () => {
    setHouseholdMembers([
      ...householdMembers,
      { name: "", relationship: "", age: "", isDependent: false }
    ]);
  };
  
  // Remove household member
  const removeHouseholdMember = (index: number) => {
    const updatedMembers = [...householdMembers];
    updatedMembers.splice(index, 1);
    setHouseholdMembers(updatedMembers);
  };
  
  // Update household member
  const updateHouseholdMember = (index: number, field: string, value: string | boolean) => {
    const updatedMembers = [...householdMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setHouseholdMembers(updatedMembers);
    form.setValue("householdMembers", updatedMembers);
  };
  
  // Go to next tab
  const goToNextTab = () => {
    if (activeTab === "personal") setActiveTab("household");
    else if (activeTab === "household") setActiveTab("demographics");
    else if (activeTab === "demographics") setActiveTab("income");
    else if (activeTab === "income") setActiveTab("housing");
    else if (activeTab === "housing") setActiveTab("assistance");
    else if (activeTab === "assistance") setActiveTab("health");
    else if (activeTab === "health") setActiveTab("documents");
    else if (activeTab === "documents") setActiveTab("consent");
  };
  
  // Go to previous tab
  const goToPrevTab = () => {
    if (activeTab === "consent") setActiveTab("documents");
    else if (activeTab === "documents") setActiveTab("health");
    else if (activeTab === "health") setActiveTab("assistance");
    else if (activeTab === "assistance") setActiveTab("housing");
    else if (activeTab === "housing") setActiveTab("income");
    else if (activeTab === "income") setActiveTab("demographics");
    else if (activeTab === "demographics") setActiveTab("household");
    else if (activeTab === "household") setActiveTab("personal");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {isSubmitted ? (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-center">Application Submitted Successfully</h1>
              <p className="text-gray-600 text-center">
                Thank you for submitting your assistance application. Our team will review your information and contact you within 2-3 business days regarding next steps. Your application ID is: APP-{Math.floor(Math.random() * 900000) + 100000}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Return to Home
                </Button>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                    setActiveTab("personal");
                  }}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" /> Submit Another Application
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-center">Assistance Application</h1>
              <p className="text-gray-600 text-center mt-2">
                Please complete all required fields (marked with *) to apply for assistance.
              </p>
            </div>
            
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-8">
                  <TabsTrigger value="personal" className="text-xs md:text-sm">
                    <User className="h-4 w-4 mr-1 hidden md:inline" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="household" className="text-xs md:text-sm">
                    <Users className="h-4 w-4 mr-1 hidden md:inline" />
                    Household
                  </TabsTrigger>
                  <TabsTrigger value="demographics" className="text-xs md:text-sm">
                    <BarChart4 className="h-4 w-4 mr-1 hidden md:inline" />
                    Demographics
                  </TabsTrigger>
                  <TabsTrigger value="income" className="text-xs md:text-sm">
                    <DollarSign className="h-4 w-4 mr-1 hidden md:inline" />
                    Income
                  </TabsTrigger>
                  <TabsTrigger value="housing" className="text-xs md:text-sm">
                    <Home className="h-4 w-4 mr-1 hidden md:inline" />
                    Housing
                  </TabsTrigger>
                  <TabsTrigger value="assistance" className="text-xs md:text-sm">
                    <Heart className="h-4 w-4 mr-1 hidden md:inline" />
                    Assistance
                  </TabsTrigger>
                  <TabsTrigger value="health" className="text-xs md:text-sm">
                    <HelpCircle className="h-4 w-4 mr-1 hidden md:inline" />
                    Health
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="text-xs md:text-sm">
                    <FileText className="h-4 w-4 mr-1 hidden md:inline" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="consent" className="text-xs md:text-sm">
                    <FileCheck className="h-4 w-4 mr-1 hidden md:inline" />
                    Consent
                  </TabsTrigger>
                </TabsList>
                
                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Personal Information</h3>
                      <p className="text-sm text-blue-700">
                        Please provide your personal identification details. All information is kept confidential and secure.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center">
                        First Name <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        className={`${form.formState.errors.firstName ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="middleName">
                        Middle Name <span className="text-gray-400 text-sm">(optional)</span>
                      </Label>
                      <Input
                        id="middleName"
                        {...form.register("middleName")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center">
                        Last Name <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        className={`${form.formState.errors.lastName ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="flex items-center">
                        Date of Birth <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...form.register("dateOfBirth")}
                        className={`${form.formState.errors.dateOfBirth ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.dateOfBirth && (
                        <p className="text-red-500 text-sm">{form.formState.errors.dateOfBirth.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ssn" className="flex items-center">
                        Social Security Number <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="ssn"
                        placeholder="XXX-XX-XXXX"
                        {...form.register("ssn")}
                        className={`${form.formState.errors.ssn ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.ssn && (
                        <p className="text-red-500 text-sm">{form.formState.errors.ssn.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idNumber" className="flex items-center">
                        Government ID Number <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="idNumber"
                        {...form.register("idNumber")}
                        className={`${form.formState.errors.idNumber ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.idNumber && (
                        <p className="text-red-500 text-sm">{form.formState.errors.idNumber.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idIssueDate" className="flex items-center">
                        ID Issue Date <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="idIssueDate"
                        type="date"
                        {...form.register("idIssueDate")}
                        className={`${form.formState.errors.idIssueDate ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.idIssueDate && (
                        <p className="text-red-500 text-sm">{form.formState.errors.idIssueDate.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idExpirationDate" className="flex items-center">
                        ID Expiration Date <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="idExpirationDate"
                        type="date"
                        {...form.register("idExpirationDate")}
                        className={`${form.formState.errors.idExpirationDate ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.idExpirationDate && (
                        <p className="text-red-500 text-sm">{form.formState.errors.idExpirationDate.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Phone Number <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="(123) 456-7890"
                        {...form.register("phone")}
                        className={`${form.formState.errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Email Address <span className="text-gray-400 text-sm">(optional)</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...form.register("email")}
                        className={`${form.formState.errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      Current Address <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="Street address"
                      {...form.register("address")}
                      className={`${form.formState.errors.address ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="flex items-center">
                        City <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="city"
                        {...form.register("city")}
                        className={`${form.formState.errors.city ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.city && (
                        <p className="text-red-500 text-sm">{form.formState.errors.city.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state" className="flex items-center">
                        State <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}
                        defaultValue={form.watch("state")}
                      >
                        <SelectTrigger 
                          id="state"
                          className={`${form.formState.errors.state ? "border-red-500 focus:ring-red-500" : ""}`}
                        >
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {stateOptions.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.state && (
                        <p className="text-red-500 text-sm">{form.formState.errors.state.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="flex items-center">
                        ZIP Code <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        {...form.register("zipCode")}
                        className={`${form.formState.errors.zipCode ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.zipCode && (
                        <p className="text-red-500 text-sm">{form.formState.errors.zipCode.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <Button type="button" variant="outline" onClick={() => navigate("/")}>
                      <ArrowLeft className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button type="button" onClick={goToNextTab}>
                      Next <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                
                {/* All other tabs would go here... I'll implement the Assistance tab which needs the checkbox multi-select */}
                
                {/* Assistance Needed Tab */}
                <TabsContent value="assistance" className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start gap-3">
                    <Heart className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Assistance Needed</h3>
                      <p className="text-sm text-blue-700">
                        Please select all types of assistance you are currently seeking and describe your situation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="assistanceTypes" className="flex items-center">
                        Types of Assistance Needed <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <p className="text-sm text-gray-500 mb-2">Select all that apply</p>
                      
                      <MultiSelectAssistance
                        id="assistanceTypes"
                        options={assistanceTypeOptions}
                        selectedValues={form.watch("assistanceTypes") || []}
                        onChange={(values) => form.setValue("assistanceTypes", values, { shouldValidate: true })}
                        placeholder="Select assistance types"
                        error={!!form.formState.errors.assistanceTypes}
                      />
                      
                      {form.formState.errors.assistanceTypes && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.assistanceTypes.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="crisisDescription" className="flex items-center">
                        Please describe your current situation and needs <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Textarea
                        id="crisisDescription"
                        placeholder="Please provide details about your current situation and what specific help you need..."
                        rows={5}
                        {...form.register("crisisDescription")}
                        className={`${form.formState.errors.crisisDescription ? "border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {form.formState.errors.crisisDescription && (
                        <p className="text-red-500 text-sm">{form.formState.errors.crisisDescription.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <Button type="button" variant="outline" onClick={goToPrevTab}>
                      <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <Button type="button" onClick={goToNextTab}>
                      Next <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Additional tabs would go here */}
                
                {/* Consent Tab - for form submission */}
                <TabsContent value="consent" className="space-y-6">
                  <div className="bg-amber-50 p-4 rounded-md mb-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800">Authorization & Consent</h3>
                      <p className="text-sm text-amber-700">
                        Please review and acknowledge the following statements before submitting your application.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-md">
                      <Checkbox
                        id="informationRelease"
                        checked={form.watch("informationRelease")}
                        onCheckedChange={(checked) => {
                          form.setValue("informationRelease", checked === true, { shouldValidate: true });
                        }}
                        className="mt-1"
                      />
                      <div>
                        <Label htmlFor="informationRelease" className="font-medium">Information Release Consent</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I authorize the organization to collect, store, and share my information with relevant service providers for the purpose of providing assistance. I understand that my information will be kept confidential and secure.
                        </p>
                        {form.formState.errors.informationRelease && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.informationRelease.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-md">
                      <Checkbox
                        id="accuracyAcknowledgment"
                        checked={form.watch("accuracyAcknowledgment")}
                        onCheckedChange={(checked) => {
                          form.setValue("accuracyAcknowledgment", checked === true, { shouldValidate: true });
                        }}
                        className="mt-1"
                      />
                      <div>
                        <Label htmlFor="accuracyAcknowledgment" className="font-medium">Accuracy of Information</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I certify that all information provided in this application is true and accurate to the best of my knowledge. I understand that providing false information may result in denial of assistance and potential legal consequences.
                        </p>
                        {form.formState.errors.accuracyAcknowledgment && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.accuracyAcknowledgment.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-md">
                      <Checkbox
                        id="privacyConsent"
                        checked={form.watch("privacyConsent")}
                        onCheckedChange={(checked) => {
                          form.setValue("privacyConsent", checked === true, { shouldValidate: true });
                        }}
                        className="mt-1"
                      />
                      <div>
                        <Label htmlFor="privacyConsent" className="font-medium">Privacy Policy Consent</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          I acknowledge that I have read and understand the organization's privacy policy regarding the collection, use, and protection of my personal information.
                        </p>
                        {form.formState.errors.privacyConsent && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.privacyConsent.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        <strong>Appeal Process:</strong> If your application is denied, you have the right to appeal the decision within 14 days of notification. Please contact our office for information on how to file an appeal.
                      </p>
                    </div>
                  </div>
                  
                  {/* Navigation and submit buttons */}
                  <div className="flex justify-between mt-8">
                    <Button type="button" variant="outline" onClick={goToPrevTab}>
                      <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistanceApplication;
