
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Wrench, BookOpen, Heart, Star, ArrowRight } from "lucide-react";
import VolunteerApplicationForm from "@/components/VolunteerApplicationForm";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const Volunteer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: opportunitiesRef, inView: opportunitiesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: testimonialRef, inView: testimonialInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const openVolunteerForm = () => {
    setIsFormOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50"
        >
          <div className="absolute inset-0 bg-[url('/lovable-uploads/7cdd71bb-0dc9-483e-b14d-679c78fd4ee8.png')] bg-cover bg-center opacity-5 z-0"></div>
          <div 
            className={cn(
              "container mx-auto px-4 text-center relative z-10",
              "transition-all duration-1000 ease-out",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">Join Our Volunteer Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Be a part of the solution to homelessness by volunteering with the P.I.L.L.A.R. Initiative. 
              Your time and skills can help transform lives and rebuild communities.
            </p>
            <Button 
              className="bg-redcross hover:bg-redcross/90 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              size="lg"
              onClick={openVolunteerForm}
            >
              Apply to Volunteer
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section 
          ref={opportunitiesRef}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className={cn(
              "text-center mb-16",
              "transition-all duration-700 ease-out",
              opportunitiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 text-redcross mb-4">
                <Users className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Volunteer Opportunities</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-2"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Mentorship Program",
                  description: "Provide guidance and support to individuals transitioning to stable housing. Help with job searches, financial planning, and accessing community resources.",
                  icon: <Users className="h-8 w-8 text-redcross" />,
                  items: [
                    "4-6 hours per month commitment",
                    "Training provided",
                    "Background check required"
                  ],
                  delay: 0
                },
                {
                  title: "Housing Renovation",
                  description: "Help renovate and prepare affordable housing units for new residents. Projects include painting, basic repairs, cleaning, and furniture assembly.",
                  icon: <Wrench className="h-8 w-8 text-redcross" />,
                  items: [
                    "One-time or recurring opportunities",
                    "No experience necessary",
                    "Great for groups and corporate teams"
                  ],
                  delay: 200
                },
                {
                  title: "Education & Training",
                  description: "Lead workshops on financial literacy, job readiness, digital skills, and other life skills that help individuals achieve long-term independence.",
                  icon: <BookOpen className="h-8 w-8 text-redcross" />,
                  items: [
                    "Flexible scheduling",
                    "Professional expertise valued",
                    "Curriculum and materials provided"
                  ],
                  delay: 400
                }
              ].map((opportunity, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-redcross/20 hover:-translate-y-2",
                    "transition-all duration-700 ease-out",
                    opportunitiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${opportunity.delay}ms` }}
                >
                  <div className="bg-gradient-to-r from-redcross to-redcross-light p-6 text-white flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-300">
                      {opportunity.icon}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-redcross transition-colors">{opportunity.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {opportunity.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {opportunity.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-redcross mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full border-redcross text-redcross hover:bg-redcross hover:text-white transition-colors duration-300"
                      onClick={openVolunteerForm}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Volunteer Benefits */}
        <section 
          ref={benefitsRef}
          className="py-20 bg-gradient-to-br from-blue-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className={cn(
              "text-center mb-16",
              "transition-all duration-700 ease-out",
              benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-redcross/10 text-redcross mb-4">
                <Star className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Volunteer With Us?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-2"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {[
                {
                  title: "Make a Real Difference",
                  description: "See the direct impact of your work as families move into stable housing and rebuild their lives",
                  icon: <Heart className="h-8 w-8 text-redcross" />,
                  delay: 0
                },
                {
                  title: "Build Community",
                  description: "Connect with like-minded volunteers and develop meaningful relationships with those we serve",
                  icon: <Users className="h-8 w-8 text-redcross" />,
                  delay: 200
                },
                {
                  title: "Gain Experience",
                  description: "Develop new skills, enhance your resume, and grow personally and professionally",
                  icon: <Star className="h-8 w-8 text-redcross" />,
                  delay: 400
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className={cn(
                    "text-center group",
                    "transition-all duration-700 ease-out",
                    benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${benefit.delay}ms` }}
                >
                  <div className="mx-auto bg-white p-5 rounded-full w-20 h-20 flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:bg-redcross/5 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-redcross transition-colors">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section 
          ref={testimonialRef}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className={cn(
              "text-center mb-16",
              "transition-all duration-700 ease-out",
              testimonialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Volunteer Stories</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-2"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Mentorship Program Volunteer",
                  quote: "Volunteering with P.I.L.L.A.R. has been one of the most rewarding experiences of my life. Seeing the family I mentored move into their own apartment after months of working together was incredibly powerful.",
                  image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                  delay: 0
                },
                {
                  name: "Michael Chen",
                  role: "Housing Renovation Volunteer",
                  quote: "Our company team spent a day painting and setting up furniture in a new affordable housing unit. The experience brought us closer together while making a tangible difference in our community.",
                  image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  delay: 200
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-redcross/20",
                    "transition-all duration-700 ease-out",
                    testimonialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${testimonial.delay}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-gray-200 w-16 h-16 rounded-full mr-4 overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-redcross transition-colors">{testimonial.name}</h4>
                      <p className="text-redcross text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section 
          ref={ctaRef}
          className={cn(
            "py-20 bg-gradient-to-r from-redcross-dark to-redcross text-white",
            "transition-opacity duration-1000",
            ctaInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join our team of dedicated volunteers and help us create lasting solutions to homelessness in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-white text-redcross hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                size="lg"
                onClick={openVolunteerForm}
              >
                Apply to Volunteer
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white bg-redcross/40 hover:bg-white hover:text-redcross focus:bg-white focus:text-redcross focus:ring-2 focus:ring-white shadow-lg hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                size="lg"
                onClick={() => window.location.href = "/contact-us"}
              >
                Contact Us With Questions
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Volunteer Application Form Dialog */}
      <VolunteerApplicationForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
};

export default Volunteer;
