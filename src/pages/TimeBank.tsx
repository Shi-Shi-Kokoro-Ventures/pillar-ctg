
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Calendar, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const TimeBank = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Donate Your Time</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Your time can make a significant difference in helping families secure stable housing.
              Join our time bank and contribute your skills and time to assist those in need.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
              Join Our Time Bank
            </Button>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How Our Time Bank Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">1. Record Your Hours</h3>
                <p className="text-gray-600">
                  Sign up for our time bank and log the hours you're willing to contribute. 
                  You can specify your skills and availability.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">2. Get Matched</h3>
                <p className="text-gray-600">
                  We'll match you with opportunities that align with your skills and availability, 
                  helping families in housing transition.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">3. Make An Impact</h3>
                <p className="text-gray-600">
                  Your donated time directly helps families secure and maintain housing stability,
                  creating lasting change in their lives.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Opportunities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Time Donation Opportunities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-blue-600 mr-2" />
                  Administrative Support
                </h3>
                <p className="text-gray-600 mb-6">
                  Help with office tasks, data entry, phone calls, and correspondence. These roles 
                  help keep our housing programs running smoothly.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>2-4 hours per week commitment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Can be done remotely</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Basic computer skills required</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                  Event Planning & Coordination
                </h3>
                <p className="text-gray-600 mb-6">
                  Help organize fundraising events, housing workshops, and community gatherings that
                  raise awareness and support for housing initiatives.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Project-based commitment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Great for those with organizational skills</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Evening and weekend availability helpful</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  Move-In Support
                </h3>
                <p className="text-gray-600 mb-6">
                  Assist families moving into new housing by helping with furniture assembly,
                  organizing belongings, and setting up essential home systems.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>One-time opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Physical activity required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Weekends and evenings available</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-blue-600 mr-2" />
                  Professional Services
                </h3>
                <p className="text-gray-600 mb-6">
                  Donate professional services such as legal advice, financial counseling,
                  mental health support, or technical expertise.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Flexible scheduling available</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Professional credentials required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                    <span>Remote options available</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Time Donors Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">David Williams</h4>
                    <p className="text-gray-600 text-sm">Administrative Support Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I donate 3 hours each week to help with database management and correspondence. It's amazing 
                  to see how this small commitment of time helps the organization house more families efficiently."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Lisa Rodriguez</h4>
                    <p className="text-gray-600 text-sm">Move-In Support Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "There's nothing like the feeling of helping a family set up their new home. The look on their 
                  faces when they see everything ready for them is worth every minute I donate."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Donate Your Time?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Every hour you contribute helps a family move closer to stable, sustainable housing.
              Join our time bank today and be part of the solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                Join Our Time Bank
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimeBank;
