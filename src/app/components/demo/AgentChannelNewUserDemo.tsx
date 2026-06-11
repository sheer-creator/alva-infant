/**
 * [INPUT]: Figma Page/Agent/New(7885:108600)+ Baby planb concept A 交互逻辑
 * [OUTPUT]: Agent 新用户首屏 demo — 现有产品 Sidebar IA + Agent Header(Telegram Select / Settings)+ 4 tab + skill chips + prompt 容器;聊天与 IM 解耦
 * [POS]: Demo 页 — Agent 页 empty 态改造的目标形态参照
 */

import { useCallback, useRef, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { ChatInput } from '@/app/components/shared/ChatInput';

const FONT = "'Delight', sans-serif";

/* ========== tone 色板(Alva token + fallback)========== */

type Tone = 'teal' | 'blue' | 'amber' | 'green' | 'orange';

const TONE_FG: Record<Tone, string> = {
  teal: 'var(--main-m1, #49A3A6)',
  blue: 'var(--main-m2, #2196f3)',
  amber: 'var(--main-m5, #E6A91A)',
  green: 'var(--main-m3, #2a9b7d)',
  orange: 'var(--main-m6, #ff9800)',
};
const TONE_BG: Record<Tone, string> = {
  teal: 'var(--main-m1-10, rgba(73,163,166,0.1))',
  blue: 'var(--main-m2-10, rgba(33,150,243,0.1))',
  amber: 'var(--main-m5-10, rgba(230,169,26,0.1))',
  green: 'var(--main-m3-10, rgba(42,155,125,0.1))',
  orange: 'var(--main-m6-10, rgba(255,152,0,0.1))',
};

/* ========== 内联线性图标(CDN 无对应名的图形)========== */

function Ic({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      {children}
    </svg>
  );
}

const P = {
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.5.9.5 1.6h6c0-.7 0-1.2.5-1.6A6 6 0 0 0 12 3Z" /></>,
  screener: <><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5M9 11h4M11 9v4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
  remix: <path d="M4 7h11l-2.5-2.5M20 17H9l2.5 2.5" />,
  link: <><path d="M10 14a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6" /><path d="M14 10a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6" /></>,
  automation: <path d="M13 3 5 13.5h5L9 21l8-10.5h-5z" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  check: <path d="M5 12.5 10 17l9-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10.5 19a1.5 1.5 0 0 0 3 0" /></>,
  x: <path d="M7 7l10 10M17 7 7 17" />,
  coin: <><circle cx="12" cy="11" r="8" /><path d="M12 6v10M15 8.5c-.6-.7-1.5-1-2.8-1-1.4 0-2.4.7-2.4 1.8 0 1.2 1 1.7 2.8 2 1.8.3 2.7.8 2.7 2 0 1.1-1 1.8-2.7 1.8-1.4 0-2.5-.4-3.2-1.2" /></>,
};

/* ========== 数据(精简自 planb,语义不变)========== */

interface PreviewRow { t: string; v: string; c: string; up: boolean }
interface PreviewMatch { t: string; note: string; tag: string }
interface SkillPreviewData {
  t: string;
  creator: string;
  subscribers: string;
  tone: Tone;
  cadence: string;
  chart?: { label: string; value: string; points: number[] };
  rows?: PreviewRow[];
  stats?: [string, string][];
  rule?: string;
  lastRun?: string;
  matches?: PreviewMatch[];
  push?: string;
}
interface SkillData {
  id: string;
  label: string;
  icon: React.ReactNode;
  kind: 'playbook' | 'automation';
  prompts: string[];
  previews: SkillPreviewData[];
}

const SKILLS: SkillData[] = [
  {
    id: 'theme-tracker', label: 'Theme Tracker', icon: P.bulb, kind: 'playbook',
    prompts: [
      'Build a theme tracker for AI infrastructure — NVDA, AVGO, TSM, and power-grid names',
      'Track the GLP-1 / obesity theme — LLY, NVO, and the supply chain around them',
      'Set up a tracker for the power & grid buildout — VRT, GEV, ETN',
    ],
    previews: [
      {
        t: 'Hyperscaler Capex Tracker', creator: 'Macro Scope X', subscribers: '489', tone: 'teal', cadence: 'weekly',
        chart: { label: 'Basket performance · YTD', value: '+18.4%', points: [8, 12, 10, 16, 22, 19, 26, 30, 28, 34, 40, 38, 46, 52, 49, 60] },
        rows: [
          { t: 'NVDA', v: '$184.20', c: '+4.2%', up: true },
          { t: 'AVGO', v: '$268.90', c: '+2.1%', up: true },
          { t: 'TSM', v: '$201.40', c: '−0.8%', up: false },
        ],
        stats: [['Names', '14'], ['Sentiment', 'Bullish'], ['Next catalyst', 'NVDA ER']],
      },
      {
        t: 'Power & Grid Buildout', creator: 'Sheer YLL', subscribers: '231', tone: 'orange', cadence: 'weekly',
        chart: { label: 'Basket performance · YTD', value: '+12.2%', points: [10, 14, 12, 18, 16, 22, 20, 26, 30, 27, 33, 38, 35, 42, 40, 47] },
        rows: [
          { t: 'VRT', v: '$112.40', c: '+3.1%', up: true },
          { t: 'GEV', v: '$342.10', c: '+1.8%', up: true },
          { t: 'ETN', v: '$338.25', c: '−0.4%', up: false },
        ],
        stats: [['Names', '11'], ['Sentiment', 'Constructive'], ['Next catalyst', 'GEV ER']],
      },
    ],
  },
  {
    id: 'smart-screener', label: 'Smart Screener', icon: P.screener, kind: 'automation',
    prompts: [
      'Screen US large-caps with rising earnings estimates and positive 20-day momentum, alert me on new entrants',
      'Find quality names down 20%+ from highs with ROE above 20% and net cash',
      'Screen for stocks where 3+ insiders bought within the last two weeks',
    ],
    previews: [
      {
        t: 'AI-Capex-Monitor', creator: 'Alva', subscribers: '1.2k', tone: 'amber', cadence: 'daily',
        rule: 'Top-decile capex revisions + positive AI-infra read-through',
        lastRun: 'Triggered 14m ago',
        matches: [
          { t: 'ANET', note: 'Capex guide +18% — networking pull-through', tag: 'New' },
          { t: 'VRT', note: 'Backlog +31% YoY, raised FY guide', tag: 'New' },
          { t: 'CRDO', note: 'AEC design wins at two hyperscalers', tag: 'Watch' },
        ],
        push: '3 new matches today — ANET, VRT, CRDO',
      },
      {
        t: 'Insider-Cluster Alert', creator: 'q_research', subscribers: '540', tone: 'amber', cadence: 'weekly',
        rule: '≥3 insiders buying the same name within 10 days',
        lastRun: 'Triggered 2d ago',
        matches: [
          { t: 'OXY', note: 'CEO + two directors bought $4.1M total', tag: 'New' },
          { t: 'PARA', note: 'Three insiders added near 52-week lows', tag: 'New' },
          { t: 'KSS', note: 'CFO cluster buy after the guidance cut', tag: 'Watch' },
        ],
        push: '2 new matches this week — OXY, PARA',
      },
    ],
  },
  {
    id: 'deep-dive', label: 'Deep Dive', icon: P.search, kind: 'playbook',
    prompts: [
      'Deep-dive NVDA: revenue segmentation, peer valuation, supply chain, bull/bear thesis',
      'Deep-dive TSM: node roadmap, pricing power, and the CoWoS bottleneck',
      'Deep-dive AVGO: networking growth, VMware integration, custom-ASIC pipeline',
    ],
    previews: [
      {
        t: 'NVDA Living Deep Dive', creator: 'Alva', subscribers: '824', tone: 'blue', cadence: 'quarterly',
        chart: { label: 'Data-center share of revenue', value: '78%', points: [22, 26, 30, 36, 42, 50, 58, 66, 70, 74, 76, 78] },
        rows: [
          { t: 'NTM P/E', v: '34×', c: 'vs AMD 28×', up: true },
          { t: 'DC revenue', v: '+154%', c: 'YoY', up: true },
          { t: 'CoWoS', v: 'Tight', c: 'supply gate', up: false },
        ],
        stats: [['Thesis', 'Constructive'], ['Key risk', 'Supply gate'], ['Next catalyst', 'ER May 22']],
      },
      {
        t: 'TSM Node & CoWoS Watch', creator: 'Chip Insider', subscribers: '412', tone: 'teal', cadence: 'monthly',
        chart: { label: '3nm share of revenue', value: '25%', points: [4, 6, 9, 12, 15, 17, 20, 22, 23, 24, 25, 25] },
        rows: [
          { t: '3nm mix', v: '25%', c: '+9pp YoY', up: true },
          { t: 'CoWoS', v: '2× by 2025', c: 'expanding', up: true },
          { t: 'Wafer price', v: '+3–5%', c: '2025 hikes', up: true },
        ],
        stats: [['Quality', 'Top of supply'], ['Key risk', 'Geopolitics'], ['Next catalyst', 'Monthly sales']],
      },
    ],
  },
  {
    id: 'what-if', label: 'What If', icon: P.remix, kind: 'automation',
    prompts: [
      'What if NVDA falls 15% on an earnings miss — how does my book reprice?',
      'What if the Fed cuts 50bp next meeting — which of my names benefit most?',
      'What if the dollar spikes 5% — where is my book most exposed?',
    ],
    previews: [
      {
        t: 'Book-Shock-Monitor', creator: 'Alva', subscribers: '731', tone: 'amber', cadence: 'event-driven',
        rule: 'Reprice the book when a watched scenario moves beyond 1σ',
        lastRun: 'Triggered 2h ago',
        matches: [
          { t: 'NVDA −15%', note: 'Direct −1.9%; with AVGO / TSM drift −3.4% total', tag: 'New' },
          { t: 'USD +5%', note: 'EM sleeve −9%, exporters −3% — book −1.7%', tag: 'Watch' },
          { t: 'Fed −50bp', note: 'Duration +6%, banks −2% — book +2.1%', tag: 'Watch' },
        ],
        push: 'NVDA scenario fired — your book reprices −3.4%',
      },
      {
        t: 'Macro-Surprise-Alert', creator: 'Macro Scope X', subscribers: '389', tone: 'amber', cadence: 'on releases',
        rule: 'Alert when a print lands 2σ from consensus, with your book exposure attached',
        lastRun: 'Triggered Tue · CPI',
        matches: [
          { t: 'CPI 3.6%', note: 'Hot vs 3.3% consensus — duration names exposed', tag: 'New' },
          { t: 'NFP +310k', note: 'Strong print — rate-cut odds repriced', tag: 'Watch' },
          { t: 'PCE in-line', note: 'No book action needed', tag: 'Quiet' },
        ],
        push: 'CPI hot — duration sleeve is your exposure',
      },
    ],
  },
];

/* ready-made KOL skills(Figma chips 第 4-6、8 位)— 点击即订阅 */
interface KolSkill { id: string; label: string; avatarBg?: string; avatarChar?: string }

const KOL_SKILLS: KolSkill[] = [
  { id: 'daily-macro-brief', label: 'Daily Macro Brief' },
  { id: 'earnings-edge', label: 'Earnings Edge' },
  { id: 'crypto-pulse', label: 'Crypto Pulse' },
  { id: 'yield-hunter', label: 'Yield Hunter', avatarBg: '#458ce8', avatarChar: 'S' },
];

/* chips 渲染顺序按 Figma:平台 skill 与 KOL 混排 */
const CHIP_ORDER: { type: 'skill' | 'kol'; id: string }[] = [
  { type: 'skill', id: 'theme-tracker' },
  { type: 'skill', id: 'smart-screener' },
  { type: 'skill', id: 'deep-dive' },
  { type: 'kol', id: 'daily-macro-brief' },
  { type: 'kol', id: 'earnings-edge' },
  { type: 'kol', id: 'crypto-pulse' },
  { type: 'skill', id: 'what-if' },
  { type: 'kol', id: 'yield-hunter' },
];

const DEFAULT_PROMPTS = [
  'Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names',
  'Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts',
  'Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators',
];

const NAV_PLAYBOOKS = [
  'Attribution Analysis Strategy',
  'James Wynn Tweet Tracker',
  'Optical AI Infrastructure Thesis',
  'NVDA Price Fetcher',
  'FinTwit Bulls & Bears',
];

const NAV_CHATS = ['Crypto Price + AI Trend Pulse', 'Heartbeat Run Counter'];

interface ImEntry { id: string; label: string; logo: string; handle: string; sub: string }

const IMS: ImEntry[] = [
  { id: 'telegram', label: 'Telegram', logo: 'logo-telegram.svg', handle: '@yggyll_tg', sub: 'Bot DM — instant pushes' },
  { id: 'discord', label: 'Discord', logo: 'logo-social-discord.svg', handle: 'yggyll#0882', sub: 'Bot DM — switch channels with /channel' },
  { id: 'whatsapp', label: "WhatsApp", logo: 'logo-social-whatsapp.svg', handle: '+1 ··· 4821', sub: 'Business account DM' },
  { id: 'slack', label: 'Slack', logo: 'logo-social-slack.svg', handle: '@yggyll · alva-hq', sub: 'Alva app in your workspace' },
];

const TABS = [
  { id: 'chat', label: 'Chat', icon: 'chat-l1' },
  { id: 'tasks', label: 'Tasks (5)', icon: 'step-l' },
  { id: 'memory', label: 'Memory', icon: 'memory-l' },
  { id: 'artifacts', label: 'Artifacts (8)', icon: 'folder-l' },
];

/* ========== 原子组件 ========== */

function MiniArea({ points, tone }: { points: number[]; tone: Tone }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const W = 100;
  const H = 32;
  const xy = points.map((v, i) => [
    (i / (points.length - 1)) * W,
    H - 3 - ((v - min) / (max - min || 1)) * (H - 6),
  ]);
  const line = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-[56px] w-full" aria-hidden>
      <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="currentColor" opacity="0.12" style={{ color: TONE_FG[tone] }} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ color: TONE_FG[tone] }} />
    </svg>
  );
}

function StatusPill({ state }: { state: 'running' | 'done' }) {
  const running = state === 'running';
  return (
    <span
      className="flex h-[22px] shrink-0 items-center gap-[5px] rounded-full px-[8px] text-[11px] leading-[18px] tracking-[0.11px]"
      style={{
        fontFamily: FONT,
        color: running ? 'var(--main-m1, #49A3A6)' : 'var(--main-m3, #2a9b7d)',
        background: running ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'var(--main-m3-10, rgba(42,155,125,0.1))',
      }}
    >
      <span className="size-[5px] rounded-full" style={{ background: 'currentcolor' }} />
      {running ? 'Running' : 'Live'}
    </span>
  );
}

/* push 归因:这条推送出自哪个 automation */
function SourceTag({ automation }: { automation: string }) {
  return (
    <span
      className="inline-flex h-[24px] items-center gap-[6px] rounded-[6px] px-[8px]"
      style={{ border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))', background: 'var(--b-r02, rgba(0,0,0,0.02))' }}
    >
      <span style={{ color: 'var(--main-m5, #E6A91A)' }}><Ic size={12}>{P.automation}</Ic></span>
      <span className="text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>
        {automation}
        <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}> · standalone automation</span>
      </span>
    </span>
  );
}

/* ========== 左侧导航(现有产品 Sidebar 结构)========== */

function SideItem({ icon, label, active, gradient }: { icon: React.ReactNode; label: string; active?: boolean; gradient?: boolean }) {
  return (
    <div className={`flex h-[36px] w-full cursor-pointer items-center gap-[8px] rounded-[4px] px-[8px] py-[4px] text-white transition-colors ${active ? 'bg-white/5' : 'hover:bg-white/5'}`}>
      <span className="flex size-[16px] shrink-0 items-center justify-center">{icon}</span>
      <p
        className="min-w-0 flex-1 truncate text-[13px] leading-[22px] tracking-[0.13px]"
        style={gradient ? {
          fontFamily: FONT,
          backgroundImage: 'linear-gradient(90deg, #6BDBD5 0%, #8FAFFF 42%, #C092F6 74%, #F5C579 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        } : { fontFamily: FONT }}
      >
        {label}
      </p>
    </div>
  );
}

function SideHeading({ label }: { label: string }) {
  return (
    <div className="flex h-[36px] w-full items-center px-[8px] py-[4px]">
      <p className="text-[12px] leading-[20px] tracking-[0.12px] text-white opacity-50" style={{ fontFamily: FONT }}>{label}</p>
    </div>
  );
}

function FinTwitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="ftw-grad" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6BDBD5" />
          <stop offset="0.42" stopColor="#8FAFFF" />
          <stop offset="0.74" stopColor="#C092F6" />
          <stop offset="1" stopColor="#F5C579" />
        </linearGradient>
      </defs>
      <g stroke="url(#ftw-grad)">{P.coin}</g>
    </svg>
  );
}

function DemoSidebar() {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="flex h-full w-[228px] shrink-0 flex-col overflow-y-auto p-[8px]" style={{ background: 'var(--b0-sidebar, #2A2A38)' }}>
      <div className="flex w-full items-center justify-between px-[8px] py-[12px]">
        <div className="relative h-[14px] w-[56px]">
          <img src={`${base}logo-alva.svg`} alt="Alva" className="absolute inset-0 block size-full object-contain object-left" />
        </div>
        <img src={`${base}sidebar-onoff.svg`} alt="" className="size-[16px] opacity-80" />
      </div>

      <div className="w-full p-[8px]">
        <button className="flex h-[32px] w-full cursor-pointer items-center justify-center gap-[6px] rounded-[4px] border-[0.5px] border-solid border-[rgba(255,255,255,0.3)] bg-transparent px-[16px] py-[6px] transition-colors hover:bg-white/5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M7 1.75V12.25M1.75 7H12.25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white" style={{ fontFamily: FONT }}>New Chat</span>
        </button>
      </div>

      <div className="flex w-full flex-col py-[4px]">
        <SideItem icon={<CdnIcon name="sidebar-agent-normal" size={16} color="#ffffff" />} label="Agent" active />
        <SideItem icon={<CdnIcon name="sidebar-discover-normal" size={16} color="#ffffff" />} label="Explore" />
        <SideItem icon={<CdnIcon name="sidebar-portfolio-normal" size={16} color="#ffffff" />} label="Portfolio" />
        <SideItem icon={<CdnIcon name="sidebar-skills-normal" size={16} color="#ffffff" />} label="Alva Skill" />
        <SideItem icon={<FinTwitIcon />} label="FinTwit Alpha League" gradient />
      </div>

      <div className="flex w-full flex-col py-[4px]">
        <SideHeading label="Playbooks" />
        {NAV_PLAYBOOKS.map((title) => (
          <SideItem key={title} icon={<Avatar name={title} size={16} />} label={title} />
        ))}
      </div>

      <div className="flex w-full min-h-px flex-1 flex-col py-[4px]">
        <SideHeading label="Chats" />
        {NAV_CHATS.map((c) => (
          <SideItem key={c} icon={<CdnIcon name="chat-l1" size={16} color="#ffffff" />} label={c} />
        ))}
      </div>

      {/* Upgrade to Pro 卡 — 同产品 Sidebar */}
      <div className="w-full px-[8px] pb-[8px] pt-[8px]">
        <button
          type="button"
          className="relative isolate w-full cursor-pointer overflow-hidden rounded-[4px] pb-[8px] pl-[10px] pr-[8px] pt-[6px] text-left transition-colors"
          style={{ background: 'rgba(0, 0, 0, 0.7)', border: '0.5px solid rgba(255, 255, 255, 0.12)' }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute z-[1]"
            style={{ right: -46, top: -46, width: 93, height: 93, background: 'radial-gradient(circle, rgba(42,155,125,0.45) 0%, rgba(42,155,125,0) 70%)' }}
          />
          <span className="relative z-[2] flex items-start gap-[8px]">
            <span className="flex shrink-0 items-center justify-center rounded-[4px]" style={{ width: 20, height: 20, background: 'rgba(42, 155, 125, 0.20)', marginTop: 4 }}>
              <CdnIcon name="arrow-up-f1" size={14} color="var(--main-m3, #2A9B7D)" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: '#fff' }}>Upgrade to Pro</span>
              <span className="text-[10px] leading-[16px] tracking-[0.1px]" style={{ fontFamily: FONT, color: 'rgba(255, 255, 255, 0.5)' }}>
                Unlock unlimited playbooks with 7-day free trial
              </span>
            </span>
          </span>
        </button>
      </div>

      <div className="flex w-full cursor-pointer items-center gap-[8px] rounded-[4px] p-[8px] transition-colors hover:bg-white/5">
        <Avatar name="YGGYLL" size={24} />
        <p className="min-w-0 flex-1 truncate text-[13px] leading-[22px] tracking-[0.13px] text-white" style={{ fontFamily: FONT }}>YGGYLL</p>
      </div>
    </div>
  );
}

/* ========== 消息壳(Figma Alva Answer:32px 头像 + Name 行)========== */

function AlvaPortrait({ size = 32 }: { size?: number }) {
  const base = import.meta.env.BASE_URL;
  return (
    <img
      src={`${base}logo-portrait.svg`}
      alt="Alva"
      className="shrink-0 rounded-[4px]"
      style={{ width: size, height: size }}
    />
  );
}

function AgentMsg({ pushed, time = 'Thursday 7:22 PM', children }: { pushed?: boolean; time?: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-start gap-[12px]">
      <AlvaPortrait />
      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva Agent</p>
          {pushed && (
            <span
              className="rounded-[4px] px-[5px] text-[10px] leading-[16px] tracking-[0.3px]"
              style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}
            >
              pushed
            </span>
          )}
          <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{time}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function UserMsg({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col items-end">
      <div className="max-w-[560px] rounded-[8px] px-[14px] py-[10px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{text}</p>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex h-[22px] items-center gap-[4px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-[5px] animate-bounce rounded-full" style={{ background: 'var(--text-n3, rgba(0,0,0,0.3))', animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  );
}

/* ========== Skill chips(Figma Tab/Home:h-40 胶囊)========== */

function SkillChip({ icon, avatar, label, active, trailing, onClick }: {
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  label: string;
  active?: boolean;
  trailing?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex h-[40px] cursor-pointer items-center gap-[8px] rounded-full bg-white px-[16px] py-[9px] transition-colors"
      style={{
        fontFamily: FONT,
        border: active ? '0.5px solid var(--main-m1, #49A3A6)' : '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        background: active ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : '#fff',
      }}
      onClick={onClick}
    >
      {icon && <span style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}><Ic size={18}>{icon}</Ic></span>}
      {avatar}
      <span className="whitespace-nowrap text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{label}</span>
      {trailing}
    </button>
  );
}

function PreviewCard({ p, skillKind, subscribed, onSubscribe, onRemix }: {
  p: SkillPreviewData;
  skillKind: SkillData['kind'];
  subscribed: boolean;
  onSubscribe: () => void;
  onRemix: () => void;
}) {
  const isAuto = skillKind === 'automation';
  return (
    <div
      className="flex w-[392px] shrink-0 flex-col overflow-hidden rounded-[8px] bg-white"
      style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}
    >
      <div className="flex h-[44px] items-center gap-[8px] px-[12px]">
        <span className="flex size-[24px] items-center justify-center rounded-[6px]" style={{ background: TONE_BG[p.tone], color: TONE_FG[p.tone] }}>
          <Ic size={13}>{isAuto ? P.automation : P.target}</Ic>
        </span>
        <p className="min-w-0 flex-1 truncate text-[13px] font-medium leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{p.t}</p>
        <span className="flex shrink-0 items-center gap-[5px] text-[10px] leading-[14px] tracking-[0.4px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>
          <span className="size-[5px] rounded-full" style={{ background: 'var(--main-m3, #2a9b7d)' }} />
          LIVE · {p.cadence}
        </span>
      </div>

      {isAuto ? (
        <div className="flex flex-col px-[12px] pb-[10px]">
          <p className="text-[10px] uppercase leading-[14px] tracking-[0.4px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>Alert rule</p>
          <p className="mt-[2px] text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{p.rule}</p>
          <p className="mt-[4px] flex items-center gap-[4px] text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            <Ic size={11}>{P.clock}</Ic>
            {p.lastRun}
          </p>
          <div className="mt-[8px] flex flex-col" style={{ borderTop: '0.5px solid var(--line-l05, rgba(0,0,0,0.05))' }}>
            {p.matches?.map((m) => (
              <div key={m.t} className="flex items-center gap-[8px] py-[7px]" style={{ borderBottom: '0.5px solid var(--line-l05, rgba(0,0,0,0.05))' }}>
                <span className="w-[64px] shrink-0 text-[12px] font-medium leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.t}</span>
                <span className="min-w-0 flex-1 truncate text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{m.note}</span>
                <span
                  className="shrink-0 rounded-full px-[7px] text-[10px] leading-[16px] tracking-[0.2px]"
                  style={{
                    fontFamily: FONT,
                    color: m.tag === 'New' ? 'var(--main-m1, #49A3A6)' : 'var(--text-n5, rgba(0,0,0,0.5))',
                    background: m.tag === 'New' ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'var(--b-r05, rgba(0,0,0,0.05))',
                  }}
                >
                  {m.tag}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-[8px] flex items-center gap-[7px] rounded-[6px] px-[9px] py-[6px]" style={{ background: 'var(--main-m5-10, rgba(230,169,26,0.1))' }}>
            <span style={{ color: 'var(--main-m5, #E6A91A)' }}><Ic size={13}>{P.bell}</Ic></span>
            <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>{p.push}</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-[12px] pb-[10px]">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{p.chart?.label}</span>
            <span className="text-[14px] font-medium leading-[20px] tracking-[0.14px]" style={{ fontFamily: FONT, color: TONE_FG[p.tone] }}>{p.chart?.value}</span>
          </div>
          <div className="mt-[4px]">{p.chart && <MiniArea points={p.chart.points} tone={p.tone} />}</div>
          <div className="mt-[6px] flex flex-col" style={{ borderTop: '0.5px solid var(--line-l05, rgba(0,0,0,0.05))' }}>
            {p.rows?.map((r) => (
              <div key={r.t} className="flex items-center gap-[8px] py-[6px]" style={{ borderBottom: '0.5px solid var(--line-l05, rgba(0,0,0,0.05))' }}>
                <span className="w-[84px] shrink-0 text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{r.t}</span>
                <span className="min-w-0 flex-1 text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{r.v}</span>
                <span className="shrink-0 text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: r.up ? 'var(--main-m3, #2a9b7d)' : 'var(--main-m4, #e05357)' }}>{r.c}</span>
              </div>
            ))}
          </div>
          <div className="mt-[8px] grid grid-cols-3 gap-[8px]">
            {p.stats?.map(([k, v]) => (
              <div key={k} className="flex flex-col rounded-[6px] px-[8px] py-[6px]" style={{ background: 'var(--grey-g01, #fafafa)' }}>
                <span className="truncate text-[10px] uppercase leading-[14px] tracking-[0.3px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>{k}</span>
                <span className="truncate text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex h-[46px] items-center gap-[8px] px-[12px]" style={{ borderTop: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
        <span className="flex min-w-0 flex-1 items-center gap-[6px]">
          <Avatar name={p.creator} size={16} />
          <span className="min-w-0 truncate text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            {p.creator} · {p.subscribers} subscribers
          </span>
        </span>
        <button
          className="flex h-[28px] shrink-0 cursor-pointer items-center gap-[5px] rounded-[6px] bg-transparent px-[10px] text-[12px] leading-[18px] tracking-[0.12px] transition-colors hover:bg-[var(--b-r03)]"
          style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
          onClick={onRemix}
        >
          <Ic size={13}>{P.remix}</Ic>
          Remix
        </button>
        {subscribed ? (
          <button
            className="flex h-[28px] shrink-0 items-center gap-[5px] rounded-[6px] px-[10px] text-[12px] leading-[18px] tracking-[0.12px]"
            style={{ fontFamily: FONT, border: 'none', color: 'var(--main-m1, #49A3A6)', background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}
          >
            <Ic size={13}>{P.check}</Ic>
            Subscribed
          </button>
        ) : (
          <button
            className="flex h-[28px] shrink-0 cursor-pointer items-center gap-[5px] rounded-[6px] border-none px-[10px] text-[12px] font-medium leading-[18px] tracking-[0.12px] text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: FONT, background: TONE_FG[p.tone] }}
            onClick={onSubscribe}
          >
            <Ic size={13}>{P.plus}</Ic>
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
}

/* ========== IM 连接 modal(解耦后的唯一连接入口)========== */

function ImConnectModal({ links, onClose, onConnect, onDisconnect }: {
  links: Record<string, boolean>;
  onClose: () => void;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}) {
  const base = import.meta.env.BASE_URL;
  const [pending, setPending] = useState<string | null>(null);
  const start = (id: string) => {
    setPending(id);
    setTimeout(() => {
      setPending(null);
      onConnect(id);
    }, 900);
  };
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-[420px] rounded-[12px] bg-white"
        style={{ boxShadow: 'var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-[20px] pb-[8px] pt-[18px]">
          <div className="flex min-w-0 flex-col gap-[2px]">
            <p className="text-[16px] font-medium leading-[24px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Connect Alva Agent</p>
            <p className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
              Mirror this agent to your IM — pushes land there, replies sync back.
            </p>
          </div>
          <button className="mt-[2px] shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }} onClick={onClose} aria-label="Close">
            <Ic size={16}>{P.x}</Ic>
          </button>
        </div>
        <div className="flex flex-col px-[12px] pb-[8px] pt-[6px]">
          {IMS.map((im) => {
            const on = !!links[im.id];
            const busy = pending === im.id;
            return (
              <div key={im.id} className="flex h-[56px] items-center gap-[11px] rounded-[8px] px-[10px] transition-colors hover:bg-[var(--b-r02)]">
                <img src={`${base}${im.logo}`} alt="" className="size-[26px] shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{im.label}</span>
                  <span className="truncate text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: on ? 'var(--main-m3, #2a9b7d)' : 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                    {on ? `Connected · ${im.handle}` : im.sub}
                  </span>
                </div>
                {on ? (
                  <button
                    className="h-[28px] shrink-0 cursor-pointer rounded-[6px] bg-transparent px-[10px] text-[12px] leading-[18px] tracking-[0.12px] transition-colors hover:bg-[var(--b-r03)]"
                    style={{ fontFamily: FONT, border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', color: 'var(--text-n5, rgba(0,0,0,0.5))' }}
                    onClick={() => onDisconnect(im.id)}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="h-[28px] shrink-0 cursor-pointer rounded-[6px] bg-transparent px-[12px] text-[12px] leading-[18px] tracking-[0.12px] transition-colors hover:bg-[var(--b-r03)]"
                    style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
                    onClick={() => !busy && start(im.id)}
                  >
                    {busy ? 'Connecting…' : 'Connect'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p className="px-[22px] pb-[16px] text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>
          Connections are per agent — pushes mirror the moment they fire.
        </p>
      </div>
    </div>
  );
}

/* ========== 互动消息流(respond 模拟)========== */

type ExtraMsg =
  | { id: number; role: 'user'; text: string }
  | { id: number; role: 'typing' }
  | { id: number; role: 'task'; title: string; kind: 'playbook' | 'automation'; state: 'running' | 'done' }
  | { id: number; role: 'imrec' }
  | { id: number; role: 'subpush'; title: string; push?: string; automation: string }
  | { id: number; role: 'answer'; text: string };

/* ========== 主组件 ========== */

export function AgentChannelNewUserDemo() {
  const base = import.meta.env.BASE_URL;
  const [tab, setTab] = useState('chat');
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState<Record<string, boolean>>({});
  const [extra, setExtra] = useState<ExtraMsg[]>([]);
  const [imLinks, setImLinks] = useState<Record<string, boolean>>({});
  const [imModalOpen, setImModalOpen] = useState(false);
  const idRef = useRef(0);
  const imRecShownRef = useRef(false);
  const imLinksRef = useRef(imLinks);
  imLinksRef.current = imLinks;
  const stageRef = useRef<HTMLDivElement>(null);

  const sel = openSkill ? SKILLS.find((s) => s.id === openSkill) : null;
  const telegramOn = !!imLinks.telegram;

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      stageRef.current?.scrollTo({ top: stageRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  /* 任务流:user → typing → task running → done;完成后若未连 IM,一次性软推荐 */
  const respond = useCallback((userText: string, kind: 'playbook' | 'automation', title: string) => {
    setTab('chat');
    setOpenSkill(null);
    const uid = ++idRef.current;
    setExtra((prev) => [...prev, { id: uid, role: 'user', text: userText }, { id: uid + 1, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      setExtra((prev) => prev.filter((m) => m.id !== uid + 1).concat({ id: uid + 2, role: 'task', title, kind, state: 'running' }));
      scrollToEnd();
      setTimeout(() => {
        setExtra((prev) => prev.map((m) => (m.id === uid + 2 && m.role === 'task' ? { ...m, state: 'done' } : m)));
        if (!Object.values(imLinksRef.current).some(Boolean) && !imRecShownRef.current) {
          imRecShownRef.current = true;
          setTimeout(() => {
            setExtra((prev) => [...prev, { id: ++idRef.current, role: 'imrec' }]);
            scrollToEnd();
          }, 1400);
        }
      }, 4500);
    }, 1000);
  }, [scrollToEnd]);

  const onPrompt = useCallback((text: string) => {
    const kind: 'playbook' | 'automation' = /screen|alert|monitor|watch|what if/i.test(text) ? 'automation' : 'playbook';
    respond(text, kind, kind === 'automation' ? 'Automation: Smart Screener' : `Build: ${text.slice(0, 42)}…`);
  }, [respond]);

  /* 订阅:即时生效,Alva 立刻推首条 run(价值先行,不要求连接)*/
  const pushSubscribe = useCallback((title: string, push: string | undefined, automation: string) => {
    setTab('chat');
    const uid = ++idRef.current;
    setExtra((prev) => [...prev, { id: uid, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      setExtra((prev) => prev.filter((m) => m.id !== uid).concat({ id: uid + 1, role: 'subpush', title, push, automation }));
      scrollToEnd();
    }, 700);
  }, [scrollToEnd]);

  const onSubscribePreview = useCallback((skill: SkillData, p: SkillPreviewData) => {
    setSubscribed((prev) => ({ ...prev, [p.t]: true }));
    pushSubscribe(p.t, skill.kind === 'automation' ? p.push : p.chart && `${p.chart.label} · ${p.chart.value}`, skill.kind === 'automation' ? p.t : `${p.cadence}-run`);
  }, [pushSubscribe]);

  /* ready-made KOL skill:点击即订阅 */
  const onKolChip = useCallback((k: KolSkill) => {
    if (subscribed[k.label]) return;
    setSubscribed((prev) => ({ ...prev, [k.label]: true }));
    pushSubscribe(k.label, undefined, k.label.replace(/\s+/g, '-'));
  }, [pushSubscribe, subscribed]);

  const connectIm = useCallback((imId: string) => {
    setImLinks((prev) => ({ ...prev, [imId]: true }));
    const im = IMS.find((i) => i.id === imId);
    if (!im) return;
    setExtra((prev) => [...prev, {
      id: ++idRef.current,
      role: 'answer',
      text: `Connected to ${im.label} — pushes from this agent now mirror to ${im.handle}. Reply there or here, it's the same conversation.`,
    }]);
    scrollToEnd();
  }, [scrollToEnd]);

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="m-0 text-[22px] font-medium leading-[32px] tracking-[0.22px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
          Agent — new user first open
        </h2>
        <p className="m-0 max-w-[68ch] text-[14px] leading-[24px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
          Figma Page/Agent/New structure: product sidebar, agent header with Telegram select and settings, four workspace tabs, then the main session — greeting, skill chips (platform + ready-made KOL), prompt suggestions, composer. Chat works without any IM connected; try a prompt, subscribe to a chip, or connect Telegram from the header.
        </p>
      </div>

      <div
        className="relative grid h-[760px] w-full overflow-hidden rounded-[12px] bg-white"
        style={{ gridTemplateColumns: '228px minmax(0, 1fr)', border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', boxShadow: 'var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))' }}
      >
        <DemoSidebar />

        <div className="flex min-w-0 flex-col bg-white">
          {/* Agent Header — Figma 7885:108604 */}
          <div className="flex shrink-0 items-center gap-[12px] px-[28px] py-[16px]">
            <AlvaPortrait />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva Agent</p>
              <p className="truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                Your always-on investing co-pilot — turn any idea into a live playbook.
              </p>
            </div>
            {/* IM Select — 解耦后的连接入口;点击打开连接 modal */}
            <button
              className="flex h-[32px] w-[112px] shrink-0 cursor-pointer items-center gap-[4px] rounded-[4px] bg-transparent px-[12px] py-[6px] transition-colors hover:bg-[var(--b-r02)]"
              style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
              onClick={() => setImModalOpen(true)}
            >
              <img src={`${base}logo-telegram.svg`} alt="" className="size-[16px] shrink-0 rounded-full" style={{ filter: telegramOn ? undefined : 'grayscale(1)', opacity: telegramOn ? 1 : 0.55 }} />
              <span className="min-w-0 flex-1 truncate text-left text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                Telegram
              </span>
              {telegramOn ? (
                <span className="size-[6px] shrink-0 rounded-full" style={{ background: 'var(--main-m3, #2a9b7d)' }} />
              ) : (
                <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
              )}
            </button>
            <button
              className="flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-transparent transition-colors hover:bg-[var(--b-r02)]"
              style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
              aria-label="Agent settings"
            >
              <CdnIcon name="settings-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
            </button>
          </div>

          {/* Tab — Figma 7885:108611:icon 16 + 14px,active Medium + b-2 m1 */}
          <div className="flex shrink-0 items-start gap-[16px] px-[28px]" style={{ borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  className="flex cursor-pointer items-center gap-[4px] bg-transparent px-0 pb-[6px]"
                  style={{ border: 'none', borderBottom: active ? '2px solid var(--main-m1, #49A3A6)' : '2px solid transparent' }}
                  onClick={() => setTab(t.id)}
                >
                  <CdnIcon name={t.icon} size={16} color={active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))'} />
                  <span
                    className="whitespace-nowrap text-[14px] leading-[22px] tracking-[0.14px]"
                    style={{ fontFamily: FONT, color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))', fontWeight: active ? 500 : 400 }}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {tab === 'chat' ? (
            <>
              <div ref={stageRef} className="min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto flex w-full max-w-[840px] flex-col gap-[28px] px-[28px] pb-[16px] pt-[28px]">
                  <AgentMsg>
                    <div>
                      <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Hi. I am Alva</p>
                      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                        Describe an investing idea in plain English and I'll turn it into a live playbook — a screener, a thesis, a backtest, or a tracker that keeps working after you close the tab.
                      </p>
                    </div>
                  </AgentMsg>

                  <AgentMsg>
                    <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      Pick a skill — build your own, or subscribe to a ready-made one:
                    </p>
                    <div className="flex flex-wrap gap-[12px]">
                      {CHIP_ORDER.map((c) => {
                        if (c.type === 'skill') {
                          const s = SKILLS.find((x) => x.id === c.id);
                          if (!s) return null;
                          return (
                            <SkillChip
                              key={s.id}
                              icon={s.icon}
                              label={s.label}
                              active={openSkill === s.id}
                              onClick={() => setOpenSkill(openSkill === s.id ? null : s.id)}
                            />
                          );
                        }
                        const k = KOL_SKILLS.find((x) => x.id === c.id);
                        if (!k) return null;
                        return (
                          <SkillChip
                            key={k.id}
                            avatar={
                              k.avatarBg ? (
                                <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full" style={{ background: k.avatarBg }}>
                                  <span className="text-[11px] font-medium leading-[18px] tracking-[0.11px] text-white" style={{ fontFamily: FONT }}>{k.avatarChar}</span>
                                </span>
                              ) : (
                                <Avatar name={k.label} size={22} />
                              )
                            }
                            label={k.label}
                            active={!!subscribed[k.label]}
                            onClick={() => onKolChip(k)}
                          />
                        );
                      })}
                      <SkillChip
                        label="More"
                        trailing={<CdnIcon name="arrow-right-l2" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />}
                      />
                    </div>
                    {sel && (
                      <div className="-mr-[28px] flex gap-[10px] overflow-x-auto pb-[4px] pr-[28px] pt-[2px]" style={{ scrollbarWidth: 'none' }}>
                        {sel.previews.map((p) => (
                          <PreviewCard
                            key={p.t}
                            p={p}
                            skillKind={sel.kind}
                            subscribed={!!subscribed[p.t]}
                            onSubscribe={() => onSubscribePreview(sel, p)}
                            onRemix={() => respond(`Build my own version of ${p.t} — keep the idea, let me tweak the ${sel.kind === 'automation' ? 'rule and schedule' : 'basket and rules'}`, sel.kind, `${sel.kind === 'automation' ? 'Automation' : 'Build'}: ${p.t} (remix)`)}
                          />
                        ))}
                      </div>
                    )}
                  </AgentMsg>

                  <AgentMsg>
                    <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      {sel ? <>Or build your own <span style={{ fontWeight: 500 }}>{sel.label}</span> — try one of these:</> : 'Or try one of these:'}
                    </p>
                    {/* Prompt Suggestions — Figma 7885:111793:单容器,行间分隔线 */}
                    <div className="flex w-full flex-col overflow-hidden rounded-[8px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
                      {(sel ? sel.prompts : DEFAULT_PROMPTS).map((t, i, arr) => (
                        <button
                          key={t}
                          className="flex w-full cursor-pointer items-center gap-[8px] bg-transparent px-[16px] py-[13px] text-left transition-colors hover:bg-[var(--b-r02)]"
                          style={{ border: 'none', borderBottom: i < arr.length - 1 ? '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' : 'none' }}
                          onClick={() => (sel ? respond(t, sel.kind, `${sel.kind === 'automation' ? 'Automation' : 'Build'}: ${sel.label}`) : onPrompt(t))}
                        >
                          <span className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{t}</span>
                          <CdnIcon name="enter-l" size={16} color="var(--text-n5, rgba(0,0,0,0.5))" />
                        </button>
                      ))}
                    </div>
                  </AgentMsg>

                  {extra.map((m) => {
                    if (m.role === 'user') return <UserMsg key={m.id} text={m.text} />;
                    if (m.role === 'typing') return <AgentMsg key={m.id} time="now"><TypingDots /></AgentMsg>;
                    if (m.role === 'answer') {
                      return (
                        <AgentMsg key={m.id} pushed time="now">
                          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.text}</p>
                        </AgentMsg>
                      );
                    }
                    if (m.role === 'subpush') {
                      return (
                        <AgentMsg key={m.id} pushed time="now">
                          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                            <span style={{ fontWeight: 500 }}>{m.title}</span> is live in your workspace. {m.push ? "Here's the latest run — new ones will land right here." : 'The first run lands with the next cycle — pushes will land right here.'}
                          </p>
                          {m.push && (
                            <div className="flex items-center gap-[7px] self-start rounded-[6px] px-[9px] py-[6px]" style={{ background: 'var(--main-m5-10, rgba(230,169,26,0.1))' }}>
                              <span style={{ color: 'var(--main-m5, #E6A91A)' }}><Ic size={13}>{P.bell}</Ic></span>
                              <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>{m.push}</span>
                            </div>
                          )}
                          <div><SourceTag automation={m.automation} /></div>
                        </AgentMsg>
                      );
                    }
                    if (m.role === 'task') {
                      const done = m.state === 'done';
                      const isAuto = m.kind === 'automation';
                      return (
                        <AgentMsg key={m.id} time="now">
                          <div className="flex w-full flex-col gap-[6px] rounded-[8px] px-[12px] py-[10px]" style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                            <div className="flex items-center gap-[8px]">
                              <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px]" style={{ background: isAuto ? TONE_BG.amber : TONE_BG.teal, color: isAuto ? TONE_FG.amber : TONE_FG.teal }}>
                                <Ic size={12}>{isAuto ? P.automation : P.target}</Ic>
                              </span>
                              <p className="min-w-0 flex-1 truncate text-[13px] font-medium leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.title}</p>
                              <StatusPill state={m.state} />
                            </div>
                            <p className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                              {done
                                ? (isAuto ? 'Live — pushes will land here. ' : 'Built and live — saved to Artifacts. ')
                                : "Background task — I'll post here when it's done. "}
                              <button className="cursor-pointer border-none bg-transparent p-0 text-[12px] underline" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }} onClick={() => setTab(done ? 'artifacts' : 'tasks')}>
                                {done ? 'View in Artifacts' : 'Track it in Tasks'}
                              </button>
                            </p>
                          </div>
                        </AgentMsg>
                      );
                    }
                    /* imrec — 任务跑完后的一次性连接软推荐(解耦的核心交互)*/
                    return (
                      <AgentMsg key={m.id} time="now">
                        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                          One more thing — this agent only lives on the Web right now. Connect Telegram or Discord and every push lands in your DM the moment it fires.
                        </p>
                        <div className="flex flex-wrap gap-[8px]">
                          <button
                            className="flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02)]"
                            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
                            onClick={() => setImModalOpen(true)}
                          >
                            <img src={`${base}logo-telegram.svg`} alt="" className="size-[15px] rounded-full" />
                            Connect Telegram
                          </button>
                          <button
                            className="flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02)]"
                            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
                            onClick={() => setImModalOpen(true)}
                          >
                            <Ic size={14}>{P.link}</Ic>
                            See all IMs
                          </button>
                        </div>
                      </AgentMsg>
                    );
                  })}
                </div>
              </div>

              <div className="shrink-0 px-[28px] pb-[28px] pt-[8px]">
                <div className="mx-auto w-full max-w-[840px]">
                  <ChatInput shadow allowReferences={false} placeholder="Ask Alva anything. @ for context, / for skills" onSend={onPrompt} />
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[10px]">
              <CdnIcon name={TABS.find((t) => t.id === tab)?.icon ?? 'folder-l'} size={28} color="var(--text-n2, rgba(0,0,0,0.2))" />
              <p className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                Chat is the focus of this demo — the {TABS.find((t) => t.id === tab)?.label.replace(/\s*\(\d+\)$/, '')} panel isn't included.
              </p>
              <button
                className="cursor-pointer border-none bg-transparent p-0 text-[13px] underline"
                style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}
                onClick={() => setTab('chat')}
              >
                Back to Chat
              </button>
            </div>
          )}
        </div>

        {imModalOpen && (
          <ImConnectModal
            links={imLinks}
            onClose={() => setImModalOpen(false)}
            onConnect={connectIm}
            onDisconnect={(id) => setImLinks((prev) => ({ ...prev, [id]: false }))}
          />
        )}
      </div>

      <ul className="m-0 flex list-disc flex-col gap-[2px] pl-[18px]">
        {[
          '结构对齐 Figma Page/Agent/New:产品 Sidebar(New Chat / Agent 置顶)+ Agent Header(Telegram Select + Settings)+ Chat / Tasks / Memory / Artifacts 四 tab + 840px 内容列。',
          'IM 解耦:未连接也能聊和收 push;header 的 Telegram select 打开连接面板,首个任务完成后 Alva 在消息流里一次性软推荐。',
          '价值先行:平台 skill chip 点开成品 preview(Subscribe 即时生效并收到首条带归因的 push);KOL chip(Daily Macro Brief 等)点击即订阅。',
          'Prompt suggestions 为单容器三行(Figma 结构),选中 skill 时联动替换为该 skill 的建议。',
        ].map((t) => (
          <li key={t} className="text-[13px] leading-[22px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
