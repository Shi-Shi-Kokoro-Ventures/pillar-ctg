
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RentalAssistance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24 bg-cover bg-center relative" 
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80')" }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">Rental Assistance Programs</h1>
              <p className="text-xl text-white mb-8 text-shadow">
                Emergency and long-term rental assistance to help individuals and families maintain stable housing.
              </p>
              <Link to="/apply-for-assistance">
                <Button className="shadow-lg hover:shadow-xl text-white px-6 py-3 rounded-full">
                  Apply for Assistance
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How Our Rental Assistance Works</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                P.I.L.L.A.R. offers several types of rental assistance programs to help prevent eviction 
                and homelessness by providing financial support to eligible households.
              </p>
              
              <div className="space-y-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-redcross">
                  <div className="flex items-start">
                    <div className="bg-redcross/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="h-6 w-6 text-redcross" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Emergency Rental Assistance</h3>
                      <p className="text-gray-600">
                        One-time financial assistance for households facing unexpected financial hardship 
                        and at risk of eviction. Covers up to three months of rent.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-redcross">
                  <div className="flex items-start">
                    <div className="bg-redcross/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="h-6 w-6 text-redcross" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Ongoing Rental Subsidies</h3>
                      <p className="text-gray-600">
                        Monthly rental assistance for income-qualified households, with participants 
                        typically paying 30% of their income toward rent.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-redcross">
                  <div className="flex items-start">
                    <div className="bg-redcross/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="h-6 w-6 text-redcross" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Security Deposit Assistance</h3>
                      <p className="text-gray-600">
                        Funds to cover security deposits for households moving into new rental units, 
                        removing a significant barrier to stable housing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-redcross text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help With Rent?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our rental assistance programs can help you stay in your home during difficult times. 
              Contact us today to learn about eligibility requirements and how to apply.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply-for-assistance">
                <Button className="bg-white text-redcross hover:bg-gray-100 border-2 border-white shadow-lg">
                  Apply for Assistance
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-redcross-dark focus:bg-white focus:text-redcross focus:ring-2 focus:ring-white shadow-lg">
                  Schedule a Consultation
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

export default RentalAssistance;
