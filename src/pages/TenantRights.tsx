
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const TenantRights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Know Your Tenant Rights</h1>
              <p className="text-xl text-gray-600 mb-8">
                Understanding your rights as a tenant is essential for maintaining stable housing and addressing issues with landlords appropriately.
              </p>
              <Link to="/contact-us">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  Get Legal Assistance
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Rights Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Fundamental Tenant Rights</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                Every tenant is entitled to certain fundamental rights that protect them from discrimination, ensure safe living conditions, and provide due process for evictions.
              </p>
              
              <div className="space-y-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Right to Habitable Housing</h3>
                      <p className="text-gray-600">
                        Landlords must provide housing that meets basic structural, health, and safety standards. This includes working plumbing, heating, electricity, and a building free from pests and dangerous conditions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Scale className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Protection Against Discrimination</h3>
                      <p className="text-gray-600">
                        Fair housing laws prohibit discrimination based on race, color, national origin, religion, sex, familial status, or disability. Landlords cannot refuse to rent or impose different terms based on these protected characteristics.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Right to Due Process for Evictions</h3>
                      <p className="text-gray-600">
                        Landlords must follow legal procedures for eviction, including providing proper notice and filing a court action. Self-help evictions (such as changing locks or removing belongings) are illegal.
                      </p>
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
            <h2 className="text-3xl font-bold mb-6">Need Help With a Tenant Rights Issue?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our advocates can help you understand your rights, communicate with your landlord, and connect you with legal resources if needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/advocate">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Speak With an Advocate
                </Button>
              </Link>
              <Link to="/community-resources">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Find Legal Resources
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

export default TenantRights;
