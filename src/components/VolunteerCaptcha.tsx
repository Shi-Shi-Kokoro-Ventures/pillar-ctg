
import React, { useState, useEffect } from "react";
import { RefreshCcw, CheckCircle, ShieldCheck, Lock } from "lucide-react";
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
    <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-white/20 backdrop-blur-xl bg-gradient-to-br from-blue-500/5 to-purple-500/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
      <div className="text-center mb-4">
        <h3 className="font-medium text-lg flex items-center justify-center gap-2">
          <ShieldCheck className="text-blue-500 h-5 w-5" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">Security Verification</span>
        </h3>
        <p className="text-sm text-gray-600">Please enter the text shown below</p>
      </div>

      {verified ? (
        <div className="flex flex-col items-center justify-center text-green-500 py-4 animate-fade-in space-y-3">
          <div className="p-4 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/20 backdrop-blur-sm">
            <CheckCircle className="w-10 h-10 animate-pulse" />
          </div>
          <span className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">Verification successful</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-800/40 p-5 rounded-lg select-none text-lg font-mono tracking-widest text-white shadow-xl border border-white/10 overflow-hidden">
                {captchaText.split("").map((char, index) => (
                  <span 
                    key={index}
                    className="inline-block transform transition-all"
                    style={{
                      transform: `rotate(${Math.random() * 8 - 4}deg)`,
                      marginLeft: `${Math.random() * 3}px`,
                      textShadow: "0 0 5px rgba(255,255,255,0.3)",
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {char}
                  </span>
                ))}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bg-white/10"
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
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={generateCaptcha}
              className="ml-3 bg-transparent border border-white/20 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              type="button"
              aria-label="Generate new captcha"
            >
              <RefreshCcw className="h-4 w-4 text-blue-500" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`w-full p-3 pl-10 border rounded-lg bg-white/5 backdrop-blur-xl text-gray-800 border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} hover:border-blue-300/50`}
                placeholder="Enter the text above"
              />
              {error && <p className="text-red-500 text-sm mt-1 animate-fade-in">Incorrect captcha. Please try again.</p>}
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white backdrop-blur-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 border border-white/10 relative overflow-hidden group"
              type="button"
            >
              <span className="relative z-10">Verify</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              <span className="absolute inset-0 w-1/3 h-full bg-white/20 skew-x-[-45deg] -translate-x-full z-0 group-hover:animate-shimmer"></span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VolunteerCaptcha;
