import React from 'react';
import { FileText, Clock, Layers } from 'lucide-react';
import { Card, CardContent } from '../../index';

const stats = [
  {
    label: 'Total Notes',
    icon: FileText,
    color: 'bg-accent-secondary text-accent',
  },
  {
    label: 'Recently Updated',
    icon: Clock,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Study Collections',
    value: 3,
    icon: Layers,
    color: 'bg-amber-50 text-amber-600',
  },
];

/**
 * @param {Object} props
 * @param {number} props.totalNotes
 * @param {number} props.recentlyUpdated
 */
export function NoteStats({ totalNotes, recentlyUpdated }) {
  const values = [totalNotes, recentlyUpdated, 3];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} padding="none" className="overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary tabular-nums">{values[i]}</p>
                <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default NoteStats;
