import React, { useRef, useEffect } from 'react';
import { Send, Paperclip, CornerDownLeft } from 'lucide-react';
import Toast from '../../Toast';
import { useToast } from '../../../hooks/useToast';

const MAX_CHARS = 2000;

/**
 * Polished message composer with:
 * - Auto-growing textarea (max 6 rows)
 * - Enter to send, Shift+Enter for newline
 * - Attachment button (non-functional — honest tooltip)
 * - Character counter when approaching limit
 * - Disabled send when empty or at limit
 *
 * @param {Object}   props
 * @param {string}   props.value
 * @param {Function} props.onChange        (value) => void
 * @param {Function} props.onSend         () => void
 * @param {boolean}  [props.disabled]      — true while AI is typing
 */
export function MessageComposer({ value, onChange, onSend, disabled = false }) {
  const textareaRef = useRef(null);
  const [toast, showToast] = useToast();
  const canSend = value.trim().length > 0 && !disabled && value.length <= MAX_CHARS;
  const nearLimit = value.length > MAX_CHARS * 0.8;
  const overLimit = value.length > MAX_CHARS;

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    // Cap at ~6 rows (approx 144px)
    el.style.height = Math.min(el.scrollHeight, 144) + 'px';
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  };

  const handleAttachClick = () => {
    showToast('File attachments are not available until document storage is connected.');
  };

  return (
    <div className="border-t border-border bg-surface px-3 sm:px-4 py-3">
      <Toast message={toast} />
      <div
        className={`flex items-end gap-2 bg-background rounded-2xl border transition-all duration-200 ${
          overLimit
            ? 'border-red-300 ring-4 ring-red-500/10'
            : 'border-border focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10'
        } px-3 py-2`}
      >
        {/* Attachment button */}
        <button
          type="button"
          onClick={handleAttachClick}
          aria-label="Attach a file (not yet available)"
          title="Attach file (available when storage is connected)"
          className="p-1.5 text-text-muted hover:text-text-secondary hover:bg-background-subtle rounded-lg transition-colors shrink-0 mb-0.5"
        >
          <Paperclip className="h-4 w-4" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'AI is thinking…' : 'Ask a question about your document…'}
          aria-label="Message input"
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none leading-relaxed py-1 min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ maxHeight: '144px' }}
        />

        {/* Send button */}
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          className="p-1.5 rounded-lg transition-all duration-200 shrink-0 mb-0.5 disabled:opacity-40 disabled:cursor-not-allowed bg-accent text-white hover:bg-accent-hover active:bg-accent-active focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:hover:bg-accent"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      {/* Footer row: char counter + keyboard hint */}
      <div className="flex items-center justify-between mt-1.5 px-1">
        <div className="flex items-center gap-1 text-[10px] text-text-muted">
          <CornerDownLeft className="h-3 w-3" />
          <span>Enter to send</span>
          <span className="mx-1">·</span>
          <span>Shift + Enter for new line</span>
        </div>
        {nearLimit && (
          <span className={`text-[10px] font-medium tabular-nums ${overLimit ? 'text-red-500' : 'text-text-muted'}`}>
            {value.length}/{MAX_CHARS}
          </span>
        )}
      </div>
    </div>
  );
}

export default MessageComposer;
