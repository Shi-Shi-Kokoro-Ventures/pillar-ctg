
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Leadership = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Leadership Team</h1>
              <p className="text-xl text-gray-600 mb-8">
                Meet the dedicated professionals guiding P.I.L.L.A.R's mission to provide housing and support to those in need.
              </p>
            </div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Executive Leadership</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 mb-6 overflow-hidden">
                    <img src="/placeholder.svg" alt="CEO" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                  <p className="text-blue-600 font-medium mb-3">Chief Executive Officer</p>
                  <p className="text-gray-600 text-sm">
                    With over 20 years of experience in nonprofit leadership, Sarah has dedicated her career to addressing homelessness and poverty.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 mb-6 overflow-hidden">
                    <img src="/placeholder.svg" alt="COO" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Michael Rodriguez</h3>
                  <p className="text-blue-600 font-medium mb-3">Chief Operations Officer</p>
                  <p className="text-gray-600 text-sm">
                    Michael oversees the day-to-day operations of our programs, ensuring effective service delivery and organizational efficiency.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 mb-6 overflow-hidden">
                    <img src="/placeholder.svg" alt="CFO" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Amara Williams</h3>
                  <p className="text-blue-600 font-medium mb-3">Chief Financial Officer</p>
                  <p className="text-gray-600 text-sm">
                    Amara brings extensive financial management experience to ensure P.I.L.L.A.R's resources are maximized for community impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Department Directors */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Program Directors</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
                  <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden mr-6">
                    <img src="/placeholder.svg" alt="Housing Director" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">David Chen</h3>
                    <p className="text-blue-600 font-medium mb-3">Director of Housing Services</p>
                    <p className="text-gray-600 text-sm">
                      David leads our housing programs, including emergency shelter, transitional housing, and permanent supportive housing initiatives.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
                  <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden mr-6">
                    <img src="/placeholder.svg" alt="Support Services Director" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Jasmine Foster</h3>
                    <p className="text-blue-600 font-medium mb-3">Director of Support Services</p>
                    <p className="text-gray-600 text-sm">
                      Jasmine oversees our comprehensive support services, including case management, mental health services, and job training programs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
                  <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden mr-6">
                    <img src="/placeholder.svg" alt="Development Director" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Robert Thompson</h3>
                    <p className="text-blue-600 font-medium mb-3">Director of Development</p>
                    <p className="text-gray-600 text-sm">
                      Robert leads our fundraising and donor relations efforts to secure the resources needed to sustain and expand our programs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
                  <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden mr-6">
                    <img src="/placeholder.svg" alt="Community Engagement Director" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Elena Patel</h3>
                    <p className="text-blue-600 font-medium mb-3">Director of Community Engagement</p>
                    <p className="text-gray-600 text-sm">
                      Elena coordinates our volunteer programs, community partnerships, and advocacy initiatives to build support for our mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board of Directors */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Board of Directors</h2>
              <p className="text-lg text-gray-600 mb-12 text-center">
                Our volunteer board of directors brings diverse expertise and a shared commitment to our mission.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-1">James Wilson</h3>
                  <p className="text-blue-600 font-medium mb-3">Board Chair | Financial Services Executive</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-1">Maria Gonzalez</h3>
                  <p className="text-blue-600 font-medium mb-3">Vice Chair | Community Advocate</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-1">Thomas Lee</h3>
                  <p className="text-blue-600 font-medium mb-3">Treasurer | Real Estate Developer</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-1">Sophia Washington</h3>
                  <p className="text-blue-600 font-medium mb-3">Secretary | Healthcare Executive</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-1">Marcus Taylor</h3>
                  <p className="text-blue-600 font-medium mb-3">Member | Attorney</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-1">Naomi Clark</h3>
                  <p className="text-blue-600 font-medium mb-3">Member | Social Work Professor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Interested in making a difference in the lives of those experiencing homelessness? Explore career opportunities with P.I.L.L.A.R.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/careers">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  View Career Opportunities
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Volunteer Opportunities
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

export default Leadership;
