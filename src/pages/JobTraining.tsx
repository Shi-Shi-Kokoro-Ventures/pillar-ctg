
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, ArrowRight } from "lucide-react";

const JobTraining = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Job Training Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Develop marketable skills, enhance your employability, and build a path to 
                sustainable income through our comprehensive job training initiatives.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Enroll Today
              </Button>
            </div>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Training Programs</h2>
              <p className="text-lg text-gray-600 mb-10 text-center">
                P.I.L.L.A.R. offers a variety of training programs designed to help individuals 
                develop skills that are in demand in today's job market.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Briefcase className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Construction Skills Training</h3>
                      <p className="text-gray-600 mb-4">
                        An 8-week program teaching basic construction skills including carpentry, 
                        electrical, plumbing, and HVAC fundamentals.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>OSHA safety certification</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Hands-on training</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Job placement assistance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Briefcase className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Culinary Arts Program</h3>
                      <p className="text-gray-600 mb-4">
                        A 12-week program teaching food preparation, kitchen safety, menu planning, 
                        and professional culinary techniques.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Food handler certification</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Restaurant internship</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Catering experience</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Briefcase className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Healthcare Support Training</h3>
                      <p className="text-gray-600 mb-4">
                        A 10-week program preparing students for entry-level healthcare positions 
                        including medical assistant and patient care technician roles.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>CPR/First Aid certification</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Clinical placement</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Electronic medical records training</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <Briefcase className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Technology Skills Development</h3>
                      <p className="text-gray-600 mb-4">
                        A flexible 16-week program teaching basic to intermediate computer skills, 
                        office applications, and introductory coding.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Microsoft Office certification</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Free laptop for program completion</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Digital literacy certificate</span>
                        </li>
                      </ul>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Our job training programs are designed to help you gain the skills employers are looking for. 
              Contact us today to learn about eligibility, schedules, and how to enroll.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Register for Orientation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                Download Program Guide
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobTraining;
