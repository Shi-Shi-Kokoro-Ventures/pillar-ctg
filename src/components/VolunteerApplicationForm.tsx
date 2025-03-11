import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define form schema
const volunteerFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Please enter a valid ZIP code" }),
  volunteerInterests: z.array(z.string()).min(1, { message: "Please select at least one area of interest" }),
  availability: z.array(z.string()).min(1, { message: "Please select at least one availability option" }),
  experience: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions" }),
  agreeToCodeOfConduct: z.boolean().refine(val => val === true, { message: "You must agree to the code of conduct" }),
  agreeToRelease: z.boolean().refine(val => val === true, { message: "You must agree to the liability release" }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

const volunteerInterestOptions = [
  { id: "mentorship", label: "Mentorship Program" },
  { id: "renovation", label: "Housing Renovation" },
  { id: "education", label: "Education & Training" },
  { id: "events", label: "Community Events" },
  { id: "fundraising", label: "Fundraising" },
  { id: "administrative", label: "Administrative Support" },
];

const availabilityOptions = [
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "mornings", label: "Mornings" },
  { id: "afternoons", label: "Afternoons" },
  { id: "evenings", label: "Evenings" },
  { id: "flexible", label: "Flexible" },
];

interface VolunteerApplicationFormProps {
    onSubmit: (data: VolunteerFormValues) => void;
    form: any;
}

const VolunteerApplicationForm: React.FC<VolunteerApplicationFormProps> = ({ onSubmit, form }) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
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
                            <Input
                                id="state"
                                {...form.register("state")}
                                className={form.formState.errors.state ? "border-red-500" : ""}
                            />
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
                </div>

                <div className="space-y-6">
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

                    <div className="space-y-2">
                        <Label htmlFor="experience">
                            Relevant Experience or Skills
                        </Label>
                        <textarea
                            id="experience"
                            {...form.register("experience")}
                            rows={4}
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-redcross focus:border-transparent"
                        ></textarea>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold border-b pb-2">Agreements</h2>

                    <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-4 rounded-md border">
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
                                </p>
                            </div>
                        </div>
                        {form.formState.errors.agreeToTerms && (
                            <p className="text-red-500 text-sm">{form.formState.errors.agreeToTerms.message}</p>
                        )}

                        <div className="flex items-start space-x-3 p-4 rounded-md border">
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
                                </p>
                            </div>
                        </div>
                        {form.formState.errors.agreeToCodeOfConduct && (
                            <p className="text-red-500 text-sm">{form.formState.errors.agreeToCodeOfConduct.message}</p>
                        )}

                        <div className="flex items-start space-x-3 p-4 rounded-md border">
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
                                </p>
                            </div>
                        </div>
                        {form.formState.errors.agreeToRelease && (
                            <p className="text-red-500 text-sm">{form.formState.errors.agreeToRelease.message}</p>
                        )}
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <Button type="submit" className="w-full md:w-auto">
                        Submit Application
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default VolunteerApplicationForm;
