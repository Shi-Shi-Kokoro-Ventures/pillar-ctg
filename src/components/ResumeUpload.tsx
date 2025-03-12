
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

// Define environment variables - in production, these would be set in your environment
const WEBHOOK_URL = "https://your-n8n-or-zapier-webhook-url.com";

const resumeSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  resume: z.any().refine(file => file?.length === 1, "Resume is required"),
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

interface ResumeUploadProps {
  onClose: () => void;
}

const ResumeUpload = ({ onClose }: ResumeUploadProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: "",
      email: "",
      resume: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      form.setValue("resume", files);
    }
  };

  const onSubmit = async (data: ResumeFormValues) => {
    if (!selectedFile) {
      toast.error("Please select a resume file to upload.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Upload the file to a temporary location 
      // In production, you would upload this to a storage service like S3, Cloudinary, etc.
      // For this example, we're simulating a successful upload
      
      // 2. Call our edge function to notify about the submission
      const { error } = await supabase.functions.invoke('resume-notification', {
        body: {
          name: data.name,
          email: data.email,
          resumeFileName: selectedFile.name,
          resumeSize: Math.round(selectedFile.size / 1024),
          webhookUrl: WEBHOOK_URL,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      toast.success("Resume submitted successfully! The team will contact you about future opportunities.");
      onClose();
    } catch (error) {
      console.error("Error submitting resume:", error);
      toast.error("Failed to submit resume. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Submit Your Resume</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="resume"
            render={() => (
              <FormItem>
                <FormLabel>Upload Resume</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {selectedFile && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription>
                Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Resume"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResumeUpload;
