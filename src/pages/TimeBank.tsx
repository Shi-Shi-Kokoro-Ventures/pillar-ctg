
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Calendar, Users, Trophy, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const TimeBank = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Improved Gradient Background */}
        <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-white py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900 animate-fade-in">
                Donate Your <span className="text-redcross">Time</span>
              </h1>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed animate-slide-in">
                Your time can make a significant difference in helping families secure stable housing.
                Join our time bank and contribute your skills to assist those in need.
              </p>
              <Button className="bg-redcross hover:bg-redcross-dark px-8 py-7 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-in">
                Join Our Time Bank
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works - With Animation and Better Spacing */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How Our Time Bank Works</h2>
              <div className="w-20 h-1 bg-redcross mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A simple process that creates meaningful impact in our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {[
                {
                  icon: <Clock className="h-8 w-8 text-white" />,
                  title: "Record Your Hours",
                  description: "Sign up for our time bank and log the hours you're willing to contribute. You can specify your skills and availability."
                },
                {
                  icon: <Users className="h-8 w-8 text-white" />,
                  title: "Get Matched",
                  description: "We'll match you with opportunities that align with your skills and availability, helping families in housing transition."
                },
                {
                  icon: <Trophy className="h-8 w-8 text-white" />,
                  title: "Make An Impact",
                  description: "Your donated time directly helps families secure and maintain housing stability, creating lasting change in their lives."
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={cn(
                    "rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl",
                    "group animate-fade-in"
                  )}
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <div className="bg-gradient-to-r from-redcross to-redcross-dark p-6 text-white">
                    <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{index + 1}. {item.title}</h3>
                  </div>
                  <div className="bg-white p-6">
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Opportunities - With Better Cards and Visual Hierarchy */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="bg-blue-100 text-redcross px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                Available Positions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Time Donation Opportunities</h2>
              <div className="w-20 h-1 bg-redcross mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find the perfect way to share your valuable time and skills
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Clock className="h-6 w-6 text-redcross mr-2" />,
                  title: "Administrative Support",
                  description: "Help with office tasks, data entry, phone calls, and correspondence. These roles help keep our housing programs running smoothly.",
                  items: [
                    "2-4 hours per week commitment",
                    "Can be done remotely",
                    "Basic computer skills required"
                  ]
                },
                {
                  icon: <Calendar className="h-6 w-6 text-redcross mr-2" />,
                  title: "Event Planning & Coordination",
                  description: "Help organize fundraising events, housing workshops, and community gatherings that raise awareness and support for housing initiatives.",
                  items: [
                    "Project-based commitment",
                    "Great for those with organizational skills",
                    "Evening and weekend availability helpful"
                  ]
                },
                {
                  icon: <Users className="h-6 w-6 text-redcross mr-2" />,
                  title: "Move-In Support",
                  description: "Assist families moving into new housing by helping with furniture assembly, organizing belongings, and setting up essential home systems.",
                  items: [
                    "One-time opportunities",
                    "Physical activity required",
                    "Weekends and evenings available"
                  ]
                },
                {
                  icon: <Star className="h-6 w-6 text-redcross mr-2" />,
                  title: "Professional Services",
                  description: "Donate professional services such as legal advice, financial counseling, mental health support, or technical expertise.",
                  items: [
                    "Flexible scheduling available",
                    "Professional credentials required",
                    "Remote options available"
                  ]
                }
              ].map((card, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:border-redcross/20 animate-fade-in"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-900">
                      {card.icon}
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {card.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {card.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials - With Better Visual Design */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What Time Donors Say</h2>
              <div className="w-20 h-1 bg-redcross mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {[
                {
                  name: "David Williams",
                  role: "Administrative Support Volunteer",
                  quote: "I donate 3 hours each week to help with database management and correspondence. It's amazing to see how this small commitment of time helps the organization house more families efficiently."
                },
                {
                  name: "Lisa Rodriguez",
                  role: "Move-In Support Volunteer",
                  quote: "There's nothing like the feeling of helping a family set up their new home. The look on their faces when they see everything ready for them is worth every minute I donate."
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-blue-50 p-8 rounded-xl shadow-md animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-redcross to-redcross-dark w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-blue-900">{testimonial.name}</h4>
                      <p className="text-redcross text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section - More Engaging */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-redcross text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Donate Your Time?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Every hour you contribute helps a family move closer to stable, sustainable housing.
              Join our time bank today and be part of the solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-redcross hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                Join Our Time Bank
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
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
