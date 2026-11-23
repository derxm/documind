import { FileText, MessageSquare, BookOpen, HelpCircle } from 'lucide-react';

function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Document Upload',
      description: 'Upload and manage your documents with ease.',
    },
    {
      icon: MessageSquare,
      title: 'AI Summaries',
      description: 'Generate intelligent summaries from your documents.',
    },
    {
      icon: HelpCircle,
      title: 'Q&A',
      description: 'Ask questions and get answers from your document content.',
    },
    {
      icon: BookOpen,
      title: 'Study Notes & Quizzes',
      description: 'Create study notes and quizzes from your documents.',
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DocuMind AI
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your AI-powered document intelligence platform. Upload documents,
          generate summaries, ask questions, and create study materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <Icon className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
