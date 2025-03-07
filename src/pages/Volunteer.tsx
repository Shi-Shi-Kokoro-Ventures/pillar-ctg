import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Wrench, BookOpen, Heart, Star } from "lucide-react";
import VolunteerApplicationForm from "@/components/VolunteerApplicationForm";

const Volunteer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const openVolunteerForm = () => {
    setIsFormOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Volunteer Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Be a part of the solution to homelessness by volunteering with the P.I.L.L.A.R. Initiative. 
              Your time and skills can help transform lives and rebuild communities.
            </p>
            <Button 
              className="bg-redcross hover:bg-redcross/90 px-6 py-2 text-base"
              onClick={openVolunteerForm}
            >
              Apply to Volunteer
            </Button>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Volunteer Opportunities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Opportunity 1 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all">
                <div className="bg-redcross/10 p-3 rounded-full w-fit mb-6">
                  <Users className="h-8 w-8 text-redcross" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Mentorship Program</h3>
                <p className="text-gray-600 mb-6">
                  Provide guidance and support to individuals transitioning to stable housing. Help with job searches, 
                  financial planning, and accessing community resources.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>4-6 hours per month commitment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>Training provided</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>Background check required</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={openVolunteerForm}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Opportunity 2 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all">
                <div className="bg-redcross/10 p-3 rounded-full w-fit mb-6">
                  <Wrench className="h-8 w-8 text-redcross" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Housing Renovation</h3>
                <p className="text-gray-600 mb-6">
                  Help renovate and prepare affordable housing units for new residents. Projects include painting, 
                  basic repairs, cleaning, and furniture assembly.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>One-time or recurring opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>No experience necessary</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>Great for groups and corporate teams</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={openVolunteerForm}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Opportunity 3 */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all">
                <div className="bg-redcross/10 p-3 rounded-full w-fit mb-6">
                  <BookOpen className="h-8 w-8 text-redcross" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Education & Training</h3>
                <p className="text-gray-600 mb-6">
                  Lead workshops on financial literacy, job readiness, digital skills, and other life skills that 
                  help individuals achieve long-term independence.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>Professional expertise valued</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                    <span>Curriculum and materials provided</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={openVolunteerForm}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Volunteer Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Volunteer With Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mx-auto bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                  <Heart className="h-8 w-8 text-redcross" />
                </div>
                <h3 className="text-xl font-bold mb-2">Make a Real Difference</h3>
                <p className="text-gray-600">See the direct impact of your work as families move into stable housing and rebuild their lives</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                  <Users className="h-8 w-8 text-redcross" />
                </div>
                <h3 className="text-xl font-bold mb-2">Build Community</h3>
                <p className="text-gray-600">Connect with like-minded volunteers and develop meaningful relationships with those we serve</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                  <Star className="h-8 w-8 text-redcross" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gain Experience</h3>
                <p className="text-gray-600">Develop new skills, enhance your resume, and grow personally and professionally</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Volunteer Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                      alt="Sarah Johnson" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-gray-600 text-sm">Mentorship Program Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Volunteering with P.I.L.L.A.R. has been one of the most rewarding experiences of my life. Seeing the 
                  family I mentored move into their own apartment after months of working together was incredibly powerful."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Michael Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-gray-600 text-sm">Housing Renovation Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Our company team spent a day painting and setting up furniture in a new affordable housing unit. The 
                  experience brought us closer together while making a tangible difference in our community."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-redcross/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join our team of dedicated volunteers and help us create lasting solutions to homelessness in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-redcross hover:bg-redcross/90 px-6 py-2"
                onClick={openVolunteerForm}
              >
                Apply to Volunteer
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-2"
                onClick={() => window.location.href = "/contact-us"}
              >
                Contact Us With Questions
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Volunteer Application Form Dialog */}
      <VolunteerApplicationForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
};

export default Volunteer;
