
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  topic: z.string().min(1, { message: "Please select a topic" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Contact Us</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Have questions or need assistance? We're here to help you connect with the resources you need.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-redcross hover:bg-redcross/90 text-white px-6 py-2 rounded-full"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Send a Message
                </Button>
                <Button 
                  variant="outline" 
                  className="border-redcross text-redcross hover:bg-redcross/10"
                  onClick={() => document.getElementById('our-locations')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Find Our Location
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-gray-200 pb-4">Get in Touch</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-redcross" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Phone</h3>
                        <p className="text-gray-600 mb-1">Main Office: <a href="tel:(555)123-4567" className="text-redcross hover:underline">(555) 123-4567</a></p>
                        <p className="text-gray-600">Housing Crisis Hotline: <a href="tel:1-800-555-HOME" className="text-redcross hover:underline">1-800-555-HOME (4663)</a></p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-redcross" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Email</h3>
                        <p className="text-gray-600 mb-1">General Inquiries: <a href="mailto:info@pillarinitiativectg.org" className="text-redcross hover:underline">info@pillarinitiativectg.org</a></p>
                        <p className="text-gray-600 mb-1">Housing Assistance: <a href="mailto:housing@pillarinitiativectg.org" className="text-redcross hover:underline">housing@pillarinitiativectg.org</a></p>
                        <p className="text-gray-600">Volunteer Opportunities: <a href="mailto:volunteer@pillarinitiativectg.org" className="text-redcross hover:underline">volunteer@pillarinitiativectg.org</a></p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-redcross" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Main Office</h3>
                        <p className="text-gray-600 mb-1">1201 Orange St #600</p>
                        <p className="text-gray-600 mb-1">Wilmington, DE 19801</p>
                        <a 
                          href="https://maps.google.com/?q=1201+Orange+St+600+Wilmington+DE+19801" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-redcross hover:underline mt-2 inline-block"
                        >
                          Get Directions
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-redcross" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">Office Hours</h3>
                        <p className="text-gray-600 mb-1">Monday - Friday: 8:30 AM - 5:00 PM</p>
                        <p className="text-gray-600 mb-1">Saturday: 10:00 AM - 2:00 PM (Resource Center only)</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-blue-100 p-3 rounded-full text-redcross hover:bg-blue-200 transition">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      
                      <a href="#" className="bg-blue-100 p-3 rounded-full text-redcross hover:bg-blue-200 transition">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      
                      <a href="#" className="bg-blue-100 p-3 rounded-full text-redcross hover:bg-blue-200 transition">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                      
                      <a href="#" className="bg-blue-100 p-3 rounded-full text-redcross hover:bg-blue-200 transition">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div id="contact-form" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-gray-200 pb-4">Send Us a Message</h2>
                  
                  {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                      <p className="text-green-700">
                        Your message has been sent successfully. We'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="topic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Topic</FormLabel>
                              <FormControl>
                                <select
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  {...field}
                                >
                                  <option value="">Select a topic</option>
                                  <option value="housing">Housing Assistance</option>
                                  <option value="volunteer">Volunteer Opportunities</option>
                                  <option value="donate">Donations</option>
                                  <option value="services">Support Services</option>
                                  <option value="other">Other</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <textarea
                                  rows={4}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="How can we help you?"
                                  {...field}
                                ></textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-2">
                          <Button
                            type="submit"
                            className="w-full bg-redcross hover:bg-redcross/90 text-white"
                          >
                            Send Message
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-4">
                          By submitting this form, you agree to our <a href="#" className="text-redcross hover:underline">Privacy Policy</a> and consent to be contacted regarding your inquiry.
                        </p>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section - Updated to focus on Main Office Only */}
        <section id="our-locations" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Location</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <p className="text-gray-700 text-lg mb-6">
                  P.I.L.L.A.R. Initiative operates from our main office in Wilmington, DE. Our regional directors coordinate resources and services across different locations to help communities throughout the area.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  {/* Embedding Google Maps iframe instead of placeholder */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.2372525491163!2d-75.54879592424032!3d39.7436003026242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6fd413b2dee43%3A0x9e7c274af3fb30ab!2s1201%20N%20Orange%20St%20%23600%2C%20Wilmington%2C%20DE%2019801%2C%20USA!5e0!3m2!1sen!2sus!4v1707347055802!5m2!1sen!2sus" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-96"
                  ></iframe>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Main Office</h3>
                  <p className="text-gray-600 text-sm mb-1">1201 Orange St #600</p>
                  <p className="text-gray-600 text-sm mb-1">Wilmington, DE 19801</p>
                  <p className="text-gray-600 text-sm mt-2">
                    <a href="tel:(555)123-4567" className="text-redcross hover:underline flex items-center mt-2">
                      <Phone className="h-4 w-4 mr-1" />
                      (555) 123-4567
                    </a>
                  </p>
                  <a 
                    href="https://maps.google.com/?q=1201+Orange+St+600+Wilmington+DE+19801"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-redcross hover:underline text-sm flex items-center mt-3"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Get Directions
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Regional Services</h3>
                  <p className="text-gray-600 mb-3">
                    Our regional directors coordinate services in various communities. Contact our main office to connect with the regional director in your area.
                  </p>
                  <p className="text-gray-600 text-sm mb-1">Housing Assistance: <a href="tel:1-800-555-HOME" className="text-redcross hover:underline">1-800-555-HOME (4663)</a></p>
                  <p className="text-gray-600 text-sm mb-1">Email: <a href="mailto:regional@pillarinitiativectg.org" className="text-redcross hover:underline">regional@pillarinitiativectg.org</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-redcross to-redcross-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                If you're experiencing a housing crisis or emergency, please call our 24/7 hotline for immediate help.
              </p>
              <div className="text-3xl font-bold mb-8 bg-white/10 py-4 px-6 rounded-lg inline-block">
                1-800-555-HOME (4663)
              </div>
              <div>
                <Link to="/housing-crisis-hotline">
                  <Button size="lg" className="bg-white text-redcross hover:bg-gray-100 shadow-lg border-2 border-white hover:scale-105 transition-all duration-300 font-semibold px-8 py-6">
                    Learn More About Our Crisis Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
