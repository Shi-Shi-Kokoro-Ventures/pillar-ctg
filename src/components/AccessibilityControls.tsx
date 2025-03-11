
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Type, 
  MousePointer2,
  Settings,
  CircleIcon,
  SquareIcon,
  FocusIcon
} from "lucide-react";

const AccessibilityControls = () => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [cursorSize, setCursorSize] = useState<'normal' | 'large'>('normal');
  const [isVisible, setIsVisible] = useState(false);
  const [focusVisible, setFocusVisible] = useState(true);
  const [useRoundedCorners, setUseRoundedCorners] = useState(true);
  
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
  
  // Toggle focus outlines visibility
  useEffect(() => {
    if (!focusVisible) {
      document.documentElement.classList.add('no-focus-outline');
    } else {
      document.documentElement.classList.remove('no-focus-outline');
    }
    // Save preference
    localStorage.setItem('accessibility_focusVisible', focusVisible.toString());
  }, [focusVisible]);
  
  // Toggle rounded corners
  useEffect(() => {
    if (useRoundedCorners) {
      document.documentElement.classList.add('use-rounded-corners');
      document.documentElement.classList.remove('use-square-corners');
    } else {
      document.documentElement.classList.remove('use-rounded-corners');
      document.documentElement.classList.add('use-square-corners');
    }
    // Save preference
    localStorage.setItem('accessibility_roundedCorners', useRoundedCorners.toString());
  }, [useRoundedCorners]);
  
  // Load saved preferences on component mount
  useEffect(() => {
    // Only apply saved settings once component mounts
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
    
    const savedVisibility = localStorage.getItem('accessibility_visible');
    if (savedVisibility) {
      setIsVisible(savedVisibility === 'true');
    }
    
    const savedFocusVisible = localStorage.getItem('accessibility_focusVisible');
    if (savedFocusVisible) {
      setFocusVisible(savedFocusVisible === 'true');
    }
    
    const savedRoundedCorners = localStorage.getItem('accessibility_roundedCorners');
    if (savedRoundedCorners) {
      setUseRoundedCorners(savedRoundedCorners === 'true');
    }
    
    // Make sure default styles are applied correctly on initial load
    if (!savedFocusVisible || savedFocusVisible === 'true') {
      document.documentElement.classList.remove('no-focus-outline');
    } else {
      document.documentElement.classList.add('no-focus-outline');
    }
    
    if (!savedRoundedCorners || savedRoundedCorners === 'true') {
      document.documentElement.classList.add('use-rounded-corners');
      document.documentElement.classList.remove('use-square-corners');
    } else {
      document.documentElement.classList.remove('use-rounded-corners');
      document.documentElement.classList.add('use-square-corners');
    }
    
    // Add cleanup function
    return () => {
      // Reset document styles when component unmounts
      document.documentElement.style.fontSize = '';
      document.documentElement.classList.remove('high-contrast-mode');
      document.documentElement.classList.remove('no-focus-outline');
      document.documentElement.classList.remove('use-rounded-corners');
      document.documentElement.classList.remove('use-square-corners');
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
  
  const toggleFocusOutline = () => {
    setFocusVisible(!focusVisible);
  };
  
  const toggleCornerStyle = () => {
    setUseRoundedCorners(!useRoundedCorners);
  };
  
  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem('accessibility_visible', newVisibility.toString());
  };

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col items-end" role="region" aria-label="Accessibility controls">
      {/* Accessibility toggle button - always visible with improved styling */}
      <Button 
        variant="default" 
        size="default" 
        onClick={toggleVisibility}
        aria-label="Toggle accessibility controls"
        title="Accessibility Settings"
        className="shadow-lg flex items-center gap-2 font-medium bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Settings className="h-4 w-4" />
        <span>Accessibility</span>
      </Button>
      
      {/* Accessibility controls panel - only visible when toggled on */}
      {isVisible && (
        <div 
          className="accessibility-controls mt-2 flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md border border-gray-200"
          aria-label="Accessibility controls"
          role="toolbar"
        >
          <div className="text-sm font-semibold mb-2 text-center">Accessibility Controls</div>
          
          <div className="flex gap-2 justify-between items-center">
            <span className="text-xs">Font Size</span>
            <div className="flex gap-1">
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
                variant="outline" 
                size="icon" 
                onClick={increaseFontSize}
                aria-label="Increase font size"
                title="Increase font size"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 justify-between items-center">
            <span className="text-xs">Contrast</span>
            <Button 
              variant={highContrast ? "default" : "outline"} 
              size="sm" 
              onClick={toggleHighContrast}
              aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
              title={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
              aria-pressed={highContrast}
              className="w-24"
            >
              {highContrast ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
              {highContrast ? "High" : "Normal"}
            </Button>
          </div>
          
          <div className="flex gap-2 justify-between items-center">
            <span className="text-xs">Cursor</span>
            <Button 
              variant={cursorSize === 'large' ? "default" : "outline"} 
              size="sm" 
              onClick={toggleCursorSize}
              aria-label={cursorSize === 'large' ? "Use normal cursor" : "Use large cursor"}
              title={cursorSize === 'large' ? "Use normal cursor" : "Use large cursor"}
              aria-pressed={cursorSize === 'large'}
              className="w-24"
            >
              <MousePointer2 className="h-4 w-4 mr-2" />
              {cursorSize === 'large' ? "Large" : "Normal"}
            </Button>
          </div>
          
          <div className="flex gap-2 justify-between items-center">
            <span className="text-xs">Focus Outline</span>
            <Button 
              variant={focusVisible ? "outline" : "default"} 
              size="sm" 
              onClick={toggleFocusOutline}
              aria-label={focusVisible ? "Hide focus outlines" : "Show focus outlines"}
              title={focusVisible ? "Hide focus outlines" : "Show focus outlines"}
              aria-pressed={!focusVisible}
              className="w-24"
            >
              <FocusIcon className="h-4 w-4 mr-2" />
              {focusVisible ? "Show" : "Hide"}
            </Button>
          </div>
          
          <div className="flex gap-2 justify-between items-center">
            <span className="text-xs">Corners</span>
            <Button 
              variant={useRoundedCorners ? "outline" : "default"} 
              size="sm"
              onClick={toggleCornerStyle}
              aria-label={useRoundedCorners ? "Use square corners" : "Use rounded corners"}
              title={useRoundedCorners ? "Use square corners" : "Use rounded corners"}
              aria-pressed={!useRoundedCorners}
              className="w-24"
            >
              {useRoundedCorners ? <CircleIcon className="h-4 w-4 mr-2" /> : <SquareIcon className="h-4 w-4 mr-2" />}
              {useRoundedCorners ? "Rounded" : "Square"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityControls;
