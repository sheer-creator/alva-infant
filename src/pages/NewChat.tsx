/**
 * [INPUT]: Page type, AppShell, ChatInput (bottomChip), new-chat-mock, Dropdown
 * [OUTPUT]: New Chat 入口页 — skill 驱动的起手页面
 * [POS]: Sidebar 最顶的入口页面
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { SkillChip } from '@/app/components/shared/SkillChip';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import { POPULAR_RECENT_SORT_OPTIONS, TRENDING_FILTER_CHIPS, TrendingFilterBar, type PopularRecentSort, type TrendingFilterChip } from '@/app/components/shared/TrendingFilterBar';
import { BURST_ICON_PATHS } from '@/app/components/shared/burst-icon-paths';
import { COMMUNITY_TEMPLATES, PRIMARY_TEMPLATES, OTHERS_TEMPLATES, type CommunitySkillTemplate, type NewChatTemplate, type NewChatPlaybook, type RecCard } from '@/data/new-chat-mock';
import { AutomationCard, type PushCardData } from '@/app/components/shared/AutomationCard';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import { generateTypedSuggestions } from '@/data/typed-suggestions';
import type { CoverInput, Template as CoverTemplateName, DomainKey } from '@/lib/playbook-cover/types';
import { PlaybookCard as ExplorePlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';
import { PLAYBOOKS_ORDERED, chipMatchesPlaybook } from '@/pages/Explore2';
import { SkillsLibraryPanel, fnv1aSkill, tagsForSkill, socialsForCreator } from '@/app/components/shared/SkillsLibraryPanel';

const CHIP_ICON = 'researcher-l1';
type CategoryChip = TrendingFilterChip;

/** 返回 true 仅当设备支持 hover（即非触屏） */
function supportsHover(): boolean {
  if (typeof window === 'undefined') return true;
  if (typeof window.matchMedia !== 'function') return true;
  return window.matchMedia('(hover: hover)').matches;
}

/* ========== Skill hover info card ========== */

function relativeTimeForSkill(skillId: string): string {
  const h = fnv1aSkill(skillId);
  const minutes = h % 7200;
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (24 * 60))}d ago`;
}

/* tags / socials 派生与 Skills 浮层一并抽到 shared/SkillsLibraryPanel,此处直接 import 复用 */

function SkillInfoCard({
  template,
  anchor,
  placeAbove,
  side = 'auto',
  onMouseEnter,
  onMouseLeave,
}: {
  template: NewChatTemplate;
  anchor: DOMRect;
  placeAbove: boolean;
  /** 'auto' = 默认上下放（pill）；'left' = 锚点左侧（dropdown row） */
  side?: 'auto' | 'left';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  // 卡片复用移动端 SkillDetailModal 的内容结构（标题→副标题→描述→tags→分隔线→creator 行），
  // 但桌面 hover 卡不展示底部按钮和按钮上方的分隔线。
  const cardWidth = 360;
  const gap = 10;
  const cardRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number>(220);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setMeasuredHeight(cardRef.current.offsetHeight);
    }
  }, [template.id]);

  const tags = (template as CommunitySkillTemplate).tags ?? tagsForSkill(template.id);

  let left: number;
  let top: number;
  if (side === 'left') {
    left = anchor.left - cardWidth - gap;
    if (typeof window !== 'undefined') {
      left = Math.max(12, left);
    }
    top = anchor.top + anchor.height / 2 - measuredHeight / 2;
    if (typeof window !== 'undefined') {
      top = Math.max(12, Math.min(top, window.innerHeight - measuredHeight - 12));
    }
  } else {
    left = anchor.left + anchor.width / 2 - cardWidth / 2;
    if (typeof window !== 'undefined') {
      left = Math.max(12, Math.min(left, window.innerWidth - cardWidth - 12));
    }
    top = placeAbove ? anchor.top - measuredHeight - gap : anchor.bottom + gap;
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top,
        left,
        width: cardWidth,
        zIndex: 50,
        background: '#ffffff',
        borderRadius: 8,
        border: '0.5px solid var(--line-l2)',
        boxShadow: 'var(--shadow-s)',
        padding: 20,
        pointerEvents: 'auto',
        animation: 'newchat-fadeup 160ms ease-out',
      }}
    >
      {/* 顶部：skill 名 + 副标题 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 18,
            lineHeight: '24px',
            fontWeight: 400,
            color: 'var(--text-n9)',
            letterSpacing: 0.18,
            margin: 0,
          }}
        >
          {template.label}
        </h2>
        <span
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 11,
            lineHeight: '16px',
            color: 'rgba(0,0,0,0.4)',
            letterSpacing: 0.11,
            fontWeight: 400,
          }}
        >
          {relativeTimeForSkill(template.id)}
        </span>
      </div>
      {/* 描述 */}
      <p
        style={{
          fontFamily: "'Delight', sans-serif",
          fontSize: 13,
          lineHeight: '20px',
          color: 'var(--text-n7)',
          letterSpacing: 0.13,
          margin: '10px 0 0',
        }}
      >
        {template.description}
      </p>
      {/* tags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              height: 20,
              padding: '0 6px',
              borderRadius: 5,
              background: 'var(--b-r05)',
              color: 'var(--text-n5)',
              fontFamily: "'Delight', sans-serif",
              fontSize: 11,
              lineHeight: '20px',
              letterSpacing: 0.11,
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {/* 分割线（上下间距对称，给创作者行更舒展的呼吸） */}
      <div style={{ height: 1, background: 'var(--line-l07)', margin: '20px 0' }} />
      {/* 创建者信息行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          className="nc-creator-link"
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '4px 6px',
            margin: '-4px -6px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: 6,
            transition: 'background 140ms ease',
            textAlign: 'left',
          }}
        >
          <Avatar name={template.creator} size={36} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Delight', sans-serif",
                fontSize: 11,
                lineHeight: '14px',
                color: 'rgba(0,0,0,0.4)',
                letterSpacing: 0.11,
                fontWeight: 400,
              }}
            >
              Created by
            </div>
            <div
              className="nc-creator-link-name"
              style={{
                fontFamily: "'Delight', sans-serif",
                fontSize: 14,
                lineHeight: '20px',
                color: 'var(--text-n9)',
                letterSpacing: 0.14,
                fontWeight: 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'color 140ms ease',
              }}
            >
              {template.creator}
            </div>
          </div>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {socialsForCreator(template.creator).map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              style={{
                width: 24,
                height: 24,
                borderRadius: '9999px',
                background: 'var(--b-r05)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 120ms ease, transform 120ms ease',
              }}
              onMouseEnter={(e) => {
                if (!supportsHover()) return;
                e.currentTarget.style.background = 'var(--b-r1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if (!supportsHover()) return;
                e.currentTarget.style.background = 'var(--b-r05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {s.render()}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== Suggested Prompt 行 ========== */

function InlineSuggestionRow({ text, onClick, index = 0 }: { text: string; onClick?: () => void; index?: number }) {
  return (
    <button
      type="button"
      className="nc-prompt-row"
      style={{
        animation: 'newchat-fade 220ms ease-out both',
        animationDelay: `${index * 70}ms`,
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!supportsHover()) return;
        e.currentTarget.style.background = 'var(--b-r03)';
      }}
      onMouseLeave={(e) => {
        if (!supportsHover()) return;
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <span className="nc-prompt-text">{text}</span>
      <CdnIcon name="enter-l" size={20} color="rgba(0,0,0,0.4)" />
    </button>
  );
}

function PromptRowSkeleton({ widthPct }: { widthPct: number }) {
  return (
    <div
      className="nc-prompt-skeleton-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 46,
        padding: '12px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          flex: 1,
          height: 14,
          background: 'var(--b-r07)',
          borderRadius: 4,
          maxWidth: `${widthPct}%`,
        }}
      />
      <div style={{ width: 20, height: 20, background: 'var(--b-r05)', borderRadius: 4 }} />
    </div>
  );
}

/* ========== Cover input 映射（复用 @/lib/playbook-cover） ========== */

const SKILL_TEMPLATE: Record<string, CoverTemplateName> = {
  'theme-tracker': 'thesis',
  'smart-screener': 'screener',
  'deep-dive': 'thesis',
  'daily-macro-brief': 'general',
  'earnings-edge': 'thesis',
  'crypto-pulse': 'general',
  'what-if': 'what-if',
  'yield-hunter': 'screener',
  'dividend-diary': 'screener',
  backtest: 'what-if',
  valuation: 'thesis',
};

// Skill → cover domain（用于决定 watermark icon 与色域）
// 注意：domain 必须在该 skill 对应 template 的 TEMPLATE_ALLOWED_DOMAINS 里，
// 否则 resolveDomain 会回落到 "guide"（menu_book 通用书本图标）。
const SKILL_DOMAIN: Record<string, DomainKey> = {
  'theme-tracker':     'macro',        // thesis  → trend_up 不在 thesis 允许列表，改 macro
  'smart-screener':    'momentum',     // screener
  'deep-dive':         'ai',           // thesis
  'daily-macro-brief': 'review',       // general → macro 不在 general 允许列表，改 review
  'earnings-edge':     'macro',        // thesis  → earnings 不在 thesis 允许列表，改 macro
  'crypto-pulse':      'alerts',       // general → crypto 不在 general 允许列表，改 alerts
  'what-if':           'event_study',  // what-if
  'yield-hunter':      'dividend',     // screener
  'dividend-diary':    'dividend',     // screener
  backtest:            'event_study',  // what-if
  valuation:           'value',        // thesis
};

/* ========== Cover 假数据生成器 ==========
 * 复用 @/lib/playbook-cover/cover-gen — 这里只构造 CoverInput。
 */

const UNIVERSES = ['S&P LARGE CAP', 'RUSSELL 2000', 'NASDAQ 100', 'MSCI EMG', 'STOXX 600', 'TOPIX 500'];
const WINDOWS = ['1H', '6H', '1D', '1W'];
const THESIS_BODIES = [
  'Late long-term debt cycle · risk-off bias',
  'AI capex peak forming into Q3',
  'Basket −2.1% vs SMH +0.6% YTD',
  'Hyperscaler PPA flows feed power demand',
  'Dollar regime shift, EM tailwind',
  'Curve re-steepening as growth softens',
];
const VERBS = ['Historically Drops', 'Historically Rises', 'Range-Bound', 'Outperforms Peers', 'Trails Benchmark'];
const KINDS_GENERAL = [
  'CONTEXT FEED · daily',
  'WATCHLIST · 2026',
  'BRIEF · daily',
  'PULSE · live',
  'ALERTS · LIVE · 30S',
];
const PULSES = ['2h ago', '38 holdings', '1.2M views', 'live', '12 alerts', '07:30 ET'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const CATEGORIES: Array<'RISK' | 'CATALYST' | 'AMBIGUOUS'> = ['RISK', 'CATALYST', 'AMBIGUOUS'];

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function buildCoverInput(p: NewChatPlaybook, skillId: string): CoverInput {
  const template = SKILL_TEMPLATE[skillId] ?? 'general';
  const domain = SKILL_DOMAIN[skillId];
  const h = fnv1a(`${p.id}|${p.title}`);
  const pick = <T,>(arr: T[], shift: number): T => arr[(h >>> shift) % arr.length];
  const tickers = p.tickers ?? [];

  const base: CoverInput = { template, title: p.title, author: p.creator, tickers, domain };

  if (template === 'screener') {
    return { ...base, series: `SCORED · ${pick(UNIVERSES, 0)} · ${pick(WINDOWS, 6)}` };
  }
  if (template === 'thesis') {
    const month = pick(MONTHS, 0);
    const day = ((h >>> 4) % 28) + 1;
    return {
      ...base,
      anchor: `${month} ${day}`,
      category: pick(CATEGORIES, 8),
      kind: pick(THESIS_BODIES, 12),
    };
  }
  if (template === 'what-if') {
    const isPos = ((h >>> 0) & 1) === 1;
    const mag = (((h >>> 2) % 45) + 5) / 10;
    const xMult = ((h >>> 8) % 9) + 2;
    const bars = Array.from({ length: 5 }).map((_, i) => {
      const raw = (((h >>> (i * 3)) & 0xff) / 255) * 2 - 1;
      return Math.round((raw * (isPos ? 1 : -1) * 4 + (isPos ? 0.6 : -0.6)) * 10) / 10;
    });
    return {
      ...base,
      series: `30D AFTER · ${xMult}×`,
      kind: pick(VERBS, 16),
      anchor: `${isPos ? '+' : '−'}${mag.toFixed(1)}%`,
      whatIfBars: bars,
    };
  }
  // general
  const pieces = ((h >>> 0) % 70) + 10;
  const views = (((h >>> 4) % 200) + 50) / 10;
  return {
    ...base,
    kind: pick(KINDS_GENERAL, 0),
    anchor: pick(PULSES, 8),
    series: `${pieces} PIECES · ${views.toFixed(1)}K VIEWS`,
  };
}


function toExplorePlaybook(p: NewChatPlaybook, skillId: string): ExplorePlaybook {
  return {
    id: p.id,
    creator: p.creator,
    title: p.title,
    description: p.desc,
    tickers: p.tickers,
    pulse: 'active',
    stars: p.stars,
    remixes: p.remixes,
    cover: buildCoverInput(p, skillId),
  };
}

function PlaybookCardSkeleton() {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '0.5px solid var(--line-l12)',
        borderRadius: 8,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '472 / 265.5',
          borderRadius: 4,
          background: 'var(--b-r05)',
        }}
      />
      <div style={{ padding: '16px 12px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 70, height: 20, background: 'var(--b-r07)', borderRadius: 4 }} />
          <div style={{ width: 40, height: 20, background: 'var(--b-r05)', borderRadius: 4 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 18, background: 'var(--b-r07)', borderRadius: 4, maxWidth: '60%' }} />
          <div style={{ height: 12, background: 'var(--b-r05)', borderRadius: 4 }} />
          <div style={{ height: 12, background: 'var(--b-r05)', borderRadius: 4, maxWidth: '80%' }} />
        </div>
      </div>
    </div>
  );
}

/* ========== Title hero — 标题 + 创建者气泡，允许折行，纵向居中，固定高度 ========== */
/* Title transition: dot-burst ellipse port of text-reveal-v4 reference. */

const TITLE_DESKTOP_FONT = 36;
const TITLE_MOBILE_FONT = 28;
const TITLE_LH = 1.33;
const MOBILE_THRESHOLD_PX = 640;

/* ── Dot-burst tunables (text-reveal-v4) ── */
const TR_CELL = 18;
const TR_TOTAL_MS = 400;
const TR_ESCAPE_BAND = 1.06;
const TR_ESCAPE_PROB = 0.12;
const TR_SUPERELLIPSE_N = 1.7;

function trEaseInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function trEaseInOutInverse(y: number): number {
  if (y <= 0) return 0;
  if (y >= 1) return 1;
  let lo = 0, hi = 1;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (trEaseInOut(mid) < y) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
function trWrapChars(host: HTMLElement): HTMLSpanElement[] {
  const out: HTMLSpanElement[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === 3) {
      const text = node.textContent ?? '';
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.display = 'inline-block';
        frag.appendChild(s);
        out.push(s);
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === 1) {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(host.childNodes).forEach(walk);
  return out;
}
/* Reference uses 5 hand-drawn squircle icons (BURST_ICON_PATHS). Each path
   already includes its own footprint within a 20×20 viewBox, so we don't
   need to size or pad — we just stamp the chosen path and dial opacity.
   Per-burst we shuffle the kind→weight mapping so every text transition
   shows a visibly different mix of shapes (花色每次随机). */
function trDotSvg(kind: number, opacity: number): string {
  const path = BURST_ICON_PATHS[kind] ?? BURST_ICON_PATHS[0];
  return `<svg width="100%" height="100%" viewBox="0 0 20 20" style="display:block;opacity:${opacity}"><path d="${path}" fill="#000"/></svg>`;
}
/* Build a fresh weighted icon pool for one burst: shuffle which kinds are
   "primary" (full opacity) vs. ghosted, and randomise the dominant kind so
   each transition has a distinct visual signature. */
function trBuildBurstPalette(): { kind: number; opacity: number }[] {
  const N = BURST_ICON_PATHS.length;
  const order = Array.from({ length: N }, (_, i) => i)
    .sort(() => Math.random() - 0.5);
  // 2-3 dominant kinds + 1-2 ghost kinds, weights ≈ 60% / 25% / 10% / 5%
  const weights = [0.45, 0.25, 0.15, 0.1, 0.05].slice(0, N);
  const opacities = [1, 1, 1, 0.45, 0.2].slice(0, N).sort(() => Math.random() - 0.5);
  const pool: { kind: number; opacity: number }[] = [];
  order.forEach((kind, i) => {
    const count = Math.max(1, Math.round(weights[i] * 100));
    for (let j = 0; j < count; j++) pool.push({ kind, opacity: opacities[i] });
  });
  return pool;
}
function trPickFromPalette(palette: { kind: number; opacity: number }[]): { kind: number; opacity: number } {
  return palette[Math.floor(Math.random() * palette.length)];
}

function TitleHero({ selected, maxWidth }: { selected: NewChatTemplate | null; maxWidth: number }) {
  const [isMobileTitle, setIsMobileTitle] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_THRESHOLD_PX : false,
  );
  useEffect(() => {
    const h = () => setIsMobileTitle(window.innerWidth < MOBILE_THRESHOLD_PX);
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const TITLE_BASE_FONT = isMobileTitle ? TITLE_MOBILE_FONT : TITLE_DESKTOP_FONT;
  const TITLE_LINE = Math.ceil(TITLE_BASE_FONT * TITLE_LH);
  const TITLE_BOX_HEIGHT = TITLE_LINE * 2;
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const outgoingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevTextRef = useRef<string>('');
  const animatingRef = useRef(false);
  const [scale, setScale] = useState(1);

  const text = selected ? `Build your ${selected.label}` : 'Turn Ideas into Live\nInvesting Playbooks in Minutes';

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const compute = () => {
      title.style.maxWidth = `${container.clientWidth}px`;
      const naturalH = title.scrollHeight;
      setScale(naturalH > TITLE_BOX_HEIGHT ? TITLE_BOX_HEIGHT / naturalH : 1);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
  }, [text, TITLE_BOX_HEIGHT]);

  // Trigger dot-burst transition whenever `text` changes
  useEffect(() => {
    const prev = prevTextRef.current;
    if (prev === text) {
      prevTextRef.current = text;
      return;
    }
    prevTextRef.current = text;
    const stage = containerRef.current;
    const live = titleRef.current;
    const outgoing = outgoingRef.current;
    const overlay = overlayRef.current;
    if (!stage || !live || !outgoing || !overlay) return;

    // On very first paint (prev was empty), no burst — just show
    if (!prev) return;

    // Skill-switch title burst disabled — title swaps text instantly (no dot-burst).
    const titleBurstEnabled = false as boolean;
    if (!titleBurstEnabled) return;

    animatingRef.current = true;

    // Outgoing layer = prev text, live layer = next text (incoming)
    outgoing.textContent = prev;
    outgoing.style.opacity = '1';

    const firstSpans = trWrapChars(outgoing);
    const secondSpans = trWrapChars(live);
    firstSpans.forEach((s) => { s.style.opacity = '1'; });
    secondSpans.forEach((s) => { s.style.opacity = '0'; });

    const runBody = () => {
      const sr = stage.getBoundingClientRect();
      if (!secondSpans.length) {
        overlay.innerHTML = '';
        outgoing.textContent = '';
        animatingRef.current = false;
        return;
      }

      const rects = secondSpans.map((s) => s.getBoundingClientRect());
      const tTop = Math.min(...rects.map((r) => r.top));
      const tBottom = Math.max(...rects.map((r) => r.bottom));
      const tLeft = Math.min(...rects.map((r) => r.left));
      const tRight = Math.max(...rects.map((r) => r.right));
      const cx = (tLeft + tRight) / 2 - sr.left;
      const cy = (tTop + tBottom) / 2 - sr.top;
      const rx = ((tRight - tLeft) / 2) * 1.35;
      const ry = ((tBottom - tTop) / 2) * 1.7;

      const ed = (gx: number, gy: number) =>
        Math.pow(
          Math.pow(Math.abs(gx / rx), TR_SUPERELLIPSE_N) +
            Math.pow(Math.abs(gy / ry), TR_SUPERELLIPSE_N),
          1 / TR_SUPERELLIPSE_N,
        );
      const dotDelay = (d: number) => Math.round(trEaseInOutInverse(d) * TR_TOTAL_MS);

      // Fresh palette per burst so consecutive transitions look different
      const palette = trBuildBurstPalette();
      const frag = document.createDocumentFragment();
      const gxMin = -Math.ceil((rx * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;
      const gxMax = Math.ceil((rx * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;
      const gyMin = -Math.ceil((ry * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;
      const gyMax = Math.ceil((ry * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;

      for (let gy = gyMin; gy <= gyMax; gy += TR_CELL) {
        for (let gx = gxMin; gx <= gxMax; gx += TR_CELL) {
          const d = ed(gx, gy);
          let delay: number, anim: string;
          if (d <= 1) {
            delay = dotDelay(d);
            anim = `tr-dot-flash 200ms ease-out ${delay}ms forwards`;
          } else if (d <= TR_ESCAPE_BAND) {
            if (Math.random() > TR_ESCAPE_PROB) continue;
            const jitter = Math.round(((d - 1) / (TR_ESCAPE_BAND - 1)) * 60 + Math.random() * 30);
            delay = dotDelay(1) + jitter;
            anim = `tr-dot-flash 160ms ease-out ${delay}ms forwards`;
          } else continue;
          const el = document.createElement('div');
          el.className = 'tr-cell';
          el.style.cssText = `left:${cx + gx - TR_CELL / 2}px;top:${cy + gy - TR_CELL / 2}px`;
          el.style.animation = anim;
          const pick = trPickFromPalette(palette);
          el.innerHTML = trDotSvg(pick.kind, pick.opacity);
          frag.appendChild(el);
        }
      }
      overlay.appendChild(frag);

      const spanDelay = (s: HTMLElement) => {
        const r = s.getBoundingClientRect();
        const gx = r.left + r.width / 2 - sr.left - cx;
        const gy = r.top + r.height / 2 - sr.top - cy;
        return dotDelay(Math.min(ed(gx, gy), 1));
      };
      firstSpans.forEach((s) => {
        const d = spanDelay(s);
        s.style.animation = `tr-char-erase 120ms ease-out ${d}ms forwards`;
      });
      secondSpans.forEach((s) => {
        const d = spanDelay(s);
        s.style.animation = `tr-char-appear 120ms ease-out ${d}ms forwards`;
      });

      window.setTimeout(() => {
        overlay.innerHTML = '';
        outgoing.textContent = '';
        if (live) live.textContent = text;
        animatingRef.current = false;
      }, TR_TOTAL_MS + 260);
    };
    // requestAnimationFrame works in active tabs; fall back to setTimeout if
    // rAF doesn't fire within ~50ms (e.g., headless preview environments).
    let started = false;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (started) return;
      started = true;
      runBody();
    }));
    window.setTimeout(() => {
      if (started) return;
      started = true;
      runBody();
    }, 50);
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth,
        height: TITLE_BOX_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // overflow visible 允许气泡 y 轴超出标题区域
        overflow: 'visible',
      }}
    >
      <style>{`
        @keyframes tr-dot-flash { 0%{opacity:0} 15%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-erase { 0%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-appear { 0%{opacity:0} 100%{opacity:1} }
        .tr-cell{ position:absolute; width:${TR_CELL}px; height:${TR_CELL}px; opacity:0; pointer-events:none; }
      `}</style>
      {/* Outgoing text — only filled during a transition */}
      <h1
        ref={outgoingRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: 0, right: 0, top: '50%',
          transform: `translateY(-50%) scale(${scale})`,
          transformOrigin: 'center',
          fontSize: TITLE_BASE_FONT,
          lineHeight: TITLE_LH,
          fontWeight: 400,
          color: 'var(--text-n9)',
          textAlign: 'center',
          letterSpacing: 0.45,
          margin: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <h1
        ref={titleRef}
        style={{
          fontSize: TITLE_BASE_FONT,
          lineHeight: TITLE_LH,
          fontWeight: 400,
          color: 'var(--text-n9)',
          textAlign: 'center',
          letterSpacing: 0.45,
          margin: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          position: 'relative',
          zIndex: 1,
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </h1>
      {/* Dot-burst overlay */}
      <div
        ref={overlayRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'visible',
        }}
      />
    </div>
  );
}

/* ========== Mobile skill detail modal ========== */

function SkillDetailModal({
  template,
  onClose,
  onSelect,
}: {
  template: NewChatTemplate;
  onClose: () => void;
  onSelect: () => void;
}) {
  const tags = (template as CommunitySkillTemplate).tags ?? tagsForSkill(template.id);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'newchat-fade 160ms ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 360,
          background: '#ffffff',
          borderRadius: 14,
          padding: 20,
          boxShadow: '0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)',
          animation: 'newchat-fadeup 220ms ease-out',
        }}
      >
        {/* 顶部：skill 名 + 副标题（小字直接放在大字下方，避免长标题挤压） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2
            style={{
              fontFamily: "'Delight', sans-serif",
              fontSize: 18,
              lineHeight: '24px',
              fontWeight: 500,
              color: 'var(--text-n9)',
              letterSpacing: 0.18,
              margin: 0,
            }}
          >
            {template.label}
          </h2>
          <span
            style={{
              fontFamily: "'Delight', sans-serif",
              fontSize: 11,
              lineHeight: '16px',
              color: 'rgba(0,0,0,0.4)',
              letterSpacing: 0.11,
              fontWeight: 500,
            }}
          >
            {relativeTimeForSkill(template.id)}
          </span>
        </div>
        {/* 描述 */}
        <p
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 13,
            lineHeight: '20px',
            color: 'var(--text-n7)',
            letterSpacing: 0.13,
            margin: '10px 0 0',
          }}
        >
          {template.description}
        </p>
        {/* tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                height: 20,
                padding: '0 6px',
                borderRadius: 5,
                background: 'var(--b-r05)',
                color: 'var(--text-n5)',
                fontFamily: "'Delight', sans-serif",
                fontSize: 11,
                lineHeight: '20px',
                letterSpacing: 0.11,
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* 分割线（创作者行紧贴上下两条分隔线） */}
        <div style={{ height: 1, background: 'var(--line-l07)', margin: '20px 0 12px' }} />
        {/* 创建者信息行：左 avatar + 名字 / 右 socials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name={template.creator} size={36} />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Delight', sans-serif",
                  fontSize: 11,
                  lineHeight: '14px',
                  color: 'var(--text-n5)',
                  letterSpacing: 0.11,
                  fontWeight: 500,
                }}
              >
                Created by
              </div>
              <div
                style={{
                  fontFamily: "'Delight', sans-serif",
                  fontSize: 14,
                  lineHeight: '20px',
                  color: 'var(--text-n9)',
                  letterSpacing: 0.14,
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {template.creator}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {socialsForCreator(template.creator).map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '9999px',
                  background: 'var(--b-r05)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {s.render()}
              </a>
            ))}
          </div>
        </div>
        {/* Pick 按钮 */}
        {/* 分割线（按钮之上） */}
        <div style={{ height: 1, background: 'var(--line-l07)', margin: '12px 0 20px' }} />
        <button
          type="button"
          onClick={onSelect}
          style={{
            width: '100%',
            height: 44,
            border: 'none',
            borderRadius: 10,
            background: 'var(--main-m1)',
            color: '#fff',
            fontFamily: "'Delight', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 0.14,
            cursor: 'pointer',
          }}
        >
          Pick this skill
        </button>
      </div>
    </div>,
    document.body,
  );
}

/* ══════ Trending Playbooks (mirrors Explore2 grid; sits below the home hero) ══════ */

const TRENDING_GRID_COLS_MIN = 340;
const TRENDING_GRID_GAP = 16;

function TrendingPlaybooksSection({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [sort, setSort] = useState<PopularRecentSort>('Popular');
  const [selectedChips, setSelectedChips] = useState<Set<CategoryChip>>(() => new Set());
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!gridContainerRef.current) return;
    const el = gridContainerRef.current;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggleChip = (chip: CategoryChip) => {
    setSelectedChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const base = sort === 'Recent' ? [...PLAYBOOKS_ORDERED].reverse() : PLAYBOOKS_ORDERED;
    if (selectedChips.size === 0) return base;
    return base.filter((p) => {
      for (const chip of selectedChips) {
        if (chipMatchesPlaybook(chip, p)) return true;
      }
      return false;
    });
  }, [sort, selectedChips]);

  const gridStyle: React.CSSProperties = (() => {
    if (containerWidth === 0) return { display: 'grid', gap: TRENDING_GRID_GAP, width: '100%' };
    const N = Math.max(1, Math.floor((containerWidth + TRENDING_GRID_GAP) / TRENDING_GRID_COLS_MIN));
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))`,
      gap: TRENDING_GRID_GAP,
      width: '100%',
    };
  })();

  return (
    <section
      style={{
        width: '100%',
        padding: '40px 28px 60px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ fontFamily: "'Delight', sans-serif", fontSize: 20, lineHeight: '30px', letterSpacing: 0.2, color: 'var(--text-n9)' }}>
            Trending Playbooks
          </p>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              height: 28, padding: '4px 0',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: "'Delight', sans-serif", fontSize: 12, lineHeight: '20px', letterSpacing: 0.12,
              color: 'var(--text-n9)',
            }}
          >
            View all
            <CdnIcon name="arrow-right-l2" size={14} color="var(--text-n9)" />
          </button>
        </div>
        <TrendingFilterBar
          sort={sort}
          sortOptions={POPULAR_RECENT_SORT_OPTIONS}
          chips={TRENDING_FILTER_CHIPS}
          onSortChange={setSort}
          selectedChips={selectedChips}
          onChipToggle={toggleChip}
        />
        {/* Grid */}
        <div ref={gridContainerRef} style={gridStyle}>
          {filtered.map((pb, i) => (
            <div key={pb.id} style={{ width: '100%' }}>
              <ExplorePlaybookCard p={pb} staggerMs={(i % 10) * 1000} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════ MAIN COMPONENT ══════ */

const HERO_WIDTH = 960;

export default function NewChat({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [injectSignal, setInjectSignal] = useState<{ text: string; seq: number } | null>(null);
  // 点击推荐区的 push 卡 → 复用 Automations 的 feed 详情弹窗
  const [activeFeed, setActiveFeed] = useState<PushCardData | null>(null);
  const [typedText, setTypedText] = useState('');
  const [debouncedTypedText, setDebouncedTypedText] = useState('');
  const [hover, setHover] = useState<{ id: string; rect: DOMRect; placeAbove: boolean; side: 'auto' | 'left' } | null>(null);
  const [communityOpen, setCommunityOpen] = useState(false);
  // 移动端：点击药丸 / 列表项展示详情弹窗
  const [mobileDetailId, setMobileDetailId] = useState<string | null>(null);
  // 当移动端弹窗 / 抽屉打开时，给 body 加 class 用 CSS 把顶部栏让路
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const overlayOpen = !!mobileDetailId || communityOpen;
    document.body.classList.toggle('nc-overlay-open', overlayOpen);
    return () => {
      document.body.classList.remove('nc-overlay-open');
    };
  }, [mobileDetailId, communityOpen]);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640);
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const hoverHideTimerRef = useRef<number | null>(null);

  /* ── Pill hover gate — show a small loading ring at the cursor for one full
     rotation before opening the SkillInfoCard. Cancels if the user moves off
     the pill before the ring completes. ── */
  const PILL_HOVER_RING_MS = 600;
  const pillHoverTimerRef = useRef<number | null>(null);
  const pillHoverMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
  const [pillHoverRing, setPillHoverRing] = useState<{ x: number; y: number } | null>(null);

  const cancelPillHoverRing = () => {
    if (pillHoverTimerRef.current !== null) {
      window.clearTimeout(pillHoverTimerRef.current);
      pillHoverTimerRef.current = null;
    }
    if (pillHoverMoveRef.current) {
      document.removeEventListener('mousemove', pillHoverMoveRef.current);
      pillHoverMoveRef.current = null;
    }
    setPillHoverRing(null);
  };
  const startPillHoverRing = (id: string, btn: HTMLElement, originX: number, originY: number) => {
    cancelPillHoverRing();
    setPillHoverRing({ x: originX, y: originY });
    const onMove = (ev: MouseEvent) => setPillHoverRing({ x: ev.clientX, y: ev.clientY });
    document.addEventListener('mousemove', onMove);
    pillHoverMoveRef.current = onMove;
    pillHoverTimerRef.current = window.setTimeout(() => {
      cancelPillHoverRing();
      computeHover(id, btn.getBoundingClientRect());
    }, PILL_HOVER_RING_MS);
  };

  const cancelHoverHide = () => {
    if (hoverHideTimerRef.current !== null) {
      window.clearTimeout(hoverHideTimerRef.current);
      hoverHideTimerRef.current = null;
    }
  };
  const scheduleHoverHide = () => {
    cancelHoverHide();
    hoverHideTimerRef.current = window.setTimeout(() => setHover(null), 160);
  };

  const computeHover = (id: string, rect: DOMRect, side: 'auto' | 'left' = 'auto') => {
    if (side === 'left') {
      cancelHoverHide();
      setHover({ id, rect, placeAbove: false, side: 'left' });
      return;
    }
    // 决定信息卡放在 pill 上方还是下方：若同容器内还有 pill 在它下方（更靠近视口底），就放上方避开
    let placeAbove = false;
    if (pillsContainerRef.current) {
      const siblingButtons = pillsContainerRef.current.querySelectorAll('button, [role="button"]');
      siblingButtons.forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        if (r.top > rect.bottom - 1) placeAbove = true;
      });
    }
    cancelHoverHide();
    setHover({ id, rect, placeAbove, side: 'auto' });
  };
  // 加载阶段：选中后由 0 → 1 → 2，分别表示骨架展示 / 真实数据已就绪
  // promptsReady ~ 900ms, cardsReady ~ 1500ms 后置位（骨架展示更久，给真实内容入场更明显的对比）
  const [promptsReady, setPromptsReady] = useState(false);
  const [cardsReady, setCardsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTypedText(typedText), 700);
    return () => clearTimeout(t);
  }, [typedText]);

  useEffect(() => {
    if (!communityOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCommunityOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [communityOpen]);

  // 选中变化时重置加载阶段，并按节奏让真实内容入场
  useEffect(() => {
    if (!selectedId) {
      setPromptsReady(false);
      setCardsReady(false);
      return;
    }
    setPromptsReady(false);
    setCardsReady(false);
    const t1 = setTimeout(() => setPromptsReady(true), 900);
    const t2 = setTimeout(() => setCardsReady(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [selectedId]);

  const typedSuggestions = useMemo(() => generateTypedSuggestions(debouncedTypedText), [debouncedTypedText]);
  const showTypedSuggestions = !selectedId && typedSuggestions.length > 0;

  const selected: NewChatTemplate | null = useMemo(() => {
    if (!selectedId) return null;
    return (
      PRIMARY_TEMPLATES.find((t) => t.id === selectedId) ||
      OTHERS_TEMPLATES.find((t) => t.id === selectedId) ||
      COMMUNITY_TEMPLATES.find((t) => t.id === selectedId) ||
      null
    );
  }, [selectedId]);

  // 选中态推荐区的卡：skill 配了 recCards 就用，否则用 playbooks 前 3 个包成 playbook 卡
  const recCards: RecCard[] = useMemo(() => {
    if (!selected) return [];
    if (selected.recCards && selected.recCards.length) return selected.recCards;
    return selected.playbooks.slice(0, 3).map((p) => ({ type: 'playbook', playbook: p }) as RecCard);
  }, [selected]);

  // 所有 skills 合并到一个池子；首页 2 行内能放下的进 inline，其他塞进 More 下拉
  const allSkills: NewChatTemplate[] = useMemo(
    () => [...PRIMARY_TEMPLATES, ...OTHERS_TEMPLATES, ...COMMUNITY_TEMPLATES],
    [],
  );
  const morePillRef = useRef<HTMLButtonElement>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  // 直接对真实 pill 容器测量：先把所有 pill 设回可见，从尾部迭代隐藏直到 More 落在允许行数内。
  // 隐藏通过 DOM 直接 mutation；hiddenIds state 仅供 More 下拉读取。
  useLayoutEffect(() => {
    const recompute = () => {
      const container = pillsContainerRef.current;
      if (!container) return;
      const allItems = Array.from(container.querySelectorAll<HTMLElement>('button[data-skill-id]'));
      const moreWrap = container.querySelector<HTMLElement>('[data-more-wrap]');
      if (!moreWrap) return;
      // 重置
      allItems.forEach((el) => {
        el.style.display = '';
      });
      moreWrap.style.display = '';
      const hidden: string[] = [];
      // 首页与选中态统一最多 2 行
      const maxRows = 2;
      const fitsRows = () => {
        const tops = [
          ...new Set([
            ...allItems.filter((el) => el.style.display !== 'none').map((el) => el.offsetTop),
            moreWrap.offsetTop,
          ]),
        ].sort((a, b) => a - b);
        const moreRowIndex = tops.indexOf(moreWrap.offsetTop);
        return moreRowIndex >= 0 && moreRowIndex <= maxRows - 1;
      };
      let safety = allItems.length;
      while (safety-- > 0 && !fitsRows()) {
        const visible = allItems.filter((el) => el.style.display !== 'none');
        if (visible.length === 0) break;
        const last = visible[visible.length - 1];
        const id = last.dataset.skillId;
        if (id) hidden.push(id);
        last.style.display = 'none';
        void container.offsetWidth;
      }
      // 全部能放下 + More 也没必要时，把 More 隐藏
      if (hidden.length === 0) {
        moreWrap.style.display = 'none';
      }
      const next = new Set(hidden);
      const same = next.size === hiddenIds.size && [...next].every((id) => hiddenIds.has(id));
      if (!same) setHiddenIds(next);
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    if (pillsContainerRef.current) ro.observe(pillsContainerRef.current);
    window.addEventListener('resize', recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recompute);
    };
    // 注意：把 selectedId 加入依赖，确保从「选中态」回到「pill 行可见」时重新测量
  }, [allSkills, hiddenIds, selectedId]);

  const handlePillClick = (id: string) => {
    if (isMobile) {
      setMobileDetailId(id);
      setCommunityOpen(false);
      setHover(null);
      return;
    }
    setSelectedId((prev) => (prev === id ? null : id));
    setHover(null);
    setCommunityOpen(false);
  };
  const handleCommunitySelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setHover(null);
    setCommunityOpen(false);
  };
  const handleConfirmMobileSelect = () => {
    if (mobileDetailId) {
      setSelectedId(mobileDetailId);
      setMobileDetailId(null);
      setCommunityOpen(false);
    }
  };
  const handleRemoveChip = () => setSelectedId(null);
  const handlePromptClick = (text: string) => setInjectSignal({ text, seq: Date.now() });
  const handleThreadSelect = (id: string) => {
    if (id === '__agent__') onNavigate('agent');
    else onNavigate(`thread/${id}` as Page);
  };

  const hoveredTemplate = hover ? PRIMARY_TEMPLATES.find((t) => t.id === hover.id) || OTHERS_TEMPLATES.find((t) => t.id === hover.id) || COMMUNITY_TEMPLATES.find((t) => t.id === hover.id) : null;

  return (
    <AppShell activePage="new-chat" onNavigate={onNavigate}>
      <style>{`
        @keyframes newchat-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes newchat-fade{from{opacity:0}to{opacity:1}}
        @keyframes newchat-bubble-pop{
          0%{opacity:0;transform:scale(0.55)}
          55%{opacity:1;transform:scale(1.08)}
          100%{opacity:1;transform:scale(1)}
        }
        @keyframes newchat-skeleton{
          0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}
        }
        .nc-skeleton-anim{animation:newchat-skeleton 1.4s ease-in-out infinite}
        button.nc-pill{display:flex}
        .nc-chatbox-wrap .chat-input-wrapper{
          box-sizing:border-box;
        }
        .nc-chatbox-wrap .chat-input-editor-shell{
          min-height:48px;
        }
        .nc-sample-cards-grid{
          display:grid;
          grid-template-columns:repeat(3,minmax(240px,1fr));
          gap:12px;
          overflow-x:auto;
          overflow-y:visible;
          /* 给 hover 阴影 + 末卡右侧留出空间，避免 overflow 裁切 */
          padding:16px 20px 28px 20px;
          overscroll-behavior-x:contain;
          -webkit-overflow-scrolling:touch;
          scrollbar-width:none;
        }
        .nc-sample-cards-grid::-webkit-scrollbar{
          display:none;
        }
        .nc-prompts-list{
          display:flex;
          flex-direction:column;
          width:100%;
        }
        .nc-prompt-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          height:46px;
          min-height:46px;
          max-height:46px;
          flex:0 0 46px;
          box-sizing:border-box;
          padding:12px;
          background:transparent;
          border:none;
          border-radius:0;
          overflow:hidden;
          text-align:left;
          cursor:pointer;
          width:100%;
          transition:background 0.15s;
        }
        .nc-prompts-list > .nc-prompt-row:not(:last-child),
        .nc-prompts-list > .nc-prompt-skeleton-row:not(:last-child){
          border-bottom:0.5px solid var(--line-l12);
        }
        .nc-prompt-text{
          flex:1;
          min-width:0;
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:22px;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .newchat-page-topbar{display:none}
          /* mobile pill：尺寸更小，单行能放更多 */
          .nc-pill{
            height:40px !important;
            padding:0 14px !important;
            font-size:14px !important;
            line-height:22px !important;
            gap:8px !important;
            letter-spacing:0.14px !important;
          }
          .nc-pill > img,
          .nc-pill > div[class*="rounded-full"]{
            width:22px !important;
            height:22px !important;
            min-width:22px !important;
            min-height:22px !important;
          }
          .nc-pill > div[role="img"],
          .nc-pill .block{
            width:16px !important;
            height:16px !important;
          }
          .nc-hero-section{
            padding:56px 16px 12px !important;
            gap:24px !important;
          }
          /* 移动端输入框内边距收紧 */
          .chat-input-wrapper{
            padding:12px !important;
            gap:8px !important;
          }
          .nc-chatbox-wrap .chat-input-wrapper{
            min-height:0;
          }
          .nc-chatbox-wrap .chat-input-editor-shell{
            flex:initial;
          }
          .nc-prompts-container{
            margin-top:0 !important;
            max-width:none !important;
          }
          .nc-prompt-row{
            padding:12px 4px;
            background:transparent;
            border-radius:0;
            margin-bottom:0;
          }
          .nc-prompt-text{
            font-size:13px;
            line-height:20px;
          }
          .nc-cards-section{
            padding:12px 0 80px 16px !important;
            margin-top:24px !important;
          }
        }
        @media (hover: hover){
          .nc-creator-link:hover{background:var(--b-r05)}
          .nc-creator-link:hover .nc-creator-link-name{color:var(--main-m1);text-decoration:underline;text-underline-offset:2px}
        }
        .more-skills-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          right:0;
          width:320px;
          background:#fff;
          border:0.5px solid var(--line-l2);
          border-radius:8px;
          box-shadow:var(--shadow-s);
          z-index:20;
          animation:newchat-fadeup 160ms ease-out;
          overflow:hidden;
        }
        .more-skills-dropdown-scroll{
          max-height:360px;
          overflow-y:auto;
          padding:6px;
        }
        .more-skill-row{
          display:flex;
          align-items:center;
          gap:10px;
          width:100%;
          padding:8px 12px;
          border:none;
          background:transparent;
          text-align:left;
          cursor:pointer;
          border-radius:8px;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover{
            background:var(--b-r05);
          }
        }
        .more-skills-backdrop{display:none}
        .more-skills-header{display:none}
        @media (max-width: 639px){
          .more-skills-backdrop{
            display:block;
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.45);
            z-index:9998;
            animation:newchat-fade 200ms ease-out;
          }
          .more-skills-dropdown{
            position:fixed !important;
            z-index:9999 !important;
            top:auto !important;
            right:0 !important;
            left:0 !important;
            bottom:0 !important;
            width:100% !important;
            border-radius:14px 14px 0 0 !important;
            animation:newchat-sheet-up 220ms cubic-bezier(0.2,0.8,0.2,1);
          }
          .more-skills-dropdown::before{
            content:"";
            display:block;
            width:36px;
            height:4px;
            border-radius:2px;
            background:rgba(0,0,0,0.18);
            margin:8px auto 4px;
          }
          .more-skills-header{
            display:flex !important;
            align-items:center;
            justify-content:space-between;
            padding:14px 16px 8px;
          }
          .more-skills-title{
            font-family:'Delight',sans-serif;
            font-size:16px;
            line-height:22px;
            font-weight:500;
            color:var(--text-n9);
            letter-spacing:0.16px;
          }
          .more-skills-close{
            width:24px;
            height:24px;
            border:none;
            background:transparent;
            padding:0;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
          }
          .more-skills-dropdown-scroll{
            max-height:60vh !important;
            padding:4px 12px 32px !important;
            display:flex !important;
            flex-direction:column;
            gap:8px;
          }
          .more-skill-row{
            padding:18px 16px !important;
            background:var(--b-r05) !important;
            border-radius:12px !important;
            gap:14px !important;
          }
          .more-skill-row:active{
            background:var(--b-r07) !important;
          }
          .more-skill-name{
            font-size:15px !important;
            line-height:20px !important;
          }
          .more-skill-author{
            font-size:13px !important;
            line-height:18px !important;
          }
          /* 移动端 sheet 行底色已是灰，icon tile 用白色避免叠灰 */
          .more-skill-icon-wrap{
            background:#fff !important;
          }
        }
        @keyframes newchat-sheet-up{
          from{transform:translateY(100%)}
          to{transform:translateY(0)}
        }
        .more-skill-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .more-skill-name{
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:20px;
          font-weight:400;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-icon-wrap{
          width:32px;
          height:32px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          /* 桌面默认灰底，hover 时变白让 icon 浮起 */
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover .more-skill-icon-wrap{
            background:#fff;
          }
        }
        /* 圆头像加弱边框，避免在灰底上融掉 */
        .more-skill-row > div[class*="rounded-full"],
        .more-skill-row > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }


      `}</style>
      <div className="h-screen overflow-y-auto relative" style={{ backgroundColor: 'var(--b0-container, #ffffff)' }}>
        {/* ══════ Topbar — 在移动端由 AppShell 的 mobile topbar 接管，这里隐藏 ══════ */}
        <div
          className="flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar"
          style={{ position: 'sticky', top: 0, zIndex: 5, background: 'var(--b0-container, #ffffff)' }}
        >
          <div className="flex-1 min-w-0">
            <ThreadSwitcherDropdown
              activeId="new"
              onSelect={handleThreadSelect}
              trigger={
                <div className="flex gap-[4px] items-center min-w-0 cursor-pointer">
                  <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
                    New Chat
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2)" />
                </div>
              }
            />
          </div>
        </div>

        {/* ══════ HERO ══════ */}
        <section
          className="nc-hero-section"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 36,
            padding: '24px 28px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <TitleHero selected={selected} maxWidth={HERO_WIDTH} />

          {/* 输入框 */}
          <div className="nc-chatbox-wrap" style={{ width: '100%', maxWidth: HERO_WIDTH, position: 'relative', zIndex: 1 }}>
            <ChatInput
              shadow
              hideSkill
              hideInspector
              allowReferences={false}
              bottomChip={
                selected
                  ? {
                      label: selected.label,
                      icon: selected.kol ? undefined : selected.icon ?? CHIP_ICON,
                      avatar: selected.kol ? selected.creator : undefined,
                      creator: selected.creator,
                      onRemove: handleRemoveChip,
                      onHover: (rect) => computeHover(selected.id, rect),
                      onLeave: scheduleHoverHide,
                    }
                  : null
              }
              injectText={injectSignal}
              onInputChange={setTypedText}
            />
          </div>

          {/* 输入触发的 typed suggestions */}
          {showTypedSuggestions && (
            <div
              key={debouncedTypedText}
              className="nc-prompts-container"
              style={{
                width: '100%',
                maxWidth: HERO_WIDTH,
                position: 'relative',
                zIndex: 1,
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="nc-prompts-list">
                {typedSuggestions.map((p, i) => (
                  <InlineSuggestionRow
                    key={i}
                    text={p}
                    index={i}
                    onClick={() => handlePromptClick(p)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* skill pills — 未选中时展示。所有 pill + More 始终渲染在同一个容器；
            布局测量时直接 mutate display:none 把溢出的 pill 隐藏（state 仅供 More 下拉用）。 */}
          {!showTypedSuggestions && (
            <div
              ref={pillsContainerRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                justifyContent: 'center',
                paddingTop: 12,
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: 900,
              }}
            >
              {allSkills.map((t) => {
                const isActive = selectedId === t.id;
                return (
                <SkillChip
                  key={t.id}
                  data-skill-id={t.id}
                  className="nc-pill"
                  label={t.label}
                  active={isActive}
                  icon={t.kol ? undefined : t.icon}
                  avatar={
                    t.kol ? (
                      t.avatarSrc ? (
                        <img src={`${import.meta.env.BASE_URL}avatars/${t.avatarSrc}`} alt="" className="size-[22px] shrink-0 rounded-full object-cover" />
                      ) : (
                        <Avatar name={t.creator} size={22} />
                      )
                    ) : undefined
                  }
                  onClick={() => handlePillClick(t.id)}
                  onMouseEnter={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    startPillHoverRing(t.id, e.currentTarget, e.clientX, e.clientY);
                  }}
                  onMouseLeave={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    cancelPillHoverRing();
                    scheduleHoverHide();
                  }}
                />
                );
              })}
              {<div ref={communityRef} data-more-wrap style={{ position: 'relative' }}>
                <SkillChip
                  ref={morePillRef}
                  className="nc-pill"
                  aria-expanded={communityOpen}
                  aria-label="More skills"
                  label="More"
                  trailing={<CdnIcon name="arrow-right-l2" size={14} color="var(--text-n5)" />}
                  style={communityOpen ? { background: '#f3f8f8', border: '0.5px solid rgba(73,163,166,0.45)' } : undefined}
                  onMouseEnter={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={() => {
                    setCommunityOpen((v) => !v);
                    setHover(null);
                  }}
                />
              </div>}
            </div>
          )}

          {/* 选中后输入框下方的 prompts —— 先骨架，再淡入真实 */}
          {selected && (
            <div
              className="nc-prompts-container"
              style={{
                width: '100%',
                maxWidth: HERO_WIDTH,
                position: 'relative',
                zIndex: 1,
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {!promptsReady ? (
                <div className="nc-prompts-list nc-skeleton-anim" style={{ animation: 'newchat-fade 200ms ease-out' }}>
                  <PromptRowSkeleton widthPct={92} />
                  <PromptRowSkeleton widthPct={70} />
                  <PromptRowSkeleton widthPct={82} />
                </div>
              ) : (
                <div className="nc-prompts-list" style={{ animation: 'newchat-fade 280ms ease-out' }}>
                  {selected.prompts.slice(0, 3).map((p, i) => (
                    <InlineSuggestionRow
                      key={i}
                      text={p}
                      index={i}
                      onClick={() => handlePromptClick(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 选中态推荐卡 —— 并入 hero section，共用 gap；overflow 可见不裁切阴影/末卡 */}
          {/* 两行布局（Figma 7825:70590）：第一行 3 张 playbook 卡，第二行 2 张 push 卡 */}
          {selected && (
            <div
              key={selected.id}
              style={{
                width: '100%',
                maxWidth: HERO_WIDTH,
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {!cardsReady ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="nc-skeleton-anim" style={{ animation: 'newchat-fade 200ms ease-out' }}>
                      <PlaybookCardSkeleton />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
                    {recCards.flatMap((c) => (c.type === 'playbook' ? [c.playbook] : [])).slice(0, 3).map((p, i) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          sessionStorage.setItem('autoOpenChatPanel', '1');
                          onNavigate('new-chat');
                        }}
                        style={{
                          animation: 'newchat-fadeup 360ms ease-out both',
                          animationDelay: `${i * 50}ms`,
                        }}
                      >
                        <ExplorePlaybookCard p={toExplorePlaybook(p, selected.id)} staggerMs={i * 1000} />
                      </div>
                    ))}
                  </div>
                  {(() => {
                    /* push 卡内容区绝对定位不撑高，行高按 Figma 固定 281.5；只有 1 张时占满整行 */
                    const pushes = recCards.flatMap((c) => (c.type === 'push' ? [c.push] : [])).slice(0, 2);
                    if (pushes.length === 0) return null;
                    return (
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${pushes.length}, minmax(0, 1fr))`, gap: 16, gridAutoRows: 281.5 }}>
                      {pushes.map((push, i) => (
                        <div
                          key={push.id}
                          onClick={() => setActiveFeed(push)}
                          style={{
                            height: '100%',
                            cursor: 'pointer',
                            animation: 'newchat-fadeup 360ms ease-out both',
                            animationDelay: `${(i + 3) * 50}ms`,
                          }}
                        >
                          <AutomationCard a={push} />
                        </div>
                      ))}
                    </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}
        </section>

        {/* ══════ Trending Playbooks ══════ */}
        {!showTypedSuggestions && (
          <TrendingPlaybooksSection onNavigate={onNavigate} />
        )}
      </div>

      {hover && hoveredTemplate && (
        <SkillInfoCard
          template={hoveredTemplate}
          anchor={hover.rect}
          placeAbove={hover.placeAbove}
          side={hover.side}
          onMouseEnter={cancelHoverHide}
          onMouseLeave={scheduleHoverHide}
        />
      )}
      {pillHoverRing && (
        <div
          aria-hidden
          style={{
            position: 'fixed',
            left: pillHoverRing.x + 14,
            top: pillHoverRing.y + 14,
            width: 16,
            height: 16,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
            <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.6" />
            <circle
              cx="8" cy="8" r="6"
              fill="none"
              stroke="var(--main-m1)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 6}
              strokeDashoffset={2 * Math.PI * 6}
              transform="rotate(-90 8 8)"
              style={{
                animation: `nc-pill-ring-fill ${PILL_HOVER_RING_MS}ms linear forwards`,
              }}
            />
          </svg>
          <style>{`
            @keyframes nc-pill-ring-fill {
              from { stroke-dashoffset: ${2 * Math.PI * 6}; }
              to   { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>
      )}
      {communityOpen && (
        <SkillsLibraryPanel
          skills={allSkills}
          selectedId={selectedId}
          onSelect={handleCommunitySelect}
          onClose={() => setCommunityOpen(false)}
        />
      )}
      {mobileDetailId && (() => {
        const tmpl = allSkills.find((s) => s.id === mobileDetailId);
        if (!tmpl) return null;
        return (
          <SkillDetailModal
            template={tmpl}
            onClose={() => setMobileDetailId(null)}
            onSelect={handleConfirmMobileSelect}
          />
        );
      })()}

      {/* 推荐区 push 卡的 feed 详情弹窗（复用 Automations 的 FeedDetailModal） */}
      <FeedDetailModal
        open={!!activeFeed}
        onClose={() => setActiveFeed(null)}
        feedName={activeFeed?.feedName ?? ''}
        alerts={activeFeed ? [activeFeed] : undefined}
        description="This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers the cards and alerts above. Open Settings → Automations to view full run logs and manage it."
      />
    </AppShell>
  );
}
