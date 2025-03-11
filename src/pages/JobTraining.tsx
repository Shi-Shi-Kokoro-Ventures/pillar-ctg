
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  CheckCircle, 
  ArrowRight, 
  GraduationCap, 
  Rocket, 
  Target,
  Calendar,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const JobTraining = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-blue-50">
      <Navbar />
      
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-blue-50 to-transparent"></div>
          <div className="container relative mx-auto px-4 z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4 animate-fade-in">Career Development</span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-redcross-dark via-redcross to-redcross-light bg-clip-text text-transparent">Job Training Programs</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Develop marketable skills, enhance your employability, and build a path to 
                  sustainable income through our comprehensive job training initiatives.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group button-border-light">
                  Enroll Today
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/time-bank')}>
                  Explore Time Banking
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-8 left-0 right-0 h-16 bg-white transform -skew-y-1"></div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center p-4 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm hover-scale">
                <div className="text-4xl font-bold text-redcross mb-2">95%</div>
                <p className="text-gray-600 text-sm">Program Completion Rate</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm hover-scale">
                <div className="text-4xl font-bold text-redcross mb-2">87%</div>
                <p className="text-gray-600 text-sm">Employment Success</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm hover-scale">
                <div className="text-4xl font-bold text-redcross mb-2">4.8</div>
                <p className="text-gray-600 text-sm">Student Satisfaction</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm hover-scale">
                <div className="text-4xl font-bold text-redcross mb-2">24</div>
                <p className="text-gray-600 text-sm">Partner Companies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">Specialized Training</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Training Programs</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  P.I.L.L.A.R. offers a variety of training programs designed to help individuals 
                  develop skills that are in demand in today's job market.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-redcross group-hover:from-redcross group-hover:to-blue-600 transition-all duration-500"></div>
                  <CardHeader>
                    <div className="flex items-start">
                      <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                        <Briefcase className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Construction Skills Training</CardTitle>
                        <CardDescription className="mt-2">
                          An 8-week program teaching basic construction skills including carpentry, 
                          electrical, plumbing, and HVAC fundamentals.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>OSHA safety certification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Hands-on training</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Job placement assistance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-redcross group-hover:from-redcross group-hover:to-blue-600 transition-all duration-500"></div>
                  <CardHeader>
                    <div className="flex items-start">
                      <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                        <GraduationCap className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Culinary Arts Program</CardTitle>
                        <CardDescription className="mt-2">
                          A 12-week program teaching food preparation, kitchen safety, menu planning, 
                          and professional culinary techniques.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Food handler certification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Restaurant internship</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Catering experience</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-redcross group-hover:from-redcross group-hover:to-blue-600 transition-all duration-500"></div>
                  <CardHeader>
                    <div className="flex items-start">
                      <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                        <Users className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Healthcare Support Training</CardTitle>
                        <CardDescription className="mt-2">
                          A 10-week program preparing students for entry-level healthcare positions 
                          including medical assistant and patient care technician roles.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>CPR/First Aid certification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Clinical placement</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Electronic medical records training</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-redcross group-hover:from-redcross group-hover:to-blue-600 transition-all duration-500"></div>
                  <CardHeader>
                    <div className="flex items-start">
                      <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                        <Target className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Technology Skills Development</CardTitle>
                        <CardDescription className="mt-2">
                          A flexible 16-week program teaching basic to intermediate computer skills, 
                          office applications, and introductory coding.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Microsoft Office certification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Free laptop for program completion</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Digital literacy certificate</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-gradient-to-br from-white via-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">Your Journey</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Training Timeline</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our structured approach ensures you progress efficiently through your training journey
                </p>
              </div>
              
              <div className="relative">
                {/* Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-redcross to-blue-200 rounded-full hidden md:block"></div>
                
                <div className="space-y-12 relative">
                  {/* Step 1 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                        <h3 className="text-xl font-bold mb-2 text-redcross">Application & Assessment</h3>
                        <p className="text-gray-600">Complete your application and take a skills assessment to determine your starting point</p>
                      </div>
                    </div>
                    <div className="md:w-12 flex justify-center">
                      <div className="w-10 h-10 bg-redcross text-white rounded-full flex items-center justify-center shadow-md z-10">1</div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                    <div className="md:w-12 flex justify-center">
                      <div className="w-10 h-10 bg-redcross text-white rounded-full flex items-center justify-center shadow-md z-10">2</div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                        <h3 className="text-xl font-bold mb-2 text-redcross">Orientation & Planning</h3>
                        <p className="text-gray-600">Attend orientation and work with counselors to create your personalized training plan</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                        <h3 className="text-xl font-bold mb-2 text-redcross">Skills Training</h3>
                        <p className="text-gray-600">Complete your chosen program with hands-on training and expert instruction</p>
                      </div>
                    </div>
                    <div className="md:w-12 flex justify-center">
                      <div className="w-10 h-10 bg-redcross text-white rounded-full flex items-center justify-center shadow-md z-10">3</div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                    <div className="md:w-12 flex justify-center">
                      <div className="w-10 h-10 bg-redcross text-white rounded-full flex items-center justify-center shadow-md z-10">4</div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                        <h3 className="text-xl font-bold mb-2 text-redcross">Certification & Placement</h3>
                        <p className="text-gray-600">Receive your certification and work with our job placement team to find employment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-redcross relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-shadow">Ready to Start Your Career Journey?</h2>
              <p className="text-xl text-white/90 mb-8">
                Our job training programs are designed to help you gain the skills employers are looking for. 
                Contact us today to learn about eligibility, schedules, and how to enroll.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="whiteButton" size="lg" className="shadow-lg group">
                  Register for Orientation
                  <Rocket className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="neoGlass" size="lg" className="group">
                  Download Program Guide
                  <Calendar className="h-4 w-4 ml-1 group-hover:translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobTraining;
