import React from 'react';
import {
  WelcomeSection,
  StatCard,
  QuickActionCard,
  RecentDocuments,
  RecentActivity,
  UsageOverview,
  statsData,
  quickActionsData,
} from '../../components/dashboard/overview';

/**
 * Complete, production-grade Dashboard Overview Page.
 */
export function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* 1. Welcome Hero Section */}
      <WelcomeSection userName="Alex" />

      {/* 2. Key Metrics & Statistics Grid */}
      <section aria-labelledby="overview-stats-heading">
        <h2 id="overview-stats-heading" className="sr-only">
          Platform Overview Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsData.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
              icon={stat.icon}
              accentBg={stat.accentBg}
              accentColor={stat.accentColor}
            />
          ))}
        </div>
      </section>

      {/* 3. Quick Action Cards */}
      <section aria-labelledby="quick-actions-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="quick-actions-heading"
            className="text-lg font-bold text-primary tracking-tight"
          >
            Quick Actions
          </h2>
          <span className="text-xs text-text-muted">
            Frequently used workflows
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActionsData.map((action) => (
            <QuickActionCard
              key={action.id}
              title={action.title}
              description={action.description}
              icon={action.icon}
              to={action.to}
              badge={action.badge}
              badgeVariant={action.badgeVariant}
            />
          ))}
        </div>
      </section>

      {/* 4. Split Section: Recent Documents & Usage / Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 cols): Recent Documents Table */}
        <div className="lg:col-span-2 space-y-8">
          <RecentDocuments />
        </div>

        {/* Right Column (1 col): Resource Usage & Recent Activity */}
        <div className="space-y-8">
          <UsageOverview />
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
