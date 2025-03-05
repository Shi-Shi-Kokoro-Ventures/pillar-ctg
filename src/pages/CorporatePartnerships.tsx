
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Handshake, DollarSign, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CorporatePartnerships = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Corporate Partnerships</h1>
              <p className="text-xl text-gray-600 mb-8">
                Join forces with P.I.L.L.A.R. to make a meaningful impact on housing stability in our community.
              </p>
              <Link to="/contact-us">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Partnership Opportunities</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                We offer multiple ways for your company to engage with our mission and make a difference in the lives of those experiencing housing instability.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Financial Support</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Become a program sponsor or make corporate donations to fund our housing initiatives and support services.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside mb-4">
                    <li>Annual corporate giving</li>
                    <li>Program-specific sponsorships</li>
                    <li>Matching gift programs</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Volunteer Engagement</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Organize team volunteer days to help with housing construction, renovation, or community events.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside mb-4">
                    <li>Team building volunteer days</li>
                    <li>Skills-based volunteering</li>
                    <li>Board/committee service</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">In-Kind Donations</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Contribute products, services, or expertise that support our housing and program operations.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside mb-4">
                    <li>Construction materials</li>
                    <li>Professional services</li>
                    <li>Technology and equipment</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-800">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Handshake className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Strategic Partnerships</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Develop long-term collaborative relationships that align with both our mission and your business goals.
                  </p>
                  <ul className="text-gray-600 list-disc list-inside mb-4">
                    <li>Cause marketing campaigns</li>
                    <li>Program development partnerships</li>
                    <li>Advocacy collaborations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Contact our corporate partnerships team to discuss how your company can help create housing solutions in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-us">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Contact Partnership Team
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Make a Corporate Donation
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

export default CorporatePartnerships;
