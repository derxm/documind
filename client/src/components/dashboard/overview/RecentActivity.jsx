import React from 'react';
import { History, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../index';
import { recentActivityData } from './dashboardData';

export function RecentActivity() {
  return (
    <Card padding="none" className="overflow-hidden">
      <CardHeader className="border-b border-border-subtle bg-surface">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Live log of your document and study interactions.
            </CardDescription>
          </div>
          <div className="h-8 w-8 rounded-lg bg-background-subtle flex items-center justify-center text-text-secondary">
            <History className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border-subtle">
          {recentActivityData.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3.5 p-4 sm:px-6 hover:bg-background/80 transition-colors"
              >
                <div
                  className={`h-9 w-9 rounded-xl ${activity.iconBg} ${activity.iconColor} flex items-center justify-center shrink-0 mt-0.5 shadow-subtle`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-primary truncate">
                      {activity.title}
                    </p>
                    <span className="text-[11px] text-text-muted flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />
                      {activity.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary mt-0.5 leading-snug line-clamp-1">
                    {activity.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
