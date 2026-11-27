import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Send, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '../../index';
import { difficultyStyles } from './quizData';

// ---------------------------------------------------------------------------
// Submit confirmation dialog
// ---------------------------------------------------------------------------
function SubmitConfirmDialog({ unanswered, onConfirm, onCancel }) {
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog" aria-modal="true" aria-labelledby="submit-dialog-title"
        className="relative w-full max-w-sm bg-surface rounded-2xl border border-border shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 id="submit-dialog-title" className="text-sm font-bold text-primary">Submit Quiz?</h3>
            {unanswered > 0 ? (
              <p className="text-xs text-text-secondary mt-1">
                You have <strong>{unanswered}</strong> unanswered question{unanswered !== 1 ? 's' : ''}. Unanswered questions will be marked incorrect.
              </p>
            ) : (
              <p className="text-xs text-text-secondary mt-1">All questions answered. Ready to submit?</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onCancel}>Review</Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuizTakingView
// ---------------------------------------------------------------------------
/**
 * @param {Object}   props
 * @param {Object}   props.quiz         quiz metadata
 * @param {Array}    props.questions    array of question objects
 * @param {boolean}  props.insufficient true if fewer questions than requested
 * @param {Function} props.onSubmit     (answers: { [questionId]: selectedIndex }) => void
 * @param {Function} props.onExit       () => void
 */
export function QuizTakingView({ quiz, questions, insufficient, onSubmit, onExit }) {
  const [current, setCurrent]         = useState(0);
  const [answers, setAnswers]         = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const total      = questions.length;
  const question   = questions[current];
  const answered   = Object.keys(answers).length;
  const unanswered = total - answered;
  const diff       = difficultyStyles[quiz.difficulty] || difficultyStyles.Medium;

  const selectAnswer = (idx) => {
    setAnswers((prev) => ({ ...prev, [question.id]: idx }));
  };

  const handleSubmitRequest = () => setShowConfirm(true);
  const handleConfirmSubmit = () => { setShowConfirm(false); onSubmit(answers); };

  const progressPct = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight truncate">{quiz.title}</h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}>
              {quiz.difficulty}
            </span>
            <span className="text-xs text-text-secondary">{quiz.sourceName}</span>
          </div>
        </div>
        <button
          onClick={onExit}
          aria-label="Exit quiz"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary hover:text-primary hover:bg-background border border-border rounded-xl transition-colors"
        >
          <X className="h-3.5 w-3.5" />Exit
        </button>
      </div>

      {/* Insufficient questions notice */}
      {insufficient && (
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            Only {total} question{total !== 1 ? 's' : ''} are available for this configuration. The quiz has been adjusted.
          </p>
        </div>
      )}

      {/* Progress bar */}
      <div className="bg-surface border border-border rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Question {current + 1} of {total}</span>
          <span>{answered} answered · {unanswered} remaining</span>
        </div>
        <div className="w-full bg-background-subtle rounded-full h-2 overflow-hidden" aria-label={`Progress: ${progressPct}%`}>
          <div
            className="h-2 bg-accent rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {/* Question dots — show up to 20 */}
        {total <= 20 && (
          <div className="flex flex-wrap gap-1.5 pt-1" role="list" aria-label="Question navigation dots">
            {questions.map((q, i) => {
              const isAns = answers[q.id] !== undefined;
              const isCur = i === current;
              return (
                <button
                  key={q.id}
                  role="listitem"
                  onClick={() => setCurrent(i)}
                  aria-label={`Question ${i + 1}${isAns ? ', answered' : ''}`}
                  aria-current={isCur ? 'true' : undefined}
                  className={`h-6 w-6 rounded-full text-[10px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
                    isCur
                      ? 'bg-accent text-white scale-110'
                      : isAns
                      ? 'bg-emerald-400 text-white'
                      : 'bg-background-subtle text-text-muted hover:bg-border'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Question card */}
      <div className="bg-surface border border-border rounded-2xl shadow-card p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            {question.type === 'tf' ? 'True / False' : 'Multiple Choice'}
          </span>
          <p className="mt-2 text-base sm:text-lg font-semibold text-primary leading-relaxed">
            {question.text}
          </p>
        </div>

        {/* Answer options */}
        <fieldset>
          <legend className="sr-only">Answer options for question {current + 1}</legend>
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const selected = answers[question.id] === idx;
              return (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                    selected
                      ? 'bg-accent-secondary border-accent ring-2 ring-accent/20'
                      : 'bg-background border-border hover:border-accent/40 hover:bg-accent-secondary/20'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    value={idx}
                    checked={selected}
                    onChange={() => selectAnswer(idx)}
                    className="sr-only"
                  />
                  {/* Custom radio indicator */}
                  <span
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      selected ? 'border-accent bg-accent' : 'border-border bg-surface'
                    }`}
                    aria-hidden="true"
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>

                  {/* Option letter */}
                  <span className={`text-xs font-bold w-5 shrink-0 ${selected ? 'text-accent' : 'text-text-muted'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>

                  <span className={`text-sm font-medium leading-snug ${selected ? 'text-accent' : 'text-text-primary'}`}>
                    {opt}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Button
          variant="outline"
          size="md"
          leftIcon={<ChevronLeft className="h-4 w-4" />}
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Previous
        </Button>

        <span className="text-xs text-text-muted tabular-nums">
          {current + 1} / {total}
        </span>

        {current < total - 1 ? (
          <Button
            variant="primary"
            size="md"
            rightIcon={<ChevronRight className="h-4 w-4" />}
            onClick={() => setCurrent((c) => c + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            leftIcon={<Send className="h-4 w-4" />}
            onClick={handleSubmitRequest}
          >
            Submit Quiz
          </Button>
        )}
      </div>

      {showConfirm && (
        <SubmitConfirmDialog
          unanswered={unanswered}
          onConfirm={handleConfirmSubmit}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default QuizTakingView;
