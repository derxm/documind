import React, { useState, useEffect } from 'react';
import {
  Eye, EyeOff, Shield, Monitor, Smartphone, AlertTriangle,
  X, LogOut, AlertCircle, Info, CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Button } from '../../index';
import Toast from '../../Toast';
import { useToast } from '../../../hooks/useToast';

// ---------------------------------------------------------------------------
// Demo active sessions
// ---------------------------------------------------------------------------
const DEMO_SESSIONS = [
  { id: 's1', device: 'Chrome on Windows', location: 'Lagos, Nigeria',    lastActive: 'Now — current session',   isCurrent: true,  Icon: Monitor },
  { id: 's2', device: 'Safari on iPhone',  location: 'Lagos, Nigeria',    lastActive: '2 hours ago',              isCurrent: false, Icon: Smartphone },
  { id: 's3', device: 'Firefox on macOS',  location: 'Abuja, Nigeria',    lastActive: 'Yesterday at 3:14 PM',     isCurrent: false, Icon: Monitor },
];

// ---------------------------------------------------------------------------
// Sign-out confirmation dialog
// ---------------------------------------------------------------------------
function SignOutAllDialog({ onConfirm, onClose }) {
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handle); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog" aria-modal="true" aria-labelledby="signout-title"
        className="relative w-full max-w-sm bg-surface rounded-2xl border border-border shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-4 mb-4">
          <div className="h-11 w-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200/50">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 id="signout-title" className="text-sm font-bold text-primary tracking-tight">Sign Out All Devices?</h3>
            <p className="text-xs text-text-secondary mt-1">
              This will end all active sessions except the current one. You will need to sign in again on other devices.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <LogOut className="h-4 w-4" />Sign Out All
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Password field with show/hide toggle
// ---------------------------------------------------------------------------
function PasswordField({ id, label, value, onChange, error, placeholder }) {
  const [show, setShow] = useState(false);
  const inputBase = 'w-full bg-background border rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-4 transition-all duration-200';
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder || '••••••••'}
          aria-invalid={Boolean(error)}
          className={`${inputBase} ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-border focus:border-accent focus:ring-accent/10'}`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-secondary transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 font-medium">
          <AlertCircle className="h-3.5 w-3.5" />{error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SecuritySettings
// ---------------------------------------------------------------------------
export function SecuritySettings() {
  const [currentPw, setCurrentPw]   = useState('');
  const [newPw, setNewPw]           = useState('');
  const [confirmPw, setConfirmPw]   = useState('');
  const [pwErrors, setPwErrors]     = useState({});
  const [signOutDialog, setSignOutDialog] = useState(false);
  const [sessions, setSessions]     = useState(DEMO_SESSIONS);
  const [signedOutAll, setSignedOutAll]   = useState(false);
  const [toast, showToast] = useToast();

  const validatePassword = () => {
    const errs = {};
    if (!currentPw) errs.current = 'Current password is required.';
    if (!newPw)     errs.new     = 'New password is required.';
    else if (newPw.length < 8) errs.new = 'Password must be at least 8 characters.';
    if (!confirmPw) errs.confirm = 'Please confirm your new password.';
    else if (newPw && confirmPw !== newPw) errs.confirm = 'Passwords do not match.';
    return errs;
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    const errs = validatePassword();
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    setPwErrors({});
    showToast('No password change was made. Password updates require connected authentication.');
  };

  const handleSignOutAll = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    setSignOutDialog(false);
    setSignedOutAll(true);
    setTimeout(() => setSignedOutAll(false), 4000);
  };

  return (
    <div className="space-y-6">
      <Toast message={toast} />
      {/* Change password */}
      <Card padding="none">
        <CardHeader className="border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-accent-secondary text-accent flex items-center justify-center shrink-0">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Change Password</h3>
              <p className="text-sm text-text-secondary mt-0.5">Update your account password.</p>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handlePasswordSave} noValidate>
          <CardContent className="space-y-4 pt-6">
            {/* Demo notice */}
            <div className="flex items-start gap-2.5 bg-accent-secondary/50 border border-accent/20 rounded-xl px-3.5 py-3">
              <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-accent leading-relaxed">
                Password changes will be enabled once backend authentication is implemented. No actual password will be changed in this demonstration.
              </p>
            </div>

            <PasswordField
              id="current-pw"
              label="Current Password"
              value={currentPw}
              onChange={(e) => { setCurrentPw(e.target.value); if (pwErrors.current) setPwErrors((p) => { const n={...p}; delete n.current; return n; }); }}
              error={pwErrors.current}
            />
            <PasswordField
              id="new-pw"
              label="New Password"
              value={newPw}
              onChange={(e) => { setNewPw(e.target.value); if (pwErrors.new) setPwErrors((p) => { const n={...p}; delete n.new; return n; }); }}
              error={pwErrors.new}
              placeholder="Min. 8 characters"
            />
            {newPw && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-background-subtle overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      newPw.length >= 12 ? 'bg-emerald-500 w-full' :
                      newPw.length >= 8  ? 'bg-amber-400 w-2/3' :
                                           'bg-red-400 w-1/3'
                    }`}
                  />
                </div>
                <span className={`text-xs font-medium shrink-0 ${
                  newPw.length >= 12 ? 'text-emerald-600' :
                  newPw.length >= 8  ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {newPw.length >= 12 ? 'Strong' : newPw.length >= 8 ? 'Fair' : 'Weak'}
                </span>
              </div>
            )}
            <PasswordField
              id="confirm-pw"
              label="Confirm New Password"
              value={confirmPw}
              onChange={(e) => { setConfirmPw(e.target.value); if (pwErrors.confirm) setPwErrors((p) => { const n={...p}; delete n.confirm; return n; }); }}
              error={pwErrors.confirm}
            />
          </CardContent>

          <CardFooter className="bg-background-subtle/50">
            <span />
            <Button type="submit" variant="primary" size="sm">Update Password</Button>
          </CardFooter>
        </form>
      </Card>

      {/* Active sessions */}
      <Card padding="none">
        <CardHeader className="border-b border-border-subtle">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Active Sessions</h3>
              <p className="text-sm text-text-secondary mt-1">Devices currently signed in to your account.</p>
            </div>
            {signedOutAll ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />Other sessions ended.
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setSignOutDialog(true)}
                disabled={sessions.length <= 1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />Sign Out All Devices
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 divide-y divide-border-subtle">
          {sessions.map((s) => {
            const Icon = s.Icon;
            return (
              <div key={s.id} className="flex items-start gap-3 py-4">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${s.isCurrent ? 'bg-accent-secondary text-accent' : 'bg-background-subtle text-text-secondary'} border border-border`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary">{s.device}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{s.location} · {s.lastActive}</p>
                </div>
                {s.isCurrent && (
                  <span className="shrink-0 inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">Current</span>
                )}
              </div>
            );
          })}
          {sessions.length === 1 && (
            <p className="py-3 text-xs text-text-muted text-center">No other active sessions.</p>
          )}
        </CardContent>
      </Card>

      {signOutDialog && (
        <SignOutAllDialog onConfirm={handleSignOutAll} onClose={() => setSignOutDialog(false)} />
      )}
    </div>
  );
}

export default SecuritySettings;
