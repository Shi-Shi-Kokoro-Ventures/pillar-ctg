
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, CheckCircle, ArrowRight } from "lucide-react";

const CaseManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Management Services</h1>
              <p className="text-xl text-gray-600 mb-8">
                Personalized support and guidance to help you navigate challenges, access resources, 
                and achieve your goals for stability and independence.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Connect With a Case Manager
              </Button>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How Case Management Works</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                Our case managers work one-on-one with individuals and families to develop personalized 
                plans for addressing immediate needs and achieving long-term stability.
              </p>
              
              <div className="relative">
                <div className="absolute left-0 md:left-1/2 h-full w-px bg-blue-200 transform -translate-x-1/2 z-0"></div>
                
                <div className="relative z-10 space-y-12">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 flex justify-end">
                      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">1</span>
                          </div>
                          <h3 className="text-xl font-bold">Initial Assessment</h3>
                        </div>
                        <p className="text-gray-600">
                          A comprehensive evaluation of your current situation, needs, strengths, 
                          and goals to develop a personalized service plan.
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                    <div className="md:w-1/2 md:pl-12">
                      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">2</span>
                          </div>
                          <h3 className="text-xl font-bold">Service Planning</h3>
                        </div>
                        <p className="text-gray-600">
                          Collaborative development of a detailed plan with specific goals, 
                          action steps, and timelines tailored to your unique situation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 flex justify-end">
                      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">3</span>
                          </div>
                          <h3 className="text-xl font-bold">Resource Connection</h3>
                        </div>
                        <p className="text-gray-600">
                          Linkage to appropriate community resources including housing, 
                          healthcare, mental health services, education, and employment.
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                    <div className="md:w-1/2 md:pl-12">
                      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">4</span>
                          </div>
                          <h3 className="text-xl font-bold">Ongoing Support</h3>
                        </div>
                        <p className="text-gray-600">
                          Regular check-ins, advocacy, and assistance navigating systems to 
                          help you overcome barriers and achieve your goals.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 flex justify-end">
                      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">5</span>
                          </div>
                          <h3 className="text-xl font-bold">Progress Monitoring</h3>
                        </div>
                        <p className="text-gray-600">
                          Regular review of your service plan, celebrating achievements, 
                          and adjusting strategies as needed to ensure continued progress.
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our case managers are ready to support your journey toward stability and self-sufficiency. 
              Contact us today to schedule an initial assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule an Assessment
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                Learn About Eligibility
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseManagement;
