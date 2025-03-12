
import React from "react";
import { Check, ArrowRight } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const VolunteerStepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6 mb-8 overflow-hidden">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                  currentStep > index
                    ? "bg-gradient-to-br from-green-400 to-green-600 border-green-400 text-white shadow-lg shadow-green-400/20"
                    : currentStep === index
                    ? "bg-gradient-to-br from-redcross to-redcross-dark border-redcross text-white shadow-lg shadow-redcross/20"
                    : "bg-white/10 backdrop-blur-sm border-gray-300/30 text-gray-300"
                }`}
              >
                {currentStep > index ? (
                  <Check className="w-6 h-6 animate-pulse-subtle" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-3 text-xs md:text-sm transition-all duration-500 ${
                  currentStep >= index ? "text-gray-800 font-medium" : "text-gray-400"
                }`}
              >
                {step}
              </span>
              
              {currentStep === index && (
                <div className="absolute -bottom-1 w-16 h-1 bg-gradient-to-r from-redcross/30 via-redcross to-redcross/30 rounded-full animate-pulse-subtle"></div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 relative">
                <div
                  className={`h-1 mx-2 rounded-full transition-all duration-700 ${
                    currentStep > index 
                      ? "bg-gradient-to-r from-green-400 to-green-500" 
                      : "bg-gray-200"
                  }`}
                />
                
                {currentStep === index && (
                  <ArrowRight 
                    className="absolute -top-4 right-0 text-redcross animate-slide-in-right"
                    size={16}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VolunteerStepper;
