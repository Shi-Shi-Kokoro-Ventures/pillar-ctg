
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
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
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
        </div>
      </div>
      
      <div className="border border-form-border rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="bg-gray-50 border-b border-form-border/50 px-3 py-1.5 text-xs text-gray-500">
          Draw your signature below
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
      
      {isEmpty && (
        <p className="text-gray-500 text-sm italic">Please sign above by clicking and dragging</p>
      )}
    </div>
  );
};

export default DigitalSignature;
