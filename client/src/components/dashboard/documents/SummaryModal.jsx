import React, { useEffect } from 'react';
import { Sparkles, X, FileText, Info } from 'lucide-react';
import { Button, Badge } from '../../index';

/**
 * Informational dialog for the "View Summary" action.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Object} props.document
 * @param {Function} props.onClose
 */
export function SummaryModal({ isOpen, document, onClose }) {
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
        aria-labelledby="summary-dialog-title"
        className="relative w-full max-w-lg bg-surface rounded-2xl border border-border shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="mb-1">
              AI Summary Preview
            </Badge>
            <h3
              id="summary-dialog-title"
              className="text-base font-bold text-primary tracking-tight"
            >
              {document.name}
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-background border border-border space-y-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <FileText className="h-4 w-4 text-accent" />
            <span className="font-semibold text-primary">{document.fileName}</span>
            <span>•</span>
            <span>{document.size}</span>
            <span>•</span>
            <span>Added {document.dateAdded}</span>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border-subtle text-xs text-text-secondary space-y-2">
            <p className="font-semibold text-primary">Demonstration Synopsis:</p>
            <p className="leading-relaxed">
              This document covers foundational principles, key architectural models, and core problem definitions. Key sections include theory, implementation paradigms, and practical considerations.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-accent-secondary/40 border border-accent/20 text-xs text-text-secondary mb-6">
          <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
          <p className="leading-relaxed">
            <strong>Upcoming Phase 5 Capability:</strong> Full automated multi-page summarization, key takeaway extraction, and vector index generation will connect to OpenAI API services in Phase 5.
          </p>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="md" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;
