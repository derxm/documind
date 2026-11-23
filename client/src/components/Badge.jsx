import React from 'react';

/**
 * Reusable Badge / Tag component implementing the DocuMind AI design system.
 *
 * @param {Object} props
 * @param {'accent' | 'primary' | 'neutral' | 'success' | 'outline'} [props.variant='accent']
 * @param {'sm' | 'md'} [props.size='md']
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export function Badge({
  variant = 'accent',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}) {
  const variantClasses = {
    // Soft purple accent chip #EEEAFE with #635BFF text
    accent: 'bg-accent-secondary text-accent border border-accent/20',
    // Midnight primary chip #171A2E subtle tint
    primary: 'bg-primary/5 text-primary border border-primary/10',
    // Light gray neutral chip
    neutral: 'bg-background-subtle text-text-secondary border border-border',
    // Soft emerald success chip
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    // Minimal outline chip
    outline: 'bg-transparent text-text-secondary border border-border',
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1 font-medium rounded-full',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center select-none ${variantClasses[variant] || variantClasses.accent} ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
