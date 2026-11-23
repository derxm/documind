import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

/**
 * Mobile Slide-out Drawer Sidebar with Backdrop Overlay.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 */
export function MobileSidebar({ isOpen, onClose }) {
  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* 1. Semi-transparent backdrop overlay */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Slide-out sidebar container */}
      <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-surface shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
        {/* Close Button Header */}
        <div className="absolute top-4 right-3 z-10">
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <Sidebar onItemClick={onClose} />
      </div>
    </div>
  );
}

export default MobileSidebar;
