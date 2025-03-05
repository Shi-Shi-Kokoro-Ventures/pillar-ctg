
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HousingVouchers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Housing Voucher Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Learn about housing choice vouchers that help low-income families, the elderly, and persons with disabilities afford housing in the private market.
              </p>
              <Link to="/apply-for-assistance">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  Check Eligibility
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How Housing Vouchers Work</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                Housing vouchers allow qualified participants to choose their own housing, including single-family homes, townhouses, and apartments, that meet program requirements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Application Process</h3>
                  <p className="text-gray-600">
                    Complete an application and provide documentation of income, assets, and family composition.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Voucher Amount</h3>
                  <p className="text-gray-600">
                    The voucher pays a portion of rent directly to the landlord, with participants typically paying 30% of their income.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-700 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Housing Standards</h3>
                  <p className="text-gray-600">
                    All units must meet health and safety standards and pass a housing quality inspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Apply for a Housing Voucher</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our team can help you navigate the housing voucher application process and find suitable housing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply-for-assistance">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Application
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Contact a Housing Specialist
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

export default HousingVouchers;
