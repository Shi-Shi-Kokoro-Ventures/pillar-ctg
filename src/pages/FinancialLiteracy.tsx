
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const FinancialLiteracy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Literacy Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Building financial knowledge and skills to help individuals and families achieve economic stability.
              </p>
              <Link to="/classes">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  View Upcoming Classes
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Financial Education Approach</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                P.I.L.L.A.R. offers a comprehensive set of financial education programs designed to meet people where they are
                and guide them toward financial stability and independence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Basic Financial Education</h3>
                  <p className="text-gray-600">
                    Learn budgeting, banking basics, and how to establish or repair credit.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Money Management</h3>
                  <p className="text-gray-600">
                    Develop skills to reduce debt, increase savings, and plan for future expenses.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-700 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Financial Planning</h3>
                  <p className="text-gray-600">
                    Set financial goals, create a path to homeownership, and prepare for retirement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join one of our upcoming financial education classes or schedule a one-on-one session with a financial coach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/classes">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  View Class Schedule
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Request Financial Coaching
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

export default FinancialLiteracy;
