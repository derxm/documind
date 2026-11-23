import React from 'react';

/**
 * Reusable Loading Spinner component.
 *
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {'accent' | 'white' | 'primary' | 'secondary'} [props.variant='accent']
 * @param {string} [props.className='']
 */
export function LoadingSpinner({
  size = 'md',
  variant = 'accent',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-8 w-8 border-[3px]',
    xl: 'h-12 w-12 border-4',
  };

  const variantClasses = {
    accent: 'border-accent/20 border-t-accent',
    white: 'border-white/25 border-t-white',
    primary: 'border-primary/20 border-t-primary',
    secondary: 'border-text-secondary/20 border-t-text-secondary',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.accent
      } ${className}`}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
