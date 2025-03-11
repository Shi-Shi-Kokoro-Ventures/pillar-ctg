
import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const DonorRights = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Donor Bill of Rights</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to Our Donors</h2>
              <p>
                P.I.L.L.A.R. Initiative believes in transparency, accountability, and respect for our donors. 
                This Donor Bill of Rights outlines the rights that all donors have when making charitable 
                contributions to our organization.
              </p>
              <p className="mt-4">
                The Donor Bill of Rights was created by the Association of Fundraising Professionals (AFP), the 
                Association for Healthcare Philanthropy (AHP), the Council for Advancement and Support of Education 
                (CASE), and the Giving Institute. P.I.L.L.A.R. Initiative endorses and commits to this Donor Bill of Rights.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 my-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Donor Bill of Rights</h2>
              <p className="italic text-center mb-6">
                Philanthropy is based on voluntary action for the common good. It is a tradition of giving and sharing 
                that is primary to the quality of life. To assure that philanthropy merits the respect and trust of the 
                general public, and that donors and prospective donors can have full confidence in P.I.L.L.A.R. Initiative, 
                we declare that all donors have these rights:
              </p>
              
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong>To be informed of the organization's mission</strong>, of the way the organization intends to use 
                  donated resources, and of its capacity to use donations effectively for their intended purposes.
                </li>
                <li>
                  <strong>To be informed of the identity of those serving on the organization's governing board</strong>, and 
                  to expect the board to exercise prudent judgment in its stewardship responsibilities.
                </li>
                <li>
                  <strong>To have access to the organization's most recent financial statements</strong>.
                </li>
                <li>
                  <strong>To be assured their gifts will be used for the purposes for which they were given</strong>.
                </li>
                <li>
                  <strong>To receive appropriate acknowledgement and recognition</strong>.
                </li>
                <li>
                  <strong>To be assured that information about their donation is handled with respect and with confidentiality</strong> 
                  to the extent provided by law.
                </li>
                <li>
                  <strong>To expect that all relationships with individuals representing organizations of interest to the donor</strong> 
                  will be professional in nature.
                </li>
                <li>
                  <strong>To be informed whether those seeking donations are volunteers</strong>, employees of the organization or 
                  hired solicitors.
                </li>
                <li>
                  <strong>To have the opportunity for their names to be deleted from mailing lists</strong> that an organization 
                  may intend to share.
                </li>
                <li>
                  <strong>To feel free to ask questions when making a donation and to receive prompt, truthful and forthright answers</strong>.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Commitments to Our Donors</h2>
              <p>
                In addition to the Donor Bill of Rights, P.I.L.L.A.R. Initiative makes the following commitments to our donors:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Efficient and Effective Use of Funds:</strong> We will use your donation efficiently and effectively 
                  for its intended purpose. We are committed to keeping our overhead costs reasonable and appropriate.
                </li>
                <li>
                  <strong>Ethical Fundraising Practices:</strong> Our fundraising practices are consistent with our mission, 
                  compatible with our organizational capacity, and respectful of the interests and concerns of our donors and the 
                  communities we serve.
                </li>
                <li>
                  <strong>Transparent Communication:</strong> We will provide regular updates on our activities, programs, 
                  and outcomes through our website, newsletters, and annual reports.
                </li>
                <li>
                  <strong>Accurate Financial Reporting:</strong> We will maintain accurate financial records and provide 
                  transparent financial statements that are available to the public.
                </li>
                <li>
                  <strong>Privacy and Confidentiality:</strong> We respect your privacy and will maintain the confidentiality 
                  of personal information. We will not sell, share, or trade our donors' names or personal information with 
                  any other entity, nor send mailings to our donors on behalf of other organizations.
                </li>
                <li>
                  <strong>Professional Conduct:</strong> All staff, board members, and volunteers involved in fundraising 
                  will adhere to high standards of professional conduct and ethical principles.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tax-Deductible Contributions</h2>
              <p>
                P.I.L.L.A.R. Initiative is a 501(c)(3) nonprofit organization. Donations to P.I.L.L.A.R. Initiative may be 
                tax-deductible to the fullest extent allowed by law. We provide acknowledgment letters for all donations 
                over $250 in accordance with IRS requirements.
              </p>
              <p className="mt-4">
                Our Tax Identification Number (EIN) is: XX-XXXXXXX
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Accountability</h2>
              <p>
                P.I.L.L.A.R. Initiative undergoes an annual independent audit. We are committed to financial 
                transparency and accountability. Our annual reports and financial statements are available for 
                review upon request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Donation Refund Policy</h2>
              <p>
                In the event that a donor makes an error in their donation, we will honor requests for refunds made 
                within 30 days of the donation. To request a refund, please contact our development office with your 
                name, donation date, and reason for the refund request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p>
                If you have any questions or concerns about your rights as a donor, our fundraising practices, or how 
                your donation is being used, please contact us at:
              </p>
              <address className="not-italic mt-2">
                <p>P.I.L.L.A.R. Initiative</p>
                <p>1201 Orange St #600</p>
                <p>Wilmington, DE 19801</p>
                <p>Email: development@pillarinitiativectg.org</p>
                <p>Phone: 1-833-585-4273 (1-833-LVL-HARD)</p>
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
