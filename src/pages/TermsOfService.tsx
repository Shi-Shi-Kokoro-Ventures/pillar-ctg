
import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the P.I.L.L.A.R. Initiative 
                website and services. Please read these Terms carefully before using our website.
              </p>
              <p className="mt-4">
                By accessing or using our website, you agree to be bound by these Terms. If you do not agree to 
                these Terms, you may not access or use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
              <p>
                P.I.L.L.A.R. Initiative ("we," "our," or "us") is a 501(c)(3) nonprofit organization dedicated 
                to ending homelessness through affordable housing solutions, support services, and community empowerment 
                programs that build foundations for lasting independence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of Our Website</h2>
              <p>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our website in any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>Use our website to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                <li>Use any robot, spider, or other automatic device, process, or means to access our website for any purpose</li>
                <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other malicious or technologically harmful material</li>
                <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property Rights</h2>
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
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donations</h2>
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
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Content</h2>
              <p>
                Our website may allow you to submit content, such as comments, testimonials, or other materials. 
                By submitting content to our website, you grant us a non-exclusive, perpetual, irrevocable, royalty-free, 
                worldwide license to use, reproduce, modify, publish, distribute, and display such content for any purpose.
              </p>
              <p className="mt-4">
                You are solely responsible for any content you submit to our website. You represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You own or control all rights in and to the content you submit</li>
                <li>The content does not violate the rights of any third party</li>
                <li>The content is not illegal, obscene, defamatory, or otherwise objectionable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Links to Third-Party Websites</h2>
              <p>
                Our website may contain links to third-party websites or services that are not owned or controlled by 
                P.I.L.L.A.R. Initiative. We have no control over, and assume no responsibility for, the content, privacy 
                policies, or practices of any third-party websites or services. You further acknowledge and agree that 
                P.I.L.L.A.R. Initiative shall not be responsible or liable, directly or indirectly, for any damage or 
                loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, 
                goods, or services available on or through any such websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer of Warranties</h2>
              <p>
                Our website is provided "as is" and "as available," without any warranties of any kind, either express or implied. 
                To the fullest extent permitted by applicable law, P.I.L.L.A.R. Initiative disclaims all warranties, express or 
                implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, 
                non-infringement, and title.
              </p>
              <p className="mt-4">
                We do not warrant that our website will be uninterrupted or error-free, that defects will be corrected, or that 
                our website or the server that makes it available are free of viruses or other harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, P.I.L.L.A.R. Initiative shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to, damages for loss of profits, 
                goodwill, use, data, or other intangible losses, resulting from (i) your access to or use of or inability to access 
                or use our website; (ii) any conduct or content of any third party on our website; (iii) any content obtained from 
                our website; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on 
                warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed 
                of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless P.I.L.L.A.R. Initiative, its officers, directors, employees, 
                and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees 
                (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of 
                our website, including, but not limited to, any use of our website's content other than as expressly authorized 
                in these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law and Jurisdiction</h2>
              <p>
                These Terms and your use of our website shall be governed by and construed in accordance with the laws of the 
                State of Delaware, without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, 
                or proceeding arising out of, or related to, these Terms or our website shall be instituted exclusively in the federal 
                courts of the United States or the courts of the State of Delaware, although we retain the right to bring any suit, 
                action, or proceeding against you for breach of these Terms in your country of residence or any other relevant country.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to These Terms</h2>
              <p>
                We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately 
                when we post them, and apply to all access to and use of our website thereafter. Your continued use of our website 
                following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <address className="not-italic mt-2">
                <p>P.I.L.L.A.R. Initiative</p>
                <p>1201 Orange St #600</p>
                <p>Wilmington, DE 19801</p>
                <p>Email: info@pillarinitiativectg.org</p>
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

export default TermsOfService;
