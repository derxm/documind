import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Files,
  UploadCloud,
  CheckCircle2,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { Button, Badge } from '../../components';
import {
  DocumentStats,
  DocumentToolbar,
  DocumentTable,
  DocumentEmptyState,
  UploadModal,
  DeleteModal,
  SummaryModal,
  initialDocuments,
  documentStatsConfig,
} from '../../components/dashboard/documents';

export function DocumentsPage() {
  const navigate = useNavigate();

  // Documents state initialized with demonstration records
  const [documents, setDocuments] = useState(initialDocuments);

  // Search, Filter, and Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [summaryTarget, setSummaryTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Reset all search and filter controls
  const handleResetFilters = () => {
    setSearchQuery('');
    setFileTypeFilter('ALL');
    setStatusFilter('ALL');
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || fileTypeFilter !== 'ALL' || statusFilter !== 'ALL' || sortBy !== 'newest';

  // Combined filtering & sorting pipeline
  const filteredAndSortedDocuments = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return documents
      .filter((doc) => {
        // 1. Search Query filter (matches name or fileName)
        const matchesSearch =
          !query ||
          doc.name.toLowerCase().includes(query) ||
          doc.fileName.toLowerCase().includes(query);

        // 2. File Type filter ('ALL' | 'PDF' | 'DOCX')
        const matchesType = fileTypeFilter === 'ALL' || doc.type === fileTypeFilter;

        // 3. Status filter ('ALL' | 'Processed' | 'Processing' | 'Failed')
        const matchesStatus = statusFilter === 'ALL' || doc.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return b.timestamp - a.timestamp;
        if (sortBy === 'oldest') return a.timestamp - b.timestamp;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [documents, searchQuery, fileTypeFilter, statusFilter, sortBy]);

  // Compute stats dynamically reflecting local uploads and deletions
  const dynamicStats = useMemo(() => {
    const totalDiff = documents.length - initialDocuments.length;
    const processingAdded = documents.filter((d) => d.id.startsWith('doc-') && !initialDocuments.some(id => id.id === d.id)).length;

    return {
      total: Math.max(0, documentStatsConfig.total + totalDiff),
      processed: documentStatsConfig.processed,
      processing: Math.max(0, documentStatsConfig.processing + processingAdded),
    };
  }, [documents]);

  // Document action handlers
  const handleOpenAssistant = (doc) => {
    navigate('/assistant');
  };

  const handleViewSummary = (doc) => {
    setSummaryTarget(doc);
  };

  const handleDownload = (doc) => {
    showToast('File downloads will be available when document storage is connected.');
  };

  const handleDeleteClick = (doc) => {
    setDeleteTarget(doc);
  };

  const handleConfirmDelete = (id) => {
    const targetDoc = documents.find((d) => d.id === id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setDeleteTarget(null);
    if (targetDoc) {
      showToast(`Removed "${targetDoc.name}" from demonstration library.`);
    }
  };

  const handleUploadSuccess = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
    showToast(`Added "${newDoc.name}" with Processing status.`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary text-white shadow-2xl border border-primary/20 text-xs font-medium animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              My Documents
            </h1>
            <Badge variant="accent" size="sm">
              {documents.length} Files
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage your documents and turn them into useful insights.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            leftIcon={<UploadCloud className="h-4 w-4" />}
            onClick={() => setIsUploadOpen(true)}
            className="shadow-subtle"
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* 2. Document Statistics */}
      <DocumentStats
        total={dynamicStats.total}
        processed={dynamicStats.processed}
        processing={dynamicStats.processing}
      />

      {/* 3. Search, Filter and Sort Toolbar */}
      <DocumentToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fileTypeFilter={fileTypeFilter}
        onFileTypeChange={setFileTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        matchCount={filteredAndSortedDocuments.length}
      />

      {/* 4. Document Library & Empty State */}
      {documents.length === 0 ? (
        <DocumentEmptyState
          type="no-documents"
          onUploadClick={() => setIsUploadOpen(true)}
        />
      ) : filteredAndSortedDocuments.length === 0 ? (
        <DocumentEmptyState
          type="no-results"
          onResetFilters={handleResetFilters}
        />
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-text-muted px-1">
            Showing {documents.length} sample document{documents.length !== 1 ? 's' : ''} from {dynamicStats.total} total documents.
          </p>
          <DocumentTable
            documents={filteredAndSortedDocuments}
            onOpenAssistant={handleOpenAssistant}
            onViewSummary={handleViewSummary}
            onDownload={handleDownload}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {/* 5. Modals & Dialogs */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <DeleteModal
        isOpen={!!deleteTarget}
        document={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      <SummaryModal
        isOpen={!!summaryTarget}
        document={summaryTarget}
        onClose={() => setSummaryTarget(null)}
      />
    </div>
  );
}

export default DocumentsPage;
