import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Plus, Search, X, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '../../components';

import { QuizStats }         from '../../components/dashboard/quiz/QuizStats';
import { QuizCreatorModal }  from '../../components/dashboard/quiz/QuizCreatorModal';
import { QuizCard }          from '../../components/dashboard/quiz/QuizCard';
import { QuizTakingView }    from '../../components/dashboard/quiz/QuizTakingView';
import { QuizResultsView }   from '../../components/dashboard/quiz/QuizResultsView';
import { QuizEmptyState }    from '../../components/dashboard/quiz/QuizEmptyState';
import { DeleteQuizDialog }  from '../../components/dashboard/quiz/DeleteQuizDialog';
import { initialQuizzes, selectQuestions } from '../../components/dashboard/quiz/quizData';

// ---------------------------------------------------------------------------
// ID generator
// ---------------------------------------------------------------------------
let _seq = 200;
const uid = () => `quiz-${++_seq}-${Date.now()}`;

// ---------------------------------------------------------------------------
// View states: 'library' | 'taking' | 'results'
// ---------------------------------------------------------------------------

export function QuizGeneratorPage() {
  // --- Quiz library state ---
  const [quizzes, setQuizzes]     = useState(initialQuizzes);
  const [search, setSearch]       = useState('');

  // --- Creator modal ---
  const [creatorOpen, setCreatorOpen] = useState(false);

  // --- Delete dialog ---
  const [deleteTarget, setDeleteTarget] = useState(null);

  // --- Quiz session state ---
  const [view, setView]               = useState('library');  // 'library' | 'taking' | 'results'
  const [activeQuiz, setActiveQuiz]   = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [insufficient, setInsufficient]       = useState(false);
  const [lastAnswers, setLastAnswers]         = useState({});

  // --- Toast ---
  const [toast, setToast]       = useState(null);
  const toastTimerRef           = useRef(null);

  const showToast = useCallback((msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  }, []);

  React.useEffect(() => () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); }, []);

  // ---------------------------------------------------------------------------
  // Derived stats
  // ---------------------------------------------------------------------------
  const completed  = quizzes.filter((q) => q.status === 'completed').length;
  const scores     = quizzes.filter((q) => q.bestScore !== null).map((q) => q.bestScore);
  const avgScore   = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  // ---------------------------------------------------------------------------
  // Filtered quiz list
  // ---------------------------------------------------------------------------
  const visibleQuizzes = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return quizzes;
    return quizzes.filter(
      (qz) =>
        qz.title.toLowerCase().includes(q) ||
        qz.sourceName.toLowerCase().includes(q)
    );
  }, [quizzes, search]);

  // ---------------------------------------------------------------------------
  // Quiz library actions
  // ---------------------------------------------------------------------------
  const handleCreate = useCallback((config) => {
    const { questions, insufficient: ins } = selectQuestions({
      sourceId: config.sourceId,
      count:    config.count,
      types:    config.types,
    });

    const newQuiz = {
      id:            uid(),
      title:         config.title,
      sourceId:      config.sourceId,
      sourceName:    config.sourceName,
      questionCount: questions.length,
      difficulty:    config.difficulty,
      types:         config.types,
      bestScore:     null,
      attempts:      0,
      status:        'not-attempted',
      createdAt:     Date.now(),
      // Store questions on the quiz object for later retakes
      _questions:    questions,
    };

    setQuizzes((prev) => [newQuiz, ...prev]);
    showToast(`"${config.title}" created with ${questions.length} question${questions.length !== 1 ? 's' : ''}.`);

    if (questions.length === 0) return; // empty bank — don't auto-start

    // Auto-start the quiz
    setActiveQuiz(newQuiz);
    setActiveQuestions(questions);
    setInsufficient(ins);
    setLastAnswers({});
    setView('taking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showToast]);

  const handleStart = useCallback((quiz) => {
    // For demo quizzes that have no stored _questions, generate fresh ones
    let questions = quiz._questions;
    let ins       = false;
    if (!questions || questions.length === 0) {
      const result = selectQuestions({
        sourceId: quiz.sourceId,
        count:    quiz.questionCount,
        types:    quiz.types || ['Multiple Choice', 'True / False'],
      });
      questions = result.questions;
      ins       = result.insufficient;
    }

    if (questions.length === 0) {
      showToast('No questions available for this quiz configuration.');
      return;
    }

    setActiveQuiz(quiz);
    setActiveQuestions(questions);
    setInsufficient(ins);
    setLastAnswers({});
    setView('taking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showToast]);

  const handleSubmit = useCallback((answers) => {
    if (!activeQuiz) return;

    // Calculate score
    const correctCount = activeQuestions.filter((q) => answers[q.id] === q.answer).length;
    const pct = activeQuestions.length > 0
      ? Math.round((correctCount / activeQuestions.length) * 100)
      : 0;

    // Update quiz record
    setQuizzes((prev) =>
      prev.map((qz) => {
        if (qz.id !== activeQuiz.id) return qz;
        return {
          ...qz,
          status:    'completed',
          attempts:  (qz.attempts || 0) + 1,
          bestScore: qz.bestScore === null ? pct : Math.max(qz.bestScore, pct),
        };
      })
    );

    setLastAnswers(answers);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeQuiz, activeQuestions]);

  const handleRetake = useCallback(() => {
    if (!activeQuiz) return;
    // Re-randomise questions from the same source
    const result = selectQuestions({
      sourceId: activeQuiz.sourceId,
      count:    activeQuiz.questionCount,
      types:    activeQuiz.types || ['Multiple Choice', 'True / False'],
    });
    setActiveQuestions(result.questions);
    setInsufficient(result.insufficient);
    setLastAnswers({});
    setView('taking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeQuiz]);

  const handleBackToLibrary = useCallback(() => {
    setView('library');
    setActiveQuiz(null);
    setActiveQuestions([]);
    setLastAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleteRequest = useCallback((quiz) => setDeleteTarget(quiz), []);

  const handleConfirmDelete = useCallback((id) => {
    const target = quizzes.find((q) => q.id === id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    setDeleteTarget(null);
    if (target) showToast(`"${target.title}" deleted.`);
  }, [quizzes, showToast]);

  // ---------------------------------------------------------------------------
  // Render — quiz taking
  // ---------------------------------------------------------------------------
  if (view === 'taking' && activeQuiz) {
    return (
      <div className="pb-12">
        <QuizTakingView
          quiz={activeQuiz}
          questions={activeQuestions}
          insufficient={insufficient}
          onSubmit={handleSubmit}
          onExit={handleBackToLibrary}
        />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render — results
  // ---------------------------------------------------------------------------
  if (view === 'results' && activeQuiz) {
    return (
      <div className="pb-12">
        <QuizResultsView
          quiz={activeQuiz}
          questions={activeQuestions}
          answers={lastAnswers}
          onRetake={handleRetake}
          onBack={handleBackToLibrary}
        />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render — library
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-8 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary text-white shadow-2xl border border-primary/20 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200 max-w-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Quiz Generator</h1>
            <Badge variant="accent" size="sm">{quizzes.length} Quiz{quizzes.length !== 1 ? 'zes' : ''}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Test your understanding and turn what you've learned into progress.
          </p>
          <p className="text-xs text-text-muted mt-1">
            Quizzes can be generated from your uploaded documents once AI integration is connected.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setCreatorOpen(true)}
          className="shadow-subtle shrink-0"
        >
          Create New Quiz
        </Button>
      </div>

      {/* Stats */}
      <QuizStats
        created={quizzes.length}
        completed={completed}
        avgScore={avgScore}
      />

      {/* Search bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search quizzes…"
          aria-label="Search quizzes"
          className="w-full bg-surface border border-border rounded-xl pl-10 pr-9 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Quiz grid / empty state */}
      {quizzes.length === 0 ? (
        <QuizEmptyState type="no-quizzes" onCreateQuiz={() => setCreatorOpen(true)} />
      ) : visibleQuizzes.length === 0 ? (
        <QuizEmptyState type="no-results" onClearSearch={() => setSearch('')} />
      ) : (
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
          aria-label="Quiz library"
        >
          {visibleQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onStart={handleStart}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <QuizCreatorModal
        isOpen={creatorOpen}
        onClose={() => setCreatorOpen(false)}
        onCreate={handleCreate}
      />

      <DeleteQuizDialog
        isOpen={Boolean(deleteTarget)}
        quiz={deleteTarget}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default QuizGeneratorPage;
