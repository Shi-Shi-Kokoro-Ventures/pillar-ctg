import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Scale, Shield, ExternalLink, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TermsOfService = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-blue-50">
              <Scale className="h-8 w-8 text-redcross" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Terms of Service
            </h1>
            <div className="flex items-center justify-center text-gray-500">
              <FileText className="h-4 w-4 mr-2" />
              <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          
          {/* Introduction Card */}
          <div className="mb-12 glass p-8 rounded-xl shadow-lg border border-gray-100 bg-white/80 backdrop-blur-sm">
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of the P.I.L.L.A.R. Initiative 
              website and services. Please read these Terms carefully before using our website.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              By accessing or using our website, you agree to be bound by these Terms. If you do not agree to 
              these Terms, you may not access or use our website.
            </p>
          </div>
          
          {/* Quick Navigation */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2 text-redcross" />
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                "About Us",
                "Use of Our Website",
                "Intellectual Property Rights",
                "Donations",
                "User Content",
                "Links to Third-Party Websites",
                "Disclaimer of Warranties",
                "Limitation of Liability",
                "Indemnification",
                "Governing Law and Jurisdiction",
                "Changes to These Terms",
                "Contact Us"
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={`#section-${i+1}`} 
                  className="text-redcross hover:text-redcross-dark transition-colors flex items-center group"
                >
                  <span className="inline-block w-6 h-6 mr-2 rounded-full bg-redcross-light/20 text-xs flex items-center justify-center text-redcross">
                    {i+1}
                  </span>
                  <span className="group-hover:underline">{item}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700 space-y-10">
            {/* Content Sections */}
            {[
              {
                id: 1,
                title: "About Us",
                content: (
                  <p>
                    P.I.L.L.A.R. Initiative ("we," "our," or "us") is a 501(c)(3) nonprofit organization dedicated 
                    to ending homelessness through affordable housing solutions, support services, and community empowerment 
                    programs that build foundations for lasting independence.
                  </p>
                )
              },
              {
                id: 2,
                title: "Use of Our Website",
                content: (
                  <>
                    <p>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-3">
                      <li>Use our website in any way that violates any applicable federal, state, local, or international law or regulation</li>
                      <li>Use our website to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                      <li>Use any robot, spider, or other automatic device, process, or means to access our website for any purpose</li>
                      <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other malicious or technologically harmful material</li>
                      <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our website</li>
                    </ul>
                  </>
                )
              },
              {
                id: 3,
                title: "Intellectual Property Rights",
                content: (
                  <>
                    <p>
                      Our website and its entire contents, features, and functionality (including but not limited to all information, 
                      software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned 
                      by P.I.L.L.A.R. Initiative, its licensors, or other providers of such material and are protected by United States 
                      and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    </p>
                    <p className="mt-4">
                      You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
                      republish, download, store, or transmit any of the material on our website without our prior written consent.
                    </p>
                  </>
                )
              },
              {
                id: 4,
                title: "Donations",
                content: (
                  <>
                    <p>
                      All donations made through our website are final and non-refundable. By making a donation, you represent 
                      and warrant that the information you provide in connection with the donation is accurate and complete and 
                      that you are authorized to use the payment method provided.
                    </p>
                    <p className="mt-4">
                      We use Stripe, a third-party payment processor, to process donations. Your donation information may be 
                      shared with Stripe, and your use of Stripe's services is subject to their terms of service and privacy policy.
                    </p>
                    <p className="mt-4">
                      Tax receipts for donations will be provided in accordance with applicable laws and regulations.
                    </p>
                  </>
                )
              },
              {
                id: 5,
                title: "User Content",
                content: (
                  <>
                    <p>
                      Our website may allow you to submit content, such as comments, testimonials, or other materials. 
                      By submitting content to our website, you grant us a non-exclusive, perpetual, irrevocable, royalty-free, 
                      worldwide license to use, reproduce, modify, publish, distribute, and display such content for any purpose.
                    </p>
                    <p className="mt-4">
                      You are solely responsible for any content you submit to our website. You represent and warrant that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-3">
                      <li>You own or control all rights in and to the content you submit</li>
                      <li>The content does not violate the rights of any third party</li>
                      <li>The content is not illegal, obscene, defamatory, or otherwise objectionable</li>
                    </ul>
                  </>
                )
              },
              {
                id: 6,
                title: "Links to Third-Party Websites",
                content: (
                  <p>
                    Our website may contain links to third-party websites or services that are not owned or controlled by 
                    P.I.L.L.A.R. Initiative. We have no control over, and assume no responsibility for, the content, privacy 
                    policies, or practices of any third-party websites or services. You further acknowledge and agree that 
                    P.I.L.L.A.R. Initiative shall not be responsible or liable, directly or indirectly, for any damage or 
                    loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, 
                    goods, or services available on or through any such websites or services.
                  </p>
                )
              },
              {
                id: 7,
                title: "Disclaimer of Warranties",
                content: (
                  <p>
                    Our website is provided "as is" and "as available," without any warranties of any kind, either express or implied. 
                    To the fullest extent permitted by applicable law, P.I.L.L.A.R. Initiative disclaims all warranties, express or 
                    implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, 
                    non-infringement, and title.
                  </p>
                )
              },
              {
                id: 8,
                title: "Limitation of Liability",
                content: (
                  <p>
                    To the fullest extent permitted by applicable law, P.I.L.L.A.R. Initiative shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages, including but not limited to, damages for loss of profits, 
                    goodwill, use, data, or other intangible losses, resulting from (i) your access to or use of or inability to access 
                    or use our website; (ii) any conduct or content of any third party on our website; (iii) any content obtained from 
                    our website; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on 
                    warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed 
                    of the possibility of such damage.
                  </p>
                )
              },
              {
                id: 9,
                title: "Indemnification",
                content: (
                  <p>
                    You agree to defend, indemnify, and hold harmless P.I.L.L.A.R. Initiative, its officers, directors, employees, 
                    and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees 
                    (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of 
                    our website, including, but not limited to, any use of our website's content other than as expressly authorized 
                    in these Terms.
                  </p>
                )
              },
              {
                id: 10,
                title: "Governing Law and Jurisdiction",
                content: (
                  <p>
                    These Terms and your use of our website shall be governed by and construed in accordance with the laws of the 
                    State of Delaware, without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, 
                    or proceeding arising out of, or related to, these Terms or our website shall be instituted exclusively in the federal 
                    courts of the United States or the courts of the State of Delaware, although we retain the right to bring any suit, 
                    action, or proceeding against you for breach of these Terms in your country of residence or any other relevant country.
                  </p>
                )
              },
              {
                id: 11,
                title: "Changes to These Terms",
                content: (
                  <p>
                    We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately 
                    when we post them, and apply to all access to and use of our website thereafter. Your continued use of our website 
                    following the posting of revised Terms means that you accept and agree to the changes.
                  </p>
                )
              },
              {
                id: 12,
                title: "Contact Us",
                content: (
                  <>
                    <p>
                      If you have any questions about these Terms, please contact us at:
                    </p>
                    <address className="not-italic mt-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="font-semibold">P.I.L.L.A.R. Initiative</p>
                      <p>1201 Orange St #600</p>
                      <p>Wilmington, DE 19801</p>
                      <p className="mt-2 flex items-center">
                        <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Email: info@pillarinitiativectg.org</span>
                      </p>
                      <p className="flex items-center">
                        <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Phone: 1-833-585-4273 (1-833-LVL-HARD)</span>
                      </p>
                    </address>
                  </>
                )
              }
            ].map(section => (
              <section 
                key={section.id} 
                id={`section-${section.id}`} 
                className={cn(
                  "scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in",
                  section.id % 2 === 0 ? "bg-gradient-to-br from-white to-gray-50" : ""
                )}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                  <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">
                    {section.id}
                  </div>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content}
                </div>
              </section>
            ))}
            
            {/* Remaining sections */}
            <section id="section-6" className="scroll-mt-24 bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">6</div>
                Links to Third-Party Websites
              </h2>
              <div className="space-y-4">
                <p className="flex items-start">
                  <ExternalLink className="h-5 w-5 text-redcross mr-2 mt-1 shrink-0" />
                  <span>
                    Our website may contain links to third-party websites or services that are not owned or controlled by 
                    P.I.L.L.A.R. Initiative. We have no control over, and assume no responsibility for, the content, privacy 
                    policies, or practices of any third-party websites or services. You further acknowledge and agree that 
                    P.I.L.L.A.R. Initiative shall not be responsible or liable, directly or indirectly, for any damage or 
                    loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, 
                    goods, or services available on or through any such websites or services.
                  </span>
                </p>
              </div>
            </section>
            
            <section id="section-7" className="scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">7</div>
                Disclaimer of Warranties
              </h2>
              <div className="space-y-4">
                <p>
                  Our website is provided "as is" and "as available," without any warranties of any kind, either express or implied. 
                  To the fullest extent permitted by applicable law, P.I.L.L.A.R. Initiative disclaims all warranties, express or 
                  implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, 
                  non-infringement, and title.
                </p>
                <p>
                  We do not warrant that our website will be uninterrupted or error-free, that defects will be corrected, or that 
                  our website or the server that makes it available are free of viruses or other harmful components.
                </p>
              </div>
            </section>
            
            <section id="section-8" className="scroll-mt-24 bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">8</div>
                Limitation of Liability
              </h2>
              <div className="space-y-4">
                <p>
                  To the fullest extent permitted by applicable law, P.I.L.L.A.R. Initiative shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited to, damages for loss of profits, 
                  goodwill, use, data, or other intangible losses, resulting from (i) your access to or use of or inability to access 
                  or use our website; (ii) any conduct or content of any third party on our website; (iii) any content obtained from 
                  our website; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on 
                  warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed 
                  of the possibility of such damage.
                </p>
              </div>
            </section>
            
            <section id="section-9" className="scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">9</div>
                Indemnification
              </h2>
              <div className="space-y-4">
                <p>
                  You agree to defend, indemnify, and hold harmless P.I.L.L.A.R. Initiative, its officers, directors, employees, 
                  and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees 
                  (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of 
                  our website, including, but not limited to, any use of our website's content other than as expressly authorized 
                  in these Terms.
                </p>
              </div>
            </section>
            
            <section id="section-10" className="scroll-mt-24 bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">10</div>
                Governing Law and Jurisdiction
              </h2>
              <div className="space-y-4">
                <p>
                  These Terms and your use of our website shall be governed by and construed in accordance with the laws of the 
                  State of Delaware, without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, 
                  or proceeding arising out of, or related to, these Terms or our website shall be instituted exclusively in the federal 
                  courts of the United States or the courts of the State of Delaware, although we retain the right to bring any suit, 
                  action, or proceeding against you for breach of these Terms in your country of residence or any other relevant country.
                </p>
              </div>
            </section>
            
            <section id="section-11" className="scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">11</div>
                Changes to These Terms
              </h2>
              <div className="space-y-4">
                <p>
                  We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately 
                  when we post them, and apply to all access to and use of our website thereafter. Your continued use of our website 
                  following the posting of revised Terms means that you accept and agree to the changes.
                </p>
              </div>
            </section>
            
            <section id="section-12" className="scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">12</div>
                Contact Us
              </h2>
              <div className="space-y-4">
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <address className="not-italic mt-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="font-semibold">P.I.L.L.A.R. Initiative</p>
                  <p>1201 Orange St #600</p>
                  <p>Wilmington, DE 19801</p>
                  <p className="mt-2 flex items-center">
                    <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email: info@pillarinitiativectg.org</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Phone: 1-833-585-4273 (1-833-LVL-HARD)</span>
                  </p>
                </address>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
