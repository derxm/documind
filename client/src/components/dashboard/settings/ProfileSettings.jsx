import React, { useState } from 'react';
import { Save, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Button, Badge } from '../../index';
import Toast from '../../Toast';
import { useToast } from '../../../hooks/useToast';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 font-medium">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />{msg}
    </p>
  );
}

/**
 * @param {Object}   props
 * @param {Object}   props.profile   { name, username, email, bio }
 * @param {Function} props.onSave    (updatedProfile) => void
 */
export function ProfileSettings({ profile, onSave }) {
  const [form, setForm]     = useState({ ...profile });
  const [errors, setErrors] = useState({});
  const [saved, setSaved]   = useState(false);
  const [toast, showToast] = useToast();

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    setSaved(false);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())     errs.name     = 'Full name is required.';
    if (!form.username.trim()) errs.username  = 'Username is required.';
    if (!form.email.trim())    errs.email     = 'Email address is required.';
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Enter a valid email address.';
    return errs;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ ...form, name: form.name.trim(), username: form.username.trim(), email: form.email.trim(), bio: form.bio.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Derive initials for avatar
  const initials = form.name.trim().split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || 'AM';

  const inputBase = 'w-full bg-background border rounded-xl px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-4 transition-all duration-200';
  const inputNormal = 'border-border focus:border-accent focus:ring-accent/10';
  const inputErr    = 'border-red-300 focus:border-red-500 focus:ring-red-500/10';

  return (
    <form onSubmit={handleSave} noValidate>
      <Toast message={toast} />
      <Card padding="none">
        <CardHeader className="border-b border-border-subtle">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-primary tracking-tight">Profile Information</h3>
              <p className="text-sm text-text-secondary mt-1">Update your personal details and how you appear across DocuMind AI.</p>
            </div>
            <Badge variant="accent" size="sm">Pro Member</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Avatar row */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-2xl bg-primary text-white text-xl font-bold flex items-center justify-center shadow-subtle select-none">
                {initials}
              </div>
              <button
                type="button"
                onClick={() => showToast('Avatar upload is not available until file storage is connected.')}
                aria-label="Change avatar"
                className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-full bg-accent text-white flex items-center justify-center shadow-subtle hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">{form.name || 'Your Name'}</p>
              <p className="text-xs text-text-secondary mt-0.5">@{form.username || 'username'}</p>
              <p className="text-[11px] text-text-muted mt-2">JPG, PNG or GIF · Max 2 MB</p>
            </div>
          </div>

          {/* Name + Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium text-text-primary mb-1.5">
                Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="profile-name"
                type="text"
                value={form.name}
                onChange={set('name')}
                maxLength={80}
                aria-invalid={Boolean(errors.name)}
                className={`${inputBase} ${errors.name ? inputErr : inputNormal}`}
              />
              <FieldError msg={errors.name} />
            </div>

            <div>
              <label htmlFor="profile-username" className="block text-sm font-medium text-text-primary mb-1.5">
                Username <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="profile-username"
                type="text"
                value={form.username}
                onChange={set('username')}
                maxLength={40}
                aria-invalid={Boolean(errors.username)}
                className={`${inputBase} ${errors.username ? inputErr : inputNormal}`}
              />
              <FieldError msg={errors.username} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="profile-email" className="block text-sm font-medium text-text-primary mb-1.5">
              Email Address <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={set('email')}
              maxLength={120}
              aria-invalid={Boolean(errors.email)}
              className={`${inputBase} ${errors.email ? inputErr : inputNormal}`}
            />
            <FieldError msg={errors.email} />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="profile-bio" className="block text-sm font-medium text-text-primary mb-1.5">
              Bio
            </label>
            <textarea
              id="profile-bio"
              value={form.bio}
              onChange={set('bio')}
              rows={3}
              maxLength={300}
              placeholder="Tell us a little about yourself…"
              className={`${inputBase} ${inputNormal} resize-none leading-relaxed`}
            />
            <p className="mt-1 text-[11px] text-text-muted text-right tabular-nums">{form.bio.length}/300</p>
          </div>
        </CardContent>

        <CardFooter className="bg-background-subtle/50">
          <span className="text-xs">
            {saved
              ? <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><CheckCircle2 className="h-3.5 w-3.5" />Profile saved successfully.</span>
              : <span className="text-text-secondary">Changes are saved to this session only.</span>
            }
          </span>
          <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="h-4 w-4" />}>
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default ProfileSettings;
