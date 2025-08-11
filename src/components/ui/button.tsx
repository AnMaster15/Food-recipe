import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    className, 
    children, 
    loading = false,
    icon,
    iconPosition = 'left',
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:from-primary-700 hover:to-primary-800 hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary-500",
      secondary: "bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200 hover:border-neutral-300 focus:ring-neutral-500",
      accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-md hover:from-accent-600 hover:to-accent-700 hover:shadow-lg hover:-translate-y-0.5 focus:ring-accent-500",
      success: "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-md hover:from-success-600 hover:to-success-700 hover:shadow-lg hover:-translate-y-0.5 focus:ring-success-500",
      warning: "bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-md hover:from-warning-600 hover:to-warning-700 hover:shadow-lg hover:-translate-y-0.5 focus:ring-warning-500",
      error: "bg-gradient-to-r from-error-500 to-error-600 text-white shadow-md hover:from-error-600 hover:to-error-700 hover:shadow-lg hover:-translate-y-0.5 focus:ring-error-500",
      ghost: "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 focus:ring-neutral-500",
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-4 py-2 text-sm rounded-lg",
      lg: "px-6 py-3 text-base rounded-xl",
      xl: "px-8 py-4 text-lg rounded-xl",
    };

    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", iconSizes[size])} />
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className={iconSizes[size]}>{icon}</span>
        )}
        
        {children}
        
        {!loading && icon && iconPosition === 'right' && (
          <span className={iconSizes[size]}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps }; 