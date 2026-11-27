import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  LayoutDashboard,
  Files,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Settings,
  LogOut,
  Zap,
  Info,
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { Button } from '../Button';
import { Badge } from '../Badge';

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    to: '/documents',
    label: 'My Documents',
    icon: <Files className="h-5 w-5" />,
  },
  {
    to: '/assistant',
    label: 'AI Assistant',
    icon: <MessageSquare className="h-5 w-5" />,
    badge: 'AI',
  },
  {
    to: '/study-notes',
    label: 'Study Notes',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    to: '/quiz-generator',
    label: 'Quiz Generator',
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

/**
 * Reusable Sidebar navigation component.
 *
 * @param {Object} props
 * @param {Function} [props.onItemClick] - Called when a nav link is clicked (e.g. to close mobile drawer)
 */
export function Sidebar({ onItemClick }) {
  const [toast, setToast]   = useState(null);
  const toastTimerRef       = useRef(null);

  useEffect(() => {
    return () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); };
  }, []);

  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = () => {
    showToast('Sign-out will be available once authentication is connected.');
  };

  return (
    <div className="flex flex-col h-full bg-surface border-r border-border select-none">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary text-white shadow-2xl border border-primary/20 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200 max-w-xs">
          <Info className="h-4 w-4 text-blue-300 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
      {/* 1. Logo & Branding */}
      <div className="h-[70px] px-6 flex items-center border-b border-border-subtle shrink-0">
        <Link
          to="/"
          onClick={onItemClick}
          className="flex items-center gap-3 group"
        >
          <div className="h-10 w-10 rounded-xl bg-accent-secondary flex items-center justify-center text-accent transition-transform duration-200 group-hover:scale-105 shadow-subtle">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-primary tracking-tight">
              DocuMind
            </span>
            <span className="text-lg font-bold text-accent">AI</span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation Items */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 mb-2">
          <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Menu
          </span>
        </div>
        {navItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            onClick={onItemClick}
          />
        ))}
      </div>

      {/* 3. Bottom Sidebar Section */}
      <div className="p-4 border-t border-border-subtle space-y-4 shrink-0 bg-background/50">
        {/* Upgrade Plan Card */}
        <div className="p-4 rounded-xl bg-surface border border-border shadow-subtle relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="accent" size="sm">
              <Zap className="h-3 w-3 mr-1 text-accent fill-accent" />
              Pro Plan
            </Badge>
          </div>
          <h4 className="text-sm font-semibold text-primary mb-1">
            Upgrade Storage
          </h4>
          <p className="text-xs text-text-secondary mb-3 leading-relaxed">
            Unlock unlimited AI document summaries & vector queries.
          </p>
          <Button
            size="sm"
            variant="primary"
            fullWidth
            onClick={() => showToast('Plan upgrades will be available once payment integration is connected.')}
          >
            Upgrade Now
          </Button>
        </div>

        {/* User Profile Section & Logout */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-surface border border-border-subtle">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              AM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary truncate leading-tight">
                Alex Morgan
              </p>
              <p className="text-[11px] text-text-secondary truncate leading-tight">
                alex@documind.ai
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
