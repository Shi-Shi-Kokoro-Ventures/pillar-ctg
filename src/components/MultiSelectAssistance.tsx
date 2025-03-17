
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  error?: boolean;
}

const MultiSelectAssistance = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  className,
  id,
  error = false,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    
    onChange(newValues);
  };

  const removeValue = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "multi-select-trigger",
          error && "border-red-500 focus:ring-red-500",
          isOpen && "ring-2 ring-blue-500 border-blue-500"
        )}
        onClick={() => setIsOpen(!isOpen)}
        id={id}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedValues.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <div className="flex-1 text-left line-clamp-1">
              {selectedValues.length === 1 
                ? selectedLabels[0] 
                : `${selectedLabels[0]} +${selectedValues.length - 1} more`}
            </div>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 opacity-70" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-70" />
        )}
      </div>

      {selectedValues.length > 0 && (
        <div className="multi-select-items-container">
          {options
            .filter((option) => selectedValues.includes(option.value))
            .map((option) => (
              <div key={option.value} className="assistance-tag">
                {option.label}
                <span 
                  className="assistance-tag-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(option.value);
                  }}
                >
                  <X size={14} />
                </span>
              </div>
            ))}
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full multi-select-container">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "checkbox-wrapper",
                selectedValues.includes(option.value) && "checkbox-selected"
              )}
              onClick={() => toggleOption(option.value)}
            >
              <Checkbox
                id={`option-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => {}}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label
                htmlFor={`option-${option.value}`}
                className="text-sm cursor-pointer flex-1 text-left"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectAssistance;
