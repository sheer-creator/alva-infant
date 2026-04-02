import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

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
    title: 'Google / X Trends Tracker',
    desc: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.',
    author: 'Sheer YLL YGG',
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

const AVATAR_COLORS: Record<string, string> = {
  'Alva Intern': '#49A3A6',
  'Harry Zzz': '#FF9800',
  'Leo Leo': '#5F75C9',
  'Sheer YLL YGG': '#40A544',
  'Macro Scope X': '#3D8BD1',
  'Smart Jing': '#DC7AA5',
};

/* ---- sub-components ---------------------------------------------------- */

function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.42l-3.52 1.93.67-3.93L2.3 5.64l3.94-.57L8 1.5z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RemixIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M12 2H6.5A2.5 2.5 0 004 4.5V12m0 0l2.5-2.5M4 12l2.5 2.5M4 12h5.5A2.5 2.5 0 0012 9.5V4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FireIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1c0 2.5-2 3.5-2 5.5a3 3 0 006 0c0-1.5-.5-2.5-1-3.5-.5 1-1.5 1.5-1.5 1.5S8.5 3 7 1z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
      <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlaybookCard({ title, desc, author, stars, remixes }: typeof PLAYBOOK_CARDS[0]) {
  const initial = author.charAt(0).toUpperCase();
  const color = AVATAR_COLORS[author] ?? '#838383';

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[12px] cursor-pointer transition-shadow hover:shadow-l"
      style={{
        border: '0.5px solid rgba(0,0,0,0.3)',
        background: 'var(--b0-page, #fff)',
      }}
    >
      {/* Cover placeholder */}
      <div
        className="w-full aspect-[472/265.5] rounded-t-[8px]"
        style={{
          margin: '4px 4px 0 4px',
          width: 'calc(100% - 8px)',
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
          borderRadius: 8,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* Info */}
      <div className="flex flex-col gap-[12px] px-[16px] pt-[16px] pb-[12px]">
        {/* Title + description */}
        <div className="flex flex-col gap-[4px]">
          <p
            className="text-[16px] leading-[26px] tracking-[0.16px] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
          >
            {title}
          </p>
          <p
            className="text-[12px] leading-[20px] tracking-[0.12px] overflow-hidden"
            style={{
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {desc}
          </p>
        </div>

        {/* Creator + stats */}
        <div className="flex items-center gap-[10px]">
          {/* Creator */}
          <div className="flex-1 min-w-0 flex items-center gap-[6px] h-[22px]">
            <div
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0"
              style={{ background: color }}
            >
              {initial}
            </div>
            <span
              className="text-[14px] leading-[22px] tracking-[0.14px] truncate"
              style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
            >
              {author}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-[12px] shrink-0" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            <span className="flex items-center gap-[4px] text-[14px] leading-[22px] tracking-[0.14px]">
              <CdnIcon name="star-l" size={16} />
              {stars}
            </span>
            <span className="flex items-center gap-[4px] text-[14px] leading-[22px] tracking-[0.14px]">
              <CdnIcon name="remix-l" size={16} />
              {remixes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
                  background: 'rgba(0,0,0,0.03)',
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
            {PLAYBOOK_CARDS.map((card) => (
              <PlaybookCard key={card.title} {...card} />
            ))}
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
