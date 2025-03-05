
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, ArrowRight } from "lucide-react";

const FamilySupport = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Family Support Services</h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive support designed to strengthen families, enhance parenting skills, 
                and create stable, nurturing environments for children to thrive.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Get Support For Your Family
              </Button>
            </div>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Family Programs</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                P.I.L.L.A.R. offers a range of family-centered programs that address the unique 
                needs of families experiencing housing instability or homelessness.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">Parenting Skills</h3>
                  <p className="text-gray-600">
                    Evidence-based parenting classes that enhance communication, discipline strategies, 
                    and developmental understanding to strengthen parent-child relationships.
                  </p>
                  <div className="mt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>8-week curriculum with childcare provided</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Age-specific techniques and approaches</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">Family Reunification</h3>
                  <p className="text-gray-600">
                    Support for families working toward reunification, including supervised visitation, 
                    family therapy, and coordination with child welfare agencies.
                  </p>
                  <div className="mt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Customized reunification plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Court-approved visitation facilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-700">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">Youth Services</h3>
                  <p className="text-gray-600">
                    Age-appropriate programs for children and teens, including tutoring, 
                    mentoring, recreational activities, and behavioral health support.
                  </p>
                  <div className="mt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>After-school and summer programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Individual and group counseling</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    Family Stability Program
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A comprehensive approach to preventing family homelessness through early intervention, 
                    rental assistance, and intensive case management for at-risk families.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Up to 6 months of rental assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Weekly case management meetings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Budgeting and financial coaching</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Employment assistance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    Whole Family Approach
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A two-generation strategy that addresses the needs of parents and children 
                    simultaneously to break the cycle of poverty and housing instability.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Coordinated adult and child services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Family-centered goal setting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Trauma-informed care approach</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Regular family progress meetings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">We're Here For Your Family</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our family support programs are designed to help families overcome challenges 
              and build a foundation for long-term stability and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule a Family Assessment
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                Join a Parenting Class
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FamilySupport;
