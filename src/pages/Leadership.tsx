
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Mail, Twitter } from "lucide-react";

const Leadership = () => {
  const leadershipTeam = [
    {
      name: "Dr. Maya Richardson",
      title: "Executive Director & Founder",
      bio: "Dr. Richardson founded the P.I.L.L.A.R. Initiative after 15 years working in urban housing policy. With a Ph.D. in Social Welfare and background in community organizing, she leads our strategic vision and oversees all program development.",
      image: "/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "maya@pillar.org"
      }
    },
    {
      name: "James Wilson",
      title: "Chief Operations Officer",
      bio: "James brings 20 years of nonprofit management experience to P.I.L.L.A.R. Previously the Regional Director at Urban Housing Alliance, he oversees our day-to-day operations, ensuring our programs run efficiently and effectively.",
      image: "/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png",
      socialLinks: {
        linkedin: "#",
        email: "james@pillar.org"
      }
    },
    {
      name: "Sophia Martinez",
      title: "Director of Housing Programs",
      bio: "Sophia has dedicated her career to affordable housing advocacy. With a Master's in Urban Planning and previous experience at the Department of Housing, she leads our housing placement and rental assistance programs.",
      image: "/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "sophia@pillar.org"
      }
    },
    {
      name: "Michael Foster",
      title: "Chief Financial Officer",
      bio: "Michael oversees all financial operations and funding strategies. With an MBA and 15 years in nonprofit finance, he ensures P.I.L.L.A.R.'s fiscal health while maximizing the impact of every donation dollar.",
      image: "/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png",
      socialLinks: {
        linkedin: "#",
        email: "michael@pillar.org"
      }
    },
    {
      name: "Dr. Aisha Johnson",
      title: "Director of Support Services",
      bio: "Dr. Johnson leads our mental health and family support programs. With a background in clinical psychology and previous work at community mental health centers, she ensures holistic support for all program participants.",
      image: "/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "aisha@pillar.org"
      }
    },
    {
      name: "Robert Chen",
      title: "Director of Community Engagement",
      bio: "Robert coordinates our volunteer programs and community partnerships. With extensive experience in grassroots organizing, he builds relationships with local organizations and businesses to expand our impact.",
      image: "/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png",
      socialLinks: {
        linkedin: "#",
        facebook: "#",
        email: "robert@pillar.org"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Leadership Team</h1>
              <p className="text-xl text-gray-600">
                Meet the dedicated professionals guiding P.I.L.L.A.R.'s mission to end homelessness and build stronger communities.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {leadershipTeam.map((leader, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{leader.title}</p>
                    <p className="text-gray-600 mb-5">{leader.bio}</p>
                    <div className="flex space-x-3">
                      {leader.socialLinks.linkedin && (
                        <a href={leader.socialLinks.linkedin} className="text-gray-500 hover:text-blue-600" aria-label={`${leader.name}'s LinkedIn`}>
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {leader.socialLinks.twitter && (
                        <a href={leader.socialLinks.twitter} className="text-gray-500 hover:text-blue-500" aria-label={`${leader.name}'s Twitter`}>
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {leader.socialLinks.facebook && (
                        <a href={leader.socialLinks.facebook} className="text-gray-500 hover:text-blue-700" aria-label={`${leader.name}'s Facebook`}>
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {leader.socialLinks.email && (
                        <a href={`mailto:${leader.socialLinks.email}`} className="text-gray-500 hover:text-red-500" aria-label={`Email ${leader.name}`}>
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Directors Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Board of Directors</h2>
              <p className="text-lg text-gray-600">
                Our dedicated board members provide governance, strategic guidance, and oversight to ensure P.I.L.L.A.R. fulfills its mission effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Eleanor Washington", title: "Board Chair", org: "CEO, Urban Development Partners" },
                { name: "David Hernandez", title: "Vice Chair", org: "Professor of Social Policy, State University" },
                { name: "Sarah Kim", title: "Treasurer", org: "Principal, Kim Financial Advisors" },
                { name: "Marcus Johnson", title: "Secretary", org: "Attorney, Johnson & Associates" },
                { name: "Priya Patel", title: "Board Member", org: "Director of Community Relations, City Hospital" },
                { name: "Thomas Reynolds", title: "Board Member", org: "Former Housing Commissioner" }
              ].map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Interested in making a difference? P.I.L.L.A.R. is always looking for passionate individuals to join our mission.
            </p>
            <Link to="/careers" className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors">
              View Current Openings
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leadership;
