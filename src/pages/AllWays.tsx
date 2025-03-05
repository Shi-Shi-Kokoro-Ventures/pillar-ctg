import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Home, Clock, DollarSign, GraduationCap, Users, Briefcase, Share2, Gift, Wrench, MessageSquare, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HelpOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkTo: string;
  bgColor: string;
}

const HelpOption: React.FC<HelpOptionProps> = ({ title, description, icon, linkText, linkTo, bgColor }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-blue-300 hover:translate-y-[-5px]">
      <div className={`${bgColor} p-6 text-white flex items-center`}>
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        <Link 
          to={linkTo} 
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          {linkText}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const AllWays = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">All Ways to Help</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              There are many ways you can support our mission to provide stable housing and transform lives. Every contribution creates lasting change.
            </p>
          </div>
        </section>

        {/* Financial Support Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Financial Support</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HelpOption 
                title="Make a Donation" 
                description="Your financial gift enables the P.I.L.L.A.R. Initiative to develop affordable housing and provide essential support services."
                icon={<DollarSign className="w-7 h-7" />}
                linkText="Donate Now"
                linkTo="/donate"
                bgColor="bg-blue-600"
              />
              
              <HelpOption 
                title="Monthly Giving" 
                description="Become a sustaining member with a monthly donation that provides consistent support for our housing programs."
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
                </svg>}
                linkText="Become a Monthly Donor"
                linkTo="/donate"
                bgColor="bg-blue-700"
              />
              
              <HelpOption 
                title="Corporate Partnerships" 
                description="Partner with P.I.L.L.A.R. to demonstrate your company's commitment to solving homelessness in our community."
                icon={<Briefcase className="w-7 h-7" />}
                linkText="Explore Partnerships"
                linkTo="/donate"
                bgColor="bg-blue-800"
              />
            </div>
          </div>
        </section>
        
        {/* Donation of Goods and Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Donate Goods & Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HelpOption 
                title="Donate Furniture" 
                description="Contribute furniture, appliances, and household items to help furnish homes for families transitioning from homelessness."
                icon={<Home className="w-7 h-7" />}
                linkText="Learn What We Need"
                linkTo="/donate-goods"
                bgColor="bg-blue-700"
              />
              
              <HelpOption 
                title="Gift Cards" 
                description="Donate gift cards for groceries, transportation, or home improvement stores to support families in our programs."
                icon={<Gift className="w-7 h-7" />}
                linkText="Donate Gift Cards"
                linkTo="/donate-goods"
                bgColor="bg-blue-600"
              />
              
              <HelpOption 
                title="Professional Services" 
                description="Offer your professional expertise in areas like legal services, accounting, IT support, or construction."
                icon={<Wrench className="w-7 h-7" />}
                linkText="Offer Services"
                linkTo="/donate-goods"
                bgColor="bg-blue-800"
              />
            </div>
          </div>
        </section>
        
        {/* Volunteer Opportunities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Volunteer Your Time</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HelpOption 
                title="Volunteer" 
                description="Join our network of dedicated volunteers who help with housing renovation, mentorship programs, and skills workshops."
                icon={<Heart className="w-7 h-7" />}
                linkText="Find Opportunities"
                linkTo="/volunteer"
                bgColor="bg-blue-600"
              />
              
              <HelpOption 
                title="Donate Time" 
                description="Even a few hours of your time can make a significant impact in helping families secure stable housing."
                icon={<Clock className="w-7 h-7" />}
                linkText="Time Bank"
                linkTo="/time"
                bgColor="bg-blue-700"
              />
              
              <HelpOption 
                title="Group Projects" 
                description="Organize a team from your workplace, faith community, or social group for a service project with P.I.L.L.A.R."
                icon={<Users className="w-7 h-7" />}
                linkText="Plan a Group Project"
                linkTo="/volunteer"
                bgColor="bg-blue-800"
              />
            </div>
          </div>
        </section>
        
        {/* Education and Advocacy */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Education & Advocacy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HelpOption 
                title="Take a Class" 
                description="Get certified to teach financial literacy, housing navigation, or job-readiness workshops in your community."
                icon={<GraduationCap className="w-7 h-7" />}
                linkText="View Classes"
                linkTo="/classes"
                bgColor="bg-blue-600"
              />
              
              <HelpOption 
                title="Become an Advocate" 
                description="Help raise awareness about affordable housing issues and lobby for policy changes in your community."
                icon={<MessageSquare className="w-7 h-7" />}
                linkText="Advocacy Resources"
                linkTo="/advocate"
                bgColor="bg-blue-700"
              />
              
              <HelpOption 
                title="Spread the Word" 
                description="Share P.I.L.L.A.R.'s mission and impact on social media to help us reach more people in need of housing support."
                icon={<Share2 className="w-7 h-7" />}
                linkText="Get Social Media Kit"
                linkTo="/advocate"
                bgColor="bg-blue-800"
              />
            </div>
          </div>
        </section>
        
        {/* Legacy Giving */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Legacy Giving</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <HelpOption 
                title="Planned Giving" 
                description="Include P.I.L.L.A.R. in your estate planning to leave a lasting legacy that supports housing security for generations to come."
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>}
                linkText="Learn About Planned Giving"
                linkTo="/donate"
                bgColor="bg-blue-600"
              />
              
              <HelpOption 
                title="Donor-Advised Funds" 
                description="Recommend a grant to P.I.L.L.A.R. Initiative through your donor-advised fund to support our housing programs."
                icon={<Handshake className="w-7 h-7" />}
                linkText="DAF Information"
                linkTo="/donate"
                bgColor="bg-blue-700"
              />
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Not Sure Where to Start?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us to discuss how your unique skills, resources, or interests can best support our mission to end homelessness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Us
              </Button>
              <Button variant="outline">
                See Our Impact
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllWays;
