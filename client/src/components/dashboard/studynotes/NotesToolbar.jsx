import React from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

const FILTER_TABS = [
  { id: 'all', label: 'All Notes' },
  { id: 'recent', label: 'Recent' },
  { id: 'favorites', label: 'Favorites' },
];

const SORT_OPTIONS = [
  { value: 'updated-desc', label: 'Recently Updated' },
  { value: 'updated-asc', label: 'Oldest Updated' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'title-desc', label: 'Title Z–A' },
];

/**
 * @param {Object}   props
 * @param {string}   props.search
 * @param {Function} props.onSearchChange
 * @param {string}   props.activeFilter   'all' | 'recent' | 'favorites'
 * @param {Function} props.onFilterChange
 * @param {string}   props.sortBy
 * @param {Function} props.onSortChange
 * @param {number}   props.matchCount
 */
export function NotesToolbar({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  matchCount,
}) {
  return (
    <div className="space-y-3">
      {/* Row 1: Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title or content…"
            aria-label="Search notes"
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-9 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-secondary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort notes"
            className="appearance-none bg-surface border border-border rounded-xl pl-3.5 pr-9 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 cursor-pointer w-full sm:w-auto"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-secondary">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Filter tabs + match count */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div
          role="tablist"
          aria-label="Filter notes"
          className="flex items-center gap-1 bg-background-subtle rounded-xl p-1 border border-border"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeFilter === tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent ${
                activeFilter === tab.id
                  ? 'bg-surface text-accent shadow-subtle border border-accent/20'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {(search || activeFilter !== 'all') && (
          <p className="text-xs text-text-muted">
            {matchCount} note{matchCount !== 1 ? 's' : ''} found
          </p>
        )}
      </div>
    </div>
  );
}

export default NotesToolbar;
