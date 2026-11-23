import React, { useState, useEffect } from 'react';
import {
  FileText,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Download,
  Trash2,
} from 'lucide-react';
import { Card, CardContent, Badge } from '../../index';

/**
 * Responsive Document Table with status badges and action menus.
 *
 * @param {Object} props
 * @param {Array} props.documents
 * @param {Function} props.onOpenAssistant
 * @param {Function} props.onViewSummary
 * @param {Function} props.onDownload
 * @param {Function} props.onDeleteClick
 */
export function DocumentTable({
  documents,
  onOpenAssistant,
  onViewSummary,
  onDownload,
  onDeleteClick,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Close open action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.document-table-action-menu')) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderStatusBadge = (status) => {
    if (status === 'Processed') {
      return (
        <Badge variant="success" size="sm">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Processed
        </Badge>
      );
    }
    if (status === 'Processing') {
      return (
        <Badge variant="accent" size="sm" className="animate-pulse">
          <Clock className="h-3 w-3 mr-1" />
          Processing
        </Badge>
      );
    }
    return (
      <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-medium bg-red-50 text-red-700 border border-red-200">
        <AlertCircle className="h-3 w-3 mr-1" />
        Failed
      </span>
    );
  };

  return (
    <Card padding="none" className="overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-border-subtle bg-background-subtle/50 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                <th className="py-3.5 px-6">Document Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Size</th>
                <th className="py-3.5 px-4">Date Uploaded</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm">
              {documents.map((doc) => {
                const isMenuOpen = activeMenuId === doc.id;

                return (
                  <tr
                    key={doc.id}
                    className="hover:bg-background/80 transition-colors group"
                  >
                    {/* 1. Name & File Icon */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-subtle ${
                            doc.type === 'PDF'
                              ? 'bg-rose-50 text-rose-600 border border-rose-200/50'
                              : 'bg-blue-50 text-blue-600 border border-blue-200/50'
                          }`}
                        >
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-primary truncate max-w-[240px]">
                            {doc.name}
                          </p>
                          <p className="text-xs text-text-muted truncate max-w-[240px]">
                            {doc.fileName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* 2. File Type */}
                    <td className="py-4 px-4">
                      <span className="inline-block text-xs font-mono font-medium text-text-secondary bg-background-subtle px-2 py-0.5 rounded-md border border-border">
                        {doc.type}
                      </span>
                    </td>

                    {/* 3. File Size */}
                    <td className="py-4 px-4 text-xs font-medium text-text-secondary whitespace-nowrap">
                      {doc.size}
                    </td>

                    {/* 4. Date Uploaded */}
                    <td className="py-4 px-4 text-xs text-text-secondary whitespace-nowrap">
                      {doc.dateAdded}
                    </td>

                    {/* 5. Processing Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {renderStatusBadge(doc.status)}
                    </td>

                    {/* 6. Action Menu */}
                    <td className="py-4 px-6 text-right relative whitespace-nowrap document-table-action-menu">
                      <button
                        onClick={() =>
                          setActiveMenuId(isMenuOpen ? null : doc.id)
                        }
                        aria-label={`Actions for ${doc.name}`}
                        aria-expanded={isMenuOpen}
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div className="absolute right-6 top-11 w-48 bg-surface rounded-xl border border-border shadow-dropdown py-1.5 z-30 text-left animate-in fade-in-0 zoom-in-95 duration-100">
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onOpenAssistant(doc);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Open in Assistant</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onViewSummary(doc);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>View Summary</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onDownload(doc);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background transition-colors"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download</span>
                          </button>

                          <div className="border-t border-border-subtle my-1" />

                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onDeleteClick(doc);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default DocumentTable;
