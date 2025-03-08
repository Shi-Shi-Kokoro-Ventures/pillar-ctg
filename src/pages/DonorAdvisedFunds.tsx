
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Info, CreditCard, HandCoins, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const DonorAdvisedFunds: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">Donor-Advised Funds</h1>
              <p className="text-xl text-white mb-8">
                Make a powerful impact through your donor-advised fund by supporting our mission to end homelessness.
              </p>
              <Button asChild className="bg-redcross hover:bg-redcross/90">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12 px-4 max-w-5xl mx-auto">
          {/* Introduction to Donor-Advised Funds */}
          <h2 className="text-3xl font-bold mb-4">What is a Donor-Advised Fund?</h2>
          <div className="flex items-start mb-6">
            <FileText className="h-6 w-6 text-redcross mr-3 shrink-0 mt-1" />
            <p>
              A donor-advised fund (DAF) is a philanthropic giving vehicle administered by a third party. It allows individuals,
              families, or organizations to make charitable contributions, receive immediate tax benefits, and then recommend
              grants from the fund over time to nonprofit organizations like ours.
            </p>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl font-bold mb-4">Why Contribute Through a DAF?</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <HandCoins className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
              <span>Immediate tax advantages for your charitable contributions.</span>
            </li>
            <li className="flex items-start">
              <HandCoins className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
              <span>Flexible and convenient way to manage your philanthropy.</span>
            </li>
            <li className="flex items-start">
              <HandCoins className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
              <span>Ability to make a lasting impact on our mission to end homelessness.</span>
            </li>
          </ul>

          {/* Steps to Recommend a Grant */}
          <h2 className="text-3xl font-bold mb-4">How to Recommend a Grant</h2>
          <ol className="space-y-4 mb-6">
            <li className="flex">
              <div className="bg-redcross text-white rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">1</div>
              <div>
                Contact your donor-advised fund administrator and provide them with our organization's details.
              </div>
            </li>
            <li className="flex">
              <div className="bg-redcross text-white rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">2</div>
              <div>
                <div>Recommend a grant to:</div>
                <ul className="mt-2 space-y-1 ml-2">
                  <li><strong>Organization Name:</strong> P.I.L.L.A.R. Initiative</li>
                  <li><strong>Tax ID/EIN:</strong> 82-3456789</li>
                  <li><strong>Address:</strong> 1234 Hope Street, Seattle, WA 98101</li>
                </ul>
              </div>
            </li>
            <li className="flex">
              <div className="bg-redcross text-white rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">3</div>
              <div>
                Notify us of your grant recommendation so we can properly acknowledge your generous contribution.
              </div>
            </li>
          </ol>

          {/* Additional Support / Contact */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-redcross mr-3 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Need Assistance?</h3>
                <p className="mb-3">
                  If you have any questions or need additional information, feel free to reach out to our development team at{' '}
                  <a
                    href="mailto:development@pillar.org"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    development@pillar.org
                  </a>.
                </p>
                <Button asChild variant="outline">
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CreditCard className="h-12 w-12 text-redcross mb-4" />
                <h3 className="text-xl font-bold mb-2">$5,000</h3>
                <p>Provides emergency housing for 10 families for one month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CreditCard className="h-12 w-12 text-redcross mb-4" />
                <h3 className="text-xl font-bold mb-2">$10,000</h3>
                <p>Funds job training programs for 20 individuals</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CreditCard className="h-12 w-12 text-redcross mb-4" />
                <h3 className="text-xl font-bold mb-2">$25,000</h3>
                <p>Helps renovate affordable housing units for 5 families</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonorAdvisedFunds;
