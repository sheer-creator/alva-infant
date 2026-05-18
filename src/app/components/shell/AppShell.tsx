import { useState, useCallback, useRef, useEffect } from 'react';
import type { Page } from '../../App';
import { Sidebar } from './Sidebar';
import { useChatContext } from '../chat/ChatContext';
import { ChatPanel } from '../chat/ChatPanel';
import {
  CHAT_TRIGGER_MODE,
  isPlaybookOwnerPage,
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
            <CdnIcon name="history-l" size={16} color="var(--text-n9)" />
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
        <CdnIcon name="history-l" size={16} color="var(--text-n9)" />
      </button>
    </div>
  );
}

const DEFAULT_PANEL_W = 480;
const MIN_PANEL_W = 436;
const getMaxPanelW = () =>
  typeof window !== 'undefined' ? Math.max(MIN_PANEL_W, window.innerWidth * 0.6) : DEFAULT_PANEL_W;

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
    inspectorActive,
    addElementQuote,
  } = useChatContext();
  const showChat = chatOpen && contextTag !== null;
  const [panelWidth, setPanelWidth] = useState(() => Math.min(getMaxPanelW(), DEFAULT_PANEL_W));
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_PANEL_W);
  const panelWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setPanelWidth((prev) => Math.min(getMaxPanelW(), Math.max(MIN_PANEL_W, prev)));
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const [threadsRailOpen, setThreadsRailOpen] = useState(false);
  const sidebarCompact = false;

  const inspectorActiveRef = useRef(inspectorActive);
  inspectorActiveRef.current = inspectorActive;

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
      if (data.type === 'alva:navigate' && typeof data.page === 'string') {
        onNavigate(data.page as Page);
      }
      /* inspector → quote */
      if (data.type === 'alva:inspector-quote') {
        addElementQuote({
          index: data.index ?? 0,
          selector: data.selector,
          tagName: data.tagName,
          newText: data.newText ?? null,
          originalText: data.originalText ?? null,
          instruction: data.instruction ?? null,
        });
      }
      /* iframe (re)loaded — re-send current inspector state */
      if (data.type === 'alva:inspector-ready') {
        const src = e.source as Window | null;
        if (src && inspectorActiveRef.current) {
          try { src.postMessage({ type: 'alva:inspector-activate', viewerMode: !isPlaybookOwnerPage(activePage || '') }, '*'); } catch (_) {}
        }
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [closeChat, openChatWithPrefill, onNavigate, addElementQuote]);

  useEffect(() => {
    if (!chatOpen) return;
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentWindow?.postMessage({ type: 'alva:drawer-open', drawer: 'chat' }, '*'); } catch (_) {}
    });
  }, [chatOpen]);

  /* notify iframes when inspector mode toggles or chat panel opens/closes */
  useEffect(() => {
    const msg = inspectorActive
      ? { type: 'alva:inspector-activate', viewerMode: !isPlaybookOwnerPage(activePage || '') }
      : { type: 'alva:inspector-deactivate' };
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentWindow?.postMessage(msg, '*'); } catch (_) {}
    });
  }, [inspectorActive, chatOpen, activePage]);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      const node = panelWrapperRef.current;
      if (node) node.style.transition = 'none';
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      /* iframe 会偷 mousemove —— 拖拽期间屏蔽 pointer-events，事件回到 document */
      const iframes = Array.from(document.querySelectorAll('iframe'));
      const prevIframePE: string[] = iframes.map((f) => f.style.pointerEvents);
      iframes.forEach((f) => { f.style.pointerEvents = 'none'; });

      let latest = panelWidth;
      const maxW = getMaxPanelW();
      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const delta = startX.current - ev.clientX;
        latest = Math.min(maxW, Math.max(MIN_PANEL_W, startW.current + delta));
        if (node) {
          node.style.width = `${latest}px`;
          node.style.minWidth = `${latest}px`;
        }
      };
      const onUp = () => {
        dragging.current = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        iframes.forEach((f, i) => { f.style.pointerEvents = prevIframePE[i]; });
        if (node) node.style.transition = '';
        setPanelWidth(latest);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [panelWidth],
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--b0-sidebar)' }}>
      {/* Desktop sidebar — hidden below lg */}
      <div className="hidden lg:block">
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
      </div>

      {/* Mobile sidebar overlay — shown below lg when open */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full" style={{ width: 264 }}>
            <Sidebar
              activePage={activePage}
              onNavigate={(page) => { setMobileMenuOpen(false); onNavigate(page); }}
              chatOpen={triggerMode === 'sidebar' ? chatOpen : undefined}
              onChatToggle={triggerMode === 'sidebar' ? toggleChat : undefined}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              threadsEntryMode={threadsEntryMode}
              threadsRailOpen={false}
              sidebarCompact={false}
              primaryWidth={264}
              onUserMouseEnter={handleUserEnter}
            />
          </div>
        </div>
      )}

      <style>{`@media (min-width: 1024px) { [data-app-main] { margin-left: ${sidebarTotalW}px; } }`}</style>
      <main
        data-app-main=""
        className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-white"
      >
        {/* Mobile topbar — shown below lg */}
        <div
          className="flex lg:hidden items-center shrink-0"
          style={{
            height: 56,
            padding: '18px 16px',
            gap: 12,
            background: 'var(--b0-page, #fff)',
          }}
        >
          <button
            type="button"
            className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <CdnIcon name="menu-l" size={20} color="var(--text-n7, rgba(0,0,0,0.7))" />
          </button>
          <img
            src={`${import.meta.env.BASE_URL}logo-alva-beta-green-black.svg`}
            alt="Alva"
            style={{ height: 14 }}
          />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden lg:flex lg:flex-row">
          <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          {contextTag !== null && (
            <div
              ref={panelWrapperRef}
              className="relative shrink-0"
              style={{
                width: showChat ? panelWidth : 0,
                minWidth: showChat ? panelWidth : 0,
                transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
                overflow: 'hidden',
              }}
            >
              <div
                className="absolute bottom-0 left-0 top-0 z-10"
                style={{ width: 12, cursor: 'col-resize' }}
                onMouseDown={onDragStart}
              />
              <ChatPanel onClose={closeChat} contextTag={contextTag} />
            </div>
          )}
        </div>
        {activePage === 'home' && threadsEntryMode === '3' && <HomeThreadsCorner onNavigate={onNavigate} />}
        {activePage === 'home' && threadsEntryMode === '4' && <HomeThreadsLeft onToggle={() => setThreadsRailOpen(o => !o)} />}
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
    <AppShellInner
      activePage={activePage}
      onNavigate={onNavigate}
      triggerMode={triggerMode}
      threadsEntryMode={threadsEntryMode}
    >
      {children}
    </AppShellInner>
  );
}
