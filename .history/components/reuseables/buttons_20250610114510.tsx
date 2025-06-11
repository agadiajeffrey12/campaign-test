'use client'

import React from 'react';

const BORDER_RADIUS = '12px';
const DEFAULT_BUTTON_HEIGHT = '48px';
const DEFAULT_BUTTON_WIDTH = '333px';
const DEFAULT_BUTTON_PADDING = '12px 8px';
const DEFAULT_BUTTON_FONT_SIZE = '16px';
const DEFAULT_BUTTON_FONT_WEIGHT = '500';
const DEFAULT_BUTTON_COLOR = '#FFFFFF';


interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string; 
    style?: React.CSSProperties;
    disabled?: boolean; 
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    isLink?: boolean;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
}
const primaryButton = (
    {
        children,
        onClick,
        className = '',
        style = {},
        disabled = false,
        variant = 'primary',
        size = 'medium',
        isLink = false,
        href = '',
        type = 'button',
        icon
    }: ButtonProps
)=>{
    return isLink ? (
        <a
            className={`
                button 
                ${variant} 
                ${size} 
                ${className}`}
            href={href}
            style={{
                ...style,
                borderRadius: BORDER_RADIUS,
                height: size === 'small' ? '36px' : size === 'large' ? '60px' : DEFAULT_BUTTON_HEIGHT,
                width: size === 'small' ? '120px' : size === 'large' ? '400px' : DEFAULT_BUTTON_WIDTH,
                padding: DEFAULT_BUTTON_PADDING,
                fontSize: DEFAULT_BUTTON_FONT_SIZE,
                fontWeight: DEFAULT_BUTTON_FONT_WEIGHT,
                color: DEFAULT_BUTTON_COLOR,
                pointerEvents: disabled ? 'none' : undefined,
                opacity: disabled ? 0.6 : 1
            }}
            data-testid={`button-${variant}-${size}`}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            onClick={disabled ? undefined : onClick}
        >
            {icon && <span className="icon">{icon}</span>}
            <span className="button-text">{children}</span>
        </a>
    ) : (
        <button
            className={`
                button 
                ${variant} 
                ${size} 
                ${className}`}
            onClick={onClick}
            style={{
                ...style,
                borderRadius: BORDER_RADIUS,
                height: size === 'small' ? '36px' : size === 'large' ? '60px' : DEFAULT_BUTTON_HEIGHT,
                width: size === 'small' ? '120px' : size === 'large' ? '400px' : DEFAULT_BUTTON_WIDTH,
                padding: DEFAULT_BUTTON_PADDING,
                fontSize: DEFAULT_BUTTON_FONT_SIZE,
                fontWeight: DEFAULT_BUTTON_FONT_WEIGHT,
                color: DEFAULT_BUTTON_COLOR
            }}
            disabled={disabled}
            type={type}
            data-testid={`button-${variant}-${size}`}
        >
            {icon && <span className="icon">{icon}</span>}
            <span className="button-text">{children}</span>
        </button>
    );
}