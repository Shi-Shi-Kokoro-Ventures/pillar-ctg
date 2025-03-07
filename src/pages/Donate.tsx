
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const { toast } = useToast();
  const [selectedOneTimeAmount, setSelectedOneTimeAmount] = useState<string>("$100");
  const [selectedMonthlyAmount, setSelectedMonthlyAmount] = useState<string>("$25");

  // Function to handle one-time donation amount selection
  const handleOneTimeSelection = (amount: string) => {
    setSelectedOneTimeAmount(amount);
    console.log(`Selected one-time donation amount: ${amount}`);
  };

  // Function to handle monthly donation amount selection
  const handleMonthlySelection = (amount: string) => {
    setSelectedMonthlyAmount(amount);
    console.log(`Selected monthly donation amount: ${amount}`);
  };

  // Function to handle donation submission
  const handleDonateNow = () => {
    toast({
      title: "Thank you for your donation!",
      description: `Your one-time donation of ${selectedOneTimeAmount} is being processed.`,
    });
    console.log(`Processing one-time donation of ${selectedOneTimeAmount}`);
  };

  // Function to handle monthly donation subscription
  const handleMonthlyDonation = () => {
    toast({
      title: "Thank you for becoming a monthly donor!",
      description: `Your monthly donation of ${selectedMonthlyAmount} has been set up.`,
    });
    console.log(`Setting up monthly donation of ${selectedMonthlyAmount}`);
  };

  // Function to handle information requests
  const handleInfoRequest = (type: string) => {
    toast({
      title: "Information Request Received",
      description: `We'll send you more information about our ${type} shortly.`,
    });
    console.log(`${type} information requested`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Difference Today</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Your donation directly supports our mission to provide stable housing and support services
              to individuals and families experiencing homelessness.
            </p>
          </div>
        </section>

        {/* Donation Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ways to Give</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* One-Time Donation */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-4">One-Time Donation</h3>
                <p className="text-gray-600 mb-6">
                  Make an immediate impact with a one-time contribution to support our housing programs.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["$25", "$50", "$100", "$250", "$500", "Other"].map((amount) => (
                    <Button
                      key={amount}
                      variant={amount === selectedOneTimeAmount ? "default" : "outline"}
                      className={amount === selectedOneTimeAmount ? "bg-redcross hover:bg-redcross/90" : ""}
                      onClick={() => handleOneTimeSelection(amount)}
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full bg-redcross hover:bg-redcross/90"
                  onClick={handleDonateNow}
                >
                  Donate Now
                </Button>
              </div>
              
              {/* Monthly Giving */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-4">Monthly Giving</h3>
                <p className="text-gray-600 mb-6">
                  Join our community of monthly donors and provide sustained support for families in need.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["$10", "$25", "$50", "$100", "$200", "Other"].map((amount) => (
                    <Button
                      key={amount}
                      variant={amount === selectedMonthlyAmount ? "default" : "outline"}
                      className={amount === selectedMonthlyAmount ? "bg-redcross hover:bg-redcross/90" : ""}
                      onClick={() => handleMonthlySelection(amount)}
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full bg-redcross hover:bg-redcross/90"
                  onClick={handleMonthlyDonation}
                >
                  Become a Monthly Donor
                </Button>
              </div>
              
              {/* Corporate Giving */}
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-4">Corporate Partnerships</h3>
                <p className="text-gray-600 mb-6">
                  Partner with P.I.L.L.A.R. to demonstrate your company's commitment to solving homelessness.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Matching gift programs",
                    "Sponsorship opportunities",
                    "Volunteer days",
                    "Cause marketing campaigns",
                    "In-kind donations"
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild
                  className="w-full bg-redcross hover:bg-redcross/90"
                >
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Your Donation's Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-redcross text-5xl font-bold mb-2">$50</div>
                <p className="text-gray-700">Provides emergency housing assistance for one night</p>
              </div>
              <div className="text-center">
                <div className="text-redcross text-5xl font-bold mb-2">$250</div>
                <p className="text-gray-700">Supplies a month of financial literacy training for 5 individuals</p>
              </div>
              <div className="text-center">
                <div className="text-redcross text-5xl font-bold mb-2">$1,000</div>
                <p className="text-gray-700">Helps furnish a new affordable housing unit for a family</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Other Ways to Give */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Other Ways to Support Our Mission</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4">Planned Giving</h3>
                <p className="text-gray-600 mb-6">
                  Leave a lasting legacy by including P.I.L.L.A.R. Initiative in your estate planning. 
                  Your planned gift will help ensure that our work continues for generations to come.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => handleInfoRequest("planned giving")}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4">Donor-Advised Funds</h3>
                <p className="text-gray-600 mb-6">
                  Recommend a grant to P.I.L.L.A.R. Initiative through your donor-advised fund (DAF). 
                  It's an easy way to support our housing programs and receive tax benefits.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => handleInfoRequest("donor-advised funds")}
                >
                  Get Details
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
