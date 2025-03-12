
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FileText, Printer } from "lucide-react";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<ResumeFormValues | null>(null);
  const [showPrintDialog, setShowPrintDialog] = useState(false);

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
      
      // Save submitted values for confirmation/print
      setSubmittedValues(data);
      setIsSubmitted(true);
      setShowPrintDialog(true);
      
      toast.success("Resume submitted successfully! The team will contact you about future opportunities.");
    } catch (error) {
      console.error("Error submitting resume:", error);
      toast.error("Failed to submit resume. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle print action
  const handlePrint = () => {
    if (!submittedValues || !selectedFile) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume Submission - ${submittedValues.name}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header img { max-width: 150px; }
          h1 { color: #2563eb; font-size: 24px; margin-bottom: 20px; }
          h2 { color: #2563eb; font-size: 18px; margin-top: 25px; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          .section { margin-bottom: 25px; }
          .field { display: flex; margin-bottom: 12px; }
          .field-label { font-weight: bold; width: 200px; flex-shrink: 0; }
          .field-value { flex-grow: 1; }
          .footer { margin-top: 40px; font-size: 12px; text-align: center; color: #666; }
          @media print {
            body { padding: 0; }
            .print-button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="print-button" style="text-align: right;">
          <button onclick="window.print();" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Print / Save as PDF
          </button>
        </div>
        
        <div class="header">
          <img src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" alt="P.I.L.L.A.R. Initiative Logo">
          <h1>Resume Submission Confirmation</h1>
          <p>Submission ID: RES-${Date.now().toString().slice(-8)}</p>
          <p>Submitted: ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="section">
          <h2>Personal Information</h2>
          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${submittedValues.name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">${submittedValues.email}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Resume Information</h2>
          <div class="field">
            <div class="field-label">File Name:</div>
            <div class="field-value">${selectedFile.name}</div>
          </div>
          <div class="field">
            <div class="field-label">File Size:</div>
            <div class="field-value">${Math.round(selectedFile.size / 1024)} KB</div>
          </div>
          <div class="field">
            <div class="field-label">File Type:</div>
            <div class="field-value">${selectedFile.type}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>What's Next?</h2>
          <p>Thank you for submitting your resume to the P.I.L.L.A.R. Initiative. Our team will review your information and contact you if there are opportunities that match your skills and experience.</p>
          <p>Please keep this confirmation for your records. If you have any questions about your submission, please contact us and reference your Submission ID.</p>
        </div>
        
        <div class="footer">
          <p>P.I.L.L.A.R. Initiative Careers</p>
          <p>This document confirms your resume submission and is intended solely for your records.</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
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
      
      {/* Print Dialog */}
      <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Resume Submitted</DialogTitle>
          <div className="space-y-4 py-4">
            <p>Thank you for submitting your resume. Your information has been received and will be reviewed by our team.</p>
            <p>Would you like to print or save a copy of your submission for your records?</p>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowPrintDialog(false);
                onClose();
              }}
            >
              Close
            </Button>
            <Button 
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print/Save Confirmation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeUpload;
