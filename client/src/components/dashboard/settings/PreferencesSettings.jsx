import React, { useState } from 'react';
import { Save, Info, CheckCircle2, Monitor, Sun, Moon } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Button } from '../../index';

// ---------------------------------------------------------------------------
// Reusable option-button row
// ---------------------------------------------------------------------------
function OptionGroup({ label, options, value, onChange, ariaLabel }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={ariaLabel || label}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent ${
            value === opt.value
              ? 'bg-accent text-white border-accent shadow-subtle'
              : 'bg-surface text-text-primary border-border hover:border-accent/40 hover:bg-accent-secondary/30'
          }`}
        >
          {opt.icon && <span aria-hidden="true">{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle switch
// ---------------------------------------------------------------------------
function Toggle({ id, checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-text-primary cursor-pointer select-none">
          {label}
        </label>
        {description && <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{description}</p>}
      </div>
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
        <span className="sr-only">{checked ? 'On' : 'Off'}</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Row wrapper
// ---------------------------------------------------------------------------
function PrefRow({ label, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 py-4 border-b border-border-subtle last:border-0">
      <div className="sm:w-48 shrink-0">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PreferencesSettings
// ---------------------------------------------------------------------------
/**
 * @param {Object}   props
 * @param {Object}   props.prefs
 * @param {Function} props.onSave  (updatedPrefs) => void
 */
export function PreferencesSettings({ prefs, onSave }) {
  const [form, setForm] = useState({ ...prefs });
  const [saved, setSaved] = useState(false);

  const set = (key) => (val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave({ ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const themeOptions = [
    { value: 'light',  label: 'Light',  icon: <Sun className="h-3.5 w-3.5" /> },
    { value: 'dark',   label: 'Dark',   icon: <Moon className="h-3.5 w-3.5" /> },
    { value: 'system', label: 'System', icon: <Monitor className="h-3.5 w-3.5" /> },
  ];

  const diffOptions = [
    { value: 'Easy',   label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard',   label: 'Hard' },
  ];

  const formatOptions = [
    { value: 'PDF',  label: 'PDF' },
    { value: 'DOCX', label: 'DOCX' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
  ];

  return (
    <Card padding="none">
      <CardHeader className="border-b border-border-subtle">
        <h3 className="text-base font-bold text-primary tracking-tight">Preferences</h3>
        <p className="text-sm text-text-secondary mt-1">Customise your workspace experience.</p>
      </CardHeader>

      <CardContent className="pt-2 divide-y divide-border-subtle">

        {/* Theme */}
        <PrefRow
          label="Theme"
          description="Choose your preferred colour scheme."
        >
          <OptionGroup
            ariaLabel="Theme preference"
            options={themeOptions}
            value={form.theme}
            onChange={set('theme')}
          />
          <div className="flex items-start gap-2 mt-2.5 bg-accent-secondary/50 border border-accent/20 rounded-xl px-3 py-2.5">
            <Info className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-accent leading-relaxed">
              Theme selection is saved to your preferences. Full theme switching will be applied once a theme system is connected to the application.
            </p>
          </div>
        </PrefRow>

        {/* Language */}
        <PrefRow label="Language" description="Interface display language.">
          <OptionGroup
            ariaLabel="Language"
            options={languageOptions}
            value={form.language}
            onChange={set('language')}
          />
        </PrefRow>

        {/* Default document format */}
        <PrefRow label="Default Document Format" description="Preferred format for new uploads.">
          <OptionGroup
            ariaLabel="Default document format"
            options={formatOptions}
            value={form.defaultFormat}
            onChange={set('defaultFormat')}
          />
        </PrefRow>

        {/* Default quiz difficulty */}
        <PrefRow label="Default Quiz Difficulty" description="Pre-selected difficulty when creating quizzes.">
          <OptionGroup
            ariaLabel="Default quiz difficulty"
            options={diffOptions}
            value={form.defaultDifficulty}
            onChange={set('defaultDifficulty')}
          />
        </PrefRow>

        {/* Compact dashboard */}
        <PrefRow label="Compact Dashboard" description="Reduce spacing and card sizes on the dashboard overview.">
          <Toggle
            id="compact-dashboard"
            checked={form.compactDashboard}
            onChange={set('compactDashboard')}
            label=""
          />
        </PrefRow>

      </CardContent>

      <CardFooter className="bg-background-subtle/50">
        <span className="text-xs">
          {saved
            ? <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><CheckCircle2 className="h-3.5 w-3.5" />Preferences saved.</span>
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

export default PreferencesSettings;
