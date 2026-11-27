import React from 'react';
import { GraduationCap, Search, AlertCircle } from 'lucide-react';
import { Button } from '../../index';

/**
 * @param {'no-quizzes'|'no-results'|'no-questions'} props.type
 * @param {Function} [props.onCreateQuiz]
 * @param {Function} [props.onClearSearch]
 */
export function QuizEmptyState({ type, onCreateQuiz, onClearSearch }) {
  const configs = {
    'no-quizzes': {
      Icon: GraduationCap,
      color: 'bg-accent-secondary text-accent',
      title: 'No quizzes yet',
      desc: 'Create your first quiz to start testing your knowledge.',
      action: onCreateQuiz && (
        <Button variant="primary" size="md" onClick={onCreateQuiz}>Create First Quiz</Button>
      ),
    },
    'no-results': {
      Icon: Search,
      color: 'bg-background-subtle text-text-muted',
      title: 'No quizzes match your search',
      desc: 'Try different keywords or clear the search.',
      action: onClearSearch && (
        <Button variant="outline" size="md" onClick={onClearSearch}>Clear Search</Button>
      ),
    },
    'no-questions': {
      Icon: AlertCircle,
      color: 'bg-amber-50 text-amber-600',
      title: 'No questions available',
      desc: 'The selected source and question-type combination has no questions in the demonstration bank.',
      action: onCreateQuiz && (
        <Button variant="outline" size="md" onClick={onCreateQuiz}>Try Different Settings</Button>
      ),
    },
  };

  const { Icon, color, title, desc, action } = configs[type] || configs['no-quizzes'];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${color}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-base font-bold text-primary tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed mb-6">{desc}</p>
      {action}
    </div>
  );
}

export default QuizEmptyState;
