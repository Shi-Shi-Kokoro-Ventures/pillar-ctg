
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AssistanceApplication = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Apply for Assistance</h1>
              <p className="text-xl text-gray-600 mb-8">
                Start your application for housing and support services through our streamlined process.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Begin Application
              </Button>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Application Process</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                Our streamlined application process helps connect you with the right services based on your unique situation and needs.
              </p>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-9 top-0 bottom-0 w-1 bg-blue-100 hidden md:block"></div>
                
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4 md:mb-0 z-10">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                    <div className="flex-grow md:ml-8 md:mt-3">
                      <h3 className="text-xl font-bold mb-3">Complete Intake Form</h3>
                      <p className="text-gray-600 mb-4">
                        Fill out our basic intake form to provide information about your household, income, and immediate needs.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-2">Required Documents:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Photo ID for all adults</li>
                          <li>Social Security cards (if applicable)</li>
                          <li>Proof of income (pay stubs, benefit letters)</li>
                          <li>Current lease or housing documentation (if applicable)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4 md:mb-0 z-10">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                    <div className="flex-grow md:ml-8 md:mt-3">
                      <h3 className="text-xl font-bold mb-3">Needs Assessment</h3>
                      <p className="text-gray-600 mb-4">
                        Complete a detailed assessment with a case manager to identify your specific needs and determine eligibility for various programs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4 md:mb-0 z-10">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <div className="flex-grow md:ml-8 md:mt-3">
                      <h3 className="text-xl font-bold mb-3">Program Matching</h3>
                      <p className="text-gray-600 mb-4">
                        Based on your assessment, we will match you with appropriate housing programs and support services.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4 md:mb-0 z-10">
                      <span className="text-2xl font-bold">4</span>
                    </div>
                    <div className="flex-grow md:ml-8 md:mt-3">
                      <h3 className="text-xl font-bold mb-3">Service Connection</h3>
                      <p className="text-gray-600 mb-4">
                        Connect with specific program staff who will guide you through the next steps in the application process for the services you need.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                    How long does the application process take?
                  </h3>
                  <p className="text-gray-600">
                    The initial intake and assessment typically take 1-2 hours. The timing for program placement varies depending on program availability and your specific needs.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                    What if I don't have all the required documents?
                  </h3>
                  <p className="text-gray-600">
                    We can still begin the process without all documents. Our case managers can help you obtain missing documentation and provide guidance on alternatives.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Can I apply for multiple programs at once?
                  </h3>
                  <p className="text-gray-600">
                    Yes, our coordinated entry system allows you to be considered for all appropriate programs through a single application process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Take the first step toward stability by beginning your application today. Our team is ready to help you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Begin Application
              </Button>
              <Link to="/contact-us">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Contact for Assistance
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AssistanceApplication;
