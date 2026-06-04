import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';

/* ---- mock data --------------------------------------------------------- */
const PLAYBOOK_CARDS = [
  {
    title: 'BTC Ultimate AI Trader',
    desc: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts.",
    author: 'Alva Intern',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'MAG7 Equal-Weight Monthly Rebalance',
    desc: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly.',
    author: 'Harry Zzz',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'PEPE Long vs BTC Short Monthly Rebalance',
    desc: 'The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.',
    author: 'Leo Leo',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'Attribution Analysis Strategy for Price Trends',
    desc: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.',
    author: 'Sheer YLL YGG',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'BTC MACD 1h Simple Crossover',
    desc: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    author: 'Macro Scope X',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'NVDA +3% Triggered TSM TP/SL',
    desc: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
    author: 'Smart Jing',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'ETH Daily Price & Change Tracker',
    desc: 'Tracks daily prices and daily percentage changes for ETH in a single table for quick monitoring.',
    author: 'Alva Intern',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'Short-Squeeze Risk Map',
    desc: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts.",
    author: 'Alva Intern',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'NVDA Trading Strategy Research Dashboard',
    desc: 'Multi-timeframe NVDA price/volume context, trend & momentum, relative strength vs market/sector, flow/derivatives proxies, earnings/event stats.',
    author: 'Harry Zzz',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'US Crypto DAT Companies Monitor',
    desc: 'Feed incorporates both real anomaly signals and reference cases for interpretation. Update frequencies adjusted as new PTR, Form 4, and 10b5-1 filings are parsed.',
    author: 'Macro Scope X',
    stars: '12.8K',
    remixes: 3,
  },
  {
    title: 'QQQ +2% Day Triggers NVDA Take-Profit',
    desc: 'Aggregates real-time data across multiple DEX platforms to identify high-potential Golden Dog meme tokens. Alerts are triggered on sudden volume spikes, KOL mentions, or on-chain activity.',
    author: 'Smart Jing',
    stars: '12.8K',
    remixes: 3,
  },
];

/* ---- page content ------------------------------------------------------ */

function ExploreContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-y-auto">
        <div className="w-full flex flex-col items-center gap-[20px] pt-[28px] pb-[40px] px-[28px]">
          {/* Tab bar */}
          <div className="w-full" style={{ maxWidth: 1600 }}>
            <div className="flex items-center justify-center gap-[12px] h-[34px]" style={{ maxWidth: 1200, margin: '0 auto' }}>
              <button
                className="h-[34px] px-[16px] py-[6px] rounded-[6px] text-[14px] font-medium leading-[22px] tracking-[0.14px]"
                style={{
                  background: 'rgba(73,163,166,0.2)',
                  color: 'var(--text-n9, rgba(0,0,0,0.9))',
                }}
              >
                Trending
              </button>
              <button
                className="h-[34px] px-[16px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px]"
                style={{
                  background: 'var(--b-r03)',
                  color: 'var(--text-n7, rgba(0,0,0,0.7))',
                }}
              >
                Featured
              </button>
            </div>
          </div>

          {/* Card grid */}
          <div
            className="w-full grid gap-[24px]"
            style={{
              maxWidth: 1600,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {PLAYBOOK_CARDS.map((card, i) => {
              const p: ExplorePlaybook = {
                id: String(i),
                creator: card.author,
                title: card.title,
                description: card.desc,
                tickers: [],
                pulse: 'idle',
                stars: 0,
                remixes: card.remixes,
                cover: { template: 'general', title: card.title, author: card.author, tickers: [] },
              };
              return <PlaybookCard key={card.title} p={p} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- export ------------------------------------------------------------ */

export default function Explore({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="explore" onNavigate={onNavigate}>
      <ExploreContent />
    </AppShell>
  );
}
