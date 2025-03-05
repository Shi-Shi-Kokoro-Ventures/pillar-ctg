
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HeartPulse, CheckCircle, ArrowRight } from "lucide-react";

const MentalHealth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Mental Health Services</h1>
              <p className="text-xl text-gray-600 mb-8">
                Compassionate, accessible mental health support designed to promote healing, 
                resilience, and overall well-being for individuals and families.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Request Services
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Mental Health Support</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                P.I.L.L.A.R. offers a range of mental health services provided by licensed professionals 
                to address the diverse needs of individuals experiencing housing instability or homelessness.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <HeartPulse className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Individual Counseling</h3>
                      <p className="text-gray-600 mb-4">
                        One-on-one therapy sessions with licensed counselors to address depression, 
                        anxiety, trauma, substance use disorders, and other mental health concerns.
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Available in person or via telehealth</li>
                        <li>• Flexible scheduling options</li>
                        <li>• No insurance required</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <HeartPulse className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Group Therapy</h3>
                      <p className="text-gray-600 mb-4">
                        Structured group sessions focused on specific issues such as stress management, 
                        coping skills, recovery support, and building healthy relationships.
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Supportive peer environment</li>
                        <li>• Weekly scheduled sessions</li>
                        <li>• Facilitated by licensed therapists</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <HeartPulse className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Crisis Intervention</h3>
                      <p className="text-gray-600 mb-4">
                        Immediate support for individuals experiencing acute mental health crises, 
                        with connections to emergency services when needed.
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 24/7 crisis hotline</li>
                        <li>• Mobile crisis response team</li>
                        <li>• Safety planning and follow-up</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <HeartPulse className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Medication Management</h3>
                      <p className="text-gray-600 mb-4">
                        Psychiatric evaluation and ongoing medication management by licensed 
                        psychiatric providers for individuals who may benefit from medication.
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Comprehensive psychiatric assessment</li>
                        <li>• Medication education and monitoring</li>
                        <li>• Assistance with medication costs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Your Mental Health Matters</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our compassionate team is here to support your mental health journey. 
              All services are confidential and provided with dignity and respect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule an Appointment
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                Call Our Helpline
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentalHealth;
