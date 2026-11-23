import React from 'react';
import { Search, X, Filter, ArrowUpDown, RotateCcw } from 'lucide-react';
import { Button } from '../../index';

/**
 * Functional Document Toolbar with Search, File Type, Status Filters, and Sorting.
 *
 * @param {Object} props
 * @param {string} props.searchQuery
 * @param {Function} props.onSearchChange
 * @param {string} props.fileTypeFilter - 'ALL' | 'PDF' | 'DOCX'
 * @param {Function} props.onFileTypeChange
 * @param {string} props.statusFilter - 'ALL' | 'Processed' | 'Processing' | 'Failed'
 * @param {Function} props.onStatusChange
 * @param {string} props.sortBy - 'newest' | 'oldest' | 'name-asc' | 'name-desc'
 * @param {Function} props.onSortChange
 * @param {Function} props.onResetFilters
 * @param {boolean} props.hasActiveFilters
 * @param {number} props.matchCount
 */
export function DocumentToolbar({
  searchQuery,
  onSearchChange,
  fileTypeFilter,
  onFileTypeChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
  matchCount,
}) {
  const fileTypes = [
    { label: 'All Types', value: 'ALL' },
    { label: 'PDF', value: 'PDF' },
    { label: 'DOCX', value: 'DOCX' },
  ];

  const statuses = [
    { label: 'All Statuses', value: 'ALL' },
    { label: 'Processed', value: 'Processed' },
    { label: 'Processing', value: 'Processing' },
    { label: 'Failed', value: 'Failed' },
  ];

  const sortOptions = [
    { label: 'Newest first', value: 'newest' },
    { label: 'Oldest first', value: 'oldest' },
    { label: 'Name A–Z', value: 'name-asc' },
    { label: 'Name Z–A', value: 'name-desc' },
  ];

  return (
    <div className="bg-surface rounded-2xl border border-border p-4 shadow-card space-y-3.5">
      {/* Top Row: Search Input & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Search className="h-4 w-4" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search documents by name..."
            aria-label="Search documents by name"
            className="w-full bg-background border border-border rounded-xl pl-10 pr-9 py-2 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs font-medium text-text-secondary whitespace-nowrap hidden sm:inline">
            Sort by:
          </label>
          <div className="relative w-full sm:w-auto">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort documents"
              className="w-full sm:w-auto bg-background border border-border rounded-xl px-3.5 py-2 text-xs font-semibold text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 cursor-pointer appearance-none pr-8"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-text-secondary">
              <ArrowUpDown className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Filter Pills & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-subtle text-xs">
        {/* Left Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* File Type Filter Pills */}
          <div className="flex items-center gap-1 bg-background-subtle p-1 rounded-xl border border-border-subtle" role="radiogroup" aria-label="Filter by file type">
            {fileTypes.map((type) => {
              const isSelected = fileTypeFilter === type.value;
              return (
                <button
                  key={type.value}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onFileTypeChange(type.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 select-none ${
                    isSelected
                      ? 'bg-surface text-primary shadow-subtle border border-border'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* Status Filter Dropdown / Pills */}
          <div className="flex items-center gap-2">
            <label htmlFor="status-select" className="text-xs text-text-secondary font-medium hidden md:inline">
              Status:
            </label>
            <select
              id="status-select"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by status"
              className="bg-background-subtle border border-border-subtle rounded-xl px-3 py-1.5 text-xs font-medium text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-150 cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Info & Reset Action */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-text-secondary">
            Showing <strong className="text-primary font-bold">{matchCount}</strong> results
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              aria-label="Reset all filters"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover hover:underline transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentToolbar;
