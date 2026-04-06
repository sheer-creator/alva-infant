import { useState, useCallback, useRef } from 'react';
import type { Page } from '../../App';
import { Sidebar } from './Sidebar';
import { ChatProvider, useChatContext } from '../chat/ChatContext';
import { ChatPanel } from '../chat/ChatPanel';
import { CHAT_TRIGGER_MODE, type ChatTriggerMode } from '@/lib/chat-config';
import { FloatingChatBar } from '../chat/FloatingChatBar';
import { FloatingChatFAB } from '../chat/FloatingChatFAB';
import { FloatingChatBarD } from '../chat/FloatingChatBarD';

interface AppShellProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const MODES: { value: ChatTriggerMode; label: string }[] = [
  { value: 'floating-bar', label: 'A' },
  { value: 'sidebar', label: 'B' },
  { value: 'fab', label: 'C' },
  { value: 'inline-composer', label: 'D' },
];

function ModeSwitcher({ mode, onChange }: { mode: ChatTriggerMode; onChange: (m: ChatTriggerMode) => void }) {
  return (
    <div
      className="fixed z-50 flex items-center gap-[2px] rounded-[6px] overflow-hidden"
      style={{ bottom: 52, left: 8, background: 'rgba(0,0,0,0.8)', padding: 2 }}
    >
      {MODES.map(m => (
        <button
          key={m.value}
          className="px-[8px] py-[2px] text-[11px] rounded-[4px] cursor-pointer transition-colors"
          style={{
            background: mode === m.value ? '#49A3A6' : 'transparent',
            color: mode === m.value ? '#fff' : 'rgba(255,255,255,0.6)',
            border: 'none',
          }}
          onClick={() => onChange(m.value)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

const DEFAULT_PANEL_W = 496;
const MIN_PANEL_W = 380;
const MAX_PANEL_W = 720;

function AppShellInner({ activePage, onNavigate, children, triggerMode }: AppShellProps & { triggerMode: ChatTriggerMode }) {
  const { chatOpen, closeChat, toggleChat, openChat, contextTag, activeConversationId, setActiveConversation } = useChatContext();
  const showChat = chatOpen && contextTag !== null;
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_W);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_PANEL_W);

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    if (!chatOpen) openChat(id !== 'new');
  };

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = panelWidth;
    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = startX.current - ev.clientX;
      const next = Math.min(MAX_PANEL_W, Math.max(MIN_PANEL_W, startW.current + delta));
      setPanelWidth(next);
    };
    const onUp = () => {
      dragging.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [panelWidth]);

  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        chatOpen={triggerMode === 'sidebar' ? chatOpen : undefined}
        onChatToggle={triggerMode === 'sidebar' ? toggleChat : undefined}
        activeConversationId={chatOpen ? activeConversationId : undefined}
        onSelectConversation={handleSelectConversation}
      />
      <main className="ml-[228px] flex-1 flex bg-white rounded-tl-[8px] rounded-bl-[8px] overflow-hidden relative">
        <div className="flex-1 min-w-0 overflow-hidden">
          {children}
        </div>
        {contextTag !== null && (
          <div
            className="relative shrink-0"
            style={{
              width: showChat ? panelWidth : 0,
              minWidth: showChat ? panelWidth : 0,
              transition: dragging.current ? 'none' : 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
              overflow: 'hidden',
            }}
          >
            {/* Drag handle */}
            <div
              className="absolute left-0 top-0 bottom-0 z-10"
              style={{ width: 6, cursor: 'col-resize' }}
              onMouseDown={onDragStart}
            />
            <ChatPanel onClose={closeChat} contextTag={contextTag} />
          </div>
        )}
      </main>

      {contextTag !== null && triggerMode === 'floating-bar' && (
        <FloatingChatBar />
      )}
      {contextTag !== null && triggerMode === 'fab' && (
        <FloatingChatFAB />
      )}
      {contextTag !== null && triggerMode === 'inline-composer' && (
        <FloatingChatBarD />
      )}
    </div>
  );
}

export function AppShell({ activePage, onNavigate, children }: AppShellProps) {
  const [triggerMode, setTriggerMode] = useState<ChatTriggerMode>(
    () => (sessionStorage.getItem('chatTriggerMode') as ChatTriggerMode) || CHAT_TRIGGER_MODE
  );

  const handleModeChange = (m: ChatTriggerMode) => {
    sessionStorage.setItem('chatTriggerMode', m);
    setTriggerMode(m);
  };

  return (
    <ChatProvider activePage={activePage}>
      <ModeSwitcher mode={triggerMode} onChange={handleModeChange} />
      <AppShellInner activePage={activePage} onNavigate={onNavigate} triggerMode={triggerMode}>
        {children}
      </AppShellInner>
    </ChatProvider>
  );
}
