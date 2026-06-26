/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alerts 设置页 — 合并 Automations(产) + 原 Alerts(收) 为单一 Alerts
 *           设计稿: Figma Setting/Alerts (7764:3793);语义同 Agent/Alerts(7913:138060)
 *           - 胶囊 Tab: All / Active / Paused(选中: 黑底 0.7 + 白字 0.9)
 *           - "Created" 开关(只看我创建的)
 *           - "New Alerts" 描边按钮
 *           - 卡片: StatusDot + (名 | 创建者头像/Last Run/Every/Runs) + 右侧控件
 *             · created  = edit + pause/play + delete(+ 行内 toggle)
 *             · subscribed = 仅 Unsubscribe 文字按钮
 * [POS]: 页面层
 */

import { useMemo, useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import { SETTINGS_FONT, ToggleSwitch } from '@/app/components/shell/settings-ui';

const FONT = SETTINGS_FONT;

type AlertStatus = 'active' | 'paused';
/** created = 我创建的(可 edit/pause/delete);subscribed = 订阅别人的(仅 Unsubscribe) */
type AlertSource = 'created' | 'subscribed';

interface AlertFeed {
  id: string;
  name: string;
  creator: string;          // 来源创建者(头像 + 名)
  status: AlertStatus;
  source: AlertSource;
  lastRun: string;          // "15m"
  runEvery: string;         // "Every 5 minutes"
  totalRuns: string;        // "142"
  /** 该 alert 订阅自哪个 playbook;有值则显示 From chip */
  from?: { label: string; author: string; target: Page };
  description?: string;
}

/* ========== Status Dot (14px) — active 绿 / paused 灰 ========== */

function StatusDot({ status }: { status: AlertStatus }) {
  const paused = status === 'paused';
  return (
    <span
      className="flex size-[14px] shrink-0 items-center justify-center rounded-full"
      style={{ background: paused ? 'var(--b-r05, rgba(0,0,0,0.05))' : '#DBEDED' }}
    >
      <span className="size-[6px] rounded-full" style={{ background: paused ? 'var(--text-n3, rgba(0,0,0,0.3))' : 'var(--main-m1, #49A3A6)' }} />
    </span>
  );
}

/* ========== meta 行 — 创建者 | Last Run | Every | Runs ========== */

function FeedMeta({ feed }: { feed: AlertFeed }) {
  const sep = <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>;
  return (
    <div className="flex flex-wrap items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>
      <span className="flex items-center gap-[4px]">
        <Avatar name={feed.creator} size={16} />
        {feed.creator}
      </span>
      {sep}
      <span className="whitespace-nowrap">Last Run: {feed.lastRun}</span>
      {sep}
      <span className="whitespace-nowrap">{feed.runEvery}</span>
      {sep}
      <span className="whitespace-nowrap">{feed.totalRuns} Runs</span>
    </div>
  );
}

/* ========== created 卡的操作图标 ========== */

function RowActions({ status, onToggleStatus, onDelete, onOpen }: { status: AlertStatus; onToggleStatus: () => void; onDelete: () => void; onOpen: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-[12px]">
      <button aria-label="Edit" onClick={(e) => { e.stopPropagation(); onOpen(); }} className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70">
        <CdnIcon name="edit-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </button>
      <button aria-label={status === 'paused' ? 'Resume' : 'Pause'} onClick={(e) => { e.stopPropagation(); onToggleStatus(); }} className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70">
        <CdnIcon name={status === 'paused' ? 'play-f' : 'pause-l2'} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </button>
      <button aria-label="Delete" onClick={(e) => { e.stopPropagation(); onDelete(); }} className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70">
        <CdnIcon name="delete-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </button>
    </div>
  );
}

/* ========== subscribed 卡的 Unsubscribe 文字按钮 ========== */

function UnsubscribeBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-right text-[12px] font-medium leading-[20px] tracking-[0.12px] text-[color:var(--text-n9,rgba(0,0,0,0.9))] transition-colors hover:text-[color:var(--main-m4,#E5484D)]"
      style={{ fontFamily: FONT }}
    >
      Unsubscribe
    </button>
  );
}

/* ========== From chip ========== */

function FromChip({ from, onClick }: { from: NonNullable<AlertFeed['from']>; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="h-[22px] flex items-center gap-[4px] px-[6px] py-px rounded-[4px] border-none cursor-pointer shrink-0"
      style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}
    >
      <Avatar name={from.author} size={14} />
      <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT, maxWidth: 160 }}>
        {from.label}
      </span>
    </button>
  );
}

/* ========== 数据 ========== */

const FEEDS: AlertFeed[] = [
  {
    id: 'capacity',
    name: 'capacity-monitor',
    creator: 'Sheer',
    status: 'active',
    source: 'created',
    lastRun: '15m',
    runEvery: 'Every 5 minutes',
    totalRuns: '142',
    from: { label: '@leo/BTC Ultimate AI Trader', author: 'leo', target: 'screener' },
  },
  {
    id: 'whale',
    name: 'whale-flow-scanner',
    creator: 'Sheer',
    status: 'active',
    source: 'created',
    lastRun: '2h',
    runEvery: 'Every 30 minutes',
    totalRuns: '1,287',
  },
  {
    id: 'nvda',
    name: 'nvda-macd-hft-notify',
    creator: 'YGGYLL',
    status: 'active',
    source: 'subscribed',
    lastRun: '15m',
    runEvery: 'Every 5 minutes',
    totalRuns: '73',
    from: { label: '@yggyll/NVDA Price Fetcher', author: 'yggyll', target: 'screener' },
  },
  {
    id: 'funding',
    name: 'funding-rate-watcher',
    creator: 'Sheer',
    status: 'paused',
    source: 'created',
    lastRun: '42m',
    runEvery: 'Every hour',
    totalRuns: '3,210',
  },
  {
    id: 'macro',
    name: 'macro-pulse',
    creator: 'maya',
    status: 'active',
    source: 'subscribed',
    lastRun: '4h',
    runEvery: 'Every day at 9:00 AM',
    totalRuns: '48',
    from: { label: '@maya/ai-infra-screener', author: 'maya', target: 'screener' },
  },
];

type TabKey = 'all' | 'active' | 'paused';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
];

const DEFAULT_DESCRIPTION =
  'Tracks market and portfolio signals on a schedule, then routes the latest output to playbooks using this alert.';

/* ========== 页面 ========== */

export default function Notifications({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<TabKey>('all');
  const [createdOnly, setCreatedOnly] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, AlertStatus>>(() =>
    Object.fromEntries(FEEDS.map((f) => [f.id, f.status])),
  );
  const [feeds, setFeeds] = useState<AlertFeed[]>(FEEDS);
  const [activeFeed, setActiveFeed] = useState<AlertFeed | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<AlertFeed | null>(null);

  const statusOf = (f: AlertFeed) => statusMap[f.id] ?? f.status;
  const toggleStatus = (id: string) =>
    setStatusMap((prev) => ({ ...prev, [id]: (prev[id] ?? 'active') === 'active' ? 'paused' : 'active' }));

  const visible = (f: AlertFeed) => {
    if (tab !== 'all' && statusOf(f) !== tab) return false;
    if (createdOnly && f.source !== 'created') return false;
    return true;
  };

  const list = useMemo(() => feeds.filter(visible), [feeds, tab, createdOnly, statusMap]);

  const removeFromList = (id: string) => {
    setFeeds((current) => current.filter((f) => f.id !== id));
  };

  return (
    <SettingsLayout active="notifications" onNavigate={onNavigate}>
      <div className="w-full max-w-[944px] flex flex-col gap-[16px]">
        {/* 工具栏 — 过滤 pills + Created 开关 + New Alerts */}
        <div className="flex w-full items-center gap-[20px]">
          <div className="flex flex-1 flex-wrap items-center gap-[12px]">
            {TABS.map((item) => {
              const active = item.key === tab;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTab(item.key)}
                  className="h-[34px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-[12px] py-[6px] text-[14px] leading-[22px] tracking-[0.14px] transition-colors"
                  style={{
                    fontFamily: FONT,
                    background: active ? 'rgba(0,0,0,0.7)' : 'var(--b-r03, rgba(0,0,0,0.03))',
                    color: active ? 'rgba(255,255,255,0.9)' : 'var(--text-n7, rgba(0,0,0,0.7))',
                    fontWeight: 400,
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-[6px]">
            <ToggleSwitch on={createdOnly} size={16} onClick={() => setCreatedOnly((v) => !v)} />
            <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              Created
            </span>
          </div>

          <button
            type="button"
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[6px] rounded-[4px] px-[12px] py-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] transition-colors hover:bg-[var(--b-r02)]"
            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
          >
            <CdnIcon name="add-l2" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
            New Alerts
          </button>
        </div>

        {/* 卡片列表 */}
        <div className="w-full flex flex-col gap-[16px]">
          {list.map((feed) => {
            const st = statusOf(feed);
            const created = feed.source === 'created';
            return (
              <div
                key={feed.id}
                className="group w-full rounded-[8px] p-[20px]"
                style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', background: 'var(--b0-container, #fff)', fontFamily: FONT }}
              >
                {/* Row 1 — dot + (名 / meta) + 右侧控件 */}
                <div className="flex w-full items-start gap-[8px]">
                  <span className="flex h-[26px] shrink-0 items-center">
                    <StatusDot status={st} />
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveFeed(feed)}
                    className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-[2px] border-none bg-transparent p-0 text-left"
                  >
                    <span className="max-w-full truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      {feed.name}
                    </span>
                    <FeedMeta feed={feed} />
                  </button>

                  <div className="flex shrink-0 items-center gap-[12px] self-center">
                    {created ? (
                      <>
                        <RowActions
                          status={st}
                          onToggleStatus={() => toggleStatus(feed.id)}
                          onDelete={() => setConfirmRemove(feed)}
                          onOpen={() => setActiveFeed(feed)}
                        />
                        <ToggleSwitch on={st === 'active'} onClick={() => toggleStatus(feed.id)} />
                      </>
                    ) : (
                      <UnsubscribeBtn onClick={() => setConfirmRemove(feed)} />
                    )}
                  </div>
                </div>

                {/* Row 2 — From chip(订阅来源) */}
                {feed.from && (
                  <div className="mt-[12px] flex w-full items-center gap-[8px] pl-[22px]">
                    <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap shrink-0" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                      From
                    </span>
                    <FromChip from={feed.from} onClick={() => onNavigate(feed.from!.target)} />
                  </div>
                )}
              </div>
            );
          })}

          {list.length === 0 && (
            <p
              className="py-[40px] text-center text-[14px] leading-[22px] tracking-[0.14px]"
              style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}
            >
              No alerts here yet. Click “New Alerts” to create one, or enable Get Alerts on a playbook.
            </p>
          )}
        </div>
      </div>

      {/* 移除/退订确认 */}
      {confirmRemove && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-[16px]"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setConfirmRemove(null)}
        >
          <div
            className="w-[400px] max-w-full p-[24px] rounded-[12px] flex flex-col gap-[16px]"
            style={{ background: 'var(--b0-container, #fff)', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: 'var(--shadow-l)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT }}>
              {confirmRemove.source === 'created' ? `Delete “${confirmRemove.name}”?` : `Unsubscribe from “${confirmRemove.name}”?`}
            </p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT }}>
              {confirmRemove.source === 'created'
                ? 'This alert will be permanently removed. Playbooks using it will stop receiving updates.'
                : 'You will stop receiving alerts from this source. You can re-subscribe anytime.'}
            </p>
            <div className="flex justify-end gap-[8px]">
              <button
                type="button"
                onClick={() => setConfirmRemove(null)}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer bg-transparent border-none outline-none hover:bg-[rgba(0,0,0,0.05)]"
                style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT }}
              >
                {confirmRemove.source === 'created' ? 'Cancel' : 'Keep'}
              </button>
              <button
                type="button"
                onClick={() => {
                  removeFromList(confirmRemove.id);
                  setConfirmRemove(null);
                }}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer border-none outline-none hover:brightness-110"
                style={{ color: '#fff', background: 'var(--destructive, #e05357)', fontFamily: FONT }}
              >
                {confirmRemove.source === 'created' ? 'Delete' : 'Unsubscribe'}
              </button>
            </div>
          </div>
        </div>
      )}

      <FeedDetailModal
        open={!!activeFeed}
        onClose={() => setActiveFeed(null)}
        feedName={activeFeed?.name ?? ''}
        description={activeFeed?.description ?? DEFAULT_DESCRIPTION}
        lastRun={activeFeed?.lastRun ?? ''}
        runEvery={activeFeed?.runEvery ?? ''}
        owner={activeFeed?.source === 'created'}
      />
    </SettingsLayout>
  );
}
