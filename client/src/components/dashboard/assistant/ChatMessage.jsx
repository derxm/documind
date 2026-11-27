import React from 'react';
import { Bot, User, AlertCircle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ---------------------------------------------------------------------------
// Structured AI content renderer
// Renders an array of content blocks without any dangerouslySetInnerHTML.
// Block types: heading | paragraph | bullet-list | numbered-list
// ---------------------------------------------------------------------------
function AiContentRenderer({ content }) {
  return (
    <div className="space-y-3">
      {content.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h4 key={i} className="text-sm font-bold text-primary mt-1">
                {block.text}
              </h4>
            );

          case 'paragraph':
            // Disclaimer paragraphs get special styling
            if (block.text && block.text.startsWith('⚠️')) {
              return (
                <div
                  key={i}
                  className="flex items-start gap-2 mt-3 pt-3 border-t border-border-subtle"
                >
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    {block.text.replace('⚠️ ', '')}
                  </p>
                </div>
              );
            }
            return (
              <p key={i} className="text-sm text-text-primary leading-relaxed">
                {block.text}
              </p>
            );

          case 'bullet-list':
            return (
              <ul key={i} className="space-y-1.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-primary leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'numbered-list':
            return (
              <ol key={i} className="space-y-1.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed">
                    <span className="shrink-0 h-5 w-5 rounded-full bg-accent-secondary text-accent text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Typing indicator — animated dots
// ---------------------------------------------------------------------------
export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 max-w-2xl">
      {/* AI avatar */}
      <div className="h-8 w-8 rounded-xl bg-accent-secondary text-accent flex items-center justify-center shrink-0 shadow-subtle border border-accent/10 mt-0.5">
        <Bot className="h-4 w-4" />
      </div>

      <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-subtle">
        <div className="flex items-center gap-1.5" aria-label="AI is typing">
          <span className="h-2 w-2 rounded-full bg-accent/60 animate-bounce [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-accent/60 animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-accent/60 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChatMessage — main export
// ---------------------------------------------------------------------------

/**
 * Renders a single chat message bubble.
 *
 * @param {Object} props
 * @param {'user'|'ai'} props.role
 * @param {string}  [props.text]        — user messages (plain text)
 * @param {Array}   [props.content]     — ai messages (structured blocks)
 * @param {number}  props.timestamp
 */
export function ChatMessage({ role, text, content, timestamp }) {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-3 max-w-2xl ml-auto">
        <div className="flex flex-col items-end gap-1 min-w-0">
          <div className="bg-accent text-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-subtle max-w-prose">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{text}</p>
          </div>
          <span className="text-[10px] text-text-muted">{formatTime(timestamp)}</span>
        </div>
        {/* User avatar */}
        <div className="h-8 w-8 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-subtle mb-5">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div className="flex items-start gap-3 max-w-2xl">
      {/* AI avatar */}
      <div className="h-8 w-8 rounded-xl bg-accent-secondary text-accent flex items-center justify-center shrink-0 shadow-subtle border border-accent/10 mt-0.5">
        <Bot className="h-4 w-4" />
      </div>

      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-subtle">
          {content ? (
            <AiContentRenderer content={content} />
          ) : (
            <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap break-words">{text}</p>
          )}
        </div>
        <span className="text-[10px] text-text-muted ml-1">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
