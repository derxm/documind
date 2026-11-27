import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  MoreHorizontal,
  BookOpen,
  Pencil,
  Copy,
  Trash2,
  Eye,
  FileText,
  List,
} from 'lucide-react';
import { categoryColors, DEFAULT_CATEGORY_COLOR, formatDate } from './studyNotesData';

/**
 * @param {Object}   props
 * @param {Object}   props.note
 * @param {Function} props.onOpen
 * @param {Function} props.onEdit
 * @param {Function} props.onDelete
 * @param {Function} props.onCopy
 * @param {Function} props.onToggleFavorite
 */
export function NoteCard({ note, onOpen, onEdit, onDelete, onCopy, onToggleFavorite }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const colors = categoryColors[note.category] || DEFAULT_CATEGORY_COLOR;

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [menuOpen]);

  return (
    <article
      className="group bg-surface border border-border rounded-2xl shadow-card hover:shadow-card-hover hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
      aria-label={`Note: ${note.title}`}
    >
      {/* Category colour strip */}
      <div className={`h-1.5 w-full ${colors.dot}`} aria-hidden="true" />

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header row: title + actions */}
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-primary leading-snug line-clamp-2 tracking-tight">
              {note.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Favorite toggle */}
            <button
              onClick={() => onToggleFavorite(note.id)}
              aria-label={note.isFavorite ? `Remove ${note.title} from favorites` : `Add ${note.title} to favorites`}
              aria-pressed={note.isFavorite}
              className={`p-1.5 rounded-lg transition-colors ${
                note.isFavorite
                  ? 'text-rose-500 hover:text-rose-600 hover:bg-rose-50'
                  : 'text-text-muted hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${note.isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* More actions menu */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={`More actions for ${note.title}`}
                aria-expanded={menuOpen}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-background transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-8 w-44 bg-surface rounded-xl border border-border shadow-dropdown py-1.5 z-30 animate-in fade-in-0 zoom-in-95 duration-100">
                  <button
                    onClick={() => { setMenuOpen(false); onOpen(note); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />Open Note
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onEdit(note); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />Edit
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onCopy(note); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />Copy Content
                  </button>
                  <div className="border-t border-border-subtle my-1" />
                  <button
                    onClick={() => { setMenuOpen(false); onDelete(note); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category badge */}
        <span className={`inline-flex items-center self-start gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} aria-hidden="true" />
          {note.category}
        </span>

        {/* Preview */}
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 flex-1">
          {note.preview}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 pt-2 border-t border-border-subtle text-[11px] text-text-muted flex-wrap">
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {note.source}
          </span>
          <span className="flex items-center gap-1">
            <List className="h-3 w-3" />
            {note.keyPoints} key points
          </span>
        </div>

        {/* Footer: date + open button */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-text-muted">
            Updated {formatDate(note.updatedAt)}
          </span>
          <button
            onClick={() => onOpen(note)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-secondary text-accent text-xs font-medium rounded-lg hover:bg-accent hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
          >
            <BookOpen className="h-3 w-3" />
            Open
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
