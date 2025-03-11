
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, ArrowRight, GraduationCap, Handshake, LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const OurMission = () => {
  const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: visionRef, inView: visionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: valuesRef, inView: valuesInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 z-0"></div>
          <div className="absolute inset-0 bg-[url('/lovable-uploads/7cdd71bb-0dc9-483e-b14d-679c78fd4ee8.png')] bg-cover bg-center opacity-5 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">Our Mission</h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                P.I.L.L.A.R is dedicated to ending homelessness and building stable communities by providing housing, support services, and advocacy for vulnerable populations.
              </p>
              <Link to="/donate">
                <Button size="lg" className="shadow-lg hover:shadow-xl group transition-all duration-300 hover:-translate-y-1">
                  Support Our Mission
                  <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div 
                  ref={missionRef}
                  className={cn(
                    "transition-all duration-1000 ease-out",
                    missionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mr-4">
                      <Heart className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    To empower individuals and families experiencing homelessness or housing instability by providing comprehensive support services, quality affordable housing, and opportunities for self-sufficiency.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We work tirelessly to address the root causes of homelessness through direct services, community partnerships, and advocacy for systemic change.
                  </p>
                </div>
                
                <div 
                  ref={visionRef}
                  className={cn(
                    "transition-all duration-1000 ease-out delay-300",
                    visionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mr-4">
                      <Target className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    A community where everyone has access to safe, stable, and affordable housing, along with the support services needed to maintain housing and thrive.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We envision a future where homelessness is rare, brief, and nonrecurring, and where all community members have the opportunity to reach their full potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={valuesRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className={cn(
                "text-center mb-16 transition-all duration-700 ease-out",
                valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-bold">Our Core Values</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Dignity",
                    icon: <Heart className="h-6 w-6" />,
                    description: "We recognize the inherent worth and dignity of every person, treating all with respect and compassion regardless of their circumstances.",
                    delay: 0
                  },
                  {
                    title: "Empowerment",
                    icon: <GraduationCap className="h-6 w-6" />,
                    description: "We believe in supporting individuals to develop their strengths and make their own choices to achieve greater self-sufficiency.",
                    delay: 100
                  },
                  {
                    title: "Collaboration",
                    icon: <Handshake className="h-6 w-6" />,
                    description: "We work together with clients, community partners, and stakeholders to create comprehensive solutions to complex problems.",
                    delay: 200
                  },
                  {
                    title: "Innovation",
                    icon: <LightbulbIcon className="h-6 w-6" />,
                    description: "We embrace creative thinking and evidence-based approaches to develop effective solutions to the challenges of homelessness.",
                    delay: 300
                  },
                  {
                    title: "Accountability",
                    icon: <Target className="h-6 w-6" />,
                    description: "We hold ourselves to high standards, using resources efficiently and effectively to achieve meaningful outcomes.",
                    delay: 400
                  },
                  {
                    title: "Equity",
                    icon: <Users className="h-6 w-6" />,
                    description: "We are committed to addressing disparities and ensuring equal access to housing and services for all community members.",
                    delay: 500
                  }
                ].map((value, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1",
                      "transition-all duration-700 ease-out",
                      valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                    style={{ transitionDelay: `${value.delay}ms` }}
                  >
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full inline-flex mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Goal */}
        <section className="py-20 bg-white" ref={statsRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold mb-16 text-center">Our Impact Goals</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                  { 
                    number: "1,250+", 
                    text: "Individuals housed annually",
                    delay: 0
                  },
                  { 
                    number: "85%", 
                    text: "Remain stably housed after 1 year",
                    delay: 200
                  },
                  { 
                    number: "3,000+", 
                    text: "Received support services",
                    delay: 400
                  }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg shadow-md",
                      "transition-all duration-1000 ease-out",
                      statsInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    )}
                    style={{ transitionDelay: `${stat.delay}ms` }}
                  >
                    <div className="text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <p className="text-xl text-gray-700">{stat.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section 
          ref={ctaRef}
          className={cn(
            "py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-opacity duration-1000",
            ctaInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              There are many ways to support our work and help create a community where everyone has a place to call home.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <Button size="lg" variant="whiteButton" className="shadow-lg hover:scale-105 transition-transform duration-300">
                  Donate
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white bg-blue-600/40 hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 focus:ring-2 focus:ring-white shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
                >
                  Volunteer
                </Button>
              </Link>
              <Link to="/advocate">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white bg-blue-600/40 hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 focus:ring-2 focus:ring-white shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
                >
                  Advocate
                </Button>
              </Link>
              <Link to="/corporate-partnerships">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white bg-blue-600/40 hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 focus:ring-2 focus:ring-white shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
                >
                  Partner With Us
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

export default OurMission;
