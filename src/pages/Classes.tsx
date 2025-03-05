
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, GraduationCap, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClassCard = ({ title, description, date, time, location, instructor, capacity, enrolled }) => {
  const isAlmostFull = enrolled >= capacity * 0.8;
  const isFull = enrolled >= capacity;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-blue-600" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-blue-600" />
            <span>{instructor}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            <span>
              {enrolled} / {capacity} enrolled
            </span>
          </div>
          
          {isAlmostFull && !isFull && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Almost Full
            </span>
          )}
          
          {isFull && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Full
            </span>
          )}
        </div>
        
        <Button 
          className={`w-full ${isFull ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isFull}
        >
          {isFull ? 'Class Full' : 'Register Now'}
        </Button>
      </div>
    </div>
  );
};

const Classes = () => {
  const financialClasses = [
    {
      title: "Budgeting Basics",
      description: "Learn essential budgeting skills to manage your finances and work toward housing stability.",
      date: "October 15, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "P.I.L.L.A.R. Community Center",
      instructor: "Maria Johnson",
      capacity: 20,
      enrolled: 14
    },
    {
      title: "Credit Building Workshop",
      description: "Understand how credit works and develop strategies to build or repair your credit score.",
      date: "October 22, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "P.I.L.L.A.R. Community Center",
      instructor: "James Wilson",
      capacity: 20,
      enrolled: 18
    },
    {
      title: "Path to Homeownership",
      description: "Explore the journey to owning your own home, from saving for a down payment to understanding mortgages.",
      date: "November 5, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Eastside Community Center",
      instructor: "Sarah Thompson",
      capacity: 25,
      enrolled: 25
    }
  ];
  
  const employmentClasses = [
    {
      title: "Resume Building",
      description: "Create a powerful resume that highlights your skills and experiences to potential employers.",
      date: "October 18, 2023",
      time: "5:30 PM - 7:30 PM",
      location: "P.I.L.L.A.R. Community Center",
      instructor: "David Garcia",
      capacity: 15,
      enrolled: 8
    },
    {
      title: "Interview Skills",
      description: "Practice and prepare for job interviews with confidence-building techniques and mock interviews.",
      date: "October 25, 2023",
      time: "5:30 PM - 7:30 PM",
      location: "P.I.L.L.A.R. Community Center",
      instructor: "Michelle Lee",
      capacity: 15,
      enrolled: 12
    },
    {
      title: "Workplace Communication",
      description: "Develop effective communication skills for the workplace to advance your career.",
      date: "November 8, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Downtown Branch Office",
      instructor: "Robert Johnson",
      capacity: 18,
      enrolled: 7
    }
  ];
  
  const lifeSkillsClasses = [
    {
      title: "Stress Management",
      description: "Learn techniques to manage stress and maintain your mental well-being during challenging times.",
      date: "October 19, 2023",
      time: "6:00 PM - 7:30 PM",
      location: "P.I.L.L.A.R. Community Center",
      instructor: "Dr. Lisa Chen",
      capacity: 20,
      enrolled: 16
    },
    {
      title: "Healthy Cooking on a Budget",
      description: "Discover how to prepare nutritious meals without breaking the bank.",
      date: "October 26, 2023",
      time: "5:00 PM - 7:00 PM",
      location: "Eastside Community Center",
      instructor: "Chef Michael Brown",
      capacity: 15,
      enrolled: 15
    },
    {
      title: "Digital Literacy",
      description: "Build essential computer skills for job searching, online banking, and more.",
      date: "November 2, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "P.I.L.L.A.R. Computer Lab",
      instructor: "Taylor Williams",
      capacity: 12,
      enrolled: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Classes & Workshops</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Build skills for housing stability, financial independence, and personal growth through our free educational programs.
            </p>
          </div>
        </section>

        {/* Financial Education */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Financial Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {financialClasses.map((classItem, index) => (
                <ClassCard key={index} {...classItem} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Employment Skills */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Employment Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {employmentClasses.map((classItem, index) => (
                <ClassCard key={index} {...classItem} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Life Skills */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Life Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lifeSkillsClasses.map((classItem, index) => (
                <ClassCard key={index} {...classItem} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Become an Instructor */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Become an Instructor</h2>
              <p className="text-gray-700">
                Share your expertise and make a difference in someone's life by volunteering to teach a class or workshop.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">We're Looking For:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Financial advisors</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>HR professionals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Mental health counselors</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Chefs and nutritionists</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>IT professionals</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Benefits of Teaching:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Make a direct impact on someone's path to stability</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Gain valuable teaching experience</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Build your professional network</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Volunteer hours for professional development</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700">Apply to Become an Instructor</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Classes;
