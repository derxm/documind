import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button, LoadingSpinner, Badge } from '../../index';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Upload Document Dialog with drag-and-drop, validation, and progress simulation.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {Function} props.onUploadSuccess - Called with the new document object
 */
export function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isUploading) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isUploading]);

  const handleClose = () => {
    if (isUploading) return;
    setFile(null);
    setError(null);
    setIsDragging(false);
    setIsUploading(false);
    setUploadProgress(0);
    onClose();
  };

  const validateAndSetFile = (selectedFile) => {
    setError(null);

    if (!selectedFile) return;

    const fileName = selectedFile.name.toLowerCase();
    const isPdf = fileName.endsWith('.pdf') || selectedFile.type === 'application/pdf';
    const isDocx =
      fileName.endsWith('.docx') ||
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (!isPdf && !isDocx) {
      setError('Invalid file type. Only PDF (.pdf) and Word (.docx) files are supported.');
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (selectedFile.size / (1024 * 1024)).toFixed(1);
      setError(`File size (${sizeMb} MB) exceeds the 10 MB maximum limit.`);
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    const kb = bytes / 1024;
    return `${kb.toFixed(0)} KB`;
  };

  const handleStartUpload = () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(15);

    // Simulated multi-stage progress
    const t1 = setTimeout(() => setUploadProgress(45), 250);
    const t2 = setTimeout(() => setUploadProgress(85), 550);
    const t3 = setTimeout(() => {
      setUploadProgress(100);

      // Create new document record in local state
      const ext = file.name.toLowerCase().endsWith('.docx') ? 'DOCX' : 'PDF';
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: cleanName,
        fileName: file.name,
        type: ext,
        size: formatFileSize(file.size),
        sizeBytes: file.size,
        dateAdded: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        timestamp: Date.now(),
        status: 'Processing',
      };

      setTimeout(() => {
        onUploadSuccess(newDoc);
        handleClose();
      }, 300);
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        className="relative w-full max-w-lg bg-surface rounded-2xl border border-border shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150 my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-accent-secondary flex items-center justify-center text-accent">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="upload-modal-title"
                className="text-base font-bold text-primary tracking-tight"
              >
                Upload Document
              </h3>
              <p className="text-xs text-text-secondary">
                Supported formats: PDF and DOCX (Max 10 MB)
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={isUploading}
            aria-label="Close dialog"
            className="p-1.5 text-text-secondary hover:text-primary hover:bg-background rounded-lg transition-colors disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-4">
          {/* Drag & Drop Zone */}
          {!file && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
                isDragging
                  ? 'border-accent bg-accent-secondary/30 scale-[0.99]'
                  : 'border-border hover:border-accent/50 hover:bg-background-subtle/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload-input"
              />

              <div className="h-14 w-14 rounded-2xl bg-accent-secondary text-accent flex items-center justify-center mx-auto mb-3 shadow-subtle">
                <UploadCloud className="h-7 w-7" />
              </div>

              <p className="text-sm font-semibold text-primary mb-1">
                Drop your file here, or{' '}
                <span className="text-accent underline underline-offset-2">browse files</span>
              </p>
              <p className="text-xs text-text-secondary">
                PDF (.pdf) or Microsoft Word (.docx) up to 10 MB
              </p>
            </div>
          )}

          {/* Validation Error Banner */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200/70 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <div className="flex-1">
                <p className="font-semibold">Upload failed</p>
                <p className="text-red-600 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Selected File Preview */}
          {file && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-background border border-border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-surface border border-border flex items-center justify-center text-accent shrink-0 shadow-subtle">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-primary truncate max-w-[260px]">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-text-secondary">
                      {formatFileSize(file.size)} • {file.name.endsWith('.docx') ? 'Word Document' : 'PDF Document'}
                    </p>
                  </div>
                </div>

                {!isUploading && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setError(null);
                    }}
                    aria-label="Remove selected file"
                    className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Upload Progress Bar (when uploading) */}
              {isUploading && (
                <div className="space-y-1.5 p-3 rounded-xl bg-accent-secondary/30 border border-accent/20">
                  <div className="flex items-center justify-between text-xs font-semibold text-accent">
                    <span className="flex items-center gap-1.5">
                      <LoadingSpinner size="sm" variant="accent" />
                      Uploading & Staging File...
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-accent-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Clear Demonstration Disclaimer Notice */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-background-subtle border border-border-subtle text-[11px] text-text-secondary">
            <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
            <p className="leading-relaxed">
              <strong>Frontend Demonstration:</strong> Uploaded files are validated client-side and added to your local library state with <em>Processing</em> status. Real server file storage and vector indexing will be connected in Phase 4.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Button
            variant="outline"
            size="md"
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleStartUpload}
            disabled={!file || isUploading}
            isLoading={isUploading}
            leftIcon={<UploadCloud className="h-4 w-4" />}
          >
            Upload Document
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
