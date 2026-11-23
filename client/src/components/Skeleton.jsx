import React from 'react';

/**
 * Reusable Skeleton loader component for premium placeholder loading states.
 *
 * @param {Object} props
 * @param {'text' | 'circular' | 'rounded'} [props.variant='rounded']
 * @param {string} [props.className='']
 */
export function Skeleton({
  variant = 'rounded',
  className = '',
  ...props
}) {
  const variantClasses = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
  };

  return (
    <div
      className={`animate-pulse bg-slate-200/70 ${variantClasses[variant] || variantClasses.rounded} ${className}`}
      {...props}
    />
  );
}

export default Skeleton;
