import { useState, useCallback, useRef, useEffect } from 'react';
import type { Page } from '../../App';
import { Sidebar } from './Sidebar';
import { ChatProvider, useChatContext } from '../chat/ChatContext';
import { ChatPanel } from '../chat/ChatPanel';
import {
  CHAT_TRIGGER_MODE,
  type ChatTriggerMode,
  type ThreadsEntryMode,
} from '@/lib/chat-config';
import { FloatingChatBar } from '../chat/FloatingChatBar';
import { FloatingChatFAB } from '../chat/FloatingChatFAB';
import { FloatingChatBarD } from '../chat/FloatingChatBarD';
import { CdnIcon } from '../shared/CdnIcon';
import { ThreadSwitcherDropdown, AGENT_CONVERSATION_ID } from '../shared/ThreadSwitcherDropdown';
import UserInfo from '../UserInfo';

interface AppShellProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const PRIMARY_W = 228;
const PRIMARY_COMPACT_W = 80;

function HomeThreadsCorner({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { activeConversationId } = useChatContext();
  return (
    <div className="pointer-events-auto fixed z-[45]" style={{ top: 18, right: 18 }}>
      <ThreadSwitcherDropdown
        activeId={activeConversationId}
        onSelect={(id) => onNavigate((id === AGENT_CONVERSATION_ID ? 'agent' : `thread/${id}`) as Page)}
        align="right"
        trigger={
          <button
            type="button"
            className="cursor-pointer rounded-[8px] p-[6px] transition-colors hover:bg-black/[0.06]"
            aria-label="Recent threads"
          >
            <CdnIcon name="history-l" size={16} color="rgba(0,0,0,0.85)" />
          </button>
        }
      />
    </div>
  );
}

function HomeThreadsLeft({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="pointer-events-auto absolute z-[45]" style={{ top: 18, left: 18 }}>
      <button
        type="button"
        className="cursor-pointer rounded-[8px] p-[6px] transition-colors hover:bg-black/[0.06]"
        aria-label="Recent threads"
        onClick={onToggle}
      >
        <CdnIcon name="history-l" size={16} color="rgba(0,0,0,0.85)" />
      </button>
    </div>
  );
}

const DEFAULT_PANEL_W = 496;
const MIN_PANEL_W = 380;
const MAX_PANEL_W = 720;

function AppShellInner({
  activePage,
  onNavigate,
  children,
  triggerMode,
  threadsEntryMode,
}: AppShellProps & { triggerMode: ChatTriggerMode; threadsEntryMode: ThreadsEntryMode }) {
  const {
    chatOpen,
    closeChat,
    toggleChat,
    openChat,
    openChatWithPrefill,
    contextTag,
    activeConversationId,
    setActiveConversation,
  } = useChatContext();
  const showChat = chatOpen && contextTag !== null;
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_W);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_PANEL_W);
  const [threadsRailOpen, setThreadsRailOpen] = useState(false);
  const sidebarCompact = false;

  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadsEntryMode !== '2' && threadsEntryMode !== '4') setThreadsRailOpen(false);
  }, [threadsEntryMode]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'alva:drawer-open' && data.drawer !== 'chat') closeChat();
      if (data.type === 'alva:remix' && typeof data.prompt === 'string') {
        openChatWithPrefill(data.prompt);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [closeChat, openChatWithPrefill]);

  useEffect(() => {
    if (!chatOpen) return;
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentWindow?.postMessage({ type: 'alva:drawer-open', drawer: 'chat' }, '*'); } catch (_) {}
    });
  }, [chatOpen]);

  const handleUserEnter = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setIsUserInfoOpen(true);
  }, []);

  useEffect(() => {
    if (!isUserInfoOpen) return;

    const onMouseMove = (e: MouseEvent) => {
      const popup = popupRef.current;
      if (!popup) return;

      const rect = popup.getBoundingClientRect();
      const inSafeZone =
        e.clientX >= rect.left - 20 &&
        e.clientX <= rect.right + 20 &&
        e.clientY >= rect.top - 10 &&
        e.clientY <= window.innerHeight;

      if (inSafeZone) {
        if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
      } else if (!closeTimer.current) {
        closeTimer.current = setTimeout(() => setIsUserInfoOpen(false), 150);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    };
  }, [isUserInfoOpen]);

  const closeUserInfo = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setIsUserInfoOpen(false);
  }, []);

  const primaryW = sidebarCompact ? PRIMARY_COMPACT_W : PRIMARY_W;
  const sidebarTotalW = primaryW;

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    if (!chatOpen) openChat(id !== 'new');
  };

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
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
    },
    [panelWidth],
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--b0-sidebar)' }}>
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        chatOpen={triggerMode === 'sidebar' ? chatOpen : undefined}
        onChatToggle={triggerMode === 'sidebar' ? toggleChat : undefined}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        threadsEntryMode={threadsEntryMode}
        threadsRailOpen={threadsRailOpen}
        onToggleThreadsRail={() => setThreadsRailOpen(o => !o)}
        sidebarCompact={sidebarCompact}
        primaryWidth={primaryW}
        onUserMouseEnter={handleUserEnter}
      />
      <main
        className="relative flex min-w-0 flex-1 overflow-hidden bg-white"
        style={{ marginLeft: sidebarTotalW }}
      >
        <div className="min-w-0 flex-1 overflow-hidden">{children}</div>
        {activePage === 'home' && threadsEntryMode === '3' && <HomeThreadsCorner onNavigate={onNavigate} />}
        {activePage === 'home' && threadsEntryMode === '4' && <HomeThreadsLeft onToggle={() => setThreadsRailOpen(o => !o)} />}
        {contextTag !== null && (
          <div
            className="relative shrink-0"
            style={{
              width: showChat ? panelWidth : 0,
              minWidth: showChat ? panelWidth : 0,
              transition: dragging.current
                ? 'none'
                : 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
              overflow: 'hidden',
            }}
          >
            <div
              className="absolute bottom-0 left-0 top-0 z-10"
              style={{ width: 6, cursor: 'col-resize' }}
              onMouseDown={onDragStart}
            />
            <ChatPanel onClose={closeChat} contextTag={contextTag} />
          </div>
        )}
      </main>

      {contextTag !== null && triggerMode === 'floating-bar' && <FloatingChatBar />}
      {contextTag !== null && triggerMode === 'fab' && <FloatingChatFAB />}
      {contextTag !== null && triggerMode === 'inline-composer' && <FloatingChatBarD />}

      {isUserInfoOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onMouseDown={closeUserInfo} />
          <div
            ref={popupRef}
            className="fixed bottom-[56px] left-[8px] z-[9999] w-[360px]"
          >
            <UserInfo onNavigate={onNavigate} />
          </div>
        </>
      )}
    </div>
  );
}

export function AppShell({ activePage, onNavigate, children }: AppShellProps) {
  const triggerMode = CHAT_TRIGGER_MODE;
  const threadsEntryMode: ThreadsEntryMode = '1';

  return (
    <ChatProvider activePage={activePage} threadsEntryMode={threadsEntryMode} chatTriggerMode={triggerMode}>
      <AppShellInner
        activePage={activePage}
        onNavigate={onNavigate}
        triggerMode={triggerMode}
        threadsEntryMode={threadsEntryMode}
      >
        {children}
      </AppShellInner>
    </ChatProvider>
  );
}
