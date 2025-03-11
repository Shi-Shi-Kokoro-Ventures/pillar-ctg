
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const HousingCrisisHotline = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-red-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Housing Crisis Hotline</h1>
              <p className="text-xl text-gray-600 mb-8">
                Immediate assistance for those facing housing emergencies, eviction, or homelessness
              </p>
              <div className="text-3xl font-bold text-red-600 mb-8">
                1(833) LVL-HARD (1-833-585-4273)
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How We Can Help</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                Our crisis hotline provides immediate assistance and guidance for those experiencing housing emergencies or at risk of homelessness.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <h3 className="text-xl font-bold mb-3">Emergency Shelter Placement</h3>
                  <p className="text-gray-600 mb-4">
                    Rapid connection to available emergency shelter beds for individuals and families with nowhere to go.
                  </p>
                  <Link to="/emergency" className="text-red-600 hover:text-red-700 font-medium">
                    Learn more about emergency shelter →
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <h3 className="text-xl font-bold mb-3">Eviction Prevention</h3>
                  <p className="text-gray-600 mb-4">
                    Guidance on emergency resources to prevent eviction, including rental assistance and legal support.
                  </p>
                  <Link to="/rental-assistance" className="text-red-600 hover:text-red-700 font-medium">
                    Learn more about eviction prevention →
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <h3 className="text-xl font-bold mb-3">Domestic Violence Support</h3>
                  <p className="text-gray-600 mb-4">
                    Specialized assistance for those needing to leave an unsafe housing situation due to domestic violence.
                  </p>
                  <Link to="/family-support" className="text-red-600 hover:text-red-700 font-medium">
                    Learn more about safety resources →
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <h3 className="text-xl font-bold mb-3">Homelessness Diversion</h3>
                  <p className="text-gray-600 mb-4">
                    Creative problem-solving to identify immediate alternatives to entering the shelter system.
                  </p>
                  <Link to="/housing" className="text-red-600 hover:text-red-700 font-medium">
                    Learn more about housing options →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hotline Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">About Our Hotline</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">24/7 Availability</h3>
                  <p className="text-gray-600">
                    Our trained crisis specialists are available 24 hours a day, 7 days a week, including holidays.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Multilingual Support</h3>
                  <p className="text-gray-600">
                    Translation services available in over 200 languages to ensure everyone can access help.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Follow-Up Support</h3>
                  <p className="text-gray-600">
                    Connection to case management services for ongoing support beyond the immediate crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Don't Wait Until It's Too Late</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              If you're facing eviction, a housing emergency, or homelessness, call our hotline today. Our trained specialists are ready to help.
            </p>
            <div className="text-3xl font-bold mb-8">
              1(833) LVL-HARD (1-833-585-4273)
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/emergency">
                <Button className="bg-white text-red-600 hover:bg-gray-100">
                  Emergency Resources
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="border-white text-white hover:bg-red-700">
                  Email Support
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

export default HousingCrisisHotline;
