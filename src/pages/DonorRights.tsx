
import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gift, Check, Shield, FileText, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const DonorRights = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-blue-50">
              <Gift className="h-8 w-8 text-redcross" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Donor Bill of Rights
            </h1>
          </div>
          
          {/* Introduction Card */}
          <div className="mb-12 glass p-8 rounded-xl shadow-lg border border-gray-100 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to Our Donors</h2>
            <p className="text-gray-700 leading-relaxed">
              P.I.L.L.A.R. Initiative believes in transparency, accountability, and respect for our donors. 
              This Donor Bill of Rights outlines the rights that all donors have when making charitable 
              contributions to our organization.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              The Donor Bill of Rights was created by the Association of Fundraising Professionals (AFP), the 
              Association for Healthcare Philanthropy (AHP), the Council for Advancement and Support of Education 
              (CASE), and the Giving Institute. P.I.L.L.A.R. Initiative endorses and commits to this Donor Bill of Rights.
            </p>
          </div>
          
          {/* Donor Bill of Rights Card */}
          <div className="bg-gradient-to-br from-redcross-light/10 to-blue-50/70 p-8 rounded-xl border border-blue-100 shadow-lg my-12 animate-fade-in">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center">
              <Shield className="h-6 w-6 text-redcross mr-3" />
              Donor Bill of Rights
            </h2>
            <p className="italic text-center mb-8 text-gray-600 max-w-3xl mx-auto">
              Philanthropy is based on voluntary action for the common good. It is a tradition of giving and sharing 
              that is primary to the quality of life. To assure that philanthropy merits the respect and trust of the 
              general public, and that donors and prospective donors can have full confidence in P.I.L.L.A.R. Initiative, 
              we declare that all donors have these rights:
            </p>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                "To be informed of the organization's mission, of the way the organization intends to use donated resources, and of its capacity to use donations effectively for their intended purposes.",
                "To be informed of the identity of those serving on the organization's governing board, and to expect the board to exercise prudent judgment in its stewardship responsibilities.",
                "To have access to the organization's most recent financial statements.",
                "To be assured their gifts will be used for the purposes for which they were given.",
                "To receive appropriate acknowledgement and recognition.",
                "To be assured that information about their donation is handled with respect and with confidentiality to the extent provided by law.",
                "To expect that all relationships with individuals representing organizations of interest to the donor will be professional in nature.",
                "To be informed whether those seeking donations are volunteers, employees of the organization or hired solicitors.",
                "To have the opportunity for their names to be deleted from mailing lists that an organization may intend to share.",
                "To feel free to ask questions when making a donation and to receive prompt, truthful and forthright answers."
              ].map((right, index) => (
                <div key={index} className="flex bg-white p-5 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-redcross/20">
                  <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 text-redcross">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold">{right.split(',')[0]}</span>
                      {right.substring(right.indexOf(',') + 1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700 space-y-10">
            {/* Additional Commitments */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <Info className="h-6 w-6 text-redcross mr-3" />
                Additional Commitments to Our Donors
              </h2>
              <p>
                In addition to the Donor Bill of Rights, P.I.L.L.A.R. Initiative makes the following commitments to our donors:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                  {
                    title: "Efficient and Effective Use of Funds",
                    description: "We will use your donation efficiently and effectively for its intended purpose. We are committed to keeping our overhead costs reasonable and appropriate."
                  },
                  {
                    title: "Ethical Fundraising Practices",
                    description: "Our fundraising practices are consistent with our mission, compatible with our organizational capacity, and respectful of the interests and concerns of our donors and the communities we serve."
                  },
                  {
                    title: "Transparent Communication",
                    description: "We will provide regular updates on our activities, programs, and outcomes through our website, newsletters, and annual reports."
                  },
                  {
                    title: "Accurate Financial Reporting",
                    description: "We will maintain accurate financial records and provide transparent financial statements that are available to the public."
                  },
                  {
                    title: "Privacy and Confidentiality",
                    description: "We respect your privacy and will maintain the confidentiality of personal information. We will not sell, share, or trade our donors' names or personal information with any other entity, nor send mailings to our donors on behalf of other organizations."
                  },
                  {
                    title: "Professional Conduct",
                    description: "All staff, board members, and volunteers involved in fundraising will adhere to high standards of professional conduct and ethical principles."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <h3 className="font-bold mb-2 flex items-center">
                      <Check className="h-5 w-5 text-redcross mr-2" />
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Tax Information */}
            <section className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <FileText className="h-6 w-6 text-redcross mr-3" />
                Tax-Deductible Contributions
              </h2>
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <p>
                  P.I.L.L.A.R. Initiative is a 501(c)(3) nonprofit organization. Donations to P.I.L.L.A.R. Initiative may be 
                  tax-deductible to the fullest extent allowed by law. We provide acknowledgment letters for all donations 
                  over $250 in accordance with IRS requirements.
                </p>
                <p className="mt-4 font-semibold">
                  Our Tax Identification Number (EIN) is: XX-XXXXXXX
                </p>
              </div>
            </section>
            
            {/* Financial Accountability */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <Shield className="h-6 w-6 text-redcross mr-3" />
                Financial Accountability
              </h2>
              <p>
                P.I.L.L.A.R. Initiative undergoes an annual independent audit. We are committed to financial 
                transparency and accountability. Our annual reports and financial statements are available for 
                review upon request.
              </p>
            </section>
            
            {/* Refund Policy */}
            <section className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <Gift className="h-6 w-6 text-redcross mr-3" />
                Our Donation Refund Policy
              </h2>
              <p>
                In the event that a donor makes an error in their donation, we will honor requests for refunds made 
                within 30 days of the donation. To request a refund, please contact our development office with your 
                name, donation date, and reason for the refund request.
              </p>
            </section>
            
            {/* Contact Section */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <svg className="h-6 w-6 text-redcross mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </h2>
              <p>
                If you have any questions or concerns about your rights as a donor, our fundraising practices, or how 
                your donation is being used, please contact us at:
              </p>
              <address className="not-italic mt-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-semibold">P.I.L.L.A.R. Initiative</p>
                <p>1201 Orange St #600</p>
                <p>Wilmington, DE 19801</p>
                <p className="mt-2 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email: development@pillarinitiativectg.org</span>
                </p>
                <p className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Phone: 1-833-585-4273 (1-833-LVL-HARD)</span>
                </p>
              </address>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonorRights;
