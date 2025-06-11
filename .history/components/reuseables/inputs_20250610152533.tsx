
import React from 'react';
import { ChevronDown } from 'lucide-react';

// Shared constants
const BORDER_RADIUS = '12px';
const DEFAULT_HEIGHT = '48px';
const DEFAULT_PADDING = '12px 16px';
const DEFAULT_FONT_SIZE = '16px';
const DEFAULT_FONT_WEIGHT = '400';

// Base field wrapper component
interface FieldWrapperProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  label,
  required,
  error,
  className = '',
  style = {}
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`} style={style}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

// Input Component
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  size?: 'sm' | 'md' | 'lg';
  hasPromptText?: boolean; 
    promptText?: string; 
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onFocus,
  onBlur,
  className = '',
  style = {},
  disabled = false,
  required = false,
  label,
  error,
  name,
  id,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  size = 'md',
    hasPromptText = false, 
    promptText = '' 
}) => {
  const sizeStyles = {
    sm: { height: '40px', padding: '8px 12px', fontSize: '14px' },
    md: { height: DEFAULT_HEIGHT, padding: DEFAULT_PADDING, fontSize: DEFAULT_FONT_SIZE },
    lg: { height: '56px', padding: '16px 20px', fontSize: '18px' }
  };

  const inputStyles = {
    borderRadius: BORDER_RADIUS,
    fontWeight: DEFAULT_FONT_WEIGHT,
    transition: 'all 0.2s ease-in-out',
    ...sizeStyles[size],
    ...style
  };

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        id={id}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        disabled={disabled}
        required={required}
        className={`
          w-full border-2 outline-none
          ${error 
            ? 'border-red-300 focus:border-red-500' 
            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'}
          placeholder:text-gray-400
        `}
        style={inputStyles}
      />
      {
        hasPromptText && promptText && (
          <div className='flex gap-2'>
            <span className='p-1 rounded-full text-[10px] text-white bg-secondary-text'>!</span>
            <span className='text-sm text-gray-500'>{promptText}</span>
          </div>
        )
      }
    </FieldWrapper>
  );
};

// Select Option Interface
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Select Component
interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  name?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  multiple?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  style = {},
  disabled = false,
  required = false,
  label,
  error,
  name,
  id,
  size = 'md',
  multiple = false
}) => {
  const sizeStyles = {
    sm: { height: '40px', padding: '8px 12px', fontSize: '14px' },
    md: { height: DEFAULT_HEIGHT, padding: DEFAULT_PADDING, fontSize: DEFAULT_FONT_SIZE },
    lg: { height: '56px', padding: '16px 20px', fontSize: '18px' }
  };

  const selectStyles = {
    borderRadius: BORDER_RADIUS,
    fontWeight: DEFAULT_FONT_WEIGHT,
    transition: 'all 0.2s ease-in-out',
    ...sizeStyles[size],
    paddingRight: '40px', // Space for chevron
    ...style
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const selectedValue = e.target.value;
      onChange(selectedValue);
    }
  };

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          name={name}
          id={id}
          disabled={disabled}
          required={required}
          multiple={multiple}
          className={`
            w-full border-2 outline-none appearance-none cursor-pointer
            ${error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'}
          `}
          style={selectStyles}
        >
          {!multiple && placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom Chevron */}
        {!multiple && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className={`w-5 h-5 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};

// Textarea Component
interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  name?: string;
  id?: string;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder = '',
  value,
  onChange,
  onFocus,
  onBlur,
  className = '',
  style = {},
  disabled = false,
  required = false,
  label,
  error,
  name,
  id,
  rows = 4,
  maxLength,
  minLength,
  resize = 'vertical'
}) => {
  const textareaStyles = {
    borderRadius: BORDER_RADIUS,
    padding: DEFAULT_PADDING,
    fontSize: DEFAULT_FONT_SIZE,
    fontWeight: DEFAULT_FONT_WEIGHT,
    transition: 'all 0.2s ease-in-out',
    resize,
    ...style
  };

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        id={id}
        rows={rows}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        required={required}
        className={`
          w-full border-2 outline-none
          ${error 
            ? 'border-red-300 focus:border-red-500' 
            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'}
          placeholder:text-gray-400
        `}
        style={textareaStyles}
      />
    </FieldWrapper>
  );
};

export { Input, Select, Textarea, FieldWrapper };
export type { InputProps, SelectProps, TextareaProps, FieldWrapperProps, SelectOption };