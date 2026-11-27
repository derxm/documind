import React from 'react';
import { RotateCcw, ArrowLeft, CheckCircle2, XCircle, Minus } from 'lucide-react';
import { Button } from '../../index';
import { scoreLabel } from './quizData';

// ---------------------------------------------------------------------------
// Circular score ring
// ---------------------------------------------------------------------------
function ScoreRing({ pct }) {
  const r   = 42;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);

  return (
    <div className="relative h-32 w-32 mx-auto" aria-label={`Score: ${pct}%`}>
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#F1F3F9" strokeWidth="10" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={pct >= 75 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-primary tabular-nums">{pct}%</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuizResultsView
// ---------------------------------------------------------------------------
/**
 * @param {Object}   props
 * @param {Object}   props.quiz
 * @param {Array}    props.questions
 * @param {Object}   props.answers      { [questionId]: selectedIndex }
 * @param {Function} props.onRetake
 * @param {Function} props.onBack
 */
export function QuizResultsView({ quiz, questions, answers, onRetake, onBack }) {
  // Score calculation
  const correct   = questions.filter((q) => answers[q.id] === q.answer);
  const incorrect = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.answer);
  const skipped   = questions.filter((q) => answers[q.id] === undefined);
  const total     = questions.length;
  const pct       = total > 0 ? Math.round((correct.length / total) * 100) : 0;
  const { label: perfLabel, color: perfColor } = scoreLabel(pct);

  return (
    <div className="space-y-8 pb-12">
      {/* Back link */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1 -ml-1"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Quiz Library
        </button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          onClick={onRetake}
        >
          Retake Quiz
        </Button>
      </div>

      {/* Score summary card */}
      <div className="bg-surface border border-border rounded-2xl shadow-card p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight mb-1">{quiz.title}</h1>
          <p className="text-sm text-text-secondary">Quiz Complete</p>
        </div>

        <ScoreRing pct={pct} />

        <div className="text-center mt-4 mb-6">
          <p className={`text-lg font-bold ${perfColor}`}>{perfLabel}</p>
          <p className="text-sm text-text-secondary mt-1">
            {correct.length} out of {total} correct
          </p>
        </div>

        {/* Summary grid */}
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          <div className="text-center bg-emerald-50 border border-emerald-200/60 rounded-xl py-3">
            <p className="text-xl font-bold text-emerald-700 tabular-nums">{correct.length}</p>
            <p className="text-xs text-emerald-600 mt-0.5">Correct</p>
          </div>
          <div className="text-center bg-red-50 border border-red-200/60 rounded-xl py-3">
            <p className="text-xl font-bold text-red-700 tabular-nums">{incorrect.length}</p>
            <p className="text-xs text-red-600 mt-0.5">Incorrect</p>
          </div>
          <div className="text-center bg-background-subtle border border-border rounded-xl py-3">
            <p className="text-xl font-bold text-text-secondary tabular-nums">{skipped.length}</p>
            <p className="text-xs text-text-muted mt-0.5">Skipped</p>
          </div>
        </div>
      </div>

      {/* Question review */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-primary tracking-tight">Question Review</h2>

        {questions.map((q, i) => {
          const userIdx    = answers[q.id];
          const isCorrect  = userIdx === q.answer;
          const isSkipped  = userIdx === undefined;

          let statusIcon, statusBg, statusBorder;
          if (isSkipped) {
            statusIcon   = <Minus className="h-4 w-4 text-text-muted" />;
            statusBg     = 'bg-background-subtle';
            statusBorder = 'border-border';
          } else if (isCorrect) {
            statusIcon   = <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
            statusBg     = 'bg-emerald-50';
            statusBorder = 'border-emerald-200/60';
          } else {
            statusIcon   = <XCircle className="h-4 w-4 text-red-600" />;
            statusBg     = 'bg-red-50';
            statusBorder = 'border-red-200/60';
          }

          return (
            <div
              key={q.id}
              className={`${statusBg} border ${statusBorder} rounded-2xl p-5 space-y-3`}
            >
              {/* Q header */}
              <div className="flex items-start gap-3">
                <span className="shrink-0 h-6 w-6 rounded-full bg-background-subtle text-text-muted text-[11px] font-bold flex items-center justify-center border border-border mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-primary leading-snug">{q.text}</p>
                    <span className="shrink-0">{statusIcon}</span>
                  </div>
                  <span className="text-[10px] font-medium text-text-muted mt-0.5 inline-block">
                    {q.type === 'tf' ? 'True / False' : 'Multiple Choice'}
                  </span>
                </div>
              </div>

              {/* Answers */}
              <div className="space-y-1.5 pl-9">
                {q.options.map((opt, idx) => {
                  const isUserPick    = idx === userIdx;
                  const isCorrectOpt  = idx === q.answer;
                  let optStyle = 'text-text-secondary';
                  let badge    = null;

                  if (isCorrectOpt) {
                    optStyle = 'text-emerald-700 font-semibold';
                    badge    = <span className="ml-1.5 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">Correct</span>;
                  }
                  if (isUserPick && !isCorrect) {
                    optStyle = 'text-red-700 font-semibold line-through';
                    badge    = <span className="ml-1.5 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">Your answer</span>;
                  }

                  return (
                    <div key={idx} className={`flex items-start gap-1.5 text-xs ${optStyle}`}>
                      <span className="shrink-0 font-bold">{String.fromCharCode(65 + idx)}.</span>
                      <span>{opt}</span>
                      {badge}
                    </div>
                  );
                })}

                {isSkipped && (
                  <p className="text-xs text-text-muted italic">Not answered.</p>
                )}
              </div>

              {/* Explanation */}
              <div className="pl-9 pt-1 border-t border-current/10">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="font-semibold text-text-primary">Explanation: </span>
                  {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Button variant="outline" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={onBack}>
          Back to Quiz Library
        </Button>
        <Button variant="primary" size="md" leftIcon={<RotateCcw className="h-4 w-4" />} onClick={onRetake}>
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}

export default QuizResultsView;
