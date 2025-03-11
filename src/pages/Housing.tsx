import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Users, Calendar, ArrowRight, CheckCircle, MapPin, BookOpen, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Housing = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/coming-soon');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-100 via-blue-50 to-white py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(109.6deg,rgba(223,234,247,1)_11.2%,rgba(244,248,252,1)_91.1%)] opacity-70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Transitional Housing Programs</h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Building bridges from homelessness to permanent housing through supportive, 
                temporary housing solutions that restore dignity and independence.
              </p>
              <Link to="/apply-for-assistance">
                <Button className="bg-redcross hover:bg-redcross/90 text-white px-8 py-6 rounded-full text-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                  Apply for Housing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Transitional Housing Approach</h2>
                <div className="w-24 h-1 bg-redcross/60 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 mx-auto max-w-3xl">
                  The P.I.L.L.A.R. Initiative's transitional housing programs provide temporary 
                  accommodations paired with comprehensive support services to help individuals 
                  and families move from crisis to stability and permanent housing.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Safe Environment</h3>
                  <p className="text-gray-600 text-center">
                    Clean, secure housing with private and shared spaces that respect dignity and restore stability.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Support Services</h3>
                  <p className="text-gray-600 text-center">
                    Individualized case management, life skills training, and employment assistance.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                  <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Time-Limited</h3>
                  <p className="text-gray-600 text-center">
                    Structured programs lasting 6-24 months focused on achieving housing independence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Housing Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Housing Programs</h2>
              <div className="w-24 h-1 bg-redcross/60 mx-auto mb-6"></div>
            </div>
            
            <div className="max-w-5xl mx-auto">
              {[
                {
                  title: "Family Transition Program",
                  description: "Two-year program for families with children, offering multi-bedroom units and family-centered support services.",
                  capacity: "24 family units",
                  icon: Users,
                  color: "bg-blue-100",
                  iconColor: "text-blue-600",
                  services: ["Parenting support", "Children's programming", "Educational assistance", "Family counseling"]
                },
                {
                  title: "Veterans Housing Initiative",
                  description: "Specialized program for veterans experiencing homelessness, with veteran-specific support services and peer mentoring.",
                  capacity: "40 individual units",
                  icon: Star,
                  color: "bg-red-100",
                  iconColor: "text-red-600",
                  services: ["VA benefits navigation", "PTSD support", "Employment training", "Healthcare coordination"]
                },
                {
                  title: "Youth Bridge Housing",
                  description: "Supportive housing for young adults ages 18-24 who are experiencing homelessness or aging out of foster care.",
                  capacity: "30 individual units",
                  icon: BookOpen,
                  color: "bg-green-100",
                  iconColor: "text-green-600",
                  services: ["Education completion", "Job readiness", "Life skills", "Mental health services"]
                }
              ].map((program, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 mb-10 flex flex-col md:flex-row hover:shadow-lg transition-all">
                  <div className="md:w-2/3 pr-0 md:pr-8 mb-6 md:mb-0">
                    <div className="flex items-center mb-5">
                      <div className={`${program.color} p-3 rounded-full mr-4`}>
                        {React.createElement(program.icon, { className: `h-6 w-6 ${program.iconColor}` })}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{program.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-5 leading-relaxed">{program.description}</p>
                    <p className="text-sm text-blue-600 font-medium mb-5 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Capacity: {program.capacity}
                    </p>
                    <ul className="space-y-3">
                      {program.services.map((service, sIndex) => (
                        <li key={sIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/3 bg-gray-50 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold mb-4 text-gray-800">Program Requirements:</h4>
                      <ul className="space-y-2 mb-6 text-gray-600">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                          Income verification
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                          Background check
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                          Participation in case management
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                          Commitment to program goals
                        </li>
                      </ul>
                    </div>
                    <Link to="/housing-waitlist">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Success Stories</h2>
              <div className="w-24 h-1 bg-redcross/60 mx-auto mb-12"></div>
              
              <div className="bg-blue-50 p-10 rounded-xl shadow-sm mb-10 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-md">
                  <Star className="h-6 w-6 text-amber-500" />
                </div>
                <blockquote className="text-xl italic text-gray-700 mb-8 leading-relaxed">
                  "When I first connected with P.I.L.L.A.R. Initiative CTG, I was facing eviction and had no idea where to turn. Even though they were just starting out, they worked quickly to help me find safe, temporary housing. Their team also helped me enroll in a job training course and introduced me to a financial literacy workshop. It's only been a few weeks, but I already feel like I have a clearer path forward. I'm grateful for the support and compassion they've shown me during a really uncertain time."
                </blockquote>
                <div>
                  <p className="font-bold text-gray-800">Alex G.</p>
                  <p className="text-sm text-gray-500">Program Participant, 2025</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2"
                onClick={handleReadMoreClick}
              >
                Read More Success Stories
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Take the Next Step?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Our transitional housing programs help individuals and families move from crisis to stability. 
              Contact us today to learn more about eligibility and availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/housing-waitlist">
                <Button className="bg-white text-blue-700 hover:bg-gray-100 shadow-lg px-8 py-3 text-lg">
                  Apply for Housing
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

export default Housing;
