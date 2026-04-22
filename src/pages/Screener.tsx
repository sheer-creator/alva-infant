import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import screenerHtml from './playbook-screener.html?raw';

function ScreenerContent({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="sticky top-0 z-10 bg-white px-[24px] shrink-0">
        <Topbar
          title="Quality Value Stock Screener 1"
          playbookRef="@harryzz/quality-value-screener"
          onNavigate={onNavigate}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={screenerHtml}
          title="Quality Value Stock Screener 1"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function Screener({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="screener" onNavigate={onNavigate}>
      <ScreenerContent onNavigate={onNavigate} />
    </AppShell>
  );
}
