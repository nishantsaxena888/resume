import React, { useState } from 'react';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';

interface SchemaFormProps {
  schema: z.ZodObject<any>;
  defaultValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
  error?: string;
  clearError?: () => void;
}

export function UniversalSchemaForm({ 
  schema, 
  defaultValues = {}, 
  onSubmit, 
  submitLabel = "Submit",
  error = "",
  clearError
}: SchemaFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues);

  // Dynamically iterate across the JSON Schema's Zod shape
  const fields = Object.entries(schema.shape);

  const handleChange = (key: string, value: string) => {
    if (clearError) clearError();
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium rounded-xl">
          {error}
        </div>
      )}

      {fields.map(([key, zodField]: [string, any]) => {
        const isPassword = key.toLowerCase().includes('password');
        const isRequired = !zodField.isOptional();
        const displayLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        return (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
               <label htmlFor={key} className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                 {displayLabel}
               </label>
               {isPassword && (
                 <a href="#" className="text-xs font-medium text-rose-600 hover:text-rose-700">Forgot password?</a>
               )}
            </div>
            <input
              id={key}
              name={key}
              type={isPassword ? 'password' : 'text'}
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={`Enter ${displayLabel}`}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              required={isRequired}
            />
          </div>
        );
      })}

      <button 
        type="submit" 
        className="w-full py-3.5 cursor-pointer bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] active:translate-y-0 active:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group mt-8"
      >
        {submitLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
