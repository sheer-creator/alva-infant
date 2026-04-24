/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alva Agent 设置页 — Connected messenger (single receiver) + Customize prompt
 * [POS]: 页面层
 */

import { useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';

const FONT = "'Delight', sans-serif";

function TelegramMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" style={{ display: 'block' }}>
      <circle cx="120" cy="120" r="120" fill="#26A5E4" />
      <path d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1l19.7-93c2-8.1-3.1-11.7-8.4-9.3L55.6 113c-7.9 3.2-7.8 7.6-1.4 9.5l36.3 11.4 84.2-53c4-2.4 7.6-1.1 4.6 1.5L100 144.4z" fill="#FFFFFF" />
    </svg>
  );
}

function DiscordMark({ size = 20 }: { size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-social-discord.svg`}
      alt="Discord"
      style={{ width: size, height: size, borderRadius: '50%', display: 'block' }}
    />
  );
}

type PlatformMeta = { id: AgentPlatform; name: string; handle: string; render: (size: number) => React.ReactNode };

const PLATFORMS: PlatformMeta[] = [
  { id: 'telegram', name: 'Telegram', handle: 'Sheerruan', render: (s) => <TelegramMark size={s} /> },
  { id: 'discord', name: 'Discord', handle: 'sheerruan', render: (s) => <DiscordMark size={s} /> },
];

function MessengerDropdown({
  platforms,
  active,
  onConnect,
  onSelect,
  onDisconnect,
}: {
  platforms: AgentPlatform[];
  active: AgentPlatform | null;
  onConnect: (p: AgentPlatform) => void;
  onSelect: (p: AgentPlatform) => void;
  onDisconnect: (p: AgentPlatform) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const activeMeta = active ? PLATFORMS.find(p => p.id === active) : null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-[8px] cursor-pointer"
        style={{
          height: 36,
          padding: '0 12px',
          borderRadius: 6,
          background: '#fff',
          border: '0.5px solid rgba(0,0,0,0.2)',
          fontFamily: FONT,
          minWidth: 180,
        }}
      >
        {activeMeta ? (
          <>
            {activeMeta.render(20)}
            <span className="flex-1 text-left text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.9)' }}>{activeMeta.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.5)' }}>Select messenger</span>
        )}
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s ease' }}>
          <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.5)" />
        </span>
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-[4px] z-50 flex flex-col"
          style={{
            minWidth: 240,
            background: '#fff',
            borderRadius: 8,
            padding: '8px 0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '0.5px solid rgba(0,0,0,0.1)',
          }}
        >
          {PLATFORMS.map(p => {
            const bound = platforms.includes(p.id);
            const isActive = active === p.id;
            return (
              <div
                key={p.id}
                className="group flex items-center gap-[12px] cursor-pointer"
                style={{ padding: '8px 16px', transition: 'background 0.12s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.03)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                onClick={() => {
                  if (!bound) onConnect(p.id);
                  else if (!isActive) onSelect(p.id);
                  setOpen(false);
                }}
              >
                {p.render(20)}
                <span className="flex-1 text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>
                  {p.name}
                </span>
                {!bound && (
                  <span className="text-[14px] leading-[22px]" style={{ color: '#49a3a6', fontFamily: FONT }}>Connect</span>
                )}
                {bound && (
                  <span className="relative inline-flex items-center justify-end" style={{ minWidth: 70, height: 20 }}>
                    {isActive && (
                      <span className="absolute inset-0 flex items-center justify-end group-hover:opacity-0 transition-opacity">
                        <CdnIcon name="check-l1" size={16} color="rgba(0,0,0,0.9)" />
                      </span>
                    )}
                    <button
                      type="button"
                      className="opacity-0 group-hover:opacity-100 cursor-pointer text-[12px] leading-[20px] transition-opacity"
                      style={{ color: 'rgba(0,0,0,0.5)', background: 'none', border: 'none', fontFamily: FONT, padding: 0 }}
                      onClick={(e) => { e.stopPropagation(); onDisconnect(p.id); }}
                    >
                      Disconnect
                    </button>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AlvaAgentSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { platforms, active, connect, disconnect, setActive } = useAgentPlatforms();
  const [prompt, setPrompt] = useState('');
  const dirty = prompt.trim().length > 0;

  return (
    <SettingsLayout active="alva-agent" onNavigate={onNavigate} mapTo={{ 'alva-agent': 'agent' }}>

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>Alva Agent</h1>

      {/* Connected messenger */}
      <div className="flex items-start justify-between gap-[var(--spacing-m)]">
        <div className="min-w-0 flex-1">
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Connected messenger</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>
            Select the messenger where you want to use Alva Agent (Single platform only).
          </p>
        </div>
        <MessengerDropdown
          platforms={platforms}
          active={active}
          onConnect={connect}
          onSelect={setActive}
          onDisconnect={disconnect}
        />
      </div>

      {/* Customize */}
      <div className="flex flex-col gap-[12px]">
        <div>
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Customize Your Assistant</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Define the personality, tone, and response style.</p>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Define your assistant's identity: name, tone, and response style"
          className="h-[160px] p-[16px] rounded-[8px] text-[16px] leading-[26px] tracking-[0.16px] outline-none resize-none"
          style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, border: '0.5px solid rgba(0,0,0,0.3)', background: '#fff' }}
        />
      </div>

      <button
        disabled={!dirty}
        className={`btn btn-large w-[120px] ${dirty ? 'btn-primary' : 'btn-primary btn-disabled'}`}
      >
        Save
      </button>
    </SettingsLayout>
  );
}
