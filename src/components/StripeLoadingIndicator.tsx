
import React from "react";
import { Loader2 } from "lucide-react";

interface StripeLoadingIndicatorProps {
  message?: string;
}

const StripeLoadingIndicator: React.FC<StripeLoadingIndicatorProps> = ({ 
  message = "Connecting to payment processor..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <div className="relative flex items-center justify-center w-16 h-16">
        <Loader2 className="w-12 h-12 text-redcross animate-spin" />
      </div>
      <p className="text-center text-gray-700">{message}</p>
      <div className="flex items-center mt-2 text-xs text-gray-500">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
          alt="Stripe" 
          className="h-6 mr-2"
        />
        Secure payment processing
      </div>
    </div>
  );
};

export default StripeLoadingIndicator;
