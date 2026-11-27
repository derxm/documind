import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Sparkles } from 'lucide-react';
import UserMenu from './UserMenu';
import { Badge } from '../Badge';
import Toast from '../Toast';
import { useToast } from '../../hooks/useToast';

const routeTitles = {
  '/dashboard': 'Dashboard Overview',
  '/documents': 'My Documents',
  '/assistant': 'AI Document Assistant',
  '/study-notes': 'Study Notes & Guides',
  '/quiz-generator': 'Quiz Generator',
  '/settings': 'Account Settings',
};

/**
 * Top Navigation Header for the Dashboard.
 *
 * @param {Object} props
 * @param {Function} props.onMenuClick - Trigger to open mobile sidebar drawer
 */
export function DashboardHeader({ onMenuClick }) {
  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || 'DocuMind AI';

  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [toast, showToast] = useToast();

  return (
    <header className="sticky top-0 z-20 h-[70px] bg-surface/90 backdrop-blur-md border-b border-border px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <Toast message={toast} />
      {/* Left: Mobile Hamburger & Page Title / Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 text-xs text-text-secondary hidden sm:flex">
            <span>DocuMind</span>
            <span>/</span>
            <span className="text-primary font-medium">{currentTitle}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-primary truncate tracking-tight">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Middle: Quick Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search documents, summaries, quizzes... (Ctrl+K)"
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right: Notifications & User Avatar Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          onClick={() => {
            showToast('The notification inbox is not available in this demonstration.');
            setHasUnreadNotifications(false);
          }}
          title="Notifications"
          className="relative p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Bell className="h-5 w-5" />
          {hasUnreadNotifications && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-surface animate-pulse" />
          )}
        </button>

        <div className="h-6 w-px bg-border-subtle mx-1" />

        {/* User Profile Dropdown */}
        <UserMenu />
      </div>
    </header>
  );
}

export default DashboardHeader;
