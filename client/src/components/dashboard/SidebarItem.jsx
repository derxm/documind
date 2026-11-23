import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Reusable Sidebar Navigation Item using React Router NavLink.
 *
 * @param {Object} props
 * @param {string} props.to - Route path
 * @param {React.ReactNode} props.icon - Lucide icon
 * @param {string} props.label - Display label
 * @param {string} [props.badge] - Optional pill badge (e.g. 'Pro', 'New')
 * @param {Function} [props.onClick] - Optional click handler (e.g. for closing mobile drawer)
 */
export function SidebarItem({ to, icon, label, badge, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ease-in-out select-none
        ${
          isActive
            ? 'bg-accent-secondary text-accent font-semibold shadow-subtle border border-accent/20'
            : 'text-text-secondary hover:text-primary hover:bg-background border border-transparent'
        }
      `}
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex shrink-0 transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-text-secondary group-hover:text-primary'
              }`}
            >
              {icon}
            </span>
            <span className="truncate">{label}</span>
          </div>

          {badge && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isActive
                  ? 'bg-accent text-white'
                  : 'bg-background-subtle text-text-secondary border border-border'
              }`}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default SidebarItem;
