import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ConversationSidebar } from '../../components/dashboard/assistant/ConversationSidebar';
import { ChatArea } from '../../components/dashboard/assistant/ChatArea';
import {
  initialConversations,
  generateDemoResponse,
} from '../../components/dashboard/assistant/assistantData';

// ---------------------------------------------------------------------------
// ID generator
// ---------------------------------------------------------------------------
let _id = 1000;
const uid = (prefix) => `${prefix}-${++_id}-${Date.now()}`;

// ---------------------------------------------------------------------------
// AssistantPage
// Owns all conversation state and wires ConversationSidebar ↔ ChatArea.
// ---------------------------------------------------------------------------
export function AssistantPage() {
  // --- Conversations ---
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId]           = useState(null);

  // Update synchronously on conversation changes so pending callbacks can be guarded.
  const activeIdRef = useRef(null);
  const responseVersionRef = useRef(0);

  // --- Composer ---
  const [composerValue, setComposerValue] = useState('');

  // --- AI typing simulation ---
  const [isTyping, setIsTyping]   = useState(false);
  const typingTimerRef            = useRef(null);

  // --- Per-conversation document context ---
  const [contextMap, setContextMap] = useState(() => {
    const map = {};
    initialConversations.forEach((c) => {
      if (c.documentId) map[c.id] = c.documentId;
    });
    return map;
  });

  // Keep contextMap in a ref so the timer callback can access the latest
  // value without stale-closure problems.
  const contextMapRef = useRef(contextMap);
  useEffect(() => {
    contextMapRef.current = contextMap;
  }, [contextMap]);

  // --- Mobile sidebar drawer ---
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Cancel any pending AI response timer and clear the typing indicator.
  // Call this whenever the active conversation changes or the component unmounts.
  // ---------------------------------------------------------------------------
  const cancelPendingResponse = useCallback(() => {
    responseVersionRef.current += 1;
    if (typingTimerRef.current !== null) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsTyping(false);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      responseVersionRef.current += 1;
      if (typingTimerRef.current !== null) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------------------
  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;
  const selectedDocumentId = activeId ? contextMap[activeId] ?? null : null;

  // ---------------------------------------------------------------------------
  // Core send logic — extracted so both sendMessage and handlePromptClick
  // call a single implementation.
  // ---------------------------------------------------------------------------
  const dispatchMessage = useCallback((text) => {
    const targetId = activeIdRef.current;
    if (!text || !targetId) return;

    const userMsg = {
      id: uid('msg'),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== targetId) return c;
        const title =
          c.title === 'New Conversation'
            ? text.length > 40
              ? text.slice(0, 40).trimEnd() + '…'
              : text
            : c.title;
        return { ...c, title, updatedAt: Date.now(), messages: [...c.messages, userMsg] };
      })
    );

    setIsTyping(true);

    const responseVersion = ++responseVersionRef.current;
    const delay = 1200 + Math.random() * 800;
    typingTimerRef.current = setTimeout(() => {
      if (
        responseVersionRef.current !== responseVersion ||
        activeIdRef.current !== targetId
      ) return;

      const docId = contextMapRef.current[targetId] ?? null;
      const aiContent = generateDemoResponse(text, docId);
      const aiMsg = {
        id: uid('msg'),
        role: 'ai',
        content: aiContent,
        timestamp: Date.now(),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== targetId) return c;
          return { ...c, updatedAt: Date.now(), messages: [...c.messages, aiMsg] };
        })
      );
      setIsTyping(false);
      typingTimerRef.current = null;
    }, delay);
  }, []);

  // ---------------------------------------------------------------------------
  // Conversation actions
  // ---------------------------------------------------------------------------
  const handleSelect = useCallback((id) => {
    cancelPendingResponse();
    activeIdRef.current = id;
    setActiveId(id);
    setComposerValue('');
    setMobileSidebarOpen(false);
  }, [cancelPendingResponse]);

  const handleNewChat = useCallback(() => {
    cancelPendingResponse();
    const id = uid('conv');
    const newConv = {
      id,
      title: 'New Conversation',
      documentId: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    activeIdRef.current = id;
    setActiveId(id);
    setComposerValue('');
    setMobileSidebarOpen(false);
  }, [cancelPendingResponse]);

  const handleRename = useCallback((id, newTitle) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  }, []);

  const handleDelete = useCallback((id) => {
    // If we're deleting the active conversation, cancel its pending response first.
    if (activeIdRef.current === id) {
      cancelPendingResponse();
      activeIdRef.current = null;
    }
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
    setContextMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, [cancelPendingResponse]);

  // ---------------------------------------------------------------------------
  // Document context actions
  // ---------------------------------------------------------------------------
  const handleDocumentSelect = useCallback((docId) => {
    const id = activeIdRef.current;
    if (!id) return;
    setContextMap((prev) => ({ ...prev, [id]: docId }));
  }, []);

  const handleDocumentRemove = useCallback(() => {
    const id = activeIdRef.current;
    if (!id) return;
    setContextMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Sending messages
  // ---------------------------------------------------------------------------
  const sendMessage = useCallback(() => {
    const text = composerValue.trim();
    if (!text || isTyping || !activeIdRef.current) return;
    setComposerValue('');
    dispatchMessage(text);
  }, [composerValue, isTyping, dispatchMessage]);

  // Suggested prompt click — send immediately without relying on composerValue state flush
  const handlePromptClick = useCallback((promptText) => {
    const text = promptText.trim();
    if (!text || isTyping || !activeIdRef.current) return;
    setComposerValue('');
    dispatchMessage(text);
  }, [isTyping, dispatchMessage]);

  // ---------------------------------------------------------------------------
  // Layout — escapes DashboardLayout padding via negative margins.
  // Height: viewport minus the 70px sticky header.
  // ---------------------------------------------------------------------------
  return (
    <div
      className="
        -mx-4 -my-4
        sm:-mx-6 sm:-my-6
        lg:-mx-8 lg:-my-8
        flex overflow-hidden
        border border-border rounded-none
        bg-surface
      "
      style={{ height: 'calc(100vh - 70px)' }}
    >
      {/* Conversation sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelect}
        onNewChat={handleNewChat}
        onRename={handleRename}
        onDelete={handleDelete}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main chat area */}
      <ChatArea
        conversation={activeConversation}
        isTyping={isTyping}
        composerValue={composerValue}
        onComposerChange={setComposerValue}
        onSend={sendMessage}
        onPromptClick={handlePromptClick}
        selectedDocumentId={selectedDocumentId}
        onDocumentSelect={handleDocumentSelect}
        onDocumentRemove={handleDocumentRemove}
        onNewChat={handleNewChat}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
      />
    </div>
  );
}

export default AssistantPage;
