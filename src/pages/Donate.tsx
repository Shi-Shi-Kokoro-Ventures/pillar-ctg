import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Donate = () => {
  const { toast } = useToast();
  const [selectedOneTimeAmount, setSelectedOneTimeAmount] = useState<string>("$100");
  const [selectedMonthlyAmount, setSelectedMonthlyAmount] = useState<string>("$25");
  const [loading, setLoading] = useState<string | null>(null);

  const handleOneTimeSelection = (amount: string) => {
    setSelectedOneTimeAmount(amount);
    console.log(`Selected one-time donation amount: ${amount}`);
  };

  const handleMonthlySelection = (amount: string) => {
    setSelectedMonthlyAmount(amount);
    console.log(`Selected monthly donation amount: ${amount}`);
  };

  const handleCustomAmount = (event: React.ChangeEvent<HTMLInputElement>, type: "oneTime" | "monthly") => {
    const value = event.target.value;
    if (value === "" || /^\$?\d*$/.test(value)) {
      const formattedValue = value.startsWith("$") ? value : `$${value}`;
      if (type === "oneTime") {
        setSelectedOneTimeAmount(formattedValue);
      } else {
        setSelectedMonthlyAmount(formattedValue);
      }
    }
  };

  const createCheckoutSession = async (amount: string, donationType: "one-time" | "monthly") => {
    try {
      setLoading(donationType);
      
      if (amount === "$" || amount === "$0" || amount === "") {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid donation amount",
          variant: "destructive",
        });
        setLoading(null);
        return;
      }
      
      let processedAmount = amount;
      if (processedAmount === "Other") {
        processedAmount = donationType === "one-time" ? "$100" : "$25";
      }
      
      const origin = window.location.origin;
      const successUrl = `${origin}/donate?status=success&type=${donationType}&amount=${encodeURIComponent(processedAmount)}`;
      const cancelUrl = `${origin}/donate?status=canceled`;
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: processedAmount,
          donationType: donationType,
          successUrl,
          cancelUrl,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Payment Error",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  const handleDonateNow = async () => {
    await createCheckoutSession(selectedOneTimeAmount, "one-time");
  };

  const handleMonthlyDonation = async () => {
    await createCheckoutSession(selectedMonthlyAmount, "monthly");
  };

  const handleInfoRequest = (type: string) => {
    toast({
      title: "Information Request Received",
      description: `We'll send you more information about our ${type} shortly.`,
    });
    console.log(`${type} information requested`);
  };

  React.useEffect(() => {
    const url = new URL(window.location.href);
    const status = url.searchParams.get("status");
    const type = url.searchParams.get("type");
    const amount = url.searchParams.get("amount");

    if (status === "success" && type && amount) {
      toast({
        title: "Thank you for your donation!",
        description: `Your ${type === "monthly" ? "monthly" : "one-time"} donation of ${amount} has been processed.`,
      });

      window.history.replaceState({}, document.title, "/donate");
    } else if (status === "canceled") {
      toast({
        title: "Donation Canceled",
        description: "Your donation has been canceled. No charges were made.",
      });

      window.history.replaceState({}, document.title, "/donate");
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Difference Today</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Your donation directly supports our mission to provide stable housing and support services
              to individuals and families experiencing homelessness.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ways to Give</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-4">One-Time Donation</h3>
                <p className="text-gray-600 mb-6">
                  Make an immediate impact with a one-time contribution to support our housing programs.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["$25", "$50", "$100", "$250", "$500", "Other"].map((amount) => (
                    <div key={amount} className="relative">
                      {amount === "Other" && selectedOneTimeAmount !== "Other" ? (
                        <Button
                          variant={selectedOneTimeAmount === amount ? "default" : "outline"}
                          className={selectedOneTimeAmount === amount ? "bg-redcross hover:bg-redcross/90 w-full" : "w-full"}
                          onClick={() => handleOneTimeSelection(amount)}
                        >
                          {amount}
                        </Button>
                      ) : amount === "Other" || selectedOneTimeAmount === "Other" ? (
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={selectedOneTimeAmount === "Other" ? selectedOneTimeAmount : ""}
                          onChange={(e) => handleCustomAmount(e, "oneTime")}
                          placeholder="Other amount"
                          onClick={() => setSelectedOneTimeAmount("Other")}
                        />
                      ) : (
                        <Button
                          variant={selectedOneTimeAmount === amount ? "default" : "outline"}
                          className={selectedOneTimeAmount === amount ? "bg-redcross hover:bg-redcross/90 w-full" : "w-full"}
                          onClick={() => handleOneTimeSelection(amount)}
                        >
                          {amount}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-redcross hover:bg-redcross/90"
                  onClick={handleDonateNow}
                  disabled={loading === "one-time"}
                >
                  {loading === "one-time" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Donate Now"
                  )}
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-4">Monthly Giving</h3>
                <p className="text-gray-600 mb-6">
                  Join our community of monthly donors and provide sustained support for families in need.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["$10", "$25", "$50", "$100", "$200", "Other"].map((amount) => (
                    <div key={amount} className="relative">
                      {amount === "Other" && selectedMonthlyAmount !== "Other" ? (
                        <Button
                          variant={selectedMonthlyAmount === amount ? "default" : "outline"}
                          className={selectedMonthlyAmount === amount ? "bg-redcross hover:bg-redcross/90 w-full" : "w-full"}
                          onClick={() => handleMonthlySelection(amount)}
                        >
                          {amount}
                        </Button>
                      ) : amount === "Other" || selectedMonthlyAmount === "Other" ? (
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={selectedMonthlyAmount === "Other" ? selectedMonthlyAmount : ""}
                          onChange={(e) => handleCustomAmount(e, "monthly")}
                          placeholder="Other amount"
                          onClick={() => setSelectedMonthlyAmount("Other")}
                        />
                      ) : (
                        <Button
                          variant={selectedMonthlyAmount === amount ? "default" : "outline"}
                          className={selectedMonthlyAmount === amount ? "bg-redcross hover:bg-redcross/90 w-full" : "w-full"}
                          onClick={() => handleMonthlySelection(amount)}
                        >
                          {amount}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-redcross hover:bg-redcross/90"
                  onClick={handleMonthlyDonation}
                  disabled={loading === "monthly"}
                >
                  {loading === "monthly" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Become a Monthly Donor"
                  )}
                </Button>
              </div>
              
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
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Your Donation's Impact</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="/lovable-uploads/7cdd71bb-0dc9-483e-b14d-679c78fd4ee8.png" 
                    alt="Donation center with food and supplies" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            </div>
          </div>
        </section>
        
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
