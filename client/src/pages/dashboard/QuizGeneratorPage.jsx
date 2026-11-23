import React from 'react';
import { GraduationCap, Sparkles, CheckCircle2, Play } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '../../components';

export function QuizGeneratorPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
            Quiz Generator
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Test retention and comprehension with auto-generated multiple-choice, true/false, and conceptual quizzes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Play className="h-4 w-4" />}
        >
          Generate Quiz
        </Button>
      </div>

      <Card padding="lg" className="text-center py-16">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-accent-secondary text-accent flex items-center justify-center mx-auto shadow-subtle">
            <GraduationCap className="h-8 w-8" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="mb-2">
              Phase 5 Implementation
            </Badge>
            <h3 className="text-lg font-bold text-primary">
              Active Recall & Quiz Engine
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
              Create customizable difficulty quizzes from uploaded chapters or documents, complete with automated grading and explanatory feedback.
            </p>
          </div>
          <Button variant="outline" size="md">
            View Sample Quizzes
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default QuizGeneratorPage;
