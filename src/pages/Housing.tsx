
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Users, Calendar, ArrowRight, CheckCircle } from "lucide-react";

const Housing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Transitional Housing Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Building bridges from homelessness to permanent housing through supportive, 
                temporary housing solutions that restore dignity and independence.
              </p>
              <Button className="bg-redcross hover:bg-redcross/90 text-white px-6 py-3 rounded-full">
                Apply for Housing
              </Button>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Transitional Housing Approach</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                The P.I.L.L.A.R. Initiative's transitional housing programs provide temporary 
                accommodations paired with comprehensive support services to help individuals 
                and families move from crisis to stability and permanent housing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Safe Environment</h3>
                  <p className="text-gray-600">
                    Clean, secure housing with private and shared spaces that respect dignity and restore stability.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Support Services</h3>
                  <p className="text-gray-600">
                    Individualized case management, life skills training, and employment assistance.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-700 text-center">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Time-Limited</h3>
                  <p className="text-gray-600">
                    Structured programs lasting 6-24 months focused on achieving housing independence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Housing Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Housing Programs</h2>
            
            <div className="max-w-5xl mx-auto">
              {[
                {
                  title: "Family Transition Program",
                  description: "Two-year program for families with children, offering multi-bedroom units and family-centered support services.",
                  capacity: "24 family units",
                  services: ["Parenting support", "Children's programming", "Educational assistance", "Family counseling"]
                },
                {
                  title: "Veterans Housing Initiative",
                  description: "Specialized program for veterans experiencing homelessness, with veteran-specific support services and peer mentoring.",
                  capacity: "40 individual units",
                  services: ["VA benefits navigation", "PTSD support", "Employment training", "Healthcare coordination"]
                },
                {
                  title: "Youth Bridge Housing",
                  description: "Supportive housing for young adults ages 18-24 who are experiencing homelessness or aging out of foster care.",
                  capacity: "30 individual units",
                  services: ["Education completion", "Job readiness", "Life skills", "Mental health services"]
                }
              ].map((program, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8 mb-8 flex flex-col md:flex-row">
                  <div className="md:w-2/3 pr-0 md:pr-6 mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <p className="text-sm text-blue-600 font-medium mb-4">Capacity: {program.capacity}</p>
                    <ul className="space-y-2">
                      {program.services.map((service, sIndex) => (
                        <li key={sIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/3 bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold mb-2">Program Requirements:</h4>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• Income verification</li>
                        <li>• Background check</li>
                        <li>• Participation in case management</li>
                        <li>• Commitment to program goals</li>
                      </ul>
                    </div>
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Success Stories</h2>
              
              <div className="bg-blue-50 p-8 rounded-lg mb-8">
                <blockquote className="text-lg italic text-gray-700 mb-6">
                  "After losing my job and apartment, I didn't know where to turn. The P.I.L.L.A.R. transitional housing program gave me not just a place to stay, but the tools to rebuild my life. Within 10 months, I had a full-time job and moved into my own apartment."
                </blockquote>
                <div>
                  <p className="font-bold">Michael R.</p>
                  <p className="text-sm text-gray-500">Program Graduate, 2022</p>
                </div>
              </div>
              
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Read More Success Stories
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our transitional housing programs help individuals and families move from crisis to stability. 
              Contact us today to learn more about eligibility and availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Apply for Housing
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

export default Housing;
