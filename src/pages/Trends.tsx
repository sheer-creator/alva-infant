import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import { NVDAGoogleTrendWidget } from '@/widgets/NVDAGoogleTrendWidget';
import { AIStorageKeyWordTrendsWidget } from '@/widgets/AIStorageKeyWordTrendsWidget';
import { DRAMPriceTrendWidget } from '@/widgets/DRAMPriceTrendWidget';

function TrendsContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="sticky top-0 z-10 bg-white px-[24px] shrink-0">
        <Topbar
          title="Google / X Trends Tracker"
          playbookRef="@yggy/google-x-trends-tracker"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div style={{ width: '100%', maxWidth: 2048, margin: '0 auto', padding: '8px 24px 56px' }}>
          <div className="widget-grid">
            <div className="col-4">
              <NVDAGoogleTrendWidget />
            </div>
            <div className="col-4">
              <AIStorageKeyWordTrendsWidget />
            </div>
            <div className="col-8">
              <DRAMPriceTrendWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Trends({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="trends" onNavigate={onNavigate}>
      <TrendsContent />
    </AppShell>
  );
}
