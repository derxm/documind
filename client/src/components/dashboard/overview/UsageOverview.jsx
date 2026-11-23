import React from 'react';
import { Zap, HardDrive, Cpu, ArrowUpRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
} from '../../index';
import { usageData } from './dashboardData';

export function UsageOverview() {
  const { aiRequests, storage } = usageData;

  return (
    <Card padding="none" className="overflow-hidden">
      <CardHeader className="border-b border-border-subtle bg-surface">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usage & Capacity</CardTitle>
            <CardDescription>
              Current billing cycle resource consumption.
            </CardDescription>
          </div>
          <Badge variant="accent" size="sm">
            <Zap className="h-3 w-3 mr-1 text-accent fill-accent" />
            Pro Plan
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        {/* Metric 1: Monthly AI Requests */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-primary flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-accent" />
              Monthly AI Requests
            </span>
            <span className="font-medium text-text-secondary">
              <span className="font-bold text-primary">{aiRequests.used}</span> / {aiRequests.total} {aiRequests.unit}
            </span>
          </div>

          <div className="h-2.5 w-full bg-background-subtle rounded-full overflow-hidden border border-border-subtle">
            <div
              role="progressbar"
              aria-valuenow={aiRequests.used}
              aria-valuemin={0}
              aria-valuemax={aiRequests.total}
              aria-label="Monthly AI Requests"
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${aiRequests.percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-text-muted">
            {aiRequests.total - aiRequests.used} requests remaining. Resets in 9 days.
          </p>
        </div>

        {/* Metric 2: Document Storage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-primary flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5 text-indigo-600" />
              Document Storage
            </span>
            <span className="font-medium text-text-secondary">
              <span className="font-bold text-primary">{storage.used}</span> / {storage.total} {storage.unit}
            </span>
          </div>

          <div className="h-2.5 w-full bg-background-subtle rounded-full overflow-hidden border border-border-subtle">
            <div
              role="progressbar"
              aria-valuenow={storage.used}
              aria-valuemin={0}
              aria-valuemax={storage.total}
              aria-label="Document Storage"
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${storage.percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-text-muted">
            {storage.total - storage.used} MB free storage available.
          </p>
        </div>
      </CardContent>

      <CardFooter className="bg-background-subtle/50 border-t border-border-subtle p-4">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          rightIcon={<ArrowUpRight className="h-4 w-4" />}
          onClick={() => alert('Billing and upgrade settings modal')}
        >
          Manage Plan & Limits
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UsageOverview;
