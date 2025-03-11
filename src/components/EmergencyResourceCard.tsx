
import React from "react";
import { ExternalLink, MapPin, Phone } from "lucide-react";

interface ResourceLocation {
  id: number;
  name: string;
  category: "shelter" | "healthcare" | "food" | "crisis";
  address: string;
  phone: string;
  zipCode: string;
  city: string;
  state: string;
  website: string;
}

interface EmergencyResourceCardProps {
  resource: ResourceLocation;
}

const EmergencyResourceCard = ({ resource }: EmergencyResourceCardProps) => {
  return (
    <div className="bg-black/60 backdrop-blur-xl p-6 rounded-lg shadow-[0_4px_20px_rgba(255,0,0,0.07)] border border-red-500/20 hover:border-red-500/40 transition-all duration-500 group animate-slide-in relative overflow-hidden">
      {/* Tech details */}
      <div className="absolute top-0 right-0 h-8 w-16 overflow-hidden">
        <div className="absolute top-0 right-0 h-8 w-16 bg-red-500/20 rotate-45 translate-y-[-50%] translate-x-[50%]"></div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 flex items-center text-white group-hover:text-red-300 transition-colors">
        <MapPin className="h-5 w-5 text-red-500 mr-2" />
        {resource.name}
      </h3>
      <p className="text-gray-300 mb-2">{resource.address}</p>
      <p className="text-gray-300 mb-4">{resource.city}, {resource.state} {resource.zipCode}</p>
      <div className="space-y-2">
        <div className="flex items-center">
          <Phone className="h-4 w-4 text-red-500 mr-2" />
          <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} className="group relative inline-block">
            <span className="font-medium text-gray-200 group-hover:text-red-300 transition-colors">{resource.phone}</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-red-500/30 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </a>
        </div>
        <div className="flex items-center">
          <ExternalLink className="h-4 w-4 text-red-500 mr-2" />
          <a href={resource.website} className="text-red-400 hover:text-red-300 relative inline-block group" target="_blank" rel="noreferrer">
            <span>{resource.website.replace(/^https?:\/\/(www\.)?/i, '')}</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-red-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResourceCard;
