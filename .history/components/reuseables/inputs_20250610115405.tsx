// input reusable components
import React from 'react';

const BORDER_RADIUS = '12px';
const DEFAULT_INPUT_HEIGHT = '48px';
const DEFAULT_INPUT_WIDTH = '333px';
const DEFAULT_INPUT_PADDING = '12px 8px';
const DEFAULT_INPUT_FONT_SIZE = '16px';
const DEFAULT_INPUT_FONT_WEIGHT = '400';

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    required?: boolean;
    hasLabel?: boolean;
    label?: string;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    value = '',
    onChange,
    className = '',
    style = {},
    disabled = false,
    required = false,
    hasLabel = false,
    label = ''
}) => {
    return (
        <div className={`input-container ${className}`} style={{ ...style }}>
            {hasLabel && <label className="input-label">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input-field"
                style={{
                    borderRadius: BORDER_RADIUS,
                    height: DEFAULT_INPUT_HEIGHT,
                    width: DEFAULT_INPUT_WIDTH,
                    padding: DEFAULT_INPUT_PADDING,
                    fontSize: DEFAULT_INPUT_FONT_SIZE,
                    fontWeight: DEFAULT_INPUT_FONT_WEIGHT,
                    pointerEvents: disabled ? 'none' : undefined,
                    opacity: disabled ? 0.6 : 1
                }}
                disabled={disabled}
                required={required}
            />
        </div>
    );
};

export default Input;