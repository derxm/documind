import React, { forwardRef } from 'react';

/**
 * Reusable Textarea component implementing the DocuMind AI design system.
 *
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {boolean} [props.fullWidth=true]
 * @param {number} [props.rows=3]
 * @param {string} [props.className='']
 */
export const Textarea = forwardRef(function Textarea(
  {
    label,
    helperText,
    error,
    fullWidth = true,
    rows = 3,
    className = '',
    id,
    disabled,
    ...props
  },
  ref
) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const borderClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
    : 'border-border focus:border-accent focus:ring-accent/10';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} text-left`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-text-primary mb-1.5 select-none"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={`
          block w-full rounded-xl bg-surface border text-sm text-text-primary placeholder:text-text-secondary/60
          p-3.5 transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-4
          disabled:bg-background-subtle disabled:text-text-muted disabled:cursor-not-allowed
          ${borderClasses}
          ${className}
        `}
        {...props}
      />

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
