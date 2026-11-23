import React from 'react';
import { BookOpen, Sparkles, Plus, Bookmark } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '../../components';

export function StudyNotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
            Study Notes & Summaries
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Browse AI-generated study outlines, core terminology decks, and structured concept notes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          New Note Set
        </Button>
      </div>

      <Card padding="lg" className="text-center py-16">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-accent-secondary text-accent flex items-center justify-center mx-auto shadow-subtle">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="mb-2">
              Phase 5 Implementation
            </Badge>
            <h3 className="text-lg font-bold text-primary">
              Automated Study Material Synthesis
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
              Generate structured executive summaries, key concept breakdowns, and flashcard-ready study notes directly from uploaded documents.
            </p>
          </div>
          <Button variant="outline" size="md">
            Explore Study Templates
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default StudyNotesPage;
