
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Donate = () => {
  const [selectedOneTimeAmount, setSelectedOneTimeAmount] = useState<string>("$100");
  const [selectedMonthlyAmount, setSelectedMonthlyAmount] = useState<string>("$25");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
      
      // Validate amount
      const numericAmount = amount.replace(/^\$/, "").trim();
      if (!numericAmount || numericAmount === "0" || isNaN(Number(numericAmount))) {
        toast.error("Please enter a valid donation amount");
        setLoading(null);
        return;
      }
      
      // Use default amounts if "Other" is selected but no value entered
      let processedAmount = amount;
      if (processedAmount === "Other" || processedAmount === "$") {
        processedAmount = donationType === "one-time" ? "$100" : "$25";
      }
      
      // Create success and cancel URLs
      const origin = window.location.origin;
      const successUrl = `${origin}/donate?status=success&type=${donationType}&amount=${encodeURIComponent(processedAmount)}`;
      const cancelUrl = `${origin}/donate?status=canceled`;
      
      // Call the Supabase Edge Function to create Checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: processedAmount,
          donationType: donationType,
          successUrl,
          cancelUrl,
        },
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Error calling Supabase function");
      }

      if (!data) {
        throw new Error("No data returned from checkout function");
      }

      // Handle Stripe error returned in successful response
      if (data.error) {
        console.error("Stripe error:", data.error, data.details);
        throw new Error(data.error + (data.details?.message ? `: ${data.details.message}` : ""));
      }

      // Redirect to Stripe Checkout
      if (data?.url) {
        console.log("Redirecting to Stripe checkout:", data.url);
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}. Please try again later.`);
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
    toast.success(`We'll send you more information about our ${type} shortly.`);
    console.log(`${type} information requested`);
  };

  useEffect(() => {
    // Handle redirect from Stripe Checkout
    const url = new URL(window.location.href);
    const status = url.searchParams.get("status");
    const type = url.searchParams.get("type");
    const amount = url.searchParams.get("amount");

    if (status === "success" && type && amount) {
      toast.success(`Thank you! Your ${type === "monthly" ? "monthly" : "one-time"} donation of ${amount} has been processed.`, {
        duration: 6000,
      });
      // Clear URL parameters after processing
      window.history.replaceState({}, document.title, "/donate");
    } else if (status === "canceled") {
      toast.error("Your donation has been canceled. No charges were made.");
      window.history.replaceState({}, document.title, "/donate");
    }
  }, []);

  // Show error message if donation processing failed
  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 6000 });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section 
          className="py-20 md:py-32 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url('/lovable-uploads/7cdd71bb-0dc9-483e-b14d-679c78fd4ee8.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">Make a Difference Today</h1>
              <p className="text-xl text-white mb-8">
                Your donation directly supports our mission to provide stable housing and support services
                to individuals and families experiencing homelessness.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ways to Give</h2>
            
            {/* Error notice if applicable */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-medium">There was a problem processing donations.</p>
                <p className="text-sm text-red-500">Technical details: {error}</p>
                <p className="text-sm mt-2">Please try again later or contact our support team.</p>
              </div>
            )}
            
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
                  asChild
                >
                  <Link to="/donor-advised-funds">Get Details</Link>
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
