import React from "react";
import Navbar from "@/components/Navbar";

const DonorRights = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
            Understanding Your Rights as a Donor
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            As a donor, you play a vital role in supporting our mission. We
            believe in transparency and accountability, and we want you to be
            fully aware of your rights when you contribute to our cause.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Rights
          </h2>

          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6">
            <li>
              <span className="font-semibold">Right to Information:</span> You
              have the right to be informed about the mission, the way our
              resources will be used, and our capacity to use your donations
              effectively for their intended purposes.
            </li>
            <li>
              <span className="font-semibold">Right to Privacy:</span> We
              respect your privacy. Your name will not be sold, shared, or
              exchanged without your explicit permission.
            </li>
            <li>
              <span className="font-semibold">Right to Acknowledgement:</span>{" "}
              You have the right to receive appropriate acknowledgement and
              recognition for your contributions.
            </li>
            <li>
              <span className="font-semibold">Right to Anonymity:</span> If you
              prefer to remain anonymous, we will honor your request and keep
              your identity confidential.
            </li>
            <li>
              <span className="font-semibold">Right to Accurate Financial
                Reporting:</span> You have the right to receive accurate and
              honest financial reporting.
            </li>
            <li>
              <span className="font-semibold">Right to Ask Questions:</span>{" "}
              You have the right to ask questions about our fundraising
              practices and policies and receive prompt, truthful, and forth
              right answers.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Commitment to You
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            We are committed to upholding these rights and ensuring that your
            experience as a donor is positive and fulfilling. If you have any
            questions or concerns about your rights as a donor, please do not
            hesitate to contact us.
          </p>

          <div className="bg-gray-100 p-6 rounded-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Contact Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or need further assistance, please
              contact our Donor Relations team at:
              <br />
              Email:{" "}
              <a
                href="mailto:donorrelations@example.com"
                className="text-blue-500 hover:underline"
              >
                donorrelations@example.com
              </a>
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonorRights;
