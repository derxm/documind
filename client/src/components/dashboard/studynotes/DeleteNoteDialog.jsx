import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../../index';

/**
 * Confirmation dialog before deleting a note.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen
 * @param {Object}   props.note
 * @param {Function} props.onConfirm  (id) => void
 * @param {Function} props.onClose
 */
export function DeleteNoteDialog({ isOpen, note, onConfirm, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-note-title"
        className="relative w-full max-w-md bg-surface rounded-2xl border border-border shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="h-11 w-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200/50">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3
              id="delete-note-title"
              className="text-base font-bold text-primary tracking-tight"
            >
              Delete Note?
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              This will permanently remove the note from your current session.
            </p>
          </div>
        </div>

        <div className="bg-background-subtle rounded-xl px-3 py-2.5 border border-border mb-5">
          <p className="text-xs font-semibold text-primary truncate">{note.title}</p>
          <p className="text-[11px] text-text-muted mt-0.5">
            {note.category} · {note.keyPoints} key points
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={() => onConfirm(note.id)}
            className="inline-flex items-center justify-center font-medium transition-all duration-200 px-4 py-2 text-sm rounded-xl gap-2 bg-red-600 hover:bg-red-700 text-white shadow-subtle focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteNoteDialog;
