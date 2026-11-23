import React, { useState } from 'react';
import {
  User,
  Shield,
  CreditCard,
  Bell,
  Key,
  Save,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Badge,
} from '../../components';

export function SettingsPage() {
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@documind.ai');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
          Account Settings
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Manage your personal profile, workspace preferences, and application settings.
        </p>
      </div>

      {/* Profile Card */}
      <Card padding="none">
        <form onSubmit={handleSave}>
          <CardHeader className="border-b border-border-subtle">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your contact details and how you appear across DocuMind AI.
                </CardDescription>
              </div>
              <Badge variant="accent" size="sm">
                Pro Member
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold shadow-subtle">
                AM
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
                <p className="text-[11px] text-text-secondary mt-1">
                  JPG, GIF or PNG. Max size 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="bg-background-subtle/50">
            <span className="text-xs text-text-secondary">
              {saved ? (
                <span className="text-emerald-600 font-medium">
                  ✓ Changes saved successfully!
                </span>
              ) : (
                'Settings take effect across your sessions immediately.'
              )}
            </span>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SettingsPage;
