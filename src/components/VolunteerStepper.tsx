
import React from "react";
import { Check, CircleCheck } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const VolunteerStepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > index
                    ? "bg-green-500 border-green-500 text-white"
                    : currentStep === index
                    ? "border-redcross text-redcross font-bold"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {currentStep > index ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm ${
                  currentStep >= index ? "text-gray-700 font-medium" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > index ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VolunteerStepper;
