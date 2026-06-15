/**
 * [INPUT]: Figma Page/Agent/Alerts(7913:138060)— Body(7913:138065)+ Agent List Item(7930:184577)
 * [OUTPUT]: Agent 页 Alerts tab — All/Active/Paused 过滤 pills + New Alerts 按钮 + 订阅列表卡片
 * [POS]: AgentNewSession tab==='alerts' 渲染;数量驱动页级 tab 计数
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

export type AgentAlertStatus = 'active' | 'paused';

export interface AgentAlert {
  id: string;
  title: string;
  lastPush: string;
  status: AgentAlertStatus;
  /** 订阅来源(可选)— 渲染 From + 作者 tag */
  from?: string;
}

export const AGENT_ALERTS: AgentAlert[] = [
  { id: 'a1', title: 'alessiotmad-tweet-tracker', lastPush: '15m', status: 'active', from: '@leo/BTC Ultimate AI Trader' },
  { id: 'a2', title: 'shanghaojin-tweet-trader-v2', lastPush: '15m', status: 'active' },
  { id: 'a3', title: 'ai-chip-supply-chain', lastPush: '15m', status: 'active', from: '@leo/BTC Ultimate AI Trader' },
  { id: 'a4', title: 'capacity-monitor', lastPush: '15m', status: 'active', from: '@leo/BTC Ultimate AI Trader' },
  { id: 'a5', title: 'earnings-surprise-radar', lastPush: '15m', status: 'active' },
  { id: 'a6', title: 'funding-rate-watcher', lastPush: '15m', status: 'active' },
];

/* 绿色状态点 — 14px 浅底环 + 6px 实心点(同 AutomationCard.StatusDot) */
function StatusDot() {
  return (
    <span className="flex size-[14px] shrink-0 items-center justify-center rounded-full" style={{ background: '#DBEDED' }}>
      <span className="size-[6px] rounded-full" style={{ background: 'var(--main-m1, #49A3A6)' }} />
    </span>
  );
}

/* Tag/Default — Figma 7930:184185:br03 圆角 4,px-6 py-px,gap-4,14px 头像 + 作者名 */
function FromTag({ from }: { from: string }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div
      className="flex shrink-0 items-center justify-center gap-[4px] rounded-[4px] px-[6px] py-px"
      style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}
    >
      <img src={`${base}avatar-fintwit-tracker.png`} alt="" className="size-[14px] shrink-0 rounded-full object-cover" />
      <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
        {from}
      </span>
    </div>
  );
}

/* 订阅卡片 — Figma 7930:184577:border 0.5 l2 / 圆角 8 / p-20 / gap-12 */
function AlertCard({ alert }: { alert: AgentAlert }) {
  return (
    <div
      className="flex w-full flex-col gap-[12px] rounded-[8px] p-[20px]"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      <div className="flex w-full items-center gap-[24px]">
        <div className="flex min-w-0 flex-1 items-center gap-[8px]">
          <StatusDot />
          <p className="min-w-0 flex-1 truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {alert.title}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT }}>
          <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Last push: {alert.lastPush}</span>
          <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
          <button
            className="cursor-pointer border-none bg-transparent p-0 text-[12px] leading-[20px] tracking-[0.12px] transition-colors hover:text-[var(--text-n9)]"
            style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}
          >
            Unsubscribe
          </button>
        </div>
      </div>
      {alert.from && (
        <div className="flex w-full flex-wrap items-center gap-[8px]">
          <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            From
          </span>
          <FromTag from={alert.from} />
        </div>
      )}
    </div>
  );
}

type AlertFilter = 'all' | 'active' | 'paused';

const FILTERS: { id: AlertFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'paused', label: 'Paused' },
];

export function AgentAlertsPanel() {
  const [filter, setFilter] = useState<AlertFilter>('all');
  const alerts = AGENT_ALERTS.filter((a) => (filter === 'all' ? true : a.status === filter));

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-[28px]">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[16px]">
        {/* 顶部行 — 左侧过滤 pills(flex-1)+ 右侧 New Alerts 按钮 */}
        <div className="flex w-full items-start gap-[16px]">
          <div className="flex h-[28px] flex-1 flex-wrap items-start gap-[8px]">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  className="h-[28px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-[10px] py-[4px] text-[12px] leading-[20px] tracking-[0.12px] transition-colors"
                  style={{
                    fontFamily: FONT,
                    background: active ? 'rgba(0,0,0,0.7)' : 'var(--b-r03, rgba(0,0,0,0.03))',
                    color: active ? 'rgba(255,255,255,0.9)' : 'var(--text-n7, rgba(0,0,0,0.7))',
                  }}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <button
            className="flex h-[28px] shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[4px] px-[12px] py-[4px] text-[12px] leading-[20px] tracking-[0.12px] transition-colors hover:bg-[var(--b-r02)]"
            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
          >
            <CdnIcon name="add-l2" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
            New Alerts
          </button>
        </div>

        {alerts.map((a) => (
          <AlertCard key={a.id} alert={a} />
        ))}
      </div>
    </div>
  );
}
