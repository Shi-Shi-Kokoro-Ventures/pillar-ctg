import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Classes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Financial Literacy Classes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Empower yourself and your community with essential financial
              knowledge. Our classes provide the tools and resources you need
              to achieve financial stability and success.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              View Class Schedule
            </Button>
          </div>
        </section>

        {/* Class Details */}
        <section className="py-16">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Image and Description */}
            <div>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Financial Literacy Class"
                className="rounded-lg shadow-md mb-6"
              />
              <p className="text-gray-600 mb-4">
                Our comprehensive financial literacy course covers everything
                from budgeting and saving to debt management and investment
                strategies. Learn how to make informed financial decisions and
                build a secure future.
              </p>
              <p className="text-gray-600">
                Classes are taught by experienced financial professionals and
                are designed to be accessible to individuals of all backgrounds
                and income levels.
              </p>
            </div>

            {/* Right Side: Course Information */}
            <div>
              <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4">Course Information</h3>
                <div className="mb-2">
                  <span className="font-medium">Duration:</span> 8 weeks
                </div>
                <div className="mb-2">
                  <span className="font-medium">Frequency:</span> 2 sessions
                  per week
                </div>
                <div className="mb-2">
                  <span className="font-medium">Location:</span> Community
                  Center, Room 201
                </div>
                <div className="mb-4">
                  <span className="font-medium">Cost:</span> Free (sponsored by
                  P.I.L.L.A.R. Initiative)
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Register Now
                </Button>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4">
                  Benefits of This Course
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500 flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                    <span>Comprehensive understanding of financial basics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500 flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                    <span>Practical tools for budgeting and saving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500 flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                    <span>Strategies for debt management and reduction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500 flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                    <span>Certification to teach others in your community</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-600 italic mb-4">
                  "This course completely changed my perspective on money
                  management. I now have the confidence to make smart financial
                  decisions."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50x50"
                    alt="Student 1"
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Course Graduate</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-600 italic mb-4">
                  "I was struggling with debt for years, but this course gave
                  me the tools and strategies I needed to finally get back on
                  track."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50x50"
                    alt="Student 2"
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">Michael Davis</p>
                    <p className="text-sm text-gray-500">Course Graduate</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-600 italic mb-4">
                  "I highly recommend this course to anyone looking to improve
                  their financial literacy. The instructors are knowledgeable
                  and supportive."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50x50"
                    alt="Student 3"
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">Emily White</p>
                    <p className="text-sm text-gray-500">Course Graduate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Enroll in our financial literacy classes today and start building
              a brighter financial future.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              View Class Schedule
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Classes;
