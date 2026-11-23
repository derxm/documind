import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

/**
 * Production-ready Dashboard Layout for authenticated views.
 */
export function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Automatically close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col antialiased overflow-x-hidden">
      {/* 1. Mobile Slide-out Drawer */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* 2. Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-30">
        <Sidebar />
      </aside>

      {/* 3. Main Application Surface */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Top Sticky Header */}
        <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Dynamic Nested Content via Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
