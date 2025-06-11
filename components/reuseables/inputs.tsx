
import React from 'react';
import { ChevronDown } from 'lucide-react';

// Shared constants - now with responsive values
const BORDER_RADIUS = '12px';
const DEFAULT_HEIGHT = '48px';
const MOBILE_HEIGHT = '52px'; // Larger for better touch targets
const DEFAULT_PADDING = '12px 16px';
const MOBILE_PADDING = '16px 18px'; // More padding on mobile
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
        <label className="text-sm sm:text-base font-medium text-gray-700 px-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="text-sm text-red-500 px-1">{error}</span>
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

export const Input: React.FC<InputProps> = ({
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
    sm: { 
      height: '40px', 
      padding: '8px 12px', 
      fontSize: '14px',
      // Mobile adjustments
      '@media (max-width: 640px)': {
        height: '44px',
        padding: '12px 14px',
        fontSize: '16px' // Prevents zoom on iOS
      }
    },
    md: { 
      height: DEFAULT_HEIGHT, 
      padding: DEFAULT_PADDING, 
      fontSize: DEFAULT_FONT_SIZE,
      '@media (max-width: 640px)': {
        height: MOBILE_HEIGHT,
        padding: MOBILE_PADDING
      }
    },
    lg: { 
      height: '56px', 
      padding: '20px 24px', 
      fontSize: '18px',
      '@media (max-width: 640px)': {
        height: '60px',
        padding: '20px 20px'
      }
    }
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
          ${size === 'sm' ? 'h-10 sm:h-10 px-3 sm:px-3 text-sm sm:text-sm' : ''}
          ${size === 'md' ? 'h-13 sm:h-12 px-4 sm:px-4 text-base' : ''}
          ${size === 'lg' ? 'h-15 sm:h-14 px-5 sm:px-6 text-lg' : ''}
          ${error 
            ? 'border-red-300 focus:border-red-500' 
            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'}
          placeholder:text-gray-400
          touch-manipulation
        `}
        style={inputStyles}
      />
      {hasPromptText && promptText && (
        <div className='flex gap-2 items-start px-1'>
          <span className='h-4 w-4 flex items-center justify-center rounded-full text-[10px] text-white bg-gray-500 flex-shrink-0 mt-0.5'>!</span>
          <span className='text-sm text-gray-500 leading-relaxed'>{promptText}</span>
        </div>
      )}
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

export const Select: React.FC<SelectProps> = ({
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
    sm: { 
      height: '40px', 
      padding: '8px 12px', 
      fontSize: '14px',
      paddingRight: '36px'
    },
    md: { 
      height: DEFAULT_HEIGHT, 
      padding: DEFAULT_PADDING, 
      fontSize: DEFAULT_FONT_SIZE,
      paddingRight: '44px'
    },
    lg: { 
      height: '56px', 
      padding: '16px 20px', 
      fontSize: '18px',
      paddingRight: '48px'
    }
  };

  const selectStyles = {
    borderRadius: BORDER_RADIUS,
    fontWeight: DEFAULT_FONT_WEIGHT,
    transition: 'all 0.2s ease-in-out',
    ...sizeStyles[size],
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
            ${size === 'sm' ? 'h-10 sm:h-10 px-3 sm:px-3 pr-9 sm:pr-9 text-sm sm:text-sm' : ''}
            ${size === 'md' ? 'h-13 sm:h-12 px-4 sm:px-4 pr-11 sm:pr-11 text-base' : ''}
            ${size === 'lg' ? 'h-15 sm:h-14 px-5 sm:px-5 pr-12 sm:pr-12 text-lg' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'}
            touch-manipulation
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
              className="py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom Chevron - responsive sizing */}
        {!multiple && (
          <div className="absolute right-3 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className={`
              ${size === 'sm' ? 'w-4 h-4' : ''}
              ${size === 'md' ? 'w-5 h-5' : ''}
              ${size === 'lg' ? 'w-6 h-6' : ''}
              ${disabled ? 'text-gray-400' : 'text-gray-500'}
            `} />
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

export const Textarea: React.FC<TextareaProps> = ({
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
          px-4 py-3 sm:px-4 sm:py-3
          text-base leading-relaxed
          min-h-[100px] sm:min-h-[120px]
          ${error 
            ? 'border-red-300 focus:border-red-500' 
            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'}
          placeholder:text-gray-400
          touch-manipulation
        `}
        style={textareaStyles}
      />
    </FieldWrapper>
  );
};