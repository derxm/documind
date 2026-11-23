import React from 'react';
import { Files, SearchX, UploadCloud, RotateCcw } from 'lucide-react';
import { Card, Button } from '../../index';

/**
 * Reusable Empty State component for Documents Library.
 *
 * @param {Object} props
 * @param {'no-documents' | 'no-results'} props.type
 * @param {Function} [props.onUploadClick]
 * @param {Function} [props.onResetFilters]
 */
export function DocumentEmptyState({
  type = 'no-results',
  onUploadClick,
  onResetFilters,
}) {
  if (type === 'no-documents') {
    return (
      <Card padding="lg" className="text-center py-16 border-dashed">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-accent-secondary text-accent flex items-center justify-center mx-auto shadow-subtle">
            <Files className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">No documents uploaded yet</h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
              Upload your first PDF or Word document to unlock AI-powered summaries, vector search, and interactive study notes.
            </p>
          </div>
          {onUploadClick && (
            <Button
              variant="primary"
              size="md"
              leftIcon={<UploadCloud className="h-4 w-4" />}
              onClick={onUploadClick}
            >
              Upload Your First Document
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="text-center py-16 border-dashed">
      <div className="max-w-md mx-auto space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-background-subtle text-text-secondary flex items-center justify-center mx-auto shadow-subtle border border-border">
          <SearchX className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-primary">No matching documents found</h3>
          <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
            We couldn't find any documents matching your current search terms or filter criteria. Try adjusting your query or resetting filters.
          </p>
        </div>
        {onResetFilters && (
          <Button
            variant="outline"
            size="md"
            leftIcon={<RotateCcw className="h-4 w-4" />}
            onClick={onResetFilters}
          >
            Reset Search & Filters
          </Button>
        )}
      </div>
    </Card>
  );
}

export default DocumentEmptyState;
