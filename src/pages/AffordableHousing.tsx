
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle, ArrowRight } from "lucide-react";

const AffordableHousing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Affordable Housing Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Access quality, affordable housing options that provide stability 
                and security for individuals and families on limited incomes.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Check Eligibility
              </Button>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Affordable Housing Options</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                P.I.L.L.A.R. works with property owners, developers, and government agencies to 
                create and maintain affordable housing options for low to moderate-income households.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Subsidized Apartments</h3>
                  <p className="text-gray-600">
                    Rent-controlled apartments with income-based rent payments, typically 30% of household income.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Housing Vouchers</h3>
                  <p className="text-gray-600">
                    Rental assistance vouchers that help pay for housing in the private market.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-700 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">First-Time Homebuyers</h3>
                  <p className="text-gray-600">
                    Down payment assistance and favorable financing for eligible first-time homebuyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Affordable Housing?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our affordable housing programs help individuals and families find stable, 
              quality housing they can afford. Contact us today to learn more about eligibility and availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                Contact a Housing Specialist
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AffordableHousing;
