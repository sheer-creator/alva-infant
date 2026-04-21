/**
 * [INPUT]: AppShell sidebar
 * [OUTPUT]: 用户浮窗 — Basic Info / Usage+Available / 菜单 / Social
 * [POS]: shell 层 — 用户信息弹出面板
 */

import svgPaths from '@/data/svg-guyqw4in5w';
import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import type { Page } from '@/app/App';

/* ========== Constants ========== */

const USER = { name: 'YGGYLL', email: 'sheer@alva.xyz' };
const FONT = "'Delight', sans-serif";

const CREDITS = {
  daily:   { remaining: 1000,  label: 'Daily' },
  monthly: { remaining: 3000,  label: 'Monthly' },
  pack:    { remaining: 12000, label: 'Pack' },
};

const AVAILABLE = CREDITS.daily.remaining + CREDITS.monthly.remaining + CREDITS.pack.remaining;

const SOCIAL_PATHS = [svgPaths.p1705fd00, svgPaths.p30e25500, svgPaths.p1a857180, svgPaths.p1ae3a8f0];

/* ========== Icons ========== */

function ArrowRight() {
  return <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />;
}

/* ========== Menu item ========== */

function MenuItem({
  icon, label, onClick, dot = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  dot?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between py-[12px] px-[20px] -mx-[20px] w-[calc(100%+40px)] text-left transition-colors hover:bg-[rgba(0,0,0,0.05)] cursor-pointer bg-transparent border-none"
    >
      <div className="flex items-center gap-[8px]">
        {icon}
        <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{label}</span>
      </div>
      <div className="flex items-center gap-[6px]">
        {dot && <span className="w-[6px] h-[6px] rounded-full" style={{ background: '#49a3a6' }} />}
        <ArrowRight />
      </div>
    </button>
  );
}

/* ========== Main ========== */

export default function UserInfo({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const initial = USER.name.trim().charAt(0).toUpperCase();
  const avatarColor = AVATAR_COLOR_PALETTE[[...USER.name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  const tiers = [CREDITS.daily, CREDITS.monthly, CREDITS.pack] as const;

  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="User Info">
      <div className="flex flex-col px-[20px] overflow-clip rounded-[inherit] size-full">

        {/* Basic Info — hover 通栏 */}
        <div
          className="flex gap-[12px] items-center py-[16px] -mx-[20px] px-[20px] w-[calc(100%+40px)] cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)]"
        >
          <div className="w-[48px] h-[48px] rounded-full shrink-0 flex items-center justify-center overflow-hidden" style={{ background: avatarColor }}>
            <span className="text-[21px] text-white leading-none" style={{ fontFamily: FONT }}>{initial}</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1 pb-[4px]">
            <div className="flex items-center gap-[8px] min-w-0">
              <span className="text-[18px] font-medium leading-[28px] tracking-[0.18px] truncate" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{USER.name}</span>
              <div className="flex items-center gap-[4px] shrink-0">
                <span
                  className="inline-flex items-center justify-center text-[11px] leading-[18px] tracking-[0.11px] px-[8px] rounded-[96px] text-white"
                  style={{ background: '#49a3a6', border: '0.5px solid rgba(255,255,255,0.3)', fontFamily: FONT }}
                >
                  Pro
                </span>
                <span
                  className="inline-flex items-center justify-center h-[18px] text-[11px] leading-[18px] tracking-[0.11px] px-[6px] rounded-full"
                  style={{ color: '#49a3a6', background: 'rgba(73,163,166,0.1)', fontFamily: FONT }}
                >
                  Annual
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[4px]">
              <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 14 14" fill="none">
                <rect width="14" height="14" rx="7" fill="white" />
                <g transform="translate(0.7 0.7)">
                  <path d={svgPaths.p1336a380} fill="#4285F4" />
                  <path d={svgPaths.p1ab03700} fill="#34A853" />
                  <path d={svgPaths.p21044080} fill="#FBBC05" />
                  <path d={svgPaths.p1b002980} fill="#EB4335" />
                </g>
              </svg>
              <span className="text-[12px] leading-[20px] tracking-[0.12px] truncate" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{USER.email}</span>
            </div>
          </div>
          <ArrowRight />
        </div>

        {/* Divider — 不通栏，保持在 px-[20px] 内 */}
        <div style={{ borderTop: '0.5px solid rgba(0,0,0,0.07)' }} />

        {/* Menu */}
        <div className="py-[8px] flex flex-col">

          {/* Usage + Available card — 整块 hover 通栏 */}
          <button
            type="button"
            className="flex flex-col pt-[12px] pb-[12px] -mx-[20px] px-[20px] w-[calc(100%+40px)] text-left transition-colors hover:bg-[rgba(0,0,0,0.05)] cursor-pointer bg-transparent border-none"
          >
            <div className="flex items-center gap-[8px] pb-[8px]">
              <CdnIcon name="credit-l" size={20} color="rgba(0,0,0,0.9)" />
              <span className="flex-1 text-[14px] leading-[22px] tracking-[0.14px] truncate" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Usage</span>
              <ArrowRight />
            </div>

            <div className="flex items-center gap-[12px] px-[12px] py-[4px] rounded-[8px] w-full" style={{ background: 'rgba(0,0,0,0.03)' }}>
              <div className="flex flex-col gap-[2px] items-start justify-center flex-1 min-w-0 pt-[4px]">
                <span className="text-[10px] leading-[16px] tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Available</span>
                <span className="text-[24px] leading-[34px] tracking-[0.24px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{AVAILABLE.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-end">
                {tiers.map((t) => (
                  <div key={t.label} className="flex items-center gap-[4px]">
                    <span className="text-[10px] leading-[16px] tracking-[0.1px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{t.label}</span>
                    <span className="text-[10px] leading-[16px] tracking-[0.1px] text-right" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{t.remaining.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </button>

          <MenuItem icon={<CdnIcon name="gift-l" size={20} color="rgba(0,0,0,0.9)" />} label="Referral" />
          <MenuItem icon={<CdnIcon name="wallet-l" size={20} color="rgba(0,0,0,0.9)" />} label="Creator Earnings" dot />
          <MenuItem icon={<CdnIcon name="language-l" size={20} color="rgba(0,0,0,0.9)" />} label="Language" />
          <MenuItem icon={<CdnIcon name="settings-l" size={20} color="rgba(0,0,0,0.9)" />} label="Settings" onClick={() => onNavigate?.('account')} />
          <MenuItem icon={<CdnIcon name="logout-l" size={20} color="rgba(0,0,0,0.9)" />} label="Log Out" />
        </div>

        {/* Social */}
        <div className="flex gap-[8px] py-[20px]" style={{ borderTop: '0.5px solid rgba(0,0,0,0.07)' }}>
          {SOCIAL_PATHS.map((path, i) => (
            <button
              key={i}
              type="button"
              className="flex-1 h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.05)] bg-transparent"
              style={{ border: '0.5px solid rgba(0,0,0,0.3)' }}
            >
              <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
                <path d={path} fill="rgba(0,0,0,0.9)" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Border overlay */}
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.04)]" />
    </div>
  );
}
