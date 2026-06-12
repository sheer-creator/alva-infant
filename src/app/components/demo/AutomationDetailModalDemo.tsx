/**
 * [INPUT]: Automations detail modal screenshot and IA discussion
 * [OUTPUT]: Automation detail modal classification-structure demos
 * [POS]: Demo page - Settings Automations detail modal IA options
 */

import { useState, type ReactNode } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

type Tone = 'good' | 'warn' | 'bad' | 'neutral';

const SIGNALS = [
  { ticker: 'NVDA', logo: 'N', action: 'Buy', detail: 'weight 38.2%', tone: 'good' as Tone },
  { ticker: 'AAPL', logo: 'A', action: 'Buy', detail: 'weight 31.4%', tone: 'good' as Tone },
  { ticker: 'TSLA', logo: 'T', action: 'Sell', detail: 'exit position', tone: 'bad' as Tone },
];

const RUNS = [
  { id: '#142', result: '3 signals', duration: '3.2s', started: 'Apr 1, 14:00', status: 'success' as const },
  { id: '#141', result: 'No change', duration: '3.1s', started: 'Apr 1, 13:55', status: 'success' as const },
  { id: '#140', result: '1 update', duration: '3.4s', started: 'Apr 1, 13:50', status: 'success' as const },
  { id: '#139', result: 'Data warning', duration: '4.8s', started: 'Apr 1, 13:45', status: 'warning' as const },
  { id: '#138', result: 'No change', duration: '3.2s', started: 'Apr 1, 13:40', status: 'success' as const },
];

const CONFIG = [
  { label: 'Trigger', value: 'Every 5 minutes' },
  { label: 'Source', value: 'ai-infra-basket' },
  { label: 'Output', value: 'Telegram + Playbook cards' },
  { label: 'Subscribers', value: '184 active' },
];

const FEED_DESCRIPTION =
  "This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers cards and alerts.";

function toneColor(tone: Tone) {
  if (tone === 'good') return 'var(--main-m3, #2A9B7D)';
  if (tone === 'warn') return '#E6A91A';
  if (tone === 'bad') return 'var(--main-m4, #D94A4A)';
  return 'var(--text-n7, rgba(0,0,0,0.7))';
}

function StatusDot({ tone = 'good', size = 14 }: { tone?: Tone; size?: number }) {
  const color = toneColor(tone);
  return (
    <span className="relative shrink-0" style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full" style={{ background: tone === 'good' ? '#DBEDED' : 'var(--b-r07, rgba(0,0,0,0.07))' }} />
      <span className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: color }} />
    </span>
  );
}

function IconButton({ icon, label, primary = false }: { icon: string; label: string; primary?: boolean }) {
  return (
    <button
      type="button"
      className="inline-flex h-[30px] shrink-0 items-center gap-[6px] rounded-[6px] border px-[10px] text-[12px] leading-[18px] tracking-[0.12px] transition-opacity hover:opacity-70"
      style={{
        background: primary ? 'var(--text-n9, rgba(0,0,0,0.9))' : '#fff',
        borderColor: primary ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--line-l12, rgba(0,0,0,0.12))',
        color: primary ? '#fff' : 'var(--text-n9, rgba(0,0,0,0.9))',
        fontFamily: FONT,
      }}
    >
      <CdnIcon name={icon} size={14} color={primary ? '#fff' : 'var(--text-n9, rgba(0,0,0,0.9))'} />
      <span>{label}</span>
    </button>
  );
}

function HeaderIconButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex size-[30px] shrink-0 items-center justify-center rounded-[6px] border border-[var(--line-l12,rgba(0,0,0,0.12))] bg-white transition-opacity hover:opacity-70"
    >
      <CdnIcon name={icon} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
    </button>
  );
}

function ModalHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-[12px] sm:flex-row sm:items-start sm:justify-between sm:gap-[20px]">
      <div className="flex min-w-0 flex-col gap-[5px]">
        <div className="flex min-w-0 items-center gap-[8px]">
          <StatusDot />
          <h3
            className={`${compact ? 'text-[18px] leading-[28px] tracking-[0.18px]' : 'text-[22px] leading-[32px] tracking-[0.22px]'} m-0 truncate font-normal`}
            style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}
          >
            ai-infra-rebalance
          </h3>
        </div>
        <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
          Last run 15m ago <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}> | </span> Every 5 minutes
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-[8px]">
        <HeaderIconButton icon="pause-l2" label="Pause automation" />
        <HeaderIconButton icon="delete-l" label="Delete automation" />
        <button type="button" className="flex size-[30px] items-center justify-center rounded-[6px] border-0 bg-transparent">
          <CdnIcon name="close-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
      </div>
    </div>
  );
}

function TickerBadge({ logo, tone }: { logo: string; tone: Tone }) {
  return (
    <span
      className="flex size-[24px] shrink-0 items-center justify-center rounded-full text-[12px] font-medium leading-[16px] tracking-[0.12px]"
      style={{
        background: tone === 'bad' ? 'rgba(217,74,74,0.10)' : 'var(--main-m1-10, rgba(73,163,166,0.1))',
        color: toneColor(tone),
        fontFamily: FONT,
      }}
    >
      {logo}
    </span>
  );
}

function SignalRows({ dense = false }: { dense?: boolean }) {
  return (
    <div className={`flex flex-col ${dense ? 'gap-[6px]' : 'gap-[8px]'}`}>
      {SIGNALS.map((signal) => (
        <div key={signal.ticker} className="flex min-w-0 items-center gap-[8px]">
          <TickerBadge logo={signal.logo} tone={signal.tone} />
          <p className="m-0 min-w-0 flex-1 truncate text-[15px] leading-[24px] tracking-[0.15px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
            {signal.action} <span style={{ color: signal.tone === 'bad' ? toneColor('bad') : 'var(--main-m1, #49A3A6)' }}>{signal.ticker}</span> {signal.detail}
          </p>
          <CdnIcon name={signal.tone === 'bad' ? 'arrow-down-f2' : 'arrow-up-f1'} size={14} color={toneColor(signal.tone)} />
        </div>
      ))}
    </div>
  );
}

function LatestOutput({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`flex flex-col gap-[12px] rounded-[8px] ${compact ? 'p-[14px]' : 'p-[16px]'}`}
      style={{ background: 'var(--grey-g01, #fafafa)' }}
    >
      <div className="flex items-center justify-between gap-[12px]">
        <div className="flex min-w-0 flex-col">
          <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
            Latest output
          </p>
          <p className="m-0 truncate text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
            May 8, 12:00 PM · ai-infra-basket · run #142
          </p>
        </div>
        <span className="shrink-0 rounded-[4px] px-[6px] py-[2px] text-[11px] font-medium leading-[16px] tracking-[0.11px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))', color: 'var(--main-m1, #49A3A6)', fontFamily: FONT }}>
          Published
        </span>
      </div>
      <SignalRows dense={compact} />
      <p className="m-0 text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
        Rebalance: Top 3 by capex revisions: NVDA(38.2%), AAPL(31.4%), RKLB(30.4%)
      </p>
    </section>
  );
}

function RecentAlertsCard() {
  return (
    <div className="flex flex-col gap-[12px] rounded-[8px] p-[16px]" style={{ background: 'var(--grey-g01, #fafafa)' }}>
      <div className="flex items-center justify-between gap-[12px]">
        <p className="m-0 min-w-0 truncate text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
          May 8, 12:00 PM · ai-infra-basket · run #142
        </p>
        <span className="shrink-0 rounded-[4px] px-[6px] py-[2px] text-[11px] font-medium leading-[16px] tracking-[0.11px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))', color: 'var(--main-m1, #49A3A6)', fontFamily: FONT }}>
          Published
        </span>
      </div>
      <SignalRows />
      <p className="m-0 text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
        Rebalance: Top 3 by capex revisions: NVDA(38.2%), AAPL(31.4%), RKLB(30.4%)
      </p>
    </div>
  );
}

function Metric({ label, value, tone = 'neutral', sub }: { label: string; value: string; tone?: Tone; sub?: string }) {
  return (
    <div className="min-w-0 rounded-[8px] px-[14px] py-[12px]" style={{ background: 'var(--grey-g01, #fafafa)' }}>
      <p className="m-0 truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
        {label}
      </p>
      <p className="m-0 text-[22px] leading-[32px] tracking-[0.22px]" style={{ color: toneColor(tone), fontFamily: FONT }}>
        {value}
      </p>
      {sub && (
        <p className="m-0 truncate text-[11px] leading-[16px] tracking-[0.11px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function RunRow({ run, dense = false }: { run: (typeof RUNS)[number]; dense?: boolean }) {
  const warning = run.status === 'warning';
  return (
    <div className={`grid items-center gap-[10px] border-0 border-b border-solid border-[var(--line-l07,rgba(0,0,0,0.07))] ${dense ? 'grid-cols-[54px_1fr_58px_16px] py-[8px]' : 'grid-cols-[54px_1fr_54px_16px] py-[9px] sm:grid-cols-[64px_1fr_70px_116px_16px]'}`}>
      <p className="m-0 text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
        {run.id}
      </p>
      <p className="m-0 min-w-0 truncate text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: warning ? '#9E7100' : 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
        {run.result}
      </p>
      <p className="m-0 text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
        {run.duration}
      </p>
      {!dense && (
        <p className="m-0 hidden truncate text-[12px] leading-[20px] tracking-[0.12px] sm:block" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
          {run.started}
        </p>
      )}
      <CdnIcon name={warning ? 'alert-f2' : 'check-f2'} size={16} color={warning ? '#E6A91A' : 'var(--main-m3, #2A9B7D)'} />
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-[2px]">
      <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
        {label}
      </p>
      <p className="m-0 [overflow-wrap:anywhere] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
        {value}
      </p>
    </div>
  );
}

function SectionGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-[8px]">
      <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
        {title}
      </p>
      {children}
    </section>
  );
}

function RunsTable() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[54px_1fr_54px_16px] gap-[10px] border-0 border-b border-solid border-[var(--line-l07,rgba(0,0,0,0.07))] pb-[8px] sm:grid-cols-[64px_1fr_70px_116px_16px]">
        {['Run', 'Result', 'Time', 'Started', ''].map((head) => (
          <p key={head || 'status'} className={`${head === 'Started' ? 'hidden sm:block' : ''} m-0 text-[12px] leading-[20px] tracking-[0.12px]`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
            {head}
          </p>
        ))}
      </div>
      {RUNS.map((run) => <RunRow key={run.id} run={run} />)}
    </div>
  );
}

function ModalSurface({ children, maxWidth = 760 }: { children: ReactNode; maxWidth?: number }) {
  return (
    <div
      className="w-full overflow-hidden rounded-[8px] bg-white"
      style={{
        maxWidth,
        border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        boxShadow: 'var(--shadow-l, 0 12px 36px rgba(0,0,0,0.12))',
      }}
    >
      {children}
    </div>
  );
}

function OptionOverview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'runs'>('overview');
  const tabs: { key: 'overview' | 'runs'; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'runs', label: 'Runs' },
  ];

  return (
    <ModalSurface>
      <div className="flex flex-col gap-[18px] p-[28px]">
        <ModalHeader />
        <div className="flex items-end gap-[18px] border-0 border-b border-solid border-[var(--line-l07,rgba(0,0,0,0.07))]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className="border-0 bg-transparent p-0 pb-[8px] text-[14px] leading-[22px] tracking-[0.14px]"
              style={{
                borderBottom: activeTab === tab.key ? '2px solid var(--main-m1, #49A3A6)' : '2px solid transparent',
                color: activeTab === tab.key ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n5, rgba(0,0,0,0.5))',
                fontFamily: FONT,
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'overview' ? (
          <div className="flex flex-col gap-[18px]">
            <SectionGroup title="What This Feed Does">
              <p className="m-0 max-w-[66ch] text-[14px] leading-[24px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
                {FEED_DESCRIPTION}
              </p>
            </SectionGroup>
            <SectionGroup title="Recent Alerts">
              <RecentAlertsCard />
            </SectionGroup>
          </div>
        ) : (
          <div className="flex flex-col gap-[18px]">
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-3">
              <Metric label="Total Runs" value="142" sub="all time" />
              <Metric label="Success" value="140" tone="good" sub="98.6%" />
              <Metric label="Failed" value="2" tone="warn" sub="last 30 days" />
            </div>
            <SectionGroup title="Recent runs">
              <RunsTable />
            </SectionGroup>
          </div>
        )}
      </div>
    </ModalSurface>
  );
}

function OptionInspector() {
  return (
    <ModalSurface maxWidth={900}>
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="flex flex-col gap-[18px] border-0 border-b border-solid border-[var(--line-l07,rgba(0,0,0,0.07))] p-[24px] md:border-b-0 md:border-r">
          <ModalHeader compact />
          <div className="flex flex-col gap-[8px]">
            {['Latest output', 'Health', 'Run history', 'Configuration'].map((item, index) => (
              <button
                key={item}
                type="button"
                className="flex h-[34px] items-center justify-between rounded-[6px] border-0 px-[10px] text-left text-[13px] leading-[20px] tracking-[0.13px]"
                style={{
                  background: index === 0 ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'transparent',
                  color: index === 0 ? 'var(--main-m1, #49A3A6)' : 'var(--text-n7, rgba(0,0,0,0.7))',
                  fontFamily: FONT,
                }}
              >
                <span>{item}</span>
                {index === 0 && <CdnIcon name="arrow-right-l2" size={12} color="var(--main-m1, #49A3A6)" />}
              </button>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-[8px]">
            <Metric label="Health" value="98.6%" tone="good" />
            <Metric label="Failed" value="2" tone="warn" />
          </div>
        </aside>
        <div className="flex flex-col gap-[18px] p-[24px]">
          <LatestOutput compact />
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-[1fr_220px]">
            <section className="flex min-w-0 flex-col">
              <div className="flex items-center justify-between border-0 border-b border-solid border-[var(--line-l07,rgba(0,0,0,0.07))] pb-[8px]">
                <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
                  Recent runs
                </p>
                <button type="button" className="border-0 bg-transparent p-0">
                  <CdnIcon name="refresh-l" size={14} color="var(--text-n5, rgba(0,0,0,0.5))" />
                </button>
              </div>
              {RUNS.slice(0, 4).map((run) => <RunRow key={run.id} run={run} dense />)}
            </section>
            <section className="flex flex-col gap-[12px] rounded-[8px] p-[14px]" style={{ background: 'var(--grey-g01, #fafafa)' }}>
              <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
                Configuration
              </p>
              {CONFIG.map((item) => <FieldRow key={item.label} label={item.label} value={item.value} />)}
            </section>
          </div>
        </div>
      </div>
    </ModalSurface>
  );
}

function OptionRuns() {
  return (
    <ModalSurface maxWidth={820}>
      <div className="flex flex-col gap-[18px] p-[28px]">
        <ModalHeader />
        <div className="grid grid-cols-2 gap-[8px] sm:grid-cols-4">
          <Metric label="Last result" value="Success" tone="good" />
          <Metric label="Warnings" value="1" tone="warn" />
          <Metric label="Avg duration" value="3.2s" />
          <Metric label="Credits" value="0.5" />
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-[1fr_300px]">
          <section className="flex min-w-0 flex-col">
            <div className="grid grid-cols-[54px_1fr_54px_16px] gap-[10px] border-0 border-b border-solid border-[var(--line-l07,rgba(0,0,0,0.07))] pb-[8px] sm:grid-cols-[64px_1fr_70px_116px_16px]">
              {['Run', 'Result', 'Time', 'Started', ''].map((head) => (
                <p key={head || 'status'} className={`${head === 'Started' ? 'hidden sm:block' : ''} m-0 text-[12px] leading-[20px] tracking-[0.12px]`} style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
                  {head}
                </p>
              ))}
            </div>
            {RUNS.map((run) => <RunRow key={run.id} run={run} />)}
          </section>
          <section className="flex flex-col gap-[14px] rounded-[8px] p-[16px]" style={{ background: 'var(--b-r02, rgba(0,0,0,0.02))' }}>
            <div className="flex items-center justify-between gap-[12px]">
              <div>
                <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
                  Selected run
                </p>
                <p className="m-0 text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
                  #139 warning
                </p>
              </div>
              <CdnIcon name="alert-f2" size={18} color="#E6A91A" />
            </div>
            <div className="flex flex-col gap-[8px] rounded-[8px] p-[12px]" style={{ background: '#fff', border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
              <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
                Log excerpt
              </p>
              <pre className="m-0 whitespace-pre-wrap text-[11px] leading-[18px] tracking-[0.11px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}>
{`[13:45:02] pull capex revisions
[13:45:03] AAPL source stale
[13:45:04] fallback snapshot used
[13:45:05] publish completed`}
              </pre>
            </div>
            <div className="flex gap-[8px]">
              <IconButton icon="refresh-l" label="Retry run" />
              <IconButton icon="arrow-right-l2" label="Full log" />
            </div>
          </section>
        </div>
      </div>
    </ModalSurface>
  );
}

function VariantSection({
  eyebrow,
  title,
  recommended,
  points,
  children,
}: {
  eyebrow: string;
  title: string;
  recommended?: boolean;
  points: string[];
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-[14px]">
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
            {eyebrow}
          </span>
          {recommended && (
            <span className="rounded-[4px] px-[6px] py-[1px] text-[11px] font-medium leading-[16px] tracking-[0.11px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))', color: 'var(--main-m1, #49A3A6)', fontFamily: FONT }}>
              Recommended
            </span>
          )}
        </div>
        <h3 className="m-0 text-[18px] font-medium leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
          {title}
        </h3>
        <ul className="m-0 flex list-disc flex-col gap-[2px] pl-[18px]">
          {points.map((point) => (
            <li key={point} className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
              {point}
            </li>
          ))}
        </ul>
      </div>
      {children}
    </section>
  );
}

export function AutomationDetailModalDemo() {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="m-0 text-[22px] font-medium leading-[32px] tracking-[0.22px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
          Automation detail modal — IA options
        </h2>
        <p className="m-0 max-w-[72ch] text-[14px] leading-[24px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}>
          Three ways to classify the same detail content: latest output, health, configuration, and run history.
        </p>
      </div>

      <div className="flex flex-col gap-[44px]">
        <VariantSection
          eyebrow="Option A"
          title="Overview first with tabs"
          recommended
          points={[
            'Only two tabs: Overview for feed meaning and alerts, Runs for totals and run history.',
            'Section labels sit outside the grey content blocks, so titles read as structure rather than card copy.',
            'Header actions match the Settings Automations icon-only pattern.',
          ]}
        >
          <OptionOverview />
        </VariantSection>

        <VariantSection
          eyebrow="Option B"
          title="Inspector split"
          points={[
            'Left rail keeps status, actions, and section navigation visible while details scroll.',
            'Best fit when this modal grows into a management surface with many fields.',
            'Configuration sits beside recent runs, making ownership and routing easier to inspect.',
          ]}
        >
          <OptionInspector />
        </VariantSection>

        <VariantSection
          eyebrow="Option C"
          title="Run-centric debugger"
          points={[
            'Optimized for investigating failures, retries, and log detail.',
            'Latest business output is less prominent, but operational diagnosis is much faster.',
            'Useful as a Runs tab design even if Option A is used as the default overview.',
          ]}
        >
          <OptionRuns />
        </VariantSection>
      </div>
    </div>
  );
}
