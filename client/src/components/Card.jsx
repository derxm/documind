import React from 'react';

/**
 * Reusable Card component implementing the DocuMind AI design system.
 *
 * @param {Object} props
 * @param {boolean} [props.hoverable=false] - Enables lift shadow and subtle border highlight on hover
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.padding='md']
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export function Card({
  hoverable = false,
  padding = 'none',
  className = '',
  children,
  ...props
}) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hoverable
    ? 'hover:shadow-card-hover hover:border-accent/40 hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      className={`bg-surface border border-border rounded-2xl shadow-card transition-all duration-200 ease-in-out ${hoverClasses} ${
        paddingClasses[padding] || ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  as: Component = 'h3',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`text-lg font-semibold text-primary tracking-tight leading-snug ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ className = '', children, ...props }) {
  return (
    <p className={`text-sm text-text-secondary mt-1.5 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-6 pt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }) {
  return (
    <div
      className={`p-6 pt-3 flex items-center justify-between border-t border-border-subtle ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
