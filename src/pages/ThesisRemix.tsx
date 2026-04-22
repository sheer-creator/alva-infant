import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import remixHtml from './playbook-info-remix.html?raw';

function ThesisRemixContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
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
      <ThesisRemixContent />
    </AppShell>
  );
}
