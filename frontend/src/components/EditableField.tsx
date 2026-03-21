import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../context/resumeBuilder/ResumeContext';

interface EditableFieldProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  entity?: string;
  field?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  onChange, 
  className = '', 
  multiline = false,
  placeholder = '',
  entity,
  field
}) => {
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const { getPermissions } = useResume();
  
  // Field-Level Security (FLS) Evaluation
  const options = (entity && field) ? getPermissions(entity, field) : ["read", "update"];

  // Auto-resize textarea to fit content
  useEffect(() => {
    if (multiline && ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value, multiline, isEditing]);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  // 1. Invisible Entity - Unauthorized to Read
  if (!options.includes("read")) {
    return null;
  }

  // 2. Read-Only Entity - Unauthorized to Update
  const canUpdate = options.includes("update");
  if (!canUpdate) {
    return <span className={`cursor-not-allowed opacity-80 ${className}`}>{value || placeholder}</span>;
  }

  // These styles ensure the input blends into the text but highlights on hover/focus to indicate interactivity
  const baseStyles = "w-full bg-transparent border-transparent hover:bg-gray-100/50 hover:border-gray-300 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all px-1.5 py-0.5 -mx-1.5 rounded outline-none text-inherit font-inherit leading-inherit print:p-0 print:m-0 print:border-none print:hover:bg-transparent";

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      ref.current?.blur();
    }
    if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (multiline) {
    return (
      <textarea
        ref={ref as any}
        value={isEditing ? tempValue : value}
        onChange={(e) => setTempValue(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`${baseStyles} resize-none overflow-hidden ${className}`}
        rows={1}
      />
    );
  }

  return (
    <input
      ref={ref as any}
      type="text"
      value={isEditing ? tempValue : value}
      onChange={(e) => setTempValue(e.target.value)}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={`${baseStyles} ${className}`}
    />
  );
};
