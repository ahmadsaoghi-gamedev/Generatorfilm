import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface FormInputProps {
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'select-with-custom';
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  rows?: number;
  allowCustom?: boolean;
  fieldKey?: string; // Add this to identify which field for localStorage
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  rows = 3,
  allowCustom = false,
  fieldKey
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [allOptions, setAllOptions] = useState<string[]>(options);

  // Load custom options from localStorage on component mount
  useEffect(() => {
    if (fieldKey && allowCustom) {
      const savedCustomOptions = localStorage.getItem(`custom_${fieldKey}`);
      if (savedCustomOptions) {
        try {
          const customOptions = JSON.parse(savedCustomOptions);
          // Merge original options with saved custom options, avoiding duplicates
          const mergedOptions = [...options];
          customOptions.forEach((customOption: string) => {
            if (!mergedOptions.includes(customOption)) {
              mergedOptions.push(customOption);
            }
          });
          setAllOptions(mergedOptions);
        } catch (error) {
          console.error('Error loading custom options:', error);
        }
      }
    }
  }, [fieldKey, allowCustom, options]);

  const baseClasses = "w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200";

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      const newCustomValue = customValue.trim();
      
      // Add to options if not already present
      if (!allOptions.includes(newCustomValue)) {
        const updatedOptions = [...allOptions, newCustomValue];
        setAllOptions(updatedOptions);
        
        // Save custom options to localStorage
        if (fieldKey) {
          const customOptions = updatedOptions.filter(option => !options.includes(option));
          localStorage.setItem(`custom_${fieldKey}`, JSON.stringify(customOptions));
        }
      }
      
      // Set as selected value
      onChange(newCustomValue);
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      {type === 'select' || type === 'select-with-custom' ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`${baseClasses} ${allowCustom ? 'flex-1' : ''}`}
              required={required}
            >
              <option value="">Select {label}</option>
              {allOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
            {allowCustom && (
              <button
                type="button"
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                title="Add custom option"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
          
          {allowCustom && showCustomInput && (
            <div className="flex gap-2">
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Enter custom ${label.toLowerCase()}`}
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-200"
                autoFocus
              />
              <button
                type="button"
                onClick={handleCustomSubmit}
                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomValue('');
                }}
                className="px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
          required={required}
          rows={rows}
        />
      ) : (
        <div className="relative">
          <div className="flex gap-2">
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`${baseClasses} ${allowCustom ? 'flex-1' : ''}`}
              required={required}
            />
            
            {allowCustom && (
              <button
                type="button"
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                title="Add custom option"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
          
          {allowCustom && showCustomInput && (
            <div className="absolute top-full left-0 right-0 mt-2 flex gap-2 z-10">
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Enter custom ${label.toLowerCase()}`}
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-200"
                autoFocus
              />
              <button
                type="button"
                onClick={handleCustomSubmit}
                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};