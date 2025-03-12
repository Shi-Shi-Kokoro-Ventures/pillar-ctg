
import React, { useState, useEffect } from "react";
import { RefreshCcw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

const VolunteerCaptcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
    setVerified(false);
    setError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = () => {
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setVerified(true);
      setError(false);
      onVerify(true);
    } else {
      setError(true);
      onVerify(false);
      generateCaptcha();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg border shadow-sm">
      <div className="text-center mb-4">
        <h3 className="font-medium text-lg">Verify you're human</h3>
        <p className="text-sm text-gray-500">Please enter the text you see below</p>
      </div>

      {verified ? (
        <div className="flex items-center justify-center text-green-500 py-4">
          <CheckCircle className="w-6 h-6 mr-2" />
          <span className="font-medium">Verification successful</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-100 to-gray-100 p-3 rounded select-none text-lg font-mono tracking-widest text-slate-700 relative overflow-hidden">
              {captchaText.split("").map((char, index) => (
                <span 
                  key={index}
                  className="inline-block transform"
                  style={{
                    transform: `rotate(${Math.random() * 10 - 5}deg)`,
                    marginLeft: `${Math.random() * 3}px`,
                  }}
                >
                  {char}
                </span>
              ))}
              <div className="absolute inset-0 bg-white/10"></div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-blue-500/5"
                  style={{
                    height: `${Math.random() * 50 + 10}%`,
                    width: '1px',
                    left: `${i * 16 + Math.random() * 10}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 30}deg)`,
                  }}
                ></div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={generateCaptcha}
              className="ml-2"
              type="button"
              aria-label="Generate new captcha"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter the text above"
              />
              {error && <p className="text-red-500 text-sm mt-1">Incorrect captcha. Please try again.</p>}
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full"
              type="button"
            >
              Verify
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VolunteerCaptcha;
