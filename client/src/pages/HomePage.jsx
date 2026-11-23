import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileUp,
  Sparkles,
  MessageSquare,
  GraduationCap,
  ArrowRight,
  Search,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Textarea,
  Badge,
  LoadingSpinner,
  Skeleton,
} from '../components';

function HomePage() {
  const [sampleQuery, setSampleQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1500);
  };

  const capabilities = [
    {
      icon: FileUp,
      title: 'Document Upload & Parsing',
      description:
        'Upload PDFs, DOCX, and text files with automated layout analysis and secure local processing.',
      tag: 'Fast & Secure',
    },
    {
      icon: Sparkles,
      title: 'AI Executive Summaries',
      description:
        'Distill lengthy contracts, academic papers, and enterprise reports into clear, key takeaways.',
      tag: 'Accurate',
    },
    {
      icon: MessageSquare,
      title: 'Conversational Document Q&A',
      description:
        'Ask specific questions and receive verified answers cited directly from your documents.',
      tag: 'Context-Aware',
    },
    {
      icon: GraduationCap,
      title: 'Study Notes & Quizzes',
      description:
        'Automatically generate structured study guides, flashcards, and active-recall test questions.',
      tag: 'Interactive',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <Badge variant="accent" size="md" className="mb-6">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          Next-Generation Document Intelligence
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-tight mb-6">
          Turn complex documents into{' '}
          <span className="text-accent">instant clarity</span>
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
          DocuMind AI empowers users to analyze, summarize, query, and generate
          study materials from any document with enterprise-grade precision.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Get Started
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<FileText className="h-4 w-4" />}
            >
              Explore Platform
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Platform Capabilities */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              Platform Capabilities
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Engineered with a clean, minimal aesthetic and high-contrast usability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Card
                key={cap.title}
                hoverable
                className="flex flex-col justify-between"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-accent-secondary flex items-center justify-center text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {cap.tag}
                    </Badge>
                  </div>
                  <CardTitle>{cap.title}</CardTitle>
                  <CardDescription>{cap.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="pt-4 border-t border-border-subtle flex items-center text-xs font-semibold text-accent gap-1">
                    <span>Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Design System Living Showcase */}
      <section className="pt-8 border-t border-border space-y-8">
        <div className="max-w-xl">
          <Badge variant="primary" size="sm" className="mb-2">
            Design Tokens & Components
          </Badge>
          <h2 className="text-2xl font-bold text-primary tracking-tight">
            Design System Components
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Standardized UI primitives built for consistency, accessible contrast, and smooth transitions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Buttons & Chips */}
          <Card padding="md" className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-primary mb-1">
                Button Styles
              </h3>
              <p className="text-xs text-text-secondary">
                Primary, secondary, outline, dark, and loading states.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="primary" fullWidth>
                Primary Accent Button
              </Button>
              <Button variant="secondary" fullWidth>
                Secondary Soft Button
              </Button>
              <Button variant="outline" fullWidth>
                Outline Button
              </Button>
              <Button variant="dark" fullWidth>
                Dark Primary Button
              </Button>
              <Button variant="primary" isLoading fullWidth>
                Processing Document
              </Button>
            </div>

            <div className="pt-4 border-t border-border-subtle space-y-2">
              <span className="text-xs font-medium text-text-secondary block">
                Badge Variants
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="accent">Accent</Badge>
                <Badge variant="primary">Midnight</Badge>
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="success">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Ready
                </Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </Card>

          {/* Column 2: Form Controls */}
          <Card padding="md" className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-primary mb-1">
                Form Inputs & Focus States
              </h3>
              <p className="text-xs text-text-secondary">
                Subtle borders with accent focus rings and helpful feedback.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Document Search"
                placeholder="Search across all uploaded papers..."
                value={sampleQuery}
                onChange={(e) => setSampleQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                helperText="Supports keywords, tags, or question queries."
              />

              <Textarea
                label="Custom Instruction"
                placeholder="e.g. Focus on financial statements and summarize key risks..."
                rows={3}
                helperText="Optional custom prompt instructions."
              />
            </div>
          </Card>

          {/* Column 3: Loading States & Skeletons */}
          <Card padding="md" className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-primary mb-1">
                Loading & Progress States
              </h3>
              <p className="text-xs text-text-secondary">
                Smooth animations for asynchronous operations.
              </p>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner size="lg" variant="accent" />
                <span className="text-[11px] text-text-secondary font-medium">
                  Accent
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner size="lg" variant="primary" />
                <span className="text-[11px] text-text-secondary font-medium">
                  Primary
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner size="lg" variant="secondary" />
                <span className="text-[11px] text-text-secondary font-medium">
                  Muted
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <span className="text-xs font-medium text-text-secondary block">
                Skeleton Placeholders
              </span>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" className="h-8 w-8" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton variant="text" className="h-3.5 w-3/4" />
                    <Skeleton variant="text" className="h-2.5 w-1/2" />
                  </div>
                </div>
                <Skeleton variant="rounded" className="h-16 w-full" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
