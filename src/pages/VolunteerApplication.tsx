
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
import { ArrowLeft, Check, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VolunteerStepper from "@/components/VolunteerStepper";
import VolunteerCaptcha from "@/components/VolunteerCaptcha";
import { motion } from "framer-motion";

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
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };
  
  const renderFormStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <motion.div
            key="step1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  className={form.formState.errors.firstName ? "border-red-500" : ""}
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-sm">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  className={form.formState.errors.lastName ? "border-red-500" : ""}
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-sm">{form.formState.errors.lastName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className={form.formState.errors.email ? "border-red-500" : ""}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  className={form.formState.errors.phone ? "border-red-500" : ""}
                  placeholder="(123) 456-7890"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                {...form.register("address")}
                className={form.formState.errors.address ? "border-red-500" : ""}
              />
              {form.formState.errors.address && (
                <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  {...form.register("city")}
                  className={form.formState.errors.city ? "border-red-500" : ""}
                />
                {form.formState.errors.city && (
                  <p className="text-red-500 text-sm">{form.formState.errors.city.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}
                  defaultValue={form.watch("state")}
                >
                  <SelectTrigger 
                    id="state"
                    className={form.formState.errors.state ? "border-red-500" : ""}
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
                <Label htmlFor="zipCode">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zipCode"
                  {...form.register("zipCode")}
                  className={form.formState.errors.zipCode ? "border-red-500" : ""}
                />
                {form.formState.errors.zipCode && (
                  <p className="text-red-500 text-sm">{form.formState.errors.zipCode.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="step2"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold border-b pb-2">Volunteer Information</h2>
            
            <div className="space-y-3">
              <Label className="block mb-2">
                Areas of Interest <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {volunteerInterestOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
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
            
            <div className="space-y-3">
              <Label className="block mb-2">
                Availability <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {availabilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
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
            
            <div className="space-y-3">
              <Label className="block mb-2">
                Languages Spoken
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {languageOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
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
                    />
                    <Label htmlFor={`language-${option.id}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">
                Time Commitment <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => form.setValue("hoursPerWeek", value, { shouldValidate: true })}
                defaultValue={form.watch("hoursPerWeek")}
              >
                <SelectTrigger 
                  id="hoursPerWeek"
                  className={form.formState.errors.hoursPerWeek ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select commitment level" />
                </SelectTrigger>
                <SelectContent>
                  {hourCommitmentOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.hoursPerWeek && (
                <p className="text-red-500 text-sm">{form.formState.errors.hoursPerWeek.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motivationForVolunteering">
                Why do you want to volunteer with us? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="motivationForVolunteering"
                {...form.register("motivationForVolunteering")}
                rows={4}
                className={`w-full ${form.formState.errors.motivationForVolunteering ? "border-red-500" : ""}`}
              />
              {form.formState.errors.motivationForVolunteering && (
                <p className="text-red-500 text-sm">{form.formState.errors.motivationForVolunteering.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">
                Relevant Experience or Skills
              </Label>
              <Textarea
                id="experience"
                {...form.register("experience")}
                rows={4}
                className="w-full"
              />
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
              <h3 className="font-semibold mb-2">Emergency Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContactName"
                    {...form.register("emergencyContactName")}
                    className={form.formState.errors.emergencyContactName ? "border-red-500" : ""}
                  />
                  {form.formState.errors.emergencyContactName && (
                    <p className="text-red-500 text-sm">{form.formState.errors.emergencyContactName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    {...form.register("emergencyContactPhone")}
                    className={form.formState.errors.emergencyContactPhone ? "border-red-500" : ""}
                  />
                  {form.formState.errors.emergencyContactPhone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.emergencyContactPhone.message}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergencyContactRelationship">
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContactRelationship"
                    {...form.register("emergencyContactRelationship")}
                    className={form.formState.errors.emergencyContactRelationship ? "border-red-500" : ""}
                  />
                  {form.formState.errors.emergencyContactRelationship && (
                    <p className="text-red-500 text-sm">{form.formState.errors.emergencyContactRelationship.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="previousVolunteer"
                  checked={form.watch("previousVolunteer")}
                  onCheckedChange={(checked) => 
                    form.setValue("previousVolunteer", checked as boolean)
                  }
                />
                <div>
                  <Label htmlFor="previousVolunteer" className="font-medium">
                    Have you volunteered with us before?
                  </Label>
                </div>
              </div>
              
              {form.watch("previousVolunteer") && (
                <div className="ml-7 space-y-2">
                  <Label htmlFor="previousVolunteerDetails">
                    Please describe your previous volunteer work with us
                  </Label>
                  <Textarea
                    id="previousVolunteerDetails"
                    {...form.register("previousVolunteerDetails")}
                    rows={3}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step3"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold border-b pb-2">References</h2>
            <p className="text-gray-600 mb-4">
              Please provide at least one reference who can speak to your character or work ethic. 
              This should not be a family member.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md border mb-6">
              <h3 className="font-semibold mb-3">Reference 1</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reference1Name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reference1Name"
                    {...form.register("reference1Name")}
                    className={form.formState.errors.reference1Name ? "border-red-500" : ""}
                  />
                  {form.formState.errors.reference1Name && (
                    <p className="text-red-500 text-sm">{form.formState.errors.reference1Name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference1Phone">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reference1Phone"
                    {...form.register("reference1Phone")}
                    className={form.formState.errors.reference1Phone ? "border-red-500" : ""}
                  />
                  {form.formState.errors.reference1Phone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.reference1Phone.message}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reference1Relation">
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reference1Relation"
                    {...form.register("reference1Relation")}
                    className={form.formState.errors.reference1Relation ? "border-red-500" : ""}
                    placeholder="e.g., Former Employer, Teacher, Colleague"
                  />
                  {form.formState.errors.reference1Relation && (
                    <p className="text-red-500 text-sm">{form.formState.errors.reference1Relation.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-semibold mb-3">Reference 2 (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reference2Name">
                    Name
                  </Label>
                  <Input
                    id="reference2Name"
                    {...form.register("reference2Name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference2Phone">
                    Phone
                  </Label>
                  <Input
                    id="reference2Phone"
                    {...form.register("reference2Phone")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reference2Relation">
                    Relationship
                  </Label>
                  <Input
                    id="reference2Relation"
                    {...form.register("reference2Relation")}
                    placeholder="e.g., Former Employer, Teacher, Colleague"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md space-y-2 border border-blue-100">
              <h3 className="font-semibold">Reference Information</h3>
              <p className="text-sm text-gray-600">
                References will be contacted to verify your application information.
                By providing these references, you consent to P.I.L.L.A.R. Initiative contacting these individuals.
              </p>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold border-b pb-2">Agreements</h2>
            <p className="text-gray-600 mb-4">
              Please review and agree to the following terms to complete your application.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 rounded-md border bg-white shadow-sm">
                <Checkbox
                  id="agreeToTerms"
                  checked={form.watch("agreeToTerms")}
                  onCheckedChange={(checked) => 
                    form.setValue("agreeToTerms", checked as boolean, { shouldValidate: true })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="agreeToTerms" className="font-medium">
                    Terms and Conditions <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">
                    I agree to abide by the P.I.L.L.A.R. Initiative's volunteer terms and conditions, which include adherence to organizational policies.
                    This includes maintaining confidentiality and professional conduct at all times.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{form.formState.errors.agreeToTerms.message}</p>
              )}
              
              <div className="flex items-start space-x-3 p-4 rounded-md border bg-white shadow-sm">
                <Checkbox
                  id="agreeToCodeOfConduct"
                  checked={form.watch("agreeToCodeOfConduct")}
                  onCheckedChange={(checked) => 
                    form.setValue("agreeToCodeOfConduct", checked as boolean, { shouldValidate: true })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="agreeToCodeOfConduct" className="font-medium">
                    Code of Conduct <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">
                    I agree to follow the P.I.L.L.A.R. Initiative's code of conduct, which includes maintaining professionalism and respecting confidentiality.
                    I understand that I represent the organization in all my volunteer activities.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToCodeOfConduct && (
                <p className="text-red-500 text-sm">{form.formState.errors.agreeToCodeOfConduct.message}</p>
              )}
              
              <div className="flex items-start space-x-3 p-4 rounded-md border bg-white shadow-sm">
                <Checkbox
                  id="agreeToRelease"
                  checked={form.watch("agreeToRelease")}
                  onCheckedChange={(checked) => 
                    form.setValue("agreeToRelease", checked as boolean, { shouldValidate: true })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="agreeToRelease" className="font-medium">
                    Liability Release <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">
                    I release the P.I.L.L.A.R. Initiative from any liability related to my volunteer activities, except in cases of gross negligence or intentional misconduct.
                    I understand the inherent risks associated with volunteer activities.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToRelease && (
                <p className="text-red-500 text-sm">{form.formState.errors.agreeToRelease.message}</p>
              )}
              
              <div className="flex items-start space-x-3 p-4 rounded-md border bg-white shadow-sm">
                <Checkbox
                  id="agreeToBackground"
                  checked={form.watch("agreeToBackground")}
                  onCheckedChange={(checked) => 
                    form.setValue("agreeToBackground", checked as boolean, { shouldValidate: true })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="agreeToBackground" className="font-medium">
                    Background Check Consent <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">
                    I understand that a background check may be required depending on the volunteer position, and I consent to such a check.
                    This is to ensure the safety of all individuals involved in P.I.L.L.A.R. Initiative programs.
                  </p>
                </div>
              </div>
              {form.formState.errors.agreeToBackground && (
                <p className="text-red-500 text-sm">{form.formState.errors.agreeToBackground.message}</p>
              )}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step5"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold border-b pb-2">Review Your Application</h2>
            <p className="text-gray-600 mb-4">
              Please review your application information before submitting. If you need to make changes, 
              you can go back to previous sections.
            </p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Name:</span> {form.watch("firstName")} {form.watch("lastName")}</div>
                  <div><span className="font-medium">Email:</span> {form.watch("email")}</div>
                  <div><span className="font-medium">Phone:</span> {form.watch("phone")}</div>
                  <div><span className="font-medium">Address:</span> {form.watch("address")}</div>
                  <div><span className="font-medium">City:</span> {form.watch("city")}</div>
                  <div><span className="font-medium">State:</span> {form.watch("state")}</div>
                  <div><span className="font-medium">ZIP:</span> {form.watch("zipCode")}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Volunteer Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Areas of Interest:</span> 
                    <div className="mt-1">
                      {form.watch("volunteerInterests").map(id => {
                        const option = volunteerInterestOptions.find(opt => opt.id === id);
                        return option ? <span key={id} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs mr-2 mb-2">{option.label}</span> : null;
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium">Availability:</span>
                    <div className="mt-1">
                      {form.watch("availability").map(id => {
                        const option = availabilityOptions.find(opt => opt.id === id);
                        return option ? <span key={id} className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs mr-2 mb-2">{option.label}</span> : null;
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium">Time Commitment:</span> 
                    {hourCommitmentOptions.find(opt => opt.id === form.watch("hoursPerWeek"))?.label}
                  </div>
                  
                  {form.watch("languages")?.length > 0 && (
                    <div>
                      <span className="font-medium">Languages:</span>
                      <div className="mt-1">
                        {form.watch("languages").map(id => {
                          const option = languageOptions.find(opt => opt.id === id);
                          return option ? <span key={id} className="inline-block bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs mr-2 mb-2">{option.label}</span> : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium">Motivation:</span> 
                    <p className="mt-1">{form.watch("motivationForVolunteering")}</p>
                  </div>
                  
                  {form.watch("experience") && (
                    <div>
                      <span className="font-medium">Experience:</span> 
                      <p className="mt-1">{form.watch("experience")}</p>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium">Emergency Contact:</span> 
                    <p className="mt-1">{form.watch("emergencyContactName")} ({form.watch("emergencyContactRelationship")}) - {form.watch("emergencyContactPhone")}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">References</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Reference 1:</span> 
                    <p className="mt-1">{form.watch("reference1Name")} ({form.watch("reference1Relation")}) - {form.watch("reference1Phone")}</p>
                  </div>
                  
                  {form.watch("reference2Name") && (
                    <div>
                      <span className="font-medium">Reference 2:</span> 
                      <p className="mt-1">{form.watch("reference2Name")} ({form.watch("reference2Relation") || "Not specified"}) - {form.watch("reference2Phone") || "Not provided"}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Security Verification</h3>
                <VolunteerCaptcha onVerify={setIsCaptchaVerified} />
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="gap-2 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-12 px-4">
                <div className="mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for your interest in volunteering with the P.I.L.L.A.R. Initiative. We will review your application and contact you soon.
                </p>
                <div className="bg-blue-50 rounded-lg p-6 max-w-lg mx-auto mb-8 text-left">
                  <h3 className="font-semibold text-gray-800 mb-2">What happens next?</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Our volunteer coordinator will review your application within 3-5 business days</li>
                    <li>We'll contact your references for verification</li>
                    <li>You'll receive an email to schedule an orientation session</li>
                    <li>After orientation, we'll match you with volunteer opportunities based on your interests</li>
                  </ol>
                </div>
                <Button 
                  onClick={() => navigate("/volunteer")} 
                  className="bg-redcross hover:bg-redcross/90"
                >
                  Return to Volunteer Page
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2 text-redcross">Volunteer Application</h1>
                  <p className="text-gray-600">
                    Thank you for your interest in volunteering with the P.I.L.L.A.R. Initiative. Please complete the form below to get started.
                  </p>
                </div>
                
                <VolunteerStepper steps={formSteps} currentStep={currentStep} />
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {renderFormStep()}
                    
                    <div className="pt-4 border-t flex items-center justify-between">
                      {currentStep > 0 ? (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={goToPreviousStep}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" /> Previous
                        </Button>
                      ) : (
                        <div></div>
                      )}
                      
                      {currentStep < formSteps.length - 1 ? (
                        <Button 
                          type="button" 
                          onClick={goToNextStep}
                          className="flex items-center gap-2"
                        >
                          Next <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          type="submit" 
                          className="bg-redcross hover:bg-redcross/90 flex items-center gap-2"
                          disabled={isSubmitting || !isCaptchaVerified}
                        >
                          {isSubmitting ? (
                            <>
                              <RotateCcw className="h-4 w-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              Submit Application
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    
                    {!isCaptchaVerified && currentStep === formSteps.length - 1 && (
                      <p className="text-center text-amber-600 text-sm">Please complete the security verification above to submit your application.</p>
                    )}
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VolunteerApplication;
