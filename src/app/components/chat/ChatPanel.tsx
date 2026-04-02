import { useState } from 'react';

const CDN = 'https://alva-ai-static.b-cdn.net/icons';

function CdnIcon({ name, size = 16, color }: { name: string; size?: number; color?: string }) {
  const url = `${CDN}/${name}.svg`;
  if (color) {
    return (
      <div
        className="block"
        style={{
          width: size, height: size,
          backgroundColor: color,
          WebkitMaskImage: `url(${url})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${url})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }}
      />
    );
  }
  return <img src={url} alt={name} width={size} height={size} className="block" style={{ width: size, height: size }} />;
}

/* ── Mock conversation data ── */
const MOCK_USER_MSG = `Build me an NVDA earnings dashboard — I want to see quarterly revenue, gross margin trends, and a forward P/E comparison with AMD and INTC.`;

const MOCK_BULLETS = [
  { bold: 'Revenue Trend', text: ' — bar chart, quarterly data, color-coded by segment' },
  { bold: 'Gross Margin', text: ' — line chart with 73% current highlight and historical band' },
  { bold: 'Forward P/E Comparison', text: ' — horizontal bar (NVDA vs AMD vs INTC)' },
];

const MOCK_TABLE = {
  headers: ['KPI', 'Value', 'Context'],
  rows: [
    ['Q4 Revenue', '$35.1B', '+265% YoY, driven by data center'],
    ['Gross Margin', '73.0%', 'Up from 64.6% a year ago'],
    ['Forward P/E', '32.4x', 'vs AMD 28.1x, INTC 18.7x'],
  ],
};

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [input, setInput] = useState('');

  return (
    <div className="flex items-center pr-[8px] py-[8px] h-full shrink-0" style={{ minWidth: 480, maxWidth: 480 }}>
      <div
        className="flex flex-col h-full w-full overflow-hidden"
        style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.2)',
          borderRadius: 12,
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        }}
      >
        {/* ── Topbar ── */}
        <div className="flex items-center gap-[16px] h-[48px] px-[24px] py-[16px] shrink-0" style={{ zIndex: 2 }}>
          <div className="flex flex-1 gap-[4px] items-center min-w-0">
            <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
              Animated Demo Playbook with Mock Data
            </p>
            <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
          </div>
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => {}}>
            <CdnIcon name="chat-new-l" size={16} />
          </button>
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => {}}>
            <CdnIcon name="full-screen-l" size={16} />
          </button>
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => {}}>
            <CdnIcon name="more-l1" size={16} />
          </button>
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={onClose}>
            <CdnIcon name="collapse-right-l" size={16} />
          </button>
        </div>

        {/* ── Chat Body ── */}
        <div className="flex flex-col flex-1 items-center min-h-0 pb-[8px] px-[8px]" style={{ zIndex: 1 }}>
          <div className="flex flex-col flex-1 gap-[16px] items-start min-h-0 overflow-y-auto pb-[28px] px-[16px] w-full">
            {/* User message */}
            <div className="flex flex-col items-end w-full">
              <div
                className="w-full max-w-[560px] px-[16px] py-[12px]"
                style={{ background: 'rgba(73,163,166,0.1)', borderRadius: 8 }}
              >
                <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]">
                  {MOCK_USER_MSG}
                </p>
              </div>
            </div>

            {/* Divider: Reasoned */}
            <div className="flex items-center gap-[8px] w-full">
              <div className="flex-1 h-0" style={{ borderTop: '1px dashed rgba(0,0,0,0.12)' }} />
              <div className="flex items-center gap-[4px]">
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]">
                  Reasoned · 8 steps
                </span>
                <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />
              </div>
              <div className="flex-1 h-0" style={{ borderTop: '1px dashed rgba(0,0,0,0.12)' }} />
            </div>

            {/* Alva Beta logo */}
            <div className="flex items-center gap-[4px] shrink-0">
              <img
                src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg"
                alt="Alva"
                style={{ height: 14 }}
              />
              <span
                className="font-['Delight',sans-serif] text-[10px] leading-[14px] px-[4px] py-[1px]"
                style={{ background: 'rgba(73,163,166,0.1)', color: 'var(--main-m1)', borderRadius: 3 }}
              >
                Beta
              </span>
            </div>

            {/* AI response: intro */}
            <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] w-full">
              Building the <span className="font-medium text-[14px] leading-[22px] tracking-[0.14px]">3-Widget Grid</span> layout:
            </p>

            {/* Bullet list */}
            <div className="flex flex-col gap-[8px] w-full">
              {MOCK_BULLETS.map((b) => (
                <div key={b.bold} className="flex items-start w-full">
                  <div className="w-[24px] h-[26px] flex items-center justify-center shrink-0">
                    <div className="size-[5px] rounded-full bg-[var(--text-n9)]" />
                  </div>
                  <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] flex-1">
                    <span className="font-medium">{b.bold}</span>{b.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary text */}
            <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] w-full">
              Dashboard is ready. Here's a summary:
            </p>

            {/* Table */}
            <div className="flex w-full overflow-x-auto">
              {MOCK_TABLE.headers.map((header, ci) => (
                <div key={header} className="flex flex-col flex-1 min-w-[108px]">
                  <div className="py-[12px] pr-[12px]">
                    <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n7)] truncate">
                      {header}
                    </p>
                  </div>
                  {MOCK_TABLE.rows.map((row) => (
                    <div key={row[0]} className="py-[12px] pr-[12px]" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                      <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
                        {row[ci]}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Source link */}
            <div className="flex items-center gap-[4px]">
              <span className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]">
                Source:
              </span>
              <span
                className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n7)] underline decoration-dotted cursor-pointer"
              >
                BTC Ultimate AI Trader
              </span>
              <CdnIcon name="go-l" size={16} />
            </div>

            {/* Playbook card */}
            <div
              className="flex flex-col w-[360px] overflow-hidden"
              style={{ border: '0.5px solid rgba(0,0,0,0.3)', borderRadius: 12, padding: 4 }}
            >
              <div
                className="w-full aspect-[472/265.5] rounded-[8px]"
                style={{
                  background: 'linear-gradient(135deg, #1a2332 0%, #2a3a4a 50%, #1a2332 100%)',
                }}
              />
              <div className="flex flex-col gap-[12px] pt-[16px] pb-[12px] px-[12px]">
                <div className="flex flex-col gap-[4px]">
                  <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] truncate">
                    BTC Ultimate AI Trader
                  </p>
                  <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] line-clamp-2 overflow-hidden" style={{ maxHeight: 44 }}>
                    This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Chat Input ── */}
          <div
            className="w-full shrink-0 flex flex-col gap-[12px] p-[16px] chat-input-wrapper"
            style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.2)', borderRadius: 12 }}
          >
            <textarea
              className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] w-full resize-none outline-none placeholder:text-[var(--text-n3)]"
              placeholder="Build an investing playbook from your ideas"
              rows={2}
              style={{ minHeight: 44, maxHeight: 240 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center gap-[12px] h-[28px]">
              <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
                <CdnIcon name="at-l" size={16} />
              </button>
              <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
                <CdnIcon name="photo-l" size={16} />
              </button>
              <div className="flex-1 flex items-center justify-end gap-[4px]">
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]">
                  Sonnet 4.6
                </span>
                <CdnIcon name="arrow-down-f2" size={12} color="rgba(0,0,0,0.2)" />
              </div>
              <button
                className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
                style={{
                  background: input.trim() ? '#49A3A6' : 'rgba(0,0,0,0.05)',
                }}
              >
                <CdnIcon
                  name="arrow-up-l1"
                  size={14}
                  color={input.trim() ? '#ffffff' : 'rgba(0,0,0,0.3)'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
