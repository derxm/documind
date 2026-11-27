import React from 'react';
import {
  ArrowLeft,
  Pencil,
  Copy,
  Trash2,
  FileText,
  List,
  Calendar,
  Tag,
  Heart,
} from 'lucide-react';
import { Button, Badge } from '../../index';
import { NoteContentRenderer } from './NoteContentRenderer';
import { categoryColors, DEFAULT_CATEGORY_COLOR, formatDate } from './studyNotesData';

/**
 * Full-page note detail view.
 *
 * @param {Object}   props
 * @param {Object}   props.note
 * @param {Function} props.onBack
 * @param {Function} props.onEdit
 * @param {Function} props.onDelete
 * @param {Function} props.onCopy
 * @param {Function} props.onToggleFavorite
 */
export function NoteDetailView({ note, onBack, onEdit, onDelete, onCopy, onToggleFavorite }) {
  const colors = categoryColors[note.category] || DEFAULT_CATEGORY_COLOR;

  return (
    <div className="space-y-6">
      {/* Top navigation bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1 -ml-1"
          aria-label="Back to notes list"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Notes
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onToggleFavorite(note.id)}
            aria-label={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={note.isFavorite}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              note.isFavorite
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-surface text-text-secondary border-border hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${note.isFavorite ? 'fill-current' : ''}`} />
            {note.isFavorite ? 'Favorited' : 'Favorite'}
          </button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Copy className="h-3.5 w-3.5" />}
            onClick={() => onCopy(note)}
          >
            Copy
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Pencil className="h-3.5 w-3.5" />}
            onClick={() => onEdit(note)}
          >
            Edit
          </Button>

          <button
            onClick={() => onDelete(note)}
            aria-label="Delete note"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-surface text-red-600 border border-border hover:bg-red-50 hover:border-red-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Note content card */}
      <div className="bg-surface border border-border rounded-2xl shadow-card overflow-hidden">
        {/* Category strip */}
        <div className={`h-1.5 w-full ${colors.dot}`} aria-hidden="true" />

        <div className="p-6 sm:p-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight leading-snug mb-4">
            {note.title}
          </h1>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
              <Tag className="h-3 w-3" />
              {note.category}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-background-subtle text-text-secondary border border-border">
              <FileText className="h-3 w-3" />
              {note.source}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-background-subtle text-text-secondary border border-border">
              <List className="h-3 w-3" />
              {note.keyPoints} key points
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-background-subtle text-text-secondary border border-border">
              <Calendar className="h-3 w-3" />
              Updated {formatDate(note.updatedAt)}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-border-subtle mb-6" />

          {/* Structured content */}
          <NoteContentRenderer sections={note.sections} />
        </div>
      </div>
    </div>
  );
}

export default NoteDetailView;
