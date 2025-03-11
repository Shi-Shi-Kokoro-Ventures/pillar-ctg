import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ZipCodeSearch from "@/components/ZipCodeSearch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Housing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [zipCode, setZipCode] = useState<string | null>(null);

  const handleSearch = async (zip: string) => {
    setIsLoading(true);
    setZipCode(zip);

    // Simulate fetching resources based on zip code
    setTimeout(() => {
      const fakeResources = [
        { id: 1, name: "Shelter A", description: "Emergency shelter", zipCode: zip },
        { id: 2, name: "Food Bank B", description: "Provides food assistance", zipCode: zip },
      ];
      setResources(fakeResources);
      setIsLoading(false);

      if (fakeResources.length === 0) {
        toast.error("No resources found for this zip code.");
      } else {
        toast.success(`Found ${fakeResources.length} resources for zip code ${zip}`);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Housing Resources</h1>
          <p className="text-gray-600">Enter your zip code to find local housing resources.</p>
          <ZipCodeSearch onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {resources.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Resources Found</h2>
            <ul>
              {resources.map((resource) => (
                <li key={resource.id} className="mb-4 p-4 border rounded-md">
                  <h3 className="text-xl font-semibold">{resource.name}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                  <p className="text-gray-600">Zip Code: {resource.zipCode}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => navigate("/housing-waitlist")} variant="outline">
              Housing Waitlist
            </Button>
            <Button onClick={() => navigate("/affordable-housing")} variant="outline">
              Affordable Housing
            </Button>
            <Button onClick={() => navigate("/rental-assistance")} variant="outline">
              Rental Assistance
            </Button>
            <Button onClick={() => navigate("/housing-vouchers")} variant="outline">
              Housing Vouchers
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Housing;
