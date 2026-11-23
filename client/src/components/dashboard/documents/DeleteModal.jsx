import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../../index';

/**
 * Confirmation dialog before removing a document record.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Object} props.document
 * @param {Function} props.onConfirm
 * @param {Function} props.onClose
 */
export function DeleteModal({ isOpen, document, onConfirm, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
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
              id="delete-dialog-title"
              className="text-lg font-bold text-primary tracking-tight"
            >
              Delete Document?
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              This action will remove the document from your local demonstration session.
            </p>
          </div>
        </div>

        <div className="bg-background-subtle rounded-xl p-3 border border-border mb-6">
          <p className="text-xs font-semibold text-primary truncate">
            {document.name}
          </p>
          <p className="text-[11px] text-text-muted mt-0.5">
            {document.fileName} • {document.size}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={() => onConfirm(document.id)}
            className="inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out px-4 py-2 text-sm rounded-xl gap-2 bg-red-600 hover:bg-red-700 text-white shadow-subtle focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
