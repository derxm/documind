import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../Badge';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert('Logged out (Demo mode)');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-accent select-none"
      >
        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-subtle">
          AM
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-primary leading-tight">
            Alex Morgan
          </span>
          <span className="text-[11px] text-text-secondary leading-tight">
            Pro Plan
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface rounded-2xl border border-border shadow-dropdown py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Header Info */}
          <div className="px-4 py-2.5 border-b border-border-subtle">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-primary">Alex Morgan</span>
              <Badge variant="accent" size="sm">
                Pro
              </Badge>
            </div>
            <p className="text-[11px] text-text-secondary truncate">
              alex@documind.ai
            </p>
          </div>

          {/* Links */}
          <div className="py-1.5">
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-background transition-colors"
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-background transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-background transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              <span>Billing & Plan</span>
            </Link>
          </div>

          <div className="border-t border-border-subtle my-1" />

          {/* Help & Logout */}
          <div className="py-1">
            <button
              onClick={() => {
                alert('Support center will open here');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-background transition-colors text-left"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
