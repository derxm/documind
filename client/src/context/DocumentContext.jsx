import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  useEffect,
} from 'react';
import { initialDocuments } from '../components/dashboard/documents/documentsData';

const DocumentContext = createContext(null);

export function documentReducer(state, action) {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return [action.document, ...state];
    case 'UPDATE_DOCUMENT':
      return state.map((document) =>
        document.id === action.id
          ? { ...document, ...action.updates }
          : document
      );
    case 'DELETE_DOCUMENT':
      return state.filter((document) => document.id !== action.id);
    case 'SET_DOCUMENTS':
      return action.documents;
    default:
      return state;
  }
}

export function DocumentProvider({ children }) {
  const [documents, dispatch] = useReducer(documentReducer, initialDocuments);
  const [conversationDocumentContexts, setConversationDocumentContexts] = useState({});

  const addDocument = useCallback((document) => {
    dispatch({ type: 'ADD_DOCUMENT', document });
  }, []);

  const updateDocument = useCallback((id, updates) => {
    dispatch({ type: 'UPDATE_DOCUMENT', id, updates });
  }, []);

  const deleteDocument = useCallback((id) => {
    dispatch({ type: 'DELETE_DOCUMENT', id });
  }, []);

  const setDocuments = useCallback((nextDocuments) => {
    dispatch({ type: 'SET_DOCUMENTS', documents: nextDocuments });
  }, []);

  useEffect(() => {
    const documentIds = new Set(documents.map((document) => document.id));
    setConversationDocumentContexts((current) => {
      let changed = false;
      const next = {};

      Object.entries(current).forEach(([conversationId, documentId]) => {
        if (documentId === null || documentIds.has(documentId)) {
          next[conversationId] = documentId;
        } else {
          next[conversationId] = null;
          changed = true;
        }
      });

      return changed ? next : current;
    });
  }, [documents]);

  const getDocumentById = useCallback(
    (id) => documents.find((document) => document.id === id) ?? null,
    [documents]
  );

  const getDocumentsByStatus = useCallback(
    (status) => documents.filter((document) => document.status === status),
    [documents]
  );

  const statistics = useMemo(() => ({
    totalDocuments: documents.length,
    processedDocuments: documents.filter((document) => document.status === 'Processed').length,
    processingDocuments: documents.filter((document) => document.status === 'Processing').length,
    failedDocuments: documents.filter((document) => document.status === 'Failed').length,
  }), [documents]);

  const value = useMemo(() => ({
    documents,
    conversationDocumentContexts,
    setConversationDocumentContexts,
    ...statistics,
    addDocument,
    updateDocument,
    deleteDocument,
    setDocuments,
    getDocumentById,
    getDocumentsByStatus,
  }), [
    documents,
    conversationDocumentContexts,
    setConversationDocumentContexts,
    statistics,
    addDocument,
    updateDocument,
    deleteDocument,
    setDocuments,
    getDocumentById,
    getDocumentsByStatus,
  ]);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentContext() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider.');
  }
  return context;
}
