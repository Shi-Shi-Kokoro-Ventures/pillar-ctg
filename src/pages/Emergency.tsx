
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";

const Emergency = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Emergency Alert Banner */}
        <div className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 mr-3" />
            <p className="text-lg font-medium">If you are in immediate danger, call 911</p>
          </div>
        </div>
        
        {/* Hero Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Emergency Housing Assistance</h1>
              <p className="text-xl text-gray-600 mb-8">
                If you or someone you know is experiencing a housing emergency or homelessness, 
                the P.I.L.L.A.R. Initiative can help connect you with immediate resources and support.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 mb-8">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-500 mr-3 shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">24/7 Housing Crisis Hotline</h2>
                    <p className="text-gray-600 mb-4">Our trained staff is available around the clock to provide assistance and information.</p>
                    <a href="tel:1-800-PILLAR" className="text-2xl font-bold text-blue-500 hover:underline">1-800-PILLAR (745-5273)</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Emergency Services We Provide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Emergency Shelter</h3>
                <p className="text-gray-600 mb-6">
                  Immediate temporary housing for individuals and families facing homelessness or unsafe living conditions.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <span>Available 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <span>Multiple locations throughout the city</span>
                  </li>
                </ul>
                <Button className="w-full">Find Shelter</Button>
              </div>
              
              {/* Service 2 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Eviction Prevention</h3>
                <p className="text-gray-600 mb-6">
                  Financial assistance and mediation services to help prevent eviction for households in crisis.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <span>Rapid response within 48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <span>Services available in all counties</span>
                  </li>
                </ul>
                <Button className="w-full">Apply for Assistance</Button>
              </div>
              
              {/* Service 3 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Crisis Support</h3>
                <p className="text-gray-600 mb-6">
                  Mental health resources, case management, and support services for individuals experiencing housing instability.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <span>Available 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <span>Phone and in-person support</span>
                  </li>
                </ul>
                <Button className="w-full">Get Support</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resource Map */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Find Help Near You</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
              <InteractiveMap />
              <p className="text-gray-600 mt-6 mb-6">
                Use our interactive map to find emergency housing resources in your area, 
                including shelters, food banks, healthcare facilities, and other support services.
              </p>
              <Button className="w-full md:w-auto">View Full Map</Button>
            </div>
          </div>
        </section>
        
        {/* Community Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Community Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "County Housing Authority",
                  description: "Government agency that provides housing assistance programs and subsidies.",
                  phone: "(503) 555-1234",
                  website: "www.countyhousing.org"
                },
                {
                  title: "Mental Health Crisis Line",
                  description: "24/7 support for mental health emergencies and referrals to treatment.",
                  phone: "(503) 555-4321",
                  website: "www.mentalhealthsupport.org"
                },
                {
                  title: "Domestic Violence Shelter",
                  description: "Emergency shelter and resources for survivors of domestic violence.",
                  phone: "(503) 555-7890",
                  website: "www.safehousenow.org"
                },
                {
                  title: "Veterans Housing Services",
                  description: "Housing assistance specifically for veterans and their families.",
                  phone: "(503) 555-0987",
                  website: "www.veteranshousing.org"
                }
              ].map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-blue-500 mr-2" />
                      <span>{resource.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <a href={`https://${resource.website}`} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                        {resource.website}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Emergency Preparation */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Know Before You Need Help</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Take steps now to prepare for potential housing emergencies. Download our emergency housing guide 
              and keep important resources handy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                Download Emergency Guide
              </Button>
              <Button variant="outline">
                Sign Up for Alert Notifications
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Emergency;
