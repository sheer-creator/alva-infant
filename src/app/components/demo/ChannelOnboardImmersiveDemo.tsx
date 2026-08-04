/**
 * [INPUT]: 通用卡框架定稿(~/Downloads/automation-onboard-universal.html 实例1)+ e2e-trading spec 口径(每 2h 轮询 / materiality gate / quiet run)+ 真实推送素材(GOOGL/AAPL/NVDA,Jul 31–Aug 1)
 * [OUTPUT]: Channel onboard demo — hook 与配置合一的通用 automation 卡(Portfolio Watch 实例):动效 Hero(真实推送流出 + quiet run 胶囊)+ tag 化简化设置 + 承诺句 + CTA → 回执卡。无全屏层(流程型操作留给轻浮层,demo 不实现)。
 * [POS]: Demo 页 — Draft Lite onboard 流的改进原型;卡结构可复用到 Alpha Radar / Screener(换 Hero 内容与设置 tags)
 */

import { useEffect, useRef, useState } from 'react';

const FONT = "'Delight', sans-serif";
const BASE = import.meta.env.BASE_URL;

/* ========== 内联线性图标 ========== */

function Ic({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      {children}
    </svg>
  );
}

const P = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5 10 17l9-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
};

/* ========== 数据 ========== */

interface Ticker {
  symbol: string;
  name: string;
  hue: number;
}

const TICKERS: Ticker[] = [
  { symbol: 'NVDA', name: 'NVIDIA', hue: 145 },
  { symbol: 'AAPL', name: 'Apple', hue: 210 },
  { symbol: 'TSLA', name: 'Tesla', hue: 350 },
  { symbol: 'META', name: 'Meta', hue: 224 },
  { symbol: 'BTC', name: 'Bitcoin', hue: 36 },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', hue: 256 },
];

const TICKER_MAP = Object.fromEntries(TICKERS.map((t) => [t.symbol, t]));

const LANGS = ['English', '中文'];

interface Entry {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  wired?: boolean;
}

// 引导文案按 spec 统一「每 2 小时」口径(稿内 hourly 为旧稿)
const ENTRIES: Entry[] = [
  {
    id: 'portfolio',
    emoji: '💼',
    title: 'Watch your portfolio 24/7',
    desc: "I'll check it every 2 hours and message you only when a move, risk, catalyst, or breaking story is worth your attention.",
    wired: true,
  },
  {
    id: 'x-news',
    emoji: '📣',
    title: 'Track X, news & technicals for alpha',
    desc: "I'll scan the X voices you pick, market news, and chart setups, then send you a fresh digest of signals where the evidence lines up.",
  },
  {
    id: 'ticker-read',
    emoji: '📊',
    title: 'Get a quick read on any ticker',
    desc: "Name a stock or coin — I'll read the tape: current setup, key levels, what breaks it, and near-term catalysts. Short, sourced, no buy/sell calls.",
  },
  {
    id: 'screener',
    emoji: '🔍',
    title: 'Screen the market on your rules',
    desc: "Set your criteria once — momentum, insider buying, deep value, anything. I'll watch the market and message you only when new names qualify.",
  },
  {
    id: 'byo',
    emoji: '⚙️',
    title: 'Build your own automations',
    desc: "Tell me what you want Alva to monitor and when it should run. I'll help shape it into a reliable automation.",
  },
];

/** Hero 舞台的循环素材:三条真实推送(标题一律 Portfolio Watch,正文即原文,不编标题) */
interface StageMsg {
  id: string;
  symbol: string; // monogram 两字母
  hue: number;
  time: string;
  tag?: string;
  body: string;
  src: string;
}

const STAGE_MSGS: StageMsg[] = [
  {
    id: 'm0',
    symbol: 'GO',
    hue: 4,
    time: 'Jul 31, 11:26 PM',
    body: 'GOOGL rose 4.8% versus the prior close in a new, largely name-specific move. The read is delayed follow-through from strong Q2 results, higher Q3 sales expectations and post-earnings target revisions…',
    src: 'Alphabet target revision',
  },
  {
    id: 'm1',
    symbol: 'AA',
    hue: 210,
    time: 'Aug 1, 1:26 AM',
    body: 'AAPL: The post-earnings reset has deepened to −9.6% versus the prior close on 2.44x same-time volume. The confirmed driver remains weak forward guidance and supply and memory-cost constraints…',
    src: 'Business Insider',
  },
  {
    id: 'm2',
    symbol: 'NV',
    hue: 145,
    time: 'Aug 1, 5:27 PM',
    tag: 'news',
    body: 'NVDA: Bloomberg-reported Moonshot access to roughly 20,000 Nvidia chips through an Alibaba computing arrangement is a concrete China AI-demand datapoint, although it does not establish incremental Nvidia revenue…',
    src: '𝕏 FinancialJuice',
  },
];

/** 舞台循环序列:alert → quiet 胶囊 → alert →… */
const STAGE_SEQ = ['m0', 'q', 'm1', 'q', 'm2', 'q'] as const;

/* ========== 原子组件 ========== */

function Mono({ symbol, hue, size = 24 }: { symbol: string; hue: number; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-medium"
      style={{
        width: size,
        height: size,
        background: `hsl(${hue} 52% 92%)`,
        color: `hsl(${hue} 48% 36%)`,
        fontFamily: FONT,
        fontSize: size * 0.36,
        letterSpacing: '0.2px',
      }}
    >
      {symbol.slice(0, 2)}
    </span>
  );
}

function AlvaMsg({ children, anim }: { children: React.ReactNode; anim?: boolean }) {
  return (
    <div className="flex w-full items-start gap-[12px]" style={anim ? { animation: 'cob-in 0.45s cubic-bezier(0.22,0.61,0.36,1) both' } : undefined}>
      <img src={`${BASE}logo-portrait.svg`} alt="Alva" className="size-[28px] shrink-0 rounded-[4px]" />
      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <p className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
          Alva <span className="ml-[4px] text-[12px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>10:28 PM</span>
        </p>
        {children}
      </div>
    </div>
  );
}

/** tag 化选择器(26px 小 tag,替代大块 UI) */
function PickTag({ on, ghost, onClick, disabled, children }: { on?: boolean; ghost?: boolean; onClick?: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[26px] items-center gap-[4px] rounded-full px-[10px] text-[12px] leading-[17px] tracking-[0.12px] transition-colors"
      style={{
        fontFamily: FONT,
        border: on ? '1px solid var(--main-m1, #49A3A6)' : '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        borderStyle: ghost ? 'dashed' : 'solid',
        background: on ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : '#fff',
        color: on ? 'var(--text-n9, rgba(0,0,0,0.9))' : ghost ? 'var(--text-n5, rgba(0,0,0,0.5))' : 'var(--text-n7, rgba(0,0,0,0.7))',
        fontWeight: on ? 500 : 400,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

/* ========== 主组件 ========== */

type Stage = 'intro' | 'hook' | 'done';

export function ChannelOnboardImmersiveDemo() {
  const [stage, setStage] = useState<Stage>('intro');
  const [typing, setTyping] = useState(false);
  const [hookShown, setHookShown] = useState(false);
  const [doneShown, setDoneShown] = useState(false);

  // 卡内简化设置
  const [selected, setSelected] = useState<string[]>(['NVDA', 'AAPL']);
  const [lang, setLang] = useState('English');

  // Hero 舞台循环
  const [seqIdx, setSeqIdx] = useState(0);
  const [leavingId, setLeavingId] = useState<string | null>(null);

  const hookRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // hook 消息出现后:滚到消息「顶部」(不是滚底,保证 Hero 整块可见)
  useEffect(() => {
    if (hookShown) hookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hookShown]);
  useEffect(() => {
    if (doneShown) doneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [doneShown]);

  // 舞台循环:alert 停 4s → quiet 胶囊 1.5s → 下一条
  useEffect(() => {
    if (!hookShown) return;
    const curId = STAGE_SEQ[seqIdx];
    const hold = curId === 'q' ? 1500 : 4000;
    const t = window.setTimeout(() => {
      setLeavingId(curId);
      setSeqIdx((p) => (p + 1) % STAGE_SEQ.length);
    }, hold);
    return () => window.clearTimeout(t);
  }, [seqIdx, hookShown]);

  const activeId = STAGE_SEQ[seqIdx];

  const clickPortfolio = () => {
    if (stage !== 'intro') return;
    setStage('hook');
    setTyping(true);
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false);
        setHookShown(true);
      }, 1000),
    );
  };

  const startWatching = () => {
    if (stage !== 'hook' || selected.length === 0) return;
    setStage('done');
    timers.current.push(window.setTimeout(() => setDoneShown(true), 350));
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStage('intro');
    setTyping(false);
    setHookShown(false);
    setDoneShown(false);
    setSelected(['NVDA', 'AAPL']);
    setLang('English');
    setSeqIdx(0);
    setLeavingId(null);
  };

  const toggleTicker = (symbol: string) =>
    setSelected((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]));

  const count = selected.length;
  const configLocked = stage === 'done';

  return (
    <div className="flex flex-col gap-[24px]">
      <style>{`
        @keyframes cob-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes cob-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cob-dot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.35; } 30% { transform: translateY(-3px); opacity: 1; } }
        @keyframes cob-breathe { 0%, 100% { box-shadow: 0 0 0 0 rgba(73,163,166,0.35); } 50% { box-shadow: 0 0 0 5px rgba(73,163,166,0); } }
        .cob-msg { position: absolute; left: 0; right: 0; top: 0; opacity: 0; transform: translateY(26px) scale(0.985); transition: opacity 0.5s cubic-bezier(0.22,0.61,0.36,1), transform 0.5s cubic-bezier(0.22,0.61,0.36,1); pointer-events: none; }
        .cob-msg.cob-on { opacity: 1; transform: none; }
        .cob-msg.cob-off { opacity: 0; transform: translateY(-18px) scale(0.97); }
        .cob-quiet { position: absolute; left: 50%; top: 42%; opacity: 0; transform: translate(-50%, 12px); transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,0.61,0.36,1); pointer-events: none; }
        .cob-quiet.cob-on { opacity: 1; transform: translate(-50%, 0); }
        .cob-quiet.cob-off { opacity: 0; transform: translate(-50%, -10px); }
      `}</style>

      {/* ===== demo 说明 ===== */}
      <div className="flex flex-wrap items-start justify-between gap-[16px]">
        <div className="flex min-w-[280px] flex-1 flex-col gap-[8px]">
          <h2 className="m-0 text-[22px] font-medium leading-[32px] tracking-[0.22px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
            Channel Onboard — Universal Automation Card
          </h2>
          <p className="m-0 max-w-[76ch] text-[14px] leading-[24px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
            Hook and config merged into one card (Portfolio Watch instance): an animated hero streams the automation's real alerts with a quiet-run pill in between — the check → silence → speak-up loop plays itself; below it, setup is compressed to tag pickers and one-line links, so the full-screen layer is gone (flow-type actions like broker OAuth stay in a small dialog). Cadence follows the spec: every 2 hours, quiet runs send nothing.
          </p>
          <p className="m-0 text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
            Try: click “Watch your portfolio 24/7” → toggle ticker tags → Start watching. Only the Portfolio path is wired.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex h-[32px] shrink-0 items-center gap-[6px] rounded-[6px] bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--grey-g01,#fafafa)]"
          style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT, cursor: 'pointer' }}
        >
          Reset demo
        </button>
      </div>

      {/* ===== 设备框 ===== */}
      <div
        className="relative w-full overflow-hidden rounded-[12px] bg-white"
        style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', boxShadow: 'var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))' }}
      >
        <div className="h-[36px] w-full" style={{ background: 'var(--b0-sidebar, #2A2A38)' }} />
        <div className="flex">
          <div className="w-[44px] shrink-0" style={{ background: 'var(--b0-sidebar, #2A2A38)' }} />

          <div className="flex min-w-0 flex-1 flex-col bg-white">
            {/* Channel header */}
            <div className="flex shrink-0 items-center gap-[12px] px-[28px] py-[14px]" style={{ borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
              <img src={`${BASE}logo-portrait.svg`} alt="Alva" className="size-[36px] shrink-0 rounded-[8px]" />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[15px] font-medium leading-[22px] tracking-[0.15px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva</p>
                <p className="truncate text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                  Your AI investing agent. Ask me to research markets, build live Playbooks, or set up automations that watch the market for you.
                </p>
              </div>
              <button
                type="button"
                className="flex size-[32px] shrink-0 items-center justify-center rounded-[6px] bg-transparent transition-colors hover:bg-[var(--grey-g01,#fafafa)]"
                style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n7, rgba(0,0,0,0.7))', cursor: 'pointer' }}
                aria-label="Channel settings"
              >
                <Ic size={15}>{P.settings}</Ic>
              </button>
            </div>

            {/* chat 流(固定高度,演示滚动策略) */}
            <div className="flex h-[640px] flex-col gap-[24px] overflow-y-auto px-[28px] py-[24px]">
              {/* — 消息 1:开场 + 五入口 — */}
              <AlvaMsg>
                <p className="text-[14px] leading-[24px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  Hey, I'm Alva, your AI investing agent.
                  <br />
                  Ask me for market research, or set up live automations to watch your portfolio, tickers, and market voices. Pick what you want me to help with first.
                </p>
                <div className="w-full overflow-hidden rounded-[10px]" style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                  {ENTRIES.map((entry, i) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={entry.wired ? clickPortfolio : undefined}
                      title={entry.wired ? undefined : 'This demo wires up the Portfolio path only'}
                      className="group flex w-full items-center gap-[12px] px-[16px] py-[13px] text-left transition-colors"
                      style={{
                        borderTop: i === 0 ? 'none' : '0.5px solid var(--line-l07, rgba(0,0,0,0.07))',
                        background: '#fff',
                        cursor: entry.wired && stage === 'intro' ? 'pointer' : 'default',
                        opacity: entry.wired ? 1 : 0.45,
                      }}
                      onMouseEnter={(e) => {
                        if (entry.wired && stage === 'intro') e.currentTarget.style.background = 'var(--grey-g01, #fafafa)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                      }}
                      disabled={!entry.wired}
                    >
                      <span className="shrink-0 text-[15px] leading-none">{entry.emoji}</span>
                      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
                        <span className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                          {entry.title}
                        </span>
                        <span className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                          {entry.desc}
                        </span>
                      </span>
                      <span className="shrink-0 transition-transform group-hover:translate-x-[2px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>
                        <Ic size={15}>{P.arrowRight}</Ic>
                      </span>
                    </button>
                  ))}
                </div>
              </AlvaMsg>

              {/* — 用户气泡 — */}
              {stage !== 'intro' && (
                <div className="flex justify-end" style={{ animation: 'cob-in 0.35s cubic-bezier(0.22,0.61,0.36,1) both' }}>
                  <p
                    className="max-w-[70%] rounded-[10px] px-[16px] py-[10px] text-[14px] leading-[22px] tracking-[0.14px]"
                    style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))', background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}
                  >
                    Set up portfolio watch automation for me
                  </p>
                </div>
              )}

              {/* — typing — */}
              {typing && (
                <div className="flex items-start gap-[12px]" style={{ animation: 'cob-fade 0.25s ease both' }}>
                  <img src={`${BASE}logo-portrait.svg`} alt="" className="size-[28px] shrink-0 rounded-[4px]" />
                  <span className="flex h-[28px] items-center gap-[4px]">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-[6px] rounded-full"
                        style={{ background: 'var(--text-n3, rgba(0,0,0,0.3))', animation: `cob-dot 1.1s ${i * 0.18}s ease-in-out infinite` }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {/* — 消息 2:通用配置卡(动效 Hero + tag 设置 + CTA) — */}
              {hookShown && (
                <div ref={hookRef} style={{ scrollMarginTop: '8px' }}>
                  <AlvaMsg anim>
                    <p className="text-[14px] leading-[24px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      This is Portfolio Watch running live — real alerts from the official automation. Pick what I should watch and start it right here:
                    </p>

                    <div
                      className="flex w-full max-w-[600px] flex-col rounded-[14px] p-[12px]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(73,163,166,0.07), rgba(73,163,166,0.02) 45%, var(--grey-g01, #fafafa) 100%)',
                        border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))',
                      }}
                    >
                      {/* Hero 舞台:真实推送流出 + quiet 胶囊 */}
                      <div
                        className="overflow-hidden rounded-[10px] px-[14px] pb-[16px] pt-[14px]"
                        style={{
                          border: '0.5px solid rgba(0,0,0,0.08)',
                          background:
                            'radial-gradient(rgba(42,42,56,0.05) 1px, transparent 1.2px) 0 0 / 14px 14px, linear-gradient(135deg, rgba(73,163,166,0.12), rgba(73,163,166,0.04) 50%, #f7f8f9 100%)',
                        }}
                      >
                        <div className="flex items-center gap-[7px]">
                          <span className="size-[7px] shrink-0 rounded-full" style={{ background: 'var(--main-m1, #49A3A6)', animation: 'cob-breathe 2.2s ease-in-out infinite' }} />
                          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                            portfolio-watch-automation
                          </span>
                          <span className="ml-auto text-[10.5px] font-medium leading-[15px] tracking-[0.4px]" style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)' }}>LIVE</span>
                        </div>
                        <div className="relative mt-[12px] h-[134px]">
                          {STAGE_MSGS.map((m) => (
                            <div
                              key={m.id}
                              className={`cob-msg rounded-[10px] bg-white px-[13px] py-[10px] ${m.id === activeId ? 'cob-on' : m.id === leavingId ? 'cob-off' : ''}`}
                              style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', boxShadow: '0 8px 22px rgba(20,30,40,0.07)' }}
                            >
                              <div className="flex items-center gap-[8px]">
                                <Mono symbol={m.symbol} hue={m.hue} size={20} />
                                <span className="min-w-0 flex-1 truncate text-[13px] font-medium leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                                  Portfolio Watch
                                </span>
                                {m.tag && (
                                  <span className="shrink-0 rounded-[4px] px-[5px] text-[10px] leading-[15px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))', border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                                    {m.tag}
                                  </span>
                                )}
                                <span className="shrink-0 text-[11px] leading-[16px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>{m.time}</span>
                              </div>
                              <p className="mt-[4px] line-clamp-2 text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>
                                {m.body}
                              </p>
                              <p className="mt-[4px] text-[11px] leading-[16px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>{m.src}</p>
                            </div>
                          ))}
                          <span
                            className={`cob-quiet flex items-center gap-[6px] rounded-full px-[12px] py-[5px] text-[11.5px] leading-[17px] ${activeId === 'q' ? 'cob-on' : leavingId === 'q' ? 'cob-off' : ''}`}
                            style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))', background: 'rgba(255,255,255,0.92)', border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', whiteSpace: 'nowrap' }}
                          >
                            <span className="size-[6px] shrink-0 rounded-full" style={{ background: 'var(--grey-g1, #dedede)' }} />
                            quiet run — nothing material · no message
                          </span>
                        </div>
                      </div>

                      {/* 简化设置区:tag 选择器 */}
                      <div className="mt-[12px] flex flex-col gap-[10px]" style={{ opacity: configLocked ? 0.55 : 1, pointerEvents: configLocked ? 'none' : undefined }}>
                        <div className="flex items-start gap-[10px]">
                          <span className="w-[60px] shrink-0 pt-[5px] text-[11.5px] leading-[17px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Watch</span>
                          <div className="flex min-w-0 flex-1 flex-wrap gap-[6px]">
                            {TICKERS.map((t) => {
                              const on = selected.includes(t.symbol);
                              return (
                                <PickTag key={t.symbol} on={on} onClick={() => toggleTicker(t.symbol)}>
                                  {t.symbol}
                                  <span style={{ color: on ? 'var(--main-m1, #49A3A6)' : 'var(--text-n3, rgba(0,0,0,0.3))' }}>
                                    <Ic size={11}>{on ? P.check : P.plus}</Ic>
                                  </span>
                                </PickTag>
                              );
                            })}
                            <PickTag ghost>
                              <Ic size={12}>{P.search}</Ic>
                              Search…
                            </PickTag>
                          </div>
                        </div>
                        <div className="flex items-start gap-[10px]">
                          <span className="w-[60px] shrink-0" />
                          <p className="text-[11.5px] leading-[17px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                            or <span className="cursor-pointer" style={{ color: 'var(--main-m1, #49A3A6)' }}>connect a broker</span> · <span className="cursor-pointer" style={{ color: 'var(--main-m1, #49A3A6)' }}>upload a screenshot</span> — opens a small dialog, not a full page
                          </p>
                        </div>
                        <div className="flex items-start gap-[10px]">
                          <span className="w-[60px] shrink-0 pt-[5px] text-[11.5px] leading-[17px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Language</span>
                          <div className="flex min-w-0 flex-1 flex-wrap gap-[6px]">
                            {LANGS.map((l) => {
                              const on = lang === l;
                              return (
                                <PickTag key={l} on={on} onClick={() => setLang(l)}>
                                  {l}
                                  {on && (
                                    <span style={{ color: 'var(--main-m1, #49A3A6)' }}>
                                      <Ic size={11}>{P.check}</Ic>
                                    </span>
                                  )}
                                </PickTag>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* 承诺句 + CTA */}
                      <p className="mt-[12px] px-[2px] text-[12.5px] leading-[19px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>
                        Checks your holdings <span className="font-medium" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>every 2 hours</span> across price, risk, catalysts & news — <span className="font-medium" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>quiet runs send nothing</span>.
                      </p>
                      <div className="mt-[10px] flex flex-wrap items-center gap-[12px]">
                        <button
                          type="button"
                          onClick={startWatching}
                          disabled={configLocked || count === 0}
                          className="flex h-[38px] items-center gap-[8px] rounded-[8px] px-[18px] text-[13.5px] font-medium leading-[20px] tracking-[0.13px] transition-opacity hover:opacity-90"
                          style={{
                            fontFamily: FONT,
                            background: configLocked ? 'var(--grey-g1, #dedede)' : count === 0 ? 'var(--grey-g05, #eaeaea)' : 'var(--main-m1, #49A3A6)',
                            color: configLocked || count > 0 ? '#fff' : 'var(--text-n3, rgba(0,0,0,0.3))',
                            cursor: configLocked || count === 0 ? 'default' : 'pointer',
                          }}
                        >
                          {configLocked ? (
                            <>
                              <Ic size={14}>{P.check}</Ic>
                              Live
                            </>
                          ) : count === 0 ? (
                            'Add a ticker to start'
                          ) : (
                            `Start watching ${count} ${count === 1 ? 'position' : 'positions'}`
                          )}
                        </button>
                        <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                          Free on your plan · edit or pause anytime
                        </span>
                      </div>
                    </div>
                  </AlvaMsg>
                </div>
              )}

              {/* — 消息 3:回执卡 — */}
              {doneShown && (
                <div ref={doneRef} style={{ scrollMarginTop: '8px' }}>
                  <AlvaMsg anim>
                    <p className="text-[14px] leading-[24px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      Done — Portfolio Watch is live. Here's what happens next.
                    </p>
                    <div className="flex w-full max-w-[600px] flex-col gap-[14px] rounded-[10px] p-[16px]" style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                      <div className="flex flex-wrap items-center gap-[10px]">
                        <span className="flex size-[22px] items-center justify-center rounded-full" style={{ background: 'var(--main-m3-10, rgba(42,155,125,0.1))', color: 'var(--main-m3, #2a9b7d)' }}>
                          <Ic size={13}>{P.check}</Ic>
                        </span>
                        <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                          Portfolio Watch is live
                        </p>
                        <span className="rounded-[4px] px-[6px] py-[1px] text-[11px] leading-[16px]" style={{ fontFamily: FONT, background: 'var(--grey-g02, #f5f5f5)', color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                          portfolio-watch-automation
                        </span>
                      </div>
                      {count > 0 && (
                        <div className="flex flex-wrap items-center gap-[6px]">
                          <span className="mr-[2px] text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                            Watching {count} {count === 1 ? 'position' : 'positions'} in {lang}
                          </span>
                          {selected.slice(0, 5).map((s) => {
                            const t = TICKER_MAP[s];
                            return (
                              <span key={s} className="flex items-center gap-[5px] rounded-full py-[2px] pl-[3px] pr-[8px]" style={{ background: 'var(--grey-g01, #fafafa)', border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                                <Mono symbol={s} hue={t?.hue ?? 200} size={16} />
                                <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{s}</span>
                              </span>
                            );
                          })}
                          {count > 5 && (
                            <span className="text-[12px] leading-[18px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>+{count - 5}</span>
                          )}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-[8px]">
                        {[
                          ['First check', 'running now'],
                          ['Cadence', 'every 2 hours'],
                          ['Messages', 'only when it matters'],
                        ].map(([label, value]) => (
                          <div key={label} className="flex min-w-[150px] flex-1 flex-col gap-[2px] rounded-[8px] px-[12px] py-[10px]" style={{ background: 'var(--grey-g01, #fafafa)' }}>
                            <span className="text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{label}</span>
                            <span className="text-[13px] font-medium leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-[16px]">
                        <button
                          type="button"
                          onClick={() => hookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                          className="bg-transparent p-0 text-[13px] leading-[20px] tracking-[0.13px]"
                          style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', cursor: 'pointer' }}
                        >
                          Edit automation
                        </button>
                        <button type="button" className="bg-transparent p-0 text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))', cursor: 'pointer' }}>
                          Pause
                        </button>
                      </div>
                    </div>
                  </AlvaMsg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
