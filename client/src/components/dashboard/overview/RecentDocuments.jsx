import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Download,
  Trash2,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
} from '../../index';
import Toast from '../../Toast';
import { useToast } from '../../../hooks/useToast';
import { useDocumentContext } from '../../../context/DocumentContext';

export function RecentDocuments() {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState(null);
  const { documents } = useDocumentContext();
  const docs = useMemo(
    () => [...documents].sort((a, b) => b.timestamp - a.timestamp).slice(0, 4),
    [documents]
  );
  const [toast, showToast] = useToast();

  // Close open action menu when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.document-action-menu')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action, doc) => {
    setActiveMenuId(null);

    if (action === 'chat') {
      // Navigate to the Assistant. Document context selection is available there.
      navigate('/assistant');
    } else if (action === 'summary') {
      showToast('Summary preview is not available here. Open My Documents to view an available summary.');
    } else if (action === 'download') {
      // No file is stored server-side yet — display an honest informational message.
      showToast('File downloads will be available when document storage is connected.');
    } else if (action === 'delete') {
      showToast(`Removal from this overview is unavailable. Use My Documents to remove "${doc.name}".`);
    }
  };

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Toast */}
      <Toast message={toast} />

      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle bg-surface">
        <div>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>
            Your latest uploaded files and processing statuses.
          </CardDescription>
        </div>

        <Link to="/documents">
          <Button
            variant="outline"
            size="sm"
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            View All Documents
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        {docs.length === 0 ? (
          <div className="py-10 text-center text-sm text-text-muted">
            No recent documents. <Link to="/documents" className="text-accent hover:underline">View all documents.</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border-subtle bg-background-subtle/50 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                  <th scope="col" className="py-3 px-6">Document</th>
                  <th scope="col" className="py-3 px-4">Type</th>
                  <th scope="col" className="py-3 px-4">Date Added</th>
                  <th scope="col" className="py-3 px-4">Status</th>
                  <th scope="col" className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                {docs.map((doc) => {
                  const isMenuOpen = activeMenuId === doc.id;

                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-background/80 transition-colors group"
                    >
                      {/* Document Name */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                              doc.type === 'PDF'
                                ? 'bg-rose-50 text-rose-600 border border-rose-200/50'
                                : 'bg-blue-50 text-blue-600 border border-blue-200/50'
                            }`}
                          >
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-primary truncate max-w-[220px]">
                              {doc.name}
                            </p>
                            <p className="text-xs text-text-muted">{doc.size}</p>
                          </div>
                        </div>
                      </td>

                      {/* File Type */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block text-xs font-mono font-medium text-text-secondary bg-background-subtle px-2 py-0.5 rounded-md border border-border">
                          {doc.type}
                        </span>
                      </td>

                      {/* Date Added */}
                      <td className="py-3.5 px-4 text-xs text-text-secondary whitespace-nowrap">
                        {doc.dateAdded}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {doc.status === 'Processed' ? (
                          <Badge variant="success" size="sm">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Processed
                          </Badge>
                        ) : (
                          <Badge variant="accent" size="sm" className="animate-pulse">
                            <Clock className="h-3 w-3 mr-1" />
                            Processing
                          </Badge>
                        )}
                      </td>

                      {/* Action Menu */}
                      <td className="py-3.5 px-6 text-right relative whitespace-nowrap document-action-menu">
                        <button
                          onClick={() => setActiveMenuId(isMenuOpen ? null : doc.id)}
                          aria-label={`Actions for ${doc.name}`}
                          aria-expanded={isMenuOpen}
                          className="p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                          <div className="absolute right-6 top-10 w-48 bg-surface rounded-xl border border-border shadow-dropdown py-1.5 z-30 text-left animate-in fade-in-0 zoom-in-95 duration-100">
                            <button
                              onClick={() => handleAction('chat', doc)}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>Ask in Assistant</span>
                            </button>

                            <button
                              onClick={() => handleAction('summary', doc)}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background hover:text-accent transition-colors"
                            >
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>View Summary</span>
                            </button>

                            <button
                              onClick={() => handleAction('download', doc)}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-background transition-colors"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Download File</span>
                            </button>

                            <div className="border-t border-border-subtle my-1" />

                            <button
                              onClick={() => handleAction('delete', doc)}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove Document</span>
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
        )}
      </CardContent>
    </Card>
  );
}

export default RecentDocuments;
