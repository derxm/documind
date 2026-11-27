import React, { useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Lightbulb,
  GraduationCap,
  List,
  MessageSquare,
  PanelLeft,
  FileText,
  Info,
} from 'lucide-react';
import { Badge } from '../../index';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { MessageComposer } from './MessageComposer';
import { DocumentContextSelector } from './DocumentContextSelector';
import { suggestedPrompts, assistantDocuments } from './assistantData';

// ---------------------------------------------------------------------------
// Icon map for suggested prompts
// ---------------------------------------------------------------------------
const promptIcons = {
  sparkles: <Sparkles className="h-4 w-4" />,
  lightbulb: <Lightbulb className="h-4 w-4" />,
  graduation: <GraduationCap className="h-4 w-4" />,
  list: <List className="h-4 w-4" />,
};

// ---------------------------------------------------------------------------
// Welcome / empty state
// ---------------------------------------------------------------------------
function WelcomeState({ onPromptClick }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center">
      <div className="h-16 w-16 rounded-2xl bg-accent-secondary text-accent flex items-center justify-center mx-auto shadow-subtle border border-accent/10 mb-4">
        <Bot className="h-8 w-8" />
      </div>
      <Badge variant="accent" size="sm" className="mb-3">
        <Sparkles className="h-3 w-3 mr-1" />
        AI Assistant
      </Badge>
      <h3 className="text-lg font-bold text-primary tracking-tight mb-1">
        How can I help you today?
      </h3>
      <p className="text-sm text-text-secondary max-w-sm mb-8 leading-relaxed">
        Select a document as context, then ask a question or choose one of the suggestions below.
      </p>

      {/* Suggested prompts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onPromptClick(prompt.label)}
            className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-xl text-left hover:border-accent/40 hover:bg-accent-secondary/30 hover:shadow-subtle transition-all duration-200 group"
          >
            <span className="h-8 w-8 rounded-lg bg-accent-secondary text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-200">
              {promptIcons[prompt.icon]}
            </span>
            <span className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors duration-200 leading-snug">
              {prompt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// No conversation selected state
// ---------------------------------------------------------------------------
function NoConversationState({ onNewChat }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center">
      <div className="h-14 w-14 rounded-2xl bg-background-subtle text-text-muted flex items-center justify-center mx-auto mb-4 border border-border">
        <MessageSquare className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-primary tracking-tight mb-1">
        No conversation selected
      </h3>
      <p className="text-sm text-text-secondary max-w-xs mb-6 leading-relaxed">
        Select an existing conversation from the sidebar, or start a new one.
      </p>
      <button
        onClick={onNewChat}
        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent-hover transition-colors shadow-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <MessageSquare className="h-4 w-4" />
        Start New Chat
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChatArea — main export
// ---------------------------------------------------------------------------

/**
 * @param {Object}      props
 * @param {Object|null} props.conversation       — active conversation object
 * @param {boolean}     props.isTyping           — show AI typing indicator
 * @param {string}      props.composerValue      — controlled textarea value
 * @param {Function}    props.onComposerChange   (val) => void
 * @param {Function}    props.onSend             () => void
 * @param {Function}    props.onPromptClick      (text) => void
 * @param {string|null} props.selectedDocumentId
 * @param {Function}    props.onDocumentSelect   (id) => void
 * @param {Function}    props.onDocumentRemove   () => void
 * @param {Function}    props.onNewChat          () => void
 * @param {Function}    [props.onOpenSidebar]    — mobile sidebar toggle
 */
export function ChatArea({
  conversation,
  isTyping,
  composerValue,
  onComposerChange,
  onSend,
  onPromptClick,
  selectedDocumentId,
  onDocumentSelect,
  onDocumentRemove,
  onNewChat,
  onOpenSidebar,
}) {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom whenever messages change or typing indicator appears
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation?.messages, isTyping]);

  const selectedDoc = assistantDocuments.find((d) => d.id === selectedDocumentId);
  const hasMessages = conversation?.messages?.length > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-background">
      {/* ------------------------------------------------------------------ */}
      {/* Chat header                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 bg-surface border-b border-border shrink-0">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onOpenSidebar}
          aria-label="Open conversations panel"
          className="lg:hidden p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors shrink-0"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm font-bold text-primary truncate">
              {conversation ? conversation.title : 'AI Document Assistant'}
            </h2>
            {selectedDoc && (
              <div className="flex items-center gap-1 bg-background-subtle border border-border rounded-full px-2 py-0.5">
                <FileText className="h-3 w-3 text-text-secondary" />
                <span className="text-[10px] text-text-secondary font-medium truncate max-w-[100px] sm:max-w-[160px]">
                  {selectedDoc.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Demo label */}
        <div className="flex items-center gap-1 shrink-0">
          <Badge variant="neutral" size="sm">
            <Info className="h-3 w-3 mr-1" />
            Demo Mode
          </Badge>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Message area                                                         */}
      {/* ------------------------------------------------------------------ */}
      {!conversation ? (
        <NoConversationState onNewChat={onNewChat} />
      ) : (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6"
          aria-label="Conversation messages"
          aria-live="polite"
        >
          <div className="max-w-2xl mx-auto space-y-5">
            {!hasMessages ? (
              <WelcomeState onPromptClick={onPromptClick} />
            ) : (
              <>
                {conversation.messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    text={msg.text}
                    content={msg.content}
                    timestamp={msg.timestamp}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </>
            )}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Document context row + Composer                                      */}
      {/* ------------------------------------------------------------------ */}
      {conversation && (
        <div className="shrink-0">
          {/* Document context row */}
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-surface border-t border-border-subtle">
            <span className="text-[10px] text-text-muted font-medium shrink-0">Context:</span>
            <DocumentContextSelector
              selectedDocumentId={selectedDocumentId}
              onSelect={onDocumentSelect}
              onRemove={onDocumentRemove}
            />
          </div>

          <MessageComposer
            value={composerValue}
            onChange={onComposerChange}
            onSend={onSend}
            disabled={isTyping}
          />
        </div>
      )}
    </div>
  );
}

export default ChatArea;
