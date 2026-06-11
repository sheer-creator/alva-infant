/**
 * [INPUT]: production automations-pill hover card (screenshot baseline) + 方案 A/B 布局参数
 * [OUTPUT]: Automation hover popover 三方案对比 demo — Current / Rebalanced table / Two-line list
 * [POS]: Demo 页 — playbook header automations pill 悬浮卡布局提案
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

type AutoStatus = 'active' | 'paused';

interface AutoRow {
  id: string;
  name: string;
  interval: string;
  lastRun: string;
  status: AutoStatus;
}

/* 病态数据故意保留：前 2 条共享前缀(暴露同样截断)、第 3 条超长、第 4 条初始 paused */
const ALL_ROWS: AutoRow[] = [
  { id: 'hourly', name: 'ophirgottlieb-tweet-tracker-hourly', interval: '1 hour', lastRun: 'a few seconds ago', status: 'active' },
  { id: 'daily', name: 'ophirgottlieb-tweet-tracker-daily', interval: '1 day', lastRun: '1 hour ago', status: 'active' },
  { id: '13f', name: 'sec-13f-whale-position-diff-quarterly-scan', interval: '1 week', lastRun: '2 days ago', status: 'active' },
  { id: 'funding', name: 'btc-funding-rate-anomaly-monitor', interval: '15 minutes', lastRun: '3 minutes ago', status: 'paused' },
];

/* ========== 共用原子 ========== */

function Dot({ active }: { active: boolean }) {
  return (
    <span className="relative size-[12px] shrink-0">
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: active ? '#DBEDED' : 'var(--b-r07, rgba(0,0,0,0.07))' }}
      />
      <span
        className="absolute left-1/2 top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: active ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.3)' }}
      />
    </span>
  );
}

/* 中间省略：头部弹性截断、尾部固定保留 — 同前缀名也能区分 */
function MiddleTruncate({ text, tail = 13, color }: { text: string; tail?: number; color: string }) {
  if (text.length <= tail + 8) {
    return (
      <p className="min-w-0 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ color, fontFamily: FONT }} title={text}>
        {text}
      </p>
    );
  }
  return (
    <p className="flex min-w-0 text-[14px] leading-[22px] tracking-[0.14px]" style={{ color, fontFamily: FONT }} title={text}>
      <span className="min-w-0 truncate">{text.slice(0, -tail)}</span>
      <span className="shrink-0">{text.slice(-tail)}</span>
    </p>
  );
}

function RowPauseButton({ status, onToggle }: { status: AutoStatus; onToggle: () => void }) {
  const active = status === 'active';
  return (
    <button
      type="button"
      aria-label={active ? 'Pause' : 'Resume'}
      title={active ? 'Pause' : 'Resume'}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex size-[24px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-colors hover:bg-[var(--b-r05,rgba(0,0,0,0.05))]"
    >
      <CdnIcon name={active ? 'pause-l2' : 'play-f'} size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
    </button>
  );
}

function Chevron() {
  return (
    <span className="flex size-[12px] shrink-0 items-center justify-center">
      <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
    </span>
  );
}

/* ========== 每个变体独立的行状态 ========== */

function useRows(initial: AutoRow[]) {
  const [rows, setRows] = useState(initial);
  const toggle = (id: string) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: r.status === 'active' ? 'paused' : 'active' } : r)));
  const allPaused = rows.length > 0 && rows.every((r) => r.status === 'paused');
  const toggleAll = () => setRows((rs) => rs.map((r) => ({ ...r, status: allPaused ? 'active' : 'paused' })));
  return { rows, toggle, allPaused, toggleAll };
}

/* ========== Popover 壳 + header ========== */

function PopoverShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-[600px] max-w-full overflow-hidden rounded-[12px] bg-white"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: 'var(--shadow-s, 0 6px 20px 0 rgba(0,0,0,0.04))' }}
    >
      {children}
    </div>
  );
}

function PopoverHeader({
  lastUpdated,
  allPaused,
  adaptive,
  onToggleAll,
}: {
  lastUpdated: string;
  allPaused: boolean;
  /** false = 复刻现状(永远 Pause all)；true = 全部暂停时翻转为 Resume all */
  adaptive: boolean;
  onToggleAll: () => void;
}) {
  const resume = adaptive && allPaused;
  return (
    <div className="flex items-center justify-between px-[20px] pb-[12px] pt-[16px]">
      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
        Last Updated: {lastUpdated}
      </p>
      <button
        type="button"
        onClick={onToggleAll}
        className="flex cursor-pointer items-center gap-[6px] border-none bg-transparent p-0 transition-opacity hover:opacity-60"
      >
        <CdnIcon name={resume ? 'play-f' : 'pause-l2'} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
          {resume ? 'Resume all' : 'Pause all'}
        </span>
      </button>
    </div>
  );
}

/* footer 两档：row = 与数据行同构(现状)；deemphasized = 降级为次级入口 */
function PopoverFooter({ variant }: { variant: 'row' | 'deemphasized' }) {
  const row = variant === 'row';
  return (
    <div className="w-full cursor-pointer px-[20px] transition-colors hover:bg-[rgba(0,0,0,0.02)]" role="button" tabIndex={0}>
      <div className={`flex w-full items-center justify-between ${row ? 'py-[12px]' : 'pb-[10px] pt-[8px]'}`}>
        <p
          className={row ? 'text-[14px] leading-[22px] tracking-[0.14px]' : 'text-[12px] leading-[20px] tracking-[0.12px]'}
          style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}
        >
          View all automations in Settings
        </p>
        <span className="flex size-[12px] shrink-0 items-center justify-center">
          <CdnIcon name="arrow-right-l2" size={row ? 12 : 10} color="var(--text-n5, rgba(0,0,0,0.5))" />
        </span>
      </div>
    </div>
  );
}

const hairline = { borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' };

/* ========== 变体 1 — Current（复刻截图） ========== */

function VariantCurrent({ initial }: { initial: AutoRow[] }) {
  const { rows, toggle, allPaused, toggleAll } = useRows(initial);
  const colHead = 'text-[14px] leading-[22px] tracking-[0.14px]';
  return (
    <PopoverShell>
      <PopoverHeader lastUpdated={initial[0].lastRun} allPaused={allPaused} adaptive={false} onToggleAll={toggleAll} />
      <div className="px-[20px]">
        <div className="flex w-full items-center gap-[8px] py-[10px]" style={{ borderTop: '1px solid var(--line-l07, rgba(0,0,0,0.07))', ...hairline }}>
          <p className={`flex-1 min-w-0 ${colHead}`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>Automation</p>
          <p className={`w-[150px] ${colHead}`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>Interval</p>
          <p className={`w-[150px] ${colHead}`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>Last Run</p>
          <div className="w-[48px] shrink-0" />
        </div>
      </div>
      {rows.map((r) => (
        <div key={r.id} className="w-full cursor-pointer px-[20px] transition-colors hover:bg-[rgba(0,0,0,0.02)]">
          <div className="flex w-full items-center gap-[8px] py-[12px]" style={hairline}>
            <div className="flex flex-1 min-w-0 items-center gap-[8px]">
              <Dot active={r.status === 'active'} />
              {/* 现状：普通尾部截断 — 同前缀名显示成一样 */}
              <p className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
                {r.name}
              </p>
            </div>
            <p className="w-[150px] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>{r.interval}</p>
            <p className="w-[150px] truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>{r.lastRun}</p>
            <div className="flex shrink-0 items-center gap-[12px]">
              <RowPauseButton status={r.status} onToggle={() => toggle(r.id)} />
              <Chevron />
            </div>
          </div>
        </div>
      ))}
      <PopoverFooter variant="row" />
    </PopoverShell>
  );
}

/* ========== 变体 2 — Option A · Rebalanced table ========== */

function VariantTable({ initial }: { initial: AutoRow[] }) {
  const { rows, toggle, allPaused, toggleAll } = useRows(initial);
  const colHead = 'text-[12px] leading-[20px] tracking-[0.12px]';
  return (
    <PopoverShell>
      <PopoverHeader lastUpdated={initial[0].lastRun} allPaused={allPaused} adaptive onToggleAll={toggleAll} />
      <div className="px-[20px]">
        <div className="flex w-full items-center gap-[8px] py-[8px]" style={{ borderTop: '1px solid var(--line-l07, rgba(0,0,0,0.07))', ...hairline }}>
          <p className={`flex-1 min-w-0 ${colHead}`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>Automation</p>
          <p className={`w-[80px] ${colHead}`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>Interval</p>
          <p className={`w-[120px] ${colHead}`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>Last Run</p>
          <div className="w-[48px] shrink-0" />
        </div>
      </div>
      {rows.map((r) => (
        <div key={r.id} className="w-full cursor-pointer px-[20px] transition-colors hover:bg-[rgba(0,0,0,0.02)]">
          <div className="flex w-full items-center gap-[8px] py-[12px]" style={hairline}>
            <div className="flex flex-1 min-w-0 items-center gap-[8px]">
              <Dot active={r.status === 'active'} />
              <MiddleTruncate text={r.name} color="var(--text-n9, rgba(0,0,0,0.9))" />
            </div>
            <p className="w-[80px] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>{r.interval}</p>
            <p className="w-[120px] truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>{r.lastRun}</p>
            <div className="flex shrink-0 items-center gap-[12px]">
              <RowPauseButton status={r.status} onToggle={() => toggle(r.id)} />
              <Chevron />
            </div>
          </div>
        </div>
      ))}
      <PopoverFooter variant="deemphasized" />
    </PopoverShell>
  );
}

/* ========== 变体 3 — Option B · Two-line list（推荐） ========== */

function VariantTwoLine({ initial }: { initial: AutoRow[] }) {
  const { rows, toggle, allPaused, toggleAll } = useRows(initial);
  return (
    <PopoverShell>
      <PopoverHeader lastUpdated={initial[0].lastRun} allPaused={allPaused} adaptive onToggleAll={toggleAll} />
      <div className="mx-[20px]" style={{ borderTop: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }} />
      {rows.map((r) => {
        const active = r.status === 'active';
        return (
          <div key={r.id} className="w-full cursor-pointer px-[20px] transition-colors hover:bg-[rgba(0,0,0,0.02)]">
            <div className="flex w-full items-center gap-[12px] py-[10px]" style={hairline}>
              <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                <div className="flex items-center gap-[6px]">
                  <Dot active={active} />
                  <MiddleTruncate text={r.name} color="var(--text-n9, rgba(0,0,0,0.9))" />
                </div>
                <p className="pl-[18px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
                  {!active && <span style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Paused · </span>}
                  Every {r.interval} · Last run {r.lastRun}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-[12px]">
                <RowPauseButton status={r.status} onToggle={() => toggle(r.id)} />
                <Chevron />
              </div>
            </div>
          </div>
        );
      })}
      <PopoverFooter variant="deemphasized" />
    </PopoverShell>
  );
}

/* ========== 上下文 pill（触发锚点示意） ========== */

function AnchorPill({ count, lastUpdated }: { count: number; lastUpdated: string }) {
  return (
    <div
      className="inline-flex h-[32px] items-center gap-[8px] rounded-full px-[12px]"
      style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))', border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))' }}
    >
      <Dot active />
      <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
        {count} Automation{count === 1 ? '' : 's'}
      </span>
      <span className="text-[14px]" style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))', fontFamily: FONT }}>·</span>
      <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
        {lastUpdated}
      </span>
    </div>
  );
}

/* ========== Section 包装 ========== */

function VariantSection({
  eyebrow,
  recommended,
  title,
  points,
  children,
}: {
  eyebrow: string;
  recommended?: boolean;
  title: string;
  points: string[];
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-[14px]">
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
            {eyebrow}
          </span>
          {recommended && (
            <span
              className="rounded-[4px] px-[6px] py-[1px] text-[11px] font-medium leading-[16px] tracking-[0.11px]"
              style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))', color: 'var(--main-m1, #49A3A6)', fontFamily: FONT }}
            >
              Recommended
            </span>
          )}
        </div>
        <h3 className="m-0 text-[18px] font-medium leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
          {title}
        </h3>
        <ul className="m-0 flex list-disc flex-col gap-[2px] pl-[18px]">
          {points.map((p) => (
            <li key={p} className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
              {p}
            </li>
          ))}
        </ul>
      </div>
      {children}
    </section>
  );
}

/* ========== Demo 主组件 ========== */

export function AutomationPopoverDemo() {
  const [count, setCount] = useState(2);
  const rows = ALL_ROWS.slice(0, count);

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="m-0 text-[22px] font-medium leading-[32px] tracking-[0.22px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
          Automation popover — layout options
        </h2>
        <p className="m-0 max-w-[68ch] text-[14px] leading-[24px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
          The hover card anchored to the automations pill in the playbook header. Same data across all three layouts — rows 1 and 2 share a long prefix on purpose, row 3 is extra long, row 4 starts paused. Pause buttons and Pause all are live in every variant.
        </p>
      </div>

      <div className="flex items-center gap-[16px]">
        <AnchorPill count={count} lastUpdated={rows[0].lastRun} />
        <div className="flex items-center gap-[6px]">
          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>Rows</span>
          {[1, 2, 4].map((n) => {
            const active = n === count;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                className="flex h-[26px] min-w-[32px] cursor-pointer items-center justify-center rounded-full px-[10px] text-[12px] leading-[18px] tracking-[0.12px] transition-colors"
                style={{
                  background: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : '#fff',
                  color: active ? '#fff' : 'var(--text-n7, rgba(0,0,0,0.7))',
                  border: active ? '1px solid var(--text-n9, rgba(0,0,0,0.9))' : '1px solid var(--line-l12, rgba(0,0,0,0.12))',
                  fontFamily: FONT,
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-[40px]">
        <VariantSection
          eyebrow="Current"
          title="Production layout"
          points={[
            'Interval and Last Run columns are over-allocated, so names sharing a prefix truncate into identical strings.',
            'The Settings footer is styled exactly like a data row — it reads as one more automation.',
            '"Pause all" keeps the same label even when everything is already paused.',
          ]}
        >
          <VariantCurrent key={`c-${count}`} initial={rows} />
        </VariantSection>

        <VariantSection
          eyebrow="Option A"
          title="Rebalanced table"
          points={[
            'Name column absorbs the width freed from Interval (80px) and Last Run (120px).',
            'Truncation preserves the tail, so the distinguishing suffix (-hourly / -daily) always stays visible.',
            'Footer drops to 12px secondary style; Pause all flips to Resume all when everything is paused.',
          ]}
        >
          <VariantTable key={`a-${count}`} initial={rows} />
        </VariantSection>

        <VariantSection
          eyebrow="Option B"
          recommended
          title="Two-line list"
          points={[
            'No header row — with metadata phrased inline ("Every 1 hour · Last run …"), column labels add nothing.',
            'The name owns the full card width, so even the longest names rarely truncate.',
            'Paused state also reads as text on the second line, not just a grey dot.',
          ]}
        >
          <VariantTwoLine key={`b-${count}`} initial={rows} />
        </VariantSection>
      </div>
    </div>
  );
}
