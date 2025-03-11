
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Type, 
  MousePointer2 
} from "lucide-react";

const AccessibilityControls = () => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [cursorSize, setCursorSize] = useState<'normal' | 'large'>('normal');
  
  // Apply font size changes to the document
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    // Save preference
    localStorage.setItem('accessibility_fontSize', fontSize.toString());
  }, [fontSize]);
  
  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast-mode');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
    }
    // Save preference
    localStorage.setItem('accessibility_highContrast', highContrast.toString());
  }, [highContrast]);
  
  // Apply cursor size changes
  useEffect(() => {
    if (cursorSize === 'large') {
      document.body.classList.add('large-cursor');
    } else {
      document.body.classList.remove('large-cursor');
    }
    // Save preference
    localStorage.setItem('accessibility_cursorSize', cursorSize);
  }, [cursorSize]);
  
  // Load saved preferences on component mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility_fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
    
    const savedHighContrast = localStorage.getItem('accessibility_highContrast');
    if (savedHighContrast) {
      setHighContrast(savedHighContrast === 'true');
    }
    
    const savedCursorSize = localStorage.getItem('accessibility_cursorSize') as 'normal' | 'large';
    if (savedCursorSize) {
      setCursorSize(savedCursorSize);
    }
    
    // Add cleanup function
    return () => {
      // Reset document styles when component unmounts
      document.documentElement.style.fontSize = '';
      document.documentElement.classList.remove('high-contrast-mode');
      document.body.classList.remove('large-cursor');
    };
  }, []);
  
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 1);
    }
  };
  
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 1);
    }
  };
  
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };
  
  const toggleCursorSize = () => {
    setCursorSize(cursorSize === 'normal' ? 'large' : 'normal');
  };

  return (
    <div 
      className="accessibility-controls fixed right-4 top-24 z-50 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-md border border-gray-200"
      aria-label="Accessibility controls"
      role="toolbar"
    >
      <Button 
        variant="outline" 
        size="icon" 
        onClick={increaseFontSize}
        aria-label="Increase font size"
        title="Increase font size"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={decreaseFontSize}
        aria-label="Decrease font size"
        title="Decrease font size"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <Button 
        variant={highContrast ? "default" : "outline"} 
        size="icon" 
        onClick={toggleHighContrast}
        aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
        title={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
        aria-pressed={highContrast}
      >
        {highContrast ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
      
      <Button 
        variant={cursorSize === 'large' ? "default" : "outline"} 
        size="icon" 
        onClick={toggleCursorSize}
        aria-label={cursorSize === 'large' ? "Use normal cursor" : "Use large cursor"}
        title={cursorSize === 'large' ? "Use normal cursor" : "Use large cursor"}
        aria-pressed={cursorSize === 'large'}
      >
        <MousePointer2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AccessibilityControls;
