import React from 'react';
import LoadingSpinner from './LoadingSpinner';

/**
 * Reusable Button component implementing the DocuMind AI design system.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'dark' | 'ghost'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.fullWidth=false]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantClasses = {
    // Accent #635BFF primary button
    primary:
      'bg-accent text-white hover:bg-accent-hover active:bg-accent-active shadow-subtle focus:ring-accent',
    // Soft secondary chip button #EEEAFE with #635BFF text
    secondary:
      'bg-accent-secondary text-accent hover:bg-accent-secondary-hover active:bg-accent-secondary focus:ring-accent',
    // Subtle border outline button
    outline:
      'bg-surface border border-border text-text-primary hover:bg-background hover:border-text-secondary/30 active:bg-background-subtle focus:ring-accent shadow-subtle',
    // Midnight navy #171A2E brand button
    dark:
      'bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-subtle focus:ring-primary',
    // Ghost transparent button
    ghost:
      'text-text-secondary hover:text-text-primary hover:bg-background active:bg-background-subtle focus:ring-accent',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
  };

  const spinnerVariants = {
    primary: 'white',
    dark: 'white',
    secondary: 'accent',
    outline: 'accent',
    ghost: 'accent',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" variant={spinnerVariants[variant]} />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

export default Button;
