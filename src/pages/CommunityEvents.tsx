
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityEvents = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Housing Resource Fair",
      date: "June 15, 2023",
      time: "10:00 AM - 3:00 PM",
      location: "Community Center, 123 Main St",
      description: "Connect with housing providers, learn about rental assistance programs, and get help with housing applications."
    },
    {
      id: 2,
      title: "Financial Literacy Workshop",
      date: "June 22, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Public Library, 456 Oak Ave",
      description: "Learn about budgeting, saving, and credit management to improve your financial health."
    },
    {
      id: 3,
      title: "Community Cleanup Day",
      date: "July 8, 2023",
      time: "9:00 AM - 1:00 PM",
      location: "Riverside Park",
      description: "Join your neighbors to clean up and beautify our community spaces. Supplies and refreshments provided."
    },
    {
      id: 4,
      title: "Job Fair & Resume Workshop",
      date: "July 15, 2023",
      time: "11:00 AM - 4:00 PM",
      location: "Workforce Development Center, 789 Pine St",
      description: "Meet with local employers, get resume help, and interview on the spot for open positions."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Community Events</h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect, learn, and grow through P.I.L.L.A.R.'s community events and workshops.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Register for an Event
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">Upcoming Events</h2>
              
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-4 space-y-2 md:space-y-0 md:space-x-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <Link to="#">
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        Register
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link to="/all-news">
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    View All Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Host an Event */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Host a Community Event</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Partner with P.I.L.L.A.R. to host events that make a difference in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-us">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Become an Event Partner
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Volunteer at Events
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

export default CommunityEvents;
