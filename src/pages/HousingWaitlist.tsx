import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle, Bell, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HousingWaitlist = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Project Update: Awaiting Funding</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Transitional Housing Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your interest in our Transitional Housing Programs. Currently, 
                this initiative is in the development stage and contingent upon additional 
                funding to launch successfully. We are committed to ensuring that every aspect 
                of the program meets the highest standards of care, compliance, and impact.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Reminder */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Planned Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-bold mb-3">Family Transition Program</h3>
                  <p className="text-gray-700 text-sm">
                    Two-year program for families with children, offering multi-bedroom units and family-centered support services.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-bold mb-3">Veterans Housing Initiative</h3>
                  <p className="text-gray-700 text-sm">
                    Specialized program for veterans experiencing homelessness, with veteran-specific support services and peer mentoring.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-bold mb-3">Youth Bridge Housing</h3>
                  <p className="text-gray-700 text-sm">
                    Supportive housing for young adults ages 18-24 who are experiencing homelessness or aging out of foster care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Waitlist */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-8">
                  <Bell className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Join Our Waitlist</h2>
                  <p className="text-gray-600">
                    If you would like to be notified as soon as program funding is secured and 
                    the official start date is confirmed, we invite you to join our waitlist. 
                    By doing so, you will receive updates on the program's progress, anticipated 
                    timelines, and any new developments that may affect eligibility or enrollment.
                  </p>
                </div>
                
                <p className="text-gray-600 mb-8 text-center">
                  We value your patience and are grateful for your understanding as we work 
                  diligently to secure the resources needed to bring this vital program to life.
                </p>
                
                <div className="text-center">
                  <Link to="/apply-for-assistance">
                    <Button className="px-6">
                      Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Commitment to Transparency</h2>
              <p className="text-lg text-gray-600 mb-8">
                At The P.I.L.L.A.R. Initiative, Inc., we believe in open communication and 
                responsible stewardship of funds. We will keep all waitlist members and 
                stakeholders informed about major milestones, funding updates, and important 
                program details as they become available.
              </p>
              <p className="text-lg text-gray-600">
                If you have any questions or would like more information, please feel free to reach out 
                to us at <a href="mailto:info@pillar-initiative.org" className="text-blue-600 hover:underline">
                info@pillar-initiative.org</a>. We appreciate your interest and look forward to partnering 
                with you to make a lasting difference in our community.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HousingWaitlist;
