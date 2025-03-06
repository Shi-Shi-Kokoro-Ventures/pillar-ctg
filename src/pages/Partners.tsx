
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Handshake, Building, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Partners = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Partners</h1>
              <p className="text-xl text-gray-600 mb-8">
                Together with our dedicated partners, we're creating lasting solutions to homelessness and housing insecurity.
              </p>
              <Link to="/corporate-partnerships">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Partners */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Featured Partners</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1535921587207-1b858a52a88f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="City Government" className="max-h-20" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1601761902945-c25354a3af20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Community Foundation" className="max-h-20" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Regional Hospital" className="max-h-20" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Corporate Sponsor" className="max-h-20" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Housing Authority" className="max-h-20" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Local Bank" className="max-h-20" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1580983553587-86b6f9e94e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Community College" className="max-h-20" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1591758879097-01d8eb4bb922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Faith Organization" className="max-h-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Partnership Network</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Government Partners</h3>
                  <p className="text-gray-600 mb-4">
                    We collaborate with local, state, and federal agencies to leverage public resources and implement effective housing policies.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>City Housing Department</li>
                    <li>County Human Services</li>
                    <li>State Housing Finance Agency</li>
                    <li>Federal HUD Programs</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Handshake className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Corporate Partners</h3>
                  <p className="text-gray-600 mb-4">
                    Businesses that provide financial support, in-kind donations, volunteer time, and employment opportunities for our clients.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Regional Banks & Credit Unions</li>
                    <li>Local Employers</li>
                    <li>Real Estate Developers</li>
                    <li>Retail & Service Companies</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Community Partners</h3>
                  <p className="text-gray-600 mb-4">
                    Organizations that complement our services and help create a comprehensive support network for those in need.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Mental Health Providers</li>
                    <li>Healthcare Systems</li>
                    <li>Educational Institutions</li>
                    <li>Faith Communities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Partner Testimonials</h2>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <p className="text-gray-600 italic mb-4">
                    "Our partnership with P.I.L.L.A.R has allowed us to make a meaningful impact in addressing homelessness in our community. Their expertise and dedication make them an invaluable ally in our efforts to create more affordable housing."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="James Wilson" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">James Wilson</p>
                      <p className="text-sm text-gray-500">Director, City Housing Authority</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                  <p className="text-gray-600 italic mb-4">
                    "As a healthcare provider, we've seen firsthand how stable housing improves health outcomes. P.I.L.L.A.R's work complements our mission by addressing a fundamental social determinant of health. We're proud to support their efforts."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Dr. Maria Rodriguez" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">Dr. Maria Rodriguez</p>
                      <p className="text-sm text-gray-500">Community Health Director, Regional Medical Center</p>
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
            <h2 className="text-3xl font-bold mb-6">Join Our Network of Partners</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Together, we can make a greater impact in ending homelessness and building stronger communities. Explore partnership opportunities with P.I.L.L.A.R.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/corporate-partnerships">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Become a Partner
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Contact Our Partnership Team
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

export default Partners;
