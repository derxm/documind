import React from 'react';
import { BookOpen, Search, Heart, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../index';

/**
 * @param {Object}   props
 * @param {'no-notes'|'no-results'|'no-favorites'|'no-filter-match'} props.type
 * @param {Function} [props.onCreateNote]
 * @param {Function} [props.onResetFilters]
 */
export function NotesEmptyState({ type, onCreateNote, onResetFilters }) {
  const configs = {
    'no-notes': {
      Icon: BookOpen,
      iconColor: 'bg-accent-secondary text-accent',
      title: 'No notes yet',
      description: 'Create your first study note to start building your personal knowledge library.',
      action: onCreateNote && (
        <Button variant="primary" size="md" onClick={onCreateNote}>
          Create First Note
        </Button>
      ),
    },
    'no-results': {
      Icon: Search,
      iconColor: 'bg-background-subtle text-text-muted',
      title: 'No notes match your search',
      description: 'Try different keywords or clear the search to browse all notes.',
      action: onResetFilters && (
        <Button variant="outline" size="md" onClick={onResetFilters}>
          Clear Search
        </Button>
      ),
    },
    'no-favorites': {
      Icon: Heart,
      iconColor: 'bg-rose-50 text-rose-500',
      title: 'No favorite notes',
      description: 'Mark notes as favorites using the heart icon on any note card.',
      action: onResetFilters && (
        <Button variant="outline" size="md" onClick={onResetFilters}>
          View All Notes
        </Button>
      ),
    },
    'no-filter-match': {
      Icon: SlidersHorizontal,
      iconColor: 'bg-background-subtle text-text-muted',
      title: 'No notes match the current filters',
      description: 'Try adjusting your filter or sort settings.',
      action: onResetFilters && (
        <Button variant="outline" size="md" onClick={onResetFilters}>
          Reset Filters
        </Button>
      ),
    },
  };

  const config = configs[type] || configs['no-notes'];
  const { Icon, iconColor, title, description, action } = config;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${iconColor}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-base font-bold text-primary tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed mb-6">{description}</p>
      {action}
    </div>
  );
}

export default NotesEmptyState;
