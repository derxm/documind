import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, MessageSquare, Sparkles } from 'lucide-react';
import { Button, Badge } from '../../index';

/**
 * Personalized Welcome Hero Section.
 *
 * @param {Object} props
 * @param {string} [props.userName='Alex']
 */
export function WelcomeSection({ userName = 'Alex' }) {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-hover to-primary p-6 sm:p-8 text-white shadow-card border border-primary/20">
      {/* Decorative ambient background blur */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 -bottom-16 h-48 w-48 rounded-full bg-accent-secondary/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Badge
              variant="accent"
              size="sm"
              className="bg-white/10 text-white border-white/20 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 mr-1 text-accent-secondary" />
              DocuMind AI Workspace
            </Badge>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-300 hidden sm:inline">Active Plan: Pro</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back, {userName} 👋
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Upload new documents, generate verified summaries, or test your comprehension with interactive AI study tools.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            leftIcon={<UploadCloud className="h-4 w-4" />}
            onClick={() => navigate('/documents')}
            className="shadow-md"
          >
            Upload Document
          </Button>

          <Button
            variant="outline"
            size="md"
            leftIcon={<MessageSquare className="h-4 w-4" />}
            onClick={() => navigate('/assistant')}
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
          >
            Chat with AI
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
