import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, ArrowRight, RotateCcw, Shield, AlertTriangle, FileCheck, User, Mail, AtSign, Phone, Map, Building, Home, Calendar, Briefcase, Heart, Clock, GraduationCap, Languages, Network, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VolunteerStepper from "@/components/VolunteerStepper";
import VolunteerCaptcha from "@/components/VolunteerCaptcha";

// Define form schema
const volunteerFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Please enter a valid ZIP code" }),
  
  // Volunteer Information
  volunteerInterests: z.array(z.string()).min(1, { message: "Please select at least one area of interest" }),
  availability: z.array(z.string()).min(1, { message: "Please select at least one availability option" }),
  experience: z.string().optional(),
  education: z.string().optional(),
  languages: z.array(z.string()).optional(),
  emergencyContactName: z.string().min(1, { message: "Emergency contact name is required" }),
  emergencyContactPhone: z.string().min(10, { message: "Please enter a valid emergency contact phone" }),
  emergencyContactRelationship: z.string().min(1, { message: "Relationship is required" }),
  previousVolunteer: z.boolean().optional(),
  previousVolunteerDetails: z.string().optional(),
  motivationForVolunteering: z.string().min(1, { message: "Please tell us why you want to volunteer" }),
  hoursPerWeek: z.string().min(1, { message: "Please select how many hours you can commit" }),
  
  // References
  reference1Name: z.string().min(1, { message: "Reference name is required" }),
  reference1Phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  reference1Relation: z.string().min(1, { message: "Relationship is required" }),
  reference2Name: z.string().optional(),
  reference2Phone: z.string().optional(),
  reference2Relation: z.string().optional(),
  
  // Agreements
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions" }),
  agreeToCodeOfConduct: z.boolean().refine(val => val === true, { message: "You must agree to the code of conduct" }),
  agreeToRelease: z.boolean().refine(val => val === true, { message: "You must agree to the liability release" }),
  agreeToBackground: z.boolean().refine(val => val === true, { message: "You must agree to the background check" }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

const volunteerInterestOptions = [
  { id: "mentorship", label: "Mentorship Program" },
  { id: "renovation", label: "Housing Renovation" },
  { id: "education", label: "Education & Training" },
  { id: "events", label: "Community Events" },
  { id: "fundraising", label: "Fundraising" },
  { id: "administrative", label: "Administrative Support" },
  { id: "outreach", label: "Community Outreach" },
  { id: "food", label: "Food Distribution" },
  { id: "technology", label: "Technology Support" },
  { id: "counseling", label: "Counseling Services" },
];

const availabilityOptions = [
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "mornings", label: "Mornings" },
  { id: "afternoons", label: "Afternoons" },
  { id: "evenings", label: "Evenings" },
  { id: "flexible", label: "Flexible" },
  { id: "oncall", label: "On-Call" },
  { id: "seasonal", label: "Seasonal" },
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
  { id: "hindi", label: "Hindi" },
  { id: "asl", label: "American Sign Language" },
  { id: "other", label: "Other" },
];

const hourCommitmentOptions = [
  { id: "1-5", label: "1-5 hours per week" },
  { id: "5-10", label: "5-10 hours per week" },
  { id: "10-20", label: "10-20 hours per week" },
  { id: "20+", label: "20+ hours per week" },
  { id: "monthly", label: "Monthly commitment" },
  { id: "quarterly", label: "Quarterly events only" },
  { id: "annually", label: "Annual events only" },
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

const formSteps = [
  "Personal Info",
  "Volunteer Details",
  "References",
  "Agreements",
  "Review"
];

const VolunteerApplication = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      volunteerInterests: [],
      availability: [],
      experience: "",
      education: "",
      languages: [],
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      previousVolunteer: false,
      previousVolunteerDetails: "",
      motivationForVolunteering: "",
      hoursPerWeek: "",
      reference1Name: "",
      reference1Phone: "",
      reference1Relation: "",
      reference2Name: "",
      reference2Phone: "",
      reference2Relation: "",
      agreeToTerms: false,
      agreeToCodeOfConduct: false,
      agreeToRelease: false,
      agreeToBackground: false,
    },
  });
  
  // Check if current step is valid before allowing next
  const isStepValid = () => {
    const currentValues = form.getValues();
    const formErrors = form.formState.errors;
    
    // Logic for each step validation
    if (currentStep === 0) {
      return (
        currentValues.firstName !== "" && 
        currentValues.lastName !== "" && 
        currentValues.email !== "" && 
        currentValues.phone !== "" && 
        currentValues.address !== "" && 
        currentValues.city !== "" && 
        currentValues.state !== "" && 
        currentValues.zipCode !== "" &&
        !formErrors.firstName &&
        !formErrors.lastName &&
        !formErrors.email &&
        !formErrors.phone &&
        !formErrors.address &&
        !formErrors.city &&
        !formErrors.state &&
        !formErrors.zipCode
      );
    } else if (currentStep === 1) {
      return (
        currentValues.volunteerInterests.length > 0 &&
        currentValues.availability.length > 0 &&
        currentValues.emergencyContactName !== "" &&
        currentValues.emergencyContactPhone !== "" &&
        currentValues.emergencyContactRelationship !== "" &&
        currentValues.motivationForVolunteering !== "" &&
        currentValues.hoursPerWeek !== "" &&
        !formErrors.volunteerInterests &&
        !formErrors.availability &&
        !formErrors.emergencyContactName &&
        !formErrors.emergencyContactPhone &&
        !formErrors.emergencyContactRelationship &&
        !formErrors.motivationForVolunteering
      );
    } else if (currentStep === 2) {
      return (
        currentValues.reference1Name !== "" &&
        currentValues.reference1Phone !== "" &&
        currentValues.reference1Relation !== "" &&
        !formErrors.reference1Name &&
        !formErrors.reference1Phone &&
        !formErrors.reference1Relation
      );
    } else if (currentStep === 3) {
      return (
        currentValues.agreeToTerms &&
        currentValues.agreeToCodeOfConduct &&
        currentValues.agreeToRelease &&
        currentValues.agreeToBackground
      );
    }
    
    return true;
  };
  
  const goToNextStep = () => {
    if (isStepValid()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      form.trigger();
      toast.error("Please complete all required fields before proceeding");
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  function onSubmit(data: VolunteerFormValues) {
    if (!isCaptchaVerified) {
      toast.error("Please complete the security verification");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      // Here you would typically send the data to your backend
      toast.success("Application submitted successfully!");
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Scroll to top to show the success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  }
  
  // Animation variants for transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  const renderFormStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <div
            key="step1"
            className="space-y-6 animate-fade-in"
          >
            <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
              <User className="text-redcross h-5 w-5" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative group">
                <Label htmlFor="firstName" className="flex items-center gap-1">
                  <span>First Name</span> <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.firstName ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.firstName.message}</p>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
              </div>
              
              <div className="space-y-2 relative group">
                <Label htmlFor="lastName" className="flex items-center gap-1">
                  <span>Last Name</span> <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.lastName ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.lastName.message}</p>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
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
                  className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.email ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.email.message}</p>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
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
                  className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.phone ? 'border-red-500' : ''}`}
                  placeholder="(123) 456-7890"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.phone.message}</p>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
            
            <div className="space-y-2 relative group">
              <Label htmlFor="address" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                <span>Address</span> <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                {...form.register("address")}
                className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.address ? 'border-red-500' : ''}`}
              />
              {form.formState.errors.address && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.address.message}</p>
              )}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 relative group">
                <Label htmlFor="city" className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>City</span> <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  {...form.register("city")}
                  className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.city ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.city && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.city.message}</p>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>State</span> <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}
                  defaultValue={form.watch("state")}
                >
                  <SelectTrigger 
                    id="state"
                    className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.state ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] bg-white/5 backdrop-blur-sm border border-white/20">
                    {stateOptions.map((state) => (
                      <SelectItem key={state} value={state} className="hover:bg-white/10">
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
                  <AtSign className="h-4 w-4" />
                  <span>ZIP Code</span> <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zipCode"
                  {...form.register("zipCode")}
                  className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.zipCode ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.zipCode.message}</p>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div
            key="step2"
            className="space-y-6 animate-fade-in"
          >
            <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
              <Heart className="text-redcross h-5 w-5" />
              Volunteer Information
            </h2>
            
            <div className="space-y-3 neo-glass p-6 rounded-lg">
              <Label className="block mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-redcross" />
                <span>Areas of Interest</span> <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {volunteerInterestOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 hover:bg-white/5 p-2 rounded-md transition-colors">
                    <Checkbox
                      id={`interest-${option.id}`}
                      checked={form.watch("volunteerInterests").includes(option.id)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("volunteerInterests");
                        if (checked) {
                          form.setValue("volunteerInterests", [...current, option.id], { shouldValidate: true });
                        } else {
                          form.setValue("volunteerInterests", current.filter(value => value !== option.id), { shouldValidate: true });
                        }
                      }}
                      className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                    />
                    <Label htmlFor={`interest-${option.id}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {form.formState.errors.volunteerInterests && (
                <p className="text-red-500 text-sm">{form.formState.errors.volunteerInterests.message}</p>
              )}
            </div>
            
            <div className="space-y-3 neo-glass p-6 rounded-lg">
              <Label className="block mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-redcross" />
                <span>Availability</span> <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {availabilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 hover:bg-white/5 p-2 rounded-md transition-colors">
                    <Checkbox
                      id={`availability-${option.id}`}
                      checked={form.watch("availability").includes(option.id)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("availability");
                        if (checked) {
                          form.setValue("availability", [...current, option.id], { shouldValidate: true });
                        } else {
                          form.setValue("availability", current.filter(value => value !== option.id), { shouldValidate: true });
                        }
                      }}
                      className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                    />
                    <Label htmlFor={`availability-${option.id}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {form.formState.errors.availability && (
                <p className="text-red-500 text-sm">{form.formState.errors.availability.message}</p>
              )}
            </div>
            
            <div className="space-y-3 neo-glass p-6 rounded-lg">
              <Label className="block mb-2 flex items-center gap-2">
                <Languages className="h-4 w-4 text-redcross" />
                <span>Languages Spoken</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {languageOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 hover:bg-white/5 p-2 rounded-md transition-colors">
                    <Checkbox
                      id={`language-${option.id}`}
                      checked={form.watch("languages")?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("languages") || [];
                        if (checked) {
                          form.setValue("languages", [...current, option.id]);
                        } else {
                          form.setValue("languages", current.filter(value => value !== option.id));
                        }
                      }}
                      className="data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
                    />
                    <Label htmlFor={`language-${option.id}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 neo-glass p-6 rounded-lg">
              <Label htmlFor="hoursPerWeek" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-redcross" />
                <span>Time Commitment</span> <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => form.setValue("hoursPerWeek", value, { shouldValidate: true })}
                defaultValue={form.watch("hoursPerWeek")}
              >
                <SelectTrigger 
                  id="hoursPerWeek"
                  className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.hoursPerWeek ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select commitment level" />
                </SelectTrigger>
                <SelectContent className="bg-white/5 backdrop-blur-sm border border-white/20">
                  {hourCommitmentOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id} className="hover:bg-white/10">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.hoursPerWeek && (
                <p className="text-red-500 text-sm">{form.formState.errors.hoursPerWeek.message}</p>
              )}
            </div>
            
            <div className="space-y-2 neo-glass p-6 rounded-lg">
              <Label htmlFor="motivationForVolunteering" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-redcross" />
                <span>Why do you want to volunteer with us?</span> <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="motivationForVolunteering"
                {...form.register("motivationForVolunteering")}
                rows={4}
                className={`w-full bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.motivationForVolunteering ? "border-red-500" : ""}`}
              />
              {form.formState.errors.motivationForVolunteering && (
                <p className="text-red-500 text-sm">{form.formState.errors.motivationForVolunteering.message}</p>
              )}
            </div>
            
            <div className="space-y-2 neo-glass p-6 rounded-lg">
              <Label htmlFor="experience" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-redcross" />
                <span>Relevant Experience or Skills</span>
              </Label>
              <Textarea
                id="experience"
                {...form.register("experience")}
                rows={4}
                className="w-full bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300"
              />
            </div>
            
            <div className="p-5 bg-blue-50/20 rounded-md border border-blue-100 neo-glass">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                Emergency Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 relative group">
                  <Label htmlFor="emergencyContactName" className="flex items-center gap-1">
                    <span>Name</span> <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContactName"
                    {...form.register("emergencyContactName")}
                    className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.emergencyContactName ? "border-red-500" : ""}`}
                  />
                  {form.formState.errors.emergencyContactName && (
                    <p className="text-red-500 text-sm">{form.formState.errors.emergencyContactName.message}</p>
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="space-y-2 relative group">
                  <Label htmlFor="emergencyContactPhone" className="flex items-center gap-1">
                    <span>Phone</span> <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    {...form.register("emergencyContactPhone")}
                    className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-all duration-300 ${form.formState.errors.emergencyContactPhone ? "border-red-500" : ""}`}
                  />
                  {form.formState.errors.emergencyContactPhone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.emergencyContactPhone.message}</p>
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-redcross group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="space-y-2 md:col-span-2 relative group">
                  <Label htmlFor="emergencyContactRelationship" className="flex items-center gap-1">
                    <span>Relationship</span> <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContactRelationship"
                    {...form.register("emergencyContactRelationship")}
                    className={`bg-white/5 backdrop-blur-sm border-white/20 focus:border-redcross focus:ring-1 focus:ring-redcross transition-
