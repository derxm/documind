import React, { useState, useEffect } from 'react';
import { FileText, X, ChevronDown, Search, Check } from 'lucide-react';
import { assistantDocuments } from './assistantData';

// ---------------------------------------------------------------------------
// Document picker modal
// ---------------------------------------------------------------------------
function DocumentPickerModal({ selectedId, onSelect, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const filtered = query.trim()
    ? assistantDocuments.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.fileName.toLowerCase().includes(query.toLowerCase())
      )
    : assistantDocuments;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-picker-title"
        className="relative w-full max-w-sm bg-surface rounded-2xl border border-border shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <h3 id="doc-picker-title" className="text-sm font-bold text-primary tracking-tight">
              Select Document Context
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Choose a document for the AI to reference.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close document picker"
            className="p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents…"
              aria-label="Search documents"
              className="w-full bg-background border border-border rounded-xl pl-8 pr-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
            />
          </div>
        </div>

        {/* Document list */}
        <div className="max-h-72 overflow-y-auto px-2 pb-3">
          {filtered.length === 0 && (
            <p className="text-xs text-text-muted text-center py-6">No documents found.</p>
          )}
          {filtered.map((doc) => {
            const isSelected = doc.id === selectedId;
            return (
              <button
                key={doc.id}
                onClick={() => { onSelect(doc.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-colors text-left ${
                  isSelected
                    ? 'bg-accent-secondary border border-accent/20'
                    : 'hover:bg-background border border-transparent'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  doc.type === 'PDF'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200/50'
                    : 'bg-blue-50 text-blue-600 border border-blue-200/50'
                }`}>
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${isSelected ? 'text-accent' : 'text-primary'}`}>
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {doc.type} · {doc.size}
                  </p>
                </div>
                {isSelected && <Check className="h-4 w-4 text-accent shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border-subtle px-5 py-3">
          <p className="text-[10px] text-text-muted leading-relaxed">
            Selecting a document does not upload or analyse it. Full AI document analysis will be available once the backend integration is connected.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DocumentContextSelector — main export
// ---------------------------------------------------------------------------

/**
 * Shows a chip for the selected document, or a button to open the picker.
 *
 * @param {Object}      props
 * @param {string|null} props.selectedDocumentId
 * @param {Function}    props.onSelect    (id) => void
 * @param {Function}    props.onRemove    () => void
 */
export function DocumentContextSelector({ selectedDocumentId, onSelect, onRemove }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const selectedDoc = assistantDocuments.find((d) => d.id === selectedDocumentId);

  return (
    <>
      {selectedDoc ? (
        /* Context chip — selected document */
        <div className="flex items-center gap-1.5 max-w-full">
          <div className="flex items-center gap-2 bg-accent-secondary border border-accent/20 rounded-full pl-2.5 pr-1.5 py-1 min-w-0">
            <div className={`h-4 w-4 rounded flex items-center justify-center shrink-0 ${
              selectedDoc.type === 'PDF' ? 'text-rose-600' : 'text-blue-600'
            }`}>
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-medium text-accent truncate max-w-[140px] sm:max-w-[200px]">
              {selectedDoc.name}
            </span>
            <button
              onClick={onRemove}
              aria-label={`Remove ${selectedDoc.name} from context`}
              className="p-0.5 rounded-full text-accent/60 hover:text-accent hover:bg-accent/10 transition-colors shrink-0"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={() => setPickerOpen(true)}
            aria-label="Change document context"
            title="Change document"
            className="p-1 rounded-full text-text-muted hover:text-text-secondary transition-colors"
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      ) : (
        /* No document selected — trigger button */
        <button
          onClick={() => setPickerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-border text-xs text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-secondary transition-all duration-200"
          aria-label="Select a document for context"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Add document context</span>
          <ChevronDown className="h-3 w-3 ml-0.5" />
        </button>
      )}

      {pickerOpen && (
        <DocumentPickerModal
          selectedId={selectedDocumentId}
          onSelect={onSelect}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </>
  );
}

export default DocumentContextSelector;
