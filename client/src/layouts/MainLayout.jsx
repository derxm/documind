import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-accent-secondary flex items-center justify-center text-accent transition-transform duration-200 group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary tracking-tight">
                    DocuMind
                  </span>
                  <span className="text-lg font-bold text-accent">AI</span>
                </div>
              </div>
            </Link>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Open Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="bg-surface border-t border-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="font-semibold text-primary">DocuMind AI</span>
              <span>—</span>
              <span>AI-Powered Document Intelligence</span>
            </div>
            <p className="text-xs text-text-secondary">
              &copy; {new Date().getFullYear()} DocuMind AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
