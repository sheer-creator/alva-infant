/**
 * [INPUT]: Notion「Alva Watchlist + Portfolio Daily Digest」doc + KOL「FinTwits · AI Digest」onboarding 案例
 * [OUTPUT]: Portfolio/Watchlist 的 agent onboarding demo — channel header + 两条 Alva Agent 消息 + 标的选择卡（预设篮子 + 资产筛选 + 标的候选 icon/名/SYMBOL/最新价/今日涨跌 + N tickers covered + 时间/语言 + Generate digest）
 * [POS]: Demo 页 — New User 首次进入 Watchlist+Portfolio digest channel 的目标形态参照
 */

import { useMemo, useState } from 'react';

const FONT = "'Delight', sans-serif";

/* ========== 内联线性图标 ========== */

function Ic({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      {children}
    </svg>
  );
}

const P = {
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5 10 17l9-10" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.4" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" /></>,
  x: <path d="M7 7l10 10M17 7 7 17" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
};

/* ========== 数据 ========== */

type AssetClass = 'stocks' | 'etf' | 'crypto' | 'commodities';

interface Ticker {
  symbol: string;
  name: string;
  price: string;
  change: number; // 今日涨跌 %
  asset: AssetClass;
  region: string;
  hue: number; // monogram tile 色相
}

interface Preset {
  id: string;
  name: string;
  desc: string;
  members: string[]; // 标的 symbol
}

const TICKERS: Ticker[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: '$184.20', change: 4.2, asset: 'stocks', region: 'US', hue: 145 },
  { symbol: 'AAPL', name: 'Apple', price: '$232.10', change: 0.8, asset: 'stocks', region: 'US', hue: 210 },
  { symbol: 'MSFT', name: 'Microsoft', price: '$438.60', change: 1.4, asset: 'stocks', region: 'US', hue: 188 },
  { symbol: 'AVGO', name: 'Broadcom', price: '$268.90', change: 2.1, asset: 'stocks', region: 'US', hue: 12 },
  { symbol: 'AMZN', name: 'Amazon', price: '$201.40', change: -0.6, asset: 'stocks', region: 'US', hue: 32 },
  { symbol: 'META', name: 'Meta', price: '$612.30', change: 1.9, asset: 'stocks', region: 'US', hue: 224 },
  { symbol: 'GOOGL', name: 'Alphabet', price: '$178.50', change: -0.3, asset: 'stocks', region: 'US', hue: 4 },
  { symbol: 'TSLA', name: 'Tesla', price: '$248.70', change: 3.4, asset: 'stocks', region: 'US', hue: 350 },
  { symbol: 'TSM', name: 'TSMC', price: '$201.40', change: -0.8, asset: 'stocks', region: 'US', hue: 252 },
  { symbol: 'AMD', name: 'AMD', price: '$162.80', change: 2.7, asset: 'stocks', region: 'US', hue: 96 },
  { symbol: 'BTC', name: 'Bitcoin', price: '$98,420', change: 1.6, asset: 'crypto', region: 'Global', hue: 36 },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,540', change: 2.8, asset: 'crypto', region: 'Global', hue: 230 },
  { symbol: 'SOL', name: 'Solana', price: '$214.30', change: 5.1, asset: 'crypto', region: 'Global', hue: 280 },
  { symbol: 'BNB', name: 'BNB', price: '$642.10', change: -1.2, asset: 'crypto', region: 'Global', hue: 48 },
  { symbol: 'XRP', name: 'XRP', price: '$2.41', change: 3.9, asset: 'crypto', region: 'Global', hue: 200 },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: '$598.20', change: 0.5, asset: 'etf', region: 'US', hue: 168 },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', price: '$512.40', change: 0.9, asset: 'etf', region: 'US', hue: 256 },
  { symbol: 'GLD', name: 'Gold Trust', price: '$248.10', change: -0.4, asset: 'commodities', region: 'Global', hue: 44 },
  { symbol: 'USO', name: 'US Oil Fund', price: '$78.30', change: 1.1, asset: 'commodities', region: 'Global', hue: 20 },
];

const TICKER_MAP = Object.fromEntries(TICKERS.map((t) => [t.symbol, t]));

const PRESETS: Preset[] = [
  {
    id: 'mag7',
    name: 'Mag7',
    desc: 'The seven US mega-cap tech leaders — high awareness, high beta.',
    members: ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 'META', 'TSLA'],
  },
  {
    id: 'crypto-majors',
    name: 'Crypto Majors',
    desc: 'Top digital assets by market cap — weekend coverage included.',
    members: ['BTC', 'ETH', 'SOL', 'BNB', 'XRP'],
  },
];

const ASSET_TABS: { id: AssetClass | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'etf', label: 'ETF' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'commodities', label: 'Commodities' },
];

/* ========== 原子组件 ========== */

function Mono({ symbol, hue, size = 36 }: { symbol: string; hue: number; size?: number }) {
  const initials = symbol.slice(0, 2);
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-medium"
      style={{
        width: size,
        height: size,
        background: `hsl(${hue} 52% 92%)`,
        color: `hsl(${hue} 48% 36%)`,
        fontFamily: FONT,
        fontSize: size * 0.34,
        letterSpacing: '0.2px',
      }}
    >
      {initials}
    </span>
  );
}

function StackedAvatars({ symbols, size = 24 }: { symbols: string[]; size?: number }) {
  return (
    <span className="flex shrink-0 items-center">
      {symbols.slice(0, 4).map((s, i) => {
        const t = TICKER_MAP[s];
        return (
          <span key={s} style={{ marginLeft: i === 0 ? 0 : -size * 0.38, zIndex: 10 - i }} className="rounded-full ring-2 ring-white">
            <Mono symbol={s} hue={t?.hue ?? 200} size={size} />
          </span>
        );
      })}
    </span>
  );
}

function ChangePill({ change }: { change: number }) {
  const up = change >= 0;
  const color = up ? 'var(--main-m3, #2a9b7d)' : 'var(--main-m4, #e05357)';
  return (
    <span className="flex items-center gap-[4px] whitespace-nowrap text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color }}>
      <span className="size-[6px] shrink-0 rounded-full" style={{ background: color }} />
      {up ? '+' : '−'}{Math.abs(change).toFixed(1)}%
    </span>
  );
}

function AlvaMsg({ children }: { children: React.ReactNode }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="flex w-full items-start gap-[12px]">
      <img src={`${base}logo-portrait.svg`} alt="Alva" className="size-[28px] shrink-0 rounded-[4px]" />
      <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Alva Agent</p>
        {children}
      </div>
    </div>
  );
}

function DropPill({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-[32px] items-center gap-[6px] rounded-[6px] bg-white px-[10px] transition-colors hover:bg-[var(--grey-g01,#fafafa)]"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', fontFamily: FONT }}
    >
      {icon && <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{icon}</span>}
      <span className="whitespace-nowrap text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{label}</span>
      <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}><Ic size={14}>{P.chevron}</Ic></span>
    </button>
  );
}

/* ========== 主组件 ========== */

export function PortfolioWatchlistAgentDemo() {
  const [activePreset, setActivePreset] = useState<string>('mag7');
  const [assetTab, setAssetTab] = useState<AssetClass | 'all'>('all');
  const [selected, setSelected] = useState<string[]>(() => [...PRESETS[0].members]);

  const preset = PRESETS.find((p) => p.id === activePreset);

  const candidates = useMemo(() => {
    return TICKERS.filter((t) => (assetTab === 'all' ? true : t.asset === assetTab)).filter((t) => !selected.includes(t.symbol));
  }, [assetTab, selected]);

  // 单独被加入的（不属于当前预设篮子）标的，渲染成独立 chip
  const looseSelected = selected.filter((s) => !preset?.members.includes(s));
  const coveredCount = selected.length;

  const togglePreset = (id: string) => {
    const next = PRESETS.find((p) => p.id === id);
    if (!next) return;
    setActivePreset(id);
    setSelected((prev) => Array.from(new Set([...next.members, ...prev.filter((s) => !PRESETS.some((p) => p.members.includes(s)))])));
  };

  const addTicker = (symbol: string) => setSelected((prev) => (prev.includes(symbol) ? prev : [...prev, symbol]));
  const removeTicker = (symbol: string) => setSelected((prev) => prev.filter((s) => s !== symbol));

  return (
    <div className="flex flex-col gap-[24px]">
      {/* demo 说明 */}
      <div className="flex flex-col gap-[8px]">
        <h2 className="m-0 text-[22px] font-medium leading-[32px] tracking-[0.22px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
          Portfolio / Watchlist — Agent onboarding
        </h2>
        <p className="m-0 max-w-[72ch] text-[14px] leading-[24px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
          New-user first open of the Watchlist + Portfolio digest channel, modeled on the FinTwit digest onboarding. Pick a preset basket or add individual tickers; selection moves into the covered tray below. Generate builds the automation, backfills the last 24h of real data, and sends one sample to your connected accounts.
        </p>
      </div>

      {/* 设备框 */}
      <div
        className="relative w-full overflow-hidden rounded-[12px] bg-white"
        style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', boxShadow: 'var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))' }}
      >
        {/* 顶部 window chrome 暗条 */}
        <div className="h-[36px] w-full" style={{ background: 'var(--b0-sidebar, #2A2A38)' }} />

        <div className="flex">
          {/* 左侧 dark rail（折叠的 app sidebar，与截图一致只露一窄条） */}
          <div className="w-[44px] shrink-0" style={{ background: 'var(--b0-sidebar, #2A2A38)' }} />

          {/* channel 内容 */}
          <div className="flex min-w-0 flex-1 flex-col bg-white">
            {/* Channel header */}
            <div className="flex shrink-0 items-start gap-[12px] px-[28px] py-[18px]" style={{ borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
              <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px]" style={{ background: 'var(--b0-sidebar, #2A2A38)', color: '#fff' }}>
                <Ic size={20}>{P.grid}</Ic>
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[16px] font-medium leading-[24px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  Watchlist + Portfolio · Daily Digest
                </p>
                <p className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                  Tracks your basket of tickers and pushes a daily roundup plus intraday alerts the moment things move.
                </p>
              </div>
              <button
                type="button"
                className="flex h-[34px] shrink-0 items-center justify-center rounded-[6px] px-[16px] text-[13px] font-medium leading-[20px] tracking-[0.13px] transition-colors"
                style={{ fontFamily: FONT, background: 'var(--main-m1-10, rgba(73,163,166,0.1))', color: 'var(--main-m1, #49A3A6)' }}
              >
                Connect
              </button>
              <button
                type="button"
                className="flex size-[34px] shrink-0 items-center justify-center rounded-[6px] bg-transparent transition-colors hover:bg-[var(--grey-g01,#fafafa)]"
                style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n7, rgba(0,0,0,0.7))' }}
                aria-label="Channel settings"
              >
                <Ic size={16}>{P.settings}</Ic>
              </button>
            </div>

            {/* body */}
            <div className="flex flex-col gap-[24px] px-[28px] py-[28px]">
              <AlvaMsg>
                <p className="text-[14px] leading-[24px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  Build your personal Watchlist Digest.
                  <br />
                  Pick the tickers Alva should track. I'll create your Daily Digest automation, run it once on the last 24 hours of real market data, and send the sample to your connected social accounts. Already trading? <span style={{ color: 'var(--main-m1, #49A3A6)' }}>Connect a brokerage</span> and I'll track your real positions instead.
                </p>
              </AlvaMsg>

              <AlvaMsg>
                <p className="text-[14px] leading-[24px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  Choose the tickers you want Alva to track.
                  <br />
                  Start from a preset basket, then add or drop names below. New candidates fill the open spots automatically.
                </p>

                {/* ===== 选择卡 ===== */}
                <div className="mt-[6px] w-full overflow-hidden rounded-[10px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
                  {/* 预设篮子（两列） */}
                  <div className="grid grid-cols-2" style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                    {PRESETS.map((p, i) => {
                      const active = p.id === activePreset;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => togglePreset(p.id)}
                          className="flex items-center gap-[12px] px-[16px] py-[14px] text-left transition-colors"
                          style={{
                            background: active ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : '#fff',
                            borderLeft: i === 1 ? '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' : 'none',
                          }}
                        >
                          <StackedAvatars symbols={p.members} size={26} />
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{p.name}</span>
                            <span className="truncate text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{p.desc}</span>
                          </span>
                          <span
                            className="flex size-[20px] shrink-0 items-center justify-center rounded-full"
                            style={{
                              background: active ? 'var(--main-m1, #49A3A6)' : 'transparent',
                              border: active ? 'none' : '1.5px solid var(--line-l2, rgba(0,0,0,0.2))',
                              color: '#fff',
                            }}
                          >
                            {active && <Ic size={12}>{P.check}</Ic>}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 资产类筛选 */}
                  <div className="flex items-center gap-[6px] px-[16px] pt-[12px]">
                    {ASSET_TABS.map((a) => {
                      const active = a.id === assetTab;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setAssetTab(a.id)}
                          className="rounded-full px-[12px] py-[5px] text-[12px] leading-[18px] tracking-[0.12px] transition-colors"
                          style={{
                            fontFamily: FONT,
                            background: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--grey-g01, #fafafa)',
                            color: active ? '#fff' : 'var(--text-n7, rgba(0,0,0,0.7))',
                            fontWeight: active ? 500 : 400,
                          }}
                        >
                          {a.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* 候选标的网格 */}
                  <div className="grid grid-cols-3 gap-x-[1px] gap-y-[1px] p-[16px]">
                    {candidates.slice(0, 8).map((t) => (
                      <button
                        key={t.symbol}
                        type="button"
                        onClick={() => addTicker(t.symbol)}
                        className="group flex items-center gap-[10px] rounded-[8px] px-[10px] py-[10px] text-left transition-colors hover:bg-[var(--grey-g01,#fafafa)]"
                      >
                        <Mono symbol={t.symbol} hue={t.hue} size={36} />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-[14px] leading-[20px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{t.name}</span>
                          <span className="truncate text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{t.symbol}</span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end">
                          <span className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{t.price}</span>
                          <ChangePill change={t.change} />
                        </span>
                        <span
                          className="flex size-[24px] shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-[var(--main-m1-10,rgba(73,163,166,0.1))]"
                          style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n7, rgba(0,0,0,0.7))' }}
                        >
                          <Ic size={14}>{P.plus}</Ic>
                        </span>
                      </button>
                    ))}
                    {/* Select more */}
                    <button
                      type="button"
                      className="flex items-center gap-[10px] rounded-[8px] px-[10px] py-[10px] text-left transition-colors hover:bg-[var(--grey-g01,#fafafa)]"
                    >
                      <span className="flex size-[36px] shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--grey-g02, #f5f5f5)', color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                        <Ic size={16}>{P.search}</Ic>
                      </span>
                      <span className="text-[14px] leading-[20px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Select more</span>
                    </button>
                  </div>

                  {/* footer：covered + 时间/语言 */}
                  <div className="flex items-center justify-between gap-[12px] px-[16px] pt-[14px]" style={{ borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                    <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      {coveredCount} tickers covered
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <DropPill icon={<Ic size={14}>{P.clock}</Ic>} label="07:30 ET" />
                      <DropPill label="English" />
                    </div>
                  </div>

                  {/* 已选 chips */}
                  <div className="flex flex-wrap gap-[8px] px-[16px] pb-[16px] pt-[12px]">
                    {preset && preset.members.some((m) => selected.includes(m)) && (
                      <span className="flex items-center gap-[6px] rounded-full py-[4px] pl-[5px] pr-[10px]" style={{ background: 'var(--grey-g01, #fafafa)', border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                        <StackedAvatars symbols={preset.members} size={20} />
                        <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{preset.name}</span>
                      </span>
                    )}
                    {looseSelected.map((s) => {
                      const t = TICKER_MAP[s];
                      if (!t) return null;
                      return (
                        <span key={s} className="flex items-center gap-[6px] rounded-full py-[4px] pl-[5px] pr-[8px]" style={{ background: 'var(--grey-g01, #fafafa)', border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                          <Mono symbol={s} hue={t.hue} size={20} />
                          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{s}</span>
                          <button type="button" onClick={() => removeTicker(s)} className="flex size-[16px] items-center justify-center rounded-full bg-transparent" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }} aria-label={`Remove ${s}`}>
                            <Ic size={12}>{P.x}</Ic>
                          </button>
                        </span>
                      );
                    })}
                  </div>

                  {/* Generate */}
                  <div className="flex justify-end px-[16px] pb-[16px]">
                    <button
                      type="button"
                      className="flex h-[40px] items-center justify-center rounded-[8px] px-[20px] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-white transition-opacity hover:opacity-90"
                      style={{ fontFamily: FONT, background: 'var(--main-m1, #49A3A6)' }}
                    >
                      Generate digest
                    </button>
                  </div>
                </div>
              </AlvaMsg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
