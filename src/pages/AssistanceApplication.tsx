
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { 
  Check, 
  ArrowRight,
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  DollarSign,
  Calendar,
  AlertTriangle,
  Clock,
  FileText,
  Shield,
  Info,
  UserPlus,
  CheckSquare,
  Users,
  AlertCircle,
  FileCheck
} from "lucide-react";

// Define the form schema with validation rules
const housingSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  middleInitial: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  
  // Current Address Information
  currentAddress: z.string().min(5, "Current address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code must be at least 5 digits"),
  
  // Housing Information
  housingStatus: z.string().min(1, "Please select your current housing status"),
  monthsAtAddress: z.string().min(1, "Please specify how long you've lived at your current address"),
  reasonForMoving: z.string().min(1, "Please provide a reason for moving"),
  
  // Financial Information
  householdSize: z.string().min(1, "Please select your household size"),
  householdIncome: z.string().min(1, "Please enter your household income"),
  incomePeriod: z.string().min(1, "Please select income period"),
  incomeSource: z.string().min(1, "Please specify your source of income"),
  
  // Assistance Details
  assistanceType: z.string().min(1, "Please select the type of assistance needed"),
  evictionNotice: z.string().min(1, "Please indicate if you have received an eviction notice"),
  evictionDate: z.string().optional(),
  
  // Additional Information
  receivingAssistance: z.string().min(1, "Please indicate if you are currently receiving any assistance"),
  assistanceTypes: z.string().optional(),
  disabilities: z.string().min(1, "Please indicate if anyone in the household has disabilities"),
  disabilityDetails: z.string().optional(),
  additionalInfo: z.string().optional(),
  
  // Emergency Contact
  emergencyName: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency contact phone number must be at least 10 digits"),
  emergencyRelationship: z.string().min(2, "Please specify your relationship with the emergency contact"),
  
  // Agreements
  certifyInformation: z.boolean().refine(val => val === true, {
    message: "You must certify that the information provided is accurate"
  }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  }),
  consentToContact: z.boolean().refine(val => val === true, {
    message: "You must consent to be contacted"
  }),
});

type HousingFormValues = z.infer<typeof housingSchema>;

const AssistanceApplication = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [showEvictionDate, setShowEvictionDate] = useState(false);
  const [showAssistanceTypes, setShowAssistanceTypes] = useState(false);
  const [showDisabilityDetails, setShowDisabilityDetails] = useState(false);
  
  // Initialize the form
  const form = useForm<HousingFormValues>({
    resolver: zodResolver(housingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleInitial: "",
      email: "",
      phone: "",
      currentAddress: "",
      city: "",
      state: "",
      zip: "",
      housingStatus: "",
      monthsAtAddress: "",
      reasonForMoving: "",
      householdSize: "",
      householdIncome: "",
      incomePeriod: "monthly",
      incomeSource: "",
      assistanceType: "",
      evictionNotice: "no",
      evictionDate: "",
      receivingAssistance: "no",
      assistanceTypes: "",
      disabilities: "no",
      disabilityDetails: "",
      additionalInfo: "",
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelationship: "",
      certifyInformation: false,
      agreeToTerms: false,
      consentToContact: false,
    },
  });
  
  // Watch for changes in certain form fields to show/hide conditional fields
  useEffect(() => {
    const evictionValue = form.watch("evictionNotice");
    setShowEvictionDate(evictionValue === "yes");
    
    const assistanceValue = form.watch("receivingAssistance");
    setShowAssistanceTypes(assistanceValue === "yes");
    
    const disabilitiesValue = form.watch("disabilities");
    setShowDisabilityDetails(disabilitiesValue === "yes");
  }, [form.watch, form]);
  
  // Form submission handler
  const onSubmit = async (data: HousingFormValues) => {
    setIsSubmitting(true);
    console.log("Form data:", data);
    
    try {
      // Send data to Supabase edge function for processing
      const response = await fetch(
        import.meta.env.VITE_SUPABASE_FUNCTION_URL || "https://yourproject.supabase.co/functions/v1/resume-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            submissionType: "housing-assistance",
            submissionDate: new Date().toISOString(),
            webhookUrl: import.meta.env.VITE_WEBHOOK_URL || "https://webhook.site/your-webhook", // You would configure this in your environment
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to submit application");
      }
      
      setIsSubmitted(true);
      toast.success("Your application has been submitted successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Navigation between form steps
  const handleNextStep = () => {
    if (activeStep < 4) {
      setActiveStep(prevStep => prevStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prevStep => prevStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="assist-app-container">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {isSubmitted ? (
          // Success screen
          <div className="max-w-3xl mx-auto text-center animate-form-appear form-futuristic p-12 mt-8">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 animate-form-float">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gradient-primary">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for submitting your housing assistance application. Our team will review your information and contact you within 3-5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Return Home
              </Button>
              <Button 
                className="bg-gradient-to-r from-redcross to-redcross-dark text-white"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                  setActiveStep(1);
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Submit Another Application
              </Button>
            </div>
          </div>
        ) : (
          // Application form
          <section className="max-w-4xl mx-auto">
            <div className="form-card-3d form-futuristic transition-all duration-500 animate-form-appear">
              <div className="form-header-gradient p-6 rounded-t-xl">
                <h1 className="text-2xl font-bold text-center">Housing Assistance Application</h1>
                <p className="text-sm text-center text-white/80 mt-2">
                  Complete this form to apply for housing assistance. Fields marked with <span className="text-red-300">*</span> are required.
                </p>
              </div>
              
              {/* Progress Steps */}
              <div className="flex justify-between px-10 py-4 bg-white/50 backdrop-blur-sm border-b border-white/20">
                <div className="flex items-center space-x-2">
                  <div className={`step-indicator ${activeStep >= 1 ? 'active' : ''}`}>1</div>
                  <span className="text-sm font-medium text-gray-700">Personal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`step-indicator ${activeStep >= 2 ? 'active' : ''}`}>2</div>
                  <span className="text-sm font-medium text-gray-700">Housing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`step-indicator ${activeStep >= 3 ? 'active' : ''}`}>3</div>
                  <span className="text-sm font-medium text-gray-700">Financial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`step-indicator ${activeStep >= 4 ? 'active' : ''}`}>4</div>
                  <span className="text-sm font-medium text-gray-700">Review</span>
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-8">
                  
                  {/* Step 1: Personal Information */}
                  {activeStep === 1 && (
                    <div className="space-y-6 animate-form-appear">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-redcross" />
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="form-control-futuristic p-4 col-span-1">
                            <Label htmlFor="firstName" className="text-sm font-medium text-form-label flex gap-1">
                              First Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="firstName"
                              {...form.register("firstName")}
                              className="input-futuristic mt-1"
                              placeholder="John"
                            />
                            {form.formState.errors.firstName && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message}</p>
                            )}
                          </div>
                          
                          <div className="form-control-futuristic p-4 col-span-1">
                            <Label htmlFor="middleInitial" className="text-sm font-medium text-form-label">
                              Middle Initial
                            </Label>
                            <Input
                              id="middleInitial"
                              {...form.register("middleInitial")}
                              className="input-futuristic mt-1"
                              placeholder="M"
                              maxLength={1}
                            />
                          </div>
                          
                          <div className="form-control-futuristic p-4 col-span-1">
                            <Label htmlFor="lastName" className="text-sm font-medium text-form-label flex gap-1">
                              Last Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="lastName"
                              {...form.register("lastName")}
                              className="input-futuristic mt-1"
                              placeholder="Doe"
                            />
                            {form.formState.errors.lastName && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastName.message}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="email" className="text-sm font-medium text-form-label flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              {...form.register("email")}
                              className="input-futuristic mt-1"
                              placeholder="johndoe@example.com"
                            />
                            {form.formState.errors.email && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                            )}
                          </div>
                          
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="phone" className="text-sm font-medium text-form-label flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              Phone Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="phone"
                              {...form.register("phone")}
                              className="input-futuristic mt-1"
                              placeholder="(123) 456-7890"
                            />
                            {form.formState.errors.phone && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-5 h-5 text-redcross" />
                          <h3 className="text-lg font-medium">Current Address</h3>
                        </div>
                        
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="currentAddress" className="text-sm font-medium text-form-label flex gap-1">
                            Street Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="currentAddress"
                            {...form.register("currentAddress")}
                            className="input-futuristic mt-1"
                            placeholder="123 Main St, Apt 4B"
                          />
                          {form.formState.errors.currentAddress && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.currentAddress.message}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="city" className="text-sm font-medium text-form-label flex gap-1">
                              City <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="city"
                              {...form.register("city")}
                              className="input-futuristic mt-1"
                              placeholder="Anytown"
                            />
                            {form.formState.errors.city && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.city.message}</p>
                            )}
                          </div>
                          
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="state" className="text-sm font-medium text-form-label flex gap-1">
                              State <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="state"
                              {...form.register("state")}
                              className="input-futuristic mt-1"
                              placeholder="CA"
                            />
                            {form.formState.errors.state && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.state.message}</p>
                            )}
                          </div>
                          
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="zip" className="text-sm font-medium text-form-label flex gap-1">
                              ZIP Code <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="zip"
                              {...form.register("zip")}
                              className="input-futuristic mt-1"
                              placeholder="12345"
                            />
                            {form.formState.errors.zip && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.zip.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          onClick={handleNextStep}
                          className="assistance-submit-btn group"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Housing Information */}
                  {activeStep === 2 && (
                    <div className="space-y-6 animate-form-appear">
                      <div className="flex items-center gap-2 mb-4">
                        <Building className="w-5 h-5 text-redcross" />
                        <h2 className="text-xl font-semibold">Housing Information</h2>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="housingStatus" className="text-sm font-medium text-form-label flex gap-1">
                            Current Housing Status <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => form.setValue("housingStatus", value, { shouldValidate: true })}
                            value={form.watch("housingStatus")}
                          >
                            <SelectTrigger className="input-futuristic mt-1">
                              <SelectValue placeholder="Select your current housing status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                              <SelectItem value="renting">Currently Renting</SelectItem>
                              <SelectItem value="own">Own Home (Facing Foreclosure)</SelectItem>
                              <SelectItem value="homeless">Experiencing Homelessness</SelectItem>
                              <SelectItem value="staying">Staying with Family/Friends</SelectItem>
                              <SelectItem value="shelter">Living in Shelter</SelectItem>
                              <SelectItem value="vehicle">Living in Vehicle</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.housingStatus && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.housingStatus.message}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="monthsAtAddress" className="text-sm font-medium text-form-label flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              Time at Current Address <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) => form.setValue("monthsAtAddress", value, { shouldValidate: true })}
                              value={form.watch("monthsAtAddress")}
                            >
                              <SelectTrigger className="input-futuristic mt-1">
                                <SelectValue placeholder="Select time at current address" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                                <SelectItem value="0-3">Less than 3 months</SelectItem>
                                <SelectItem value="3-6">3-6 months</SelectItem>
                                <SelectItem value="6-12">6-12 months</SelectItem>
                                <SelectItem value="1-2">1-2 years</SelectItem>
                                <SelectItem value="2+">More than 2 years</SelectItem>
                                <SelectItem value="homeless">Currently Homeless</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.monthsAtAddress && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.monthsAtAddress.message}</p>
                            )}
                          </div>
                        
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="reasonForMoving" className="text-sm font-medium text-form-label flex gap-1">
                              Reason for Moving/Seeking Assistance <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) => form.setValue("reasonForMoving", value, { shouldValidate: true })}
                              value={form.watch("reasonForMoving")}
                            >
                              <SelectTrigger className="input-futuristic mt-1">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                                <SelectItem value="eviction">Facing Eviction</SelectItem>
                                <SelectItem value="rent-increase">Rent Increase</SelectItem>
                                <SelectItem value="job-loss">Job Loss</SelectItem>
                                <SelectItem value="medical">Medical Emergency</SelectItem>
                                <SelectItem value="domestic">Domestic Violence</SelectItem>
                                <SelectItem value="natural-disaster">Natural Disaster</SelectItem>
                                <SelectItem value="foreclosure">Foreclosure</SelectItem>
                                <SelectItem value="unsafe">Unsafe Living Conditions</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.reasonForMoving && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.reasonForMoving.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="w-5 h-5 text-redcross" />
                          <h3 className="text-lg font-medium">Eviction Information</h3>
                        </div>
                        
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="evictionNotice" className="text-sm font-medium text-form-label flex gap-1">
                            Have you received an eviction notice? <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => form.setValue("evictionNotice", value, { shouldValidate: true })}
                            value={form.watch("evictionNotice")}
                          >
                            <SelectTrigger className="input-futuristic mt-1">
                              <SelectValue placeholder="Select yes or no" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.evictionNotice && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.evictionNotice.message}</p>
                          )}
                        </div>
                        
                        {showEvictionDate && (
                          <div className="form-control-futuristic p-4 animate-form-appear">
                            <Label htmlFor="evictionDate" className="text-sm font-medium text-form-label flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Eviction Date
                            </Label>
                            <Input
                              id="evictionDate"
                              type="date"
                              {...form.register("evictionDate")}
                              className="input-futuristic mt-1"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handlePrevStep}
                        >
                          Previous
                        </Button>
                        <Button 
                          type="button" 
                          onClick={handleNextStep}
                          className="assistance-submit-btn group"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Financial Information */}
                  {activeStep === 3 && (
                    <div className="space-y-6 animate-form-appear">
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-5 h-5 text-redcross" />
                        <h2 className="text-xl font-semibold">Financial Information</h2>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="householdSize" className="text-sm font-medium text-form-label flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              Household Size <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) => form.setValue("householdSize", value, { shouldValidate: true })}
                              value={form.watch("householdSize")}
                            >
                              <SelectTrigger className="input-futuristic mt-1">
                                <SelectValue placeholder="Select household size" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                                <SelectItem value="1">1 person</SelectItem>
                                <SelectItem value="2">2 people</SelectItem>
                                <SelectItem value="3">3 people</SelectItem>
                                <SelectItem value="4">4 people</SelectItem>
                                <SelectItem value="5">5 people</SelectItem>
                                <SelectItem value="6">6 people</SelectItem>
                                <SelectItem value="7+">7+ people</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.householdSize && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.householdSize.message}</p>
                            )}
                          </div>
                          
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="incomeSource" className="text-sm font-medium text-form-label flex gap-1">
                              Source of Income <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) => form.setValue("incomeSource", value, { shouldValidate: true })}
                              value={form.watch("incomeSource")}
                            >
                              <SelectTrigger className="input-futuristic mt-1">
                                <SelectValue placeholder="Select income source" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                                <SelectItem value="employment">Employment</SelectItem>
                                <SelectItem value="self-employed">Self-employed</SelectItem>
                                <SelectItem value="social-security">Social Security</SelectItem>
                                <SelectItem value="disability">Disability</SelectItem>
                                <SelectItem value="retirement">Retirement/Pension</SelectItem>
                                <SelectItem value="unemployment">Unemployment</SelectItem>
                                <SelectItem value="child-support">Child Support/Alimony</SelectItem>
                                <SelectItem value="tanf">TANF</SelectItem>
                                <SelectItem value="no-income">No Income</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.incomeSource && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.incomeSource.message}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="form-control-futuristic p-4 col-span-2">
                            <Label htmlFor="householdIncome" className="text-sm font-medium text-form-label flex gap-1">
                              Household Income <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                              <Input
                                id="householdIncome"
                                {...form.register("householdIncome")}
                                className="input-futuristic mt-1 pl-8"
                                placeholder="0.00"
                                type="text"
                                inputMode="decimal"
                              />
                            </div>
                            {form.formState.errors.householdIncome && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.householdIncome.message}</p>
                            )}
                          </div>
                          
                          <div className="form-control-futuristic p-4 col-span-1">
                            <Label htmlFor="incomePeriod" className="text-sm font-medium text-form-label flex gap-1">
                              Period <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              onValueChange={(value) => form.setValue("incomePeriod", value, { shouldValidate: true })}
                              value={form.watch("incomePeriod")}
                            >
                              <SelectTrigger className="input-futuristic mt-1">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.incomePeriod && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.incomePeriod.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Info className="w-5 h-5 text-redcross" />
                          <h3 className="text-lg font-medium">Additional Information</h3>
                        </div>
                        
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="assistanceType" className="text-sm font-medium text-form-label flex gap-1">
                            Type of Assistance Needed <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => form.setValue("assistanceType", value, { shouldValidate: true })}
                            value={form.watch("assistanceType")}
                          >
                            <SelectTrigger className="input-futuristic mt-1">
                              <SelectValue placeholder="Select assistance type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                              <SelectItem value="rent">Rental Assistance</SelectItem>
                              <SelectItem value="deposit">Security Deposit</SelectItem>
                              <SelectItem value="utility">Utility Assistance</SelectItem>
                              <SelectItem value="mortgage">Mortgage Assistance</SelectItem>
                              <SelectItem value="shelter">Emergency Shelter</SelectItem>
                              <SelectItem value="housing-search">Housing Search Help</SelectItem>
                              <SelectItem value="multiple">Multiple Types</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.assistanceType && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.assistanceType.message}</p>
                          )}
                        </div>
                        
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="receivingAssistance" className="text-sm font-medium text-form-label flex gap-1">
                            Are you currently receiving any housing assistance? <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => form.setValue("receivingAssistance", value, { shouldValidate: true })}
                            value={form.watch("receivingAssistance")}
                          >
                            <SelectTrigger className="input-futuristic mt-1">
                              <SelectValue placeholder="Select yes or no" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.receivingAssistance && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.receivingAssistance.message}</p>
                          )}
                        </div>
                        
                        {showAssistanceTypes && (
                          <div className="form-control-futuristic p-4 animate-form-appear">
                            <Label htmlFor="assistanceTypes" className="text-sm font-medium text-form-label">
                              Please specify what assistance you're receiving
                            </Label>
                            <Textarea
                              id="assistanceTypes"
                              {...form.register("assistanceTypes")}
                              className="input-futuristic mt-1 min-h-24"
                              placeholder="Please describe any current assistance programs you're enrolled in"
                            />
                          </div>
                        )}
                        
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="disabilities" className="text-sm font-medium text-form-label flex gap-1">
                            Does anyone in your household have a disability? <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => form.setValue("disabilities", value, { shouldValidate: true })}
                            value={form.watch("disabilities")}
                          >
                            <SelectTrigger className="input-futuristic mt-1">
                              <SelectValue placeholder="Select yes or no" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-md border border-white/30">
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.disabilities && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.disabilities.message}</p>
                          )}
                        </div>
                        
                        {showDisabilityDetails && (
                          <div className="form-control-futuristic p-4 animate-form-appear">
                            <Label htmlFor="disabilityDetails" className="text-sm font-medium text-form-label">
                              Please provide details about disabilities
                            </Label>
                            <Textarea
                              id="disabilityDetails"
                              {...form.register("disabilityDetails")}
                              className="input-futuristic mt-1 min-h-24"
                              placeholder="Please provide details about any disabilities (this helps us match appropriate housing options)"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handlePrevStep}
                        >
                          Previous
                        </Button>
                        <Button 
                          type="button" 
                          onClick={handleNextStep}
                          className="assistance-submit-btn group"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Final Information and Submit */}
                  {activeStep === 4 && (
                    <div className="space-y-6 animate-form-appear">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckSquare className="w-5 h-5 text-redcross" />
                        <h2 className="text-xl font-semibold">Final Details & Submission</h2>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className="w-5 h-5 text-redcross" />
                          <h3 className="text-lg font-medium">Emergency Contact Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="emergencyName" className="text-sm font-medium text-form-label flex gap-1">
                              Emergency Contact Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="emergencyName"
                              {...form.register("emergencyName")}
                              className="input-futuristic mt-1"
                              placeholder="Jane Smith"
                            />
                            {form.formState.errors.emergencyName && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.emergencyName.message}</p>
                            )}
                          </div>
                          
                          <div className="form-control-futuristic p-4">
                            <Label htmlFor="emergencyPhone" className="text-sm font-medium text-form-label flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              Emergency Contact Phone <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="emergencyPhone"
                              {...form.register("emergencyPhone")}
                              className="input-futuristic mt-1"
                              placeholder="(123) 456-7890"
                            />
                            {form.formState.errors.emergencyPhone && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.emergencyPhone.message}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="emergencyRelationship" className="text-sm font-medium text-form-label flex gap-1">
                            Relationship <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="emergencyRelationship"
                            {...form.register("emergencyRelationship")}
                            className="input-futuristic mt-1"
                            placeholder="Friend, Relative, etc."
                          />
                          {form.formState.errors.emergencyRelationship && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.emergencyRelationship.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertCircle className="w-5 h-5 text-redcross" />
                          <h3 className="text-lg font-medium">Additional Information</h3>
                        </div>
                        
                        <div className="form-control-futuristic p-4">
                          <Label htmlFor="additionalInfo" className="text-sm font-medium text-form-label">
                            Is there anything else you'd like us to know?
                          </Label>
                          <Textarea
                            id="additionalInfo"
                            {...form.register("additionalInfo")}
                            className="input-futuristic mt-1 min-h-32"
                            placeholder="Please provide any additional details that may be relevant to your housing assistance application"
                          />
                        </div>
                      </div>
                      
                      <div className="form-section-futuristic p-6 space-y-4 border-redcross/10">
                        <div className="flex items-center gap-2 mb-4">
                          <FileCheck className="w-5 h-5 text-redcross" />
                          <h3 className="text-lg font-medium">Agreements</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3 p-4 bg-white/30 rounded-lg">
                            <Checkbox
                              id="certifyInformation"
                              checked={form.watch("certifyInformation")}
                              onCheckedChange={(checked) => {
                                form.setValue("certifyInformation", checked === true, { shouldValidate: true });
                              }}
                              className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                            />
                            <div>
                              <Label 
                                htmlFor="certifyInformation" 
                                className="text-sm font-medium text-gray-700 flex gap-1"
                              >
                                I certify that all information is accurate <span className="text-red-500">*</span>
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">
                                I certify that the information provided is true and correct to the best of my knowledge.
                              </p>
                              {form.formState.errors.certifyInformation && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.certifyInformation.message}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 p-4 bg-white/30 rounded-lg">
                            <Checkbox
                              id="agreeToTerms"
                              checked={form.watch("agreeToTerms")}
                              onCheckedChange={(checked) => {
                                form.setValue("agreeToTerms", checked === true, { shouldValidate: true });
                              }}
                              className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                            />
                            <div>
                              <Label 
                                htmlFor="agreeToTerms" 
                                className="text-sm font-medium text-gray-700 flex gap-1"
                              >
                                I agree to the terms and conditions <span className="text-red-500">*</span>
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">
                                I have read and agree to the organization's terms and conditions, including consent for the verification of information provided.
                              </p>
                              {form.formState.errors.agreeToTerms && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.agreeToTerms.message}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 p-4 bg-white/30 rounded-lg">
                            <Checkbox
                              id="consentToContact"
                              checked={form.watch("consentToContact")}
                              onCheckedChange={(checked) => {
                                form.setValue("consentToContact", checked === true, { shouldValidate: true });
                              }}
                              className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                            />
                            <div>
                              <Label 
                                htmlFor="consentToContact" 
                                className="text-sm font-medium text-gray-700 flex gap-1"
                              >
                                I consent to be contacted <span className="text-red-500">*</span>
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">
                                I consent to be contacted by phone, email, or text regarding my application for housing assistance.
                              </p>
                              {form.formState.errors.consentToContact && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.consentToContact.message}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handlePrevStep}
                        >
                          Previous
                        </Button>
                        <Button 
                          type="submit" 
                          className="assistance-submit-btn group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="opacity-0">Submit Application</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                              </div>
                            </>
                          ) : (
                            <>
                              Submit Application
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                </form>
              </Form>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AssistanceApplication;
