
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Calendar, MapPin, Check, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TimeBank = () => {
  const volunteerOpportunities = [
    {
      title: "Home Renovation Project",
      description: "Help renovate a transitional housing unit for a family exiting homelessness.",
      duration: "4-8 hours",
      date: "Every Saturday",
      location: "Various locations in Portland",
      skills: ["Basic carpentry", "Painting", "Cleaning"]
    },
    {
      title: "Financial Literacy Assistant",
      description: "Support our financial education instructors and help participants with budgeting exercises.",
      duration: "2 hours/week",
      date: "Tuesday evenings",
      location: "P.I.L.L.A.R. Community Center",
      skills: ["Basic math", "Patience", "Communication"]
    },
    {
      title: "Housing Navigator",
      description: "Help individuals search for affordable housing units, complete applications, and prepare for interviews.",
      duration: "3-5 hours/week",
      date: "Flexible",
      location: "P.I.L.L.A.R. Headquarters",
      skills: ["Research", "Organization", "Empathy"]
    },
    {
      title: "Administrative Support",
      description: "Assist with office tasks, data entry, and organizing client files.",
      duration: "2-4 hours/week",
      date: "Weekdays",
      location: "P.I.L.L.A.R. Headquarters",
      skills: ["Computer literacy", "Attention to detail", "Organization"]
    },
    {
      title: "Moving Day Helper",
      description: "Help families move into their new homes by transporting and assembling furniture.",
      duration: "4-6 hours",
      date: "As needed",
      location: "Various locations in Portland",
      skills: ["Physical strength", "Teamwork", "Reliability"]
    },
    {
      title: "Childcare Provider",
      description: "Care for children while parents attend financial literacy or job training classes.",
      duration: "2-3 hours",
      date: "Various evenings",
      location: "P.I.L.L.A.R. Community Center",
      skills: ["Experience with children", "Patience", "Creativity"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Donate Your Time</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Your time is valuable. When you volunteer with the P.I.L.L.A.R. Initiative, you're directly helping families achieve housing stability and independence.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sign Up to Volunteer
            </Button>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current Volunteer Opportunities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {volunteerOpportunities.map((opportunity, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{opportunity.title}</h3>
                    <p className="text-gray-600 mb-4">{opportunity.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{opportunity.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{opportunity.location}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Skills Needed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits of Volunteering */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Volunteering</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Build Community</h3>
                <p className="text-gray-600">
                  Connect with like-minded individuals who share your passion for ending homelessness and making a difference.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Learn New Skills</h3>
                <p className="text-gray-600">
                  Gain valuable experience and develop new skills that can enhance your personal and professional life.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Make a Real Impact</h3>
                <p className="text-gray-600">
                  See the direct results of your efforts as families move into stable housing and build foundations for the future.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Volunteer Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Volunteer Stories</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Volunteer Story" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-3">Meet Sarah</h3>
                  <p className="text-gray-600 mb-4">
                    "I started volunteering as a financial literacy assistant because I wanted to use my accounting background to help others. After six months, I've helped over 20 families create their first-ever budget and start saving plans. Seeing their confidence grow as they gain control of their finances is incredibly rewarding."
                  </p>
                  <p className="text-gray-600 mb-4">
                    "One family I worked with recently moved into their own apartment after living in transitional housing. They credited the financial management skills they learned in our workshops as a key factor in their success."
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Read more volunteer stories
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How to Get Started */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">How to Get Started</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Complete an Application</h3>
                  <p className="text-gray-600">
                    Fill out our online volunteer application form with your contact information, skills, interests, and availability.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Attend Orientation</h3>
                  <p className="text-gray-600">
                    Join a virtual or in-person orientation session to learn about our mission, programs, and volunteer policies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Background Check</h3>
                  <p className="text-gray-600">
                    Complete a background check, which is required for all volunteers who work directly with our clients or in our facilities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Training</h3>
                  <p className="text-gray-600">
                    Receive position-specific training to prepare you for your volunteer role and responsibilities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Start Making a Difference</h3>
                  <p className="text-gray-600">
                    Begin your volunteer journey with P.I.L.L.A.R. and help create pathways to housing stability for those in need.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Apply to Volunteer Today
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
