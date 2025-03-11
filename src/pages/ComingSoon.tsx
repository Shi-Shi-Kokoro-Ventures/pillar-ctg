
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket, Clock, CalendarClock, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ZipCodeSearch from "@/components/ZipCodeSearch";

// We can pass a title and description as props to make this component reusable
interface ComingSoonProps {
  title?: string;
  description?: string;
  showSearch?: boolean;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "We're working hard to bring you more resources. Please check back later!",
  showSearch = false,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearch = (zipCode: string) => {
    console.log("Searching for resources in zip code:", zipCode);
    // When the feature is built, this will be replaced with actual functionality
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Top Section with Button */}
          <div className="mb-8 text-left">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="rounded-md hover:bg-blue-50 transition-all duration-300 button-hover-glow"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Main Content */}
          <div className="glass bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-8 md:p-12 text-center animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-redcross flex items-center justify-center shadow-lg animate-slow-pulse">
                <Rocket className="h-12 w-12 text-white" />
              </div>
              <div className="pt-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-shadow">{title}</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  {description}
                </p>
              </div>
            </div>

            {/* Features Coming Soon Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover-scale">
                <Clock className="h-10 w-10 text-redcross mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Under Development</h3>
                <p className="text-gray-600 text-sm">Our team is working diligently to bring you this feature.</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover-scale">
                <CalendarClock className="h-10 w-10 text-redcross mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Launch Date</h3>
                <p className="text-gray-600 text-sm">We're aiming to release this feature in the near future.</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover-scale">
                <Bell className="h-10 w-10 text-redcross mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Get Notified</h3>
                <p className="text-gray-600 text-sm">Want to know when we launch? Sign up for notifications.</p>
              </div>
            </div>

            {/* Conditional ZipCode Search Section */}
            {showSearch && (
              <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Find Available Resources</h3>
                <p className="mb-4 text-gray-600">While this feature is in development, you can still search for other available resources in your area.</p>
                <ZipCodeSearch onSearch={handleSearch} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
