
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, Users, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Housing Case Manager",
      department: "Client Services",
      location: "Portland, OR",
      type: "Full-time"
    },
    {
      title: "Development Coordinator",
      department: "Fundraising",
      location: "Portland, OR",
      type: "Full-time"
    },
    {
      title: "Financial Education Specialist",
      department: "Education",
      location: "Portland, OR",
      type: "Part-time"
    },
    {
      title: "Volunteer Coordinator",
      department: "Operations",
      location: "Portland, OR",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section with background image */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl text-gray-600 mb-8">
                Be part of a mission-driven team dedicated to creating housing stability and building stronger communities.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                View Current Openings
              </Button>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Work With P.I.L.L.A.R.</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Heart className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Meaningful Work</h3>
                  </div>
                  <p className="text-gray-600">
                    Make a direct impact on people's lives and help create housing stability in our community. Every role contributes to our mission.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Supportive Culture</h3>
                  </div>
                  <p className="text-gray-600">
                    Join a team that values collaboration, diversity, and work-life balance. We prioritize employee wellbeing and professional growth.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Growth Opportunities</h3>
                  </div>
                  <p className="text-gray-600">
                    Develop your skills through ongoing training, mentorship, and opportunities for advancement within our organization.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Competitive Benefits</h3>
                  </div>
                  <p className="text-gray-600">
                    We offer healthcare coverage, retirement plans, paid time off, and flexible scheduling options for eligible positions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Current Job Openings</h2>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {jobOpenings.map((job, index) => (
                    <div key={index} className={`py-4 ${index !== jobOpenings.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-blue-700">{job.title}</h3>
                          <div className="text-gray-600 mt-1">
                            {job.department} | {job.location} | {job.type}
                          </div>
                        </div>
                        <Button className="mt-3 md:mt-0 bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center text-gray-600">
                <p>Don't see a position that matches your skills?</p>
                <Link to="/contact-us" className="text-blue-600 hover:underline">
                  Submit your resume for future opportunities
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
