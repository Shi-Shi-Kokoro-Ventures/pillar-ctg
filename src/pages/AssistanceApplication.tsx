
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Check, Home, User, Mail, Phone, Building, CalendarClock, Users, DollarSign, FileText, BookOpen, ShieldCheck, FileImage, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ApplicationHeader from "@/components/ApplicationHeader";
import ApplicationWrapper from "@/components/ApplicationWrapper";

// Define application schema
const assistanceFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Please enter a valid ZIP code" }),
  
  // Current Housing Situation
  currentHousingStatus: z.string().min(1, { message: "Current housing status is required" }),
  numberOfBedrooms: z.string().min(1, { message: "Number of bedrooms is required" }),
  monthlyRent: z.string().min(1, { message: "Monthly rent is required" }),
  isFacingEviction: z.boolean().optional(),
  evictionDetails: z.string().optional(),
  
  // Household Information
  householdSize: z.string().min(1, { message: "Household size is required" }),
  hasChildren: z.boolean(),
  childrenAges: z.string().optional(),
  hasSeniors: z.boolean(),
  hasDisabled: z.boolean(),
  disabilityDetails: z.string().optional(),
  
  // Income Information
  incomeSource: z.string().min(1, { message: "Income source is required" }),
  monthlyIncome: z.string().min(1, { message: "Monthly income is required" }),
  hasOtherIncome: z.boolean(),
  otherIncomeDetails: z.string().optional(),
  isUnemployed: z.boolean(),
  unemploymentDetails: z.string().optional(),
  
  // Assistance Needs
  assistanceType: z.array(z.string()).min(1, { message: "Please select at least one type of assistance" }),
  amountNeeded: z.string().min(1, { message: "Amount needed is required" }),
  assistanceReason: z.string().min(1, { message: "Please provide a reason for assistance" }),
  isPastDue: z.boolean(),
  pastDueAmount: z.string().optional(),
  
  // Additional Information
  hasPriorAssistance: z.boolean(),
  priorAssistanceDetails: z.string().optional(),
  additionalInformation: z.string().optional(),
  hasDocuments: z.boolean(),
  
  // Consent and Agreement
  consentToVerification: z.boolean().refine(val => val === true, { message: "You must consent to verification" }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions" }),
  certifyTruthfulness: z.boolean().refine(val => val === true, { message: "You must certify the truthfulness of your information" }),
});

type AssistanceFormValues = z.infer<typeof assistanceFormSchema>;

const housingStatusOptions = [
  { value: "renting", label: "Currently Renting" },
  { value: "homeowner", label: "Homeowner with Mortgage" },
  { value: "temporary", label: "Temporary Housing" },
  { value: "homeless", label: "Homeless or At Risk" },
  { value: "living_with_family", label: "Living with Family/Friends" },
  { value: "other", label: "Other" }
];

const bedroomsOptions = [
  { value: "studio", label: "Studio/Efficiency" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4 Bedrooms" },
  { value: "5+", label: "5+ Bedrooms" }
];

const householdSizeOptions = [
  { value: "1", label: "1 Person" },
  { value: "2", label: "2 People" },
  { value: "3", label: "3 People" },
  { value: "4", label: "4 People" },
  { value: "5", label: "5 People" },
  { value: "6", label: "6 People" },
  { value: "7+", label: "7+ People" }
];

const incomeSourceOptions = [
  { value: "employment", label: "Employment" },
  { value: "self_employment", label: "Self-Employment" },
  { value: "social_security", label: "Social Security" },
  { value: "disability", label: "Disability" },
  { value: "retirement", label: "Retirement/Pension" },
  { value: "unemployment", label: "Unemployment Benefits" },
  { value: "child_support", label: "Child Support/Alimony" },
  { value: "tanf", label: "TANF" },
  { value: "va_benefits", label: "VA Benefits" },
  { value: "other", label: "Other" }
];

const assistanceTypeOptions = [
  { id: "rent", label: "Rent Assistance" },
  { id: "utility", label: "Utility Bills" },
  { id: "security_deposit", label: "Security Deposit" },
  { id: "mortgage", label: "Mortgage Payment" },
  { id: "home_repairs", label: "Home Repairs" },
  { id: "eviction_prevention", label: "Eviction Prevention" },
  { id: "moving_costs", label: "Moving Costs" },
  { id: "temporary_housing", label: "Temporary Housing" },
  { id: "other", label: "Other" }
];

const stateOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

const AssistanceApplication = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<AssistanceFormValues>({
    resolver: zodResolver(assistanceFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      currentHousingStatus: "",
      numberOfBedrooms: "",
      monthlyRent: "",
      isFacingEviction: false,
      evictionDetails: "",
      householdSize: "",
      hasChildren: false,
      childrenAges: "",
      hasSeniors: false,
      hasDisabled: false,
      disabilityDetails: "",
      incomeSource: "",
      monthlyIncome: "",
      hasOtherIncome: false,
      otherIncomeDetails: "",
      isUnemployed: false,
      unemploymentDetails: "",
      assistanceType: [],
      amountNeeded: "",
      assistanceReason: "",
      isPastDue: false,
      pastDueAmount: "",
      hasPriorAssistance: false,
      priorAssistanceDetails: "",
      additionalInformation: "",
      hasDocuments: false,
      consentToVerification: false,
      agreeToTerms: false,
      certifyTruthfulness: false
    }
  });
  
  function onSubmit(data: AssistanceFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      toast.success("Application submitted successfully!");
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-8">
          {isSubmitted ? (
            <div className="text-center p-8 bg-white rounded-xl shadow-xl border border-green-100 animate-fade-in neo-glass">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-800">Application Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your housing assistance application. Our team will review your information and contact you shortly.
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
            <ApplicationWrapper 
              title="Housing Assistance Application"
              subtitle="Complete this form to apply for housing assistance. All information provided will be kept confidential."
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 neo-glass-card">
                    <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 text-gradient-primary">
                      <User className="h-5 w-5 text-redcross" />
                      Personal Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-form-label flex items-center gap-1">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.firstName ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-red-500 text-sm">{form.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-form-label flex items-center gap-1">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.lastName ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-red-500 text-sm">{form.formState.errors.lastName.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-form-label flex items-center gap-1">
                          Date of Birth <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          {...form.register("dateOfBirth")}
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.dateOfBirth ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.dateOfBirth && (
                          <p className="text-red-500 text-sm">{form.formState.errors.dateOfBirth.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-form-label flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.email ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-form-label flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Phone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          {...form.register("phone")}
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.phone ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.phone && (
                          <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <Label htmlFor="address" className="text-form-label flex items-center gap-1">
                        Street Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        {...form.register("address")}
                        className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.address ? 'border-red-300' : ''}`}
                      />
                      {form.formState.errors.address && (
                        <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-form-label flex items-center gap-1">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          {...form.register("city")}
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.city ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.city && (
                          <p className="text-red-500 text-sm">{form.formState.errors.city.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-form-label flex items-center gap-1">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}
                          defaultValue={form.watch("state")}
                        >
                          <SelectTrigger 
                            id="state"
                            className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.state ? 'border-red-300' : ''}`}
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
                          <p className="text-red-500 text-sm">{form.formState.errors.state.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-form-label flex items-center gap-1">
                          ZIP Code <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="zipCode"
                          {...form.register("zipCode")}
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.zipCode ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.zipCode && (
                          <p className="text-red-500 text-sm">{form.formState.errors.zipCode.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Current Housing Section */}
                  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 neo-glass-card">
                    <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 text-gradient-primary">
                      <Building className="h-5 w-5 text-redcross" />
                      Current Housing Situation
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentHousingStatus" className="text-form-label flex items-center gap-1">
                          Current Housing Status <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => form.setValue("currentHousingStatus", value, { shouldValidate: true })}
                          defaultValue={form.watch("currentHousingStatus")}
                        >
                          <SelectTrigger 
                            id="currentHousingStatus"
                            className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.currentHousingStatus ? 'border-red-300' : ''}`}
                          >
                            <SelectValue placeholder="Select housing status" />
                          </SelectTrigger>
                          <SelectContent>
                            {housingStatusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.currentHousingStatus && (
                          <p className="text-red-500 text-sm">{form.formState.errors.currentHousingStatus.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="numberOfBedrooms" className="text-form-label flex items-center gap-1">
                          Unit Size <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => form.setValue("numberOfBedrooms", value, { shouldValidate: true })}
                          defaultValue={form.watch("numberOfBedrooms")}
                        >
                          <SelectTrigger 
                            id="numberOfBedrooms"
                            className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.numberOfBedrooms ? 'border-red-300' : ''}`}
                          >
                            <SelectValue placeholder="Select unit size" />
                          </SelectTrigger>
                          <SelectContent>
                            {bedroomsOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.numberOfBedrooms && (
                          <p className="text-red-500 text-sm">{form.formState.errors.numberOfBedrooms.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="monthlyRent" className="text-form-label flex items-center gap-1">
                          Monthly Rent/Mortgage <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="monthlyRent"
                            {...form.register("monthlyRent")}
                            className={`pl-7 bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.monthlyRent ? 'border-red-300' : ''}`}
                          />
                        </div>
                        {form.formState.errors.monthlyRent && (
                          <p className="text-red-500 text-sm">{form.formState.errors.monthlyRent.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-form-label flex items-center gap-1">
                          Facing Eviction?
                        </Label>
                        <div className="flex items-center space-x-2 h-10 px-3">
                          <Checkbox
                            id="isFacingEviction"
                            checked={form.watch("isFacingEviction")}
                            onCheckedChange={(checked) => {
                              form.setValue("isFacingEviction", checked as boolean);
                            }}
                            className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                          />
                          <Label htmlFor="isFacingEviction" className="font-normal">
                            Yes, I am facing eviction
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    {form.watch("isFacingEviction") && (
                      <div className="mt-4 space-y-2 p-4 bg-red-50 rounded-md border border-red-100">
                        <Label htmlFor="evictionDetails" className="text-form-label flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Eviction Details
                        </Label>
                        <Textarea
                          id="evictionDetails"
                          {...form.register("evictionDetails")}
                          placeholder="Please provide details about your eviction situation"
                          className="bg-white border-red-100 focus:border-redcross"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Household Information Section */}
                  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 neo-glass-card">
                    <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 text-gradient-primary">
                      <Users className="h-5 w-5 text-redcross" />
                      Household Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="householdSize" className="text-form-label flex items-center gap-1">
                          Household Size <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => form.setValue("householdSize", value, { shouldValidate: true })}
                          defaultValue={form.watch("householdSize")}
                        >
                          <SelectTrigger 
                            id="householdSize"
                            className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.householdSize ? 'border-red-300' : ''}`}
                          >
                            <SelectValue placeholder="Select household size" />
                          </SelectTrigger>
                          <SelectContent>
                            {householdSizeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.householdSize && (
                          <p className="text-red-500 text-sm">{form.formState.errors.householdSize.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-form-label">Household Members</Label>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2 py-2">
                            <Checkbox
                              id="hasChildren"
                              checked={form.watch("hasChildren")}
                              onCheckedChange={(checked) => {
                                form.setValue("hasChildren", checked as boolean);
                              }}
                              className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                            />
                            <Label htmlFor="hasChildren" className="font-normal">
                              Children under 18
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 py-2">
                            <Checkbox
                              id="hasSeniors"
                              checked={form.watch("hasSeniors")}
                              onCheckedChange={(checked) => {
                                form.setValue("hasSeniors", checked as boolean);
                              }}
                              className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                            />
                            <Label htmlFor="hasSeniors" className="font-normal">
                              Seniors (65+)
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 py-2">
                            <Checkbox
                              id="hasDisabled"
                              checked={form.watch("hasDisabled")}
                              onCheckedChange={(checked) => {
                                form.setValue("hasDisabled", checked as boolean);
                              }}
                              className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                            />
                            <Label htmlFor="hasDisabled" className="font-normal">
                              Person(s) with disabilities
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {form.watch("hasChildren") && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="childrenAges" className="text-form-label">
                          Ages of Children
                        </Label>
                        <Input
                          id="childrenAges"
                          {...form.register("childrenAges")}
                          placeholder="e.g., 3, 7, 15"
                          className="bg-form-bg border-form-border focus:border-form-focus"
                        />
                      </div>
                    )}
                    
                    {form.watch("hasDisabled") && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="disabilityDetails" className="text-form-label">
                          Disability Information
                        </Label>
                        <Textarea
                          id="disabilityDetails"
                          {...form.register("disabilityDetails")}
                          placeholder="Please provide details about disabilities that may require accommodation"
                          className="bg-form-bg border-form-border focus:border-form-focus"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Income Information Section */}
                  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 neo-glass-card">
                    <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 text-gradient-primary">
                      <DollarSign className="h-5 w-5 text-redcross" />
                      Income Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="incomeSource" className="text-form-label flex items-center gap-1">
                          Primary Income Source <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => form.setValue("incomeSource", value, { shouldValidate: true })}
                          defaultValue={form.watch("incomeSource")}
                        >
                          <SelectTrigger 
                            id="incomeSource"
                            className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.incomeSource ? 'border-red-300' : ''}`}
                          >
                            <SelectValue placeholder="Select income source" />
                          </SelectTrigger>
                          <SelectContent>
                            {incomeSourceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.incomeSource && (
                          <p className="text-red-500 text-sm">{form.formState.errors.incomeSource.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome" className="text-form-label flex items-center gap-1">
                          Monthly Income <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="monthlyIncome"
                            {...form.register("monthlyIncome")}
                            className={`pl-7 bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.monthlyIncome ? 'border-red-300' : ''}`}
                          />
                        </div>
                        {form.formState.errors.monthlyIncome && (
                          <p className="text-red-500 text-sm">{form.formState.errors.monthlyIncome.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-form-label">Other Income?</Label>
                        <div className="flex items-center space-x-2 h-10 px-3">
                          <Checkbox
                            id="hasOtherIncome"
                            checked={form.watch("hasOtherIncome")}
                            onCheckedChange={(checked) => {
                              form.setValue("hasOtherIncome", checked as boolean);
                            }}
                            className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                          />
                          <Label htmlFor="hasOtherIncome" className="font-normal">
                            Yes
                          </Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-form-label">Unemployed?</Label>
                        <div className="flex items-center space-x-2 h-10 px-3">
                          <Checkbox
                            id="isUnemployed"
                            checked={form.watch("isUnemployed")}
                            onCheckedChange={(checked) => {
                              form.setValue("isUnemployed", checked as boolean);
                            }}
                            className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                          />
                          <Label htmlFor="isUnemployed" className="font-normal">
                            Yes
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    {form.watch("hasOtherIncome") && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="otherIncomeDetails" className="text-form-label">
                          Other Income Details
                        </Label>
                        <Textarea
                          id="otherIncomeDetails"
                          {...form.register("otherIncomeDetails")}
                          placeholder="Please provide details about other sources of income"
                          className="bg-form-bg border-form-border focus:border-form-focus"
                        />
                      </div>
                    )}
                    
                    {form.watch("isUnemployed") && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="unemploymentDetails" className="text-form-label">
                          Unemployment Details
                        </Label>
                        <Textarea
                          id="unemploymentDetails"
                          {...form.register("unemploymentDetails")}
                          placeholder="Please provide details about your unemployment situation"
                          className="bg-form-bg border-form-border focus:border-form-focus"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Assistance Needs Section */}
                  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 neo-glass-card">
                    <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 text-gradient-primary">
                      <Home className="h-5 w-5 text-redcross" />
                      Assistance Needs
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-form-label flex items-center gap-1 mb-3">
                          Type of Assistance Needed <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {assistanceTypeOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.id}
                                checked={(form.watch("assistanceType") || []).includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const currentValues = form.watch("assistanceType") || [];
                                  const newValues = checked
                                    ? [...currentValues, option.id]
                                    : currentValues.filter(value => value !== option.id);
                                  form.setValue("assistanceType", newValues, { shouldValidate: true });
                                }}
                                className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                              />
                              <Label htmlFor={option.id} className="font-normal">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {form.formState.errors.assistanceType && (
                          <p className="text-red-500 text-sm mt-2">{form.formState.errors.assistanceType.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="amountNeeded" className="text-form-label flex items-center gap-1">
                            Amount Needed <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                              id="amountNeeded"
                              {...form.register("amountNeeded")}
                              className={`pl-7 bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.amountNeeded ? 'border-red-300' : ''}`}
                            />
                          </div>
                          {form.formState.errors.amountNeeded && (
                            <p className="text-red-500 text-sm">{form.formState.errors.amountNeeded.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-form-label flex items-center gap-1">
                            Past Due Amount?
                          </Label>
                          <div className="flex items-center space-x-2 h-10 px-3">
                            <Checkbox
                              id="isPastDue"
                              checked={form.watch("isPastDue")}
                              onCheckedChange={(checked) => {
                                form.setValue("isPastDue", checked as boolean);
                              }}
                              className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                            />
                            <Label htmlFor="isPastDue" className="font-normal">
                              Yes, I have past due bills
                            </Label>
                          </div>
                        </div>
                      </div>
                      
                      {form.watch("isPastDue") && (
                        <div className="space-y-2">
                          <Label htmlFor="pastDueAmount" className="text-form-label">
                            Past Due Amount
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                              id="pastDueAmount"
                              {...form.register("pastDueAmount")}
                              className="pl-7 bg-form-bg border-form-border focus:border-form-focus"
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="assistanceReason" className="text-form-label flex items-center gap-1">
                          Reason for Assistance <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="assistanceReason"
                          {...form.register("assistanceReason")}
                          placeholder="Please explain why you need assistance at this time"
                          className={`bg-form-bg border-form-border focus:border-form-focus ${form.formState.errors.assistanceReason ? 'border-red-300' : ''}`}
                        />
                        {form.formState.errors.assistanceReason && (
                          <p className="text-red-500 text-sm">{form.formState.errors.assistanceReason.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Information Section */}
                  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 neo-glass-card">
                    <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 text-gradient-primary">
                      <FileText className="h-5 w-5 text-redcross" />
                      Additional Information
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-form-label">Prior Assistance?</Label>
                        <div className="flex items-center space-x-2 h-10 px-3">
                          <Checkbox
                            id="hasPriorAssistance"
                            checked={form.watch("hasPriorAssistance")}
                            onCheckedChange={(checked) => {
                              form.setValue("hasPriorAssistance", checked as boolean);
                            }}
                            className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                          />
                          <Label htmlFor="hasPriorAssistance" className="font-normal">
                            Yes, I have received assistance before
                          </Label>
                        </div>
                      </div>
                      
                      {form.watch("hasPriorAssistance") && (
                        <div className="space-y-2">
                          <Label htmlFor="priorAssistanceDetails" className="text-form-label">
                            Prior Assistance Details
                          </Label>
                          <Textarea
                            id="priorAssistanceDetails"
                            {...form.register("priorAssistanceDetails")}
                            placeholder="Please provide details about previous assistance received (when, from whom, amount)"
                            className="bg-form-bg border-form-border focus:border-form-focus"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="additionalInformation" className="text-form-label">
                          Additional Information
                        </Label>
                        <Textarea
                          id="additionalInformation"
                          {...form.register("additionalInformation")}
                          placeholder="Please provide any additional information that may help us process your application"
                          className="bg-form-bg border-form-border focus:border-form-focus"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-form-label">Documents Available?</Label>
                        <div className="flex items-center space-x-2 h-10 px-3">
                          <Checkbox
                            id="hasDocuments"
                            checked={form.watch("hasDocuments")}
                            onCheckedChange={(checked) => {
                              form.setValue("hasDocuments", checked as boolean);
                            }}
                            className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                          />
                          <Label htmlFor="hasDocuments" className="font-normal">
                            Yes, I have documents to support my application (ID, bills, lease, etc.)
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Consent and Agreement Section */}
                  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 neo-glass-card">
                    <h2 className="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 text-gradient-primary">
                      <ShieldCheck className="h-5 w-5 text-redcross" />
                      Consent and Agreement
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="consentToVerification"
                          checked={form.watch("consentToVerification")}
                          onCheckedChange={(checked) => {
                            form.setValue("consentToVerification", checked as boolean, { shouldValidate: true });
                          }}
                          className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross mt-1"
                        />
                        <div>
                          <Label htmlFor="consentToVerification" className="font-medium">
                            Consent to Verification <span className="text-red-500">*</span>
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I authorize P.I.L.L.A.R. Initiative to verify information provided in this application, which may include contacting landlords, employers, or other agencies.
                          </p>
                          {form.formState.errors.consentToVerification && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.consentToVerification.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="agreeToTerms"
                          checked={form.watch("agreeToTerms")}
                          onCheckedChange={(checked) => {
                            form.setValue("agreeToTerms", checked as boolean, { shouldValidate: true });
                          }}
                          className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross mt-1"
                        />
                        <div>
                          <Label htmlFor="agreeToTerms" className="font-medium">
                            Terms and Conditions <span className="text-red-500">*</span>
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I have read and agree to the P.I.L.L.A.R. Initiative's terms and conditions for assistance programs.
                          </p>
                          {form.formState.errors.agreeToTerms && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.agreeToTerms.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="certifyTruthfulness"
                          checked={form.watch("certifyTruthfulness")}
                          onCheckedChange={(checked) => {
                            form.setValue("certifyTruthfulness", checked as boolean, { shouldValidate: true });
                          }}
                          className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross mt-1"
                        />
                        <div>
                          <Label htmlFor="certifyTruthfulness" className="font-medium">
                            Certification <span className="text-red-500">*</span>
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I certify that all information provided is true and correct to the best of my knowledge. I understand that providing false information may result in denial of assistance.
                          </p>
                          {form.formState.errors.certifyTruthfulness && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.certifyTruthfulness.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      className="bg-redcross hover:bg-red-700 text-white font-medium py-2 px-8 rounded-md shadow-md w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </ApplicationWrapper>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AssistanceApplication;
