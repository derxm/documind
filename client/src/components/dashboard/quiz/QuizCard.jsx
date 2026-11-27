import React, { useState, useEffect, useRef } from 'react';
import {
  Play, MoreHorizontal, Trash2, RotateCcw,
  FileText, HelpCircle, Trophy,
} from 'lucide-react';
import { difficultyStyles, formatDate } from './quizData';

/**
 * @param {Object}   props
 * @param {Object}   props.quiz
 * @param {Function} props.onStart   (quiz) => void
 * @param {Function} props.onDelete  (quiz) => void
 */
export function QuizCard({ quiz, onStart, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const diff = difficultyStyles[quiz.difficulty] || difficultyStyles.Medium;
  const isCompleted = quiz.status === 'completed';

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
      aria-label={`Quiz: ${quiz.title}`}
    >
      {/* Top colour strip */}
      <div className={`h-1.5 w-full ${isCompleted ? 'bg-emerald-400' : 'bg-border'}`} aria-hidden="true" />

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-sm font-bold text-primary leading-snug tracking-tight line-clamp-2">
            {quiz.title}
          </h3>

          {/* Actions menu */}
          <div ref={menuRef} className="relative shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={`Actions for ${quiz.title}`}
              aria-expanded={menuOpen}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-background transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 w-40 bg-surface rounded-xl border border-border shadow-dropdown py-1.5 z-30 animate-in fade-in-0 zoom-in-95 duration-100">
                <button
                  onClick={() => { setMenuOpen(false); onStart(quiz); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                >
                  {isCompleted ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {isCompleted ? 'Retake' : 'Start Quiz'}
                </button>
                <div className="border-t border-border-subtle my-1" />
                <button
                  onClick={() => { setMenuOpen(false); onDelete(quiz); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Difficulty + status badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}>
            {quiz.difficulty}
          </span>
          {isCompleted ? (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-background-subtle text-text-muted border border-border">
              Not Attempted
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-[11px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <FileText className="h-3 w-3 shrink-0" />
            {quiz.sourceName}
          </span>
          <span className="flex items-center gap-1.5">
            <HelpCircle className="h-3 w-3 shrink-0" />
            {quiz.questionCount} question{quiz.questionCount !== 1 ? 's' : ''}
          </span>
          {isCompleted && quiz.bestScore !== null && (
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <Trophy className="h-3 w-3 shrink-0" />
              Best score: {quiz.bestScore}%
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border-subtle">
          <span className="text-[11px] text-text-muted">Created {formatDate(quiz.createdAt)}</span>
          <button
            onClick={() => onStart(quiz)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-hover transition-all duration-200 shadow-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
          >
            {isCompleted ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isCompleted ? 'Retake' : 'Start Quiz'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default QuizCard;
