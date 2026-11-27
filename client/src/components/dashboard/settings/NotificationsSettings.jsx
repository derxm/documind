import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Button } from '../../index';

const NOTIFICATION_ITEMS = [
  {
    id: 'docProcessing',
    label: 'Document Processing Completed',
    description: 'Get notified when your uploaded document has been fully processed and is ready to use.',
  },
  {
    id: 'aiSummaries',
    label: 'AI Summaries Generated',
    description: 'Receive a notification when an AI-generated summary is ready for one of your documents.',
  },
  {
    id: 'studyReminders',
    label: 'Study Reminders',
    description: 'Periodic reminders to review your study notes and practise with quizzes.',
  },
  {
    id: 'quizResults',
    label: 'Quiz Results',
    description: 'Notify me when a quiz attempt is scored and results are available.',
  },
  {
    id: 'productUpdates',
    label: 'Product Updates',
    description: 'News about new features, improvements, and important announcements from DocuMind AI.',
  },
];

function Toggle({ id, checked, onChange }) {
  return (
    <button
      id={id}
      role="switch"
      type="button"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 h-6 w-11 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
        checked ? 'bg-accent' : 'bg-border'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-subtle transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">{checked ? 'Enabled' : 'Disabled'}</span>
    </button>
  );
}

/**
 * @param {Object}   props
 * @param {Object}   props.notifications  { docProcessing, aiSummaries, … }
 * @param {Function} props.onSave         (updatedNotifications) => void
 */
export function NotificationsSettings({ notifications, onSave }) {
  const [form, setForm]   = useState({ ...notifications });
  const [saved, setSaved] = useState(false);

  const toggle = (id) => (val) => {
    setForm((f) => ({ ...f, [id]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave({ ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card padding="none">
      <CardHeader className="border-b border-border-subtle">
        <h3 className="text-base font-bold text-primary tracking-tight">Notification Settings</h3>
        <p className="text-sm text-text-secondary mt-1">Choose which events trigger notifications.</p>
      </CardHeader>

      <CardContent className="pt-0 divide-y divide-border-subtle">
        {NOTIFICATION_ITEMS.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 py-4">
            <div className="flex-1 min-w-0">
              <label
                htmlFor={`notif-${item.id}`}
                className="text-sm font-medium text-text-primary cursor-pointer select-none"
              >
                {item.label}
              </label>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.description}</p>
            </div>
            <Toggle
              id={`notif-${item.id}`}
              checked={form[item.id]}
              onChange={toggle(item.id)}
            />
          </div>
        ))}
      </CardContent>

      <CardFooter className="bg-background-subtle/50">
        <span className="text-xs">
          {saved
            ? <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><CheckCircle2 className="h-3.5 w-3.5" />Notification preferences saved.</span>
            : <span className="text-text-secondary">Changes are saved to this session only.</span>
          }
        </span>
        <Button variant="primary" size="sm" leftIcon={<Save className="h-4 w-4" />} onClick={handleSave}>
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}

export default NotificationsSettings;
