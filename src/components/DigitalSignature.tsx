
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw, Save, Signature } from "lucide-react";

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
    
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0284c7";
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

  // Prevent scrolling when drawing on mobile
  const preventScroll = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <Label className="flex items-center text-base font-medium">
          <Signature className="h-4 w-4 mr-2 text-redcross" />
          Digital Signature
        </Label>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSignature}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={580}
          height={150}
          className="w-full h-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          onTouchCancel={endDrawing}
          onTouchMove={preventScroll}
          style={{ backgroundColor: "white" }}
        />
      </div>
      
      {isEmpty && (
        <p className="text-gray-500 text-sm italic">Please sign above by clicking and dragging</p>
      )}
    </div>
  );
};

export default DigitalSignature;
