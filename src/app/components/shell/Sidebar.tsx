import type { Page } from '../../App';
import { CdnIcon } from '../shared/CdnIcon';
import { Avatar } from '../shared/Avatar';
import type { ThreadsEntryMode } from '@/lib/chat-config';
import { CONVERSATIONS } from '@/lib/chat-config';

const THREADS_RAIL_W = 256;
const SIDEBAR_BG = 'var(--b0-sidebar)';

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
  onUserMouseEnter?: () => void;
}

const NAV_ITEMS: { label: string; page?: Page; icon: string; badge?: number }[] = [
  { label: 'Explore', page: 'explore', icon: 'sidebar-discover-normal' },
  { label: 'Portfolio', icon: 'sidebar-portfolio-normal' },
  { label: 'Agent', page: 'agent', icon: 'sidebar-agent-normal' },
  { label: 'Alva Skill', icon: 'sidebar-skills-normal' },
];

const STARRED: { label: string; page?: Page }[] = [
  { label: 'Template-Screener', page: 'template-screener' },
  { label: 'Template-Thesis', page: 'template-thesis' },
  { label: 'Template-Whatif', page: 'template-whatif' },
  { label: 'Template-Notification', page: 'template-notification' },
];

const MY_PLAYBOOKS: { label: string; page?: Page }[] = [
  { label: 'Feed Test', page: 'screener' },
];

export function Sidebar({
  activePage,
  onNavigate,
  onChatToggle,
  threadsEntryMode = '1',
  threadsRailOpen = false,
  onToggleThreadsRail,
  sidebarCompact = false,
  primaryWidth,
  activeConversationId,
  onUserMouseEnter,
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
        style={{ width: primaryWidth, background: SIDEBAR_BG }}
      >
        {/* Header / Logo */}
        {threadsEntryMode === '2' ? (
          <div className="flex shrink-0 items-center justify-between px-[8px] py-[12px]">
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
              <div className="flex items-center justify-center p-[2px] opacity-90">
                <CdnIcon name="sidebar-onoff" size={16} />
              </div>
            </div>
          </div>
        ) : (
          !sidebarCompact && (
            <div className="flex shrink-0 items-center justify-between px-[8px] py-[12px]">
              <img
                src={logoSrc}
                alt="Alva"
                className="h-[14px] w-auto max-w-[160px] object-contain object-left"
              />
              <div className="flex items-center justify-center p-[2px] opacity-90">
                <CdnIcon name="sidebar-onoff" size={16} />
              </div>
            </div>
          )
        )}

        {sidebarCompact && (
          <div className="flex items-center justify-between px-[8px] pb-[8px] pt-[4px]">
            <img src={logoSrc} alt="" className="h-[12px] w-auto opacity-90" />
            <div className="flex items-center justify-center p-[2px] opacity-90">
              <CdnIcon name="sidebar-onoff" size={16} />
            </div>
          </div>
        )}

        {/* New Chat button — replaces Home */}
        <div className="shrink-0 p-[8px]">
          <button
            type="button"
            className="flex h-[32px] w-full cursor-pointer items-center justify-center gap-[6px] rounded-[4px] border-[0.5px] border-solid border-white/30 bg-transparent px-[16px] py-[6px] transition-colors hover:bg-white/[0.04]"
            onClick={() => {
              const focusHomeInput = () => {
                const input = document.querySelector<HTMLElement>(
                  '[contenteditable], textarea, input[type="text"], .ProseMirror'
                );
                if (input) {
                  input.focus();
                } else {
                  document.querySelector<HTMLElement>('[placeholder]')?.focus();
                }
              };
              if (activePage === 'home') {
                focusHomeInput();
              } else {
                onNavigate('home');
                // focus after the home page renders
                setTimeout(focusHomeInput, 0);
              }
            }}
          >
            <CdnIcon name="add-l2" size={14} color="#ffffff" />
            {!sidebarCompact && (
              <span className="font-['Delight',sans-serif] text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white">
                New Chat
              </span>
            )}
          </button>
        </div>

        {/* Nav items */}
        <div className="py-[4px]">
          {NAV_ITEMS.map(item => {
            const active = item.page === activePage;
            return (
              <div
                key={item.label}
                title={sidebarCompact ? item.label : undefined}
                className={`flex h-[36px] cursor-pointer items-center gap-[8px] overflow-hidden rounded-[4px] px-[8px] py-[4px] transition-colors ${
                  active ? 'bg-white/5' : 'hover:bg-white/5'
                } ${sidebarCompact ? 'justify-center' : ''}`}
                onClick={() => item.page && onNavigate(item.page)}
              >
                <CdnIcon name={item.icon} size={16} color="#ffffff" />
                {!sidebarCompact && (
                  <>
                    <span className="min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] text-white">
                      {item.label}
                    </span>
                    {item.badge && item.badge > 0 && (
                      <span
                        className="shrink-0 font-['Delight',sans-serif] text-[10px] font-medium leading-[16px] text-white"
                        style={{ background: 'var(--main-m1)', borderRadius: 999, padding: '0 6px' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Starred + My Playbooks — items kept unchanged */}
        {(['Starred', 'My Playbooks'] as const).map(section => {
          const items = section === 'Starred' ? STARRED : MY_PLAYBOOKS;
          return (
            <div key={section} className="py-[4px]">
              {!sidebarCompact && (
                <div className="flex h-[36px] items-center px-[8px] py-[4px] font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-white/50">
                  {section}
                </div>
              )}
              {items.map(item => (
                <div
                  key={item.label}
                  title={sidebarCompact ? item.label : undefined}
                  className={`flex h-[36px] cursor-pointer items-center gap-[8px] overflow-hidden rounded-[4px] px-[8px] py-[4px] font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] text-white transition-colors ${
                    item.page === activePage ? 'bg-white/5' : 'hover:bg-white/5'
                  } ${sidebarCompact ? 'justify-center text-[10px]' : ''}`}
                  onClick={() => {
                    if (item.page) {
                      if (onChatToggle) sessionStorage.setItem('openChatWithThread', 'demo');
                      onNavigate(item.page);
                    }
                  }}
                >
                  {!sidebarCompact && (
                    <CdnIcon name="sidebar-dashboard-normal" size={16} color="#ffffff" />
                  )}
                  <span className="min-w-0 flex-1 truncate">
                    {sidebarCompact ? '▸' : item.label}
                  </span>
                </div>
              ))}
            </div>
          );
        })}

        <div className="min-h-0 flex-1" />

        {/* Upgrade to Pro card */}
        {!sidebarCompact && (
          <div className="shrink-0 p-[8px]">
            <div
              className="relative isolate flex items-start gap-[8px] overflow-hidden rounded-[4px] border-[0.5px] border-solid border-white/[0.12] pb-[8px] pl-[10px] pr-[8px] pt-[6px]"
              style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            >
              <div className="relative z-[3] flex shrink-0 items-center pt-[4px]">
                <div
                  className="flex h-[20px] w-[20px] items-center justify-center rounded-[4px]"
                  style={{ background: 'rgba(42, 155, 125, 0.2)' }}
                >
                  <CdnIcon name="arrow-up-f1" size={14} color="var(--main-m3)" />
                </div>
              </div>
              <div className="relative z-[2] flex min-w-0 flex-1 flex-col">
                <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-white">
                  Upgrade to Pro
                </p>
                <p className="font-['Delight',sans-serif] text-[10px] leading-[16px] tracking-[0.1px] text-white/50">
                  Unlock unlimited playbooks
                  <br />
                  with 7-day free trial
                </p>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute right-[-46.5px] top-[-47.5px] z-[1] h-[93px] w-[93px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(42, 155, 125, 0.45) 0%, rgba(42, 155, 125, 0) 70%)',
                }}
              />
            </div>
          </div>
        )}

        {/* User profile */}
        <div
          data-userinfo-trigger
          className="flex shrink-0 cursor-pointer items-center gap-[8px] rounded-[4px] p-[8px] transition-colors hover:bg-white/5"
          onMouseEnter={onUserMouseEnter}
        >
          <Avatar name="YGGYLL" size={24} />
          {!sidebarCompact && (
            <span className="font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] text-white">
              YGGYLL
            </span>
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
            background: SIDEBAR_BG,
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
