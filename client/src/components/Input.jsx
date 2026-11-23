import React, { forwardRef } from 'react';

/**
 * Reusable Input component implementing the DocuMind AI design system.
 *
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.fullWidth=true]
 * @param {string} [props.className='']
 */
export const Input = forwardRef(function Input(
  {
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    fullWidth = true,
    className = '',
    id,
    disabled,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const borderClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
    : 'border-border focus:border-accent focus:ring-accent/10';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} text-left`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-1.5 select-none"
        >
          {label}
        </label>
      )}

      <div className="relative rounded-xl">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`
            block w-full rounded-xl bg-surface border text-sm text-text-primary placeholder:text-text-secondary/60
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-4
            disabled:bg-background-subtle disabled:text-text-muted disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : 'pl-3.5'}
            ${rightIcon ? 'pr-10' : 'pr-3.5'}
            py-2.5
            ${borderClasses}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-text-secondary">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
