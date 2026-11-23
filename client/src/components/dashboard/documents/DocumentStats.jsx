import React from 'react';
import { Files, CheckCircle2, Clock } from 'lucide-react';
import { Card, Badge } from '../../index';

/**
 * Three compact document statistic cards.
 *
 * @param {Object} props
 * @param {number} props.total
 * @param {number} props.processed
 * @param {number} props.processing
 */
export function DocumentStats({ total = 24, processed = 21, processing = 3 }) {
  const stats = [
    {
      id: 'total',
      label: 'Total Documents',
      value: total,
      badge: 'Storage Active',
      badgeVariant: 'neutral',
      icon: Files,
      accentBg: 'bg-accent-secondary',
      accentColor: 'text-accent',
    },
    {
      id: 'processed',
      label: 'Processed & Indexed',
      value: processed,
      badge: 'Ready for Q&A',
      badgeVariant: 'success',
      icon: CheckCircle2,
      accentBg: 'bg-emerald-100/70',
      accentColor: 'text-emerald-600',
    },
    {
      id: 'processing',
      label: 'Currently Processing',
      value: processing,
      badge: processing > 0 ? 'In Queue' : 'Queue Empty',
      badgeVariant: 'accent',
      icon: Clock,
      accentBg: 'bg-indigo-100/70',
      accentColor: 'text-indigo-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} padding="md" hoverable className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div
                className={`h-10 w-10 rounded-xl ${stat.accentBg} ${stat.accentColor} flex items-center justify-center shrink-0 shadow-subtle`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <Badge variant={stat.badgeVariant} size="sm">
                {stat.badge}
              </Badge>
            </div>

            <div>
              <p className="text-xs font-medium text-text-secondary">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 tracking-tight">
                {stat.value}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default DocumentStats;
