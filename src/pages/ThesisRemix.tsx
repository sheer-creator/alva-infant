import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import remixHtml from './playbook-info-remix.html?raw';

/**
 * Minimal nav-only topbar for the Remix variant.
 * All playbook identity (name, author, status, frequency, description) lives
 * in the Hero card inside the iframe — so this topbar is pure navigation.
 */
function MinimalTopbar({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div
      className="flex h-[48px] shrink-0 items-center justify-between"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}
    >
      <nav
        className="flex items-center gap-[6px] font-['Delight',sans-serif] text-[12px] tracking-[0.12px]"
        style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}
      >
        <button
          type="button"
          className="cursor-pointer bg-transparent border-0 p-0 transition-colors hover:text-[var(--text-n9)]"
          style={{ color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit' }}
          onClick={() => onNavigate('home')}
        >
          Playbooks
        </button>
        <span style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontSize: 10 }}>›</span>
        <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Thesis</span>
        <span style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontSize: 10 }}>›</span>
        <span style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Defense Thesis Tracker</span>
      </nav>
      <div className="flex items-center gap-[12px]">
        <div
          className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full text-[11px] font-medium text-white"
          style={{ background: '#49A3A6' }}
        >
          A
        </div>
      </div>
    </div>
  );
}

function ThesisRemixContent({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="sticky top-0 z-10 bg-white px-[24px] shrink-0">
        <MinimalTopbar onNavigate={onNavigate} />
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={remixHtml}
          title="Playbook Info Remix — Defense Thesis Tracker"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function ThesisRemix({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="thesis-remix" onNavigate={onNavigate}>
      <ThesisRemixContent onNavigate={onNavigate} />
    </AppShell>
  );
}
