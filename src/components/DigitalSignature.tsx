
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw, Save, Signature, Info } from "lucide-react";

interface DigitalSignatureProps {
  onChange: (signatureData: string | null) => void;
  value: string | null;
  className?: string;
}

const DigitalSignature: React.FC<DigitalSignatureProps> = ({
  onChange,
  value,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!value);

  // Initialize canvas with existing signature if available
  React.useEffect(() => {
    if (value && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setIsEmpty(false);
          }
        }
      };
      img.src = value;
    }
  }, [value]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    setIsEmpty(false);
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.beginPath();
    
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    } else {
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
    
    ctx.lineWidth = 3; // Increased line width for better visibility
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1EAEDB"; // Updated to match the redcross color theme
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    if ('touches' in e) {
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    } else {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
    
    ctx.stroke();
  };

  const endDrawing = () => {
    if (!isDrawing || !canvasRef.current) return;
    
    setIsDrawing(false);
    
    const signatureData = canvasRef.current.toDataURL("image/png");
    onChange(signatureData);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onChange(null);
  };

  const saveSignature = () => {
    if (isEmpty || !canvasRef.current) return;
    
    const signatureData = canvasRef.current.toDataURL("image/png");
    onChange(signatureData);
  };

  // Prevent scrolling when drawing on mobile
  const preventScroll = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <Label className="flex items-center text-base font-medium text-form-label">
          <Signature className="h-4 w-4 mr-2 text-redcross" />
          Digital Signature
        </Label>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSignature}
            className="flex items-center gap-1 text-sm border-redcross/30 hover:bg-redcross/5 hover:text-redcross transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Clear
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={saveSignature}
            disabled={isEmpty}
            className="flex items-center gap-1 text-sm border-redcross/30 hover:bg-redcross/5 hover:text-redcross transition-colors disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>
      </div>
      
      <div className="border border-form-border rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="bg-gray-50 border-b border-form-border/50 px-3 py-1.5 text-xs text-gray-500 flex items-center justify-between">
          <span>Draw your signature below</span>
          <button 
            type="button" 
            className="text-redcross hover:text-redcross-dark flex items-center gap-1 text-xs"
            onClick={() => alert("Your signature confirms that you understand and agree to the terms of this application. This electronic signature has the same legal validity as a handwritten signature.")}
          >
            <Info className="h-3 w-3" /> Signature Information
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={580}
          height={150}
          className="w-full h-full touch-none cursor-crosshair bg-[linear-gradient(to_bottom,transparent_0%,transparent_97%,#e0e0e0_97%,#e0e0e0_100%)] bg-[length:100%_30px]"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={(e) => {
            draw(e);
            preventScroll(e);
          }}
          onTouchEnd={endDrawing}
          onTouchCancel={endDrawing}
        />
      </div>
      
      <div className="space-y-2">
        {isEmpty && (
          <p className="text-gray-500 text-sm italic">Please sign above by clicking and dragging</p>
        )}
        
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
          <p className="mb-1.5 font-medium text-gray-700">By signing, you confirm that:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>All information provided in this application is true and complete to the best of your knowledge.</li>
            <li>You authorize verification of all information provided, including contacting employers, landlords, or other parties as needed.</li>
            <li>You understand that providing false information may result in denial of assistance and possible legal action.</li>
            <li>You agree to provide all necessary documentation to verify your eligibility upon request.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignature;
