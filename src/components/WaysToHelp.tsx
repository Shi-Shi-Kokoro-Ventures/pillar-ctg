
import React from "react";
import { Heart, Droplet, Clock, DollarSign, GraduationCap, Users } from "lucide-react";

interface HelpCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  link: string;
}

const HelpCard: React.FC<HelpCardProps> = ({ title, description, icon, bgColor, link }) => {
  return (
    <div className="group rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-redcross/20 bg-white hover:translate-y-[-5px]">
      <div className={`${bgColor} p-4 text-white flex justify-center`}>
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-redcross transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href={link} 
          className="inline-flex items-center text-redcross font-medium hover:text-redcross-dark transition-colors"
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const WaysToHelp = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-red-100 text-redcross px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Make A Difference
          </span>
          <h2 className="text-3xl font-bold mb-4">Ways You Can Help</h2>
          <p className="text-gray-600 text-lg">
            There are many ways you can make a difference in your community and beyond. Every action, big or small, matters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <HelpCard 
            title="Donate Funds" 
            description="Your financial gift enables the Red Cross to prepare for, respond to, and help people recover from disasters." 
            icon={<DollarSign className="w-7 h-7" />}
            bgColor="bg-redcross"
            link="#donate"
          />
          
          <HelpCard 
            title="Give Blood" 
            description="Blood donations are essential for surgeries, cancer treatment, chronic illnesses, and traumatic injuries."
            icon={<Droplet className="w-7 h-7" />}
            bgColor="bg-red-600"
            link="#blood"
          />
          
          <HelpCard 
            title="Volunteer" 
            description="Join the millions of people who help their communities through the American Red Cross."
            icon={<Heart className="w-7 h-7" />}
            bgColor="bg-red-500"
            link="#volunteer"
          />
          
          <HelpCard 
            title="Take a Class" 
            description="Get certified in CPR, First Aid, BLS, water safety, babysitting, and other life-saving skills."
            icon={<GraduationCap className="w-7 h-7" />}
            bgColor="bg-red-700"
            link="#classes"
          />
          
          <HelpCard 
            title="Donate Time" 
            description="Even a few hours of your time can make a significant impact on your community."
            icon={<Clock className="w-7 h-7" />}
            bgColor="bg-red-800"
            link="#time"
          />
          
          <HelpCard 
            title="Host a Drive" 
            description="Organize a blood drive in your community, workplace, or school and help save lives."
            icon={<Users className="w-7 h-7" />}
            bgColor="bg-red-900"
            link="#host"
          />
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#all-ways" 
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 hover:border-redcross transition-colors"
          >
            View All Ways to Help
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WaysToHelp;
