import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { Card } from '../../index';

/**
 * Reusable Metric Statistic Card.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} [props.change]
 * @param {boolean} [props.isPositive=true]
 * @param {React.ComponentType} props.icon
 * @param {string} [props.accentBg='bg-accent-secondary']
 * @param {string} [props.accentColor='text-accent']
 */
export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  accentBg = 'bg-accent-secondary',
  accentColor = 'text-accent',
}) {
  return (
    <Card padding="md" hoverable className="flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className={`h-11 w-11 rounded-xl ${accentBg} ${accentColor} flex items-center justify-center shrink-0 shadow-subtle`}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>

        {change && (
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
            <TrendingUp className="h-3 w-3" />
            <span>{change}</span>
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-medium text-text-secondary">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 tracking-tight">
          {value}
        </p>
      </div>
    </Card>
  );
}

export default StatCard;
