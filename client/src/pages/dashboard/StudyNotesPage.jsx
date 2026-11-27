import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Plus, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '../../components';

import { NoteStats }        from '../../components/dashboard/studynotes/NoteStats';
import { NotesToolbar }     from '../../components/dashboard/studynotes/NotesToolbar';
import { NoteCard }         from '../../components/dashboard/studynotes/NoteCard';
import { NoteDetailView }   from '../../components/dashboard/studynotes/NoteDetailView';
import { NoteEditorModal }  from '../../components/dashboard/studynotes/NoteEditorModal';
import { DeleteNoteDialog } from '../../components/dashboard/studynotes/DeleteNoteDialog';
import { NotesEmptyState }  from '../../components/dashboard/studynotes/NotesEmptyState';
import {
  initialNotes,
  noteToPlainText,
} from '../../components/dashboard/studynotes/studyNotesData';

// ---------------------------------------------------------------------------
// ID generator
// ---------------------------------------------------------------------------
let _seq = 100;
const uid = () => `note-${++_seq}-${Date.now()}`;

// ---------------------------------------------------------------------------
// Parse the plain-text content written in the editor back into structured
// sections so the detail view can render it properly.
// Supports:  # Heading   |  - bullet   |  1. numbered   |  plain paragraph
// ---------------------------------------------------------------------------
function parseContentToSections(raw) {
  const lines = raw.split('\n');
  const sections = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    // Skip blank lines
    if (!line.trim()) { i++; continue; }

    // Heading
    if (line.startsWith('# ')) {
      sections.push({ type: 'heading', text: line.slice(2).trim() });
      i++;
      continue;
    }

    // Bullet list block — consume consecutive bullet lines
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trimEnd().startsWith('- ')) {
        items.push(lines[i].trimEnd().slice(2).trim());
        i++;
      }
      sections.push({ type: 'bullet-list', items });
      continue;
    }

    // Numbered list block — consume consecutive numbered lines
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimEnd())) {
        items.push(lines[i].trimEnd().replace(/^\d+\.\s*/, '').trim());
        i++;
      }
      sections.push({ type: 'numbered-list', items });
      continue;
    }

    // Paragraph — consume until blank line or structural token
    const paragraphLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trimEnd().startsWith('# ') &&
      !lines[i].trimEnd().startsWith('- ') &&
      !/^\d+\.\s/.test(lines[i].trimEnd())
    ) {
      paragraphLines.push(lines[i].trimEnd());
      i++;
    }
    if (paragraphLines.length) {
      sections.push({ type: 'paragraph', text: paragraphLines.join(' ') });
    }
  }

  return sections.length ? sections : [{ type: 'paragraph', text: raw.trim() }];
}

// ---------------------------------------------------------------------------
// Filtering + sorting pipeline (pure, memoised)
// ---------------------------------------------------------------------------
function applyFiltersAndSort(notes, search, activeFilter, sortBy) {
  const q = search.toLowerCase().trim();

  let result = notes.filter((note) => {
    // Search: title + preview + section text
    if (q) {
      const inTitle   = note.title.toLowerCase().includes(q);
      const inPreview = note.preview.toLowerCase().includes(q);
      const inContent = (note.sections || []).some((block) => {
        const text = block.text || (block.items || []).join(' ');
        return text.toLowerCase().includes(q);
      });
      if (!inTitle && !inPreview && !inContent) return false;
    }

    // Filter tabs
    if (activeFilter === 'favorites') return note.isFavorite;
    if (activeFilter === 'recent') {
      const fourDaysAgo = Date.now() - 4 * 86_400_000;
      return note.updatedAt >= fourDaysAgo;
    }

    return true;
  });

  result = [...result].sort((a, b) => {
    if (sortBy === 'updated-desc') return b.updatedAt - a.updatedAt;
    if (sortBy === 'updated-asc')  return a.updatedAt - b.updatedAt;
    if (sortBy === 'title-asc')    return a.title.localeCompare(b.title);
    if (sortBy === 'title-desc')   return b.title.localeCompare(a.title);
    return 0;
  });

  return result;
}

// ---------------------------------------------------------------------------
// StudyNotesPage
// ---------------------------------------------------------------------------
export function StudyNotesPage() {
  // --- Notes state ---
  const [notes, setNotes]           = useState(initialNotes);

  // --- View: 'list' | 'detail' ---
  const [view, setView]             = useState('list');
  const [activeNote, setActiveNote] = useState(null);

  // --- Toolbar state ---
  const [search, setSearch]         = useState('');
  const [activeFilter, setFilter]   = useState('all');
  const [sortBy, setSort]           = useState('updated-desc');

  // --- Modal states ---
  const [editorOpen, setEditorOpen]     = useState(false);
  const [editorTarget, setEditorTarget] = useState(null);   // null = create
  const [deleteTarget, setDeleteTarget] = useState(null);

  // --- Toast ---
  const [toast, setToast]           = useState(null);
  const toastTimerRef               = useRef(null);

  const showToast = useCallback((message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  }, []);

  React.useEffect(() => () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); }, []);

  // --- Derived stats ---
  const recentlyUpdated = useMemo(() => {
    const fourDaysAgo = Date.now() - 4 * 86_400_000;
    return notes.filter((n) => n.updatedAt >= fourDaysAgo).length;
  }, [notes]);

  // --- Filtered + sorted list ---
  const visibleNotes = useMemo(
    () => applyFiltersAndSort(notes, search, activeFilter, sortBy),
    [notes, search, activeFilter, sortBy]
  );

  // ---------------------------------------------------------------------------
  // Determine which empty-state type to show
  // ---------------------------------------------------------------------------
  const emptyStateType = useMemo(() => {
    if (notes.length === 0) return 'no-notes';
    if (activeFilter === 'favorites') return 'no-favorites';
    if (search.trim()) return 'no-results';
    return 'no-filter-match';
  }, [notes.length, activeFilter, search]);

  const handleResetFilters = useCallback(() => {
    setSearch('');
    setFilter('all');
    setSort('updated-desc');
  }, []);

  // ---------------------------------------------------------------------------
  // Note actions
  // ---------------------------------------------------------------------------
  const handleOpen = useCallback((note) => {
    setActiveNote(note);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setView('list');
    setActiveNote(null);
  }, []);

  const handleOpenCreate = useCallback(() => {
    setEditorTarget(null);
    setEditorOpen(true);
  }, []);

  const handleOpenEdit = useCallback((note) => {
    setEditorTarget(note);
    setEditorOpen(true);
  }, []);

  const handleSave = useCallback(({ title, category, content }) => {
    const sections = parseContentToSections(content);
    const preview  = sections.find((s) => s.type === 'paragraph')?.text?.slice(0, 180) || content.slice(0, 180);
    const keyPoints = sections.filter(
      (s) => s.type === 'bullet-list' || s.type === 'numbered-list'
    ).reduce((acc, s) => acc + (s.items?.length || 0), 0) || 1;

    if (editorTarget) {
      // Edit existing
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editorTarget.id
            ? { ...n, title, category, sections, preview, keyPoints, updatedAt: Date.now() }
            : n
        )
      );
      // Sync activeNote if detail view is open for this note
      setActiveNote((prev) =>
        prev?.id === editorTarget.id
          ? { ...prev, title, category, sections, preview, keyPoints, updatedAt: Date.now() }
          : prev
      );
      showToast(`"${title}" updated successfully.`);
    } else {
      // Create new
      const newNote = {
        id: uid(),
        title,
        category,
        source: 'Manual Entry',
        keyPoints,
        preview,
        sections,
        isFavorite: false,
        updatedAt: Date.now(),
        createdAt: Date.now(),
      };
      setNotes((prev) => [newNote, ...prev]);
      showToast(`"${title}" created successfully.`);
    }
  }, [editorTarget, showToast]);

  const handleToggleFavorite = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n)
    );
    setActiveNote((prev) =>
      prev?.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev
    );
  }, []);

  const handleDeleteRequest = useCallback((note) => {
    setDeleteTarget(note);
  }, []);

  const handleConfirmDelete = useCallback((id) => {
    const target = notes.find((n) => n.id === id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setDeleteTarget(null);
    if (view === 'detail' && activeNote?.id === id) {
      setView('list');
      setActiveNote(null);
    }
    if (target) showToast(`"${target.title}" deleted.`);
  }, [notes, view, activeNote, showToast]);

  const handleCopy = useCallback(async (note) => {
    const text = noteToPlainText(note);
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        showToast(`Content of "${note.title}" copied to clipboard.`);
      } catch {
        showToast('Clipboard access was denied. Please copy the content manually.');
      }
    } else {
      showToast('Clipboard API is not available in this browser.');
    }
  }, [showToast]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-8 pb-12">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary text-white shadow-2xl border border-primary/20 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200 max-w-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Detail view                                                          */}
      {/* ------------------------------------------------------------------ */}
      {view === 'detail' && activeNote ? (
        <NoteDetailView
          note={activeNote}
          onBack={handleBack}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteRequest}
          onCopy={handleCopy}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <>
          {/* ---------------------------------------------------------------- */}
          {/* Page header                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  Study Notes
                </h1>
                <Badge variant="accent" size="sm">
                  {notes.length} Note{notes.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Your knowledge, organized and ready for revision.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={handleOpenCreate}
              className="shadow-subtle shrink-0"
            >
              Create Note
            </Button>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Stats                                                              */}
          {/* ---------------------------------------------------------------- */}
          <NoteStats
            totalNotes={notes.length}
            recentlyUpdated={recentlyUpdated}
          />

          {/* ---------------------------------------------------------------- */}
          {/* Toolbar                                                            */}
          {/* ---------------------------------------------------------------- */}
          <NotesToolbar
            search={search}
            onSearchChange={setSearch}
            activeFilter={activeFilter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortChange={setSort}
            matchCount={visibleNotes.length}
          />

          {/* ---------------------------------------------------------------- */}
          {/* Notes grid / empty state                                           */}
          {/* ---------------------------------------------------------------- */}
          {visibleNotes.length === 0 ? (
            <NotesEmptyState
              type={emptyStateType}
              onCreateNote={handleOpenCreate}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <div
              className="grid gap-5"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}
              aria-label="Study notes"
            >
              {visibleNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onOpen={handleOpen}
                  onEdit={handleOpenEdit}
                  onDelete={handleDeleteRequest}
                  onCopy={handleCopy}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* Modals                                                                 */}
      {/* -------------------------------------------------------------------- */}
      <NoteEditorModal
        isOpen={editorOpen}
        note={editorTarget}
        onSave={handleSave}
        onClose={() => { setEditorOpen(false); setEditorTarget(null); }}
      />

      <DeleteNoteDialog
        isOpen={Boolean(deleteTarget)}
        note={deleteTarget}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default StudyNotesPage;
