import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { Page } from '@/app/App';
import { PAGE_CONTEXT_MAP, PAGE_DEFAULT_THREAD, type ContextTagData } from '@/lib/chat-config';

interface ChatContextValue {
  chatOpen: boolean;
  hasInitialInput: boolean;
  toggleChat: () => void;
  closeChat: () => void;
  openChat: (withInput?: boolean) => void;
  contextTag: ContextTagData | null;
  activePage: Page;
  activeConversationId: string;
  setActiveConversation: (id: string) => void;
}

const ChatCtx = createContext<ChatContextValue | null>(null);

export function ChatProvider({ activePage, children }: { activePage: Page; children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [hasInitialInput, setHasInitialInput] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState('new');

  // Auto-open chat when navigating from a thread page
  useEffect(() => {
    const threadId = sessionStorage.getItem('openChatWithThread');
    if (threadId) {
      sessionStorage.removeItem('openChatWithThread');
      setActiveConversationId(threadId);
      setHasInitialInput(true);
      setChatOpen(true);
    }
  }, [activePage]);

  const toggleChat = useCallback(() => setChatOpen(v => !v), []);
  const closeChat = useCallback(() => { setChatOpen(false); setHasInitialInput(false); }, []);
  const openChat = useCallback((withInput = false) => {
    const defaultThread = PAGE_DEFAULT_THREAD[activePage];
    if (defaultThread) {
      setActiveConversationId(defaultThread);
      setHasInitialInput(true);
    } else {
      setHasInitialInput(withInput);
      if (withInput) setActiveConversationId('demo');
    }
    setChatOpen(true);
  }, [activePage]);

  const setActiveConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setHasInitialInput(id === 'demo');
  }, []);

  const contextTag = PAGE_CONTEXT_MAP[activePage] ?? null;

  const value = useMemo(
    () => ({ chatOpen, hasInitialInput, toggleChat, closeChat, openChat, contextTag, activePage, activeConversationId, setActiveConversation }),
    [chatOpen, hasInitialInput, toggleChat, closeChat, openChat, contextTag, activePage, activeConversationId, setActiveConversation],
  );

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChatContext must be inside ChatProvider');
  return ctx;
}
