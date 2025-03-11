
import React from "react";
import { Loader2, ExternalLink } from "lucide-react";

interface StripeLoadingIndicatorProps {
  message?: string;
  onCancel?: () => void;
  elapsedTime?: number;
}

const StripeLoadingIndicator: React.FC<StripeLoadingIndicatorProps> = ({ 
  message = "Connecting to payment processor...",
  onCancel,
  elapsedTime = 0
}) => {
  // Show different messages based on elapsed time
  const getLoadingMessage = () => {
    if (elapsedTime > 10) {
      return "Still trying to connect. This is taking longer than expected...";
    }
    if (elapsedTime > 5) {
      return "Preparing your secure checkout experience...";
    }
    return message;
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <div className="relative flex items-center justify-center w-16 h-16">
        <Loader2 className="w-12 h-12 text-redcross animate-spin" />
      </div>
      <p className="text-center text-gray-700">{getLoadingMessage()}</p>
      
      {elapsedTime > 8 && onCancel && (
        <button 
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-700 underline mt-2"
        >
          Cancel and try again
        </button>
      )}
      
      <div className="flex items-center mt-2 text-xs text-gray-500">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
          alt="Stripe" 
          className="h-6 mr-2"
        />
        <span className="flex items-center">
          Secure payment processing
          <a 
            href="https://stripe.com/docs/security" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center ml-1 text-redcross hover:underline"
          >
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default StripeLoadingIndicator;
