import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { Button } from '../../index';
import { availableCategories } from './studyNotesData';

const EMPTY_FORM = { title: '', category: 'Computer Science', content: '' };

/**
 * Create / Edit note modal.
 *
 * @param {Object}      props
 * @param {boolean}     props.isOpen
 * @param {Object|null} props.note        — null for create, note object for edit
 * @param {Function}    props.onSave      ({ title, category, content }) => void
 * @param {Function}    props.onClose
 */
export function NoteEditorModal({ isOpen, note, onSave, onClose }) {
  const isEdit = Boolean(note);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  // Populate form when modal opens / note changes
  useEffect(() => {
    if (!isOpen) return;
    setSaved(false);
    setErrors({});
    if (note) {
      // For edit: flatten structured sections back to plain text for editing
      const plainContent = (note.sections || [])
        .map((block) => {
          if (block.type === 'heading') return `# ${block.text}`;
          if (block.type === 'paragraph') return block.text;
          if (block.type === 'bullet-list') return block.items.map((i) => `- ${i}`).join('\n');
          if (block.type === 'numbered-list') return block.items.map((i, idx) => `${idx + 1}. ${i}`).join('\n');
          return '';
        })
        .join('\n\n');
      setForm({ title: note.title, category: note.category, content: plainContent });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [isOpen, note]);

  // Keyboard / scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handle);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.category) errs.category = 'Category is required.';
    if (!form.content.trim()) errs.content = 'Note content is required.';
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ title: form.title.trim(), category: form.category, content: form.content.trim() });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 600);
  };

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const inputBase =
    'w-full bg-background border rounded-xl px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-4 transition-all duration-200';
  const inputNormal = 'border-border focus:border-accent focus:ring-accent/10';
  const inputError = 'border-red-300 focus:border-red-500 focus:ring-red-500/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
        className="relative w-full max-w-lg bg-surface rounded-2xl border border-border shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle shrink-0">
          <h2 id="editor-title" className="text-base font-bold text-primary tracking-tight">
            {isEdit ? 'Edit Note' : 'Create Note'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close editor"
            className="p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="note-title" className="block text-sm font-medium text-text-primary mb-1.5">
              Title <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="note-title"
              type="text"
              value={form.title}
              onChange={set('title')}
              placeholder="e.g. Introduction to Data Structures"
              maxLength={120}
              aria-describedby={errors.title ? 'title-error' : undefined}
              aria-invalid={Boolean(errors.title)}
              className={`${inputBase} ${errors.title ? inputError : inputNormal}`}
            />
            {errors.title && (
              <p id="title-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600 font-medium">
                <AlertCircle className="h-3.5 w-3.5" />{errors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="note-category" className="block text-sm font-medium text-text-primary mb-1.5">
              Category <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <select
              id="note-category"
              value={form.category}
              onChange={set('category')}
              aria-describedby={errors.category ? 'category-error' : undefined}
              aria-invalid={Boolean(errors.category)}
              className={`${inputBase} ${errors.category ? inputError : inputNormal} cursor-pointer`}
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p id="category-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600 font-medium">
                <AlertCircle className="h-3.5 w-3.5" />{errors.category}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="note-content" className="block text-sm font-medium text-text-primary mb-1.5">
              Content <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="note-content"
              value={form.content}
              onChange={set('content')}
              rows={12}
              placeholder={
                'Write your notes here.\n\nTips:\n  # Heading\n  - Bullet point\n  1. Numbered item'
              }
              aria-describedby="content-hint"
              aria-invalid={Boolean(errors.content)}
              className={`${inputBase} ${errors.content ? inputError : inputNormal} resize-none leading-relaxed font-mono text-xs`}
            />
            <p id="content-hint" className="mt-1.5 text-xs text-text-muted">
              Plain text. Use # for headings, - for bullets, 1. for numbered lists.
            </p>
            {errors.content && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600 font-medium">
                <AlertCircle className="h-3.5 w-3.5" />{errors.content}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-subtle shrink-0">
          <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Save className="h-4 w-4" />}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? 'Saved!' : isEdit ? 'Save Changes' : 'Create Note'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NoteEditorModal;
