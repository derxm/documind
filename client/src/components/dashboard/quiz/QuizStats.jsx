import React from 'react';
import { GraduationCap, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../../index';

/**
 * @param {Object} props
 * @param {number} props.created    total quizzes created
 * @param {number} props.completed  total quizzes completed
 * @param {number} props.avgScore   average best score (0-100), or null
 */
export function QuizStats({ created, completed, avgScore }) {
  const stats = [
    {
      label: 'Quizzes Created',
      value: created,
      Icon: GraduationCap,
      color: 'bg-accent-secondary text-accent',
    },
    {
      label: 'Quizzes Completed',
      value: completed,
      Icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Average Score',
      value: avgScore !== null ? `${avgScore}%` : '—',
      Icon: TrendingUp,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ label, value, Icon, color }) => (
        <Card key={label} padding="none" className="overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary tabular-nums">{value}</p>
              <p className="text-xs text-text-secondary mt-0.5">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default QuizStats;
