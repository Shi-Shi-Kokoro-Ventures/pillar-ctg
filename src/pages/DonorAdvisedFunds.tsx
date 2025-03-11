
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Info, CreditCard, HandCoins, FileText, Mail, ExternalLink } from "lucide-react";
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
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white text-shadow animate-fade-in">Donor-Advised Funds</h1>
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
                Make a powerful impact through your donor-advised fund by supporting our mission to end homelessness.
              </p>
              <Button asChild size="lg" className="bg-redcross hover:bg-redcross/90 animate-fade-in shadow-lg" style={{ animationDelay: "400ms" }}>
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
          {/* Introduction to Donor-Advised Funds */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-10 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">What is a Donor-Advised Fund?</h2>
            <div className="flex items-start">
              <FileText className="h-8 w-8 text-redcross mr-4 shrink-0 mt-1" />
              <p className="text-lg leading-relaxed text-gray-700">
                A donor-advised fund (DAF) is a philanthropic giving vehicle administered by a third party. It allows individuals,
                families, or organizations to make charitable contributions, receive immediate tax benefits, and then recommend
                grants from the fund over time to nonprofit organizations like ours.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-10 hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">Why Contribute Through a DAF?</h2>
            <ul className="space-y-5 mb-6">
              <li className="flex items-start group bg-blue-50/40 p-4 rounded-lg hover:bg-blue-50/70 transition-colors duration-300">
                <HandCoins className="h-6 w-6 text-redcross mr-3 shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg text-gray-700">Immediate tax advantages for your charitable contributions.</span>
              </li>
              <li className="flex items-start group bg-blue-50/40 p-4 rounded-lg hover:bg-blue-50/70 transition-colors duration-300">
                <HandCoins className="h-6 w-6 text-redcross mr-3 shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg text-gray-700">Flexible and convenient way to manage your philanthropy.</span>
              </li>
              <li className="flex items-start group bg-blue-50/40 p-4 rounded-lg hover:bg-blue-50/70 transition-colors duration-300">
                <HandCoins className="h-6 w-6 text-redcross mr-3 shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg text-gray-700">Ability to make a lasting impact on our mission to end homelessness.</span>
              </li>
            </ul>
          </div>

          {/* Steps to Recommend a Grant */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-10 hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">How to Recommend a Grant</h2>
            <ol className="space-y-6 mb-6">
              <li className="flex group">
                <div className="bg-redcross text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">1</div>
                <div className="bg-gray-50 p-4 rounded-lg flex-grow hover:bg-gray-100 transition-colors duration-300">
                  <p className="text-lg text-gray-700">
                    Contact your donor-advised fund administrator and provide them with our organization's details.
                  </p>
                </div>
              </li>
              <li className="flex group">
                <div className="bg-redcross text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">2</div>
                <div className="bg-gray-50 p-4 rounded-lg flex-grow hover:bg-gray-100 transition-colors duration-300">
                  <p className="text-lg font-medium text-gray-800 mb-2">Recommend a grant to:</p>
                  <ul className="ml-2 space-y-3">
                    <li className="flex items-center">
                      <span className="bg-blue-100 w-3 h-3 rounded-full mr-2"></span>
                      <span className="text-gray-700"><strong>Organization Name:</strong> P.I.L.L.A.R. Initiative</span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 w-3 h-3 rounded-full mr-2"></span>
                      <span className="text-gray-700"><strong>Tax ID/EIN:</strong> 33-3833739</span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 w-3 h-3 rounded-full mr-2"></span>
                      <span className="text-gray-700"><strong>Address:</strong> 1201 Orange St #600, Wilmington, DE 19801</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex group">
                <div className="bg-redcross text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">3</div>
                <div className="bg-gray-50 p-4 rounded-lg flex-grow hover:bg-gray-100 transition-colors duration-300">
                  <p className="text-lg text-gray-700">
                    Notify us of your grant recommendation so we can properly acknowledge your generous contribution.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Additional Support / Contact */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-10 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <div className="flex items-start">
              <div className="bg-blue-100 p-4 rounded-full mr-4 shrink-0">
                <Info className="h-8 w-8 text-redcross" />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-4 text-gray-800">Need Assistance?</h3>
                <p className="mb-4 text-lg text-gray-700 leading-relaxed">
                  If you have any questions or need additional information, feel free to reach out to our development team at{' '}
                  <a
                    href="mailto:development@pillarinitiativectg.org"
                    className="text-redcross hover:text-redcross-dark underline flex items-center inline-flex gap-1 font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    development@pillarinitiativectg.org
                  </a>.
                </p>
                <div className="mt-6">
                  <Button asChild variant="outline" className="button-hover">
                    <Link to="/contact-us" className="flex items-center gap-2">
                      <span>Contact Us</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 animate-fade-in">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="bg-blue-50 p-4 rounded-full inline-flex mb-6">
                  <CreditCard className="h-12 w-12 text-redcross" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">$5,000</h3>
                <p className="text-lg text-gray-700">Provides emergency housing for 10 families for one month</p>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-redcross rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="bg-blue-50 p-4 rounded-full inline-flex mb-6">
                  <CreditCard className="h-12 w-12 text-redcross" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">$10,000</h3>
                <p className="text-lg text-gray-700">Funds job training programs for 20 individuals</p>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-redcross rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <div className="bg-blue-50 p-4 rounded-full inline-flex mb-6">
                  <CreditCard className="h-12 w-12 text-redcross" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">$25,000</h3>
                <p className="text-lg text-gray-700">Helps renovate affordable housing units for 5 families</p>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-redcross rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "800ms" }}>
              <Button asChild size="lg" className="bg-redcross hover:bg-redcross/90">
                <Link to="/donate" className="px-8">Make a Difference Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonial Section - New Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 animate-fade-in">The Impact of Your Giving</h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 md:p-12 rounded-xl shadow-md animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-gray-300 rounded-full shrink-0 mx-auto md:mx-0"></div>
                <div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
                    "Through donor-advised funds, we've been able to support the PILLAR Initiative consistently each year. 
                    The ability to plan our giving while making an immediate impact has been tremendously rewarding."
                  </blockquote>
                  <div className="font-bold text-gray-800">— Thomas & Sarah Reynolds</div>
                  <div className="text-gray-600">DAF donors since 2021</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - New Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 animate-fade-in">Frequently Asked Questions</h2>
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 text-gray-800">How quickly will my donation be put to use?</h3>
                <p className="text-gray-700">Once we receive your DAF grant, funds are typically allocated within 30 days to our active programs addressing homelessness in communities across the region.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Can I specify which program I want to support?</h3>
                <p className="text-gray-700">Yes, you can recommend that your DAF grant be directed to a specific program area such as emergency housing, job training, or family support services.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 text-gray-800">What is the minimum DAF grant amount?</h3>
                <p className="text-gray-700">While we gratefully accept DAF grants of any size, we suggest a minimum of $500 to maximize impact after administrative processing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-redcross to-redcross-dark text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Ready to Make a Lasting Impact?</h2>
            <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Your donor-advised fund contribution helps us create sustainable solutions to homelessness in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button asChild size="lg" className="bg-white text-redcross-dark hover:bg-gray-100">
                <Link to="/donate">Recommend a Grant</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                <Link to="/contact-us">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonorAdvisedFunds;
