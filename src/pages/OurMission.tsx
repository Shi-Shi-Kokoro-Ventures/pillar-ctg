import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const OurMission = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-gray-600 mb-8">
                P.I.L.L.A.R is dedicated to ending homelessness and building stable communities by providing housing, support services, and advocacy for vulnerable populations.
              </p>
              <Link to="/donate">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    <Heart className="h-8 w-8 text-blue-600 mr-3" />
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    To empower individuals and families experiencing homelessness or housing instability by providing comprehensive support services, quality affordable housing, and opportunities for self-sufficiency.
                  </p>
                  <p className="text-lg text-gray-600">
                    We work tirelessly to address the root causes of homelessness through direct services, community partnerships, and advocacy for systemic change.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 text-blue-600 mr-3" />
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    A community where everyone has access to safe, stable, and affordable housing, along with the support services needed to maintain housing and thrive.
                  </p>
                  <p className="text-lg text-gray-600">
                    We envision a future where homelessness is rare, brief, and nonrecurring, and where all community members have the opportunity to reach their full potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold">Our Core Values</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-3">Dignity</h3>
                  <p className="text-gray-600">
                    We recognize the inherent worth and dignity of every person, treating all with respect and compassion regardless of their circumstances.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-3">Empowerment</h3>
                  <p className="text-gray-600">
                    We believe in supporting individuals to develop their strengths and make their own choices to achieve greater self-sufficiency.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-3">Collaboration</h3>
                  <p className="text-gray-600">
                    We work together with clients, community partners, and stakeholders to create comprehensive solutions to complex problems.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    We embrace creative thinking and evidence-based approaches to develop effective solutions to the challenges of homelessness.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-3">Accountability</h3>
                  <p className="text-gray-600">
                    We hold ourselves to high standards, using resources efficiently and effectively to achieve meaningful outcomes.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-3">Equity</h3>
                  <p className="text-gray-600">
                    We are committed to addressing disparities and ensuring equal access to housing and services for all community members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Goal - renamed from Our Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Goal</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">1,250+</div>
                  <p className="text-xl text-gray-700">Individuals housed annually</p>
                </div>
                
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                  <p className="text-xl text-gray-700">Remain stably housed after 1 year</p>
                </div>
                
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">3,000+</div>
                  <p className="text-xl text-gray-700">Received support services</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              There are many ways to support our work and help create a community where everyone has a place to call home.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Donate
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Volunteer
                </Button>
              </Link>
              <Link to="/advocate">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Advocate
                </Button>
              </Link>
              <Link to="/corporate-partnerships">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
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
