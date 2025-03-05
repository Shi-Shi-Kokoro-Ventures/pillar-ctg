
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, Share2, FileText, Users, ClipboardList, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Advocate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become an Advocate</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Lend your voice to support housing equity and policy changes that help end homelessness in our community.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Join Our Advocacy Network
            </Button>
          </div>
        </section>

        {/* Why Advocate */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Advocacy Matters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Policy Change</h3>
                <p className="text-gray-600">
                  Advocating for policy changes can remove barriers to affordable housing and increase funding for supportive services.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Awareness</h3>
                <p className="text-gray-600">
                  Raising awareness helps break down stigmas around homelessness and builds community support for housing initiatives.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Share2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Collective Impact</h3>
                <p className="text-gray-600">
                  When we join together, our voices are amplified, creating momentum for systemic change in how we address housing insecurity.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Current Issues */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current Housing Policy Issues</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3">Rental Assistance Funding</h3>
                  <p className="text-gray-600 mb-4">
                    Advocating for increased funding for emergency rental assistance programs to prevent evictions and homelessness.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Urgent Priority
                    </span>
                    <Button variant="outline" size="sm">Take Action</Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3">Affordable Housing Development</h3>
                  <p className="text-gray-600 mb-4">
                    Supporting zoning changes and incentives to increase the development of affordable housing units.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Ongoing Issue
                    </span>
                    <Button variant="outline" size="sm">Take Action</Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3">Eviction Protections</h3>
                  <p className="text-gray-600 mb-4">
                    Working to strengthen tenant protections and create more accessible legal resources for those facing eviction.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Urgent Priority
                    </span>
                    <Button variant="outline" size="sm">Take Action</Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3">Housing First Approach</h3>
                  <p className="text-gray-600 mb-4">
                    Advocating for the Housing First model, which prioritizes providing permanent housing as quickly as possible.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Ongoing Issue
                    </span>
                    <Button variant="outline" size="sm">Take Action</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How to Advocate */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How You Can Advocate</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Contact Officials</h3>
                  <p className="text-gray-600 mb-4">
                    Write or call your elected officials to express support for affordable housing policies and funding.
                  </p>
                  <Button variant="outline" size="sm">Find Your Officials</Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Attend Hearings</h3>
                  <p className="text-gray-600 mb-4">
                    Show up at city council meetings and public hearings to voice support for housing initiatives.
                  </p>
                  <Button variant="outline" size="sm">View Upcoming Hearings</Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Share Information</h3>
                  <p className="text-gray-600 mb-4">
                    Use social media to spread awareness about housing issues and share P.I.L.L.A.R.'s advocacy campaigns.
                  </p>
                  <Button variant="outline" size="sm">Get Social Media Kit</Button>
                </div>
              </div>
              
              <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Advocacy Network</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Sign up to receive alerts when your voice is needed. We'll provide you with the information and tools you need to take effective action on housing policy issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                  <Button className="whitespace-nowrap bg-blue-600 hover:bg-blue-700">
                    Join the Network
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Story */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Advocacy Success Stories</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                    alt="City Council Meeting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-3">Affordable Housing Trust Fund</h3>
                  <p className="text-gray-600 mb-4">
                    In 2022, P.I.L.L.A.R. advocates helped secure $10 million in new funding for the Portland Affordable Housing Trust Fund. Over 200 advocates contacted city officials, attended hearings, and shared personal stories about the impact of housing instability.
                  </p>
                  <p className="text-gray-600 mb-4">
                    This funding is now supporting the development of 120 new affordable housing units and providing rental assistance to 85 families at risk of homelessness.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Read more success stories
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Advocate;
