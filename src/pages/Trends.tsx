import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import { ChatPanel } from '@/app/components/chat/ChatPanel';
import { NVDAGoogleTrendWidget } from '@/widgets/NVDAGoogleTrendWidget';
import { AIStorageKeyWordTrendsWidget } from '@/widgets/AIStorageKeyWordTrendsWidget';
import { DRAMPriceTrendWidget } from '@/widgets/DRAMPriceTrendWidget';

export default function Trends({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <AppShell activePage="trends" onNavigate={onNavigate}>
      <div className="h-screen flex" style={{ background: 'var(--b0-page)' }}>
        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="sticky top-0 z-10 bg-white px-[24px] shrink-0">
            <Topbar title="Google / X Trends Tracker" onChatToggle={() => setChatOpen(v => !v)} />
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

        {/* Chat panel */}
        {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
      </div>
    </AppShell>
  );
}
