import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import thesisHtml from './playbook-thesis.html?raw';

function ThesisContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="sticky top-0 z-10 bg-white px-[24px] shrink-0">
        <Topbar
          title="Defense Thesis Tracker"
          playbookRef="@harryzz/defense-thesis-tracker"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={thesisHtml}
          title="Defense Thesis Tracker"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function Thesis({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="thesis" onNavigate={onNavigate}>
      <ThesisContent />
    </AppShell>
  );
}
