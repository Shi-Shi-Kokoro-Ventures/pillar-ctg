
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Home, Utensils, HeartPulse, BookOpen, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityResources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Community Resources</h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with essential services and support programs in our community to help meet your basic needs.
              </p>
              <Link to="/housing-crisis-hotline">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  Get Immediate Help
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Find Resources By Category</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {/* Housing Resources */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-blue-600 p-4 flex items-center">
                    <Home className="h-6 w-6 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">Housing</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li>
                        <Link to="/emergency" className="text-blue-600 hover:underline block">Emergency Shelter</Link>
                      </li>
                      <li>
                        <Link to="/rental-assistance" className="text-blue-600 hover:underline block">Rental Assistance</Link>
                      </li>
                      <li>
                        <Link to="/affordable-housing" className="text-blue-600 hover:underline block">Affordable Housing</Link>
                      </li>
                      <li>
                        <Link to="/housing-vouchers" className="text-blue-600 hover:underline block">Housing Vouchers</Link>
                      </li>
                      <li>
                        <Link to="/tenant-rights" className="text-blue-600 hover:underline block">Tenant Rights</Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/housing">
                        <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                          View All Housing Resources
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Food Assistance */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-green-600 p-4 flex items-center">
                    <Utensils className="h-6 w-6 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">Food</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Food Banks</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Meal Programs</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">SNAP Benefits</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">WIC Program</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">School Meal Programs</Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/all-ways">
                        <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                          View All Food Resources
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Healthcare */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-red-600 p-4 flex items-center">
                    <HeartPulse className="h-6 w-6 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">Healthcare</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li>
                        <Link to="/mental-health" className="text-blue-600 hover:underline block">Mental Health Services</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Free Clinics</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Medicaid Enrollment</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Prescription Assistance</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Substance Use Treatment</Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/all-ways">
                        <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                          View All Healthcare Resources
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Education & Employment */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-amber-600 p-4 flex items-center">
                    <BookOpen className="h-6 w-6 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">Education & Jobs</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li>
                        <Link to="/job-training" className="text-blue-600 hover:underline block">Job Training</Link>
                      </li>
                      <li>
                        <Link to="/classes" className="text-blue-600 hover:underline block">Adult Education</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">GED Programs</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Job Search Assistance</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Vocational Rehabilitation</Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/all-ways">
                        <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                          View All Education & Job Resources
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Financial Assistance */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-purple-600 p-4 flex items-center">
                    <DollarSign className="h-6 w-6 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">Financial Help</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li>
                        <Link to="/financial-literacy" className="text-blue-600 hover:underline block">Financial Education</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Utility Assistance</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Tax Preparation</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Public Benefits</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Credit Counseling</Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/all-ways">
                        <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                          View All Financial Resources
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Crisis Services */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-red-700 p-4 flex items-center">
                    <Phone className="h-6 w-6 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">Crisis Services</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li>
                        <Link to="/housing-crisis-hotline" className="text-blue-600 hover:underline block">Housing Crisis Hotline</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Domestic Violence Support</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Suicide Prevention</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Crisis Intervention</Link>
                      </li>
                      <li>
                        <Link to="#" className="text-blue-600 hover:underline block">Disaster Relief</Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/emergency">
                        <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                          View All Crisis Services
                        </Button>
                      </Link>
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
            <h2 className="text-3xl font-bold mb-6">Need Help Finding Resources?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our team can connect you with the right services to meet your needs. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/housing-crisis-hotline">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Call Our Hotline
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Request Resource Navigation
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

export default CommunityResources;
