import React, { useRef, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onChange, 
  className = '', 
  multiline = false,
  placeholder = ''
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea to fit content
  useEffect(() => {
    if (multiline && ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  // These styles ensure the input blends into the text but highlights on hover/focus to indicate interactivity
  const baseStyles = "w-full bg-transparent border-transparent hover:bg-gray-100/50 hover:border-gray-300 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all px-1.5 py-0.5 -mx-1.5 rounded outline-none text-inherit font-inherit leading-inherit print:p-0 print:m-0 print:border-none print:hover:bg-transparent";

  if (multiline) {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseStyles} resize-none overflow-hidden block ${className}`}
        rows={1}
        placeholder={placeholder}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseStyles} inline-block ${className}`}
      placeholder={placeholder}
    />
  );
};
