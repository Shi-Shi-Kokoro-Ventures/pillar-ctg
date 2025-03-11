<lov-codelov-code>
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Gift, MapPin, Phone, Mail, Calendar, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonateGoods = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Donate Goods</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Your donations of furniture, appliances, and household items help make houses feel like homes for families transitioning from homelessness.
            </p>
          </div>
        </section>

        {/* What We Need */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Items We Need</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Furniture</h3>
                <ul className="space-y-3">
                  {[
                    "Beds and mattresses (twin, full, queen)",
                    "Dining tables and chairs",
                    "Sofas and loveseats",
                    "Coffee tables and end tables",
                    "Dressers and nightstands",
                    "Bookshelves"
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Household Items</h3>
                <ul className="space-y-3">
                  {[
                    "Kitchen utensils and silverware",
                    "Pots, pans, and bakeware",
                    "Dishes and glasses",
                    "Towels and washcloths",
                    "Bedding (sheets, blankets, pillows)",
                    "Lamps and light fixtures"
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-4">Appliances</h3>
                <ul className="space-y-3">
                  {[
                    "Refrigerators",
                    "Stoves and ovens",
                    "Microwaves",
                    "Washers and dryers",
                    "Toasters and coffee makers",
                    "Vacuum cleaners"
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <Gift className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold">Donation Guidelines</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• All items must be in good working condition</li>
                <li>• Furniture should be free of stains, tears, and pet hair</li>
                <li>• Mattresses must be clean and free of damage</li>
                <li>• We cannot accept items that require significant repairs</li>
                <li>• Please contact us before donating large appliances</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Donation Locations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How to Donate</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                  Drop Off Locations
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">P.I.L.L.A.R. Donation Center</h4>
                    <p>431 Main Street, Portland, OR 97205</p>
                    <p>Monday - Saturday: 9am - 5pm</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Eastside Community Center</h4>
                    <p>1250 SE Pine Street, Portland, OR 97214</p>
                    <p>Tuesday - Friday: 10am - 6pm</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                  Schedule a Pickup
                </h3>
                <p className="mb-4">
                  For large items or multiple donations, we offer free pickup within the Portland metro area.
                </p>
                <p className="mb-6">
                  Contact us to schedule a convenient pickup time:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-2" />
                    <a href="tel:1-833-585-4273" className="hover:text-blue-600 transition-colors">(833) LVL-HARD</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-2" />
                    <a href="mailto:donations@pillar.org" className="hover:text-blue-600 transition-colors">donations@pillar.org</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={() => navigate('/coming-soon')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Schedule a Pickup
              </Button>
            </div>
          </div>
        </section>
        
        {/* Tax Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Tax Benefits</h2>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="mb-4">
                Your donation to the P.I.L.L.A.R. Initiative is tax-deductible. We are a registered 501(c)(3) nonprofit organization.
              </p>
              <p className="mb-4">
                After your donation, you will receive a receipt that can be used for tax purposes. The receipt will include:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Date of donation</li>
                <li>Description of donated items</li>
                <li>Our tax ID number</li>
                <li>Acknowledgment that no goods or services were provided in exchange for your donation</li>
              </ul>
              <p>
                Please consult with a tax professional to determine the value of your donation for tax purposes.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonateGoods;
