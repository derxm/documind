import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Search,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { Button } from '../../index';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Group conversations into Today / Yesterday / Previous 7 Days buckets.
 * Returns an array of { label, items } groups, only including non-empty groups.
 */
function groupConversations(conversations) {
  const now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOf7DaysAgo = new Date(startOfToday);
  startOf7DaysAgo.setDate(startOf7DaysAgo.getDate() - 7);

  const todayTs = startOfToday.getTime();
  const yesterdayTs = startOfYesterday.getTime();
  const sevenDaysTs = startOf7DaysAgo.getTime();

  const today = [];
  const yesterday = [];
  const prev7 = [];

  const sorted = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);

  for (const conv of sorted) {
    const t = conv.updatedAt;
    if (t >= todayTs) today.push(conv);
    else if (t >= yesterdayTs) yesterday.push(conv);
    else if (t >= sevenDaysTs) prev7.push(conv);
    // older than 7 days: omit for now (could add "Older" group if needed)
  }

  const groups = [];
  if (today.length) groups.push({ label: 'Today', items: today });
  if (yesterday.length) groups.push({ label: 'Yesterday', items: yesterday });
  if (prev7.length) groups.push({ label: 'Previous 7 Days', items: prev7 });
  return groups;
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ---------------------------------------------------------------------------
// Delete confirmation dialog
// ---------------------------------------------------------------------------
function DeleteConversationDialog({ conversation, onConfirm, onClose }) {
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="conv-delete-title"
        className="relative w-full max-w-sm bg-surface rounded-2xl border border-border shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="h-11 w-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200/50">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 id="conv-delete-title" className="text-base font-bold text-primary tracking-tight">
              Delete Conversation?
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              This will remove the conversation and all its messages from your current session.
            </p>
          </div>
        </div>

        <div className="bg-background-subtle rounded-xl px-3 py-2.5 border border-border mb-5">
          <p className="text-xs font-semibold text-primary truncate">{conversation.title}</p>
          <p className="text-[11px] text-text-muted mt-0.5">
            {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
          <button
            onClick={() => onConfirm(conversation.id)}
            className="inline-flex items-center justify-center font-medium transition-all duration-200 px-4 py-2 text-sm rounded-xl gap-2 bg-red-600 hover:bg-red-700 text-white shadow-subtle focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single conversation row
// ---------------------------------------------------------------------------
function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onRename,
  onDeleteRequest,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(conversation.title);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [menuOpen]);

  // Focus input when renaming starts
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const commitRename = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== conversation.title) {
      onRename(conversation.id, trimmed);
    } else {
      setRenameValue(conversation.title);
    }
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); commitRename(); }
    if (e.key === 'Escape') { setRenameValue(conversation.title); setIsRenaming(false); }
  };

  return (
    <div
      className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
        isActive
          ? 'bg-accent-secondary text-accent border border-accent/20'
          : 'hover:bg-background text-text-primary border border-transparent'
      }`}
      onClick={() => !isRenaming && onSelect(conversation.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`Conversation: ${conversation.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!isRenaming) onSelect(conversation.id); } }}
    >
      {/* Icon */}
      <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
        isActive ? 'bg-accent/10 text-accent' : 'bg-background-subtle text-text-secondary'
      }`}>
        <MessageSquare className="h-3.5 w-3.5" />
      </div>

      {/* Title / rename input */}
      <div className="flex-1 min-w-0">
        {isRenaming ? (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={commitRename}
              onKeyDown={handleRenameKeyDown}
              maxLength={60}
              className="w-full text-xs font-medium bg-surface border border-accent rounded-md px-2 py-1 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 min-w-0"
              aria-label="Rename conversation"
            />
            <button
              onMouseDown={(e) => { e.preventDefault(); commitRename(); }}
              aria-label="Confirm rename"
              className="p-1 rounded text-emerald-600 hover:bg-emerald-50 transition-colors shrink-0"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <>
            <p className={`text-xs font-semibold truncate leading-tight ${isActive ? 'text-accent' : 'text-primary'}`}>
              {conversation.title}
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">
              {formatTime(conversation.updatedAt)} · {conversation.messages.length} msg{conversation.messages.length !== 1 ? 's' : ''}
            </p>
          </>
        )}
      </div>

      {/* Action menu button */}
      {!isRenaming && (
        <div ref={menuRef} className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            aria-label={`Actions for ${conversation.title}`}
            aria-expanded={menuOpen}
            className={`p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
              menuOpen || isActive
                ? 'opacity-100 text-text-secondary hover:text-primary hover:bg-white/60'
                : 'opacity-0 group-hover:opacity-100 text-text-secondary hover:text-primary hover:bg-background'
            }`}
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-7 w-36 bg-surface rounded-xl border border-border shadow-dropdown py-1.5 z-30 animate-in fade-in-0 zoom-in-95 duration-100">
              <button
                onClick={() => { setMenuOpen(false); setIsRenaming(true); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
              >
                <Pencil className="h-3 w-3" />
                Rename
              </button>
              <button
                onClick={() => { setMenuOpen(false); onDeleteRequest(conversation); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ConversationSidebar — main export
// ---------------------------------------------------------------------------

/**
 * @param {Object} props
 * @param {Array}    props.conversations
 * @param {string|null} props.activeId
 * @param {Function} props.onSelect        (id) => void
 * @param {Function} props.onNewChat       () => void
 * @param {Function} props.onRename        (id, newTitle) => void
 * @param {Function} props.onDelete        (id) => void
 * @param {boolean}  [props.mobileOpen]
 * @param {Function} [props.onMobileClose]
 */
export function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
  mobileOpen = false,
  onMobileClose,
}) {
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filter by search query
  const filtered = search.trim()
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      )
    : conversations;

  const groups = groupConversations(filtered);
  const hasResults = groups.length > 0;

  const handleConfirmDelete = (id) => {
    onDelete(id);
    setDeleteTarget(null);
  };

  // Shared sidebar content
  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface border-r border-border">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border-subtle shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-primary tracking-tight">Conversations</h2>
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              aria-label="Close conversations panel"
              className="lg:hidden p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-background transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={<Plus className="h-3.5 w-3.5" />}
          onClick={onNewChat}
        >
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-b border-border-subtle shrink-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            <Search className="h-3.5 w-3.5" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            aria-label="Search conversations"
            className="w-full bg-background border border-border rounded-xl pl-8 pr-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-text-muted hover:text-text-secondary"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Grouped list */}
      <nav
        aria-label="Conversations"
        className="flex-1 overflow-y-auto px-2 py-2 space-y-4"
      >
        {!hasResults && (
          <div className="text-center py-8 px-3">
            <MessageSquare className="h-6 w-6 text-text-muted mx-auto mb-2" />
            <p className="text-xs text-text-muted">
              {search ? 'No conversations match your search.' : 'No conversations yet.'}
            </p>
          </div>
        )}

        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isActive={conv.id === activeId}
                  onSelect={onSelect}
                  onRename={onRename}
                  onDeleteRequest={setDeleteTarget}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer hint */}
      <div className="px-4 py-3 border-t border-border-subtle shrink-0">
        <p className="text-[10px] text-text-muted text-center leading-relaxed">
          Conversations are stored for this session only.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on lg+ */}
      <div className="hidden lg:flex lg:flex-col h-full w-64 shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-[61] flex flex-col animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Delete dialog */}
      {deleteTarget && (
        <DeleteConversationDialog
          conversation={deleteTarget}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

export default ConversationSidebar;
