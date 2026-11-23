import React from 'react';
import { MessageSquare, Sparkles, Send, Bot } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '../../components';

export function AssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
          AI Document Assistant
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Chat interactively with your documents, ask targeted questions, and extract verified citations.
        </p>
      </div>

      <Card padding="lg" className="text-center py-16">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-accent-secondary text-accent flex items-center justify-center mx-auto shadow-subtle">
            <Bot className="h-8 w-8" />
          </div>
          <div>
            <Badge variant="accent" size="sm" className="mb-2">
              Phase 5 Implementation
            </Badge>
            <h3 className="text-lg font-bold text-primary">
              Conversational Document Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
              OpenAI API integration will be implemented in Phase 5 to provide vector retrieval, multi-document semantic synthesis, and verified citation links.
            </p>
          </div>
          <Button variant="outline" size="md">
            View Assistant Architecture
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AssistantPage;
