
import React, { useState, useEffect } from "react";
import { RefreshCcw, CheckCircle, ShieldCheck } from "lucide-react";
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
    <div className="w-full max-w-md mx-auto p-6 neo-glass rounded-lg border border-white/10 backdrop-blur-md bg-white/10 shadow-lg transition-all duration-300">
      <div className="text-center mb-4">
        <h3 className="font-medium text-lg flex items-center justify-center gap-2">
          <ShieldCheck className="text-sky-400 h-5 w-5" />
          <span className="text-gradient-primary">Security Verification</span>
        </h3>
        <p className="text-sm text-gray-500">Please enter the text you see below</p>
      </div>

      {verified ? (
        <div className="flex items-center justify-center text-green-500 py-6 animate-fade-in">
          <div className="p-3 rounded-full bg-green-100/30 backdrop-blur-sm">
            <CheckCircle className="w-8 h-8 mr-2 animate-pulse-subtle" />
          </div>
          <span className="font-medium ml-3 text-lg">Verification successful</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 p-4 rounded-lg select-none text-lg font-mono tracking-widest text-slate-700 relative overflow-hidden border border-white/20 shadow-inner">
              {captchaText.split("").map((char, index) => (
                <span 
                  key={index}
                  className="inline-block transform animate-float"
                  style={{
                    transform: `rotate(${Math.random() * 10 - 5}deg)`,
                    marginLeft: `${Math.random() * 3}px`,
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                >
                  {char}
                </span>
              ))}
              <div className="absolute inset-0 bg-white/5"></div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-blue-500/10"
                  style={{
                    height: `${Math.random() * 100}%`,
                    width: '1px',
                    left: `${i * 12 + Math.random() * 10}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 30}deg)`,
                  }}
                ></div>
              ))}
              <div className="absolute inset-0 animate-scan opacity-20 bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ width: '20%' }}></div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={generateCaptcha}
              className="ml-3 bg-transparent border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              type="button"
              aria-label="Generate new captcha"
            >
              <RefreshCcw className="h-4 w-4 text-sky-400" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`w-full p-3 border rounded-lg bg-white/5 backdrop-blur-sm text-gray-800 border-white/20 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter the text above"
              />
              {error && <p className="text-red-500 text-sm mt-1 animate-fade-in">Incorrect captcha. Please try again.</p>}
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full button-neo bg-gradient-to-r from-blue-500/80 to-sky-400/80 hover:from-blue-500/90 hover:to-sky-500/90 transition-all duration-300 text-white backdrop-blur-sm shadow-lg border border-white/10"
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
