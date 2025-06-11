'use client'

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils'; 
import { Plus } from 'lucide-react';

// Design tokens
const DESIGN_TOKENS = {
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '16px',
    color: '#FFFFFF',
    sizes: {
        small: {
            height: '36px',
            minWidth: '160px', 
            padding: '8px 12px',
            fontSize: '14px'
        },
        medium: {
            height: '48px',
            minWidth: '333px',
            padding: '12px 16px',
            fontSize: '16px'
        },
        large: {
            height: '60px',
            minWidth: '400px',
            padding: '16px 24px',
            fontSize: '18px'
        }
    },
    variants: {
        primary: {
            backgroundColor: '#000',
            color: '#FFFFFF',
            border: 'none',
            hover: {
                backgroundColor: '#0056b3'
            }
        },
        secondary: {
            backgroundColor: '#6c757d',
            color: '#FFFFFF',
            border: 'none',
            hover: {
                backgroundColor: '#545b62'
            }
        },
        tertiary: {
            backgroundColor: 'transparent',
            color: '#676D72B2',
            border: '1px solid #676D72B2',
            hover: {
                backgroundColor: '#676D72B2',
                color: '#FFFFFF'
            }
        }
    }
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    isLink?: boolean;
    href?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    loading?: boolean;
    display?: React.CSSProperties['display'];
    width?: string | number;
    height?: string | number;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    href: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    isLink?: true;
   display?: React.CSSProperties['display'];
    width?: string | number;
    height?: string | number;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkProps>(
    ({
        children,
        className = '',
        disabled = false,
        variant = 'primary',
        size = 'medium',
        isLink = false,
        href,
        icon,
        iconPosition = 'left',
        fullWidth = false,
        loading = false,
        style, 
        width,
        height,
        display,
        ...props
    }, ref) => {
        
        // Get design tokens for current variant and size
        const variantStyles = DESIGN_TOKENS.variants[variant];
        const sizeStyles = DESIGN_TOKENS.sizes[size];
        
        // Base styles - removed hardcoded width/height
        const baseStyles: React.CSSProperties = {
            borderRadius: DESIGN_TOKENS.borderRadius,
            fontWeight: DESIGN_TOKENS.fontWeight,
            cursor: disabled ? 'not-allowed' : 'pointer',
            border: variantStyles.border,
            backgroundColor: variantStyles.backgroundColor,
            color: variantStyles.color,
        
            height: height || sizeStyles.height,
            width: fullWidth ? '100%' : (width || undefined),
            minWidth: !fullWidth && !width ? sizeStyles.minWidth : undefined,
            padding: sizeStyles.padding,
            fontSize: sizeStyles.fontSize,
            // display: display || (fullWidth ? 'flex' : 'inline-flex'),
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            opacity: disabled ? 0.6 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
            // Merge with custom styles (custom styles take precedence)
            ...style
        };

        // Loading spinner component
        const LoadingSpinner = () => (
            <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );

        // Content with icon
        const buttonContent = (
            <>
                {loading && <LoadingSpinner />}
                {!loading && icon && iconPosition === 'left' && (
                    <span className="flex items-center">{icon}</span>
                )}
                <span className={cn(
                    "button-text flex items-center gap-2",
                    loading && "opacity-70"
                )}>
                    {children}
                </span>
                {!loading && icon && iconPosition === 'right' && (
                    <span className="flex items-center">{icon}</span>
                )}
            </>
        );

        // Common classes
        const commonClasses = cn(
            'button',
            `button-${variant}`,
            `button-${size}`,
            {
                'button-full-width': fullWidth,
                'button-loading': loading,
                'button-disabled': disabled
            },
            'inline-flex',
            className
        );

        if (isLink && href) {
            return (
                <a
                    ref={ref as React.RefObject<HTMLAnchorElement>}
                    href={disabled ? undefined : href}
                    className={commonClasses}
                    style={baseStyles}
                    data-testid={`button-link-${variant}-${size}`}
                    tabIndex={disabled ? -1 : 0}
                    aria-disabled={disabled}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    {buttonContent}
                </a>
            );
        }

        return (
            <button
                ref={ref as React.RefObject<HTMLButtonElement>}
                className={commonClasses}
                style={baseStyles}
                disabled={disabled || loading}
                data-testid={`button-${variant}-${size}`}
                {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            >
                {buttonContent}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };


export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="primary" {...props} />
);

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="secondary" {...props} />
);

export const TertiaryButton = (props: Omit<ButtonProps, 'variant'>) => (
    <Button variant="tertiary" {...props} />
);

interface MiniAddButtonProps {
    isLink?: boolean;
    href?: string;
    className?: string;
}
export const MiniAddButton= (
    { isLink = false, href,className }: MiniAddButtonProps = {}
)=>{
    return (
        
        <Button
            variant="primary"
            size="small"
            isLink={isLink}
            href={href}
            className={cn(`flex items-center justify-center gap-2 `,
                className
            )}
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
            width={48}
            height={48}
        >
            
        </Button>
    )
}