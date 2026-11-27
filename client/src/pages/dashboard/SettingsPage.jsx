import React, { useState } from 'react';
import { User, SlidersHorizontal, Bell, Shield, CreditCard } from 'lucide-react';

import { ProfileSettings }      from '../../components/dashboard/settings/ProfileSettings';
import { PreferencesSettings }  from '../../components/dashboard/settings/PreferencesSettings';
import { NotificationsSettings } from '../../components/dashboard/settings/NotificationsSettings';
import { SecuritySettings }     from '../../components/dashboard/settings/SecuritySettings';
import { SubscriptionSettings } from '../../components/dashboard/settings/SubscriptionSettings';

// ---------------------------------------------------------------------------
// Initial state — shared across all panels
// ---------------------------------------------------------------------------
const INITIAL_PROFILE = {
  name:     'Alex Morgan',
  username: 'alexmorgan',
  email:    'alex@example.com',
  bio:      'Student and lifelong learner.',
};

const INITIAL_PREFS = {
  theme:            'light',
  language:         'en',
  defaultFormat:    'PDF',
  defaultDifficulty:'Medium',
  compactDashboard: false,
};

const INITIAL_NOTIFICATIONS = {
  docProcessing: true,
  aiSummaries:   true,
  studyReminders:false,
  quizResults:   true,
  productUpdates:false,
};

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------
const TABS = [
  { id: 'profile',       label: 'Profile',       Icon: User },
  { id: 'preferences',   label: 'Preferences',   Icon: SlidersHorizontal },
  { id: 'notifications', label: 'Notifications', Icon: Bell },
  { id: 'security',      label: 'Security',      Icon: Shield },
  { id: 'subscription',  label: 'Subscription',  Icon: CreditCard },
];

// ---------------------------------------------------------------------------
// SettingsPage
// ---------------------------------------------------------------------------
export function SettingsPage() {
  const [activeTab, setActiveTab]       = useState('profile');
  const [profile, setProfile]           = useState(INITIAL_PROFILE);
  const [prefs, setPrefs]               = useState(INITIAL_PREFS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const activeTabObj = TABS.find((t) => t.id === activeTab);

  return (
    <div className="space-y-8 pb-12 max-w-5xl">

      {/* Page header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Settings</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Manage your account, preferences and workspace.
        </p>
      </div>

      {/* Layout: sidebar on lg+, horizontal tabs on smaller screens */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ---------------------------------------------------------------- */}
        {/* Navigation                                                        */}
        {/* ---------------------------------------------------------------- */}

        {/* Mobile/tablet: horizontal scrollable tab bar */}
        <nav
          aria-label="Settings navigation"
          className="lg:hidden flex items-center gap-1 overflow-x-auto pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6"
        >
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent shrink-0 ${
                activeTab === id
                  ? 'bg-accent text-white shadow-subtle'
                  : 'text-text-secondary hover:text-primary hover:bg-background-subtle border border-transparent'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop: vertical sidebar */}
        <nav
          aria-label="Settings navigation"
          className="hidden lg:flex lg:flex-col lg:w-52 lg:shrink-0 space-y-1"
        >
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent ${
                activeTab === id
                  ? 'bg-accent text-white shadow-subtle'
                  : 'text-text-secondary hover:text-primary hover:bg-background-subtle'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* ---------------------------------------------------------------- */}
        {/* Panel content                                                     */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex-1 min-w-0" role="tabpanel" aria-label={activeTabObj?.label}>
          {activeTab === 'profile' && (
            <ProfileSettings
              profile={profile}
              onSave={setProfile}
            />
          )}
          {activeTab === 'preferences' && (
            <PreferencesSettings
              prefs={prefs}
              onSave={setPrefs}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationsSettings
              notifications={notifications}
              onSave={setNotifications}
            />
          )}
          {activeTab === 'security' && (
            <SecuritySettings />
          )}
          {activeTab === 'subscription' && (
            <SubscriptionSettings />
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
