import { useState, useCallback, useRef, useEffect } from 'react';
import type { Page } from '../../App';
import { Sidebar } from './Sidebar';
import { ChatProvider, useChatContext } from '../chat/ChatContext';
import { ChatPanel } from '../chat/ChatPanel';
import {
  CHAT_TRIGGER_MODE,
  THREADS_ENTRY_STORAGE_KEY,
  readThreadsEntryMode,
  type ChatTriggerMode,
  type ThreadsEntryMode,
} from '@/lib/chat-config';
import { FloatingChatBar } from '../chat/FloatingChatBar';
import { FloatingChatFAB } from '../chat/FloatingChatFAB';
import { FloatingChatBarD } from '../chat/FloatingChatBarD';
import { CdnIcon } from '../shared/CdnIcon';
import { ThreadSwitcherDropdown } from '../shared/ThreadSwitcherDropdown';

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

const PRIMARY_W = 228;
const PRIMARY_COMPACT_W = 80;

function DevSwitcher({
  triggerMode,
  onTriggerChange,
  threadsMode,
  onThreadsChange,
}: {
  triggerMode: ChatTriggerMode;
  onTriggerChange: (m: ChatTriggerMode) => void;
  threadsMode: ThreadsEntryMode;
  onThreadsChange: (m: ThreadsEntryMode) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 8, y: 8 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - (window.innerHeight - pos.y) };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const newX = Math.max(0, e.clientX - offset.current.x);
    const newBottom = Math.max(0, window.innerHeight - (e.clientY - offset.current.y));
    setPos({ x: newX, y: newBottom });
  }, []);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  return (
    <div
      ref={ref}
      className="fixed z-[60] flex flex-col gap-[6px] rounded-[6px] p-[6px] select-none"
      style={{
        bottom: pos.y,
        left: pos.x,
        background: 'rgba(0,0,0,0.82)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        cursor: 'grab',
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="flex items-center gap-[6px]">
        <span className="px-[2px] font-['Delight',sans-serif] text-[10px] leading-[14px] tracking-[0.1px] text-white/45">
          Chat
        </span>
        <div className="flex gap-[2px]">
          {MODES.map(m => (
            <button
              key={m.value}
              type="button"
              className="cursor-pointer rounded-[4px] px-[6px] py-[2px] text-[11px] transition-colors"
              style={{
                background: triggerMode === m.value ? '#49A3A6' : 'transparent',
                color: triggerMode === m.value ? '#fff' : 'rgba(255,255,255,0.6)',
                border: 'none',
              }}
              onClick={() => onTriggerChange(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-[6px]">
        <span className="px-[2px] font-['Delight',sans-serif] text-[10px] leading-[14px] tracking-[0.1px] text-white/45">
          Threads
        </span>
        <div className="flex gap-[2px]">
          {(['1', '2', '3', '4'] as const).map(k => (
            <button
              key={k}
              type="button"
              className="min-w-[24px] cursor-pointer rounded-[4px] px-[6px] py-[2px] font-['Delight',sans-serif] text-[11px] transition-colors"
              style={{
                background: threadsMode === k ? '#49A3A6' : 'transparent',
                color: threadsMode === k ? '#fff' : 'rgba(255,255,255,0.55)',
                border: 'none',
              }}
              onClick={() => onThreadsChange(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeThreadsCorner({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { activeConversationId } = useChatContext();
  return (
    <div className="pointer-events-auto fixed z-[45]" style={{ top: 18, right: 18 }}>
      <ThreadSwitcherDropdown
        activeId={activeConversationId}
        onSelect={(id) => onNavigate(`thread/${id}` as Page)}
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
  const { chatOpen, closeChat, toggleChat, openChat, contextTag, activeConversationId, setActiveConversation } =
    useChatContext();
  const showChat = chatOpen && contextTag !== null;
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_W);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_PANEL_W);
  const [threadsRailOpen, setThreadsRailOpen] = useState(false);
  const sidebarCompact = false;

  useEffect(() => {
    if (threadsEntryMode !== '2' && threadsEntryMode !== '4') setThreadsRailOpen(false);
  }, [threadsEntryMode]);

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
    <div className="flex h-screen overflow-hidden bg-[#2a2a38]">
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
      />
      <main
        className="relative flex min-w-0 flex-1 overflow-hidden rounded-bl-[8px] rounded-tl-[8px] bg-white"
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
    </div>
  );
}

export function AppShell({ activePage, onNavigate, children }: AppShellProps) {
  const [triggerMode, setTriggerMode] = useState<ChatTriggerMode>(
    () => (sessionStorage.getItem('chatTriggerMode') as ChatTriggerMode) || CHAT_TRIGGER_MODE,
  );
  const [threadsEntryMode, setThreadsEntryMode] = useState<ThreadsEntryMode>(() => readThreadsEntryMode());

  const handleModeChange = (m: ChatTriggerMode) => {
    sessionStorage.setItem('chatTriggerMode', m);
    setTriggerMode(m);
  };

  const handleThreadsEntryChange = (m: ThreadsEntryMode) => {
    sessionStorage.setItem(THREADS_ENTRY_STORAGE_KEY, m);
    setThreadsEntryMode(m);
  };

  return (
    <ChatProvider activePage={activePage} threadsEntryMode={threadsEntryMode} chatTriggerMode={triggerMode}>
      <DevSwitcher
        triggerMode={triggerMode}
        onTriggerChange={handleModeChange}
        threadsMode={threadsEntryMode}
        onThreadsChange={handleThreadsEntryChange}
      />
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
