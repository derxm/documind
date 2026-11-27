import React from 'react';
import { Zap, HardDrive, CreditCard, Info, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Badge } from '../../index';
import Toast from '../../Toast';
import { useToast } from '../../../hooks/useToast';

// ---------------------------------------------------------------------------
// Usage progress bar
// ---------------------------------------------------------------------------
function UsageBar({ label, used, total, unit, colorClass }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  const isHigh = pct >= 80;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-text-primary">{label}</span>
        <span className={`font-medium tabular-nums ${isHigh ? 'text-amber-600' : 'text-text-secondary'}`}>
          {used} / {total} {unit}
        </span>
      </div>
      <div className="w-full h-2 bg-background-subtle rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${isHigh ? 'bg-amber-400' : colorClass}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${label}: ${used} of ${total} ${unit} used`}
        />
      </div>
      <p className="text-[11px] text-text-muted text-right tabular-nums">{pct}% used</p>
    </div>
  );
}

export function SubscriptionSettings() {
  const [toast, showToast] = useToast();
  const handleManage = () => {
    showToast('Subscription management is not available until payment integration is connected.');
  };

  return (
    <div className="space-y-6">
      <Toast message={toast} />
      {/* Plan overview */}
      <Card padding="none">
        <CardHeader className="border-b border-border-subtle">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Current Plan</h3>
              <p className="text-sm text-text-secondary mt-1">Your active subscription and usage details.</p>
            </div>
            <Badge variant="accent" size="sm">
              <Zap className="h-3 w-3 mr-1 fill-accent" />Pro Plan
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Plan card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-accent-secondary/40 border border-accent/20 rounded-2xl">
            <div>
              <p className="text-lg font-bold text-primary">Pro</p>
              <p className="text-2xl font-bold text-accent mt-0.5">$12<span className="text-sm font-medium text-text-secondary">/month</span></p>
              <p className="text-xs text-text-secondary mt-1">Billed monthly · Renews Dec 24, 2026</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />} onClick={handleManage}>
                Manage Subscription
              </Button>
              <button
                type="button"
                onClick={() => showToast('Plan changes are not available until payment integration is connected.')}
                className="text-xs text-text-secondary hover:text-primary transition-colors text-center"
              >
                Downgrade to Free
              </button>
            </div>
          </div>

          {/* Usage bars */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-primary">Usage This Month</h4>
            <UsageBar label="AI Requests"  used={35}  total={100} unit="requests" colorClass="bg-accent" />
            <UsageBar label="Storage"      used={120} total={500} unit="MB"       colorClass="bg-blue-400" />
          </div>

          {/* Features included */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">Plan Includes</h4>
            <ul className="space-y-2">
              {[
                '100 AI requests per month',
                '500 MB document storage',
                'AI document summaries and Q&A',
                'Quiz generator with all difficulty levels',
                'Study notes workspace',
                'Priority support',
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Billing information */}
      <Card padding="none">
        <CardHeader className="border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-background-subtle text-text-secondary flex items-center justify-center shrink-0 border border-border">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Billing Information</h3>
              <p className="text-sm text-text-secondary mt-0.5">Payment method and invoices.</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          <div className="flex items-start gap-2.5 bg-background-subtle border border-border rounded-xl px-3.5 py-3">
            <Info className="h-4 w-4 text-text-muted shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-relaxed">
              Billing management, payment methods, and invoice history will be available once payment integration is connected. No charges have been made in this demonstration.
            </p>
          </div>

          {/* Payment method placeholder */}
          <div className="flex items-center justify-between p-4 bg-background-subtle border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-14 rounded-lg bg-surface border border-border flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">•••• •••• •••• 4242</p>
                <p className="text-xs text-text-secondary mt-0.5">Expires 12/27 (demonstration)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleManage}
              className="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Update
            </button>
          </div>

          {/* Upgrade prompt */}
          <div className="flex items-center justify-between p-4 bg-primary rounded-xl text-white">
            <div>
              <p className="text-sm font-bold">Upgrade to Team</p>
              <p className="text-xs text-white/70 mt-0.5">$29/month · 5 seats · 2 GB storage</p>
            </div>
            <button
              type="button"
              onClick={() => showToast('Plan upgrades are not available until payment integration is connected.')}
              className="shrink-0 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Upgrade
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SubscriptionSettings;
