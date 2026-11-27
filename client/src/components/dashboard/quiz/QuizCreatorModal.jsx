import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Button } from '../../index';
import { quizSourceDocuments, DIFFICULTIES } from './quizData';

const QUESTION_COUNTS = [5, 10, 15, 20];
const QUESTION_TYPES  = ['Multiple Choice', 'True / False'];

const EMPTY = {
  title: '',
  sourceId: 'doc-1',
  count: 10,
  difficulty: 'Medium',
  types: ['Multiple Choice', 'True / False'],
};

/**
 * @param {Object}   props
 * @param {boolean}  props.isOpen
 * @param {Function} props.onClose
 * @param {Function} props.onCreate  (config) => void
 */
export function QuizCreatorModal({ isOpen, onClose, onCreate }) {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    setForm(EMPTY);
    setErrors({});
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handle);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleType = (t) => {
    setForm((f) => ({
      ...f,
      types: f.types.includes(t) ? f.types.filter((x) => x !== t) : [...f.types, t],
    }));
    if (errors.types) setErrors((e) => { const n = { ...e }; delete n.types; return n; });
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Quiz title is required.';
    if (form.types.length === 0) errs.types = 'Select at least one question type.';
    return errs;
  };

  const handleGenerate = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const src = quizSourceDocuments.find((d) => d.id === form.sourceId);
    onCreate({
      title:      form.title.trim(),
      sourceId:   form.sourceId,
      sourceName: src?.name ?? 'Unknown',
      count:      form.count,
      difficulty: form.difficulty,
      types:      form.types,
    });
    onClose();
  };

  const inputBase = 'w-full bg-background border rounded-xl px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-4 transition-all duration-200';
  const inputNormal = 'border-border focus:border-accent focus:ring-accent/10';
  const inputError  = 'border-red-300 focus:border-red-500 focus:ring-red-500/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="creator-title"
        className="relative w-full max-w-lg bg-surface rounded-2xl border border-border shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle shrink-0">
          <div>
            <h2 id="creator-title" className="text-base font-bold text-primary tracking-tight">
              Create New Quiz
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">Configure your quiz settings below.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Demo notice */}
          <div className="flex items-start gap-2.5 bg-accent-secondary border border-accent/20 rounded-xl px-3.5 py-3">
            <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-accent leading-relaxed">
              Quizzes are generated from built-in demonstration question banks. Real AI generation from your documents will be available once the OpenAI integration is connected.
            </p>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="quiz-title" className="block text-sm font-medium text-text-primary mb-1.5">
              Quiz Title <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="quiz-title"
              type="text"
              value={form.title}
              onChange={(e) => {
                setForm((f) => ({ ...f, title: e.target.value }));
                if (errors.title) setErrors((er) => { const n = { ...er }; delete n.title; return n; });
              }}
              placeholder="e.g. Data Structures Revision"
              maxLength={100}
              aria-invalid={Boolean(errors.title)}
              className={`${inputBase} ${errors.title ? inputError : inputNormal}`}
            />
            {errors.title && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 font-medium">
                <AlertCircle className="h-3.5 w-3.5" />{errors.title}
              </p>
            )}
          </div>

          {/* Source document */}
          <div>
            <label htmlFor="quiz-source" className="block text-sm font-medium text-text-primary mb-1.5">
              Source Document
            </label>
            <select
              id="quiz-source"
              value={form.sourceId}
              onChange={(e) => setForm((f) => ({ ...f, sourceId: e.target.value }))}
              className={`${inputBase} ${inputNormal} cursor-pointer`}
            >
              {quizSourceDocuments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Number of questions */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">Number of Questions</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Number of questions">
              {QUESTION_COUNTS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, count: n }))}
                  aria-pressed={form.count === n}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent ${
                    form.count === n
                      ? 'bg-accent text-white border-accent shadow-subtle'
                      : 'bg-surface text-text-primary border-border hover:border-accent/40 hover:bg-accent-secondary/30'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">Difficulty</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Difficulty">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, difficulty: d }))}
                  aria-pressed={form.difficulty === d}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent ${
                    form.difficulty === d
                      ? 'bg-accent text-white border-accent shadow-subtle'
                      : 'bg-surface text-text-primary border-border hover:border-accent/40 hover:bg-accent-secondary/30'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Question types */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">
              Question Types <span className="text-red-500" aria-hidden="true">*</span>
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Question types">
              {QUESTION_TYPES.map((t) => {
                const checked = form.types.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleType(t)}
                    aria-pressed={checked}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent ${
                      checked
                        ? 'bg-accent text-white border-accent shadow-subtle'
                        : 'bg-surface text-text-primary border-border hover:border-accent/40 hover:bg-accent-secondary/30'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            {errors.types && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 font-medium">
                <AlertCircle className="h-3.5 w-3.5" />{errors.types}
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
            leftIcon={<Sparkles className="h-4 w-4" />}
            onClick={handleGenerate}
          >
            Generate Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuizCreatorModal;
