import React from 'react';
import { Info } from 'lucide-react';

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary text-white shadow-2xl border border-primary/20 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200 max-w-sm"
    >
      <Info className="h-4 w-4 text-blue-300 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export default Toast;
