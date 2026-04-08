import type { CSSProperties } from 'react';
import type { Page } from '../../App';
import { CdnIcon } from '../shared/CdnIcon';
import type { ThreadsEntryMode } from '@/lib/chat-config';
import { CONVERSATIONS } from '@/lib/chat-config';

const THREADS_RAIL_W = 256;

const SIDEBAR_DOT_BG: CSSProperties = {
  background: '#2a2a38',
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 0.6px, transparent 0.6px)',
  backgroundSize: '3px 3px',
};

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  chatOpen?: boolean;
  onChatToggle?: () => void;
  activeConversationId?: string;
  onSelectConversation?: (id: string) => void;
  threadsEntryMode?: ThreadsEntryMode;
  threadsRailOpen?: boolean;
  onToggleThreadsRail?: () => void;
  sidebarCompact?: boolean;
  primaryWidth: number;
}

const NAV_ITEMS: { label: string; page?: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Explore', page: 'explore' },
  { label: 'Portfolio' },
  { label: 'Alva Skill' },
];

const PLAYBOOKS: { label: string; page?: Page }[] = [
  { label: 'Google / X Trends Tracker', page: 'trends' },
];

export function Sidebar({
  activePage,
  onNavigate,
  onChatToggle,
  onSelectConversation,
  threadsEntryMode = '1',
  threadsRailOpen = false,
  onToggleThreadsRail,
  sidebarCompact = false,
  primaryWidth,
  activeConversationId,
}: SidebarProps) {
  const logoSrc = `${import.meta.env.BASE_URL}logo-alva-beta.svg`;
  const showThreadsOverlay = threadsEntryMode === '2' || threadsEntryMode === '4';

  return (
    <div
      className="fixed left-0 top-0 z-20 flex h-screen overflow-visible"
      style={{ width: primaryWidth }}
    >
      <aside
        className="flex h-full shrink-0 flex-col overflow-y-auto p-[8px]"
        style={{ width: primaryWidth, ...SIDEBAR_DOT_BG }}
      >
        {/* Header */}
        {threadsEntryMode === '2' ? (
          <div className="flex h-[48px] shrink-0 items-center justify-between px-[8px] py-[8px]">
            {!sidebarCompact && (
              <img
                src={logoSrc}
                alt="Alva"
                className="h-[14px] w-auto max-w-[140px] object-contain object-left"
              />
            )}
            <div className="flex shrink-0 items-center gap-[8px]">
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center rounded-[6px] p-[2px] opacity-90 transition-opacity hover:opacity-100"
                aria-label="Threads history"
                aria-pressed={threadsRailOpen}
                onClick={() => onToggleThreadsRail?.()}
              >
                <CdnIcon name="history-l" size={16} color="#ffffff" />
              </button>
              <div className="flex items-center justify-center rounded-[6px] p-[2px] opacity-90">
                <img src={`${import.meta.env.BASE_URL}sidebar-onoff.svg`} alt="" width={16} height={16} />
              </div>
            </div>
          </div>
        ) : (
          !sidebarCompact && (
            <div className="flex h-[48px] shrink-0 items-center px-[8px] py-[16px]">
              <img src={logoSrc} alt="Alva" className="h-[14px] w-auto max-w-[160px] object-contain object-left" />
            </div>
          )
        )}

        {sidebarCompact && (
          <div className="flex justify-center pb-[8px] pt-[4px]">
            <img src={logoSrc} alt="" className="h-[12px] w-auto opacity-90" />
          </div>
        )}

        {onChatToggle && (
          <div className="shrink-0 py-[4px]">
            <div
              className="flex h-[32px] cursor-pointer items-center justify-center gap-[8px] rounded-[6px] transition-opacity hover:opacity-90"
              style={{ background: '#49A3A6' }}
              onClick={() => {
                if (activePage === 'home') {
                  const input = document.querySelector<HTMLElement>('[contenteditable], textarea, input[type="text"], .ProseMirror');
                  if (input) {
                    input.focus();
                  } else {
                    const fallback = document.querySelector<HTMLElement>('[placeholder]');
                    fallback?.focus();
                  }
                } else if (activePage.startsWith('thread/')) {
                  onNavigate('thread/new' as Page);
                } else {
                  onSelectConversation?.('new');
                }
              }}
            >
              <CdnIcon name="sidebar-new-normal" size={16} color="#fff" />
              {!sidebarCompact && (
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-white">
                  New Thread
                </span>
              )}
            </div>
          </div>
        )}

        <div className="py-[4px]">
          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              title={sidebarCompact ? item.label : undefined}
              className={`h-[36px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-[4px] px-[8px] text-[13px] leading-[36px] tracking-[0.13px] transition-colors ${
                item.page === activePage ? 'text-[#49A3A6]' : 'text-white hover:bg-white/5'
              } ${sidebarCompact ? 'text-center px-[4px] text-[11px]' : ''}`}
              onClick={() => item.page && onNavigate(item.page)}
            >
              {sidebarCompact ? item.label.slice(0, 1) : item.label}
            </div>
          ))}
        </div>

        <div className="py-[4px]">
          {!sidebarCompact && (
            <div className="flex h-[36px] shrink-0 items-center px-[8px] text-[12px] tracking-[0.12px] text-white/50">
              Playbooks
            </div>
          )}
          {PLAYBOOKS.map(item => (
            <div
              key={item.label}
              title={sidebarCompact ? item.label : undefined}
              className={`h-[36px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-[4px] px-[8px] text-[13px] leading-[36px] tracking-[0.13px] transition-colors ${
                item.page === activePage ? 'text-[#49A3A6]' : 'text-white hover:bg-white/5'
              } ${sidebarCompact ? 'text-center px-[4px] text-[10px]' : ''}`}
              onClick={() => {
                if (item.page) {
                  if (onChatToggle) sessionStorage.setItem('openChatWithThread', 'demo');
                  onNavigate(item.page);
                }
              }}
            >
              {sidebarCompact ? '▸' : item.label}
            </div>
          ))}
        </div>

        <div className="min-h-0 flex-1" />

        <div className="flex shrink-0 items-center gap-[8px] rounded-[4px] p-[8px]">
          <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#49A3A6] text-[11px] font-medium text-white">
            A
          </div>
          {!sidebarCompact && (
            <span className="text-[13px] tracking-[0.13px] text-white">Alva Intern</span>
          )}
        </div>
      </aside>

      {/* 方案2/4：点击空白收起 */}
      {showThreadsOverlay && threadsRailOpen && (
        <div
          className="fixed inset-0 z-[25]"
          onClick={() => onToggleThreadsRail?.()}
        />
      )}

      {/* 方案2/4：Recent Threads 覆盖浮层 */}
      {showThreadsOverlay && (
        <div
          className="absolute top-0 flex h-full flex-col overflow-hidden rounded-tr-[8px] rounded-br-[8px] transition-[width,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            left: primaryWidth,
            width: threadsRailOpen ? THREADS_RAIL_W : 0,
            opacity: threadsRailOpen ? 1 : 0,
            zIndex: 30,
            ...SIDEBAR_DOT_BG,
          }}
        >
          {threadsRailOpen && (
            <>
              <div className="shrink-0 px-[16px] pt-[20px] pb-[4px]">
                <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-white/50">
                  Recent Threads
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-[8px] pb-[12px]">
                {CONVERSATIONS.map(c => {
                  const active = c.id === activeConversationId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`flex h-[36px] w-full cursor-pointer items-center gap-[8px] rounded-[6px] px-[8px] text-left transition-colors ${
                        active ? 'bg-white/[0.03]' : 'hover:bg-white/[0.05]'
                      }`}
                      onClick={() => {
                        onNavigate(`thread/${c.id}` as Page);
                        onToggleThreadsRail?.();
                      }}
                    >
                      <CdnIcon
                        name="sidebar-thread-normal"
                        size={16}
                        color={active ? 'var(--main-m1)' : '#ffffff'}
                      />
                      <span
                        className={`min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] ${
                          active ? 'text-white/90' : 'text-white'
                        }`}
                      >
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
