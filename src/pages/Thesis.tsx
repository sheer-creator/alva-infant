import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import thesisHtml from './playbook-thesis.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(thesisHtml);

function ThesisContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={html}
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
